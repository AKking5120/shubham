const START_URL =
  "https://printersclub.in/t_ViewTemplateItems.aspx?MID=3&title=Letter%20Head";
const UA = "Mozilla/5.0";

function extractHidden(html, name) {
  const re = new RegExp(`name="${name}"[^>]*value="([^"]*)"`, "i");
  return html.match(re)?.[1] ?? "";
}

function extractImagesInOrder(html) {
  const files = [];
  const re = /template-images\/([^'"]+\.jpg)/gi;
  let m;
  while ((m = re.exec(html)) !== null) files.push(m[1].replace(/\//g, ""));
  return files;
}

async function fetchPage(url, { method = "GET", body, jar }) {
  const headers = { "User-Agent": UA };
  if (jar.size) headers.Cookie = [...jar].map(([k, v]) => `${k}=${v}`).join("; ");
  if (body) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    headers.Referer = START_URL;
  }
  const res = await fetch(url, { method, headers, body });
  for (const c of res.headers.getSetCookie?.() ?? []) {
    const part = c.split(";")[0];
    const eq = part.indexOf("=");
    if (eq > 0) jar.set(part.slice(0, eq), part.slice(eq + 1));
  }
  return res.text();
}

const jar = new Map();
let html = await fetchPage(START_URL, { jar });
for (let p = 0; p < 3; p++) {
  const imgs = extractImagesInOrder(html);
  console.log(`page ${p + 1}`, imgs);
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
  html = await fetchPage(START_URL, {
    method: "POST",
    body: params.toString(),
    jar,
  });
}

const block = html.match(/388[\s\S]{0,400}/i);
console.log(block?.[0]);

for (const f of ["388_LH-21.jpg", "388_LH 21.jpg", "388_LH_21.jpg", "388 LH-21.jpg"]) {
  const url = `https://printersclub.in/images/template-images/${encodeURI(f)}`;
  const r = await fetch(url, { method: "HEAD", headers: { "User-Agent": UA } });
  console.log(r.status, f);
}
