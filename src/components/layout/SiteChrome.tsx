"use client";
import { usePathname } from "next/navigation";
import { Header, type HeaderSiteContent } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function SiteChrome({site, position}: {site: HeaderSiteContent; position:"top"|"bottom"}) {
  const isHome = usePathname() === "/";
  if (isHome) return null;
  return position === "top" ? <Header site={site} /> : <Footer />;
}
