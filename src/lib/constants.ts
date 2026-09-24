export const BUSINESS = {
  name: "Shubham Prints & Stationers",
  owner: "Dhirendra Kumar",
  phones: ["9717528176", "9910374874"],
  email: "shubhamprints02@gmail.com",
  address: {
    line1: "D-54, Prince Colony, Tanki Road",
    line2: "Jaitpur, Badarpur",
    city: "New Delhi - 110044",
    full: "D-54, Prince Colony, Tanki Road, Jaitpur, Badarpur, New Delhi - 110044",
  },
  slogan: "An Unit of Complete Printing Solution",
};

/** Hero background photos (inner pages, mockup-style). */
export const PAGE_HERO_IMAGES = {
  services:
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
  about:
    "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1600&q=80",
  contact:
    "https://images.unsplash.com/photo-1423666639045-f5600c27da9a?auto=format&fit=crop&w=1600&q=80",
  storefront:
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
} as const;

export const SEO = {
  title:
    "Shubham Prints & Stationers | Complete Printing Solutions in Jaitpur, New Delhi",
  description:
    "Shubham Prints & Stationers provides complete printing solutions including bill books, challan books, letter pads, visiting cards, tags, stickers, banners and wedding cards in Jaitpur, Badarpur, New Delhi.",
};

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hello Shubham Prints & Stationers, I would like to enquire about a printing requirement.";

export const PRIMARY_PHONE = BUSINESS.phones[0];

export function telLink(phone: string) {
  return `tel:+91${phone}`;
}

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(message ?? WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/91${PRIMARY_PHONE}?text=${text}`;
}

/** Official Google Maps embed for SHUBHAM PRINTS */
export const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d18097.7034546956!2d77.33109201192634!3d28.50014174721975!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce6ff1b05aaab%3A0x20452e2b08f514c8!2sSHUBHAM%20PRINTS!5e1!3m2!1sen!2sin!4v1790178330409!5m2!1sen!2sin";

export function mapsEmbedUrl() {
  return MAPS_EMBED_URL;
}

export function mapsLink() {
  return "https://www.google.com/maps/place/SHUBHAM+PRINTS/@28.5001417,77.331092,17z";
}

export const SERVICE_SLUGS = [
  "bill-book",
  "challan-book",
  "letter-pad",
  "visiting-card-tag",
  "sticker-banner",
  "wedding-card",
] as const;

export const ENQUIRY_STATUSES = [
  "New",
  "Contacted",
  "In Progress",
  "Completed",
  "Cancelled",
] as const;

export const GALLERY_CATEGORIES = [
  "Business Printing",
  "Cards",
  "Stationery",
  "Stickers",
  "Banners",
  "Wedding Printing",
] as const;

export const ADMIN_SESSION_COOKIE = "shubham_admin_session";
