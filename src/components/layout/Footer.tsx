import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS, telLink } from "@/lib/constants";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/#work", label: "Our Work" },
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
          <h3 className="text-lg font-extrabold text-white">{BUSINESS.name}</h3>
          <p className="mt-2 text-sm text-slate-400">{BUSINESS.slogan}</p>
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
                <a
                  href={telLink(phone)}
                  className="flex items-center gap-2 hover:text-amber-400"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  +91 {phone}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-2 hover:text-amber-400"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {BUSINESS.email}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {BUSINESS.address.line1}
                <br />
                {BUSINESS.address.line2}
                <br />
                {BUSINESS.address.city}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © 2026 {BUSINESS.name}. All Rights Reserved.
      </div>
    </footer>
  );
}
