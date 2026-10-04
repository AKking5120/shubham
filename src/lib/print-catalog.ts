import { whatsappLink } from "@/lib/constants";

export type CatalogProduct = {
  slug: string;
  name: string;
  description: string;
  image: string;
  /** e.g. "₹3 each for 100 pcs" — indicative; final quote on WhatsApp */
  priceLabel?: string;
  badge?: string;
  bestSeller?: boolean;
};

export type CatalogSubcategory = {
  slug: string;
  name: string;
  description: string;
  image: string;
  products: CatalogProduct[];
};

export type CatalogCategory = {
  slug: string;
  name: string;
  shortLabel: string;
  description: string;
  image: string;
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

const IMG = {
  bill: "/products/bill-book.jpg",
  bill2: "/products/bill-book-2.jpg",
  challan: "/products/bill-book-3.jpg",
  letter: "/services/letter-pad.jpg",
  letterhead: "/products/letterhead.jpg",
  letterhead2: "/products/letterhead-2.jpg",
  letterhead3: "/products/letterhead-3.jpg",
  card: "/products/business-card.jpg",
  card2: "/products/business-card-2.jpg",
  card3: "/products/business-card-3.jpg",
  card4: "/products/business-card-4.jpg",
  card5: "/products/business-card-5.jpg",
  card6: "/products/business-card-6.jpg",
  id: "/gallery/id-card/01.jpg",
  banner: "/services/sticker-banner.jpg",
  wedding: "/services/wedding-card.jpg",
  invite: "/products/wedding-card.jpg",
  invite2: "/products/wedding-card-2.jpg",
  invite3: "/products/wedding-card-3.jpg",
  invite4: "/products/wedding-card-4.jpg",
  invite5: "/products/wedding-card-5.jpg",
  invite6: "/products/wedding-card-6.jpg",
  invite7: "/products/wedding-card-7.jpg",
  invite8: "/products/wedding-card-8.jpg",
  invite9: "/products/wedding-card-9.jpg",
  invite10: "/products/wedding-card-10.jpg",
  invite11: "/products/wedding-card-11.jpg",
  invite12: "/products/wedding-card-12.jpg",
  invite13: "/products/wedding-card-13.jpg",
  invite14: "/products/wedding-card-14.jpg",
  invite15: "/products/wedding-card-15.jpg",
  invite16: "/products/wedding-card-16.jpg",
  invite17: "/products/wedding-card-17.jpg",
  invite18: "/products/wedding-card-18.jpg",
  birthday: "/products/birthday-card.jpg",
  birthday2: "/products/birthday-card-2.jpg",
  birthday3: "/products/birthday-card-3.jpg",
  birthday4: "/products/birthday-card-4.jpg",
  birthday5: "/products/birthday-card-5.jpg",
  bulk: "/services/bulk-copy-printout.jpg",
  envelope: "/products/envelope.jpg",
  envelope2: "/products/envelope-2.jpg",
  envelope3: "/products/envelope-3.jpg",
  envelope4: "/products/envelope-4.jpg",
  atm: "/products/atm-pouch.jpg",
  folder: "/products/folder.jpg",
  folder2: "/products/folder-2.jpg",
  tags: "/products/garment-tags.jpg",
  tags2: "/products/garment-tags-2.jpg",
  tags3: "/products/garment-tags-3.jpg",
  sticker: "/products/sticker.jpg",
  sticker2: "/products/sticker-2.jpg",
  sticker3: "/products/sticker-3.jpg",
  sticker4: "/products/sticker-4.jpg",
  pamphlet: "/products/pamphlet.jpg",
  pamphlet2: "/products/pamphlet-2.jpg",
  pamphlet3: "/products/pamphlet-3.jpg",
  poster: "/products/poster.jpg",
};

function products(
  items: (Omit<CatalogProduct, "description"> & { description?: string })[],
): CatalogProduct[] {
  return items.map((p) => ({
    ...p,
    description:
      p.description ??
      `Custom ${p.name.toLowerCase()} — share quantity, size & design on WhatsApp for a quick quote.`,
  }));
}

export const PRINT_CATALOG: CatalogCategory[] = [
  {
    slug: "office-stationery",
    name: "Office Stationery",
    shortLabel: "Stationery",
    description: "Bill books, letter pads, cards, pads, envelopes & office print.",
    image: IMG.letterhead,
    iconKey: "stationery",
    subcategories: [
      {
        slug: "bill-books",
        name: "Bill & challan books",
        description: "GST duplicate / triplicate pads for shops.",
        image: IMG.bill,
        products: products([
          { slug: "bill-book-dup", name: "Duplicate bill book", image: IMG.bill, priceLabel: "Quote on WhatsApp" },
          { slug: "bill-book-trip", name: "Triplicate bill book", image: IMG.bill2, priceLabel: "Quote on WhatsApp" },
          { slug: "challan-book", name: "Challan book", image: IMG.challan, priceLabel: "Quote on WhatsApp" },
        ]),
      },
      {
        slug: "letter-pads",
        name: "Letter pads",
        description: "Branded letterheads for offices & firms.",
        image: IMG.letterhead,
        products: products([
          { slug: "letterhead", name: "70 GSM Maplitho letterhead", image: IMG.letterhead, bestSeller: true },
          { slug: "letter-pad-a4", name: "100 GSM Excel Bond letterhead", image: IMG.letterhead2, priceLabel: "From ₹8/sheet approx." },
          { slug: "letterhead-templates", name: "Letterhead templates", image: IMG.letterhead3 },
        ]),
      },
      {
        slug: "visiting-cards",
        name: "Visiting / business cards",
        description: "Standard & premium finishes — share design on WhatsApp.",
        image: IMG.card,
        products: products([
          {
            slug: "standard-cards",
            name: "Standard business cards",
            image: IMG.card,
            priceLabel: "₹3 each for 100 pcs (indicative)",
            bestSeller: true,
            badge: "4 Hrs delivery",
          },
          {
            slug: "die-cut-cards",
            name: "Die-cut visiting cards",
            image: IMG.card2,
            priceLabel: "Quote on WhatsApp",
          },
          {
            slug: "premium-uv",
            name: "Velvet and UV cards",
            image: IMG.card3,
            priceLabel: "Quote on WhatsApp",
          },
          {
            slug: "texture-cards",
            name: "Texture visiting cards",
            image: IMG.card4,
            priceLabel: "Quote on WhatsApp",
          },
          {
            slug: "matt-gloss-cards",
            name: "Matt and gloss cards",
            image: IMG.card5,
            priceLabel: "Quote on WhatsApp",
          },
          {
            slug: "pvc-cards",
            name: "PVC visiting cards",
            image: IMG.card6,
            priceLabel: "Quote on WhatsApp",
          },
        ]),
      },
      {
        slug: "voucher-pads",
        name: "Voucher pads",
        description: "Numbered voucher & receipt pads.",
        image: IMG.bill,
        products: products([
          { slug: "voucher-pad", name: "Voucher pad", image: IMG.bill },
        ]),
      },
      {
        slug: "envelopes",
        name: "Envelopes",
        description: "Printed envelopes all sizes.",
        image: IMG.envelope,
        products: products([
          { slug: "envelope-window", name: "Window envelope 9x4", image: IMG.envelope, bestSeller: true },
          { slug: "envelope-floral", name: "Floral window envelope", image: IMG.envelope2 },
          { slug: "envelope-invitation", name: "Invitation envelope 6x8", image: IMG.envelope3 },
          { slug: "envelope-card", name: "Card envelope 5x7", image: IMG.envelope4 },
        ]),
      },
      {
        slug: "atm-pouch",
        name: "ATM pouch",
        description: "Printed ATM pouches and card holders.",
        image: IMG.atm,
        products: products([
          { slug: "atm-pouch", name: "ATM pouch", image: IMG.atm, bestSeller: true },
        ]),
      },
      {
        slug: "file-folders",
        name: "File folders",
        description: "Printed office folders and doctor files.",
        image: IMG.folder,
        products: products([
          { slug: "printed-folder", name: "Printed folder", image: IMG.folder, bestSeller: true },
          { slug: "folder-inside", name: "Folder inside pocket", image: IMG.folder2 },
        ]),
      },
      {
        slug: "id-lanyards",
        name: "ID cards & lanyards",
        description: "Staff ID, school ID, lanyards.",
        image: IMG.id,
        products: products([
          { slug: "id-card", name: "PVC ID cards", image: IMG.id },
          { slug: "lanyard", name: "Lanyards with print", image: IMG.id },
        ]),
      },
      {
        slug: "note-pads",
        name: "Note pads",
        description: "Branded notebooks & notepads.",
        image: IMG.letter,
        products: products([
          { slug: "note-pad", name: "Custom note pad", image: IMG.letter },
        ]),
      },
      {
        slug: "booklets",
        name: "Booklets",
        description: "Catalogues, menus & booklets.",
        image: IMG.bulk,
        products: products([
          { slug: "booklet", name: "Booklet printing", image: IMG.bulk },
        ]),
      },
      {
        slug: "certificates",
        name: "Certificates",
        description: "Award & course certificates.",
        image: IMG.letter,
        products: products([
          { slug: "certificate-print", name: "Certificate printing", image: IMG.letter },
        ]),
      },
      {
        slug: "printouts",
        name: "Colour / B&W printouts",
        description: "Bulk xerox & document printing.",
        image: IMG.bulk,
        products: products([
          {
            slug: "colour-printout",
            name: "Colour printouts (bulk)",
            image: IMG.bulk,
            bestSeller: true,
            priceLabel: "Per page — ask on WhatsApp",
          },
          { slug: "bw-printout", name: "B&W printouts (bulk)", image: IMG.bulk },
        ]),
      },
    ],
  },
  {
    slug: "signage-promo",
    name: "Signage & promo",
    shortLabel: "Signage",
    description: "Garment tags, vinyl, flex, banners & posters.",
    image: IMG.banner,
    iconKey: "signage",
    subcategories: [
      {
        slug: "garment-tags",
        name: "Garment tags & labels",
        description: "Hang tags, stickers & label rolls.",
        image: IMG.tags,
        products: products([
          { slug: "hang-tag", name: "Gloss and matt hang tags", image: IMG.tags, bestSeller: true },
          { slug: "hanger-sticker", name: "Texture and UV tags", image: IMG.tags2 },
          { slug: "label-roll", name: "PVC tags and threads", image: IMG.tags3 },
        ]),
      },
      {
        slug: "vinyl-flex",
        name: "Vinyl & flex",
        description: "Shop boards & outdoor flex.",
        image: IMG.banner,
        products: products([
          { slug: "flex-board", name: "Flex board printing", image: IMG.banner, badge: "Outdoor" },
          { slug: "vinyl-print", name: "Vinyl print", image: IMG.banner },
        ]),
      },
      {
        slug: "banners",
        name: "Banners",
        description: "Event & shop banners.",
        image: IMG.banner,
        products: products([
          { slug: "roll-up-banner", name: "Roll-up banner", image: IMG.banner },
          { slug: "shop-banner", name: "Shop front banner", image: IMG.banner, bestSeller: true },
        ]),
      },
      {
        slug: "stickers",
        name: "Stickers",
        description: "Product stickers, labels and sticker sheets.",
        image: IMG.sticker,
        products: products([
          { slug: "custom-sticker", name: "Menu sticker", image: IMG.sticker, bestSeller: true },
          { slug: "flash-sale-sticker", name: "Flash sale sticker", image: IMG.sticker2 },
          { slug: "label-sticker-sheet", name: "Label sticker sheet", image: IMG.sticker3 },
          { slug: "sale-sticker-sheet", name: "Sale sticker sheet", image: IMG.sticker4 },
        ]),
      },
      {
        slug: "posters-pamphlets",
        name: "Posters & pamphlets",
        description: "Flyers, pamphlets & posters.",
        image: IMG.pamphlet,
        products: products([
          { slug: "pamphlet", name: "Pamphlet", image: IMG.pamphlet, bestSeller: true },
          { slug: "travel-pamphlet", name: "Travel pamphlet", image: IMG.pamphlet2 },
          { slug: "school-pamphlet", name: "School pamphlet", image: IMG.pamphlet3 },
          { slug: "poster", name: "Poster", image: IMG.poster },
        ]),
      },
    ],
  },
  {
    slug: "awards",
    name: "Awards & recognition",
    shortLabel: "Awards",
    description: "Medals, trophies & certificates.",
    image: IMG.wedding,
    iconKey: "awards",
    subcategories: [
      {
        slug: "medals-trophies",
        name: "Medals & trophies",
        description: "Events, sports & corporate awards.",
        image: IMG.wedding,
        products: products([
          { slug: "medal", name: "Custom medals", image: IMG.wedding },
          { slug: "trophy", name: "Trophies", image: IMG.wedding },
        ]),
      },
      {
        slug: "certificates-awards",
        name: "Certificates",
        description: "Premium certificate printing.",
        image: IMG.letter,
        products: products([
          { slug: "award-certificate", name: "Award certificates", image: IMG.letter },
        ]),
      },
    ],
  },
  {
    slug: "binding",
    name: "Binding",
    shortLabel: "Binding",
    description: "Hard, soft, spiral & wiro binding.",
    image: IMG.bulk,
    iconKey: "binding",
    subcategories: [
      {
        slug: "binding-services",
        name: "All binding types",
        description: "Thesis, reports & document binding.",
        image: IMG.bulk,
        products: products([
          { slug: "hard-binding", name: "Hard binding", image: IMG.bulk },
          { slug: "soft-binding", name: "Soft binding", image: IMG.bulk },
          { slug: "spiral-binding", name: "Spiral binding", image: IMG.bulk, bestSeller: true },
          { slug: "wiro-binding", name: "Wiro binding", image: IMG.bulk },
        ]),
      },
    ],
  },
  {
    slug: "wedding-cards",
    name: "Wedding cards",
    shortLabel: "Wedding",
    description: "Invitations & matching wedding stationery.",
    image: IMG.invite,
    iconKey: "wedding",
    subcategories: [
      {
        slug: "wedding-invites",
        name: "Wedding invitations",
        description: "Traditional & designer wedding cards.",
        image: IMG.invite,
        products: products([
          {
            slug: "classic-wedding",
            name: "Red swastik wedding card",
            image: IMG.invite,
            bestSeller: true,
          },
          { slug: "wedding-card-2", name: "Yellow Om wedding card", image: IMG.invite2 },
          { slug: "wedding-card-3", name: "White gold floral wedding card", image: IMG.invite3 },
          { slug: "wedding-card-4", name: "White gold Ganesha wedding card", image: IMG.invite4 },
          { slug: "wedding-card-5", name: "Gold foil Ganesha wedding card", image: IMG.invite5 },
          { slug: "wedding-card-6", name: "Floral couple wedding card", image: IMG.invite6 },
          { slug: "wedding-card-7", name: "Shubh Vivah wedding card", image: IMG.invite7 },
          { slug: "wedding-card-8", name: "Red velvet Om wedding card", image: IMG.invite8 },
          { slug: "wedding-card-9", name: "Ganesha Krishna wedding card", image: IMG.invite9 },
          { slug: "wedding-card-10", name: "Ganesha Krishna angled wedding card", image: IMG.invite10 },
          { slug: "wedding-card-11", name: "Beige couple wedding card", image: IMG.invite11 },
          { slug: "wedding-card-12", name: "Green gold Ganesha wedding card", image: IMG.invite12 },
          { slug: "wedding-card-13", name: "Peacock sliding couple card", image: IMG.invite13 },
          { slug: "wedding-card-14", name: "Kiyara weds Akshit wedding card", image: IMG.invite14 },
          { slug: "wedding-card-15", name: "Naresh weds Sarika layered set", image: IMG.invite15 },
          { slug: "wedding-card-16", name: "Green floral wedding card", image: IMG.invite16 },
          { slug: "wedding-card-17", name: "Red umbrella wedding card", image: IMG.invite17 },
          { slug: "wedding-card-18", name: "Naresh weds Sarika three-piece set", image: IMG.invite18 },
        ]),
      },
      {
        slug: "birthday-cards",
        name: "Birthday cards",
        description: "Birthday invitations and greeting cards.",
        image: IMG.birthday,
        products: products([
          { slug: "birthday-card", name: "Birthday card", image: IMG.birthday, bestSeller: true },
          { slug: "birthday-ganesha", name: "Ganesha birthday card", image: IMG.birthday2 },
          { slug: "birthday-ganesha-pad", name: "Ganesha birthday pad", image: IMG.birthday3 },
          { slug: "birthday-krishna", name: "Krishna birthday card", image: IMG.birthday4 },
          { slug: "birthday-krishna-ganesha", name: "Krishna Ganesha card", image: IMG.birthday5 },
        ]),
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
