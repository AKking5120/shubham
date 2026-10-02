import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { generateQuoteOrderId } from "@/lib/quote-store";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(_request: Request, { params }: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    const quote = await generateQuoteOrderId(id, "admin");
    return NextResponse.json({
      success: true,
      orderId: quote.orderId,
      quote,
    });
  } catch (err) {
    const name = err instanceof Error ? err.name : "";
    if (name === "NotFound") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (name === "OrderExists") {
      return NextResponse.json(
        { error: "This quote already has an Order ID." },
        { status: 409 },
      );
    }
    console.error("[quote order id]", err);
    return NextResponse.json(
      { error: "Could not generate an Order ID." },
      { status: 500 },
    );
  }
}
