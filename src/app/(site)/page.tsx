import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SEO } from "@/lib/constants";
import { HomeCatalogSection } from "@/components/home/HomeCatalogSection";
import { HomeGalleryPreview } from "@/components/home/HomeGalleryPreview";
import { HomeHeroSimple } from "@/components/home/HomeHeroSimple";
import { HomeHowItWorks } from "@/components/home/HomeHowItWorks";
import { HomeWhyChoose } from "@/components/home/HomeWhyChoose";
import { getGalleryPreviewProducts } from "@/lib/service-design-gallery";
import { getSiteContent } from "@/lib/store";
import { whatsappLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: SEO.title },
  description: SEO.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [site] = await Promise.all([getSiteContent()]);
  const galleryPreview = getGalleryPreviewProducts(8);

  return (
    <>
      <HomeHeroSimple hero={site.hero} />

      <HomeCatalogSection />

      <HomeWhyChoose />
      <HomeHowItWorks />
      <HomeGalleryPreview products={galleryPreview} />

      <section className="bg-brand-blue py-12 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-black">Need a quote?</h2>
          <p className="mt-2 text-sm text-blue-100">
            Browse products, tap WhatsApp quote, or message us directly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white hover:bg-[#1ebe57]"
            >
              WhatsApp quote
            </a>
            <Link
              href="/shop"
              className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-blue hover:bg-amber-50"
            >
              Browse catalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
