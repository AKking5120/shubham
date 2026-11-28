import { mapsLink, whatsappLink } from "@/lib/constants";
import { normalizeShopSearch, searchCatalog, type CatalogSearchHit } from "@/lib/print-catalog";
import { visitingCardPackSize, visitingCardRates } from "@/lib/visiting-card-rates";

type Action = { label: string; href: string };
export type AssistantReply = { text: string; actions: Action[]; category?: string };

const browse = { label: "Browse Shop", href: "/shop" };
const estimate = { label: "Visiting Card Estimate", href: "/services#estimate" };
const contact = { label: "Chat with the shop", href: whatsappLink() };
const guide = { label: "Print File Guide", href: "/print-file-guide" };
const track = { label: "Track your order", href: "/track-order" };
const flex = { label: "Flex & Vinyl", href: "/premium-gallery" };
const wedding = { label: "Wedding Card designs", href: "/shop/wedding-cards/products" };

function normalize(message: string) {
  return normalizeShopSearch(message
    .replace(/\b(?:shadi|shaadi|marriage)\b/gi, "wedding")
    .replace(/\b(?:photocopy|xerox|photocopies)\b/gi, "bulk print")
    .replace(/\b(?:pamphlate|pamplate|pumlate)\b/gi, "pamphlet")
    .replace(/\b(?:visitingcard|businesscard)\b/gi, "visiting card")
    .replace(/[^a-z0-9\s-]/gi, " "));
}

const filler = /\b(i|me|my|please|show|find|want|need|some|you|have|do|can|looking|for|how|much|price|rate|rates|cost|kitna|kitne|ka|ki|kya|hai|chahiye|dikhao|quote|quotation|estimate|print|printing|and|or|products|product|pcs)\b/g;
const format = new Intl.NumberFormat("en-IN");

export function assistantReply(message: string, index: CatalogSearchHit[], previousCategory?: string): AssistantReply {
  const query = normalize(message);
  const wantsPrice = /\b(price|rate|rates|cost|kitna|kitne|quote|quotation|estimate|gsm)\b/.test(query);
  const visiting = /\bvisiting cards?\b/.test(query);
  const productQuery = query.replace(filler, " ").replace(/\b(?:a|an|the|to)\b/g, " ").trim().replace(/\s+/g, " ");
  if (/^(hi|hello|hey|namaste|help|find a product)$/.test(query)) {
    return { text: "Type a product name, for example paper bags, wedding cards or vinyl.", actions: [browse] };
  }
  if (/\b(track|tracking|status|order id)\b/.test(query)) {
    return { text: "Use your order ID and registered mobile number on the tracking page.", actions: [track] };
  }
  if (/\b(bleed|margin|ppi|dpi|pdf|artwork|file|upload|resolution)\b/.test(query)) {
    return { text: "The file guide covers PDF export, bleed, safe margins and image quality. Attach artwork to the website quote form or share it with the shop on WhatsApp.", actions: [guide, contact] };
  }
  if (/\b(address|location|directions|map|kahan|kidhar)\b/.test(query)) {
    return { text: "Shubham Prints is in Jaitpur, Badarpur, New Delhi.", actions: [{ label: "Open Google Maps", href: mapsLink() }, { label: "Contact page", href: "/contact" }] };
  }
  if (/\b(whatsapp|contact|human|staff|number)\b/.test(query)) {
    return { text: "Open WhatsApp to talk directly with Shubham Prints.", actions: [contact] };
  }
  if (wantsPrice && (visiting || /\b(?:300|500)\s*gsm\b/.test(query) || (!productQuery && /visiting-cards$/.test(previousCategory ?? "")))) {
    const { "300": standard, "500": premium } = visitingCardRates;
    return {
      text: `Per ${format.format(visitingCardPackSize)} visiting cards: 300 GSM ₹${format.format(standard.single)} single-sided or ₹${format.format(standard.double)} double-sided. 500 GSM ₹${format.format(premium.single)} single-sided or ₹${format.format(premium.double)} double-sided.`,
      actions: [estimate, { label: "View visiting cards", href: "/shop/standard-visiting-cards/products" }],
      category: "standard-visiting-cards",
    };
  }
  if (/\bwedding cards?\b/.test(query) && !/\b\d+\b/.test(query)) {
    return { text: "Browse wedding designs by colour and style, or shortlist up to three for a WhatsApp quote.", actions: [wedding], category: "wedding-cards" };
  }
  if (/^(flex|flex vinyl|flex banner|flex and vinyl)$/.test(query)) {
    return { text: "Choose Flex Banner, Flex Board or Vinyl and enter dimensions and quantity for a quote.", actions: [flex], category: "flex-printing" };
  }

  const products = productQuery ? searchCatalog(productQuery, index) : [];
  const matches = products.length || productQuery || !wantsPrice || !previousCategory
    ? products
    : index.filter((hit) => hit.categorySlug === previousCategory);
  if (matches.length) {
    return {
      text: wantsPrice ? "Open a matching product to request a quote." : "Here are matching products. Open one to view the design and quote options.",
      actions: matches.slice(0, 5).map((hit) => ({ label: hit.product.name, href: `${hit.href}#${hit.product.slug}` })),
      category: matches[0].categorySlug,
    };
  }
  if (wantsPrice) return { text: "Share the product name and quantity to find the right quote option.", actions: [browse, contact] };
  return { text: "I couldn't find a matching product. Try a shorter name, like bill book, vinyl or paper bag.", actions: [browse, contact] };
}
