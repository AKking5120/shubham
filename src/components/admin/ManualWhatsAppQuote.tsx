"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { PRINTING_COLORS } from "@/lib/quote-workflow";

const field = "mt-1 block w-full rounded border border-slate-300 p-2";

export function ManualWhatsAppQuote() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/quotes", { method: "POST", body: new FormData(form) });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.error ?? "Could not save enquiry.");
        return;
      }
      router.push(`/admin/quotes/${result.id}`);
    } catch {
      setMessage("Could not save enquiry. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <details className="mt-5 max-w-2xl rounded-xl border bg-white p-4">
      <summary className="cursor-pointer font-semibold text-brand-blue">Add a WhatsApp enquiry</summary>
      <form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-2">
        <label>Customer name<input name="customerName" autoComplete="off" required maxLength={120} className={field} /></label>
        <label>WhatsApp number<input name="phone" type="tel" required maxLength={20} className={field} /></label>
        <label>Product<input name="product" required maxLength={120} className={field} /></label>
        <label>Email (optional)<input name="email" type="email" maxLength={160} className={field} /></label>
        <label>Quantity (optional)<input name="quantity" type="number" min={1} max={999999} className={field} /></label>
        <label>Size (optional)<input name="size" maxLength={80} className={field} /></label>
        <label>Printing colour
          <select name="printingColor" required defaultValue="" className={field}>
            <option value="" disabled>Choose a colour option</option>
            {PRINTING_COLORS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label className="sm:col-span-2">Details (optional)<textarea name="description" maxLength={1800} rows={3} className={field} /></label>
        <div className="sm:col-span-2">
          <button disabled={saving} className="rounded bg-brand-blue px-4 py-2 font-semibold text-white disabled:opacity-60">{saving ? "Saving…" : "Save enquiry"}</button>
          <p className="mt-2 text-sm text-slate-700" role="status">{message}</p>
        </div>
      </form>
    </details>
  );
}
