"use client";

import Image from "next/image";
import { X } from "lucide-react";
import {
  catalogWhatsAppQuote,
  type CatalogProduct,
} from "@/lib/print-catalog";

type Props = {
  open: boolean;
  product: CatalogProduct | null;
  categoryName: string;
  subcategoryName: string;
  onClose: () => void;
};

export function CatalogQuickViewModal({
  open,
  product,
  categoryName,
  subcategoryName,
  onClose,
}: Props) {
  if (!open || !product) return null;

  const wa = catalogWhatsAppQuote({
    productName: product.name,
    categoryName,
    subcategoryName,
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-3">
          <p className="text-xs font-bold uppercase text-brand-blue">
            {categoryName} · {subcategoryName}
          </p>
          <h2 className="text-xl font-bold text-slate-900">{product.name}</h2>
          <p className="text-sm text-slate-600">{product.description}</p>
          {product.priceLabel && (
            <p className="text-base font-bold text-slate-900">
              {product.priceLabel}
            </p>
          )}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-xl bg-[#25D366] py-3.5 text-sm font-bold text-white hover:bg-[#1ebe57]"
          >
            Get quote on WhatsApp
          </a>
          <p className="text-center text-xs text-slate-500">
            Share quantity, size & design — we reply from Jaitpur, Delhi.
          </p>
        </div>
      </div>
    </div>
  );
}
