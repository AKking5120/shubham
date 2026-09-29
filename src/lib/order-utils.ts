import { digitsOnlyPhone } from "./constants";

export function normalizeOrderPhone(phone: string): string {
  const d = digitsOnlyPhone(phone);
  return d.length === 10 ? d : d.slice(-10);
}

export function generateOrderNumber(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PS-${y}${m}${day}-${rand}`;
}

export function orderTotals(items: { lineTotal: number }[], deliveryFee: number) {
  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
  return { subtotal, deliveryFee, total: subtotal + deliveryFee };
}
