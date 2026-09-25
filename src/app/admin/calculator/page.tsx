import { PriceCalculatorManager } from "@/components/admin/PriceCalculatorManager";
import { getPriceCalculator } from "@/lib/store";

export default async function AdminCalculatorPage() {
  const config = await getPriceCalculator();

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-[#0a1628]">Quick Cost Calculator</h1>
      <p className="mt-1 text-sm text-slate-600">
        Edit rates shown on the Services page calculator. Changes apply after Save.
      </p>
      <div className="mt-8">
        <PriceCalculatorManager initial={config} />
      </div>
    </div>
  );
}
