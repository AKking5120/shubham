"use client";

import { MapPin, Store } from "lucide-react";
import { useState } from "react";
import type { ShopPhoto } from "@/lib/site-content";
import { mapsLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ShopPhotosSectionProps = {
  title: string;
  subtitle: string;
  photos: ShopPhoto[];
  addressLine?: string;
};

export function ShopPhotosSection({
  title,
  subtitle,
  photos,
  addressLine,
}: ShopPhotosSectionProps) {
  const [active, setActive] = useState<ShopPhoto | null>(null);
  const visible = photos.filter((p) => p.image.trim());

  if (visible.length === 0) return null;

  return (
    <>
      <section
        id="our-shop"
        className="border-y border-slate-200 bg-white py-12 sm:py-14"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue">
                <Store className="h-3.5 w-3.5" aria-hidden />
                Visit us
              </span>
              <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                {title}
              </h2>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">{subtitle}</p>
              {addressLine && (
                <p className="mt-2 flex items-start gap-1.5 text-sm font-medium text-slate-700">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                  {addressLine}
                </p>
              )}
            </div>
            <a
              href={mapsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800 transition hover:bg-white"
            >
              <MapPin className="h-4 w-4 text-brand-blue" />
              Open in Maps
            </a>
          </div>

          <div
            className={cn(
              "mt-8 grid gap-4 sm:gap-5",
              visible.length === 1 && "grid-cols-1 max-w-2xl",
              visible.length === 2 && "grid-cols-1 sm:grid-cols-2",
              visible.length >= 3 &&
                "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {visible.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setActive(photo)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-left shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue",
                  index === 0 && visible.length >= 3 && "sm:col-span-2 lg:col-span-1 lg:row-span-1",
                )}
              >
                <div className="aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
                  <img
                    src={photo.image}
                    alt={photo.caption || "Shop photo"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                {photo.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent px-4 pb-3 pt-10">
                    <p className="text-sm font-semibold text-white">{photo.caption}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Shop photo preview"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white hover:bg-white/20"
            onClick={() => setActive(null)}
          >
            Close
          </button>
          <figure
            className="max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.image}
              alt={active.caption || "Shop photo"}
              className="max-h-[75vh] w-full object-contain"
            />
            {active.caption && (
              <figcaption className="border-t border-slate-700 px-4 py-3 text-center text-sm text-slate-200">
                {active.caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
