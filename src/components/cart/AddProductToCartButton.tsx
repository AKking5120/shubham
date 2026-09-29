"use client";

import { ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart/CartProvider";

export function AddProductToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() =>
        addItem({
          kind: "product",
          refId: product.id,
          title: product.name,
          quantity: 1,
          unitPrice: 499,
          options: product.category,
        })
      }
      className="inline-flex items-center gap-1 rounded-lg bg-brand-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-900"
    >
      <ShoppingCart className="h-3.5 w-3.5" />
      Add to cart
    </button>
  );
}
