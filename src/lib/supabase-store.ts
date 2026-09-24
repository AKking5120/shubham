import { serviceImageForSlug } from "./service-images";
import { DEFAULT_PRODUCTS, DEFAULT_SERVICES } from "./seed";
import {
  enquiryToRow,
  productToRow,
  rowToEnquiry,
  rowToProduct,
  rowToService,
  serviceToRow,
} from "./supabase/mappers";
import { getSupabaseAdmin } from "./supabase/server";
import type { Enquiry, Product, Service } from "./types";

async function ensureSeedData() {
  const supabase = getSupabaseAdmin();
  const { count } = await supabase
    .from("services")
    .select("*", { count: "exact", head: true });

  if ((count ?? 0) === 0) {
    await supabase
      .from("services")
      .upsert(DEFAULT_SERVICES.map(serviceToRow), { onConflict: "id" });
    await supabase
      .from("products")
      .upsert(DEFAULT_PRODUCTS.map(productToRow), { onConflict: "id" });
  }
}

/** Adds missing services (e.g. Bulk Copy) and fixes image paths in Supabase. */
async function syncServiceCatalog() {
  const supabase = getSupabaseAdmin();
  const { data: existing, error: readError } = await supabase
    .from("services")
    .select("id");

  if (readError) throw readError;

  const ids = new Set((existing ?? []).map((r) => r.id));
  const missing = DEFAULT_SERVICES.filter((s) => !ids.has(s.id));
  if (missing.length > 0) {
    const { error } = await supabase
      .from("services")
      .upsert(missing.map(serviceToRow), { onConflict: "id" });
    if (error) throw error;
  }

  for (const svc of DEFAULT_SERVICES) {
    const { error } = await supabase
      .from("services")
      .update({ image: serviceImageForSlug(svc.slug) })
      .eq("id", svc.id);
    if (error) throw error;
  }
}

export async function sbGetServices(): Promise<Service[]> {
  await ensureSeedData();
  await syncServiceCatalog();
  const { data, error } = await getSupabaseAdmin()
    .from("services")
    .select("*")
    .eq("enabled", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(rowToService);
}

export async function sbGetAllServices(): Promise<Service[]> {
  await ensureSeedData();
  await syncServiceCatalog();
  const { data, error } = await getSupabaseAdmin()
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(rowToService);
}

export async function sbSaveServices(services: Service[]): Promise<void> {
  const supabase = getSupabaseAdmin();
  const rows = services.map(serviceToRow);
  const { error } = await supabase.from("services").upsert(rows, { onConflict: "id" });
  if (error) throw error;

  const { data: existing } = await supabase.from("services").select("id");
  const keep = new Set(services.map((s) => s.id));
  const toRemove = (existing ?? []).filter((r) => !keep.has(r.id)).map((r) => r.id);
  if (toRemove.length > 0) {
    await supabase.from("services").delete().in("id", toRemove);
  }
}

export async function sbGetProducts(): Promise<Product[]> {
  await ensureSeedData();
  const { data, error } = await getSupabaseAdmin()
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(rowToProduct);
}

export async function sbSaveProducts(products: Product[]): Promise<void> {
  const supabase = getSupabaseAdmin();
  const rows = products.map(productToRow);
  const { error } = await supabase.from("products").upsert(rows, { onConflict: "id" });
  if (error) throw error;

  const { data: existing } = await supabase.from("products").select("id");
  const keep = new Set(products.map((p) => p.id));
  const toRemove = (existing ?? []).filter((r) => !keep.has(r.id)).map((r) => r.id);
  if (toRemove.length > 0) {
    await supabase.from("products").delete().in("id", toRemove);
  }
}

export async function sbGetEnquiries(): Promise<Enquiry[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(rowToEnquiry);
}

export async function sbAddEnquiry(
  data: Omit<Enquiry, "id" | "status" | "createdAt">,
): Promise<Enquiry> {
  const enquiry: Enquiry = {
    ...data,
    id: `ENQ-${Date.now()}`,
    status: "New",
    createdAt: new Date().toISOString(),
  };
  const { error } = await getSupabaseAdmin()
    .from("enquiries")
    .insert(enquiryToRow(enquiry));

  if (error) throw error;
  return enquiry;
}

export async function sbUpdateEnquiry(
  id: string,
  patch: Partial<Enquiry>,
): Promise<Enquiry | null> {
  const existing = await sbGetEnquiryById(id);
  if (!existing) return null;

  const merged = { ...existing, ...patch };

  const { error } = await getSupabaseAdmin()
    .from("enquiries")
    .update({ status: merged.status })
    .eq("id", id);

  if (error) throw error;
  return merged;
}

export async function sbDeleteEnquiry(id: string): Promise<boolean> {
  const existing = await sbGetEnquiryById(id);
  if (!existing) return false;

  const { error } = await getSupabaseAdmin()
    .from("enquiries")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

export async function sbGetEnquiryById(id: string): Promise<Enquiry | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("enquiries")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? rowToEnquiry(data) : null;
}
