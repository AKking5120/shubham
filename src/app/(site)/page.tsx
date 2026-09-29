import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SEO } from "@/lib/constants";
import { HomeGalleryPreview } from "@/components/home/HomeGalleryPreview";
import { HomeHeroSimple } from "@/components/home/HomeHeroSimple";
import { HomeHowItWorks } from "@/components/home/HomeHowItWorks";
import { HomeSolutionCards } from "@/components/home/HomeSolutionCards";
import { HomeWhyChoose } from "@/components/home/HomeWhyChoose";
import { ServiceCard } from "@/components/services/ServiceCard";
import { getGalleryPreviewProducts } from "@/lib/service-design-gallery";
import { getPublicProducts, getPublicServices } from "@/lib/public-catalog";
import { getSiteContent } from "@/lib/store";

export const metadata: Metadata = {
  title: { absolute: SEO.title },
  description: SEO.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [services, products, site] = await Promise.all([
    getPublicServices(),
    getPublicProducts(),
    getSiteContent(),
  ]);
  const galleryPreview = getGalleryPreviewProducts(8);

  return (
    <>
      <HomeHeroSimple hero={site.hero} />

      <HomeSolutionCards />

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
              All printing services
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Full catalog — tap a service to order or view rates.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                products={products}
                compact
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-900"
            >
              View services & price calculator
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <HomeWhyChoose />
      <HomeHowItWorks />
      <HomeGalleryPreview products={galleryPreview} />

      <section className="bg-brand-blue py-12 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-black">Ready to print?</h2>
          <p className="mt-2 text-sm text-blue-100">
            Start your order online — phone & WhatsApp are in the footer.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/cart"
              className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-blue hover:bg-amber-50"
            >
              Go to cart
            </Link>
            <Link
              href="/services"
              className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              Browse services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
