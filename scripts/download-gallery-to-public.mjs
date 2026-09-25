/**
 * Downloads template JPGs into public/gallery/{subdir}/NN.jpg
 * Usage: node scripts/download-gallery-to-public.mjs data/letter-head-image-files.json letter-head
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync, copyFileSync } from "fs";
import path from "path";

const BASE = "https://printersclub.in/images/template-images/";
const [, , jsonRel, subdir] = process.argv;

if (!jsonRel || !subdir) {
  console.error(
    "Usage: node scripts/download-gallery-to-public.mjs <jsonFile> <publicSubdir>",
  );
  process.exit(1);
}

const files = JSON.parse(readFileSync(jsonRel, "utf8"));
const outDir = path.join(process.cwd(), "public", "gallery", subdir);
mkdirSync(outDir, { recursive: true });

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

async function tryDownload(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  return Buffer.from(await res.arrayBuffer());
}

for (let i = 0; i < files.length; i++) {
  const remote = files[i];
  const n = String(i + 1).padStart(2, "0");
  const localAbs = path.join(outDir, `${n}.jpg`);

  const url = remote.startsWith("http")
    ? remote
    : `${BASE}${encodeURI(remote)}`;

  let buf = await tryDownload(url);

  if (!buf && subdir === "letter-head" && i >= 20) {
    const donorN = String((i % 20) + 1).padStart(2, "0");
    const donorPath = path.join(outDir, `${donorN}.jpg`);
    if (existsSync(donorPath)) {
      copyFileSync(donorPath, localAbs);
      console.log(`MAP ${i + 1} <- preview ${(i % 20) + 1} (Printers Club CDN 404)`);
      continue;
    }
  }

  if (!buf) {
    console.error(`FAIL ${i + 1}: ${remote}`);
    process.exit(1);
  }

  writeFileSync(localAbs, buf);
  console.log(`OK ${i + 1} -> ${n}.jpg`);
}

console.log(`Done: ${files.length} files in public/gallery/${subdir}/`);
