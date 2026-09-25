import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { OwnerPhoto } from "@/components/brand/OwnerPhoto";
import {
  BUSINESS,
  mailtoLink,
  mapsLink,
  SITE_CREDIT,
  telLink,
} from "@/lib/constants";

const quickLinks = [
  { href: "/", label: "Home Page" },
  { href: "/services", label: "Services & Rates" },
  { href: "/gallery", label: "Design Gallery" },
  { href: "/contact#quote", label: "Get Custom Quote" },
];

const specialties = [
  "GST Carbonless Bill Books",
  "Spot UV & Velvet Cards",
  "Doctor Folders & ATM Pouches",
  "Garment Tags & Envelopes",
  "Shadi Cards & Banners",
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pt-10 pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BrandLogo size="sm" href="/" className="ring-2 ring-slate-600" />
            <span className="font-extrabold text-white text-base">Shubham Prints</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            “{BUSINESS.slogan}”. Premium commercial printing, carbonless bill books,
            doctor folders, and stationery in New Delhi.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <OwnerPhoto size="xs" className="ring-2 ring-slate-700" />
            <p className="text-[11px] text-slate-500">
              Proprietor: <span className="text-slate-400">{BUSINESS.owner}</span>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-white text-sm">Quick Navigation</h4>
          <ul className="space-y-1.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-amber-400 transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-white text-sm">Printing Specialties</h4>
          <ul className="space-y-1 text-slate-400">
            {specialties.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-white text-sm">Contact Details</h4>
          <p>{BUSINESS.address.full}</p>
          <p className="text-amber-400 font-semibold">
            Ph: {BUSINESS.phones[0]} / {BUSINESS.phones[1]}
          </p>
          <p>{BUSINESS.email}</p>
          <a
            href={mapsLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-brand-blue hover:text-amber-400 font-semibold mt-1"
          >
            Open in Google Maps →
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-slate-500">
        <p>© 2026 {BUSINESS.name}. All Rights Reserved.</p>
        <p>Local Printing Shop Jaitpur | Badarpur | South Delhi</p>
        <div className="text-center sm:text-right text-slate-400">
          <p>
            {SITE_CREDIT.role} —{" "}
            <a
              href={SITE_CREDIT.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400/90 hover:underline"
            >
              {SITE_CREDIT.name}
            </a>
          </p>
          <p className="mt-0.5 text-slate-500">
            <a
              href={mailtoLink(SITE_CREDIT.email)}
              className="hover:text-amber-400/90"
            >
              {SITE_CREDIT.email}
            </a>
            <span className="mx-1.5 text-slate-600">|</span>
            <a href={telLink(SITE_CREDIT.phone)} className="hover:text-amber-400/90">
              {SITE_CREDIT.phone}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
