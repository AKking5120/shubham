import { QuoteOrdersTable } from "@/components/admin/QuoteOrdersTable";
import { listQuoteInquiries } from "@/lib/quote-store";

export default async function AdminQuotesPage() {
  const quotes = await listQuoteInquiries();

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-[#0a1628]">Quote orders</h1>
      <p className="mt-1 text-sm text-slate-600">
        Shop quote requests. Generate an Order ID only after the customer confirms.
      </p>
      <div className="mt-8">
        <QuoteOrdersTable quotes={quotes} />
      </div>
    </div>
  );
}
