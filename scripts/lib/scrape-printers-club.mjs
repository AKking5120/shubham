const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export function extractHidden(html, name) {
  const re = new RegExp(`name="${name}"[^>]*value="([^"]*)"`, "i");
  return html.match(re)?.[1] ?? "";
}

export function extractImagesInOrder(html) {
  const files = [];
  const re = /template-images\/([^'"]+\.(?:jpg|jpeg|png))/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    files.push(m[1].replace(/\//g, ""));
  }
  return files;
}

function parseCookies(setCookieHeaders) {
  const jar = new Map();
  for (const h of setCookieHeaders) {
    const part = h.split(";")[0];
    const eq = part.indexOf("=");
    if (eq > 0) jar.set(part.slice(0, eq), part.slice(eq + 1));
  }
  return jar;
}

function cookieHeader(jar) {
  return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
}

export async function fetchPage(url, { method = "GET", body, jar, referer }) {
  const headers = { "User-Agent": UA };
  if (jar?.size) headers.Cookie = cookieHeader(jar);
  if (body) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    headers.Referer = referer ?? url;
  }
  const res = await fetch(url, {
    method,
    headers,
    body,
    signal: AbortSignal.timeout(120_000),
  });
  const setCookies = res.headers.getSetCookie?.() ?? [];
  if (jar && setCookies.length) {
    const parsed = parseCookies(setCookies);
    for (const [k, v] of parsed) jar.set(k, v);
  }
  return res.text();
}

export async function scrapeItemsUrl(startUrl, maxCount = Infinity) {
  const jar = new Map();
  let html = await fetchPage(startUrl, { jar });
  const ordered = [];

  for (let page = 0; page < 80 && ordered.length < maxCount; page++) {
    const batch = extractImagesInOrder(html);
    for (const file of batch) {
      ordered.push(file);
      if (ordered.length >= maxCount) break;
    }
    if (ordered.length >= maxCount) break;

    const params = new URLSearchParams({
      __EVENTTARGET: "",
      __EVENTARGUMENT: "",
      __VIEWSTATE: extractHidden(html, "__VIEWSTATE"),
      __VIEWSTATEGENERATOR: extractHidden(html, "__VIEWSTATEGENERATOR"),
      __SCROLLPOSITIONX: "0",
      __SCROLLPOSITIONY: "0",
      __EVENTVALIDATION: extractHidden(html, "__EVENTVALIDATION"),
      "ctl00$ContentPlaceHolder1$btnNext": "Next Page >",
    });

    const nextHtml = await fetchPage(startUrl, {
      method: "POST",
      body: params.toString(),
      jar,
      referer: startUrl,
    });

    if (extractImagesInOrder(nextHtml).join("|") === batch.join("|")) break;
    html = nextHtml;
    await new Promise((r) => setTimeout(r, 350));
  }

  return ordered;
}

export function buildMidUrl(mid, title) {
  return `https://printersclub.in/t_ViewTemplateItems.aspx?MID=${encodeURIComponent(mid)}&title=${encodeURIComponent(title)}`;
}

export function buildIdUrl(id, title) {
  return `https://printersclub.in/t_ViewTemplateItems.aspx?ID=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}`;
}

export async function scrapeMid(mid, title, maxCount) {
  return scrapeItemsUrl(buildMidUrl(mid, title), maxCount);
}

export async function scrapeCid(cid, maxCount) {
  const listUrl = `https://printersclub.in/t_ViewTemplates.aspx?CID=${encodeURIComponent(cid)}&title=x`;
  const html = await fetchPage(listUrl, {});
  const re =
    /ViewTemplateItems\.aspx\?ID=(\d+)&title=([^&"']+)/gi;
  const subs = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    const id = m[1];
    const title = decodeURIComponent(m[2].replace(/\+/g, " "));
    if (!subs.some((s) => s.id === id)) subs.push({ id, title });
  }

  const all = [];
  for (const sub of subs) {
    const need = maxCount - all.length;
    if (need <= 0) break;
    const batch = await scrapeItemsUrl(buildIdUrl(sub.id, sub.title), need);
    for (const f of batch) {
      if (!all.includes(f)) all.push(f);
    }
  }
  return all.slice(0, maxCount);
}
