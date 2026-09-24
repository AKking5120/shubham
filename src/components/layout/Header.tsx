"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function navClass(active: boolean, extra?: string) {
  return cn(
    "rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300",
    extra,
    active
      ? "bg-white/15 text-white"
      : "text-slate-300 hover:bg-white/10 hover:text-white",
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a1628] shadow-lg shadow-black/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <BrandLogo size="md" priority className="sm:hidden" />
          <BrandLogo size="lg" priority className="hidden sm:block" />
        </div>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={navClass(isActive)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact#quote" variant="light" className="py-2.5">
            Get a Quote
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0a1628] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={navClass(isActive, "text-left")}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button href="/contact#quote" variant="light" className="mt-2 w-full">
              Get a Quote
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
