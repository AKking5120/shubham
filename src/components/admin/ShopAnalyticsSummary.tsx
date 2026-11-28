import { getCatalogCategory } from "@/lib/print-catalog";
import { getShopAnalytics } from "@/lib/shop-analytics-store";

export async function ShopAnalyticsSummary() {
  const report = await getShopAnalytics().catch(() => null);

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-bold text-slate-900">Website analytics</h2>
      {report ? (
        <>
          <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div><dt className="text-sm text-slate-600">Total public page views</dt><dd className="text-2xl font-bold">{report.totalViews}</dd></div>
            <div><dt className="text-sm text-slate-600">Shop searches with results</dt><dd className="text-2xl font-bold">{report.totalSearches}</dd></div>
            <div><dt className="text-sm text-slate-600">Shop searches with no results</dt><dd className="text-2xl font-bold">{report.noResults}</dd></div>
          </dl>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {[
              { title: "Most viewed pages", rows: report.pages },
              {
                title: "Most searched topics",
                rows: report.topics.map((row) => ({ ...row, label: row.label === "flex-printing" ? "Flex Printing" : getCatalogCategory(row.label)?.name ?? row.label })),
              },
              { title: "Top Shop search keywords", rows: report.keywords },
              { title: "Catalog words in searches with no results", rows: report.missedKeywords },
            ].map(({ title, rows }) => (
              <div key={title}>
                <h3 className="font-semibold text-slate-900">{title}</h3>
                {rows.length ? (
                  <ol className="mt-2 divide-y divide-slate-100 text-sm">
                    {rows.map(({ label, count }) => (
                      <li key={label} className="flex justify-between gap-3 py-2">
                        <span className="break-all">{label}</span>
                        <span className="font-semibold tabular-nums">{count}</span>
                      </li>
                    ))}
                  </ol>
                ) : <p className="mt-2 text-sm text-slate-600">No activity yet.</p>}
              </div>
            ))}
          </div>
        </>
      ) : <p className="mt-2 text-sm text-slate-600">Analytics data is currently unavailable.</p>}
    </section>
  );
}
