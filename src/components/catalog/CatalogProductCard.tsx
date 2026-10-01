"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import type { CatalogProduct } from "@/lib/print-catalog";

type Props = {
  product: CatalogProduct;
  categoryName: string;
  subcategoryName: string;
  whatsappHref: string;
  onQuickView: () => void;
};

export function CatalogProductCard({
  product,
  categoryName,
  subcategoryName,
  whatsappHref,
  onQuickView,
}: Props) {
  return (
    <article className="group flex flex-col bg-white">
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded bg-violet-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            {product.badge}
          </span>
        )}
        {product.bestSeller && (
          <span className="absolute right-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
            Best seller
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full gap-2 p-3 transition group-hover:translate-y-0">
          <button
            type="button"
            onClick={onQuickView}
            className="flex-1 border border-slate-900 bg-white py-2.5 text-xs font-bold uppercase tracking-wide text-slate-900 hover:bg-slate-50"
          >
            Quick view
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 bg-[#25D366] py-2.5 text-xs font-bold uppercase text-white hover:bg-[#1ebe57]"
          >
            <MessageCircle className="h-4 w-4" />
            Quote
          </a>
        </div>
      </div>
      <div className="border border-t-0 border-slate-200 px-3 py-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {categoryName}
        </p>
        <h3 className="mt-1 text-sm font-semibold text-slate-900 line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-slate-500 line-clamp-1">
          {subcategoryName}
        </p>
        {product.priceLabel && (
          <p className="mt-2 text-sm font-bold text-slate-900">
            {product.priceLabel}
          </p>
        )}
      </div>
    </article>
  );
}
