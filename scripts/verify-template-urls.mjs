import { readFileSync } from "fs";

const BASE = "https://printersclub.in/images/template-images/";
const files = JSON.parse(readFileSync(process.argv[2], "utf8"));
const UA = "Mozilla/5.0";

for (let i = 0; i < files.length; i++) {
  const url = `${BASE}${encodeURI(files[i])}`;
  const r = await fetch(url, { method: "HEAD", headers: { "User-Agent": UA } });
  console.log(i + 1, r.status, files[i]);
}
