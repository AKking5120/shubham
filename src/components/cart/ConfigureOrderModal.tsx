"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { sizeOptionsForService } from "@/lib/service-order-sizes";

export type ConfigureOrderResult = {
  quantity: number;
  sizeLabel: string;
  designLabel: string;
  fileUrl: string | null;
  optionsSummary: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  serviceSlug?: string;
  sizeOptions?: string[];
  initialDesignName?: string;
  priceHint?: string;
  onConfirm: (result: ConfigureOrderResult) => void;
};

type DesignMode = "gallery" | "upload" | "describe";

export function ConfigureOrderModal({
  open,
  onClose,
  title,
  serviceSlug,
  sizeOptions,
  initialDesignName = "",
  priceHint,
  onConfirm,
}: Props) {
  const sizes = useMemo(
    () => sizeOptions ?? (serviceSlug ? sizeOptionsForService(serviceSlug) : ["Standard", "Custom size"]),
    [sizeOptions, serviceSlug],
  );

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(sizes[0] ?? "");
  const [customSize, setCustomSize] = useState("");
  const [designMode, setDesignMode] = useState<DesignMode>(
    initialDesignName ? "gallery" : "gallery",
  );
  const [designName, setDesignName] = useState(initialDesignName);
  const [designNotes, setDesignNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  function resolvedSize(): string {
    if (size.includes("Custom") && customSize.trim()) {
      return customSize.trim();
    }
    if (size.includes("Custom") && !customSize.trim()) {
      return "";
    }
    return size;
  }

  async function handleSubmit() {
    setError(null);
    const sizeLabel = resolvedSize();
    if (!sizeLabel) {
      setError("Please select a size or enter custom dimensions.");
      return;
    }

    let designLabel = "";
    let fileUrl: string | null = null;

    if (designMode === "gallery") {
      if (!designName.trim()) {
        setError("Enter the gallery template / design name.");
        return;
      }
      designLabel = `Template: ${designName.trim()}`;
    } else if (designMode === "describe") {
      if (designNotes.trim().length < 5) {
        setError("Describe your design (min 5 characters).");
        return;
      }
      designLabel = designNotes.trim();
    } else {
      if (!file) {
        setError("Upload your design file (PDF, JPG, CDR, etc.).");
        return;
      }
      setUploading(true);
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/order-artwork", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Upload failed.");
          return;
        }
        fileUrl = data.url;
        designLabel = `Uploaded: ${file.name}`;
      } catch {
        setError("Could not upload file. Try again.");
        return;
      } finally {
        setUploading(false);
      }
    }

    const optionsSummary = `Size: ${sizeLabel} | Design: ${designLabel}`;
    onConfirm({
      quantity: Math.max(1, quantity),
      sizeLabel,
      designLabel,
      fileUrl,
      optionsSummary,
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        {priceHint && (
          <p className="mt-1 text-sm text-slate-600">{priceHint}</p>
        )}
        <p className="mt-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Select <strong>size</strong> and <strong>design</strong> before adding to cart.
        </p>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Size *
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            {sizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        {size.includes("Custom") && (
          <label className="mt-2 block text-sm font-medium text-slate-700">
            Custom size details *
            <input
              value={customSize}
              onChange={(e) => setCustomSize(e.target.value)}
              placeholder='e.g. 4" x 6", 1000 pcs'
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
        )}

        <fieldset className="mt-4">
          <legend className="text-sm font-medium text-slate-700">Design *</legend>
          <div className="mt-2 space-y-2 text-sm">
            <label className="flex gap-2 rounded-lg border border-slate-200 p-2 has-[:checked]:border-brand-blue">
              <input
                type="radio"
                name="designMode"
                checked={designMode === "gallery"}
                onChange={() => setDesignMode("gallery")}
              />
              Gallery template
            </label>
            {designMode === "gallery" && (
              <input
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                placeholder="Design name from gallery"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            )}
            <label className="flex gap-2 rounded-lg border border-slate-200 p-2">
              <input
                type="radio"
                name="designMode"
                checked={designMode === "upload"}
                onChange={() => setDesignMode("upload")}
              />
              Upload artwork file
            </label>
            {designMode === "upload" && (
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.ai,.cdr,.psd,.zip"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full text-sm"
              />
            )}
            <label className="flex gap-2 rounded-lg border border-slate-200 p-2">
              <input
                type="radio"
                name="designMode"
                checked={designMode === "describe"}
                onChange={() => setDesignMode("describe")}
              />
              Describe custom design
            </label>
            {designMode === "describe" && (
              <textarea
                value={designNotes}
                onChange={(e) => setDesignNotes(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="Colors, text, logo placement..."
              />
            )}
          </div>
          <Link href="/gallery" className="mt-2 inline-block text-xs text-brand-blue hover:underline">
            Browse design gallery →
          </Link>
        </fieldset>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Quantity
          <input
            type="number"
            min={1}
            max={9999}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value) || 1)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>

        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        )}

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={uploading}
            onClick={() => void handleSubmit()}
            className="flex-1 rounded-xl bg-brand-blue py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {uploading ? "Uploading…" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
