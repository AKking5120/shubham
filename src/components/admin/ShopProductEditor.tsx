"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Entry = { key: string; name: string; image: string; destination: string; hidden: boolean };
type Destination = { key: string; name: string };

export function ShopProductEditor({ entries, destinations }: { entries: Entry[]; destinations: Destination[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState(entries[0]?.key ?? "");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const item = entries.find((entry) => entry.key === selected);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/shop-products", { method: "POST", body: new FormData(event.currentTarget) });
      const result = await response.json();
      setMessage(response.ok ? "Product saved." : result.error ?? "Could not save.");
      if (response.ok) router.refresh();
    } catch {
      setMessage("Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-6 max-w-xl space-y-4">
      <label className="block">Product
        <select value={selected} disabled={saving} onChange={(event) => { setSelected(event.target.value); setMessage(""); }} className="mt-1 block w-full rounded border p-2">
          {entries.map((entry) => <option key={entry.key} value={entry.key}>{entry.name}{entry.hidden ? " (hidden)" : ""}</option>)}
        </select>
      </label>
      {item && (
        <form key={item.key + item.name + item.image + item.destination + item.hidden} onSubmit={save} className="space-y-4 rounded-xl border bg-white p-4">
          <input type="hidden" name="key" value={item.key} />
          <label className="block">Product name<input name="name" defaultValue={item.name} maxLength={120} required className="mt-1 block w-full rounded border p-2" /></label>
          <label className="block">Category
            <select name="destination" defaultValue={item.destination} className="mt-1 block w-full rounded border p-2">
              {destinations.map(({ key, name }) => <option key={key} value={key}>{name}</option>)}
            </select>
          </label>
          <a href={item.image} target="_blank" rel="noreferrer" className="block text-brand-blue underline">View current photo</a>
          <label className="block">Replace photo (optional)<input type="file" name="photo" accept="image/jpeg,image/png,image/webp" className="mt-1 block w-full" /></label>
          <label className="flex gap-2"><input type="checkbox" name="hidden" defaultChecked={item.hidden} /> Hide from Shop</label>
          <button disabled={saving} className="rounded bg-brand-blue px-4 py-2 font-semibold text-white disabled:opacity-60">{saving ? "Saving…" : "Save product"}</button>
        </form>
      )}
      <p role="status">{message}</p>
    </div>
  );
}
