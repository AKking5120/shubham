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
          <div className="flex items-center gap-2 justify-center sm:justify-start min-w-0 max-w-full">
            <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
              {site.announcement.badge}
            </span>
            <span className="truncate sm:max-w-[min(100%,42rem)]">
              {site.announcement.text}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs shrink-0">
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
          <div className="flex items-center justify-between gap-3 py-2.5 min-h-[4.75rem] lg:min-h-[5rem]">
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 min-w-0 shrink lg:max-w-[min(100%,20rem)]"
            >
              <BrandLogo
                size="nav"
                href={null}
                className="shadow-lg ring-2 ring-brand-orange/40 shrink-0"
              />
              <div className="min-w-0 hidden min-[400px]:block">
                <div className="font-brand flex flex-wrap items-baseline gap-x-1.5 gap-y-0 leading-tight">
                  <span
                    className="text-xl sm:text-2xl lg:text-[1.65rem] font-extrabold tracking-tight bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] to-[#1d4ed8] bg-clip-text text-transparent"
                  >
                    Shubham
                  </span>
                  <span
                    className="text-lg sm:text-xl lg:text-[1.45rem] font-extrabold uppercase tracking-wide text-[#dc2626]"
                  >
                    Prints
                  </span>
                  <span
                    className="hidden lg:inline text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200"
                  >
                    &amp; Stationers
                  </span>
                </div>
                <p
                  className="hidden xl:block text-[10px] text-slate-500 font-medium italic mt-0.5 line-clamp-1"
                  title={site.business.slogan}
                >
                  “{site.business.slogan}”
                </p>
              </div>
            </Link>

            <nav
              className="hidden xl:flex items-center justify-center flex-1 min-w-0 px-1"
              aria-label="Main"
            >
              {links.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-2 py-2 rounded-lg text-[13px] whitespace-nowrap transition lg:px-2.5 lg:text-sm",
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

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <div className="hidden sm:flex items-center gap-2">
                <a
                  href={wa()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-xl text-sm font-semibold shadow-sm flex items-center gap-1.5 transition whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span className="hidden md:inline">WhatsApp</span>
                </a>
                <Link
                  href="/contact#quote"
                  className="bg-brand-blue hover:bg-indigo-900 text-white px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition whitespace-nowrap"
                >
                  Get Estimate
                </Link>
              </div>
              <button
                type="button"
                className="xl:hidden p-2 text-slate-600 hover:text-slate-900"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg">
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
