import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { OwnerPhoto } from "@/components/brand/OwnerPhoto";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import {
  BUSINESS,
  mapsEmbedUrl,
  mapsLink,
  PAGE_HERO_IMAGES,
  SEO,
  telLink,
  whatsappLink,
  whatsappLinkForPhone,
} from "@/lib/constants";
import { EmailLink, PhoneLink } from "@/components/ui/ContactLinks";

export const metadata: Metadata = {
  title: "Contact Us",
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
        title="Contact Us"
        description="Reach out for quotations, design uploads or any printing enquiry."
        backgroundImage={PAGE_HERO_IMAGES.contact}
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-12 lg:gap-6 lg:px-6">
          <aside className="lg:col-span-3">
            <h2 className="text-xl font-bold text-[#0a1628]">Get In Touch</h2>
            <p className="mt-2 text-sm text-slate-600">
              Call, WhatsApp or visit us in Jaitpur for printing support.
            </p>

            <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center sm:items-start sm:text-left">
              <OwnerPhoto size="sm" className="ring-slate-200" />
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Owner
                </p>
                <p className="font-medium text-slate-800">{BUSINESS.owner}</p>
              </div>
            </div>

            <ul className="mt-6 space-y-4 text-sm">
              {BUSINESS.phones.map((phone) => (
                <li key={phone} className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#1e3a5f]" />
                  <PhoneLink
                    phone={phone}
                    className="font-medium text-[#1e3a5f]"
                  />
                </li>
              ))}
              {BUSINESS.phones.map((phone) => (
                <li key={`wa-${phone}`} className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#25D366]" />
                  <a
                    href={whatsappLinkForPhone(phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#1e3a5f] hover:text-[#25D366] hover:underline"
                  >
                    WhatsApp this number
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#1e3a5f]" />
                <EmailLink
                  email={BUSINESS.email}
                  className="font-medium text-[#1e3a5f]"
                />
              </li>
              <li className="flex gap-3 text-slate-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#1e3a5f]" />
                <a
                  href={mapsLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1e3a5f] hover:underline"
                >
                  {BUSINESS.address.line1}
                  <br />
                  {BUSINESS.address.line2}
                  <br />
                  {BUSINESS.address.city}
                </a>
              </li>
            </ul>

            <div className="mt-6 flex flex-col gap-2">
              <Button href={whatsappLink()} external variant="whatsapp" className="w-full">
                WhatsApp
              </Button>
              <Button href={telLink(BUSINESS.phones[0])} variant="secondary" className="w-full">
                Call Now
              </Button>
            </div>
          </aside>

          <div
            id="quote"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-5 md:p-8"
          >
            <h2 className="text-xl font-bold text-[#0a1628]">Send Us a Message</h2>
            <p className="mt-1 text-sm text-slate-600">
              Share your printing requirement and optional design file.
            </p>
            <div className="mt-6">
              <QuoteForm
                defaultService={serviceParam}
                showExtendedFields
              />
            </div>
          </div>

          <div className="lg:col-span-4">
            <h2 className="mb-3 text-lg font-bold text-[#0a1628]">Location</h2>
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <iframe
                title="Shubham Prints location"
                src={mapsEmbedUrl()}
                className="h-[320px] w-full border-0 lg:h-[min(520px,70vh)]"
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
        </div>
      </section>
    </>
  );
}
