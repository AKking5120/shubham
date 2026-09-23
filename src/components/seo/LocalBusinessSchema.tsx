import { BUSINESS, SEO } from "@/lib/constants";

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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
