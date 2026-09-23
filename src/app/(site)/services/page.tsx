import type { Metadata } from "next";
import { SectionHeading } from "@/components/home/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { SEO } from "@/lib/constants";
import { getProducts, getServices } from "@/lib/store";

export const metadata: Metadata = {
  title: `Services | ${SEO.title}`,
  description: SEO.description,
};

export default async function ServicesPage() {
  const [services, products] = await Promise.all([
    getServices(),
    getProducts(),
  ]);

  return (
    <>
      <section className="bg-[#0a1628] py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <h1 className="text-4xl font-bold md:text-5xl">Our Services</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Explore our complete catalogue of printing and stationery services.
            Every service includes easy quote requests, WhatsApp and call options.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl space-y-16 px-4 lg:px-6">
          <SectionHeading
            title="Printing & Stationery Catalogue"
            subtitle="Professional printing for shops, offices, events and personal occasions."
            align="left"
          />
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                detailed
                products={products}
              />
            ))}
          </div>
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
