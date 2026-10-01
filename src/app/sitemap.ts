import type { MetadataRoute } from "next";
import { PRINT_CATALOG } from "@/lib/print-catalog";
import { getSiteUrl } from "@/lib/site-url";

const PUBLIC_PATHS = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/shop", changeFrequency: "weekly" as const, priority: 0.95 },
  { path: "/services", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/gallery", changeFrequency: "weekly" as const, priority: 0.85 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.75 },
  { path: "/cart", changeFrequency: "monthly" as const, priority: 0.5 },
  { path: "/checkout", changeFrequency: "monthly" as const, priority: 0.45 },
  { path: "/track-order", changeFrequency: "monthly" as const, priority: 0.55 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const staticEntries = PUBLIC_PATHS.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const shopEntries: MetadataRoute.Sitemap = [];
  for (const cat of PRINT_CATALOG) {
    shopEntries.push({
      url: `${base}/shop/${cat.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.88,
    });
    for (const sub of cat.subcategories) {
      shopEntries.push({
        url: `${base}/shop/${cat.slug}/${sub.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }
  }

  return [...staticEntries, ...shopEntries];
}
