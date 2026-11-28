import { whatsappLink } from "@/lib/constants";

export type CatalogProduct = {
  slug: string;
  name: string;
  description: string;
  image: string;
  /** e.g. "₹3 each for 100 pcs" — indicative; final quote on WhatsApp */
  priceLabel?: string;
  badge?: string;
};

export type CatalogSubcategory = {
  slug: string;
  name: string;
  description: string;
  image?: string;
  products: CatalogProduct[];
};

export type CatalogCategory = {
  slug: string;
  name: string;
  shortLabel: string;
  description: string;
  image?: string;
  /** Lucide-style keyword for icon mapping in UI */
  iconKey:
    | "stationery"
    | "apparel"
    | "signage"
    | "awards"
    | "binding"
    | "wedding"
    | "bulk"
    | "delivery";
  subcategories: CatalogSubcategory[];
};

const weddingCardProducts: CatalogProduct[] = Array.from({ length: 66 }, (_, index) => {
  const design = String(index + 1).padStart(2, "0");
  const slug = `wedding-card-design-${design}`;
  return {
    slug,
    name: `Wedding Card Design ${design}`,
    description: "Share your wedding invitation quantity and wording when requesting a quote.",
    image: `/products/shop/wedding-cards/${slug}.webp`,
  };
});

export const PRINT_CATALOG: CatalogCategory[] = [
  {
    slug: "atm-pouches",
    name: "ATM Pouches",
    shortLabel: "ATM Pouches",
    description: "Printed ATM card pouches and sleeves.",
    image: "/products/shop/atm-pouches/atm-pouch-design-1.webp",
    iconKey: "delivery",
    subcategories: [
      {
        slug: "products",
        name: "Products",
        description: "Printed ATM card pouches and sleeves.",
        image: "/products/shop/atm-pouches/atm-pouch-design-1.webp",
        products: [
          {
            slug: "atm-pouch-design-1",
            name: "ATM Pouch – Design 1",
            description: "Request a quote for ATM Pouch – Design 1 with your preferred quantity and print specifications.",
            image: "/products/shop/atm-pouches/atm-pouch-design-1.webp",
          },
          {
            slug: "atm-pouch-design-2",
            name: "ATM Pouch – Design 2",
            description: "Request a quote for ATM Pouch – Design 2 with your preferred quantity and print specifications.",
            image: "/products/shop/atm-pouches/atm-pouch-design-2.webp",
          },
        ],
      },
    ],
  },
  {
    slug: "registers-hard-binding",
    name: "Registers & Hard Binding",
    shortLabel: "Registers & Hard Binding",
    description: "Hardbound documents and registers.",
    image: "/products/shop/registers-hard-binding/hard-binding.webp",
    iconKey: "binding",
    subcategories: [
      {
        slug: "products",
        name: "Products",
        description: "Hardbound documents and registers.",
        image: "/products/shop/registers-hard-binding/hard-binding.webp",
        products: [
          {
            slug: "hard-binding",
            name: "Hard Binding",
            description: "Request a quote for Hard Binding with your preferred quantity and print specifications.",
            image: "/products/shop/registers-hard-binding/hard-binding.webp",
          },
          {
            slug: "hardbound-register",
            name: "Hardbound Register",
            description: "Request a quote for Hardbound Register with your preferred quantity and print specifications.",
            image: "/products/shop/registers-hard-binding/hardbound-register.webp",
          },
          {
            slug: "black-hardbound-thesis",
            name: "Black Hardbound Thesis",
            description: "Request a quote for Black Hardbound Thesis with your preferred quantity and print specifications.",
            image: "/products/shop/registers-hard-binding/black-hardbound-thesis.webp",
          },
          {
            slug: "hardbound-document-sets",
            name: "Hardbound Document Sets",
            description: "Request a quote for Hardbound Document Sets with your preferred quantity and print specifications.",
            image: "/products/shop/registers-hard-binding/hardbound-document-sets.webp",
          },
          {
            slug: "hardbound-thesis-covers",
            name: "Hardbound Thesis Covers",
            description: "Request a quote for Hardbound Thesis Covers with your preferred quantity and print specifications.",
            image: "/products/shop/registers-hard-binding/hardbound-thesis-covers.webp",
          },
        ],
      },
    ],
  },
  {
    slug: "stickers-labels",
    name: "Stickers & Labels",
    shortLabel: "Stickers & Labels",
    description: "Printed stickers and labels, including transparent and laser-cut designs.",
    image: "/products/shop/stickers-labels/laser-cut-sticker.webp",
    iconKey: "signage",
    subcategories: [
      {
        slug: "products",
        name: "Products",
        description: "Printed stickers and labels, including transparent and laser-cut designs.",
        image: "/products/shop/stickers-labels/laser-cut-sticker.webp",
        products: [
          {
            slug: "laser-cut-sticker",
            name: "Laser-Cut Sticker",
            description: "Request a quote for Laser-Cut Sticker with your preferred quantity and print specifications.",
            image: "/products/shop/stickers-labels/laser-cut-sticker.webp",
          },
          {
            slug: "standard-sticker-design-1",
            name: "Standard Sticker – Design 1",
            description: "Request a quote for Standard Sticker – Design 1 with your preferred quantity and print specifications.",
            image: "/products/shop/stickers-labels/standard-sticker-design-1.webp",
          },
          {
            slug: "standard-sticker-design-2",
            name: "Standard Sticker – Design 2",
            description: "Request a quote for Standard Sticker – Design 2 with your preferred quantity and print specifications.",
            image: "/products/shop/stickers-labels/standard-sticker-design-2.webp",
          },
          {
            slug: "transparent-sticker",
            name: "Transparent Sticker",
            description: "Request a quote for Transparent Sticker with your preferred quantity and print specifications.",
            image: "/products/shop/stickers-labels/transparent-sticker.webp",
          },
        ],
      },
    ],
  },
  {
    slug: "bill-books-challans",
    name: "Bill Books & Challans",
    shortLabel: "Bill Books & Challans",
    description: "GST bills, standard bills and challans.",
    image: "/products/shop/bill-books-challans/gst-bill-book.webp",
    iconKey: "stationery",
    subcategories: [
      {
        slug: "products",
        name: "Products",
        description: "GST bills, standard bills and challans.",
        image: "/products/shop/bill-books-challans/gst-bill-book.webp",
        products: [
          {
            slug: "gst-bill-book",
            name: "GST Bill Book",
            description: "Request a quote for GST Bill Book with your preferred quantity and print specifications.",
            image: "/products/shop/bill-books-challans/gst-bill-book.webp",
          },
          {
            slug: "standard-bill-book",
            name: "Standard Bill Book",
            description: "Request a quote for Standard Bill Book with your preferred quantity and print specifications.",
            image: "/products/shop/bill-books-challans/standard-bill-book.webp",
          },
          {
            slug: "standard-challan",
            name: "Standard Challan",
            description: "Request a quote for Standard Challan with your preferred quantity and print specifications.",
            image: "/products/shop/bill-books-challans/standard-challan.webp",
          },
        ],
      },
    ],
  },
  {
    slug: "letterheads",
    name: "Letterheads",
    shortLabel: "Letterheads",
    description: "Printed business letterhead designs.",
    image: "/products/shop/letterheads/letterhead-design-1.webp",
    iconKey: "stationery",
    subcategories: [
      {
        slug: "products",
        name: "Products",
        description: "Printed business letterhead designs.",
        image: "/products/shop/letterheads/letterhead-design-1.webp",
        products: [
          {
            slug: "letterhead-design-1",
            name: "Letterhead – Design 1",
            description: "Request a quote for Letterhead – Design 1 with your preferred quantity and print specifications.",
            image: "/products/shop/letterheads/letterhead-design-1.webp",
          },
          {
            slug: "letterhead-design-2",
            name: "Letterhead – Design 2",
            description: "Request a quote for Letterhead – Design 2 with your preferred quantity and print specifications.",
            image: "/products/shop/letterheads/letterhead-design-2.webp",
          },
        ],
      },
    ],
  },
  {
    slug: "die-cut-visiting-cards",
    name: "Die-Cut Visiting Cards",
    shortLabel: "Die-Cut Visiting Cards",
    description: "Die-cut and textured visiting card designs.",
    image: "/products/shop/die-cut-visiting-cards/die-cut-visiting-card-design-1.webp",
    iconKey: "stationery",
    subcategories: [
      {
        slug: "products",
        name: "Products",
        description: "Die-cut and textured visiting card designs.",
        image: "/products/shop/die-cut-visiting-cards/die-cut-visiting-card-design-1.webp",
        products: [
          {
            slug: "die-cut-visiting-card-design-1",
            name: "Die-Cut Visiting Card – Design 1",
            description: "Request a quote for Die-Cut Visiting Card – Design 1 with your preferred quantity and print specifications.",
            image: "/products/shop/die-cut-visiting-cards/die-cut-visiting-card-design-1.webp",
          },
          {
            slug: "die-cut-visiting-card-design-2",
            name: "Die-Cut Visiting Card – Design 2",
            description: "Request a quote for Die-Cut Visiting Card – Design 2 with your preferred quantity and print specifications.",
            image: "/products/shop/die-cut-visiting-cards/die-cut-visiting-card-design-2.webp",
          },
          {
            slug: "die-cut-visiting-card-design-3",
            name: "Die-Cut Visiting Card – Design 3",
            description: "Request a quote for Die-Cut Visiting Card – Design 3 with your preferred quantity and print specifications.",
            image: "/products/shop/die-cut-visiting-cards/die-cut-visiting-card-design-3.webp",
          },
          {
            slug: "die-cut-visiting-card-design-4",
            name: "Die-Cut Visiting Card – Design 4",
            description: "Request a quote for Die-Cut Visiting Card – Design 4 with your preferred quantity and print specifications.",
            image: "/products/shop/die-cut-visiting-cards/die-cut-visiting-card-design-4.webp",
          },
          {
            slug: "textured-visiting-card",
            name: "Textured Visiting Card",
            description: "Request a quote for Textured Visiting Card with your preferred quantity and print specifications.",
            image: "/products/shop/die-cut-visiting-cards/textured-visiting-card.webp",
          },
        ],
      },
    ],
  },
  {
    slug: "garment-tags",
    name: "Garment Tags",
    shortLabel: "Garment Tags",
    description: "Printed garment tags and hangers.",
    image: "/products/shop/garment-tags/garment-tag-design-1.webp",
    iconKey: "apparel",
    subcategories: [
      {
        slug: "products",
        name: "Products",
        description: "Printed garment tags and hangers.",
        image: "/products/shop/garment-tags/garment-tag-design-1.webp",
        products: [
          {
            slug: "garment-tag-design-1",
            name: "Garment Tag – Design 1",
            description: "Request a quote for Garment Tag – Design 1 with your preferred quantity and print specifications.",
            image: "/products/shop/garment-tags/garment-tag-design-1.webp",
          },
          {
            slug: "garment-tag-design-2",
            name: "Garment Tag – Design 2",
            description: "Request a quote for Garment Tag – Design 2 with your preferred quantity and print specifications.",
            image: "/products/shop/garment-tags/garment-tag-design-2.webp",
          },
          {
            slug: "garment-hanger-design-1",
            name: "Garment Hanger – Design 1",
            description: "Request a quote for Garment Hanger – Design 1 with your preferred quantity and print specifications.",
            image: "/products/shop/garment-tags/garment-hanger-design-1.webp",
          },
          {
            slug: "garment-hanger-design-2",
            name: "Garment Hanger – Design 2",
            description: "Request a quote for Garment Hanger – Design 2 with your preferred quantity and print specifications.",
            image: "/products/shop/garment-tags/garment-hanger-design-2.webp",
          },
          {
            slug: "garment-hanger-design-3",
            name: "Garment Hanger – Design 3",
            description: "Request a quote for Garment Hanger – Design 3 with your preferred quantity and print specifications.",
            image: "/products/shop/garment-tags/garment-hanger-design-3.webp",
          },
          {
            slug: "garment-hanger-design-5",
            name: "Garment Hanger – Design 5",
            description: "Request a quote for Garment Hanger – Design 5 with your preferred quantity and print specifications.",
            image: "/products/shop/garment-tags/garment-hanger-design-5.webp",
          },
          {
            slug: "paper-garment-hanger",
            name: "Paper Garment Hanger",
            description: "Request a quote for Paper Garment Hanger with your preferred quantity and print specifications.",
            image: "/products/shop/garment-tags/paper-garment-hanger.webp",
          },
        ],
      },
    ],
  },
  {
    slug: "standard-visiting-cards",
    name: "Standard Visiting Cards",
    shortLabel: "Standard Visiting Cards",
    description: "Standard visiting card designs for businesses.",
    image: "/products/shop/standard-visiting-cards/standard-visiting-card-design-1.webp",
    iconKey: "stationery",
    subcategories: [
      {
        slug: "products",
        name: "Products",
        description: "Standard visiting card designs for businesses.",
        image: "/products/shop/standard-visiting-cards/standard-visiting-card-design-1.webp",
        products: [
          {
            slug: "standard-visiting-card-design-1",
            name: "Standard Visiting Card – Design 1",
            description: "Request a quote for Standard Visiting Card – Design 1 with your preferred quantity and print specifications.",
            image: "/products/shop/standard-visiting-cards/standard-visiting-card-design-1.webp",
          },
          {
            slug: "standard-visiting-card-design-2",
            name: "Standard Visiting Card – Design 2",
            description: "Request a quote for Standard Visiting Card – Design 2 with your preferred quantity and print specifications.",
            image: "/products/shop/standard-visiting-cards/standard-visiting-card-design-2.webp",
          },
          {
            slug: "standard-visiting-card-design-3",
            name: "Standard Visiting Card – Design 3",
            description: "Request a quote for Standard Visiting Card – Design 3 with your preferred quantity and print specifications.",
            image: "/products/shop/standard-visiting-cards/standard-visiting-card-design-3.webp",
          },
          {
            slug: "standard-visiting-card-design-4",
            name: "Standard Visiting Card – Design 4",
            description: "Request a quote for Standard Visiting Card – Design 4 with your preferred quantity and print specifications.",
            image: "/products/shop/standard-visiting-cards/standard-visiting-card-design-4.webp",
          },
          {
            slug: "standard-visiting-card-design-5",
            name: "Standard Visiting Card – Design 5",
            description: "Request a quote for Standard Visiting Card – Design 5 with your preferred quantity and print specifications.",
            image: "/products/shop/standard-visiting-cards/standard-visiting-card-design-5.webp",
          },
        ],
      },
    ],
  },
  {
    slug: "pamphlets-leaflets",
    name: "Pamphlets & Leaflets",
    shortLabel: "Pamphlets & Leaflets",
    description: "Printed pamphlets, leaflets and catalogues.",
    image: "/products/shop/pamphlets-leaflets/catalogue-design-1.webp",
    iconKey: "signage",
    subcategories: [
      {
        slug: "products",
        name: "Products",
        description: "Printed pamphlets, leaflets and catalogues.",
        image: "/products/shop/pamphlets-leaflets/catalogue-design-1.webp",
        products: [
          {
            slug: "catalogue-design-1",
            name: "Catalogue – Design 1",
            description: "Request a quote for Catalogue – Design 1 with your preferred quantity and print specifications.",
            image: "/products/shop/pamphlets-leaflets/catalogue-design-1.webp",
          },
          {
            slug: "catalogue-design-2",
            name: "Catalogue – Design 2",
            description: "Request a quote for Catalogue – Design 2 with your preferred quantity and print specifications.",
            image: "/products/shop/pamphlets-leaflets/catalogue-design-2.webp",
          },
          {
            slug: "colour-a4-pamphlet",
            name: "Colour A4 Pamphlet",
            description: "Request a quote for Colour A4 Pamphlet with your preferred quantity and print specifications.",
            image: "/products/shop/pamphlets-leaflets/colour-a4-pamphlet.webp",
          },
          {
            slug: "black-and-white-a4-pamphlet",
            name: "Black-and-White A4 Pamphlet",
            description: "Request a quote for Black-and-White A4 Pamphlet with your preferred quantity and print specifications.",
            image: "/products/shop/pamphlets-leaflets/black-and-white-a4-pamphlet.webp",
          },
        ],
      },
    ],
  },
  {
    slug: "id-cards",
    name: "ID Cards",
    shortLabel: "ID Cards",
    description: "Printed ID cards for schools, offices and events.",
    image: "/products/shop/id-cards/plain-colour-lanyards.webp",
    iconKey: "stationery",
    subcategories: [
      {
        slug: "products",
        name: "Products",
        description: "Printed ID cards for schools, offices and events.",
        image: "/products/shop/id-cards/plain-colour-lanyards.webp",
        products: [
          {
            slug: "plain-colour-lanyards",
            name: "Plain Colour Lanyards",
            description: "Request a quote for Plain Colour Lanyards with your preferred quantity and print specifications.",
            image: "/products/shop/id-cards/plain-colour-lanyards.webp",
          },
          {
            slug: "printed-id-cards-with-lanyards",
            name: "Printed ID Cards with Lanyards",
            description: "Request a quote for Printed ID Cards with Lanyards with your preferred quantity and print specifications.",
            image: "/products/shop/id-cards/printed-id-cards-with-lanyards.webp",
          },
          {
            slug: "custom-printed-lanyards",
            name: "Custom Printed Lanyards",
            description: "Request a quote for Custom Printed Lanyards with your preferred quantity and print specifications.",
            image: "/products/shop/id-cards/custom-printed-lanyards.webp",
          },
          {
            slug: "printed-id-tags",
            name: "Printed ID Tags",
            description: "Request a quote for Printed ID Tags with your preferred quantity and print specifications.",
            image: "/products/shop/id-cards/printed-id-tags.webp",
          },
          {
            slug: "printed-ribbon-lanyards",
            name: "Printed Ribbon Lanyards",
            description: "Request a quote for Printed Ribbon Lanyards with your preferred quantity and print specifications.",
            image: "/products/shop/id-cards/printed-ribbon-lanyards.webp",
          },
          {
            slug: "blue-id-card-holder-with-lanyard",
            name: "Blue ID Card Holder with Lanyard",
            description: "Request a quote for Blue ID Card Holder with Lanyard with your preferred quantity and print specifications.",
            image: "/products/shop/id-cards/blue-id-card-holder-with-lanyard.webp",
          },
          {
            slug: "multicolour-id-card-lanyards",
            name: "Multicolour ID Card Lanyards",
            description: "Request a quote for Multicolour ID Card Lanyards with your preferred quantity and print specifications.",
            image: "/products/shop/id-cards/multicolour-id-card-lanyards.webp",
          },
          {
            slug: "satin-printed-id-card-lanyards",
            name: "Satin Printed ID Card Lanyards",
            description: "Request a quote for Satin Printed ID Card Lanyards with your preferred quantity and print specifications.",
            image: "/products/shop/id-cards/satin-printed-id-card-lanyards.webp",
          },
          {
            slug: "yellow-lanyards",
            name: "Yellow Lanyards",
            description: "Request a quote for Yellow Lanyards with your preferred quantity and print specifications.",
            image: "/products/shop/id-cards/yellow-lanyards.webp",
          },
        ],
      },
    ],
  },
  {
    slug: "bulk-print-copy",
    name: "Bulk Print & Copy",
    shortLabel: "Bulk Print & Copy",
    description: "Bulk printing and photocopying for documents and handouts.",
    image: "/products/shop/bulk-print-copy/black-and-white-bulk-printouts.webp",
    iconKey: "bulk",
    subcategories: [
      {
        slug: "products",
        name: "Products",
        description: "Bulk printing and photocopying for documents and handouts.",
        image: "/products/shop/bulk-print-copy/black-and-white-bulk-printouts.webp",
        products: [
          {
            slug: "black-and-white-bulk-printouts",
            name: "Black-and-White Bulk Printouts",
            description: "Request a quote for Black-and-White Bulk Printouts with your preferred quantity and print specifications.",
            image: "/products/shop/bulk-print-copy/black-and-white-bulk-printouts.webp",
          },
          {
            slug: "black-and-white-document-copies",
            name: "Black-and-White Document Copies",
            description: "Request a quote for Black-and-White Document Copies with your preferred quantity and print specifications.",
            image: "/products/shop/bulk-print-copy/black-and-white-document-copies.webp",
          },
          {
            slug: "photocopy-printing",
            name: "Photocopy Printing",
            description: "Request a quote for Photocopy Printing with your preferred quantity and print specifications.",
            image: "/products/shop/bulk-print-copy/photocopy-printing.webp",
          },
        ],
      },
    ],
  },
  {
    slug: "awards",
    name: "Awards",
    shortLabel: "Awards",
    description: "Certificates, medals, trophies, pens and accessories.",
    image: "/products/shop/awards/gold-star-trophy.webp",
    iconKey: "awards",
    subcategories: [
      {
        slug: "certificates",
        name: "Certificates",
        description: "Printed certificates for awards and recognition.",
        image: "/products/shop/awards/gold-ribbon-certificate.webp",
        products: [
          {
            slug: "gold-ribbon-certificate",
            name: "Gold Ribbon Certificate",
            description: "Request a quote for Gold Ribbon Certificate with your preferred quantity and print specifications.",
            image: "/products/shop/awards/gold-ribbon-certificate.webp",
          },
          {
            slug: "navy-and-gold-certificate",
            name: "Navy and Gold Certificate",
            description: "Request a quote for Navy and Gold Certificate with your preferred quantity and print specifications.",
            image: "/products/shop/awards/navy-and-gold-certificate.webp",
          },
          {
            slug: "classic-achievement-certificate",
            name: "Classic Achievement Certificate",
            description: "Request a quote for Classic Achievement Certificate with your preferred quantity and print specifications.",
            image: "/products/shop/awards/classic-achievement-certificate.webp",
          },
          {
            slug: "red-and-gold-achievement-certificate",
            name: "Red and Gold Achievement Certificate",
            description: "Request a quote for Red and Gold Achievement Certificate with your preferred quantity and print specifications.",
            image: "/products/shop/awards/red-and-gold-achievement-certificate.webp",
          },
          {
            slug: "award-certificate-with-rosette",
            name: "Award Certificate with Rosette",
            description: "Request a quote for Award Certificate with Rosette with your preferred quantity and print specifications.",
            image: "/products/shop/awards/award-certificate-with-rosette.webp",
          },
          {
            slug: "navy-and-gold-achievement-certificate",
            name: "Navy and Gold Achievement Certificate",
            description: "Request a quote for Navy and Gold Achievement Certificate with your preferred quantity and print specifications.",
            image: "/products/shop/awards/navy-and-gold-achievement-certificate.webp",
          },
          {
            slug: "blue-and-gold-appreciation-certificate",
            name: "Blue and Gold Appreciation Certificate",
            description: "Request a quote for Blue and Gold Appreciation Certificate with your preferred quantity and print specifications.",
            image: "/products/shop/awards/blue-and-gold-appreciation-certificate.webp",
          },
          {
            slug: "blue-border-achievement-certificate",
            name: "Blue Border Achievement Certificate",
            description: "Request a quote for Blue Border Achievement Certificate with your preferred quantity and print specifications.",
            image: "/products/shop/awards/blue-border-achievement-certificate.webp",
          },
          {
            slug: "navy-and-gold-appreciation-certificate",
            name: "Navy and Gold Appreciation Certificate",
            description: "Request a quote for Navy and Gold Appreciation Certificate with your preferred quantity and print specifications.",
            image: "/products/shop/awards/navy-and-gold-appreciation-certificate.webp",
          },
        ],
      },
      {
        slug: "medals-trophies",
        name: "Medals & Trophies",
        description: "Medals and trophies for competitions and events.",
        image: "/products/shop/awards/gold-star-trophy.webp",
        products: [
          {
            slug: "gold-star-trophy",
            name: "Gold Star Trophy",
            description: "Request a quote for Gold Star Trophy with your preferred quantity and print specifications.",
            image: "/products/shop/awards/gold-star-trophy.webp",
          },
          {
            slug: "gold-star-and-medal-trophy",
            name: "Gold Star and Medal Trophy",
            description: "Request a quote for Gold Star and Medal Trophy with your preferred quantity and print specifications.",
            image: "/products/shop/awards/gold-star-and-medal-trophy.webp",
          },
          {
            slug: "gold-cup-column-trophy",
            name: "Gold Cup Column Trophy",
            description: "Request a quote for Gold Cup Column Trophy with your preferred quantity and print specifications.",
            image: "/products/shop/awards/gold-cup-column-trophy.webp",
          },
          {
            slug: "gold-cup-trophy-with-ribbons",
            name: "Gold Cup Trophy with Ribbons",
            description: "Request a quote for Gold Cup Trophy with Ribbons with your preferred quantity and print specifications.",
            image: "/products/shop/awards/gold-cup-trophy-with-ribbons.webp",
          },
          {
            slug: "triple-star-trophy",
            name: "Triple Star Trophy",
            description: "Request a quote for Triple Star Trophy with your preferred quantity and print specifications.",
            image: "/products/shop/awards/triple-star-trophy.webp",
          },
        ],
      },
      {
        slug: "pens-accessories",
        name: "Pens & Accessories",
        description: "Pens and accessories for events and gifting.",
        image: "/products/shop/awards/engraved-metal-pens.webp",
        products: [
          {
            slug: "engraved-metal-pens",
            name: "Engraved Metal Pens",
            description: "Request a quote for Engraved Metal Pens with your preferred quantity and print specifications.",
            image: "/products/shop/awards/engraved-metal-pens.webp",
          },
          {
            slug: "metallic-colour-printed-pens",
            name: "Metallic Colour Printed Pens",
            description: "Request a quote for Metallic Colour Printed Pens with your preferred quantity and print specifications.",
            image: "/products/shop/awards/metallic-colour-printed-pens.webp",
          },
          {
            slug: "blue-promotional-printed-pen",
            name: "Blue Promotional Printed Pen",
            description: "Request a quote for Blue Promotional Printed Pen with your preferred quantity and print specifications.",
            image: "/products/shop/awards/blue-promotional-printed-pen.webp",
          },
          {
            slug: "two-tone-printed-pens",
            name: "Two-Tone Printed Pens",
            description: "Request a quote for Two-Tone Printed Pens with your preferred quantity and print specifications.",
            image: "/products/shop/awards/two-tone-printed-pens.webp",
          },
          {
            slug: "multicolour-promotional-pens",
            name: "Multicolour Promotional Pens",
            description: "Request a quote for Multicolour Promotional Pens with your preferred quantity and print specifications.",
            image: "/products/shop/awards/multicolour-promotional-pens.webp",
          },
        ],
      },
    ],
  },
  {
    slug: "wedding-cards",
    name: "Wedding Cards",
    shortLabel: "Wedding Cards",
    description: "Browse wedding invitation designs and request a printing quote.",
    image: weddingCardProducts[0].image,
    iconKey: "wedding",
    subcategories: [
      {
        slug: "products",
        name: "Products",
        description: "Choose a wedding invitation design to request a quote.",
        image: weddingCardProducts[0].image,
        products: weddingCardProducts,
      },
    ],
  },
  {
    slug: "paper-bags",
    name: "Paper Bags",
    shortLabel: "Paper Bags",
    description: "Paper bags for retail, packaging and events.",
    image: "/products/shop/paper-bags/white-paper-bag.webp",
    iconKey: "delivery",
    subcategories: [
      {
        slug: "products",
        name: "Products",
        description: "Paper bags for retail, packaging and events.",
        image: "/products/shop/paper-bags/white-paper-bag.webp",
        products: [
          {
            slug: "white-paper-bag",
            name: "White Paper Bag",
            description: "Request a quote for White Paper Bag with your preferred quantity and print specifications.",
            image: "/products/shop/paper-bags/white-paper-bag.webp",
          },
          {
            slug: "printed-kraft-paper-bags",
            name: "Printed Kraft Paper Bags",
            description: "Request a quote for Printed Kraft Paper Bags with your preferred quantity and print specifications.",
            image: "/products/shop/paper-bags/printed-kraft-paper-bags.webp",
          },
          {
            slug: "kraft-shopping-bag",
            name: "Kraft Shopping Bag",
            description: "Request a quote for Kraft Shopping Bag with your preferred quantity and print specifications.",
            image: "/products/shop/paper-bags/kraft-shopping-bag.webp",
          },
          {
            slug: "blue-printed-paper-bag",
            name: "Blue Printed Paper Bag",
            description: "Request a quote for Blue Printed Paper Bag with your preferred quantity and print specifications.",
            image: "/products/shop/paper-bags/blue-printed-paper-bag.webp",
          },
        ],
      },
    ],
  },
];

