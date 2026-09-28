import {
  BRAND_LOGO,
  BUSINESS,
  BUSINESS_GEO,
  mapsLink,
  SEO,
} from "@/lib/constants";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

export function LocalBusinessSchema() {
  const origin = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "PrintShop",
    "@id": `${origin}/#business`,
    name: BUSINESS.name,
    description: SEO.description,
    url: origin,
    telephone: BUSINESS.phones.map((p) => `+91${p}`),
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.line1,
      addressLocality: "Jaitpur, Badarpur",
      addressRegion: "Delhi",
      postalCode: "110044",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_GEO.latitude,
      longitude: BUSINESS_GEO.longitude,
    },
    hasMap: mapsLink(),
    areaServed: [
      { "@type": "City", name: "New Delhi" },
      { "@type": "Place", name: "Jaitpur" },
      { "@type": "Place", name: "Badarpur" },
    ],
    openingHours: ["Mo-Su 09:00-21:00"],
    priceRange: "₹₹",
    slogan: BUSINESS.slogan,
    image: absoluteUrl(BRAND_LOGO.split("?")[0] ?? BRAND_LOGO),
    logo: absoluteUrl(BRAND_LOGO.split("?")[0] ?? BRAND_LOGO),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
