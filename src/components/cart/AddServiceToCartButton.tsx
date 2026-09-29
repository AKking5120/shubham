"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import type { Service } from "@/lib/types";
import { useCart } from "@/components/cart/CartProvider";
import { ConfigureOrderModal } from "@/components/cart/ConfigureOrderModal";
import { estimateServiceLinePrice } from "@/lib/service-order-pricing";
import type { PriceCalculatorConfig } from "@/lib/price-calculator";

type Props = {
  service: Service;
  calculator: PriceCalculatorConfig;
  className?: string;
};

export function AddServiceToCartButton({
  service,
  calculator,
  className,
}: Props) {
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);

  const unitPrice = estimateServiceLinePrice(service.slug, 1, calculator);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-900"
        }
      >
        <ShoppingCart className="h-4 w-4" />
        Select size & design
      </button>

      <ConfigureOrderModal
        open={open}
        onClose={() => setOpen(false)}
        title={`Order: ${service.name}`}
        serviceSlug={service.slug}
        priceHint={`Est. from ₹${unitPrice} — final amount may vary by specs.`}
        onConfirm={({ quantity, optionsSummary, fileUrl }) => {
          const totalForLine = estimateServiceLinePrice(
            service.slug,
            quantity,
            calculator,
          );
          addItem({
            kind: "service",
            refId: service.id,
            title: service.name,
            quantity,
            unitPrice: Math.round(totalForLine / quantity),
            options: optionsSummary,
            fileUrl,
          });
        }}
      />
    </>
  );
}
