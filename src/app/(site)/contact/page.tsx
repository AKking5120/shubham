import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import {
  BUSINESS,
  mapsEmbedUrl,
  mapsLink,
  SEO,
  telLink,
  whatsappLink,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact | ${SEO.title}`,
  description: SEO.description,
};

type ContactPageProps = PageProps<"/contact">;

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const serviceParam =
    typeof params?.service === "string" ? params.service : "";

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact Us"
        description="Reach out for quotations, design uploads or any printing enquiry. We are happy to assist by phone, WhatsApp or email."
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:px-6">
          <div>
            <h2 className="text-2xl font-bold text-[#0a1628]">
              {BUSINESS.name}
            </h2>
            <p className="mt-1 text-sm italic text-slate-500">{BUSINESS.slogan}</p>

            <ul className="mt-8 space-y-5">
              <li>
                <p className="text-sm font-semibold text-slate-500">Owner</p>
                <p className="font-medium">{BUSINESS.owner}</p>
              </li>
              {BUSINESS.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={telLink(phone)}
                    className="flex items-center gap-3 text-[#1e3a5f] hover:underline"
                  >
                    <Phone className="h-5 w-5" />
                    +91 {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-center gap-3 text-[#1e3a5f] hover:underline"
                >
                  <Mail className="h-5 w-5" />
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex gap-3 text-slate-700">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#1e3a5f]" />
                <span>
                  {BUSINESS.address.line1}
                  <br />
                  {BUSINESS.address.line2}
                  <br />
                  {BUSINESS.address.city}
                </span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={whatsappLink()} external variant="whatsapp">
                WhatsApp
              </Button>
              <Button href={telLink(BUSINESS.phones[0])} variant="secondary">
                Call Now
              </Button>
              <Button
                href={`mailto:${BUSINESS.email}`}
                variant="ghost"
                className="border border-slate-200"
              >
                Email Us
              </Button>
            </div>
          </div>

          <div id="quote" className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-[#0a1628]">Send an Enquiry</h2>
            <p className="mt-1 text-sm text-slate-600">
              Share your printing requirement and we will respond shortly.
            </p>
            <div className="mt-6">
              <QuoteForm
                defaultService={serviceParam}
                showExtendedFields
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 pb-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <h2 className="mb-4 text-xl font-bold text-[#0a1628]">Find Us on Map</h2>
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <iframe
              title="Shubham Prints location"
              src={mapsEmbedUrl()}
              className="h-[450px] w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <a
            href={mapsLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-[#1e3a5f] hover:underline"
          >
            Open in Google Maps
          </a>
        </div>
      </section>
    </>
  );
}
