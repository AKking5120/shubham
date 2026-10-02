import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";
import { isSupabaseConfigured, getSupabaseAdmin } from "./supabase/server";
import {
  QUOTE_STATUSES,
  isPrintingColor,
  isQuoteStatus,
  nextSerial,
  type ArtworkFile,
  type PrintingColor,
  type QuoteInquiry,
  type QuoteStatus,
  type QuoteStatusEvent,
} from "./quote-workflow";

const FILE = path.join(process.cwd(), "data", "quote-inquiries.json");

export type NewQuoteInput = {
  customerName: string;
  phone: string;
  email: string;
  category: string;
  categorySlug: string;
  productCategory: string;
  productCategorySlug: string;
  product: string;
  productSlug: string;
  size: string;
  quantity: string;
  pagesSet: string;
  printingColor: PrintingColor;
  description: string;
  artwork: ArtworkFile | null;
};

export type QuotePatch = {
  status?: QuoteStatus;
  adminNotes?: string;
  expectedCompletion?: string | null;
  customerName?: string;
  phone?: string;
  email?: string;
  size?: string;
  quantity?: string;
  pagesSet?: string;
  printingColor?: PrintingColor;
  description?: string;
};

let chain: Promise<unknown> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = chain.then(fn, fn);
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function event(
  previous: QuoteStatus | null,
  next: QuoteStatus,
  by: string,
): QuoteStatusEvent {
  return {
    id: `HST-${Date.now().toString(36)}-${randomBytes(3).toString("hex")}`,
    previousStatus: previous,
    newStatus: next,
    at: new Date().toISOString(),
    by,
  };
}

