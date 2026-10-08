"use client";

import { useState } from "react";
import type { CatalogProduct } from "@/lib/print-catalog";
import { CatalogProductCard } from "@/components/catalog/CatalogProductCard";
import { CatalogQuickViewModal } from "@/components/catalog/CatalogQuickViewModal";
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
  const best = products.filter((p) => p.bestSeller);
  const rest = products.filter((p) => !p.bestSeller);

  const renderGrid = (list: CatalogProduct[], sectionTitle?: string) => (
    <div className="mt-8">
      {sectionTitle && (
        <h2 className="text-center text-xl font-black text-slate-900 sm:text-2xl">
          {sectionTitle}
        </h2>
      )}
      <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((product) => (
          <CatalogProductCard
            key={product.slug}
            product={product}
            categoryName={categoryName}
            subcategoryName={subcategoryName}
            onQuickView={() => setActive(product)}
            onGetQuote={() => setQuoteFor(product)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {title && (
        <h1 className="text-center text-2xl font-black text-slate-900 sm:text-3xl">
          {title}
        </h1>
      )}
      {best.length > 0 && renderGrid(best, "Best sellers")}
      {rest.length > 0 &&
        renderGrid(
          rest,
          best.length > 0 ? "More options" : undefined,
        )}
      {products.length === 0 && (
        <p className="text-center text-slate-600">Products coming soon.</p>
      )}
      <CatalogQuickViewModal
        open={Boolean(active)}
        product={active}
        categoryName={categoryName}
        subcategoryName={subcategoryName}
        onClose={() => setActive(null)}
        onGetQuote={() => {
          if (active) setQuoteFor(active);
          setActive(null);
        }}
      />
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
