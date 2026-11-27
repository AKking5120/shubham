import { NextResponse } from "next/server";
import { publicSeoDescription } from "@/lib/constants";
import { getSiteContent } from "@/lib/store";

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json({
    ...content,
    business: { ...content.business, phones: [] },
    seo: { ...content.seo, description: publicSeoDescription(content.seo.description) },
  });
}
