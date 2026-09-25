"use client";

import { useMemo, useState } from "react";
import { adminFetch } from "@/lib/admin-fetch";
import {
  DEFAULT_PRICE_CALCULATOR,
  type PriceCalculatorCategory,
  type PriceCalculatorConfig,
} from "@/lib/price-calculator";

export function PriceCalculatorManager({
  initial,
}: {
  initial: PriceCalculatorConfig;
}) {
  const [config, setConfig] = useState(initial);
  const [categoryKey, setCategoryKey] = useState(
    () => Object.keys(initial)[0] ?? "visiting_cards",
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const keys = useMemo(() => Object.keys(config), [config]);
  const cat = config[categoryKey] as PriceCalculatorCategory | undefined;

  function updateCategory(patch: Partial<PriceCalculatorCategory>) {
    if (!cat) return;
    setConfig((prev) => ({
      ...prev,
      [categoryKey]: { ...cat, ...patch },
    }));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await adminFetch("/api/admin/price-calculator", {
        method: "PUT",
        body: JSON.stringify(config),
      });
      setMessage("Price calculator saved. Check /services page.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function resetDefaults() {
    if (!confirm("Reset all calculator rates to defaults?")) return;
    setConfig(DEFAULT_PRICE_CALCULATOR);
    setMessage("Defaults loaded — click Save to apply.");
  }

  if (!cat) {
    return <p className="text-sm text-red-600">No calculator categories found.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-[#0a1628] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Calculator"}
        </button>
        <button
          type="button"
          onClick={resetDefaults}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
        >
          Reset to defaults
        </button>
        {message && <p className="text-sm text-emerald-700">{message}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">
            Category
          </label>
          <select
            value={categoryKey}
            onChange={(e) => setCategoryKey(e.target.value)}
            className="rounded-xl border px-3 py-2 text-sm min-w-[240px]"
          >
            {keys.map((k) => (
              <option key={k} value={k}>{config[k].name}</option>
            ))}
          </select>
        </div>
        <input
          value={cat.name}
          onChange={(e) => updateCategory({ name: e.target.value })}
          className="rounded-xl border px-3 py-2 text-sm flex-1 min-w-[200px]"
          placeholder="Display name"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <input
          value={cat.qtyUnit}
          onChange={(e) => updateCategory({ qtyUnit: e.target.value })}
          className="rounded-lg border px-3 py-2 text-sm"
          placeholder="Qty unit (Pcs, Books...)"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={cat.finishPerQty}
            onChange={(e) => updateCategory({ finishPerQty: e.target.checked })}
          />
          Finishing cost × quantity (bill books)
        </label>
        <input
          value={cat.quantities.join(", ")}
          onChange={(e) =>
            updateCategory({
              quantities: e.target.value
                .split(",")
                .map((n) => parseInt(n.trim(), 10))
                .filter((n) => !Number.isNaN(n) && n > 0),
            })
          }
          className="rounded-lg border px-3 py-2 text-sm sm:col-span-3"
          placeholder="Quantities (comma separated): 100, 500, 1000"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
        <h3 className="font-semibold text-sm">Paper / material options & base rates (₹)</h3>
        {cat.papers.map((p, idx) => (
          <div key={idx} className="flex flex-wrap gap-2">
            <input
              value={p.name}
              onChange={(e) => {
                const papers = [...cat.papers];
                papers[idx] = { ...p, name: e.target.value };
                updateCategory({ papers });
              }}
              className="flex-1 min-w-[200px] rounded-lg border px-3 py-2 text-sm"
            />
            <input
              type="number"
              step="0.01"
              value={p.baseRate}
              onChange={(e) => {
                const papers = [...cat.papers];
                papers[idx] = { ...p, baseRate: Number(e.target.value) || 0 };
                updateCategory({ papers });
              }}
              className="w-28 rounded-lg border px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() =>
                updateCategory({
                  papers: cat.papers.filter((_, i) => i !== idx),
                })
              }
              className="text-xs text-red-600 font-semibold px-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            updateCategory({
              papers: [
                ...cat.papers,
                { name: "New option", baseRate: 1 },
              ],
            })
          }
          className="text-sm font-semibold text-[#1e3a5f]"
        >
          + Add paper option
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
        <h3 className="font-semibold text-sm">Finishing add-ons (₹)</h3>
        {cat.finishings.map((f, idx) => (
          <div key={f.id} className="flex flex-wrap gap-2">
            <input
              value={f.name}
              onChange={(e) => {
                const finishings = [...cat.finishings];
                finishings[idx] = { ...f, name: e.target.value };
                updateCategory({ finishings });
              }}
              className="flex-1 min-w-[160px] rounded-lg border px-3 py-2 text-sm"
            />
            <input
              type="number"
              value={f.cost}
              onChange={(e) => {
                const finishings = [...cat.finishings];
                finishings[idx] = { ...f, cost: Number(e.target.value) || 0 };
                updateCategory({ finishings });
              }}
              className="w-24 rounded-lg border px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() =>
                updateCategory({
                  finishings: cat.finishings.filter((_, i) => i !== idx),
                })
              }
              className="text-xs text-red-600 font-semibold px-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            updateCategory({
              finishings: [
                ...cat.finishings,
                {
                  id: `f${Date.now()}`,
                  name: "New finishing",
                  cost: 50,
                },
              ],
            })
          }
          className="text-sm font-semibold text-[#1e3a5f]"
        >
          + Add finishing
        </button>
      </div>
    </div>
  );
}
