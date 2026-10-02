/** Quote → confirmed order workflow. Pure helpers (no I/O). */

/** Design files such as CorelDRAW (.cdr) are often larger than a photo. */
export const MAX_ARTWORK_BYTES = 40 * 1024 * 1024;

export const QUOTE_STATUSES = [
  "new_quote",
  "contacted",
  "quote_discussed",
  "order_confirmed",
  "artwork_received",
  "in_production",
  "printing",
  "quality_check",
  "ready",
  "shipped",
  "completed",
  "cancelled",
] as const;

export type QuoteStatus = (typeof QUOTE_STATUSES)[number];

export const QUOTE_STATUS_LABELS: Record<QuoteStatus, string> = {
  new_quote: "New Quote",
  contacted: "Contacted",
  quote_discussed: "Quote Discussed",
  order_confirmed: "Order Confirmed",
  artwork_received: "Artwork Received",
  in_production: "In Production",
  printing: "Printing",
  quality_check: "Quality Check",
  ready: "Ready",
  shipped: "Shipped / Dispatched",
  completed: "Completed",
  cancelled: "Cancelled",
};

/** Statuses that exist before an Order ID is issued. */
export const PRE_ORDER_STATUSES: QuoteStatus[] = [
  "new_quote",
  "contacted",
  "quote_discussed",
];

export const PRINTING_COLORS = [
  { value: "black_white", label: "Black & White / Black Color" },
  { value: "two_color", label: "Two Color" },
] as const;

export type PrintingColor = (typeof PRINTING_COLORS)[number]["value"];

export const CUSTOMER_TIMELINE: { key: string; label: string; match: QuoteStatus[] }[] = [
  {
    key: "quote_submitted",
    label: "Quote Submitted",
    match: ["new_quote", "contacted", "quote_discussed"],
  },
  { key: "order_confirmed", label: "Order Confirmed", match: ["order_confirmed"] },
  { key: "artwork_received", label: "Artwork Received", match: ["artwork_received"] },
  { key: "in_production", label: "In Production", match: ["in_production"] },
  { key: "printing", label: "Printing", match: ["printing"] },
  { key: "quality_check", label: "Quality Check", match: ["quality_check"] },
  { key: "ready", label: "Ready", match: ["ready"] },
  { key: "shipped", label: "Dispatched", match: ["shipped"] },
  { key: "completed", label: "Completed", match: ["completed"] },
];

export type ArtworkFile = {
  id: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  storage: "local" | "cloudinary";
  /** Path under the private upload root, or a Cloudinary public id. */
  key: string;
  resourceType: "image" | "raw";
};

export type QuoteStatusEvent = {
  id: string;
  previousStatus: QuoteStatus | null;
  newStatus: QuoteStatus;
  at: string;
  by: string;
};

export const PAYMENT_STATUSES = ["unpaid", "advance_received", "full_paid"] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  unpaid: "Payment pending",
  advance_received: "Advance received",
  full_paid: "Full payment done",
};

/** Default shop UPI. Admin can change this from the quote order screen. */
export const DEFAULT_UPI_ID = "919910374874@wahdfcbank";

export function isPaymentStatus(value: string): value is PaymentStatus {
  return (PAYMENT_STATUSES as readonly string[]).includes(value);
}

export function isUpiId(value: string): boolean {
  return /^[a-zA-Z0-9.\-_]{2,64}@[a-zA-Z]{2,64}$/.test(value);
}

/** Rupees, up to 2 decimal places. Empty clears the QR. */
export function parsePaymentAmount(value: unknown): number | null | undefined {
  if (value === undefined) return undefined;
  if (value === null || String(value).trim() === "") return null;
  const n = Number(String(value).replace(/,/g, "").trim());
  if (!Number.isFinite(n) || n <= 0 || n > 10000000) return undefined;
  return Math.round(n * 100) / 100;
}

export function upiPayUri(opts: {
  upiId: string;
  payeeName: string;
  amount: number;
  orderId: string;
}): string {
  const q = [
    `pa=${encodeURIComponent(opts.upiId)}`,
    `pn=${encodeURIComponent(opts.payeeName)}`,
    `am=${encodeURIComponent(opts.amount.toFixed(2))}`,
    "cu=INR",
    `tn=${encodeURIComponent(opts.orderId)}`,
  ].join("&");
  return `upi://pay?${q}`;
}

export type QuoteInquiry = {
  id: string;
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
  status: QuoteStatus;
  orderId: string | null;
  orderCreatedAt: string | null;
  adminNotes: string;
  expectedCompletion: string | null;
  /** Amount encoded in this customer's UPI QR. Null until admin sets it. */
  paymentAmount: number | null;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  history: QuoteStatusEvent[];
};

