"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/site-content";

export function SiteContentManager({ initial }: { initial: SiteContent }) {
  const [content, setContent] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function patch<K extends keyof SiteContent>(
    section: K,
    field: keyof SiteContent[K],
    value: string,
  ) {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  }

  function patchBusinessAddress(field: keyof SiteContent["business"]["address"], value: string) {
    setContent((prev) => ({
      ...prev,
      business: {
        ...prev.business,
        address: { ...prev.business.address, [field]: value },
      },
    }));
  }

  function patchPhone(index: number, value: string) {
    setContent((prev) => {
      const phones = [...prev.business.phones];
      phones[index] = value;
      return { ...prev, business: { ...prev.business, phones } };
    });
  }

  async function save() {
    setSaving(true);
    setMessage("");
    const full = {
      ...content,
      business: {
        ...content.business,
        address: {
          ...content.business.address,
          full: `${content.business.address.line1}, ${content.business.address.line2}, ${content.business.address.city}`,
        },
      },
    };
    const res = await fetch("/api/admin/site-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(full),
    });
    setSaving(false);
    if (res.ok) {
      setContent(full);
      setMessage("Site content saved. Refresh the public site to see updates.");
    } else {
      setMessage("Save failed.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-[#0a1628] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Site Content"}
        </button>
        {message && <p className="text-sm text-emerald-700">{message}</p>}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="font-semibold text-[#0a1628]">Business & contact</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="rounded-lg border px-3 py-2 text-sm"
            value={content.business.name}
            onChange={(e) => patch("business", "name", e.target.value)}
            placeholder="Business name"
          />
          <input
            className="rounded-lg border px-3 py-2 text-sm"
            value={content.business.owner}
            onChange={(e) => patch("business", "owner", e.target.value)}
            placeholder="Owner name"
          />
          <input
            className="rounded-lg border px-3 py-2 text-sm"
            value={content.business.email}
            onChange={(e) => patch("business", "email", e.target.value)}
            placeholder="Email"
          />
          <input
            className="rounded-lg border px-3 py-2 text-sm"
            value={content.business.slogan}
            onChange={(e) => patch("business", "slogan", e.target.value)}
            placeholder="Slogan"
          />
          {content.business.phones.map((phone, i) => (
            <input
              key={i}
              className="rounded-lg border px-3 py-2 text-sm"
              value={phone}
              onChange={(e) => patchPhone(i, e.target.value)}
              placeholder={`Phone ${i + 1}`}
            />
          ))}
          <input
            className="rounded-lg border px-3 py-2 text-sm sm:col-span-2"
            value={content.business.address.line1}
            onChange={(e) => patchBusinessAddress("line1", e.target.value)}
            placeholder="Address line 1"
          />
          <input
            className="rounded-lg border px-3 py-2 text-sm"
            value={content.business.address.line2}
            onChange={(e) => patchBusinessAddress("line2", e.target.value)}
            placeholder="Address line 2"
          />
          <input
            className="rounded-lg border px-3 py-2 text-sm"
            value={content.business.address.city}
            onChange={(e) => patchBusinessAddress("city", e.target.value)}
            placeholder="City / PIN"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="font-semibold text-[#0a1628]">Top announcement bar</h2>
        <input
          className="w-full rounded-lg border px-3 py-2 text-sm"
          value={content.announcement.badge}
          onChange={(e) => patch("announcement", "badge", e.target.value)}
          placeholder="Badge text"
        />
        <textarea
          className="w-full rounded-lg border px-3 py-2 text-sm"
          rows={2}
          value={content.announcement.text}
          onChange={(e) => patch("announcement", "text", e.target.value)}
          placeholder="Announcement message"
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="font-semibold text-[#0a1628]">Home hero</h2>
        <input
          className="w-full rounded-lg border px-3 py-2 text-sm"
          value={content.hero.title}
          onChange={(e) => patch("hero", "title", e.target.value)}
          placeholder="Headline (before highlight)"
        />
        <input
          className="w-full rounded-lg border px-3 py-2 text-sm"
          value={content.hero.highlight}
          onChange={(e) => patch("hero", "highlight", e.target.value)}
          placeholder="Highlighted words (gradient)"
        />
        <textarea
          className="w-full rounded-lg border px-3 py-2 text-sm"
          rows={3}
          value={content.hero.description}
          onChange={(e) => patch("hero", "description", e.target.value)}
          placeholder="Hero description"
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="font-semibold text-[#0a1628]">SEO & WhatsApp</h2>
        <input
          className="w-full rounded-lg border px-3 py-2 text-sm"
          value={content.seo.title}
          onChange={(e) => patch("seo", "title", e.target.value)}
          placeholder="Page title"
        />
        <textarea
          className="w-full rounded-lg border px-3 py-2 text-sm"
          rows={2}
          value={content.seo.description}
          onChange={(e) => patch("seo", "description", e.target.value)}
          placeholder="Meta description"
        />
        <input
          className="w-full rounded-lg border px-3 py-2 text-sm"
          value={content.contact.workingHours}
          onChange={(e) => patch("contact", "workingHours", e.target.value)}
          placeholder="Working hours"
        />
        <textarea
          className="w-full rounded-lg border px-3 py-2 text-sm"
          rows={2}
          value={content.contact.whatsappDefaultMessage}
          onChange={(e) =>
            patch("contact", "whatsappDefaultMessage", e.target.value)
          }
          placeholder="Default WhatsApp message"
        />
      </section>
    </div>
  );
}
