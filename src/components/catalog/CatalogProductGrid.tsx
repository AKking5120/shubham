"use client";

import { weddingCardFilters } from "@/lib/wedding-card-filters";
import { useState } from "react";
import type { CatalogProduct } from "@/lib/print-catalog";
import { CatalogProductCard } from "@/components/catalog/CatalogProductCard";
import { CatalogQuickViewModal } from "@/components/catalog/CatalogQuickViewModal";
import { WhatsAppQuoteDialog } from "@/components/catalog/WhatsAppQuoteDialog";
import { ProductQuoteDialog } from "@/components/catalog/ProductQuoteDialog";

type Props = {
  categoryName: string;
  categorySlug: string;
  subcategoryName: string;
  subcategorySlug: string;
  products: CatalogProduct[];
  title?: string;
};

export function CatalogProductGrid({
  categoryName,
  categorySlug,
  subcategoryName,
  subcategorySlug,
  products,
  title,
}: Props) {
  const [active, setActive] = useState<CatalogProduct | null>(null);
  const [quoteFor, setQuoteFor] = useState<CatalogProduct | null>(null);
  const [whatsAppFor, setWhatsAppFor] = useState<CatalogProduct | null>(null);
  const wedding = categorySlug === "wedding-cards";
  const [colour, setColour] = useState("");
  const [style, setStyle] = useState("");
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [shortlistOpen, setShortlistOpen] = useState(false);
  const designs = wedding ? products.map((product) => ({ product, ...weddingCardFilters(product.slug) })) : [];
  const visible = wedding
    ? designs.filter((design) => (!colour || design.colour === colour) && (!style || design.style === style)).map(({ product }) => product)
    : products;

  function toggleShortlist(slug: string) {
    setShortlist((current) => current.includes(slug)
      ? current.filter((item) => item !== slug)
      : current.length < 3 ? [...current, slug] : current);
  }


  function openQuote(product: CatalogProduct) {
    if (wedding) setWhatsAppFor(product);
    else setQuoteFor(product);
  }


  return (
    <>
      {title && (
        <h1 className="text-center text-2xl font-black text-slate-900 sm:text-3xl">
          {title}
        </h1>
      )}
      {wedding && (
        <div className="mt-5 rounded-xl border bg-white p-4">
          <div className="flex flex-wrap items-end gap-4">
            <label className="text-sm font-semibold">Colour
              <select className="mt-1 block rounded border p-2" value={colour} onChange={(event) => setColour(event.target.value)}>
                <option value="">All colours</option>
                {[...new Set(designs.map((design) => design.colour))].sort().map((name) => <option key={name}>{name}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold">Style
              <select className="mt-1 block rounded border p-2" value={style} onChange={(event) => setStyle(event.target.value)}>
                <option value="">All styles</option>
                {[...new Set(designs.map((design) => design.style))].sort().map((name) => <option key={name}>{name}</option>)}
              </select>
            </label>
            <button type="button" disabled={!shortlist.length} onClick={() => setShortlistOpen(true)} className="rounded bg-green-700 px-3 py-2 text-sm font-bold text-white disabled:opacity-50">Quote shortlist ({shortlist.length}/3)</button>
          </div>
          {shortlist.length > 0 && <ul className="mt-3 flex flex-wrap gap-2">{shortlist.map((slug) => (
            <li key={slug}><button type="button" onClick={() => toggleShortlist(slug)} className="rounded border px-2 py-1 text-xs">Remove {products.find((product) => product.slug === slug)?.name}</button></li>
          ))}</ul>}
        </div>
      )}
      {visible.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
          {visible.map((product) => (
            <div key={product.slug}>
            <CatalogProductCard
              product={product}
              categoryName={categoryName}
              subcategoryName={subcategoryName}
              onQuickView={() => setActive(product)}
              onGetQuote={() => openQuote(product)}
            />
            {wedding && <button type="button" aria-pressed={shortlist.includes(product.slug)} disabled={shortlist.length >= 3 && !shortlist.includes(product.slug)} onClick={() => toggleShortlist(product.slug)} className="mt-1 w-full rounded border px-2 py-1 text-sm disabled:opacity-50">
              {shortlist.includes(product.slug) ? "Remove from shortlist" : "Shortlist design"}
            </button>}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-600">{products.length ? "No designs match these filters." : "Products coming soon."}</p>
      )}
      <CatalogQuickViewModal
        open={Boolean(active)}
        product={active}
        categoryName={categoryName}
        subcategoryName={subcategoryName}
        hideDirectContact={wedding}
        onClose={() => setActive(null)}
        onGetQuote={() => {
          if (active) openQuote(active);
          setActive(null);
        }}
      />
      {shortlistOpen && (
        <WhatsAppQuoteDialog
          productName="Wedding Card Shortlist"
          productNames={shortlist.map((slug) => products.find((product) => product.slug === slug)?.name ?? slug)}
          kind="wedding"
          onClose={() => setShortlistOpen(false)}
        />
      )}
      {whatsAppFor && (
        <WhatsAppQuoteDialog
          productName={whatsAppFor.name}
          kind="wedding"
          onClose={() => setWhatsAppFor(null)}
          onWebsiteQuote={() => {
            setQuoteFor(whatsAppFor);
            setWhatsAppFor(null);
          }}
        />
      )}
      <ProductQuoteDialog
        key={quoteFor?.slug ?? "quote"}
        open={Boolean(quoteFor)}
        product={quoteFor}
        categoryName={categoryName}
        categorySlug={categorySlug}
        subcategoryName={subcategoryName}
        subcategorySlug={subcategorySlug}
        onClose={() => setQuoteFor(null)}
      />
    </>
  );
}