export type PublicTrackedOrder = {
  orderId: string;
  product: string;
  category: string;
  productCategory: string;
  orderDate: string;
  status: QuoteStatus;
  statusLabel: string;
  size: string;
  quantity: string;
  pagesSet: string;
  printingColor: string;
  latestUpdate: { label: string; at: string } | null;
  expectedCompletion: string | null;
  cancelled: boolean;
  timeline: { key: string; label: string; state: "done" | "current" | "upcoming" }[];
  payment: {
    amount: number;
    status: PaymentStatus;
    statusLabel: string;
    upiId: string;
    qrDataUrl?: string;
  } | null;
};

const ORDER_ID_RE = /^ORD-\d{4}-\d{5}$/;
const INQUIRY_ID_RE = /^INQ-\d{4}-\d{5}$/;

export function isQuoteOrderId(value: string): boolean {
  return ORDER_ID_RE.test(value.trim().toUpperCase());
}

export function isInquiryId(value: string): boolean {
  return INQUIRY_ID_RE.test(value.trim().toUpperCase());
}

export function printingColorLabel(value: string): string {
  return PRINTING_COLORS.find((c) => c.value === value)?.label ?? value;
}

export function cleanText(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function normalizeMobile(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  const local =
    digits.length === 12 && digits.startsWith("91")
      ? digits.slice(2)
      : digits.length === 11 && digits.startsWith("0")
        ? digits.slice(1)
        : digits;
  if (!/^[6-9]\d{9}$/.test(local)) return null;
  return local;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 160;
}

export function nextSerial(
  prefix: "ORD" | "INQ",
  year: number,
  existing: Iterable<string>,
): string {
  const head = `${prefix}-${year}-`;
  let max = 0;
  const taken = new Set<string>();
  for (const raw of existing) {
    const id = raw.trim().toUpperCase();
    taken.add(id);
    if (!id.startsWith(head)) continue;
    const n = Number(id.slice(head.length));
    if (Number.isInteger(n) && n > max) max = n;
  }
  let n = max + 1;
  if (n > 99999) {
    throw new Error(`${prefix} sequence is full for ${year}.`);
  }
  let candidate = `${head}${String(n).padStart(5, "0")}`;
  while (taken.has(candidate)) {
    n += 1;
    if (n > 99999) throw new Error(`${prefix} sequence is full for ${year}.`);
    candidate = `${head}${String(n).padStart(5, "0")}`;
  }
  return candidate;
}

export function toPublicTrackedOrder(
  inquiry: QuoteInquiry,
  upiId: string,
): PublicTrackedOrder | null {
  if (!inquiry.orderId) return null;
  const currentIndex = inquiry.status === "cancelled"
    ? -1
    : CUSTOMER_TIMELINE.findIndex((step) => step.match.includes(inquiry.status));
  const last = inquiry.history[inquiry.history.length - 1];
  return {
    orderId: inquiry.orderId,
    product: inquiry.product,
    category: inquiry.category,
    productCategory: inquiry.productCategory,
    orderDate: inquiry.orderCreatedAt ?? inquiry.createdAt,
    status: inquiry.status,
    statusLabel: QUOTE_STATUS_LABELS[inquiry.status],
    size: inquiry.size,
    quantity: inquiry.quantity,
    pagesSet: inquiry.pagesSet,
    printingColor: printingColorLabel(inquiry.printingColor),
    latestUpdate: last
      ? { label: QUOTE_STATUS_LABELS[last.newStatus], at: last.at }
      : null,
    expectedCompletion: inquiry.expectedCompletion,
    cancelled: inquiry.status === "cancelled",
    payment:
      inquiry.orderId && inquiry.paymentAmount && inquiry.paymentAmount > 0
        ? {
            amount: inquiry.paymentAmount,
            status: inquiry.paymentStatus ?? "unpaid",
            statusLabel: PAYMENT_STATUS_LABELS[inquiry.paymentStatus ?? "unpaid"],
            upiId,
          }
        : null,
    timeline: CUSTOMER_TIMELINE.map((step, index) => ({
      key: step.key,
      label: step.label,
      state:
        inquiry.status === "cancelled"
          ? "upcoming"
          : index < currentIndex
            ? "done"
            : index === currentIndex
              ? "current"
              : "upcoming",
    })),
  };
}

export function isQuoteStatus(value: string): value is QuoteStatus {
  return (QUOTE_STATUSES as readonly string[]).includes(value);
}

export function isPrintingColor(value: string): value is PrintingColor {
  return PRINTING_COLORS.some((c) => c.value === value);
}