async function readFileInquiries(): Promise<QuoteInquiry[]> {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    const parsed = JSON.parse(raw) as QuoteInquiry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeFileInquiries(list: QuoteInquiry[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(list, null, 2), "utf-8");
  await fs.rename(tmp, FILE);
}

function rowToInquiry(
  row: Record<string, unknown>,
  history: QuoteStatusEvent[],
  artwork: ArtworkFile | null,
): QuoteInquiry {
  const status = isQuoteStatus(String(row.status)) ? (row.status as QuoteStatus) : "new_quote";
  const color = isPrintingColor(String(row.printing_color))
    ? (row.printing_color as PrintingColor)
    : "black_white";
  return {
    id: String(row.id),
    customerName: String(row.customer_name ?? ""),
    phone: String(row.phone ?? ""),
    email: String(row.email ?? ""),
    category: String(row.category ?? ""),
    categorySlug: String(row.category_slug ?? ""),
    productCategory: String(row.product_category ?? ""),
    productCategorySlug: String(row.product_category_slug ?? ""),
    product: String(row.product ?? ""),
    productSlug: String(row.product_slug ?? ""),
    size: String(row.size ?? ""),
    quantity: String(row.quantity ?? ""),
    pagesSet: String(row.pages_set ?? ""),
    printingColor: color,
    description: String(row.description ?? ""),
    artwork,
    status,
    orderId: row.order_id ? String(row.order_id) : null,
    orderCreatedAt: row.order_created_at ? String(row.order_created_at) : null,
    adminNotes: String(row.admin_notes ?? ""),
    expectedCompletion: row.expected_completion ? String(row.expected_completion).slice(0, 10) : null,
    createdAt: String(row.created_at ?? new Date().toISOString()),
    updatedAt: String(row.updated_at ?? new Date().toISOString()),
    history,
  };
}

function artworkFromRow(row: Record<string, unknown> | null): ArtworkFile | null {
  if (!row) return null;
  return {
    id: String(row.id),
    originalName: String(row.original_name ?? "artwork"),
    mimeType: String(row.mime_type ?? "application/octet-stream"),
    sizeBytes: Number(row.size_bytes ?? 0),
    storage: row.storage === "cloudinary" ? "cloudinary" : "local",
    key: String(row.storage_key ?? ""),
    resourceType: row.resource_type === "image" ? "image" : "raw",
  };
}

function historyFromRow(row: Record<string, unknown>): QuoteStatusEvent {
  const next = isQuoteStatus(String(row.new_status))
    ? (row.new_status as QuoteStatus)
    : "new_quote";
  const prev = row.previous_status && isQuoteStatus(String(row.previous_status))
    ? (row.previous_status as QuoteStatus)
    : null;
  return {
    id: String(row.id),
    previousStatus: prev,
    newStatus: next,
    at: String(row.changed_at),
    by: String(row.changed_by ?? "admin"),
  };
}

async function sbList(): Promise<QuoteInquiry[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("quote_inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  const rows = data ?? [];
  const ids = rows.map((r) => r.id as string);
  if (ids.length === 0) return [];

  const [{ data: hist, error: hErr }, { data: art, error: aErr }] = await Promise.all([
    supabase
      .from("quote_status_history")
      .select("*")
      .in("inquiry_id", ids)
      .order("changed_at", { ascending: true }),
    supabase.from("quote_artwork").select("*").in("inquiry_id", ids),
  ]);
  if (hErr) throw hErr;
  if (aErr) throw aErr;

  const historyBy = new Map<string, QuoteStatusEvent[]>();
  for (const row of hist ?? []) {
    const id = String(row.inquiry_id);
    const list = historyBy.get(id) ?? [];
    list.push(historyFromRow(row));
    historyBy.set(id, list);
  }
  const artBy = new Map<string, ArtworkFile>();
  for (const row of art ?? []) {
    const file = artworkFromRow(row);
    if (file) artBy.set(String(row.inquiry_id), file);
  }
  return rows.map((row) =>
    rowToInquiry(row, historyBy.get(String(row.id)) ?? [], artBy.get(String(row.id)) ?? null),
  );
}

async function sbOne(id: string): Promise<QuoteInquiry | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("quote_inquiries")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const [{ data: hist, error: hErr }, { data: art, error: aErr }] = await Promise.all([
    supabase
      .from("quote_status_history")
      .select("*")
      .eq("inquiry_id", id)
      .order("changed_at", { ascending: true }),
    supabase.from("quote_artwork").select("*").eq("inquiry_id", id).maybeSingle(),
  ]);
  if (hErr) throw hErr;
  if (aErr) throw aErr;
  return rowToInquiry(
    data,
    (hist ?? []).map(historyFromRow),
    artworkFromRow(art),
  );
}

function missingTable(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return error.code === "42P01" || /quote_inquiries|quote_orders|quote_artwork|quote_status_history/i.test(error.message ?? "");
}

export async function listQuoteInquiries(): Promise<QuoteInquiry[]> {
  if (isSupabaseConfigured()) {
    try {
      return await sbList();
    } catch (err) {
      const e = err as { code?: string; message?: string };
      if (missingTable(e)) {
        throw new Error(
          "Quote tables are missing. Run supabase/quote_orders.sql in the Supabase SQL editor.",
        );
      }
      throw err;
    }
  }
  const list = await readFileInquiries();
  return list.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getQuoteInquiry(id: string): Promise<QuoteInquiry | null> {
  if (isSupabaseConfigured()) return sbOne(id);
  const list = await readFileInquiries();
  return list.find((q) => q.id === id) ?? null;
}

export async function getQuoteByOrderId(orderId: string): Promise<QuoteInquiry | null> {
  const key = orderId.trim().toUpperCase();
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("quote_inquiries")
      .select("id")
      .eq("order_id", key)
      .maybeSingle();
    if (error) throw error;
    if (!data) return null;
    return sbOne(String(data.id));
  }
  const list = await readFileInquiries();
  return list.find((q) => q.orderId === key) ?? null;
}

export async function createQuoteInquiry(input: NewQuoteInput): Promise<QuoteInquiry> {
  return withLock(async () => {
    const now = new Date().toISOString();
    const year = new Date().getFullYear();
    const history = [event(null, "new_quote", "customer")];

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      const { data: existing, error: readError } = await supabase
        .from("quote_inquiries")
        .select("id");
      if (readError) throw readError;
      const id = nextSerial(
        "INQ",
        year,
        (existing ?? []).map((r) => String(r.id)),
      );
      const inquiry: QuoteInquiry = {
        ...input,
        id,
        status: "new_quote",
        orderId: null,
        orderCreatedAt: null,
        adminNotes: "",
        expectedCompletion: null,
        createdAt: now,
        updatedAt: now,
        history,
      };
      const { error } = await supabase.from("quote_inquiries").insert({
        id,
        customer_name: input.customerName,
        phone: input.phone,
        email: input.email,
        category: input.category,
        category_slug: input.categorySlug,
        product_category: input.productCategory,
        product_category_slug: input.productCategorySlug,
        product: input.product,
        product_slug: input.productSlug,
        size: input.size,
        quantity: input.quantity,
        pages_set: input.pagesSet,
        printing_color: input.printingColor,
        description: input.description,
        status: "new_quote",
        admin_notes: "",
        created_at: now,
        updated_at: now,
      });
      if (error) throw error;
      const { error: hError } = await supabase.from("quote_status_history").insert({
        id: history[0].id,
        inquiry_id: id,
        previous_status: null,
        new_status: "new_quote",
        changed_at: now,
        changed_by: "customer",
      });
      if (hError) throw hError;
      if (input.artwork) {
        const { error: aError } = await supabase.from("quote_artwork").insert({
          id: input.artwork.id,
          inquiry_id: id,
          original_name: input.artwork.originalName,
          mime_type: input.artwork.mimeType,
          size_bytes: input.artwork.sizeBytes,
          storage: input.artwork.storage,
          storage_key: input.artwork.key,
          resource_type: input.artwork.resourceType,
          created_at: now,
        });
        if (aError) throw aError;
      }
      return inquiry;
    }

    const list = await readFileInquiries();
    const id = nextSerial("INQ", year, list.map((q) => q.id));
    const inquiry: QuoteInquiry = {
      ...input,
      id,
      status: "new_quote",
      orderId: null,
      orderCreatedAt: null,
      adminNotes: "",
      expectedCompletion: null,
      createdAt: now,
      updatedAt: now,
      history,
    };
    list.unshift(inquiry);
    await writeFileInquiries(list);
    return inquiry;
  });
}

