import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, Printer } from "lucide-react";
import Image from "next/image";
import { SEO } from "@/lib/constants";
import { HomeCatalogSection } from "@/components/home/HomeCatalogSection";
import { HomeGalleryPreview } from "@/components/home/HomeGalleryPreview";
import { HomeHowItWorks } from "@/components/home/HomeHowItWorks";
import { HomeWhyChoose } from "@/components/home/HomeWhyChoose";
import { getGalleryPreviewProducts } from "@/lib/service-design-gallery";
import { whatsappLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: SEO.title },
  description: SEO.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const galleryPreview = getGalleryPreviewProducts(8);

  return (
    <>
      <section className="overflow-hidden bg-gradient-to-r from-[#f0f6ff] via-white to-[#dcecff] text-[#092752]">
        <div className="mx-auto grid max-w-7xl items-center gap-4 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="font-serif text-xl font-bold italic text-[#1261b3] sm:text-2xl">Your Complete Printing Partner</p>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-6xl">Premium Printing.<br/><span className="text-[#1261b3]">Perfect Quality.</span></h1>
            <p className="mt-5 max-w-lg text-lg font-semibold">Visiting Cards, Wedding Cards, Bill Books, Flex Printing and more...</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/services" className="inline-flex items-center gap-2 rounded-full bg-[#073c82] px-6 py-3 text-sm font-bold text-white"><Printer size={17}/> Explore Services <ArrowRight size={17}/></Link>
              <a href={whatsappLink()} className="inline-flex items-center gap-2 rounded-full border-2 border-[#073c82] px-6 py-3 text-sm font-bold text-[#073c82]"><MessageCircle size={17}/> Get a Quote</a>
            </div>
          </div>
          <div className="relative min-h-[240px] sm:min-h-[350px]">
            <Image src="/banners/home-slide-1.jpg" alt="Shubham Prints printing products and services" fill priority className="rounded-2xl object-cover shadow-xl" sizes="(max-width: 1024px) 100vw, 50vw"/>
          </div>
        </div>
      </section>

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
