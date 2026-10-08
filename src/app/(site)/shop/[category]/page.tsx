import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryIconStrip } from "@/components/catalog/CategoryIconStrip";
import { SubcategoryTile } from "@/components/catalog/SubcategoryTile";
import { getCatalogCategory, PRINT_CATALOG } from "@/lib/print-catalog";

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
  const { category: slug } = await params;
  const category = getCatalogCategory(slug);
  if (!category) notFound();

  return (
    <>
      <CategoryIconStrip activeSlug={category.slug} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
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
