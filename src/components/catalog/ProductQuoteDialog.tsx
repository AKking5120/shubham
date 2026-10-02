"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { catalogWhatsAppQuote, type CatalogProduct } from "@/lib/print-catalog";
import { PRINTING_COLORS } from "@/lib/quote-workflow";

type Props = {
  open: boolean;
  product: CatalogProduct | null;
  categoryName: string;
  categorySlug: string;
  subcategoryName: string;
  subcategorySlug: string;
  onClose: () => void;
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm outline-none transition focus:border-amber-500/60 focus:bg-white focus:ring-2 focus:ring-amber-400/25";

export function ProductQuoteDialog({
  open,
  product,
  categoryName,
  categorySlug,
  subcategoryName,
  subcategorySlug,
  onClose,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !product) return null;

  const contactHref = catalogWhatsAppQuote({
    productName: product.name,
    categoryName,
    subcategoryName,
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!product) return;
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("categorySlug", categorySlug);
    fd.set("productCategorySlug", subcategorySlug);
    fd.set("productSlug", product.slug);
    try {
      const res = await fetch("/api/quotes", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setReference(String(data.reference ?? ""));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-dialog-title"
      onClick={onClose}
    >
      <div
        className="flex max-h-[100dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[90dvh] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {categoryName} · {subcategoryName}
            </p>
            <h2 id="quote-dialog-title" className="mt-1 text-lg font-bold text-[#0a1628]">
              Get quote — {product.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4">
          {reference ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
              <h3 className="text-xl font-bold text-[#0a1628]">Quote request sent</h3>
              <p className="mt-2 text-sm text-slate-600">
                We have your requirements. The shop will contact you with the price.
                An Order ID is created only after you confirm the order.
              </p>
              <p className="mt-4 text-sm text-slate-500">Reference</p>
              <p className="font-mono text-lg font-bold text-[#1e3a5f]">{reference}</p>
              <button
                type="button"
                className="mt-5 text-sm font-medium text-[#1e3a5f] underline"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Customer name
                  <input name="customerName" required autoComplete="name" className={`mt-1 ${inputClass}`} />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Mobile number
                  <input
                    name="phone"
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="10-digit mobile"
                    className={`mt-1 ${inputClass}`}
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                  Email
                  <input name="email" type="email" required autoComplete="email" className={`mt-1 ${inputClass}`} />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Size
                  <input name="size" required placeholder="e.g. A4, 3.5×2 in" className={`mt-1 ${inputClass}`} />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Quantity
                  <input name="quantity" required inputMode="numeric" min={1} className={`mt-1 ${inputClass}`} />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Pages / set
                  <input name="pagesSet" required placeholder="e.g. 1, 50, duplicate" className={`mt-1 ${inputClass}`} />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Printing color
                  <select name="printingColor" required defaultValue="black_white" className={`mt-1 ${inputClass}`}>
                    {PRINTING_COLORS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-700">
                Upload design / artwork
                <input
                  name="artwork"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.gif,.tif,.tiff,.pdf,.ai,.psd,.eps,.cdr,.svg,image/*,application/pdf"
                  className="mt-1 block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-[#0a1628] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setFileName(file?.name ?? "");
                    setError("");
                  }}
                />
                <span className="mt-1 block text-xs text-slate-500">
                  {fileName
                    ? `Selected: ${fileName}`
                    : "Optional. JPG, PNG, WEBP, PDF, AI, PSD, EPS or CDR. Up to 12 MB."}
                </span>
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Description / additional requirements
                <textarea name="description" rows={3} className={`mt-1 ${inputClass}`} />
              </label>

              {error && (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#0a1628] shadow-lg shadow-amber-500/25 disabled:opacity-60"
                >
                  {loading ? "Sending…" : "Get quote"}
                </button>
                <a
                  href={contactHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#1ebe57]"
                >
                  Contact
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
