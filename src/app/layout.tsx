import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SEO } from "@/lib/constants";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  keywords: [
    "printing",
    "stationery",
    "bill book",
    "visiting card",
    "wedding card",
    "Jaitpur",
    "Badarpur",
    "New Delhi",
  ],
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <LocalBusinessSchema />
      </body>
    </html>
  );
}
