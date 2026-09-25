import type { Metadata } from "next";
import { ServiceListRow } from "@/components/services/ServiceListRow";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PriceEstimator } from "@/components/services/PriceEstimator";
import { SEO } from "@/lib/constants";
import { getPublicProducts, getPublicServices } from "@/lib/public-catalog";
import { getPriceCalculator } from "@/lib/store";

export const metadata: Metadata = {
  title: "Services & Rates",
  description: SEO.description,
};

export default async function ServicesPage() {
  const [services, products, calculator] = await Promise.all([
    getPublicServices(),
    getPublicProducts(),
    getPriceCalculator(),
  ]);

  return (
    <>
      <section className="bg-slate-50 py-10 md:py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Interactive Estimator
          </span>
          <h1 className="text-3xl font-black text-slate-900">
            Services Catalog & Live Rate Estimator
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Select paper options, quantities, and finishing to calculate estimated
            printing costs — then confirm on WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PriceEstimator config={calculator} />
        </div>
      </section>

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

      <section className="bg-slate-100 py-16 border-t border-slate-200" id="quote">
        <div className="mx-auto max-w-3xl px-4 lg:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900">Request a Quote</h2>
            <p className="text-slate-600 text-sm mt-1">
              Fill in your details and we will contact you with pricing and timelines.
            </p>
          </div>
          <div className="mt-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
            <QuoteForm
              showExtendedFields
              serviceOptions={services.map((s) => s.name).concat(["Other"])}
            />
          </div>
        </div>
      </section>
    </>
  );
}
