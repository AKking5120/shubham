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
  { href: "/", label: "Home", short: "Home" },
  { href: "/services", label: "Services & Rates", short: "Services" },
  { href: "/gallery", label: "Design Gallery", short: "Gallery" },
  { href: "/contact#quote", label: "Instant Quote", short: "Quote" },
  { href: "/about", label: "About Us", short: "About" },
  { href: "/contact", label: "Contact", short: "Contact" },
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
          <div className="flex items-center gap-2 justify-center sm:justify-start min-w-0">
            <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
              {site.announcement.badge}
            </span>
            <span className="truncate max-w-[min(100%,36rem)]">
              {site.announcement.text}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs shrink-0">
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

      <header
        className="sticky top-0 z-40 glass-header border-b border-white/40 shadow-sm"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex h-20 w-full items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="relative z-20 flex shrink-0 items-center gap-2.5 sm:gap-3 text-left"
            >
              <BrandLogo
                size="nav"
                href={null}
                className="shadow-lg ring-2 ring-brand-orange/40 shrink-0"
              />
              <div className="hidden min-w-0 sm:block">
                <div className="font-brand flex flex-nowrap items-end gap-x-1.5 sm:gap-x-2 leading-none whitespace-nowrap">
                  <span
                    className="text-lg sm:text-xl xl:text-2xl 2xl:text-[2.05rem] font-extrabold tracking-tight bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] to-[#1d4ed8] bg-clip-text text-transparent"
                  >
                    Shubham
                  </span>
                  <span
                    className="text-base sm:text-lg xl:text-xl 2xl:text-[1.8rem] font-extrabold text-[#dc2626]"
                  >
                    Prints
                  </span>
                  <span
                    className="mb-0.5 hidden xl:inline text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-300/80"
                  >
                    &amp; Stationers
                  </span>
                </div>
                <p
                  className="hidden 2xl:block text-[11px] text-slate-500 font-medium italic mt-1 max-w-xs line-clamp-1"
                  title={site.business.slogan}
                >
                  “{site.business.slogan}”
                </p>
              </div>
            </Link>

            <nav
              className="relative z-10 hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto px-1 lg:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Main"
            >
              {links.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-2 lg:px-2.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition",
                      active
                        ? "font-semibold text-brand-blue bg-blue-50/90"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60",
                    )}
                  >
                    <span className="2xl:hidden">{link.short}</span>
                    <span className="hidden 2xl:inline">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="relative z-20 ml-auto flex shrink-0 items-center justify-end gap-2 lg:ml-0">
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
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="lg:hidden glass-header-mobile-menu border-t border-white/50 px-4 pt-3 pb-6 space-y-1 shadow-lg">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-white/60"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              onClick={() => setOpen(false)}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-amber-800 bg-amber-50/90 border border-amber-200 mt-2"
            >
              Admin Login
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
