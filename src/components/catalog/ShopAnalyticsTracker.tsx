"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const publicPages = ["/", "/services", "/contact", "/premium-gallery", "/shop"];

export function ShopAnalyticsTracker() {
  const pathname = usePathname();
  const lastPath = useRef("");

  useEffect(() => {
    if (!pathname || lastPath.current === pathname) return;
    lastPath.current = pathname;
    if (!publicPages.includes(pathname) && !pathname.startsWith("/shop/")) return;

    void fetch("/api/analytics", {
      method: "POST",
      body: JSON.stringify({ type: "page", label: pathname }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
