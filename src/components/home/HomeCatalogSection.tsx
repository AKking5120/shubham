import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CategoryIconStrip } from "@/components/catalog/CategoryIconStrip";
import { PRINT_CATALOG } from "@/lib/print-catalog";
import Image from "next/image";

export function HomeCatalogSection() {
  const featured = PRINT_CATALOG[0];

  return (
    <section className="bg-white">
      <CategoryIconStrip />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
            Browse by category
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Category → product type → item. Get price on{" "}
            <span className="font-semibold text-[#128C7E]">WhatsApp</span> only.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRINT_CATALOG.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group flex gap-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 transition hover:border-brand-blue/40 hover:bg-white hover:shadow-md"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-white">
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="min-w-0 text-left">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-blue">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                  {cat.description}
                </p>
                <span className="mt-2.5 inline-flex items-center text-sm font-bold text-brand-orange">
                  {cat.subcategories.length} types
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        {featured && (
          <div className="mt-10 text-center">
            <Link
              href={`/shop/${featured.slug}/visiting-cards`}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-bold text-white hover:bg-indigo-900"
            >
              Popular: visiting cards
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
