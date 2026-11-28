"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { whatsappLink } from "@/lib/constants";

type Props = {
  productName: string;
  productNames?: string[];
  kind: "flex" | "wedding";
  onClose: () => void;
  onWebsiteQuote?: () => void;
};

const fieldClass = "mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2";

export function WhatsAppQuoteDialog({ productName, productNames, kind, onClose, onWebsiteQuote }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const element = dialog.current;
    if (element && !element.open) element.showModal();
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const size = kind === "flex"
      ? `${value("width")} × ${value("height")} ${value("unit")} (width × height)`
      : value("size");
    const message = [
      "Hello Shubham Prints, I would like a quote.",
      productNames?.length ? `Designs: ${productNames.join(", ")}` : `Product: ${productName}`,
      `Quantity: ${value("quantity")}`,
      size && `Size: ${size}`,
      value("neededBy") && `Needed by: ${value("neededBy")}`,
      value("notes") && `Notes: ${value("notes")}`,
    ].filter(Boolean).join("\n");

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl bg-white p-5 text-slate-900 shadow-xl backdrop:bg-black/50 sm:p-6"
    >
      <h2 id={titleId} className="text-lg font-bold">{productName}</h2>
      {productNames?.length ? <p className="mt-2 text-sm text-slate-600">{productNames.join(", ")}</p> : null}
      <form onSubmit={submit} className="mt-4 space-y-4 text-sm">
        <label className="block font-semibold">
          Quantity
          <input name="quantity" type="number" min="1" max="1000000" step="1" required className={fieldClass} />
        </label>
        {kind === "flex" ? (
          <div className="grid grid-cols-3 gap-2">
            <label className="block font-semibold">
              Width
              <input name="width" type="number" min="0.01" max="10000" step="any" required className={fieldClass} />
            </label>
            <label className="block font-semibold">
              Height
              <input name="height" type="number" min="0.01" max="10000" step="any" required className={fieldClass} />
            </label>
            <label className="block font-semibold">
              Unit
              <select name="unit" className={fieldClass}>
                <option value="ft">Feet</option>
                <option value="in">Inches</option>
                <option value="cm">Centimetres</option>
              </select>
            </label>
          </div>
        ) : (
          <label className="block font-semibold">
            Card size (optional)
            <input name="size" maxLength={60} placeholder="e.g. 5 × 7 inches" className={fieldClass} />
          </label>
        )}
        <label className="block font-semibold">
          Needed by (optional)
          <input name="neededBy" type="date" className={fieldClass} />
        </label>
        <label className="block font-semibold">
          Notes (optional)
          <textarea name="notes" rows={2} maxLength={300} className={fieldClass} />
        </label>
        <Link href="/print-file-guide" target="_blank" rel="noopener noreferrer" className="inline-block text-brand-blue underline underline-offset-2">Print file guide (opens in new tab)</Link>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => dialog.current?.close()} className="rounded-lg border border-slate-300 px-3 py-2 font-semibold">
            Cancel
          </button>
          <button type="submit" className="rounded-lg bg-green-700 px-3 py-2 font-semibold text-white hover:bg-green-800">
            Continue on WhatsApp
          </button>
        </div>
        {onWebsiteQuote && (
          <button type="button" onClick={onWebsiteQuote} className="text-brand-blue underline underline-offset-2">
            Use website quote form
          </button>
        )}
      </form>
    </dialog>
  );
}

export function FlexWhatsAppQuoteButton({ productName }: { productName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-brand-blue px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-800"
      >
        Get quote
      </button>
      {open && (
        <WhatsAppQuoteDialog productName={productName} kind="flex" onClose={() => setOpen(false)} />
      )}
    </>
  );
}
