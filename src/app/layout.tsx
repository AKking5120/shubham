import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BRAND_LOGO, BUSINESS, SEO } from "@/lib/constants";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: SEO.title,
    template: `%s | ${BUSINESS.name}`,
  },
  applicationName: BUSINESS.name,
  description: SEO.description,
  icons: {
    icon: [{ url: BRAND_LOGO, type: "image/jpeg" }],
    apple: BRAND_LOGO,
  },
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
    siteName: BUSINESS.name,
    images: [
      {
        url: BRAND_LOGO,
        alt: BUSINESS.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SEO.title,
    description: SEO.description,
    images: [BRAND_LOGO],
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