export function getCatalogCategory(slug: string) {
  return PRINT_CATALOG.find((c) => c.slug === slug) ?? null;
}

export function getCatalogSubcategory(categorySlug: string, subSlug: string) {
  const cat = getCatalogCategory(categorySlug);
  if (!cat) return null;
  const sub = cat.subcategories.find((s) => s.slug === subSlug) ?? null;
  return sub ? { category: cat, subcategory: sub } : null;
}

export function getCatalogProduct(
  categorySlug: string,
  subSlug: string,
  productSlug: string,
) {
  const found = getCatalogSubcategory(categorySlug, subSlug);
  if (!found) return null;
  const product =
    found.subcategory.products.find((p) => p.slug === productSlug) ?? null;
  return product ? { ...found, product } : null;
}

export function catalogWhatsAppQuote(opts: {
  productName: string;
  categoryName: string;
  subcategoryName?: string;
}) {
  const path = [opts.categoryName, opts.subcategoryName, opts.productName]
    .filter(Boolean)
    .join(" → ");
  const message = `Hello Shubham Prints, I need a quote for:\n${path}\n\nQuantity / size / design: `;
  return whatsappLink(message);
}

export const CATALOG_HOME_STRIP = PRINT_CATALOG.map((c) => ({
  slug: c.slug,
  name: c.shortLabel,
  image: c.image,
  iconKey: c.iconKey,
}));

