import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryDetail } from "@/components/admin/EnquiryDetail";
import { getEnquiryById } from "@/lib/store";

type AdminEnquiryPageProps = PageProps<"/admin/enquiries/[id]">;

export default async function AdminEnquiryDetailPage({
  params,
}: AdminEnquiryPageProps) {
  const { id } = await params;
  const enquiry = await getEnquiryById(id);
  if (!enquiry) notFound();

  return (
    <div className="p-6 lg:p-8">
      <Link
        href="/admin/enquiries"
        className="text-sm font-medium text-[#1e3a5f] hover:underline"
      >
        ← Back to enquiries
      </Link>
      <div className="mt-6">
        <EnquiryDetail enquiry={enquiry} />
      </div>
    </div>
  );
}
