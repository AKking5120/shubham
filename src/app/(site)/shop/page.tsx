import type { Metadata } from "next";
import { BackLink } from "@/components/ui/BackLink";
import { ShopSearch } from "@/components/catalog/ShopSearch";
import { SubcategoryTile } from "@/components/catalog/SubcategoryTile";
import { PRINT_CATALOG } from "@/lib/print-catalog";
import { SEO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Shop by category",
  description: SEO.description,
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  if (PRINT_CATALOG.length === 0) {
    return (
      <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-14 text-center">
        <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
          Shop printing products
        </h1>
        <p className="mt-3 text-sm text-slate-600">New products coming soon.</p>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-b from-blue-50 to-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6"><BackLink href="/" label="Back to Home" /></div>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
            Shop printing products
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
            Choose a category to see products and request a quote.
          </p>
          <ShopSearch />
        </div>
      </section>

      <section aria-label="Shop categories" className="bg-white py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:grid-cols-3 sm:px-6 lg:grid-cols-4 lg:px-8">
          {PRINT_CATALOG.map((category) => (
            <SubcategoryTile
              key={category.slug}
              href={`/shop/${category.slug}`}
              name={category.name}
              image={category.image}
            />
          ))}
        </div>
      </section>
    </>
  );
}
