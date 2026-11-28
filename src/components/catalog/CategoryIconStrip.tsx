import Image from "next/image";
import Link from "next/link";
import { CATALOG_HOME_STRIP, type CatalogCategory } from "@/lib/print-catalog";
import { cn } from "@/lib/utils";

export function CategoryIconStrip({
  activeSlug,
  categories,
  className,
}: {
  activeSlug?: string;
  categories?: CatalogCategory[];
  className?: string;
}) {
  const items = categories?.map((category) => ({ slug: category.slug, image: category.image, name: category.shortLabel })) ?? CATALOG_HOME_STRIP;
  return (
    <div
      className={cn(
        "border-y border-slate-200 bg-white py-4",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex gap-4 overflow-x-auto pb-1 [scrollbar-width:thin]">
          {items.map((item) => {
            const active = item.slug === activeSlug;
            return (
              <Link
                key={item.slug}
                href={`/shop/${item.slug}`}
                className={cn(
                  "flex w-[104px] shrink-0 flex-col items-center justify-center gap-2.5 text-center transition",
                  active ? "opacity-100" : "opacity-80 hover:opacity-100",
                )}
              >
                {item.image && (
                  <span
                    className={cn(
                      "relative h-20 w-20 overflow-hidden rounded-xl border-2 bg-slate-50",
                      active
                        ? "border-brand-orange shadow-md"
                        : "border-slate-200",
                    )}
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </span>
                )}
                <span
                  className={cn(
                    "text-xs font-semibold leading-tight text-slate-700",
                    active && "text-brand-blue",
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
