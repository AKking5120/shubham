import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { BRAND_LOGO, SEO as DEFAULT_SEO } from "@/lib/constants";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { getSiteContent } from "@/lib/store";
import { getSiteUrl } from "@/lib/site-url";

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
  const siteUrl = getSiteUrl();
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(siteUrl),
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
    keywords: DEFAULT_SEO.keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: site.seo.title,
      description: site.seo.description,
      type: "website",
      locale: "en_IN",
      siteName: site.business.name,
      url: siteUrl,
      images: [
        {
          url: BRAND_LOGO,
          alt: site.business.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.seo.title,
      description: site.seo.description,
      images: [BRAND_LOGO],
    },
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
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
