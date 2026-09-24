"use client";

import { ServiceImage } from "@/components/services/ServiceImage";
import { useCallback, useMemo, useState } from "react";
import { Images, Phone } from "lucide-react";
import type { Product, Service } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ProductGalleryModal } from "@/components/gallery/ProductGalleryModal";
import {
  productsForService,
  SERVICE_GALLERY_CATEGORIES,
} from "@/lib/gallery-utils";
import { telLink, whatsappLink, BUSINESS } from "@/lib/constants";
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

export function ServiceCard({
  service,
  detailed = false,
  compact = false,
  products = [],
}: {
  service: Service;
  detailed?: boolean;
  /** Home grid: only View Service + Get Quote (mockup). */
  compact?: boolean;
  products?: Product[];
}) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const waText = `Hello, I would like a quote for ${service.name}.`;

  const galleryItems = useMemo(
    () => galleryProductsForService(service, products),
    [service, products],
  );

  const openGallery = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setGalleryOpen(true);
  }, []);

  const closeGallery = useCallback(() => setGalleryOpen(false), []);

  return (
    <article
      id={service.slug}
      className="group surface-card overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-amber-400/25"
    >
      <button
        type="button"
        onClick={openGallery}
        className="relative block w-full aspect-[4/3] overflow-hidden text-left after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-t after:from-[#0a1628]/50 after:to-transparent after:opacity-0 after:transition-opacity after:duration-500 group-hover:after:opacity-100"
        aria-label={`View ${service.name} photos`}
      >
        <ServiceImage
          src={service.image}
          alt={service.name}
          fill
          className="transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-[#0a1628]/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm opacity-0 transition group-hover:opacity-100">
          <Images className="h-3.5 w-3.5" />
          View Photos
        </span>
      </button>

      {galleryOpen && (
        <ProductGalleryModal
          products={galleryItems}
          initialIndex={0}
          title={service.name}
          onClose={closeGallery}
        />
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-[#0a1628]">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {detailed ? service.description : service.shortDescription}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {!detailed && (
            <Button
              href={`/services#${service.slug}`}
              variant="secondary"
              className="py-2.5 text-xs"
            >
              View Service
            </Button>
          )}
          <Button
            href={`/contact?service=${encodeURIComponent(service.name)}#quote`}
            variant="primary"
            className="py-2.5 text-xs"
          >
            Get Quote
          </Button>
          {!compact && !detailed && (
            <>
              <button
                type="button"
                onClick={openGallery}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-[#1e3a5f] hover:bg-slate-50"
              >
                <Images className="mr-1 h-3.5 w-3.5" />
                Photos
              </button>
              <a
                href={whatsappLink(waText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1ebe57]"
              >
                WhatsApp
              </a>
              <a
                href={telLink(BUSINESS.phones[0])}
                className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-[#1e3a5f]"
              >
                <Phone className="h-3.5 w-3.5" />
                Call
              </a>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
