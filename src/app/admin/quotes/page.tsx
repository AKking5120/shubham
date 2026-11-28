import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { ManualWhatsAppQuote } from "@/components/admin/ManualWhatsAppQuote";
import { QuoteOrdersTable } from "@/components/admin/QuoteOrdersTable";
import { listQuoteInquiries } from "@/lib/quote-store";

export default async function AdminQuotesPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const quotes = await listQuoteInquiries();
  const stages = [
    { key: "new_quote", label: "New" },
    { key: "quote_discussed", label: "Quote sent / discussed" },
    { key: "order_confirmed", label: "Confirmed" },
    { key: "ready", label: "Ready" },
  ];

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-[#0a1628]">Quote orders</h1>
      <p className="mt-1 text-sm text-slate-600">
        Shop quote requests. Generate an Order ID only after the customer confirms.
      </p>
      <dl className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stages.map(({ key, label }) => (
          <div key={key} className="rounded-xl border bg-white p-3">
            <dt className="text-sm text-slate-600">{label}</dt>
            <dd className="text-xl font-bold">{quotes.filter((quote) => quote.status === key).length}</dd>
          </div>
        ))}
      </dl>
      <ManualWhatsAppQuote />
      <div className="mt-8">
        <QuoteOrdersTable quotes={quotes} />
      </div>
    </div>
  );
}
