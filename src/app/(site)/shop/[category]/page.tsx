import { getManagedShop } from "@/lib/managed-shop";
import type { Metadata } from "next";
import { BackLink } from "@/components/ui/BackLink";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CategoryIconStrip } from "@/components/catalog/CategoryIconStrip";
import { SubcategoryTile } from "@/components/catalog/SubcategoryTile";
import { getCatalogCategory, PRINT_CATALOG } from "@/lib/print-catalog";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return PRINT_CATALOG.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = getCatalogCategory(slug);
  if (!cat) return { title: "Category" };
  return {
    title: cat.name,
    description: cat.description,
    alternates: { canonical: `/shop/${slug}` },
  };
}

export default async function ShopCategoryPage({ params }: Props) {
  if (PRINT_CATALOG.length === 0) redirect("/shop");

  const { category: slug } = await params;
  const catalog = await getManagedShop();
  const category = catalog.find((item) => item.slug === slug);
  if (!category) notFound();
  if (category.subcategories.length === 1) {
    redirect(`/shop/${category.slug}/${category.subcategories[0].slug}`);
  }

  return (
    <>
      <CategoryIconStrip activeSlug={category.slug} categories={catalog} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <BackLink href="/shop" label="Back to Shop" />
        <nav className="text-sm text-slate-500">
          <Link href="/shop" className="hover:text-brand-blue">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-medium">{category.name}</span>
        </nav>
        <h1 className="mt-4 text-center text-3xl font-black text-slate-900">
          {category.name}
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600 max-w-xl mx-auto">
          {category.description} Tap a product type to see items and WhatsApp
          quote.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {category.subcategories.map((sub) => (
            <SubcategoryTile
              key={sub.slug}
              href={`/shop/${category.slug}/${sub.slug}`}
              name={sub.name}
              image={sub.image}
            />
          ))}
        </div>
      </div>
    </>
  );
}
