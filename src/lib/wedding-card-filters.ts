const colours = {
  "Red & burgundy": [1, 2, 3, 4, 5, 7, 44, 45, 48, 49, 53, 63],
  "Gold & yellow": [6, 8, 15, 16, 20, 43, 61, 65],
  "Green & blue": [17, 19, 46, 47, 50],
};

const traditional = new Set([7, 8, 9, 10, 11, 12, 13, 14, 16, 22, 24, 26, 27, 30, 31, 33, 34, 35, 36, 37, 40, 43, 44, 45, 48, 49, 50, 53, 54, 63, 65]);
const floral = new Set([18, 19, 25, 28, 29, 39, 51, 52, 55, 56, 57, 58, 59, 62, 64]);

export function weddingCardFilters(slug: string) {
  const design = Number(slug.match(/^wedding-card-design-(\d+)$/)?.[1]);
  return {
    colour: Object.entries(colours).find(([, designs]) => designs.includes(design))?.[0] ?? "Cream & pastel",
    style: traditional.has(design) ? "Traditional" : floral.has(design) ? "Floral" : "Decorative",
  };
}
