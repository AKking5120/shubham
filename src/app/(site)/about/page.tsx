import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { BUSINESS, mapsLink, PAGE_HERO_IMAGES, SEO, whatsappLinkForPhone } from "@/lib/constants";
import { EmailLink, PhoneLink } from "@/components/ui/ContactLinks";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBanner } from "@/components/layout/CtaBanner";

export const metadata: Metadata = {
  title: `About | ${SEO.title}`,
  description: SEO.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={`About ${BUSINESS.name}`}
        description="Your local partner for complete printing solutions in Jaitpur, Badarpur and New Delhi."
        backgroundImage={PAGE_HERO_IMAGES.about}
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 lg:grid-cols-2 lg:px-6">
          <div>
            <h2 className="text-2xl font-bold text-[#0a1628]">
              About {BUSINESS.name}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              {BUSINESS.name} provides complete printing solutions for customers
              who need reliable business stationery, promotional materials,
              cards and wedding printing. From bill books and challan books to
              visiting cards, stickers, banners and wedding invitations, we help
              you present your brand and occasions with a professional finish.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              We focus on clear communication, practical customisation and
              responsive support — so you can share your requirements easily and
              get your printing done with confidence.
            </p>

            <ul className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <li className="flex gap-3">
                <User className="mt-0.5 h-5 w-5 shrink-0 text-[#1e3a5f]" />
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Owner
                  </p>
                  <p className="font-bold text-[#0a1628]">{BUSINESS.owner}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#1e3a5f]" />
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Address
                  </p>
                  <a
                    href={mapsLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-[#1e3a5f] hover:underline"
                  >
                    {BUSINESS.address.line1}
                    <br />
                    {BUSINESS.address.line2}
                    <br />
                    {BUSINESS.address.city}
                  </a>
                </div>
              </li>
              {BUSINESS.phones.map((phone) => (
                <li key={phone} className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#1e3a5f]" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Phone
                    </p>
                    <PhoneLink phone={phone} className="font-medium text-[#1e3a5f]" />
                  </div>
                </li>
              ))}
              {BUSINESS.phones.map((phone) => (
                <li key={`wa-${phone}`} className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#25D366]" />
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      WhatsApp
                    </p>
                    <a
                      href={whatsappLinkForPhone(phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#1e3a5f] hover:text-[#25D366] hover:underline"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </li>
              ))}
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#1e3a5f]" />
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Email
                  </p>
                  <EmailLink email={BUSINESS.email} className="font-medium text-[#1e3a5f]" />
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact#quote">Get a Quote</Button>
              <Button href="/services" variant="secondary">
                Our Services
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-slate-200">
            <Image
              src={PAGE_HERO_IMAGES.storefront}
              alt="Shubham Prints storefront and printed materials"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
