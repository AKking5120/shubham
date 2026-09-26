"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Menu, MessageSquare, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { telLink, whatsappLink } from "@/lib/constants";
import type { SiteContent } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export type HeaderSiteContent = Pick<
  SiteContent,
  "announcement" | "business" | "contact"
>;

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services & Rates" },
  { href: "/gallery", label: "Design Gallery" },
  { href: "/contact#quote", label: "Instant Quote" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/contact#")) return pathname === "/contact";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ site }: { site: HeaderSiteContent }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wa = () => whatsappLink(site.contact.whatsappDefaultMessage);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="bg-brand-blue text-white text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
              {site.announcement.badge}
            </span>
            <span className="truncate">
              {site.announcement.text}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <a href={telLink(site.business.phones[0])} className="hover:underline">
              {site.business.phones[0]}
            </a>
            {site.business.phones[1] && (
              <>
                <span className="hidden sm:inline text-white/40">|</span>
                <a
                  href={telLink(site.business.phones[1])}
                  className="hover:underline hidden sm:inline"
                >
                  {site.business.phones[1]}
                </a>
              </>
            )}
            <span className="hidden md:inline text-white/40">|</span>
            <Link
              href="/admin/login"
              className="bg-blue-900 hover:bg-blue-800 text-amber-300 px-2 py-0.5 rounded text-[11px] font-semibold inline-flex items-center gap-1 transition"
            >
              <Lock className="w-3 h-3" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 glass-header border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <BrandLogo
                size="nav"
                href={null}
                className="shadow-lg ring-2 ring-brand-orange/40"
              />
              <div className="min-w-0">
                <div className="font-brand flex flex-wrap items-end gap-x-2 gap-y-0 leading-none">
                  <span
                    className="text-[1.4rem] sm:text-[1.65rem] lg:text-[1.85rem] font-extrabold tracking-tight bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] to-[#1d4ed8] bg-clip-text text-transparent"
                  >
                    Shubham
                  </span>
                  <span
                    className="text-[1.25rem] sm:text-[1.45rem] lg:text-[1.6rem] font-extrabold uppercase tracking-[0.06em] text-[#dc2626] drop-shadow-sm"
                  >
                    Prints
                  </span>
                  <span
                    className="mb-0.5 hidden text-[11px] font-bold text-amber-800 bg-gradient-to-r from-amber-100 to-amber-50 px-2 py-0.5 rounded-md border border-amber-300/80 sm:inline-block"
                  >
                    &amp; Stationers
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium italic mt-1 max-w-[14rem] sm:max-w-none truncate sm:whitespace-normal">
                  “{site.business.slogan}”
                </p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
              {links.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm transition",
                      active
                        ? "font-semibold text-brand-blue bg-blue-50"
                        : "font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden sm:flex items-center gap-2">
              <a
                href={wa()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-sm font-semibold shadow-sm flex items-center gap-1.5 transition"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </a>
              <Link
                href="/contact#quote"
                className="bg-brand-blue hover:bg-indigo-900 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition"
              >
                Get Estimate
              </Link>
            </div>

            <button
              type="button"
              className="md:hidden p-2 text-slate-600 hover:text-slate-900"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block w-full text-left px-3 py-2.5 rounded-lg font-medium text-slate-700 hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              onClick={() => setOpen(false)}
              className="block w-full text-left px-3 py-2.5 rounded-lg font-medium text-amber-700 bg-amber-50 border border-amber-200 mt-2"
            >
              Admin Login
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
