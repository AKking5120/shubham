import { NextResponse } from "next/server";
import { getCatalogProduct } from "@/lib/print-catalog";
import { deleteArtwork, saveArtwork } from "@/lib/artwork-storage";
import { createQuoteInquiry } from "@/lib/quote-store";
import {
  cleanText,
  isPrintingColor,
  isValidEmail,
  normalizeMobile,
} from "@/lib/quote-workflow";

const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const slot = hits.get(ip);
  if (!slot || slot.reset < now) {
    hits.set(ip, { count: 1, reset: now + 60 * 60 * 1000 });
    return false;
  }
  slot.count += 1;
  return slot.count > 20;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many quote requests. Please try again later." },
      { status: 429 },
    );
  }

  let artwork: Awaited<ReturnType<typeof saveArtwork>> | null = null;
  try {
    const form = await request.formData();
    const categorySlug = cleanText(form.get("categorySlug"), 80);
    const productCategorySlug = cleanText(form.get("productCategorySlug"), 80);
    const productSlug = cleanText(form.get("productSlug"), 80);
    const found = getCatalogProduct(categorySlug, productCategorySlug, productSlug);
    if (!found) {
      return NextResponse.json(
        { error: "Choose a product from the shop before requesting a quote." },
        { status: 400 },
      );
    }

    const customerName = cleanText(form.get("customerName"), 120);
    const email = cleanText(form.get("email"), 160).toLowerCase();
    const phone = normalizeMobile(cleanText(form.get("phone"), 20));
    const size = cleanText(form.get("size"), 80);
    const quantity = cleanText(form.get("quantity"), 40);
    const pagesSet = cleanText(form.get("pagesSet"), 40);
    const printingColor = cleanText(form.get("printingColor"), 40);
    const description = cleanText(form.get("description"), 2000);

    if (customerName.length < 2) {
      return NextResponse.json({ error: "Enter your name." }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json(
        { error: "Enter a valid 10-digit mobile number." },
        { status: 400 },
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    if (!size) {
      return NextResponse.json({ error: "Enter the size." }, { status: 400 });
    }
    if (!quantity || !/^\d{1,6}$/.test(quantity) || Number(quantity) < 1) {
      return NextResponse.json(
        { error: "Enter a quantity as a whole number." },
        { status: 400 },
      );
    }
    if (!["Single", "Duplicate", "Replicate"].includes(pagesSet)) {
      return NextResponse.json(
        { error: "Choose single, duplicate, or replicate." },
        { status: 400 },
      );
    }
    if (!isPrintingColor(printingColor)) {
      return NextResponse.json({ error: "Choose a printing color." }, { status: 400 });
    }

    const file = form.get("artwork");
    if (file instanceof File && file.size > 0) {
      artwork = await saveArtwork(file);
    }

    await createQuoteInquiry({
      customerName,
      phone,
      email,
      category: found.category.name,
      categorySlug: found.category.slug,
      productCategory: found.subcategory.name,
      productCategorySlug: found.subcategory.slug,
      product: found.product.name,
      productSlug: found.product.slug,
      size,
      quantity,
      pagesSet,
      printingColor,
      description,
      artwork,
    });

    return NextResponse.json({
      success: true,
      message:
        "Your quote request has been submitted. We will contact you with the price.",
    });
  } catch (err) {
    if (artwork) {
      try {
        await deleteArtwork(artwork);
      } catch {
        /* keep the customer-facing error */
      }
    }
    const message =
      err instanceof Error && err.name === "ArtworkError"
        ? err.message
        : "Could not submit the quote. Check the form and try again.";
    const status = err instanceof Error && err.name === "ArtworkError" ? 400 : 500;
    if (status === 500) console.error("[quotes]", err);
    return NextResponse.json({ error: message }, { status });
  }
}
