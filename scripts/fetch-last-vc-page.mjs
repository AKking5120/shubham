import { readFileSync, writeFileSync } from "fs";
import path from "path";

const START_URL =
  "https://printersclub.in/t_ViewTemplateItems.aspx?MID=1&title=Visiting%20Card";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function extractHidden(html, name) {
  const re = new RegExp(`name="${name}"[^>]*value="([^"]*)"`, "i");
  return html.match(re)?.[1] ?? "";
}

function extractImages(html) {
  const files = [];
  const re = /template-images\/([^'"]+\.jpg)/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const file = m[1].replace(/\//g, "");
    if (!files.includes(file)) files.push(file);
  }
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
const params = new URLSearchParams({
  __EVENTTARGET: "",
  __EVENTARGUMENT: "",
  __VIEWSTATE: extractHidden(html, "__VIEWSTATE"),
  __VIEWSTATEGENERATOR: extractHidden(html, "__VIEWSTATEGENERATOR"),
  __SCROLLPOSITIONX: "0",
  __SCROLLPOSITIONY: "0",
  __EVENTVALIDATION: extractHidden(html, "__EVENTVALIDATION"),
  "ctl00$ContentPlaceHolder1$btnLast": "Last Page >>",
});
html = await fetchPage(START_URL, { method: "POST", body: params.toString(), jar });
const lastImgs = extractImages(html);
console.log("Last page:", lastImgs);

const target = path.join(process.cwd(), "src", "lib", "visiting-card-designs.ts");
const existing = readFileSync(target, "utf8");
const urls = [...existing.matchAll(/image: "(https:[^"]+)"/g)].map((m) => m[1]);
const existingFiles = new Set(
  urls.map((u) => decodeURIComponent(u.split("/").pop() ?? "")),
);

for (const file of lastImgs) {
  if (!existingFiles.has(file)) {
    console.log("Missing from catalog:", file);
    const n = urls.length + 1;
    const entry = `  { id: "vc-design-${n}", name: "Visiting Card Design ${n}", category: "Cards" as const, description: "Visiting card design template — share your details for printing.", image: ${JSON.stringify(`https://printersclub.in/images/template-images/${encodeURI(file)}`)} },`;
    const updated = existing.replace(
      /];\s*$/,
      `${entry}\n];\n`,
    ).replace(/designs 1–\d+/, `designs 1–${n}`);
    writeFileSync(target, updated);
    console.log("Appended design", n);
  }
}
