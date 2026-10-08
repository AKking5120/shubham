import {
  buildIdUrl,
  fetchPage,
  scrapeItemsUrl,
} from "./lib/scrape-printers-club.mjs";

const html = await fetchPage(
  "https://printersclub.in/t_ViewTemplates.aspx?CID=2&title=x",
  {},
);
const re = /ViewTemplateItems\.aspx\?ID=(\d+)&title=([^&"']+)/gi;
const subs = [];
let m;
while ((m = re.exec(html)) !== null) {
  const id = m[1];
  const title = decodeURIComponent(m[2].replace(/\+/g, " "));
  if (!subs.some((s) => s.id === id)) subs.push({ id, title });
}
console.log("subs", subs.length);

let total = 0;
for (const sub of subs.slice(0, 5)) {
  const batch = await scrapeItemsUrl(buildIdUrl(sub.id, sub.title), Infinity);
  console.log(sub.id, sub.title.slice(0, 30), batch.length);
  total += batch.length;
}
console.log("sample total", total);
