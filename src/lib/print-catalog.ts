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
    iconKey: "stationery",
    subcategories: [
      {
        slug: "products",
        name: "Products",
        description: "Printed ID cards for schools, offices and events.",
        products: [],
      },
    ],
  },
  {
    slug: "bulk-print-copy",
    name: "Bulk Print & Copy",
    shortLabel: "Bulk Print & Copy",
    description: "Bulk printing and photocopying for documents and handouts.",
    iconKey: "bulk",
    subcategories: [
      {
        slug: "products",
        name: "Products",
        description: "Bulk printing and photocopying for documents and handouts.",
        products: [],
      },
    ],
  },
  {
    slug: "awards",
    name: "Awards",
    shortLabel: "Awards",
    description: "Certificates, medals, trophies, pens and accessories.",
    iconKey: "awards",
    subcategories: [
      {
        slug: "certificates",
        name: "Certificates",
        description: "Printed certificates for awards and recognition.",
        products: [],
      },
      {
        slug: "medals-trophies",
        name: "Medals & Trophies",
        description: "Medals and trophies for competitions and events.",
        products: [],
      },
      {
        slug: "pens-accessories",
        name: "Pens & Accessories",
        description: "Pens and accessories for events and gifting.",
        products: [],
      },
    ],
  },
  {
    slug: "paper-bags",
    name: "Paper Bags",
    shortLabel: "Paper Bags",
    description: "Paper bags for retail, packaging and events.",
    iconKey: "delivery",
    subcategories: [
      {
        slug: "products",
        name: "Products",
        description: "Paper bags for retail, packaging and events.",
        products: [],
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

export function flattenCatalogProducts(): CatalogSearchHit[] {
  const hits: CatalogSearchHit[] = [];
  for (const category of PRINT_CATALOG) {
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

export function searchCatalog(query: string, categorySlug?: string) {
  const q = query.trim().toLowerCase();
  return flattenCatalogProducts().filter((hit) => {
    if (categorySlug && hit.categorySlug !== categorySlug) return false;
    if (!q) return true;
    const hay = [
      hit.product.name,
      hit.product.description,
      hit.categoryName,
      hit.subcategoryName,
      hit.product.badge ?? "",
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
