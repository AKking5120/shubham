"use client";

import { Calculator, MessageSquare } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { whatsappLink } from "@/lib/constants";
import type { PriceCalculatorConfig } from "@/lib/price-calculator";

type Props = {
  config: PriceCalculatorConfig;
};

export function PriceEstimator({ config }: Props) {
  const keys = Object.keys(config);
  const firstKey = keys[0] ?? "visiting_cards";

  const [category, setCategory] = useState(firstKey);
  const [paperIdx, setPaperIdx] = useState(0);
  const [quantity, setQuantity] = useState(
    () => config[firstKey]?.quantities[2] ?? config[firstKey]?.quantities[0] ?? 100,
  );
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const catData = config[category] ?? config[firstKey];

  const resetOptions = useCallback(
    (key: string) => {
      const data = config[key];
      if (!data) return;
      setPaperIdx(0);
      setQuantity(data.quantities[2] ?? data.quantities[0] ?? 100);
      setChecked({});
    },
    [config],
  );

  const { total, perUnit, finishLabel } = useMemo(() => {
    if (!catData) {
      return { total: 0, perUnit: "0", finishLabel: "—" };
    }
    const paper = catData.papers[paperIdx] ?? catData.papers[0];
    if (!paper) {
      return { total: 0, perUnit: "0", finishLabel: "—" };
    }
    let sum = paper.baseRate * quantity;
    const finishNames: string[] = [];

    for (const f of catData.finishings) {
      if (!checked[f.id]) continue;
      finishNames.push(f.name);
      sum += catData.finishPerQty ? f.cost * quantity : f.cost;
    }

    const rounded = Math.round(sum);
    return {
      total: rounded,
      perUnit: quantity ? (rounded / quantity).toFixed(2) : "0",
      finishLabel:
        finishNames.length > 0 ? finishNames.join(", ") : "Standard Cut",
    };
  }, [catData, paperIdx, quantity, checked]);

  if (!catData || keys.length === 0) {
    return (
      <p className="text-sm text-slate-600">
        Price calculator is not configured. Admin can set it up in the admin panel.
      </p>
    );
  }

  const paper = catData.papers[paperIdx] ?? catData.papers[0];

  function sendToWhatsApp() {
    const msg = `Namaste Shubham Prints! I calculated a rate quote on your website:\n\n- Item: ${paper.name}\n- Quantity: ${quantity} ${catData.qtyUnit}\n- Finishing: ${finishLabel}\n- Estimated Price: ₹${total}\n\nPlease confirm availability and payment options.`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6 lg:p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
        <Calculator className="w-5 h-5 text-brand-orange" />
        Quick Cost Calculator
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Select Product Category
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                resetOptions(e.target.value);
              }}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-brand-blue focus:outline-none"
            >
              {Object.entries(config).map(([key, val]) => (
                <option key={key} value={key}>{val.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Paper / Material Type
              </label>
              <select
                value={paperIdx}
                onChange={(e) => setPaperIdx(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-semibold"
              >
                {catData.papers.map((p, idx) => (
                  <option key={`${p.name}-${idx}`} value={idx}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                3. Quantity
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-semibold"
              >
                {catData.quantities.map((q) => (
                  <option key={q} value={q}>
                    {q} {catData.qtyUnit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              4. Special Finishing & Options
            </label>
            <div className="grid grid-cols-2 gap-3">
              {catData.finishings.map((f) => (
                <label
                  key={f.id}
                  className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded-xl cursor-pointer text-xs font-semibold text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={!!checked[f.id]}
                    onChange={(e) =>
                      setChecked((prev) => ({
                        ...prev,
                        [f.id]: e.target.checked,
                      }))
                    }
                    className="rounded text-brand-blue"
                  />
                  <span>{f.name} (+₹{f.cost})</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between border border-slate-800 shadow-inner">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs text-slate-400 uppercase font-semibold">
                Estimated Quote
              </span>
              <span className="bg-emerald-900/80 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                Approximate Market Rate
              </span>
            </div>
            <div className="py-6 text-center">
              <span className="text-4xl font-black text-amber-400">₹{total}</span>
              <span className="text-xs text-slate-400 block mt-1">
                ₹{perUnit} per unit
              </span>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between gap-2">
                <span>Selected Item:</span>
                <span className="font-bold text-white text-right">{paper.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span className="font-bold text-white">
                  {quantity} {catData.qtyUnit}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span>Finishing:</span>
                <span className="font-bold text-white text-right">{finishLabel}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-6">
            <button
              type="button"
              onClick={sendToWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition"
            >
              <MessageSquare className="w-4 h-4" />
              Order This Estimate via WhatsApp
            </button>
            <a
              href="/contact#quote"
              className="block w-full text-center bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 rounded-xl text-xs font-semibold"
            >
              Request Custom Modifications
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
