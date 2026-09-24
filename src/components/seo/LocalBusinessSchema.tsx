import { BRAND_LOGO, BUSINESS, SEO } from "@/lib/constants";

function siteOrigin() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    description: SEO.description,
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
    areaServed: "New Delhi",
    slogan: BUSINESS.slogan,
    image: `${siteOrigin()}${BRAND_LOGO}`,
    logo: `${siteOrigin()}${BRAND_LOGO}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
