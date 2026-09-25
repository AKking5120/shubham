import type { GalleryCategory, Product } from "./types";
import registry from "../../data/gallery-registry.json";
import visitingCardFiles from "../../data/visiting-card-tag-image-files.json";
import designGalleryAdmin from "../../data/design-gallery-admin.json";

const PRINTERS_CLUB_BASE =
  "https://printersclub.in/images/template-images/";

type GalleryRegistryEntry = {
  mode: "local" | "remote";
  count: number;
  folder?: string;
  paths?: string[];
  dataFile?: string;
  idPrefix: string;
  namePrefix: string;
  category: GalleryCategory;
};

const entries = registry as Record<string, GalleryRegistryEntry>;

type AdminOverride = {
  replaceRegistry?: boolean;
  items?: Product[];
};

function readAdminOverride(slug: string): AdminOverride | null {
  const raw = designGalleryAdmin as {
    overrides?: Record<string, AdminOverride>;
  };
  return raw.overrides?.[slug] ?? null;
}

function productsFromRemoteFiles(
  files: string[],
  idPrefix: string,
  namePrefix: string,
  category: GalleryCategory,
): Product[] {
  return files.map((file, index) => {
    const n = index + 1;
    return {
      id: `${idPrefix}-${n}`,
      name: `${namePrefix} ${n}`,
      category,
      description:
        "Design template — share your business details for printing.",
      image: `${PRINTERS_CLUB_BASE}${encodeURI(file)}`,
    };
  });
}

function productsFromPaths(
  paths: string[],
  idPrefix: string,
  namePrefix: string,
  category: GalleryCategory,
): Product[] {
  return paths.map((image, index) => {
    const n = index + 1;
    return {
      id: `${idPrefix}-${n}`,
      name: `${namePrefix} ${n}`,
      category,
      description:
        "Design template — share your business details for printing.",
      image,
    };
  });
}

export function getServiceDesignProducts(slug: string): Product[] | null {
  const admin = readAdminOverride(slug);
  if (admin?.replaceRegistry && admin.items?.length) {
    return admin.items;
  }

  const entry = entries[slug];
  let base: Product[] | null = null;

  if (!entry || entry.count === 0) {
    base = null;
  } else if (entry.mode === "remote") {
    const files =
      slug === "visiting-card-tag"
        ? (visitingCardFiles as string[])
        : [];
    if (!files.length) base = null;
    else {
      base = productsFromRemoteFiles(
        files,
        entry.idPrefix,
        entry.namePrefix,
        entry.category,
      );
    }
  } else if (!entry.paths?.length) {
    base = null;
  } else {
    base = productsFromPaths(
      entry.paths,
      entry.idPrefix,
      entry.namePrefix,
      entry.category,
    );
  }

  const extra = admin?.items ?? [];
  if (extra.length && base?.length) return [...extra, ...base];
  if (extra.length) return extra;
  return base;
}

/** Sample templates across services for home / gallery previews. */
export function getGalleryPreviewProducts(maxTotal = 12): Product[] {
  const slugs = Object.keys(entries);
  const out: Product[] = [];
  const perSlug = Math.max(2, Math.ceil(maxTotal / slugs.length));

  for (const slug of slugs) {
    const batch = getServiceDesignProducts(slug);
    if (!batch?.length) continue;
    out.push(...batch.slice(0, perSlug));
    if (out.length >= maxTotal) break;
  }

  return out.slice(0, maxTotal);
}

/** @deprecated Use getServiceDesignProducts(slug) */
export const VISITING_CARD_DESIGN_PRODUCTS =
  getServiceDesignProducts("visiting-card-tag") ?? [];
