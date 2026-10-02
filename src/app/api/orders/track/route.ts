import { NextResponse } from "next/server";
import { trackOrder } from "@/lib/store";
import { getPaymentSettings, getQuoteByOrderId } from "@/lib/quote-store";
import { paymentQrDataUrl } from "@/lib/payment-qr";
import { isQuoteOrderId, toPublicTrackedOrder } from "@/lib/quote-workflow";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderNumber = (searchParams.get("orderNumber") ?? "").trim();
  const phone = searchParams.get("phone") ?? "";

  if (!orderNumber) {
    return NextResponse.json({ error: "Enter an Order ID." }, { status: 400 });
  }

  if (isQuoteOrderId(orderNumber)) {
    const inquiry = await getQuoteByOrderId(orderNumber);
    const { upiId } = await getPaymentSettings();
    const quote = inquiry ? toPublicTrackedOrder(inquiry, upiId) : null;
    if (!quote) {
      return NextResponse.json(
        { error: "No order found for that Order ID." },
        { status: 404 },
      );
    }
    const payment = quote.payment
      ? {
          ...quote.payment,
          qrDataUrl: await paymentQrDataUrl({
            upiId: quote.payment.upiId,
            amount: quote.payment.amount,
            orderId: quote.orderId,
          }),
        }
      : null;
    return NextResponse.json({ kind: "quote", quote: { ...quote, payment } });
  }

  if (!phone.trim()) {
    return NextResponse.json(
      {
        error: "Enter the mobile number used at checkout for this order.",
        needsPhone: true,
      },
      { status: 400 },
    );
  }

  const order = await trackOrder(orderNumber, phone);
  if (!order) {
    return NextResponse.json(
      { error: "No order found. Check order ID and phone number." },
      { status: 404 },
    );
  }

  return NextResponse.json({ kind: "checkout", order });
}
