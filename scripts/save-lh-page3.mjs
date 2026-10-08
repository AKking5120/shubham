import { writeFileSync } from "fs";

const START_URL =
  "https://printersclub.in/t_ViewTemplateItems.aspx?MID=3&title=Letter%20Head";
const UA = "Mozilla/5.0";

function extractHidden(html, name) {
  const re = new RegExp(`name="${name}"[^>]*value="([^"]*)"`, "i");
  return html.match(re)?.[1] ?? "";
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
for (let p = 0; p < 2; p++) {
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
writeFileSync("tmp-lh-page3.html", html);
console.log("saved");
