import "server-only";
import { flexProducts } from "@/lib/flex-products";
import { flattenCatalogProducts, PRINT_CATALOG } from "@/lib/print-catalog";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { sbSetAppSetting } from "@/lib/supabase-store";

const prefix = "shop-product:";

export type ShopProductOverride = {
  name: string;
  image: string;
  categorySlug: string;
  subcategorySlug: string;
  hidden: boolean;
};

export function shopProductKey(item: { categorySlug: string; subcategorySlug: string; product: { slug: string } }) {
  return [item.categorySlug, item.subcategorySlug, item.product.slug].join(":");
}

export async function getShopProductEntries() {
  const base = flattenCatalogProducts();
  if (!isSupabaseConfigured()) return base.map((item) => ({ ...item, key: shopProductKey(item), override: undefined as ShopProductOverride | undefined }));

  const { data, error } = await getSupabaseAdmin().from("app_settings")
    .select("key,value").like("key", `${prefix}%`);
  if (error) throw error;
  const overrides = new Map((data ?? []).map(({ key, value }) => [key.slice(prefix.length), value as ShopProductOverride]));

  return base.map((item) => ({
    ...item,
    key: shopProductKey(item),
    override: overrides.get(shopProductKey(item)),
  }));
}

export async function saveShopProductOverride(key: string, override: ShopProductOverride) {
  await sbSetAppSetting(prefix + key, override);
}

export async function getManagedShop() {
  const entries = await getShopProductEntries();
  return PRINT_CATALOG.map((category) => {
    const subcategories = category.subcategories.map((sub) => {
      const products = entries.flatMap((entry) => {
        const { override } = entry;
        if (override?.hidden ||
          (override?.categorySlug ?? entry.categorySlug) !== category.slug ||
          (override?.subcategorySlug ?? entry.subcategorySlug) !== sub.slug) return [];
        return [override ? {
          ...entry.product,
          name: override.name,
          image: override.image,
          description: entry.product.description.replace(entry.product.name, override.name),
        } : entry.product];
      });

      return { ...sub, products, image: products[0]?.image };
    });
    return { ...category, subcategories, image: subcategories.find((sub) => sub.image)?.image };
  });
}

export function buildShopSearchIndex(catalog: Awaited<ReturnType<typeof getManagedShop>>) {
  return [
    ...flattenCatalogProducts(catalog),
    ...flexProducts.map((product) => ({
      product: { ...product, description: "" },
      categorySlug: "flex-printing",
      categoryName: "Flex Printing",
      subcategorySlug: "products",
      subcategoryName: product.slug.includes("vinyl") ? "Vinyl" : "Flex",
      href: "/premium-gallery",
    })),
  ];
}
