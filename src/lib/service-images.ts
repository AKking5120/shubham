import type { Product, Service } from "./types";

/** Local service preview images (hosted in /public/products and /public/services). */
export const SERVICE_IMAGES: Record<string, string> = {
  "bill-book": "/products/bill-book.jpg",
  "challan-book": "/products/bill-book-3.jpg",
  "letter-pad": "/products/letterhead.jpg",
  "visiting-card-tag": "/products/business-card.jpg",
  "sticker-banner": "/products/sticker.jpg",
  "wedding-card": "/products/wedding-card.jpg",
  "bulk-copy-printout": "/services/bulk-copy-printout.jpg",
  "id-card": "/services/id-card.jpg",
  "die-cut-visiting-card": "/products/business-card.jpg",
  envelope: "/products/envelope.jpg",
  "atm-pouch": "/products/atm-pouch.jpg",
  "doctor-files": "/products/folder.jpg",
  "uv-texture": "/services/uv-texture.jpg",
  "garment-tags": "/products/garment-tags.jpg",
};

const PRODUCT_IMAGES: Record<string, string> = {
  "prd-1": "/products/bill-book.jpg",
  "prd-2": "/products/letterhead.jpg",
  "prd-3": "/products/business-card.jpg",
  "prd-4": "/products/sticker.jpg",
  "prd-5": "/products/poster.jpg",
  "prd-6": "/products/wedding-card.jpg",
  "prd-7": "/products/bill-book-3.jpg",
  "prd-8": "/products/garment-tags.jpg",
  "prd-9": "/products/sticker.jpg",
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
