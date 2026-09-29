export function getPublicRazorpayKeyId(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY?.trim()
  );
}

export function isRazorpayConfigured(): boolean {
  return Boolean(
    (process.env.RAZORPAY_KEY_ID?.trim() ||
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim()) &&
      process.env.RAZORPAY_KEY_SECRET?.trim(),
  );
}

/** Safe for client components (online pay UI only). */
export function isRazorpayPublicReady(): boolean {
  return Boolean(getPublicRazorpayKeyId());
}
