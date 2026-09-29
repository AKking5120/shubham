import { OrdersTable } from "@/components/admin/OrdersTable";

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0a1628]">Online orders</h1>
      <p className="mt-1 text-sm text-slate-600">
        Cart checkout — COD and online (Razorpay when enabled). Delhi delivery
        only.
      </p>
      <div className="mt-8">
        <OrdersTable />
      </div>
    </div>
  );
}
