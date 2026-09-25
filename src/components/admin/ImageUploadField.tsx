"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

type ImageUploadFieldProps = {
  folder: "gallery" | "services";
  onUploaded: (url: string) => void;
  label?: string;
};

export function ImageUploadField({
  folder,
  onUploaded,
  label = "Upload to Cloudinary",
}: ImageUploadFieldProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      onUploaded(data.url);
      e.target.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-[#1e3a5f] hover:bg-slate-100">
        <Upload className="h-3.5 w-3.5" />
        {loading ? "Uploading..." : label}
        <input
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          disabled={loading}
          onChange={onChange}
        />
      </label>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
