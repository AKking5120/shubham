import { normalizeProduct, normalizeService } from "./service-images";
import { DEFAULT_PRODUCTS, DEFAULT_SERVICES } from "./seed";
import type { Product, Service } from "./types";

/**
 * Fixed catalogue for the public site (home + /services).
 * Always includes all default services (e.g. Bulk Copy / Printout) and local image paths.
 */
export function getPublicServices(): Service[] {
  return DEFAULT_SERVICES
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order)
    .map(normalizeService);
}

export function getPublicProducts(): Product[] {
  return DEFAULT_PRODUCTS.map(normalizeProduct);
}
