import { flattenCatalogProducts, PRINT_CATALOG } from "@/lib/print-catalog";

const publicPages = [
  "/",
  "/shop",
  "/services",
  "/contact",
  "/premium-gallery",
  ...PRINT_CATALOG.flatMap((category) => [
    `/shop/${category.slug}`,
    ...category.subcategories.map((sub) => `/shop/${category.slug}/${sub.slug}`),
  ]),
];

export function isAnalyticsPage(path: string) {
  return publicPages.includes(path);
}

const ignoredWords = new Set(["and", "with", "for", "the", "design", "products"]);
const words = (value: string) => value.toLowerCase().match(/[a-z]{2,24}/g) ?? [];
const catalogWords = new Set(
  [
    ...PRINT_CATALOG.map((category) => category.name),
    ...flattenCatalogProducts().map(({ product }) => product.name),
  ].flatMap(words).filter((word) => !ignoredWords.has(word)),
);

export function catalogKeywords(value: string) {
  return [...new Set(words(value))].filter((word) => catalogWords.has(word)).slice(0, 5);
}
