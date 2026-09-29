"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import type { Service } from "@/lib/types";
import { useCart } from "@/components/cart/CartProvider";
import { estimateServiceLinePrice } from "@/lib/service-order-pricing";
import type { PriceCalculatorConfig } from "@/lib/price-calculator";

type Props = {
  service: Service;
  calculator: PriceCalculatorConfig;
  className?: string;
};

export function AddServiceToCartButton({
  service,
  calculator,
  className,
}: Props) {
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");

  const unitPrice = estimateServiceLinePrice(service.slug, 1, calculator);

  function handleAdd() {
    const quantity = Math.max(1, qty);
    const totalForLine = estimateServiceLinePrice(
      service.slug,
      quantity,
      calculator,
    );
    addItem({
      kind: "service",
      refId: service.id,
      title: service.name,
      quantity,
      unitPrice: Math.round(totalForLine / quantity),
      options: notes.trim() || undefined,
    });
    setOpen(false);
    setNotes("");
    setQty(1);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-900"
        }
      >
        <ShoppingCart className="h-4 w-4" />
        Add to Cart
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-cart-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 id="add-cart-title" className="text-lg font-bold text-slate-900">
              Add {service.name}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Est. from ₹{unitPrice} — final amount may vary by specs.
            </p>
            <label className="mt-4 block text-sm font-medium text-slate-700">
              Quantity
              <input
                type="number"
                min={1}
                max={9999}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value) || 1)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              />
            </label>
            <label className="mt-3 block text-sm font-medium text-slate-700">
              Size / paper / notes (optional)
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="e.g. 500 cards, matt finish"
              />
            </label>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 rounded-xl bg-brand-blue py-2.5 text-sm font-semibold text-white"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
