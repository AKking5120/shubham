"use client";

import { ServiceImage } from "@/components/services/ServiceImage";
import { Check } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { Product, Service } from "@/lib/types";
import { ProductGalleryModal } from "@/components/gallery/ProductGalleryModal";
import { serviceHighlights } from "@/lib/service-highlights";
import {
  productsForService,
  SERVICE_GALLERY_CATEGORIES,
} from "@/lib/gallery-utils";
import { AddServiceToCartButton } from "@/components/cart/AddServiceToCartButton";
import type { PriceCalculatorConfig } from "@/lib/price-calculator";
import type { GalleryCategory } from "@/lib/types";

function galleryProductsForService(service: Service, products: Product[]): Product[] {
  const matched = productsForService(service.slug, products);
  if (matched.length > 0) return matched;
  const cats = SERVICE_GALLERY_CATEGORIES[service.slug];
  const category: GalleryCategory = cats?.[0] ?? "Business Printing";
  return [
    {
      id: service.id,
      name: service.name,
      category,
      description: service.shortDescription,
      image: service.image,
    },
  ];
}

export function ServiceListRow({
  service,
  products = [],
  calculator,
}: {
  service: Service;
  products?: Product[];
  calculator: PriceCalculatorConfig;
}) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const highlights = serviceHighlights(service);
  const galleryItems = useMemo(
    () => galleryProductsForService(service, products),
    [service, products],
  );

  const openGallery = useCallback(() => setGalleryOpen(true), []);
  const closeGallery = useCallback(() => setGalleryOpen(false), []);

  return (
    <article
      id={service.slug}
      className="grid gap-6 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm md:grid-cols-[minmax(0,240px)_1fr_auto] md:items-center md:gap-8 md:p-6 lg:grid-cols-[280px_1fr_200px]"
    >
      <button
        type="button"
        onClick={openGallery}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl text-left ring-1 ring-slate-100"
      >
        <ServiceImage
          src={service.image}
          alt={service.name}
          fill
          className="transition duration-500 hover:scale-105"
          sizes="280px"
        />
      </button>

      <div className="min-w-0">
        <h2 className="text-2xl font-bold text-[#0a1628]">{service.name}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {service.description}
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-slate-700"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                strokeWidth={2.5}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2 md:items-stretch">
        <AddServiceToCartButton service={service} calculator={calculator} />
      </div>

      {galleryOpen && (
        <ProductGalleryModal
          products={galleryItems}
          initialIndex={0}
          title={service.name}
          onClose={closeGallery}
        />
      )}
    </article>
  );
}
