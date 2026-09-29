import { NextResponse } from "next/server";
import { verifyRazorpayPaymentSignature } from "@/lib/razorpay-server";
import { getOrderById, updateOrder } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const internalOrderId = String(body.internalOrderId ?? "");
    const razorpayOrderId = String(body.razorpayOrderId ?? "");
    const razorpayPaymentId = String(body.razorpayPaymentId ?? "");
    const razorpaySignature = String(body.razorpaySignature ?? "");

    if (!internalOrderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: "Missing payment details." }, { status: 400 });
    }

    const valid = verifyRazorpayPaymentSignature({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    if (!valid) {
      return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
    }

    const order = await getOrderById(internalOrderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const updated = await updateOrder(internalOrderId, {
      paymentStatus: "paid",
      razorpayOrderId,
      razorpayPaymentId,
      status: "confirmed",
    });

    return NextResponse.json({ order: updated });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Verification failed.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
