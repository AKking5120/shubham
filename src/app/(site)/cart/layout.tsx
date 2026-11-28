import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false, follow: true },
};

export default function CartLayout({ children }: LayoutProps<"/cart">) {
  return children;
}
