"use client";

import { Calculator, MessageSquare } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { whatsappLink } from "@/lib/constants";

type Paper = { name: string; baseRate: number };
type Finishing = { id: string; name: string; cost: number };

const calcDatabase: Record<
  string,
  {
    name: string;
    papers: Paper[];
    quantities: number[];
    finishings: Finishing[];
    qtyUnit: string;
    finishPerQty: boolean;
  }
> = {
  visiting_cards: {
    name: "Visiting Cards / Garment Tags",
    papers: [
      { name: "300 GSM Art Card (Standard)", baseRate: 0.35 },
      { name: "350 GSM Heavy Premium Board", baseRate: 0.5 },
      { name: "Velvet Soft Touch Board", baseRate: 0.85 },
    ],
    quantities: [100, 500, 1000, 2000],
    finishings: [
      { id: "f1", name: "Spot UV Texture", cost: 200 },
      { id: "f2", name: "Round Corner Cut", cost: 100 },
      { id: "f3", name: "Gold Foil Stamping", cost: 350 },
    ],
    qtyUnit: "Pcs",
    finishPerQty: false,
  },
  bill_books: {
    name: "Bill Books & Challan Pads",
    papers: [
      { name: "Duplicate Carbonless (50 Sets)", baseRate: 65 },
      { name: "Triplicate Carbonless (50 Sets)", baseRate: 95 },
      { name: "Single Sunlit Paper (100 Sheets)", baseRate: 45 },
    ],
    quantities: [5, 10, 20, 50],
    finishings: [
      { id: "f1", name: "Red Serial Numbering", cost: 50 },
      { id: "f2", name: "Hard Binder Binding", cost: 80 },
    ],
    qtyUnit: "Books",
    finishPerQty: true,
  },
  doctor_files: {
    name: "Doctor Files & Envelopes",
    papers: [
      { name: "Standard Laminated Doctor Folder", baseRate: 18 },
      { name: "ATM Protection Card Pouch", baseRate: 4.5 },
      { name: "Printed Envelope (9x4 inch)", baseRate: 2.2 },
    ],
    quantities: [100, 250, 500, 1000],
    finishings: [
      { id: "f1", name: "Inside File Clip", cost: 3 },
      { id: "f2", name: "Gloss Outer Lamination", cost: 2 },
    ],
    qtyUnit: "Pcs",
    finishPerQty: false,
  },
  banners: {
    name: "Flex Banners & Stickers",
    papers: [
      { name: "Star Flex Banner (Per Sq Ft)", baseRate: 12 },
      { name: "Gloss Vinyl Sticker (Per Sq Ft)", baseRate: 25 },
    ],
    quantities: [20, 50, 100, 200],
    finishings: [{ id: "f1", name: "Metal Eyelets & Ropes", cost: 30 }],
    qtyUnit: "SqFt",
    finishPerQty: false,
  },
  bulk_prints: {
    name: "Bulk Copying & Printouts",
    papers: [
      { name: "Single Side B/W Xerox (75 GSM)", baseRate: 0.75 },
      { name: "Double Side B/W Xerox", baseRate: 1.2 },
      { name: "Full Color A4 Laser Printout", baseRate: 5 },
    ],
    quantities: [100, 500, 1000, 5000],
    finishings: [
      {
        id: "f1",
        name: "Spiral Binding with Transparent Cover",
        cost: 30,
      },
    ],
    qtyUnit: "Pcs",
    finishPerQty: false,
  },
};

export function PriceEstimator() {
  const [category, setCategory] = useState("visiting_cards");
  const [paperIdx, setPaperIdx] = useState(0);
  const [quantity, setQuantity] = useState(1000);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const catData = calcDatabase[category];

  const resetOptions = useCallback((key: string) => {
    const data = calcDatabase[key];
    setPaperIdx(0);
    setQuantity(data.quantities[2] ?? data.quantities[0]);
    setChecked({});
  }, []);

  const { total, perUnit, finishLabel } = useMemo(() => {
    const paper = catData.papers[paperIdx] ?? catData.papers[0];
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
      perUnit: (rounded / quantity).toFixed(2),
      finishLabel:
        finishNames.length > 0 ? finishNames.join(", ") : "Standard Cut",
    };
  }, [catData, paperIdx, quantity, checked]);

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
              {Object.entries(calcDatabase).map(([key, val]) => (
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
                  <option key={p.name} value={idx}>{p.name}</option>
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
