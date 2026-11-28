import { getManagedShop } from "@/lib/managed-shop";
import type { Metadata } from "next";
import { BackLink } from "@/components/ui/BackLink";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CatalogProductGrid } from "@/components/catalog/CatalogProductGrid";
import {
  getCatalogSubcategory,
  PRINT_CATALOG,
} from "@/lib/print-catalog";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ category: string; subcategory: string }>;
};

export async function generateStaticParams() {
  const paths: { category: string; subcategory: string }[] = [];
  for (const cat of PRINT_CATALOG) {
    for (const sub of cat.subcategories) {
      paths.push({ category: cat.slug, subcategory: sub.slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, subcategory } = await params;
  const found = getCatalogSubcategory(category, subcategory);
  if (!found) return { title: "Products" };
  return {
    title: found.category.subcategories.length === 1
      ? found.category.name
      : `${found.subcategory.name} | ${found.category.name}`,
    description: found.subcategory.description,
    alternates: {
      canonical: `/shop/${category}/${subcategory}`,
    },
  };
}

export default async function ShopProductsPage({ params }: Props) {
  if (PRINT_CATALOG.length === 0) redirect("/shop");

  const { category: catSlug, subcategory: subSlug } = await params;
  const category = (await getManagedShop()).find(({ slug }) => slug === catSlug);
  const subcategory = category?.subcategories.find(({ slug }) => slug === subSlug);
  if (!category || !subcategory) notFound();
  const singleGroup = category.subcategories.length === 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <BackLink
        href={singleGroup ? "/shop" : `/shop/${category.slug}`}
        label={singleGroup ? "Back to Shop" : `Back to ${category.name}`}
      />
      <nav className="text-sm text-slate-500 text-center">
        <Link href="/shop" className="hover:text-brand-blue">Shop</Link>
        <span className="mx-2">/</span>
        <Link
          href={`/shop/${category.slug}`}
          className="hover:text-brand-blue"
        >
          {category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium">
          {subcategory.name}
        </span>
      </nav>
      <p className="mt-4 text-center text-sm text-slate-600">
        {subcategory.description}
      </p>
      <CatalogProductGrid
        title={singleGroup ? category.name : subcategory.name}
        categoryName={category.name}
        categorySlug={category.slug}
        subcategoryName={subcategory.name}
        subcategorySlug={subcategory.slug}
        products={subcategory.products}
      />
    </div>
  );
}
