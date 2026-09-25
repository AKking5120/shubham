import {
  LETTER_HEAD_DESIGN_PRODUCTS,
  VISITING_CARD_DESIGN_PRODUCTS,
} from "./service-design-gallery";
import type { GalleryCategory } from "./types";
import type { Product } from "./types";

/** Maps service slugs to gallery categories shown for that service. */
export const SERVICE_GALLERY_CATEGORIES: Record<string, GalleryCategory[]> = {
  "bill-book": ["Business Printing"],
  "challan-book": ["Business Printing"],
  "letter-pad": ["Stationery"],
  "visiting-card-tag": ["Cards"],
  "sticker-banner": ["Stickers", "Banners"],
  "wedding-card": ["Wedding Printing"],
  "bulk-copy-printout": ["Business Printing", "Stationery"],
};

export function productsForService(
  serviceSlug: string,
  products: Product[],
): Product[] {
  if (serviceSlug === "visiting-card-tag") {
    return VISITING_CARD_DESIGN_PRODUCTS;
  }
  if (serviceSlug === "letter-pad") {
    return LETTER_HEAD_DESIGN_PRODUCTS;
  }
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
