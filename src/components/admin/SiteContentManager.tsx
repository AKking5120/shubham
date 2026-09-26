"use client";

import { useState } from "react";
import {
  mergeSiteContent,
  type ShopPhoto,
  type SiteContent,
} from "@/lib/site-content";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { adminFetch } from "@/lib/admin-fetch";

export function SiteContentManager({ initial }: { initial: SiteContent }) {
  const [content, setContent] = useState(() => mergeSiteContent(initial));
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

  function patchShopGallery(field: "title" | "subtitle", value: string) {
    setContent((prev) => ({
      ...prev,
      shopGallery: { ...prev.shopGallery, [field]: value },
    }));
  }

  function updateShopPhoto(index: number, patch: Partial<ShopPhoto>) {
    setContent((prev) => {
      const photos = prev.shopGallery.photos.map((p, i) =>
        i === index ? { ...p, ...patch } : p,
      );
      return { ...prev, shopGallery: { ...prev.shopGallery, photos } };
    });
  }

  function addShopPhoto() {
    setContent((prev) => ({
      ...prev,
      shopGallery: {
        ...prev.shopGallery,
        photos: [
          ...prev.shopGallery.photos,
          {
            id: `shop-${Date.now()}`,
            image: "",
            caption: "Shop photo",
          },
        ],
      },
    }));
  }

  function removeShopPhoto(index: number) {
    setContent((prev) => ({
      ...prev,
      shopGallery: {
        ...prev.shopGallery,
        photos: prev.shopGallery.photos.filter((_, i) => i !== index),
      },
    }));
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
    try {
      await adminFetch("/api/admin/site-content", {
        method: "PUT",
        body: JSON.stringify(full),
      });
      setContent(full);
      setMessage("Site content saved successfully.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
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
        {message && (
          <p
            className={`text-sm ${message.includes("success") ? "text-emerald-700" : "text-red-600"}`}
          >
            {message}
          </p>
        )}
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
        <h2 className="font-semibold text-[#0a1628]">Shop photos (home page)</h2>
        <p className="text-sm text-slate-600">
          Upload real photos of your shop, counter and machines. Shown in the
          &quot;Our Shop&quot; section on the home page.
        </p>
        <input
          className="w-full rounded-lg border px-3 py-2 text-sm"
          value={content.shopGallery?.title ?? ""}
          onChange={(e) => patchShopGallery("title", e.target.value)}
          placeholder="Section title"
        />
        <textarea
          className="w-full rounded-lg border px-3 py-2 text-sm"
          rows={2}
          value={content.shopGallery?.subtitle ?? ""}
          onChange={(e) => patchShopGallery("subtitle", e.target.value)}
          placeholder="Short description"
        />
        <div className="space-y-4">
          {(content.shopGallery?.photos ?? []).map((photo, index) => (
            <div
              key={photo.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Photo {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeShopPhoto(index)}
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
              {photo.image && (
                <img
                  src={photo.image}
                  alt=""
                  className="h-28 w-full max-w-xs rounded-lg object-cover border"
                />
              )}
              <input
                className="w-full rounded-lg border px-3 py-2 text-sm bg-white"
                value={photo.image}
                onChange={(e) => updateShopPhoto(index, { image: e.target.value })}
                placeholder="Image URL"
              />
              <ImageUploadField
                folder="shop"
                label="Upload shop photo"
                onUploaded={(url) => updateShopPhoto(index, { image: url })}
              />
              <input
                className="w-full rounded-lg border px-3 py-2 text-sm bg-white"
                value={photo.caption}
                onChange={(e) => updateShopPhoto(index, { caption: e.target.value })}
                placeholder="Caption (e.g. Front counter, UV machine)"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addShopPhoto}
          className="rounded-lg border border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          + Add shop photo
        </button>
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
