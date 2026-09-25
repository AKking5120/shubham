"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Product, Service } from "@/lib/types";
import type { DesignGalleryOverride } from "@/lib/store";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { adminFetch } from "@/lib/admin-fetch";

type Props = {
  services: Service[];
  initialOverrides: Record<string, DesignGalleryOverride>;
  registryCounts: Record<string, number>;
};

export function DesignGalleryManager({
  services,
  initialOverrides,
  registryCounts,
}: Props) {
  const [overrides, setOverrides] = useState(initialOverrides);
  const [slug, setSlug] = useState(services[0]?.slug ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const current = overrides[slug] ?? {
    replaceRegistry: false,
    items: [] as Product[],
  };

  const registryCount = registryCounts[slug] ?? 0;

  const items = useMemo(() => current.items ?? [], [current.items]);

  function setCurrent(patch: Partial<DesignGalleryOverride>) {
    setOverrides((prev) => ({
      ...prev,
      [slug]: { ...current, ...patch },
    }));
  }

  function addItem() {
    const n = items.length + 1;
    setCurrent({
      items: [
        ...items,
        {
          id: `admin-${slug}-${Date.now()}`,
          name: `Custom Design ${n}`,
          category: "Cards",
          description: "Admin-added design template.",
          image: "/services/visiting-card-tag.jpg",
        },
      ],
    });
  }

  function updateItem(id: string, patch: Partial<Product>) {
    setCurrent({
      items: items.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });
  }

  function removeItem(id: string) {
    setCurrent({ items: items.filter((p) => p.id !== id) });
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      await adminFetch("/api/admin/design-gallery", {
        method: "PUT",
        body: JSON.stringify({ overrides }),
      });
      setMessage("Design gallery settings saved.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Manage per-service design templates shown in <strong>View Photos</strong> on
        the website. Registry templates from sync remain unless you enable
        &quot;Replace registry&quot;. Add custom images to show first or instead.
      </p>

      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">
            Service
          </label>
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="rounded-xl border px-3 py-2 text-sm min-w-[220px]"
          >
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name} ({registryCounts[s.slug] ?? 0} synced)
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-[#0a1628]"
        >
          {saving ? "Saving..." : "Save All Design Settings"}
        </button>
        {message && (
          <span
            className={`text-sm ${message.includes("saved") ? "text-emerald-700" : "text-red-600"}`}
          >
            {message}
          </span>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <p className="text-sm text-slate-600">
          Synced templates in registry: <strong>{registryCount}</strong>
        </p>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={current.replaceRegistry}
            onChange={(e) => setCurrent({ replaceRegistry: e.target.checked })}
          />
          Replace registry — only show admin items below (hide synced gallery)
        </label>
        <button
          type="button"
          onClick={addItem}
          className="rounded-xl bg-[#0a1628] px-4 py-2 text-sm font-semibold text-white"
        >
          Add custom design image
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="relative mb-3 aspect-video overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                unoptimized={product.image.startsWith("http")}
              />
            </div>
            <input
              value={product.name}
              onChange={(e) => updateItem(product.id, { name: e.target.value })}
              className="mb-2 w-full rounded-lg border px-3 py-2 text-sm font-semibold"
            />
            <select
              value={product.category}
              onChange={(e) =>
                updateItem(product.id, {
                  category: e.target.value as Product["category"],
                })
              }
              className="mb-2 w-full rounded-lg border px-3 py-2 text-sm"
            >
              {GALLERY_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ImageUploadField
              folder="gallery"
              onUploaded={(url) => updateItem(product.id, { image: url })}
            />
            <input
              value={product.image}
              onChange={(e) => updateItem(product.id, { image: e.target.value })}
              className="mb-2 w-full rounded-lg border px-3 py-2 text-xs"
              placeholder="Image URL"
            />
            <button
              type="button"
              onClick={() => removeItem(product.id)}
              className="text-sm text-red-600 font-semibold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
