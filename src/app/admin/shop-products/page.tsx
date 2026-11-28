import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getShopProductEntries } from "@/lib/managed-shop";
import { PRINT_CATALOG } from "@/lib/print-catalog";
import { ShopProductEditor } from "@/components/admin/ShopProductEditor";

export default async function AdminShopProductsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const entries = await getShopProductEntries();
  const destinations = PRINT_CATALOG.flatMap((category) =>
    category.subcategories.map((sub) => ({
      key: `${category.slug}:${sub.slug}`,
      name: category.subcategories.length === 1 ? category.name : `${category.name} · ${sub.name}`,
    })));

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold">Shop products</h1>
      <ShopProductEditor
        destinations={destinations}
        entries={entries.map(({ key, override, product, categorySlug, subcategorySlug }) => ({
          key, name: override?.name ?? product.name, image: override?.image ?? product.image,
          hidden: override?.hidden ?? false,
          destination: `${override?.categorySlug ?? categorySlug}:${override?.subcategorySlug ?? subcategorySlug}`,
        }))}
      />
    </div>
  );
}
