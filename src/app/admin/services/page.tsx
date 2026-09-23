import { ServicesManager } from "@/components/admin/ServicesManager";
import { getAllServices } from "@/lib/store";

export default async function AdminServicesPage() {
  const services = await getAllServices();

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-[#0a1628]">Services</h1>
      <p className="mt-1 text-sm text-slate-600">
        Add, edit, enable or disable printing services shown on the website.
      </p>
      <div className="mt-8">
        <ServicesManager initial={services} />
      </div>
    </div>
  );
}
