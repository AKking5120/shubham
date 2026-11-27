"use client";

import Link from "next/link";
import { Calculator, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { ConfigureOrderModal } from "@/components/cart/ConfigureOrderModal";
import { useCart } from "@/components/cart/CartProvider";
import { sizeOptionsForCalculator } from "@/lib/service-order-sizes";

const rates = {
  "300": { single: 500, double: 800 },
  "500": { single: 1500, double: 1800 },
} as const;
const sideLabels = { single: "Single-sided", double: "Double-sided" } as const;
const packSize = 1000;
const maxPacks = 9999;
const cartRef = "visiting_cards";
const selectClass = "w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm font-semibold";
const format = new Intl.NumberFormat("en-IN");
type Paper = keyof typeof rates;
type Side = keyof typeof sideLabels;

export function PriceEstimator() {
  const { addItem } = useCart();
  const [configureOpen, setConfigureOpen] = useState(false);
  const [paper, setPaper] = useState<Paper>("300");
  const [side, setSide] = useState<Side>("single");
  const [packInput, setPackInput] = useState("1");
  const packs = Number(packInput);
  const validPacks = Number.isInteger(packs) && packs >= 1 && packs <= maxPacks;
  const packRate = rates[paper][side];
  const total = packRate * packs;
  const printOptions = `${paper} GSM · ${sideLabels[side]}`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg lg:p-8">
      <h2 className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-3 text-xl font-bold text-slate-900">
        <Calculator className="size-5 text-brand-orange" aria-hidden="true" />
        Quick Cost Calculator
      </h2>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-7">
          <label className="block text-sm font-semibold text-slate-700">
            <span className="mb-2 block">Paper weight</span>
            <select className={selectClass} value={paper} onChange={(event) => setPaper(event.target.value as Paper)}>
              <option value="300">300 GSM</option>
              <option value="500">500 GSM</option>
            </select>
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            <span className="mb-2 block">Printing sides</span>
            <select className={selectClass} value={side} onChange={(event) => setSide(event.target.value as Side)}>
              <option value="single">Single-sided</option>
              <option value="double">Double-sided</option>
            </select>
          </label>
          <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">
            <span className="mb-2 block">Number of packs</span>
            <input
              type="number"
              min={1}
              max={maxPacks}
              step={1}
              inputMode="numeric"
              aria-describedby="visiting-card-pack-size"
              aria-invalid={!validPacks}
              className={selectClass}
              value={packInput}
              onChange={(event) => setPackInput(event.target.value)}
            />
            <span id="visiting-card-pack-size" className="mt-2 block font-normal text-slate-600">
              {validPacks
                ? "1 pack = 1,000 cards. Minimum order: 1 pack."
                : "Enter a whole number of packs, from 1 to 9,999."}
            </span>
          </label>
        </div>

        <div className="flex flex-col justify-between rounded-2xl bg-slate-900 p-6 text-white lg:col-span-5">
          <div>
            <h3 className="border-b border-slate-800 pb-3 text-sm font-semibold">Estimated Quote</h3>
            <div className="py-6 text-center" aria-live="polite">
              <span className="text-4xl font-black text-amber-400">
                {validPacks ? `₹${format.format(total)}` : "—"}
              </span>
              <span className="mt-1 block text-xs text-slate-300">₹{format.format(packRate)} per 1,000 cards</span>
            </div>
            <p className="rounded-xl bg-slate-800 p-3 text-sm text-slate-200">
              {printOptions}{validPacks && ` · ${format.format(packs * packSize)} pcs`}
            </p>
          </div>

          <div className="space-y-2 pt-6">
            <button
              type="button"
              disabled={!validPacks}
              onClick={() => setConfigureOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue py-3 text-sm font-bold text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart className="size-4" aria-hidden="true" />
              Select size &amp; design → cart
            </button>
            <ConfigureOrderModal
              open={configureOpen}
              onClose={() => setConfigureOpen(false)}
              title="Cart: Visiting Cards"
              fixedQuantity={packs}
              sizeOptions={sizeOptionsForCalculator(cartRef)}
              priceHint={`Estimate ₹${format.format(total)} · ${printOptions} · ${format.format(packs * packSize)} pcs`}
              onConfirm={({ quantity, optionsSummary, fileUrl }) => {
                if (!validPacks) return;
                addItem({
                  kind: "calculator",
                  refId: cartRef,
                  title: "Visiting Cards (1,000 pcs per pack)",
                  quantity,
                  unitPrice: packRate,
                  options: `${printOptions} | ${optionsSummary}`,
                  fileUrl,
                });
              }}
            />
            <Link href="/cart" className="block rounded-xl bg-slate-800 py-2.5 text-center text-xs font-semibold text-slate-200 hover:bg-slate-700">
              View cart &amp; checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
