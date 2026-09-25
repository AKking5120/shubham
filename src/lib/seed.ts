import type { Product, Service } from "./types";

export const DEFAULT_SERVICES: Service[] = [
  {
    id: "svc-1",
    slug: "bill-book",
    name: "Bill Book",
    shortDescription:
      "Professional bill books for shops and businesses with custom branding.",
    description:
      "Professional bill book printing for businesses and shops. Custom layouts, duplicate/triplicate options, and your business details printed clearly for everyday billing.",
    image: "/services/bill-book.jpg",
    enabled: true,
    order: 1,
  },
  {
    id: "svc-2",
    slug: "challan-book",
    name: "Challan Book",
    shortDescription:
      "Custom challan books for delivery, logistics and commercial use.",
    description:
      "Custom challan book printing for business and commercial requirements. Numbered pages, company details, and formats tailored to your workflow.",
    image: "/services/challan-book.jpg",
    enabled: true,
    order: 2,
  },
  {
    id: "svc-3",
    slug: "letter-pad",
    name: "Letter Pad",
    shortDescription:
      "Elegant letter pads for offices, firms and organizations.",
    description:
      "Professional letter pad printing for businesses, offices and organizations. Premium paper options with your logo and contact details.",
    image: "/services/letter-pad.jpg",
    enabled: true,
    order: 3,
  },
  {
    id: "svc-4",
    slug: "visiting-card-tag",
    name: "Visiting Card / Tag",
    shortDescription:
      "Visiting cards and tags for professional branding and retail use.",
    description:
      "Custom visiting cards and tags designed for professional branding and business use. Multiple finishes, sizes and paper stocks available.",
    image: "/services/visiting-card-tag.jpg",
    enabled: true,
    order: 4,
  },
  {
    id: "svc-5",
    slug: "sticker-banner",
    name: "Sticker / Banner",
    shortDescription:
      "Stickers and banners for promotions, events and shop branding.",
    description:
      "Custom stickers and banners for branding, promotions, events and other requirements. Indoor and outdoor options with vivid print quality.",
    image: "/services/sticker-banner.jpg",
    enabled: true,
    order: 5,
  },
  {
    id: "svc-6",
    slug: "wedding-card",
    name: "Wedding Card",
    shortDescription:
      "Beautiful wedding invitations and matching stationery.",
    description:
      "Beautiful custom wedding card printing for special occasions. Traditional and contemporary designs with premium papers and finishes.",
    image: "/services/wedding-card.jpg",
    enabled: true,
    order: 6,
  },
  {
    id: "svc-7",
    slug: "bulk-copy-printout",
    name: "Bulk Copy / Printout",
    shortDescription:
      "High-volume photocopy, document printing and printouts for study and office work.",
    description:
      "Bulk copying and printout services for students, offices and businesses. Black & white and colour options, A4 and other sizes, binding and finishing available on request.",
    image: "/services/bulk-copy-printout.jpg",
    enabled: true,
    order: 7,
  },
  {
    id: "svc-8",
    slug: "id-card",
    name: "ID Card",
    shortDescription:
      "Professional ID cards for staff, students, members and events.",
    description:
      "Custom ID card printing with photo, name, designation and barcode or QR options. Durable card stock for schools, offices, factories and events.",
    image: "/services/id-card.jpg",
    enabled: true,
    order: 8,
  },
  {
    id: "svc-9",
    slug: "die-cut-visiting-card",
    name: "Die Cut Visiting Card",
    shortDescription:
      "Premium die-cut and shaped visiting cards for standout branding.",
    description:
      "Special die-cut visiting cards including metal, velvet, UV and custom shapes. Choose from our design gallery and print with your details.",
    image: "/services/die-cut-visiting-card.jpg",
    enabled: true,
    order: 9,
  },
  {
    id: "svc-10",
    slug: "envelope",
    name: "Envelope",
    shortDescription:
      "Business and gift envelopes in standard and custom sizes.",
    description:
      "Printed envelopes for offices, invitations and gifting. Multiple sizes and layouts with your logo and address details.",
    image: "/services/envelope.jpg",
    enabled: true,
    order: 10,
  },
  {
    id: "svc-11",
    slug: "atm-pouch",
    name: "ATM Pouch",
    shortDescription:
      "Pouches for ATM cards, RC, driving licence and documents.",
    description:
      "Custom ATM and document pouches for banks, dealers and corporate use. Durable print with your branding.",
    image: "/services/atm-pouch.jpg",
    enabled: true,
    order: 11,
  },
  {
    id: "svc-12",
    slug: "doctor-files",
    name: "Doctor Files",
    shortDescription:
      "Files and folders for clinics, hospitals and medical practice.",
    description:
      "Doctor file and hospital stationery printing for OPD, records and corporate healthcare branding.",
    image: "/services/doctor-files.jpg",
    enabled: true,
    order: 12,
  },
  {
    id: "svc-13",
    slug: "uv-texture",
    name: "UV Texture",
    shortDescription:
      "UV texture artwork for cards, labels and premium print effects.",
    description:
      "UV texture design templates for high-end print finishes. Ideal for cards, packaging accents and special effects.",
    image: "/services/uv-texture.jpg",
    enabled: true,
    order: 13,
  },
  {
    id: "svc-14",
    slug: "garment-tags",
    name: "Garment Tags",
    shortDescription:
      "Hang tags and garment labels for apparel and retail brands.",
    description:
      "Custom garment tags and hang labels for clothing, accessories and retail. Multiple shapes and stringing options.",
    image: "/services/garment-tags.jpg",
    enabled: true,
    order: 14,
  },
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "prd-1",
    name: "Business Bill Books",
    category: "Business Printing",
    description: "Custom bill books for retail and wholesale businesses.",
    image: "/services/bill-book.jpg",
  },
  {
    id: "prd-2",
    name: "Office Letterheads",
    category: "Stationery",
    description: "Clean letter pad layouts for professional correspondence.",
    image: "/services/letter-pad.jpg",
  },
  {
    id: "prd-3",
    name: "Premium Visiting Cards",
    category: "Cards",
    description: "Matte and gloss visiting cards for teams and entrepreneurs.",
    image: "/services/visiting-card-tag.jpg",
  },
  {
    id: "prd-4",
    name: "Product Labels",
    category: "Stickers",
    description: "Die-cut stickers for packaging and product branding.",
    image: "/services/sticker-banner.jpg",
  },
  {
    id: "prd-5",
    name: "Shop Front Banner",
    category: "Banners",
    description: "Large-format banners for storefronts and events.",
    image: "/services/shop-banner.jpg",
  },
  {
    id: "prd-6",
    name: "Wedding Invitation Set",
    category: "Wedding Printing",
    description: "Invitation cards with matching envelopes and inserts.",
    image: "/services/wedding-card.jpg",
  },
  {
    id: "prd-7",
    name: "Challan Books",
    category: "Business Printing",
    description: "Delivery and dispatch challan books with serial numbering.",
    image: "/services/challan-book.jpg",
  },
  {
    id: "prd-8",
    name: "Garment Tags",
    category: "Cards",
    description: "Branded hang tags for apparel and accessories.",
    image: "/services/shop-banner.jpg",
  },
  {
    id: "prd-9",
    name: "Promotional Stickers",
    category: "Stickers",
    description: "Vinyl and paper stickers for campaigns and giveaways.",
    image: "/services/sticker-banner.jpg",
  },
];
