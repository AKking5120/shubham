"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  PAYMENT_STATUSES,
  PAYMENT_STATUS_LABELS,
  PRINTING_COLORS,
  QUOTE_STATUSES,
  QUOTE_STATUS_LABELS,
  printingColorLabel,
  type PaymentStatus,
  type QuoteInquiry,
  type QuoteStatus,
} from "@/lib/quote-workflow";
import { formatDate } from "@/lib/utils";
import { EmailLink, PhoneLink } from "@/components/ui/ContactLinks";
import { whatsappLinkForPhone } from "@/lib/constants";

export function QuoteOrderDetail({
  quote,
  upiId: initialUpi,
  qrDataUrl,
}: {
  quote: QuoteInquiry;
  upiId: string;
  qrDataUrl: string | null;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<QuoteStatus>(quote.status);
  const [notes, setNotes] = useState(quote.adminNotes);
  const [expected, setExpected] = useState(quote.expectedCompletion ?? "");
  const [customerName, setCustomerName] = useState(quote.customerName);
  const [phone, setPhone] = useState(quote.phone);
  const [email, setEmail] = useState(quote.email);
  const [size, setSize] = useState(quote.size);
  const [quantity, setQuantity] = useState(quote.quantity);
  const [pagesSet, setPagesSet] = useState(quote.pagesSet);
  const [printingColor, setPrintingColor] = useState(quote.printingColor);
  const [description, setDescription] = useState(quote.description);
  const [upiId, setUpiId] = useState(initialUpi);
  const [paymentAmount, setPaymentAmount] = useState(
    quote.paymentAmount ? String(quote.paymentAmount) : "",
  );
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
    quote.paymentStatus ?? "unpaid",
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    const res = await fetch(`/api/admin/quotes/${quote.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status,
        adminNotes: notes,
        expectedCompletion: expected,
        customerName,
        phone,
        email,
        size,
        quantity,
        pagesSet,
        printingColor,
        description,
      }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Could not save.");
      return;
    }
    setMessage("Saved.");
    router.refresh();
  }

  async function savePayment(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    const upiRes = await fetch("/api/admin/payment-settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ upiId }),
    });
    const upiData = await upiRes.json();
    if (!upiRes.ok) {
      setBusy(false);
      setError(upiData.error ?? "Could not save the UPI ID.");
      return;
    }
    const res = await fetch(`/api/admin/quotes/${quote.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentAmount,
        paymentStatus,
      }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Could not save payment.");
      return;
    }
    setMessage("Payment QR saved. It now shows on order tracking.");
    router.refresh();
  }

  async function createOrder() {
    setBusy(true);
    setError("");
    setMessage("");
    const res = await fetch(`/api/admin/quotes/${quote.id}/order`, { method: "POST" });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Could not create the order.");
      return;
    }
    setMessage(`Order ID ${data.orderId} created.`);
    if (data.quote?.status) setStatus(data.quote.status);
    router.refresh();
  }

  const contact = whatsappLinkForPhone(
    quote.phone,
    `Hello ${quote.customerName}, this is Shubham Prints regarding your quote for ${quote.product} (${quote.id}).`,
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-slate-500">{quote.id}</p>
            <h2 className="mt-1 text-2xl font-bold text-[#0a1628]">{quote.customerName}</h2>
            <p className="text-sm text-slate-500">{formatDate(quote.createdAt)}</p>
          </div>
          <span className="rounded-full bg-[#0a1628] px-4 py-1.5 text-sm font-medium text-white">
            {QUOTE_STATUS_LABELS[quote.status]}
          </span>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Mobile">
            <PhoneLink phone={quote.phone} className="font-medium text-[#1e3a5f]" />
          </Field>
          <Field label="Email">
            <EmailLink email={quote.email} className="font-medium text-[#1e3a5f]" />
          </Field>
          <Field label="Order ID">
            <span className="font-mono font-semibold">{quote.orderId ?? "Not issued"}</span>
          </Field>
          <Field label="Category">{quote.category}</Field>
          <Field label="Product category">{quote.productCategory}</Field>
          <Field label="Product">{quote.product}</Field>
          <Field label="Size">{quote.size}</Field>
          <Field label="Quantity">{quote.quantity}</Field>
          <Field label="Pages / set">{quote.pagesSet}</Field>
          <Field label="Printing color">{printingColorLabel(quote.printingColor)}</Field>
          <Field label="Artwork">
            {quote.artwork ? (
              <a
                href={`/api/admin/quotes/${quote.id}/artwork`}
                className="font-medium text-[#1e3a5f] underline"
              >
                Download {quote.artwork.originalName}
              </a>
            ) : (
              "—"
            )}
          </Field>
          <Field label="Expected completion">
            {quote.expectedCompletion ?? "—"}
          </Field>
        </dl>
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase text-slate-400">Description</p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">
            {quote.description || "—"}
          </p>
        </div>

        <form
          onSubmit={savePayment}
          className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/40 p-4"
        >
          <h3 className="font-semibold text-[#0a1628]">Payment QR</h3>
          <p className="mt-1 text-sm text-slate-600">
            Set this customer&apos;s amount after you confirm the order. The tracking page shows their QR. Mark advance or full payment once the money arrives.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700 sm:col-span-2">
              UPI ID
              <input
                value={upiId}
                onChange={(e) => setUpiId(e.target.value.trim())}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
            </label>
            <label className="text-sm font-medium text-slate-700">
              QR amount (₹)
              <input
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                inputMode="decimal"
                placeholder="e.g. 1500"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Payment status
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
              >
                {PAYMENT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s === "unpaid" ? "Payment not received" : PAYMENT_STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {qrDataUrl && (
            <div className="mt-4 flex items-center gap-4">
              <img src={qrDataUrl} alt="Payment QR preview" className="h-28 w-28 rounded-lg bg-white" />
              <p className="text-sm text-slate-600">
                This QR is for {quote.orderId} · ₹{quote.paymentAmount}
              </p>
            </div>
          )}
          <button
            type="submit"
            disabled={busy || !quote.orderId}
            className="mt-4 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-[#0a1628] disabled:opacity-60"
          >
            {quote.orderId ? "Save payment QR" : "Generate Order ID before adding a QR"}
          </button>
        </form>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={contact}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Contact on WhatsApp
          </a>
          {!quote.orderId && (
            <button
              type="button"
              onClick={createOrder}
              disabled={busy}
              className="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-[#0a1628] disabled:opacity-60"
            >
              Create order / Generate Order ID
            </button>
          )}
        </div>
      </div>

      <form onSubmit={save} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-[#0a1628]">Update order</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            Status
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as QuoteStatus)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
            >
              {QUOTE_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {QUOTE_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-slate-700">
            Expected completion
            <input
              type="date"
              value={expected}
              onChange={(e) => setExpected(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Customer name
            <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Mobile
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-slate-700 sm:col-span-2">
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Size
            <input value={size} onChange={(e) => setSize(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Quantity
            <input value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Pages / set
            <select value={pagesSet} onChange={(e) => setPagesSet(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2">
              {pagesSet && !["Single", "Duplicate", "Replicate"].includes(pagesSet) && (
                <option value={pagesSet}>{pagesSet}</option>
              )}
              <option value="Single">Single</option>
              <option value="Duplicate">Duplicate</option>
              <option value="Replicate">Replicate</option>
            </select>
          </label>
          <label className="text-sm font-medium text-slate-700">
            Printing color
            <select
              value={printingColor}
              onChange={(e) => setPrintingColor(e.target.value as QuoteInquiry["printingColor"])}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
            >
              {PRINTING_COLORS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="block text-sm font-medium text-slate-700">
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Admin notes
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" />
        </label>
        {error && <p className="text-sm text-red-700">{error}</p>}
        {message && <p className="text-sm text-emerald-700">{message}</p>}
        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-[#0a1628] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          Save changes
        </button>
      </form>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-[#0a1628]">Status history</h3>
        <ol className="mt-4 space-y-3">
          {[...quote.history].reverse().map((item) => (
            <li key={item.id} className="border-l-2 border-amber-400 pl-3 text-sm">
              <p className="font-medium text-[#0a1628]">
                {item.previousStatus
                  ? `${QUOTE_STATUS_LABELS[item.previousStatus]} → ${QUOTE_STATUS_LABELS[item.newStatus]}`
                  : QUOTE_STATUS_LABELS[item.newStatus]}
              </p>
              <p className="text-xs text-slate-500">
                {formatDate(item.at)} · {item.by}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm text-slate-800">{children}</dd>
    </div>
  );
}
