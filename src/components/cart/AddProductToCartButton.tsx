"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart/CartProvider";
import { ConfigureOrderModal } from "@/components/cart/ConfigureOrderModal";

export function AddProductToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 rounded-lg bg-brand-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-900"
      >
        <ShoppingCart className="h-3.5 w-3.5" />
        Select size & design
      </button>

      <ConfigureOrderModal
        open={open}
        onClose={() => setOpen(false)}
        title={`Order: ${product.name}`}
        initialDesignName={product.name}
        priceHint={`Category: ${product.category} · est. from ₹499`}
        onConfirm={({ quantity, optionsSummary, fileUrl }) => {
          addItem({
            kind: "product",
            refId: product.id,
            title: product.name,
            quantity,
            unitPrice: 499,
            options: optionsSummary,
            fileUrl,
          });
        }}
      />
    </>
  );
}
