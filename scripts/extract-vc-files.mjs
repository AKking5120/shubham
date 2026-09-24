import { readFileSync, writeFileSync } from "fs";

const t = readFileSync("src/lib/visiting-card-designs.ts", "utf8");
const files = [...t.matchAll(/template-images\/([^"]+)"/g)].map((m) =>
  decodeURIComponent(m[1]),
);
console.log(files.length);
writeFileSync(
  "data/visiting-card-image-files.json",
  JSON.stringify(files, null, 2),
);
