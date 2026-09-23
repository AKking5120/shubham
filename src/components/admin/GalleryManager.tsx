"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export function GalleryManager({ initial }: { initial: Product[] }) {
  const [products, setProducts] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function updateProduct(id: string, patch: Partial<Product>) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    );
  }

  async function saveAll() {
    setSaving(true);
    const res = await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
    });
    setSaving(false);
    setMessage(res.ok ? "Gallery updated." : "Save failed.");
  }

  function addProduct() {
    setProducts((prev) => [
      ...prev,
      {
        id: `prd-${Date.now()}`,
        name: "New Product",
        category: "Business Printing",
        description: "Description",
        image:
          "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",
      },
    ]);
  }

  function deleteProduct(id: string) {
    if (!confirm("Delete this image?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={addProduct}
          className="rounded-xl bg-[#0a1628] px-4 py-2 text-sm font-semibold text-white"
        >
          Upload Product Image
        </button>
        <button
          type="button"
          onClick={saveAll}
          disabled={saving}
          className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-[#0a1628]"
        >
          {saving ? "Saving..." : "Save Gallery"}
        </button>
        {message && <p className="text-sm text-emerald-700">{message}</p>}
      </div>
      <p className="text-sm text-slate-500">
        Upload photos to Cloudinary (when configured) or paste an image URL below.
        Click <strong>Save Gallery</strong> after changes.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="relative mb-3 aspect-video overflow-hidden rounded-xl">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <input
              value={product.name}
              onChange={(e) => updateProduct(product.id, { name: e.target.value })}
              className="mb-2 w-full rounded-lg border px-3 py-2 text-sm font-semibold"
            />
            <select
              value={product.category}
              onChange={(e) =>
                updateProduct(product.id, {
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
              onUploaded={(url) => updateProduct(product.id, { image: url })}
            />
            <input
              value={product.image}
              onChange={(e) => updateProduct(product.id, { image: e.target.value })}
              className="mb-2 w-full rounded-lg border px-3 py-2 text-xs"
              placeholder="Image URL"
            />
            <textarea
              value={product.description}
              onChange={(e) =>
                updateProduct(product.id, { description: e.target.value })
              }
              rows={2}
              className="mb-2 w-full rounded-lg border px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => deleteProduct(product.id)}
              className="text-sm text-red-600"
            >
              Delete Image
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
