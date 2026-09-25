import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { mergeSiteContent, type SiteContent } from "@/lib/site-content";
import { getSiteContent, saveSiteContent } from "@/lib/store";

export async function GET() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getSiteContent());
}

export async function PUT(request: Request) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as Partial<SiteContent>;
  const merged = mergeSiteContent(body);
  await saveSiteContent(merged);
  return NextResponse.json({ success: true, content: merged });
}
