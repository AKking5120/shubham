"use client";

import { CartProvider } from "@/components/cart/CartProvider";

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
