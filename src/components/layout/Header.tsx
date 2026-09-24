"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Printer, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/#work", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function scrollToWork() {
  const el = document.getElementById("work");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "/#work");
  }
}

function navClass(active: boolean, extra?: string) {
  return cn(
    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
    extra,
    active
      ? "bg-gradient-to-r from-[#0a1628] to-[#1e3a5f] text-white shadow-md shadow-slate-900/10"
      : "text-slate-700 hover:bg-slate-100 hover:text-[#0a1628]",
  );
}

function NavItem({
  href,
  label,
  pathname,
  onNavigate,
}: {
  href: string;
  label: string;
  pathname: string;
  onNavigate?: () => void;
}) {
  const isWork = href === "/#work";
  const isActive = href === "/" ? pathname === "/" : pathname === href;

  if (isWork && pathname === "/") {
    return (
      <button
        type="button"
        onClick={() => {
          scrollToWork();
          onNavigate?.();
        }}
        className={navClass(false, "text-left w-full lg:w-auto")}
      >
        {label}
      </button>
    );
  }

  if (isWork) {
    return (
      <Link href={href} onClick={onNavigate} className={navClass(false)}>
        {label}
      </Link>
    );
  }

  return (
    <Link href={href} onClick={onNavigate} className={navClass(isActive)}>
      {label}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/" || window.location.hash !== "#work") return;
    const id = requestAnimationFrame(() => scrollToWork());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-slate-200/60 bg-white/90 shadow-lg shadow-slate-200/40 backdrop-blur-xl"
          : "bg-white/80 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0a1628] to-[#1e3a5f] text-amber-300 shadow-md shadow-[#0a1628]/25 transition group-hover:scale-105 group-hover:shadow-lg">
            <Printer className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-lg font-extrabold tracking-tight text-[#0a1628] lg:text-xl">
              {BUSINESS.name}
            </span>
            <span className="hidden text-xs text-slate-500 sm:block">
              {BUSINESS.slogan}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              pathname={pathname}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:+91${BUSINESS.phones[0]}`}
            className="flex items-center gap-1 text-sm font-medium text-[#1e3a5f]"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
          <Button href="/contact#quote" variant="primary" className="py-2.5">
            Get a Quote
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-[#0a1628] lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <NavItem
                key={link.href}
                href={link.href}
                label={link.label}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />
            ))}
            <Button href="/contact#quote" className="mt-2 w-full">
              Get a Quote
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
