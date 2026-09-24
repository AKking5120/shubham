import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceListRow } from "@/components/services/ServiceListRow";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { SectionHeading } from "@/components/home/SectionHeading";
import { PAGE_HERO_IMAGES, SEO } from "@/lib/constants";
import { getProducts, getServices } from "@/lib/store";

export const metadata: Metadata = {
  title: "Our Services",
  description: SEO.description,
};

export default async function ServicesPage() {
  const [services, products] = await Promise.all([
    getServices(),
    getProducts(),
  ]);

  return (
    <>
      <PageHero
        title="Our Services"
        description="Explore our complete catalogue of printing and stationery services."
        backgroundImage={PAGE_HERO_IMAGES.services}
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl space-y-8 px-4 lg:px-6">
          {services.map((service) => (
            <ServiceListRow
              key={service.id}
              service={service}
              products={products}
            />
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16" id="quote">
        <div className="mx-auto max-w-3xl px-4 lg:px-6">
          <SectionHeading
            title="Request a Quote"
            subtitle="Fill in your details and we will contact you with pricing and timelines."
          />
          <div className="mt-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
            <QuoteForm showExtendedFields />
          </div>
        </div>
      </section>
    </>
  );
}
