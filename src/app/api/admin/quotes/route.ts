import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { cleanText, isPrintingColor, isValidEmail, normalizeMobile } from "@/lib/quote-workflow";
import { createQuoteInquiry, listQuoteInquiries } from "@/lib/quote-store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const quotes = await listQuoteInquiries();
  return NextResponse.json(quotes);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const form = await request.formData();
    const name = cleanText(form.get("customerName"), 120);
    const phone = normalizeMobile(cleanText(form.get("phone"), 20));
    const product = cleanText(form.get("product"), 120);
    const email = cleanText(form.get("email"), 160);
    const quantity = cleanText(form.get("quantity"), 10);
    const printingColor = cleanText(form.get("printingColor"), 30);
    if (name.length < 2 || !phone || !product || (email && !isValidEmail(email)) ||
      (quantity && !/^[1-9]\d{0,5}$/.test(quantity)) || !isPrintingColor(printingColor)) {
      return NextResponse.json({ error: "Check the customer details and printing options." }, { status: 400 });
    }
    const inquiry = await createQuoteInquiry({
      customerName: name, phone, email, product, productSlug: "manual-whatsapp",
      category: "WhatsApp enquiry", categorySlug: "whatsapp",
      productCategory: "Manual enquiry", productCategorySlug: "manual",
      size: cleanText(form.get("size"), 80), quantity, pagesSet: "", printingColor,
      description: cleanText(form.get("description"), 1800), artwork: null,
    }, "admin");
    return NextResponse.json({ id: inquiry.id }, { status: 201 });
  } catch (error) {
    console.error("Manual quote save failed", error);
    return NextResponse.json({ error: "Could not save the enquiry." }, { status: 500 });
  }
}
