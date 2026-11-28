import type { MetadataRoute } from "next";
import { PRINT_CATALOG } from "@/lib/print-catalog";
import { absoluteUrl } from "@/lib/site-url";

const PUBLIC_PATHS = [
  "/",
  "/shop",
  "/services",
  "/contact",
  "/premium-gallery",
  "/print-file-guide",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const shopPaths = PRINT_CATALOG.flatMap((category) => {
    const categoryPath = `/shop/${category.slug}`;
    const subcategoryPaths = category.subcategories.map(
      (subcategory) => `${categoryPath}/${subcategory.slug}`,
    );
    return category.subcategories.length === 1
      ? subcategoryPaths
      : [categoryPath, ...subcategoryPaths];
  });

  return [...PUBLIC_PATHS, ...shopPaths].map((path) => ({
    url: absoluteUrl(path),
  }));
}
