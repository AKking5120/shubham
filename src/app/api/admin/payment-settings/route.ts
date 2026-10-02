import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getPaymentSettings, savePaymentSettings } from "@/lib/quote-store";
import { cleanText, isUpiId } from "@/lib/quote-workflow";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getPaymentSettings());
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const upiId = cleanText(body?.upiId, 80);
  if (!isUpiId(upiId)) {
    return NextResponse.json({ error: "Enter a valid UPI ID." }, { status: 400 });
  }
  const saved = await savePaymentSettings(upiId);
  return NextResponse.json(saved);
}
