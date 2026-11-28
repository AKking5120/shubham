"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { normalizeShopSearch, searchCatalog, type CatalogSearchHit } from "@/lib/print-catalog";
import { catalogKeywords } from "@/lib/shop-analytics";

export function ShopSearch({ index }: { index: CatalogSearchHit[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CatalogSearchHit[] | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (!value) {
      setResults(null);
      return;
    }

    const matches = searchCatalog(value, index);
    setResults(matches);
    const topic = matches.find((item) => item.categoryName.toLowerCase() === value.toLowerCase()) ?? matches[0];
    void fetch("/api/analytics", {
      method: "POST",
      body: JSON.stringify({
        type: topic ? "search" : "no-result",
        label: topic?.categorySlug ?? "",
        keywords: catalogKeywords(normalizeShopSearch(value)),
      }),
      keepalive: true,
    }).catch(() => {});
  }

  return (
    <div className="mx-auto mt-6 max-w-xl text-left">
      <form role="search" onSubmit={submit} className="flex gap-2">
        <label htmlFor="shop-search" className="sr-only">Search Shop products</label>
        <input
          id="shop-search"
          type="search"
          value={query}
          maxLength={80}
          placeholder="Search products"
          onChange={(event) => {
            setQuery(event.target.value);
            if (!event.target.value.trim()) setResults(null);
          }}
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3"
        />
        <button type="submit" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-blue px-3 font-semibold text-white">
          <Search size={16} aria-hidden="true" /> Search
        </button>
      </form>
      {results && (
        <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
          <p aria-live="polite" className="text-sm text-slate-600">{results.length ? `${results.length} products found` : "No products found. Try a product name or category."}</p>
          <ul className="mt-1 max-h-64 divide-y divide-slate-100 overflow-y-auto">
            {results.map((result) => (
              <li key={`${result.categorySlug}/${result.subcategorySlug}/${result.product.slug}`}>
                <Link href={`${result.href}#${result.product.slug}`} className="block py-2 text-sm font-semibold text-brand-blue hover:underline">
                  {result.product.name} <span className="font-normal text-slate-600">· {result.categoryName}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
