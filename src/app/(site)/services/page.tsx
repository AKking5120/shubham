import type { Metadata } from "next";
import { BackLink } from "@/components/ui/BackLink";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PriceEstimator } from "@/components/services/PriceEstimator";
import { getPublicServices } from "@/lib/public-catalog";

export const metadata: Metadata = {
  title: "Visiting Card Printing Price Calculator",
  description: "Estimate the price of 1,000 visiting cards in 300 or 500 GSM. Compare single-sided and double-sided printing at Shubham Prints in Badarpur.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getPublicServices();

  return (
    <>
      <section className="bg-slate-50 py-10 md:py-12 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6"><BackLink href="/" label="Back to Home" /></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Interactive Estimator
          </span>
          <h1 className="text-3xl font-black text-slate-900">
            Visiting Card Estimate
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Choose 300 GSM or 500 GSM and single- or double-sided printing.
            Minimum order: 1,000 visiting cards.
          </p>
        </div>
      </section>

      <section id="estimate" className="scroll-mt-24 bg-white py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PriceEstimator />
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
              serviceOptions={services.filter((service) => service.slug !== "doctor-files").map((service) => service.name).concat(["Other"])}
            />
          </div>
        </div>
      </section>
    </>
  );
}
