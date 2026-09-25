import { getServiceDesignProducts } from "./service-design-gallery";
import type { GalleryCategory } from "./types";
import type { Product } from "./types";

/** Maps service slugs to gallery categories shown for that service. */
export const SERVICE_GALLERY_CATEGORIES: Record<string, GalleryCategory[]> = {
  "bill-book": ["Business Printing"],
  "challan-book": ["Business Printing"],
  "letter-pad": ["Stationery"],
  "visiting-card-tag": ["Cards"],
  "die-cut-visiting-card": ["Cards"],
  "id-card": ["Cards"],
  "garment-tags": ["Cards"],
  "envelope": ["Stationery"],
  "doctor-files": ["Stationery"],
  "sticker-banner": ["Stickers", "Banners"],
  "uv-texture": ["Stickers"],
  "atm-pouch": ["Business Printing"],
  "wedding-card": ["Wedding Printing"],
  "bulk-copy-printout": ["Business Printing", "Stationery"],
};

export function productsForService(
  serviceSlug: string,
  products: Product[],
): Product[] {
  const catalog = getServiceDesignProducts(serviceSlug);
  if (catalog?.length) return catalog;

  const categories = SERVICE_GALLERY_CATEGORIES[serviceSlug];
  if (!categories?.length) return products;
  return products.filter((p) => categories.includes(p.category));
}

export function productsInSameGallery(
  product: Product,
  allProducts: Product[],
): Product[] {
  const sameCategory = allProducts.filter((p) => p.category === product.category);
  return sameCategory.length > 0 ? sameCategory : [product];
}

export function findProductIndex(products: Product[], id: string): number {
  const idx = products.findIndex((p) => p.id === id);
  return idx >= 0 ? idx : 0;
}
