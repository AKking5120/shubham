import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const prefix = "shop-analytics:";

export async function incrementAnalyticsCount(type: "page" | "topic" | "keyword", label: string) {
  const db = getSupabaseAdmin();
  const key = `${prefix}${type}:${label}`;

  for (let attempt = 0; attempt < 6; attempt++) {
    const { data, error } = await db.from("app_settings").select("value").eq("key", key).maybeSingle();
    if (error) throw error;

    if (!data) {
      const { error: insertError } = await db.from("app_settings").insert({ key, value: 1 });
      if (!insertError) return;
      if (insertError.code !== "23505") throw insertError;
    } else {
      const count = Number(data.value);
      const { data: updated, error: updateError } = await db.from("app_settings")
        .update({ value: count + 1, updated_at: new Date().toISOString() })
        .eq("key", key)
        .filter("value", "eq", String(count))
        .select("key")
        .maybeSingle();
      if (updateError) throw updateError;
      if (updated) return;
    }
  }
  throw new Error("Analytics counter was busy");
}

export async function getShopAnalytics() {
  const { data, error } = await getSupabaseAdmin().from("app_settings")
    .select("key,value").like("key", `${prefix}%`);
  if (error) throw error;

  function counts(type: string) {
    const start = `${prefix}${type}:`;
    return (data ?? [])
      .filter(({ key }) => key.startsWith(start))
      .map(({ key, value }) => ({ label: key.slice(start.length), count: Number(value) }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  }

  const pages = counts("page");
  const topics = counts("topic");
  return {
    totalViews: pages.reduce((total, row) => total + row.count, 0),
    totalSearches: topics.reduce((total, row) => total + row.count, 0),
    pages: pages.slice(0, 10),
    topics: topics.slice(0, 10),
    keywords: counts("keyword").slice(0, 10),
  };
}
