"use client";

import { ServiceImage } from "@/components/services/ServiceImage";
import { useState } from "react";
import type { Service } from "@/lib/types";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { adminFetch } from "@/lib/admin-fetch";

export function ServicesManager({ initial }: { initial: Service[] }) {
  const [services, setServices] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function updateService(id: string, patch: Partial<Service>) {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    );
  }

  async function saveAll() {
    setSaving(true);
    setMessage("");
    try {
      await adminFetch("/api/services", {
        method: "PUT",
        body: JSON.stringify(services),
      });
      setMessage("Services saved successfully.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function addService() {
    const newService: Service = {
      id: `svc-${Date.now()}`,
      slug: `service-${Date.now()}`,
      name: "New Service",
      shortDescription: "Short description",
      description: "Full description",
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
      enabled: true,
      order: services.length + 1,
    };
    setServices((prev) => [...prev, newService]);
  }

  function deleteService(id: string) {
    if (!confirm("Delete this service?")) return;
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={addService}
          className="rounded-xl bg-[#0a1628] px-4 py-2 text-sm font-semibold text-white"
        >
          Add Service
        </button>
        <button
          type="button"
          onClick={saveAll}
          disabled={saving}
          className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-[#0a1628] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {message && (
          <p
            className={`text-sm ${message.includes("success") ? "text-emerald-700" : "text-red-600"}`}
          >
            {message}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[160px_1fr]"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <ServiceImage
                src={service.image}
                alt={service.name}
                fill
              />
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={service.enabled}
                    onChange={(e) =>
                      updateService(service.id, { enabled: e.target.checked })
                    }
                  />
                  Enabled
                </label>
                <button
                  type="button"
                  onClick={() => deleteService(service.id)}
                  className="text-sm text-red-600"
                >
                  Delete
                </button>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <input
                  value={service.name}
                  onChange={(e) =>
                    updateService(service.id, { name: e.target.value })
                  }
                  className="rounded-lg border px-3 py-2 text-sm font-semibold sm:col-span-2"
                  placeholder="Service name"
                />
                <input
                  type="number"
                  value={service.order}
                  onChange={(e) =>
                    updateService(service.id, {
                      order: Number(e.target.value) || 0,
                    })
                  }
                  className="rounded-lg border px-3 py-2 text-sm"
                  placeholder="Order"
                />
              </div>
              <input
                value={service.slug}
                onChange={(e) =>
                  updateService(service.id, { slug: e.target.value })
                }
                className="w-full rounded-lg border px-3 py-2 text-sm font-mono"
                placeholder="URL slug (e.g. bill-book)"
              />
              <ImageUploadField
                folder="services"
                onUploaded={(url) => updateService(service.id, { image: url })}
              />
              <input
                value={service.image}
                onChange={(e) => updateService(service.id, { image: e.target.value })}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                placeholder="Image URL"
              />
              <textarea
                value={service.shortDescription}
                onChange={(e) =>
                  updateService(service.id, { shortDescription: e.target.value })
                }
                rows={2}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                placeholder="Short description"
              />
              <textarea
                value={service.description}
                onChange={(e) =>
                  updateService(service.id, { description: e.target.value })
                }
                rows={3}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                placeholder="Full description"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
