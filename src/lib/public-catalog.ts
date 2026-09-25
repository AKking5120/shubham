import { normalizeProduct, normalizeService } from "./service-images";
import { getProducts, getServices } from "./store";
import type { Product, Service } from "./types";

/** Public site catalogue — reflects admin Services / Gallery saves. */
export async function getPublicServices(): Promise<Service[]> {
  return getServices();
}

export async function getPublicProducts(): Promise<Product[]> {
  return getProducts();
}
