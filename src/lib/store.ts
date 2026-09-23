import { promises as fs } from "fs";
import path from "path";
import { isSupabaseConfigured } from "./supabase/server";
import * as sb from "./supabase-store";
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
  await fs.writeFile(filePath(filename), JSON.stringify(data, null, 2), "utf-8");
}

export function getDataBackend(): "supabase" | "json" {
  return isSupabaseConfigured() ? "supabase" : "json";
}

export async function getServices(): Promise<Service[]> {
  if (isSupabaseConfigured()) return sb.sbGetServices();
  const services = await readJson<Service[]>("services.json", DEFAULT_SERVICES);
  return services.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
}

export async function getAllServices(): Promise<Service[]> {
  if (isSupabaseConfigured()) return sb.sbGetAllServices();
  const services = await readJson<Service[]>("services.json", DEFAULT_SERVICES);
  return services.sort((a, b) => a.order - b.order);
}

export async function saveServices(services: Service[]): Promise<void> {
  if (isSupabaseConfigured()) return sb.sbSaveServices(services);
  await writeJson("services.json", services);
}

export async function getProducts(): Promise<Product[]> {
  if (isSupabaseConfigured()) return sb.sbGetProducts();
  return readJson<Product[]>("products.json", DEFAULT_PRODUCTS);
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
