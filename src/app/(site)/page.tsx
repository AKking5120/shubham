import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, Printer, CreditCard, Heart, ReceiptText, FileText, Tag, BookOpen, Award } from "lucide-react";
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

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h2 className="mb-7 text-center text-3xl font-black text-[#073c82]">Our Printing Services</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            {name:"Visiting Cards",detail:"Premium & Standard",Icon:CreditCard},
            {name:"Wedding Cards",detail:"Bridal & Invitation",Icon:Heart},
            {name:"Bill Books",detail:"GST & Non-GST",Icon:ReceiptText},
            {name:"Doctor Files",detail:"Patient Records",Icon:FileText},
            {name:"Sticker & Labels",detail:"Product & Barcode",Icon:Tag},
            {name:"Flex Printing",detail:"Banner & Flex Board",Icon:Printer},
            {name:"Marketing Material",detail:"Pamphlet & Brochure",Icon:BookOpen},
            {name:"Garment Tags",detail:"Hang Tags & Tags",Icon:Award}
          ].map(({name,detail,Icon})=>(
            <Link key={name} href="/shop" className="flex items-center gap-3 rounded-xl border border-[#d6e3f5] bg-white p-4 shadow-sm transition hover:border-[#1261b3] hover:shadow-md">
              <Icon className="shrink-0 text-[#1261b3]" size={35}/>
              <div><h3 className="font-bold text-[#092752]">{name}</h3><p className="mt-1 text-xs text-slate-600">{detail}</p></div>
            </Link>
          ))}
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6"><h2 className="mb-4 text-center text-3xl font-black text-[#073c82]">Best Selling Products</h2></div>
      <HomeCatalogSection />

      <HomeWhyChoose />

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
