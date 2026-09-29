export type CartLineItem = {
  cartId: string;
  kind: "service" | "product" | "calculator";
  refId: string;
  title: string;
  quantity: number;
  unitPrice: number;
  options?: string;
  fileUrl?: string | null;
};

export function lineTotal(item: CartLineItem): number {
  return Math.round(item.unitPrice * Math.max(1, item.quantity));
}

export function cartSubtotal(items: CartLineItem[]): number {
  return items.reduce((s, i) => s + lineTotal(i), 0);
}
