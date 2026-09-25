import type { GalleryCategory, Product } from "./types";
import letterHeadFiles from "../../data/letter-head-image-files.json";
import visitingCardFiles from "../../data/visiting-card-image-files.json";

const BASE_URL = "https://printersclub.in/images/template-images/";

function productsFromFiles(
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
      image: `${BASE_URL}${encodeURI(file)}`,
    };
  });
}

export const VISITING_CARD_DESIGN_PRODUCTS = productsFromFiles(
  visitingCardFiles as string[],
  "vc-design",
  "Visiting Card Design",
  "Cards",
);

export const LETTER_HEAD_DESIGN_PRODUCTS = productsFromFiles(
  letterHeadFiles as string[],
  "lh-design",
  "Letter Head Design",
  "Stationery",
);