export type CatalogSearchHit = {
  product: CatalogProduct;
  categorySlug: string;
  categoryName: string;
  subcategorySlug: string;
  subcategoryName: string;
  href: string;
};

export function flattenCatalogProducts(catalog = PRINT_CATALOG): CatalogSearchHit[] {
  const hits: CatalogSearchHit[] = [];
  for (const category of catalog) {
    for (const subcategory of category.subcategories) {
      for (const product of subcategory.products) {
        hits.push({
          product,
          categorySlug: category.slug,
          categoryName: category.name,
          subcategorySlug: subcategory.slug,
          subcategoryName: subcategory.name,
          href: `/shop/${category.slug}/${subcategory.slug}`,
        });
      }
    }
  }
  return hits;
}

export function normalizeShopSearch(query: string) {
  return query.toLowerCase()
    .replace(/\b(?:venyle|vynil|vinyle)\b/g, "vinyl")
    .replace(/\bbusiness cards?\b/g, "visiting card")
    .replace(/\b(?:leaflets?|flyers?)\b/g, "pamphlet")
    .trim()
    .replace(/\s+/g, " ");
}

export function searchCatalog(query: string, index: CatalogSearchHit[]) {
  const terms = normalizeShopSearch(query).split(" ").filter(Boolean);
  return index.filter((hit) => {
    const text = normalizeShopSearch([
      hit.product.name, hit.categoryName, hit.subcategoryName, hit.product.badge ?? "",
    ].join(" "));
    return terms.every((term) => text.includes(term));
  });
}
