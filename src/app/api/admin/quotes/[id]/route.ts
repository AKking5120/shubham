import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getQuoteInquiry, updateQuoteInquiry, type QuotePatch } from "@/lib/quote-store";
import {
  cleanText,
  isPaymentStatus,
  isPrintingColor,
  isQuoteStatus,
  isValidEmail,
  normalizeMobile,
  parsePaymentAmount,
} from "@/lib/quote-workflow";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const quote = await getQuoteInquiry(id);
  if (!quote) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(quote);
}

export async function PATCH(request: Request, { params }: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const patch: QuotePatch = {};
  if (body.status !== undefined) {
    if (!isQuoteStatus(String(body.status))) {
      return NextResponse.json({ error: "Unknown status." }, { status: 400 });
    }
    patch.status = body.status;
  }
  if (body.adminNotes !== undefined) {
    patch.adminNotes = cleanText(body.adminNotes, 4000);
  }
  if (body.expectedCompletion !== undefined) {
    const raw = cleanText(body.expectedCompletion, 10);
    if (!raw) patch.expectedCompletion = null;
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
      return NextResponse.json({ error: "Expected date must be YYYY-MM-DD." }, { status: 400 });
    } else patch.expectedCompletion = raw;
  }
  if (body.customerName !== undefined) {
    const name = cleanText(body.customerName, 120);
    if (name.length < 2) {
      return NextResponse.json({ error: "Enter the customer name." }, { status: 400 });
    }
    patch.customerName = name;
  }
  if (body.phone !== undefined) {
    const phone = normalizeMobile(cleanText(body.phone, 20));
    if (!phone) {
      return NextResponse.json({ error: "Enter a valid mobile number." }, { status: 400 });
    }
    patch.phone = phone;
  }
  if (body.email !== undefined) {
    const email = cleanText(body.email, 160).toLowerCase();
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }
    patch.email = email;
  }
  if (body.size !== undefined) patch.size = cleanText(body.size, 80);
  if (body.quantity !== undefined) {
    const quantity = cleanText(body.quantity, 40);
    if (!/^\d{1,6}$/.test(quantity) || Number(quantity) < 1) {
      return NextResponse.json({ error: "Quantity must be a whole number." }, { status: 400 });
    }
    patch.quantity = quantity;
  }
  if (body.pagesSet !== undefined) {
    const pagesSet = cleanText(body.pagesSet, 40);
    const current = await getQuoteInquiry(id);
    const allowed =
      ["Single", "Duplicate", "Replicate"].includes(pagesSet) ||
      (current && pagesSet === current.pagesSet);
    if (!pagesSet || !allowed) {
      return NextResponse.json(
        { error: "Pages / set must be single, duplicate, or replicate." },
        { status: 400 },
      );
    }
    patch.pagesSet = pagesSet;
  }
  if (body.printingColor !== undefined) {
    if (!isPrintingColor(String(body.printingColor))) {
      return NextResponse.json({ error: "Unknown printing color." }, { status: 400 });
    }
    patch.printingColor = body.printingColor;
  }
  if (body.description !== undefined) {
    patch.description = cleanText(body.description, 2000);
  }
  if (body.paymentAmount !== undefined) {
    const amount = parsePaymentAmount(body.paymentAmount);
    if (amount === undefined) {
      return NextResponse.json(
        { error: "Enter a payment amount in rupees, or leave it blank." },
        { status: 400 },
      );
    }
    patch.paymentAmount = amount;
  }
  if (body.paymentStatus !== undefined) {
    if (!isPaymentStatus(String(body.paymentStatus))) {
      return NextResponse.json({ error: "Unknown payment status." }, { status: 400 });
    }
    patch.paymentStatus = body.paymentStatus;
  }

  const updated = await updateQuoteInquiry(id, patch, "admin");
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}
