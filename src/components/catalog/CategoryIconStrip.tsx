import Image from "next/image";
import Link from "next/link";
import { CATALOG_HOME_STRIP } from "@/lib/print-catalog";
import { cn } from "@/lib/utils";

export function CategoryIconStrip({
  activeSlug,
  className,
}: {
  activeSlug?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-y border-slate-200 bg-white py-4",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex gap-4 overflow-x-auto pb-1 [scrollbar-width:thin]">
          {CATALOG_HOME_STRIP.map((item) => {
            const active = item.slug === activeSlug;
            return (
              <Link
                key={item.slug}
                href={`/shop/${item.slug}`}
                className={cn(
                  "flex w-[104px] shrink-0 flex-col items-center gap-2.5 text-center transition",
                  active ? "opacity-100" : "opacity-80 hover:opacity-100",
                )}
              >
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
