"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import type { Product } from "@/lib/types";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import { findProductIndex, productsInSameGallery } from "@/lib/gallery-utils";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { cn } from "@/lib/utils";
import { ProductGalleryModal } from "./ProductGalleryModal";

type GalleryOpenState = {
  products: Product[];
  index: number;
  title: string;
} | null;

type GalleryGridProps = {
  products: Product[];
  defaultProductId?: string;
};

export function GalleryGrid({
  products,
  defaultProductId,
}: GalleryGridProps) {
  const [filter, setFilter] = useState<string>("All");
  const [gallery, setGallery] = useState<GalleryOpenState>(null);

  const filtered = useMemo(() => {
    if (filter === "All") return products;
    return products.filter((p) => p.category === filter);
  }, [filter, products]);

  function openProductGallery(product: Product) {
    const set = productsInSameGallery(product, products);
    setGallery({
      products: set,
      index: findProductIndex(set, product.id),
      title: `${product.category} Gallery`,
    });
  }

  const openedFromUrl = useRef(false);

  useEffect(() => {
    if (!defaultProductId || openedFromUrl.current) return;
    const product = products.find((p) => p.id === defaultProductId);
    if (product) {
      openedFromUrl.current = true;
      setFilter(product.category);
      openProductGallery(product);
    }
  }, [defaultProductId, products]);

  const closeGallery = useCallback(() => setGallery(null), []);

  return (
    <>
      <AnimateOnScroll delay={80}>
        <div className="flex flex-wrap justify-center gap-2">
          {["All", ...GALLERY_CATEGORIES].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300",
                filter === cat
                  ? "scale-105 bg-[#0a1628] text-white shadow-md shadow-slate-900/15"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-[#1e3a5f]/30 hover:shadow-sm",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </AnimateOnScroll>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filtered.map((product, i) => (
          <AnimateOnScroll key={product.id} delay={i * 60}>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                openProductGallery(product);
              }}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl text-left ring-1 ring-slate-200/80 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:ring-amber-400/40"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/20 to-transparent opacity-70 transition duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transition duration-500 group-hover:translate-y-0">
                  <p className="text-sm font-semibold text-white">{product.name}</p>
                  <p className="text-xs text-slate-200">{product.category}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-amber-300">
                    <Sparkles className="h-3 w-3" />
                    View gallery
                  </p>
                </div>
              </div>
            </button>
          </AnimateOnScroll>
        ))}
      </div>

      {gallery && (
        <ProductGalleryModal
          products={gallery.products}
          initialIndex={gallery.index}
          title={gallery.title}
          onClose={closeGallery}
        />
      )}
    </>
  );
}
