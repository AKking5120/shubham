import { GalleryManager } from "@/components/admin/GalleryManager";
import { getProducts } from "@/lib/store";

export default async function AdminGalleryPage() {
  const products = await getProducts();

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-[#0a1628]">Home Gallery Products</h1>
      <p className="mt-1 text-sm text-slate-600">
        Showcase products for the home page and category filters. Service design
        templates are under Design Templates.
      </p>
      <div className="mt-8">
        <GalleryManager initial={products} />
      </div>
    </div>
  );
}
