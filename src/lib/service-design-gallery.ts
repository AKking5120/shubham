import type { GalleryCategory, Product } from "./types";
import billBookFiles from "../../data/bill-book-image-files.json";
import letterHeadFiles from "../../data/letter-head-image-files.json";
import visitingCardFiles from "../../data/visiting-card-image-files.json";

const PRINTERS_CLUB_BASE =
  "https://printersclub.in/images/template-images/";

function printersClubUrl(file: string): string {
  return `${PRINTERS_CLUB_BASE}${encodeURI(file)}`;
}

function localGalleryUrl(folder: string, index: number): string {
  const n = String(index + 1).padStart(2, "0");
  return `/gallery/${folder}/${n}.jpg`;
}

function productsFromRemoteFiles(
  files: string[],
  idPrefix: string,
  namePrefix: string,
  category: GalleryCategory,
): Product[] {
  return files.map((file, index) => {
    const n = index + 1;
    return {
      id: `${idPrefix}-${n}`,
      name: `${namePrefix} ${n}`,
      category,
      description:
        "Design template — share your business details for printing.",
      image: printersClubUrl(file),
    };
  });
}

function productsFromLocalGallery(
  count: number,
  folder: string,
  idPrefix: string,
  namePrefix: string,
  category: GalleryCategory,
): Product[] {
  return Array.from({ length: count }, (_, index) => {
    const n = index + 1;
    return {
      id: `${idPrefix}-${n}`,
      name: `${namePrefix} ${n}`,
      category,
      description:
        "Design template — share your business details for printing.",
      image: localGalleryUrl(folder, index),
    };
  });
}

export const VISITING_CARD_DESIGN_PRODUCTS = productsFromRemoteFiles(
  visitingCardFiles as string[],
  "vc-design",
  "Visiting Card Design",
  "Cards",
);

/** Hosted locally — Printers Club JPGs 21–40 are 404 on their CDN. */
export const LETTER_HEAD_DESIGN_PRODUCTS = productsFromLocalGallery(
  (letterHeadFiles as string[]).length,
  "letter-head",
  "lh-design",
  "Letter Head Design",
  "Stationery",
);

export const BILL_BOOK_DESIGN_PRODUCTS = productsFromLocalGallery(
  (billBookFiles as string[]).length,
  "bill-book",
  "bb-design",
  "Bill Book Design",
  "Business Printing",
);
