"use client";

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
      {products.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <CatalogProductCard
              key={product.slug}
              product={product}
              categoryName={categoryName}
              subcategoryName={subcategoryName}
              onQuickView={() => setActive(product)}
              onGetQuote={() => openQuote(product)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-600">Products coming soon.</p>
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
