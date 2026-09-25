import { DesignGalleryManager } from "@/components/admin/DesignGalleryManager";
import {
  getAllServices,
  getDesignGalleryOverrides,
} from "@/lib/store";
import { getServiceDesignProducts } from "@/lib/service-design-gallery";

export default async function AdminDesignsPage() {
  const services = await getAllServices();
  const overrides = await getDesignGalleryOverrides();
  const registryCounts: Record<string, number> = {};
  for (const s of services) {
    registryCounts[s.slug] = getServiceDesignProducts(s.slug)?.length ?? 0;
  }

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-[#0a1628]">Design Templates</h1>
      <p className="mt-1 text-sm text-slate-600">
        Control design galleries for each printing service on the public site.
      </p>
      <div className="mt-8">
        <DesignGalleryManager
          services={services}
          initialOverrides={overrides}
          registryCounts={registryCounts}
        />
      </div>
    </div>
  );
}
