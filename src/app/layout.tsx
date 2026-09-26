import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { BRAND_LOGO } from "@/lib/constants";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { getSiteContent } from "@/lib/store";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const brandFont = Poppins({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  return {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: site.seo.title,
    template: `%s | ${site.business.name}`,
  },
  applicationName: site.business.name,
  description: site.seo.description,
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
    title: site.seo.title,
    description: site.seo.description,
    type: "website",
    locale: "en_IN",
    siteName: site.business.name,
    images: [
      {
        url: BRAND_LOGO,
        alt: site.business.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: site.seo.title,
    description: site.seo.description,
    images: [BRAND_LOGO],
  },
};
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${brandFont.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <LocalBusinessSchema />
      </body>
    </html>
  );
}
