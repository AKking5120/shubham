"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BUSINESS } from "@/lib/constants";
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
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-amber-400/80 bg-white/10 text-lg font-extrabold text-white shadow-inner">
            S
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-base font-bold tracking-tight text-white lg:text-lg">
              {BUSINESS.name}
            </span>
            <span className="hidden text-[11px] text-slate-400 sm:block">
              {BUSINESS.slogan}
            </span>
          </span>
        </Link>

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
