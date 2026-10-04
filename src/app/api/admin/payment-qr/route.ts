import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { paymentQrDataUrl } from "@/lib/payment-qr";
import { getPaymentSettings } from "@/lib/quote-store";
import { cleanText, isUpiId, parsePaymentAmount } from "@/lib/quote-workflow";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const amount = parsePaymentAmount(searchParams.get("amount") ?? "");
  const orderId = cleanText(searchParams.get("orderId"), 40).toUpperCase();
  const requestedUpi = cleanText(searchParams.get("upiId"), 80);
  if (amount == null) {
    return NextResponse.json({ error: "Enter the QR amount." }, { status: 400 });
  }
  if (!/^ORD-\d{4}-\d{5}$/.test(orderId)) {
    return NextResponse.json(
      { error: "Generate an Order ID before creating the QR." },
      { status: 400 },
    );
  }
  const saved = await getPaymentSettings();
  const upiId = isUpiId(requestedUpi) ? requestedUpi : saved.upiId;
  const qrDataUrl = await paymentQrDataUrl({ upiId, amount, orderId });
  return NextResponse.json({ qrDataUrl, upiId, amount });
}
