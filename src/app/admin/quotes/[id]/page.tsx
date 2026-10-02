import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteOrderDetail } from "@/components/admin/QuoteOrderDetail";
import { getQuoteInquiry } from "@/lib/quote-store";

type Props = { params: Promise<{ id: string }> };

export default async function AdminQuoteDetailPage({ params }: Props) {
  const { id } = await params;
  const quote = await getQuoteInquiry(id);
  if (!quote) notFound();

  return (
    <div className="p-6 lg:p-8">
      <Link href="/admin/quotes" className="text-sm font-medium text-[#1e3a5f] hover:underline">
        ← Back to quote orders
      </Link>
      <div className="mt-6">
        <QuoteOrderDetail quote={quote} />
      </div>
    </div>
  );
}
