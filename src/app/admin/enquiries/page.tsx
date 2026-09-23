import { EnquiriesTable } from "@/components/admin/EnquiriesTable";
import { getEnquiries } from "@/lib/store";

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-[#0a1628]">Orders / Enquiries</h1>
      <p className="mt-1 text-sm text-slate-600">
        Manage quotation requests from the website.
      </p>
      <div className="mt-8">
        <EnquiriesTable enquiries={enquiries} />
      </div>
    </div>
  );
}
