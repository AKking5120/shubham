import type { Product, Service } from "./types";

/** Local service preview images (hosted in /public/services). */
export const SERVICE_IMAGES: Record<string, string> = {
  "bill-book": "/services/bill-book.jpg",
  "challan-book": "/services/challan-book.jpg",
  "letter-pad": "/services/letter-pad.jpg",
  "visiting-card-tag": "/services/visiting-card-tag.jpg",
  "sticker-banner": "/services/sticker-banner.jpg",
  "wedding-card": "/services/wedding-card.jpg",
  "bulk-copy-printout": "/services/bulk-copy-printout.jpg",
  "id-card": "/services/id-card.jpg",
};

const PRODUCT_IMAGES: Record<string, string> = {
  "prd-1": "/services/bill-book.jpg",
  "prd-2": "/services/letter-pad.jpg",
  "prd-3": "/services/visiting-card-tag.jpg",
  "prd-4": "/services/sticker-banner.jpg",
  "prd-5": "/services/shop-banner.jpg",
  "prd-6": "/services/wedding-card.jpg",
  "prd-7": "/services/challan-book.jpg",
  "prd-8": "/services/shop-banner.jpg",
  "prd-9": "/services/sticker-banner.jpg",
};

export function serviceImageForSlug(slug: string): string {
  return SERVICE_IMAGES[slug] ?? "/services/bill-book.jpg";
}

/** Always use local artwork for known services so Supabase/old URLs cannot break images. */
export function normalizeService(service: Service): Service {
  const image = SERVICE_IMAGES[service.slug];
  if (!image) return service;
  return { ...service, image };
}

export function normalizeProduct(product: Product): Product {
  const image = PRODUCT_IMAGES[product.id];
  if (!image) return product;
  return { ...product, image };
}

export function isLocalPublicImage(src: string): boolean {
  return src.startsWith("/") && !src.startsWith("//");
}
