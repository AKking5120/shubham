import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  BUSINESS,
  mapsLink,
  SITE_CREDIT,
  whatsappLinkForPhone,
} from "@/lib/constants";
import { BrandLogo } from "@/components/brand/BrandLogo";
import {
  EmailLink,
  formatPhoneDisplay,
  PhoneLink,
} from "@/components/ui/ContactLinks";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services#bill-book", label: "Bill Book" },
  { href: "/services#challan-book", label: "Challan Book" },
  { href: "/services#letter-pad", label: "Letter Pad" },
  { href: "/services#visiting-card-tag", label: "Visiting Card / Tag" },
  { href: "/services#sticker-banner", label: "Sticker / Banner" },
  { href: "/services#wedding-card", label: "Wedding Card" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0a1628] text-slate-200">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />
      <div className="pointer-events-none absolute -right-40 top-20 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-4 lg:px-6">
        <div>
          <BrandLogo size="lg" href="/" className="ring-amber-400/30" />
          <p className="mt-4 text-sm text-slate-400">{BUSINESS.slogan}</p>
          <p className="mt-4 text-sm text-slate-400">
            Complete printing solutions for businesses, events and everyday
            requirements in Jaitpur, Badarpur and nearby areas.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-amber-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Services</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-amber-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            {BUSINESS.phones.map((phone) => (
              <li key={phone}>
                <PhoneLink
                  phone={phone}
                  className="flex items-center gap-2 text-slate-200 hover:text-amber-400"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{formatPhoneDisplay(phone)}</span>
                </PhoneLink>
              </li>
            ))}
            {BUSINESS.phones.map((phone) => (
              <li key={`wa-${phone}`}>
                <a
                  href={whatsappLinkForPhone(phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-200 transition hover:text-[#25D366]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  WhatsApp {formatPhoneDisplay(phone)}
                </a>
              </li>
            ))}
            <li>
              <EmailLink
                email={BUSINESS.email}
                className="flex items-center gap-2 text-slate-200 hover:text-amber-400"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {BUSINESS.email}
              </EmailLink>
            </li>
            <li>
              <a
                href={mapsLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 transition hover:text-amber-400"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {BUSINESS.address.line1}
                  <br />
                  {BUSINESS.address.line2}
                  <br />
                  {BUSINESS.address.city}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-500">
        <p>© 2026 {BUSINESS.name}. All Rights Reserved.</p>
        <p className="mt-2 text-slate-400">
          {SITE_CREDIT.role} —{" "}
          <a
            href={SITE_CREDIT.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-amber-400/90 transition hover:text-amber-300 hover:underline underline-offset-2"
          >
            {SITE_CREDIT.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
