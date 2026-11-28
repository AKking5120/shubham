import { NextRequest, NextResponse } from "next/server";
import { getCatalogCategory } from "@/lib/print-catalog";
import { catalogKeywords, isAnalyticsPage } from "@/lib/shop-analytics";
import { incrementAnalyticsCount } from "@/lib/shop-analytics-store";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return new NextResponse(null, { status: 403 });
  }
  const raw = await request.text();
  if (raw.length > 512) return new NextResponse(null, { status: 413 });

  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  if (
    !event ||
    (event.type !== "page" && event.type !== "search" && event.type !== "no-result") ||
    typeof event.label !== "string"
  ) return new NextResponse(null, { status: 400 });

  const category = event.type === "search" ? getCatalogCategory(event.label) : null;
  const isSearch = event.type === "search" && (category || event.label === "flex-printing");
  if (event.type === "page" ? !isAnalyticsPage(event.label) : event.type !== "no-result" && !isSearch) {
    return new NextResponse(null, { status: 400 });
  }
  if (!isSupabaseConfigured()) return new NextResponse(null, { status: 503 });

  try {
    if (event.type !== "page") {
      const keywords = Array.isArray(event.keywords)
        ? catalogKeywords(event.keywords.filter((value: unknown) => typeof value === "string").join(" "))
        : [];
      await Promise.all(event.type === "no-result" ? [
        incrementAnalyticsCount("no-result", "total"),
        ...keywords.map((keyword) => incrementAnalyticsCount("missed-keyword", keyword)),
      ] : [
        incrementAnalyticsCount("topic", event.label),
        ...keywords.map((keyword) => incrementAnalyticsCount("keyword", keyword)),
      ]);
    } else {
      await incrementAnalyticsCount("page", event.label);
    }
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}
