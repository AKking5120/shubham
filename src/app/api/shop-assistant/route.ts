import { NextResponse } from "next/server";
import { buildShopSearchIndex, getManagedShop } from "@/lib/managed-shop";
import { assistantReply } from "@/lib/shop-assistant";

export async function POST(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  }
  if (Number(request.headers.get("content-length")) > 1500) {
    return NextResponse.json({ error: "Message is too long." }, { status: 413 });
  }

  const raw = await request.text();
  if (raw.length > 1500) return NextResponse.json({ error: "Message is too long." }, { status: 413 });
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid message." }, { status: 400 });
  }
  const message = typeof input?.message === "string" ? input.message.trim() : "";
  if (!message || message.length > 180) {
    return NextResponse.json({ error: "Enter a message of up to 180 characters." }, { status: 400 });
  }

  try {
    const reply = assistantReply(
      message,
      buildShopSearchIndex(await getManagedShop()),
      typeof input.category === "string" ? input.category : undefined,
    );
    return NextResponse.json(reply, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Shop Assistant is temporarily unavailable." }, { status: 503 });
  }
}
