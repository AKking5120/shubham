import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const PUBLIC_PATHS = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
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

  return PUBLIC_PATHS.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
