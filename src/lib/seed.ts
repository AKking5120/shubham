import type { Product, Service } from "./types";

const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DEFAULT_SERVICES: Service[] = [
  {
    id: "svc-1",
    slug: "bill-book",
    name: "Bill Book",
    shortDescription:
      "Professional bill books for shops and businesses with custom branding.",
    description:
      "Professional bill book printing for businesses and shops. Custom layouts, duplicate/triplicate options, and your business details printed clearly for everyday billing.",
    image: unsplash("photo-1586281380349-632531db7ed4"),
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
    image: unsplash("photo-1450101499163-c8848c66ca85"),
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
    image: unsplash("photo-1568992687947-868a62a9f521"),
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
    image: unsplash("photo-1600880292203-757bb62b4baf"),
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
    image: unsplash("photo-1563986768609-322da13575f3"),
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
    image: unsplash("photo-1519741497674-611481863552"),
    enabled: true,
    order: 6,
  },
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "prd-1",
    name: "Business Bill Books",
    category: "Business Printing",
    description: "Custom bill books for retail and wholesale businesses.",
    image: unsplash("photo-1586281380349-632531db7ed4", 600),
  },
  {
    id: "prd-2",
    name: "Office Letterheads",
    category: "Stationery",
    description: "Clean letter pad layouts for professional correspondence.",
    image: unsplash("photo-1586953208448-b95a79798f07", 600),
  },
  {
    id: "prd-3",
    name: "Premium Visiting Cards",
    category: "Cards",
    description: "Matte and gloss visiting cards for teams and entrepreneurs.",
    image: unsplash("photo-1600880292203-757bb62b4baf", 600),
  },
  {
    id: "prd-4",
    name: "Product Labels",
    category: "Stickers",
    description: "Die-cut stickers for packaging and product branding.",
    image: unsplash("photo-1611532736597-de2d4265fba3", 600),
  },
  {
    id: "prd-5",
    name: "Shop Front Banner",
    category: "Banners",
    description: "Large-format banners for storefronts and events.",
    image: unsplash("photo-1563986768609-322da13575f3", 600),
  },
  {
    id: "prd-6",
    name: "Wedding Invitation Set",
    category: "Wedding Printing",
    description: "Invitation cards with matching envelopes and inserts.",
    image: unsplash("photo-1522673607200-164d1b6ce486", 600),
  },
  {
    id: "prd-7",
    name: "Challan Books",
    category: "Business Printing",
    description: "Delivery and dispatch challan books with serial numbering.",
    image: unsplash("photo-1503387762-592deb58ef4e", 600),
  },
  {
    id: "prd-8",
    name: "Garment Tags",
    category: "Cards",
    description: "Branded hang tags for apparel and accessories.",
    image: unsplash("photo-1441986300917-64674bd600d8", 600),
  },
  {
    id: "prd-9",
    name: "Promotional Stickers",
    category: "Stickers",
    description: "Vinyl and paper stickers for campaigns and giveaways.",
    image: unsplash("photo-1618005182384-a83a8bd57fbe", 600),
  },
];
