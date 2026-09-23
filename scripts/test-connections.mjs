import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import { v2 as cloudinary } from "cloudinary";

function loadEnvLocal() {
  const raw = readFileSync(".env.local", "utf8");
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    const val = t.slice(i + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const results = [];

async function testSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    results.push({ name: "Supabase", ok: false, detail: "Missing env vars" });
    return;
  }
  const sb = createClient(url, key);
  const tables = ["services", "products", "enquiries"];
  for (const table of tables) {
    const { error } = await sb.from(table).select("id", { head: true, count: "exact" });
    if (error) {
      results.push({
        name: "Supabase",
        ok: false,
        detail: `Table "${table}": ${error.message}`,
      });
      return;
    }
  }
  const { count } = await sb
    .from("services")
    .select("*", { count: "exact", head: true });
  results.push({
    name: "Supabase",
    ok: true,
    detail: `Connected. services table has ${count ?? 0} row(s).`,
  });
}

async function testCloudinaryUpload() {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !apiKey || !secret) {
    results.push({ name: "Cloudinary", ok: false, detail: "Missing env vars" });
    return;
  }
  cloudinary.config({ cloud_name: cloud, api_key: apiKey, api_secret: secret });
  const png = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    "base64",
  );
  const dataUri = `data:image/png;base64,${png.toString("base64")}`;
  try {
    const res = await cloudinary.uploader.upload(dataUri, {
      folder: "shubham-prints/test",
      public_id: `connection-test-${Date.now()}`,
      overwrite: true,
    });
    results.push({
      name: "Cloudinary upload",
      ok: true,
      detail: `Uploaded test image. URL: ${res.secure_url}`,
    });
  } catch (e) {
    results.push({
      name: "Cloudinary upload",
      ok: false,
      detail: e.message || String(e),
    });
  }
}

await testSupabase();
await testCloudinaryUpload();

let allOk = true;
for (const r of results) {
  console.log(`${r.ok ? "PASS" : "FAIL"} — ${r.name}: ${r.detail}`);
  if (!r.ok) allOk = false;
}
process.exit(allOk ? 0 : 1);