export async function updateQuoteInquiry(
  id: string,
  patch: QuotePatch,
  actor = "admin",
): Promise<QuoteInquiry | null> {
  return withLock(async () => {
    const current = isSupabaseConfigured()
      ? await sbOne(id)
      : (await readFileInquiries()).find((q) => q.id === id) ?? null;
    if (!current) return null;

    const next: QuoteInquiry = {
      ...current,
      ...patch,
      expectedCompletion:
        patch.expectedCompletion === undefined
          ? current.expectedCompletion
          : patch.expectedCompletion,
      updatedAt: new Date().toISOString(),
    };

    const statusChanged = patch.status && patch.status !== current.status;
    if (statusChanged && patch.status) {
      next.history = [...current.history, event(current.status, patch.status, actor)];
      next.status = patch.status;
    }

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      const { error } = await supabase
        .from("quote_inquiries")
        .update({
          customer_name: next.customerName,
          phone: next.phone,
          email: next.email,
          size: next.size,
          quantity: next.quantity,
          pages_set: next.pagesSet,
          printing_color: next.printingColor,
          description: next.description,
          status: next.status,
          admin_notes: next.adminNotes,
          expected_completion: next.expectedCompletion,
          updated_at: next.updatedAt,
        })
        .eq("id", id);
      if (error) throw error;
      if (statusChanged) {
        const last = next.history[next.history.length - 1];
        const { error: hError } = await supabase.from("quote_status_history").insert({
          id: last.id,
          inquiry_id: id,
          previous_status: last.previousStatus,
          new_status: last.newStatus,
          changed_at: last.at,
          changed_by: last.by,
        });
        if (hError) throw hError;
      }
      return next;
    }

    const list = await readFileInquiries();
    const idx = list.findIndex((q) => q.id === id);
    if (idx === -1) return null;
    list[idx] = next;
    await writeFileInquiries(list);
    return next;
  });
}

export async function generateQuoteOrderId(id: string, actor = "admin"): Promise<QuoteInquiry> {
  return withLock(async () => {
    const year = new Date().getFullYear();
    const now = new Date().toISOString();

    const assign = (current: QuoteInquiry, taken: string[]): QuoteInquiry => {
      if (current.orderId) {
        const err = new Error("This quote already has an Order ID.");
        err.name = "OrderExists";
        throw err;
      }
      const orderId = nextSerial("ORD", year, taken);
      const shouldConfirm = (
        ["new_quote", "contacted", "quote_discussed"] as QuoteStatus[]
      ).includes(current.status);
      const status: QuoteStatus = shouldConfirm ? "order_confirmed" : current.status;
      const history = shouldConfirm
        ? [...current.history, event(current.status, "order_confirmed", actor)]
        : current.history;
      return {
        ...current,
        orderId,
        orderCreatedAt: now,
        status,
        history,
        updatedAt: now,
      };
    };

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      const current = await sbOne(id);
      if (!current) {
        const err = new Error("Quote not found.");
        err.name = "NotFound";
        throw err;
      }
      const { data: orders, error: oErr } = await supabase
        .from("quote_orders")
        .select("id");
      if (oErr) throw oErr;
      const { data: ids, error: iErr } = await supabase
        .from("quote_inquiries")
        .select("order_id");
      if (iErr) throw iErr;
      const taken = [
        ...(orders ?? []).map((r) => String(r.id)),
        ...(ids ?? []).map((r) => String(r.order_id ?? "")).filter(Boolean),
      ];
      const next = assign(current, taken);
      const { error } = await supabase.from("quote_orders").insert({
        id: next.orderId,
        inquiry_id: id,
        created_at: now,
      });
      if (error) {
        if (error.code === "23505") {
          throw new Error("Could not allocate a unique Order ID. Try again.");
        }
        throw error;
      }
      const { error: uErr } = await supabase
        .from("quote_inquiries")
        .update({
          order_id: next.orderId,
          order_created_at: now,
          status: next.status,
          updated_at: now,
        })
        .eq("id", id)
        .is("order_id", null);
      if (uErr) throw uErr;
      if (next.status !== current.status) {
        const last = next.history[next.history.length - 1];
        const { error: hError } = await supabase.from("quote_status_history").insert({
          id: last.id,
          inquiry_id: id,
          previous_status: last.previousStatus,
          new_status: last.newStatus,
          changed_at: last.at,
          changed_by: last.by,
        });
        if (hError) throw hError;
      }
      return next;
    }

    const list = await readFileInquiries();
    const idx = list.findIndex((q) => q.id === id);
    if (idx === -1) {
      const err = new Error("Quote not found.");
      err.name = "NotFound";
      throw err;
    }
    const taken = list.map((q) => q.orderId).filter((v): v is string => Boolean(v));
    const next = assign(list[idx], taken);
    if (list.some((q) => q.orderId === next.orderId)) {
      throw new Error("Could not allocate a unique Order ID. Try again.");
    }
    list[idx] = next;
    await writeFileInquiries(list);
    return next;
  });
}

export { QUOTE_STATUSES };
