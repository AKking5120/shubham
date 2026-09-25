import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { getGalleryPreviewProducts } from "@/lib/service-design-gallery";

export const metadata: Metadata = {
  title: "Design Gallery",
  description:
    "Browse visiting card, bill book, letter pad and wedding design templates from Shubham Prints & Stationers.",
};

export default function GalleryPage() {
  const products = getGalleryPreviewProducts(48);

  return (
    <>
      <section className="bg-slate-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
            Catalog Templates
          </span>
          <h1 className="text-3xl font-black">Print Design & Card Template Gallery</h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Pick a design and send your business details on WhatsApp for fast
            printing. Open any service page for the full template list.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          {products.length > 0 ? (
            <GalleryGrid products={products} />
          ) : (
            <p className="text-center text-slate-600">
              Templates are loading — please browse from{" "}
              <a href="/services" className="text-brand-blue font-semibold hover:underline">
                Services
              </a>
              .
            </p>
          )}
        </div>
      </section>
    </>
  );
}
