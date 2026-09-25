"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductGalleryModal } from "@/components/gallery/ProductGalleryModal";
import { whatsappLink } from "@/lib/constants";

export function HomeGalleryPreview({ products }: { products: Product[] }) {
  const [gallery, setGallery] = useState<{
    products: Product[];
    index: number;
  } | null>(null);

  if (!products.length) return null;

  return (
    <>
      <section className="bg-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
                Trending Designs
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Popular Design Templates
              </h2>
              <p className="text-slate-600 text-sm">
                Select a sample template and inquire on WhatsApp for custom printing.
              </p>
            </div>
            <Link
              href="/gallery"
              className="bg-white hover:bg-slate-50 border border-slate-300 font-bold text-sm px-4 py-2.5 rounded-xl shadow-sm self-start sm:self-auto transition inline-flex items-center gap-1.5"
            >
              View All Templates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p, index) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="relative h-40 bg-slate-800">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    unoptimized={p.image.startsWith("http")}
                  />
                  <span className="absolute top-2 left-2 text-[10px] font-mono bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-bold">
                    {p.name}
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-xs text-slate-600 line-clamp-2">{p.description}</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setGallery({ products, index })
                      }
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Preview
                    </button>
                    <a
                      href={whatsappLink(
                        `Namaste Shubham Prints! I am interested in design: ${p.name}. Please share rate and customization.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-xl text-xs font-bold"
                    >
                      WA
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {gallery && (
        <ProductGalleryModal
          products={gallery.products}
          initialIndex={gallery.index}
          title="Design Templates"
          onClose={() => setGallery(null)}
        />
      )}
    </>
  );
}
