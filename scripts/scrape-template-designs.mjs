/**
 * Scrapes Printers Club template preview JPGs in page order.
 * Usage: node scripts/scrape-template-designs.mjs <MID> <title> <targetCount> <outputJson>
 * Example: node scripts/scrape-template-designs.mjs 3 "Letter Head" 40 data/letter-head-image-files.json
 */

import { writeFileSync } from "fs";
import path from "path";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const [, , mid, title, targetStr, outputRel] = process.argv;
const TARGET = Number.parseInt(targetStr ?? "40", 10);
const outputPath = path.join(process.cwd(), outputRel ?? "data/template-images.json");

if (!mid || !title) {
  console.error(
    'Usage: node scripts/scrape-template-designs.mjs <MID> "<title>" <count> <output.json>',
  );
  process.exit(1);
}

const START_URL = `https://printersclub.in/t_ViewTemplateItems.aspx?MID=${encodeURIComponent(mid)}&title=${encodeURIComponent(title)}`;

function extractHidden(html, name) {
  const re = new RegExp(`name="${name}"[^>]*value="([^"]*)"`, "i");
  return html.match(re)?.[1] ?? "";
}

function extractImagesInOrder(html) {
  const files = [];
  const re = /template-images\/([^'"]+\.jpg)/gi;
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

async function fetchPage(url, { method = "GET", body, jar }) {
  const headers = { "User-Agent": UA };
  if (jar?.size) headers.Cookie = cookieHeader(jar);
  if (body) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    headers.Referer = START_URL;
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

async function main() {
  const jar = new Map();
  let html = await fetchPage(START_URL, { jar });
  const ordered = [];

  for (let page = 0; page < 20 && ordered.length < TARGET; page++) {
    const batch = extractImagesInOrder(html);
    for (const file of batch) {
      ordered.push(file);
      if (ordered.length >= TARGET) break;
    }
    console.log(`Page ${page + 1}: total ${ordered.length}`);
    if (ordered.length >= TARGET) break;

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

    const nextHtml = await fetchPage(START_URL, {
      method: "POST",
      body: params.toString(),
      jar,
    });

    if (extractImagesInOrder(nextHtml).join("|") === batch.join("|")) {
      console.log("Pagination ended.");
      break;
    }
    html = nextHtml;
    await new Promise((r) => setTimeout(r, 400));
  }

  console.log(`Collected ${ordered.length} designs`);
  if (ordered.length < TARGET) {
    console.error(`Expected ${TARGET}, got ${ordered.length}.`);
    process.exit(1);
  }

  writeFileSync(
    outputPath,
    JSON.stringify(ordered.slice(0, TARGET), null, 2),
    "utf8",
  );
  console.log(`Wrote ${outputPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
