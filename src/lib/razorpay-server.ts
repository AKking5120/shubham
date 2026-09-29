import Razorpay from "razorpay";
import crypto from "crypto";

export function getRazorpayKeyId(): string | null {
  return (
    process.env.RAZORPAY_KEY_ID?.trim() ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() ||
    null
  );
}

function getRazorpaySecret(): string | null {
  return process.env.RAZORPAY_KEY_SECRET?.trim() || null;
}

export function isRazorpayServerReady(): boolean {
  return Boolean(getRazorpayKeyId() && getRazorpaySecret());
}

export function getRazorpayClient(): Razorpay {
  const keyId = getRazorpayKeyId();
  const secret = getRazorpaySecret();
  if (!keyId || !secret) {
    throw new Error("Razorpay keys are not configured.");
  }
  return new Razorpay({ key_id: keyId, key_secret: secret });
}

export async function createRazorpayOrder(params: {
  amountInr: number;
  receipt: string;
  notes?: Record<string, string>;
}) {
  const client = getRazorpayClient();
  const amountPaise = Math.round(params.amountInr * 100);
  if (amountPaise < 100) {
    throw new Error("Minimum order amount for online pay is ₹1.");
  }
  return client.orders.create({
    amount: amountPaise,
    currency: "INR",
    receipt: params.receipt.slice(0, 40),
    notes: params.notes,
  });
}

export function verifyRazorpayPaymentSignature(params: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): boolean {
  const secret = getRazorpaySecret();
  if (!secret) return false;
  const body = `${params.razorpayOrderId}|${params.razorpayPaymentId}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return expected === params.razorpaySignature;
}
