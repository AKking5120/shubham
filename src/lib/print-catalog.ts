import { whatsappLink } from "@/lib/constants";

export type CatalogProduct = {
  slug: string;
  name: string;
  description: string;
  image: string;
  /** e.g. "₹3 each for 100 pcs" — indicative; final quote on WhatsApp */
  priceLabel?: string;
  badge?: string;
};

export type CatalogSubcategory = {
  slug: string;
  name: string;
  description: string;
  image: string;
  products: CatalogProduct[];
};

export type CatalogCategory = {
  slug: string;
  name: string;
  shortLabel: string;
  description: string;
  image: string;
  /** Lucide-style keyword for icon mapping in UI */
  iconKey:
    | "stationery"
    | "apparel"
    | "signage"
    | "awards"
    | "binding"
    | "wedding"
    | "bulk"
    | "delivery";
  subcategories: CatalogSubcategory[];
};

export const PRINT_CATALOG: CatalogCategory[] = [];

export function getCatalogCategory(slug: string) {
  return PRINT_CATALOG.find((c) => c.slug === slug) ?? null;
}

export function getCatalogSubcategory(categorySlug: string, subSlug: string) {
  const cat = getCatalogCategory(categorySlug);
  if (!cat) return null;
  const sub = cat.subcategories.find((s) => s.slug === subSlug) ?? null;
  return sub ? { category: cat, subcategory: sub } : null;
}

export function getCatalogProduct(
  categorySlug: string,
  subSlug: string,
  productSlug: string,
) {
  const found = getCatalogSubcategory(categorySlug, subSlug);
  if (!found) return null;
  const product =
    found.subcategory.products.find((p) => p.slug === productSlug) ?? null;
  return product ? { ...found, product } : null;
}

export function catalogWhatsAppQuote(opts: {
  productName: string;
  categoryName: string;
  subcategoryName?: string;
}) {
  const path = [opts.categoryName, opts.subcategoryName, opts.productName]
    .filter(Boolean)
    .join(" → ");
  const message = `Hello Shubham Prints, I need a quote for:\n${path}\n\nQuantity / size / design: `;
  return whatsappLink(message);
}

export const CATALOG_HOME_STRIP = PRINT_CATALOG.map((c) => ({
  slug: c.slug,
  name: c.shortLabel,
  image: c.image,
  iconKey: c.iconKey,
}));

export type CatalogSearchHit = {
  product: CatalogProduct;
  categorySlug: string;
  categoryName: string;
  subcategorySlug: string;
  subcategoryName: string;
  href: string;
};

export function flattenCatalogProducts(): CatalogSearchHit[] {
  const hits: CatalogSearchHit[] = [];
  for (const category of PRINT_CATALOG) {
    for (const subcategory of category.subcategories) {
      for (const product of subcategory.products) {
        hits.push({
          product,
          categorySlug: category.slug,
          categoryName: category.name,
          subcategorySlug: subcategory.slug,
          subcategoryName: subcategory.name,
          href: `/shop/${category.slug}/${subcategory.slug}`,
        });
      }
    }
  }
  return hits;
}

export function searchCatalog(query: string, categorySlug?: string) {
  const q = query.trim().toLowerCase();
  return flattenCatalogProducts().filter((hit) => {
    if (categorySlug && hit.categorySlug !== categorySlug) return false;
    if (!q) return true;
    const hay = [
      hit.product.name,
      hit.product.description,
      hit.categoryName,
      hit.subcategoryName,
      hit.product.badge ?? "",
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
