import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CategoryIconStrip } from "@/components/catalog/CategoryIconStrip";
import { PRINT_CATALOG } from "@/lib/print-catalog";
import { SEO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Shop by category",
  description: SEO.description,
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-50 to-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
            Shop printing products
          </h1>
          <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
            Pick a category → product type → item. Every product opens a{" "}
            <strong>WhatsApp quote</strong> — no online payment needed.
          </p>
        </div>
      </section>

      <CategoryIconStrip />

      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {PRINT_CATALOG.map((category) => (
            <div key={category.slug}>
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    {category.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {category.description}
                  </p>
                </div>
                <Link
                  href={`/shop/${category.slug}`}
                  className="text-sm font-bold text-brand-blue hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/shop/${category.slug}/${sub.slug}`}
                    className="group text-center"
                  >
                    <div className="relative mx-auto aspect-square max-w-[180px] overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
                      <Image
                        src={sub.image}
                        alt={sub.name}
                        fill
                        className="object-cover transition group-hover:scale-105"
                        sizes="180px"
                      />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-800 group-hover:text-brand-blue">
                      {sub.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
