import type { Product } from "./types";
import imageFiles from "../../data/visiting-card-image-files.json";

const BASE_URL = "https://printersclub.in/images/template-images/";

function imageUrl(file: string): string {
  return `${BASE_URL}${encodeURI(file)}`;
}

/** Printers Club visiting card previews (hardcoded file list). */
export const VISITING_CARD_DESIGN_PRODUCTS: Product[] = (
  imageFiles as string[]
).map((file, index) => {
  const n = index + 1;
  return {
    id: `vc-design-${n}`,
    name: `Visiting Card Design ${n}`,
    category: "Cards",
    description:
      "Visiting card design template — share your details for printing.",
    image: imageUrl(file),
  };
});
