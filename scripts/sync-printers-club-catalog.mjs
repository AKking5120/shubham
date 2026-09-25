/**
 * Syncs Printers Club template galleries (~90% of listed designs) and writes manifests.
 * Run: node scripts/sync-printers-club-catalog.mjs
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync, copyFileSync } from "fs";
import path from "path";
import {
  scrapeMid,
  scrapeCid,
} from "./lib/scrape-printers-club.mjs";

const PERCENT = 0.9;
const BASE = "https://printersclub.in/images/template-images/";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

/** PC main-category entries mapped to our service slugs. */
const ENTRIES = [
  {
    slug: "visiting-card-tag",
    listed: 269,
    mode: "remote",
    scrape: { mid: 1, title: "Visiting Card" },
    idPrefix: "vc-design",
    namePrefix: "Visiting Card Design",
    category: "Cards",
  },
  {
    slug: "die-cut-visiting-card",
    listed: 193,
    folder: "die-cut-visiting-card",
    scrape: { cid: 2 },
    idPrefix: "dc-design",
    namePrefix: "Die Cut Visiting Card",
    category: "Cards",
  },
  {
    slug: "letter-pad",
    listed: 42,
    folder: "letter-head",
    scrape: { mid: 3, title: "Letter Head" },
    idPrefix: "lh-design",
    namePrefix: "Letter Head Design",
    category: "Stationery",
  },
  {
    slug: "envelope",
    listed: 50,
    folder: "envelope",
    scrape: { cid: 4 },
    idPrefix: "env-design",
    namePrefix: "Envelope Design",
    category: "Stationery",
  },
  {
    slug: "bill-book",
    listed: 20,
    folder: "bill-book",
    scrape: { mid: 5, title: "Bill Book" },
    idPrefix: "bb-design",
    namePrefix: "Bill Book Design",
    category: "Business Printing",
  },
  {
    slug: "atm-pouch",
    listed: 13,
    folder: "atm-pouch",
    scrape: { mid: 6, title: "ATM Pouch" },
    idPrefix: "atm-design",
    namePrefix: "ATM Pouch Design",
    category: "Business Printing",
  },
  {
    slug: "doctor-files",
    listed: 5,
    folder: "doctor-files",
    scrape: { cid: 11 },
    idPrefix: "df-design",
    namePrefix: "Doctor File Design",
    category: "Stationery",
  },
  {
    slug: "uv-texture",
    listed: 27,
    folder: "uv-texture",
    scrape: { mid: 9, title: "UV Texture " },
    idPrefix: "uv-design",
    namePrefix: "UV Texture Design",
    category: "Stickers",
  },
  {
    slug: "garment-tags",
    listed: 12,
    folder: "garment-tags",
    scrape: { cid: 10 },
    idPrefix: "gt-design",
    namePrefix: "Garment Tag Design",
    category: "Cards",
  },
  {
    slug: "sticker-banner",
    listed: 16,
    folder: "sticker",
    scrape: { cid: 8 },
    idPrefix: "stk-design",
    namePrefix: "Sticker Design",
    category: "Stickers",
  },
  {
    slug: "id-card",
    listed: 20,
    folder: "id-card",
    scrape: { mid: 7, title: "ID Card" },
    idPrefix: "id-design",
    namePrefix: "ID Card Design",
    category: "Cards",
  },
];

async function tryDownload(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  return Buffer.from(await res.arrayBuffer());
}

async function downloadGallery(files, folder) {
  const outDir = path.join(process.cwd(), "public", "gallery", folder);
  mkdirSync(outDir, { recursive: true });
  const paths = [];

  for (let i = 0; i < files.length; i++) {
    const n = String(i + 1).padStart(2, "0");
    const remote = files[i];
    const ext = path.extname(remote) || ".jpg";
    const localRel = `/gallery/${folder}/${n}${ext}`;
    const localAbs = path.join(outDir, `${n}${ext}`);
    if (existsSync(localAbs)) {
      paths.push(localRel);
      continue;
    }
    const url = `${BASE}${remote.split("/").map((p) => encodeURIComponent(p)).join("/")}`;
    let buf = await tryDownload(url);

    if (!buf) {
      for (let j = 0; j < files.length; j++) {
        if (j === i) continue;
        const altFile = files[j];
        const altUrl = `${BASE}${altFile.split("/").map((p) => encodeURIComponent(p)).join("/")}`;
        buf = await tryDownload(altUrl);
        if (buf) break;
      }
    }

    if (!buf && folder === "letter-head" && i >= 20) {
      const donorN = String((i % 20) + 1).padStart(2, "0");
      for (const donorExt of [".jpg", ".png", ".jpeg"]) {
        const donor = path.join(outDir, `${donorN}${donorExt}`);
        if (existsSync(donor)) {
          copyFileSync(donor, localAbs);
          paths.push(localRel);
          break;
        }
      }
      if (paths.length > i) continue;
    }

    if (!buf) {
      console.warn(`  skip slot ${i + 1} (no image)`);
      continue;
    }

    writeFileSync(localAbs, buf);
    paths.push(localRel);
  }

  return paths;
}

async function main() {
  const registry = {};
  const remoteJson = {};

  for (const entry of ENTRIES) {
    const target = Math.max(1, Math.ceil(entry.listed * PERCENT));
    console.log(`\n=== ${entry.slug} (target ${target}) ===`);

    let files = [];
    if (entry.scrape.mid) {
      files = await scrapeMid(entry.scrape.mid, entry.scrape.title, target);
    } else if (entry.scrape.cid) {
      files = await scrapeCid(entry.scrape.cid, target);
    }

    files = files.slice(0, target);
    console.log(`  scraped ${files.length} filenames`);

    const dataPath = path.join(process.cwd(), "data", `${entry.slug}-image-files.json`);
    writeFileSync(dataPath, JSON.stringify(files, null, 2), "utf8");

    if (entry.mode === "remote") {
      remoteJson[entry.slug] = files;
      registry[entry.slug] = {
        mode: "remote",
        count: files.length,
        idPrefix: entry.idPrefix,
        namePrefix: entry.namePrefix,
        category: entry.category,
        dataFile: `${entry.slug}-image-files.json`,
      };
      continue;
    }

    const paths = await downloadGallery(files, entry.folder);
    registry[entry.slug] = {
      mode: "local",
      folder: entry.folder,
      count: paths.length,
      paths,
      idPrefix: entry.idPrefix,
      namePrefix: entry.namePrefix,
      category: entry.category,
    };
    console.log(`  saved ${paths.length} local images`);
  }

  writeFileSync(
    path.join(process.cwd(), "data", "gallery-registry.json"),
    JSON.stringify(registry, null, 2),
    "utf8",
  );
  console.log("\nWrote data/gallery-registry.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
