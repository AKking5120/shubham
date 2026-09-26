import { promises as fs } from "fs";
import path from "path";
import { isSupabaseConfigured } from "./supabase/server";
import * as sb from "./supabase-store";
import { normalizeProduct, normalizeService } from "./service-images";
import {
  DEFAULT_PRICE_CALCULATOR,
  type PriceCalculatorConfig,
} from "./price-calculator";
import {
  DEFAULT_SITE_CONTENT,
  mergeSiteContent,
  type SiteContent,
} from "./site-content";
import { DEFAULT_PRODUCTS, DEFAULT_SERVICES } from "./seed";
import type { Enquiry, Product, Service } from "./types";
const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(path.join(process.cwd(), "public", "uploads"), {
    recursive: true,
  });
}

function filePath(name: string) {
  return path.join(DATA_DIR, name);
}

async function readJson<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const fp = filePath(filename);
  try {
    const raw = await fs.readFile(fp, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    await fs.writeFile(fp, JSON.stringify(fallback, null, 2), "utf-8");
    return fallback;
  }
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  try {
    await fs.writeFile(
      filePath(filename),
      JSON.stringify(data, null, 2),
      "utf-8",
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Could not save ${filename} (${msg}). On Vercel, enable Supabase and run app_settings SQL, or host on a server with writable data/.`,
    );
  }
}

async function readAppJson<T>(
  supabaseKey: string,
  filename: string,
  fallback: T,
): Promise<T> {
  if (isSupabaseConfigured()) {
    const fromDb = await sb.sbGetAppSetting<T>(supabaseKey);
    if (fromDb) return fromDb;
  }
  return readJson(filename, fallback);
}

function vercelAdminSaveHint(): string {
  return (
    "On Vercel, admin saves use Supabase (not data/ files). " +
    "In Vercel → Settings → Environment Variables, set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, redeploy, " +
    "then run supabase/schema.sql in the Supabase SQL Editor (creates the app_settings table)."
  );
}

async function writeAppJson<T>(
  supabaseKey: string,
  filename: string,
  data: T,
): Promise<void> {
  if (isSupabaseConfigured()) {
    await sb.sbSetAppSetting(supabaseKey, data);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error(vercelAdminSaveHint());
  }

  await writeJson(filename, data);
}

/** Whether admin JSON settings can be saved in this environment. */
export function canSaveAppSettings(): boolean {
  if (isSupabaseConfigured()) return true;
  return !process.env.VERCEL;
}

export function adminSaveBlockedReason(): string | null {
  if (canSaveAppSettings()) return null;
  return vercelAdminSaveHint();
}

export function getDataBackend(): "supabase" | "json" {
  return isSupabaseConfigured() ? "supabase" : "json";
}

export async function getServices(): Promise<Service[]> {
  if (isSupabaseConfigured()) {
    return (await sb.sbGetServices()).map(normalizeService);
  }
  const services = await readJson<Service[]>("services.json", DEFAULT_SERVICES);
  return services
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order)
    .map(normalizeService);
}

export async function getAllServices(): Promise<Service[]> {
  if (isSupabaseConfigured()) {
    return (await sb.sbGetAllServices()).map(normalizeService);
  }
  const services = await readJson<Service[]>("services.json", DEFAULT_SERVICES);
  return services.sort((a, b) => a.order - b.order).map(normalizeService);
}

export async function saveServices(services: Service[]): Promise<void> {
  if (isSupabaseConfigured()) return sb.sbSaveServices(services);
  await writeJson("services.json", services);
}

export async function getProducts(): Promise<Product[]> {
  if (isSupabaseConfigured()) {
    return (await sb.sbGetProducts()).map(normalizeProduct);
  }
  return (await readJson<Product[]>("products.json", DEFAULT_PRODUCTS)).map(
    normalizeProduct,
  );
}

export async function saveProducts(products: Product[]): Promise<void> {
  if (isSupabaseConfigured()) return sb.sbSaveProducts(products);
  await writeJson("products.json", products);
}

export async function getEnquiries(): Promise<Enquiry[]> {
  if (isSupabaseConfigured()) return sb.sbGetEnquiries();
  const list = await readJson<Enquiry[]>("enquiries.json", []);
  return list.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function saveEnquiries(enquiries: Enquiry[]): Promise<void> {
  if (isSupabaseConfigured()) {
    throw new Error("Bulk save enquiries is not supported with Supabase");
  }
  await writeJson("enquiries.json", enquiries);
}

export async function addEnquiry(
  data: Omit<Enquiry, "id" | "status" | "createdAt">,
): Promise<Enquiry> {
  if (isSupabaseConfigured()) return sb.sbAddEnquiry(data);
  const enquiries = await readJson<Enquiry[]>("enquiries.json", []);
  const enquiry: Enquiry = {
    ...data,
    id: `ENQ-${Date.now()}`,
    status: "New",
    createdAt: new Date().toISOString(),
  };
  enquiries.unshift(enquiry);
  await writeJson("enquiries.json", enquiries);
  return enquiry;
}

export async function updateEnquiry(
  id: string,
  patch: Partial<Enquiry>,
): Promise<Enquiry | null> {
  if (isSupabaseConfigured()) return sb.sbUpdateEnquiry(id, patch);
  const enquiries = await readJson<Enquiry[]>("enquiries.json", []);
  const idx = enquiries.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  enquiries[idx] = { ...enquiries[idx], ...patch };
  await writeJson("enquiries.json", enquiries);
  return enquiries[idx];
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) return sb.sbDeleteEnquiry(id);
  const enquiries = await readJson<Enquiry[]>("enquiries.json", []);
  const filtered = enquiries.filter((e) => e.id !== id);
  if (filtered.length === enquiries.length) return false;
  await writeJson("enquiries.json", filtered);
  return true;
}

export async function getEnquiryById(id: string): Promise<Enquiry | null> {
  if (isSupabaseConfigured()) return sb.sbGetEnquiryById(id);
  const enquiries = await getEnquiries();
  return enquiries.find((e) => e.id === id) ?? null;
}

export async function getSiteContent(): Promise<SiteContent> {
  const raw = await readAppJson<Partial<SiteContent>>(
    "site_content",
    "site-content.json",
    DEFAULT_SITE_CONTENT,
  );
  return mergeSiteContent(raw);
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await writeAppJson("site_content", "site-content.json", content);
}

export async function getPriceCalculator(): Promise<PriceCalculatorConfig> {
  return readAppJson<PriceCalculatorConfig>(
    "price_calculator",
    "price-calculator.json",
    DEFAULT_PRICE_CALCULATOR,
  );
}

export async function savePriceCalculator(
  config: PriceCalculatorConfig,
): Promise<void> {
  await writeAppJson("price_calculator", "price-calculator.json", config);
}

export type DesignGalleryOverride = {
  replaceRegistry: boolean;
  items: Product[];
};

export async function getDesignGalleryOverrides(): Promise<
  Record<string, DesignGalleryOverride>
> {
  const data = await readAppJson<{ overrides: Record<string, DesignGalleryOverride> }>(
    "design_gallery_admin",
    "design-gallery-admin.json",
    { overrides: {} },
  );
  return data.overrides ?? {};
}

export async function saveDesignGalleryOverrides(
  overrides: Record<string, DesignGalleryOverride>,
): Promise<void> {
  await writeAppJson("design_gallery_admin", "design-gallery-admin.json", {
    overrides,
  });
}

/** Slugs with registry-backed or admin-managed design galleries. */
export async function getDesignGallerySlugs(): Promise<
  { slug: string; name: string; count: number }[]
> {
  const services = await getAllServices();
  const overrides = await getDesignGalleryOverrides();
  const { getServiceDesignProducts } = await import("./service-design-gallery");

  return services.map((s) => {
    const admin = overrides[s.slug];
    const registry = getServiceDesignProducts(s.slug) ?? [];
    const count = admin?.replaceRegistry
      ? admin.items.length
      : registry.length + (admin?.items?.length ?? 0);
    return { slug: s.slug, name: s.name, count };
  });
}
