"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DELHI_DELIVERY_FEE_INR } from "@/lib/constants";
import { lineTotal } from "@/lib/cart-types";
import { useCart } from "@/components/cart/CartProvider";
import { loadRazorpayScript } from "@/lib/razorpay-checkout";
import { isRazorpayPublicReady } from "@/lib/razorpay";

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "razorpay">("cod");

  const razorpayReady = isRazorpayPublicReady();
  const total = subtotal + DELHI_DELIVERY_FEE_INR;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const form = new FormData(e.currentTarget);
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.get("customerName"),
          phone: form.get("phone"),
          email: form.get("email"),
          addressLine1: form.get("addressLine1"),
          addressLine2: form.get("addressLine2"),
          city: form.get("city"),
          pincode: form.get("pincode"),
          notes: form.get("notes"),
          paymentMethod,
          items,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not place order.");
        return;
      }

      if (paymentMethod === "razorpay" && data.razorpayCheckout) {
        const checkout = data.razorpayCheckout as {
          keyId: string;
          amount: number;
          currency: string;
          razorpayOrderId: string;
          internalOrderId: string;
          orderNumber: string;
        };

        const loaded = await loadRazorpayScript();
        if (!loaded || !window.Razorpay) {
          setError("Could not load payment gateway. Try COD or refresh.");
          return;
        }

        const customerName = String(form.get("customerName") ?? "");
        const phone = String(form.get("phone") ?? "");
        const email = String(form.get("email") ?? "");

        await new Promise<void>((resolve, reject) => {
          const rzp = new window.Razorpay!({
            key: checkout.keyId,
            amount: checkout.amount,
            currency: checkout.currency,
            name: "Print Services",
            description: `Order ${checkout.orderNumber}`,
            order_id: checkout.razorpayOrderId,
            prefill: {
              name: customerName,
              email,
              contact: phone,
            },
            theme: { color: "#1e3a8a" },
            handler: async (response) => {
              try {
                const verifyRes = await fetch("/api/orders/razorpay/verify", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    internalOrderId: checkout.internalOrderId,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                  }),
                });
                const verifyData = await verifyRes.json();
                if (!verifyRes.ok) {
                  reject(new Error(verifyData.error ?? "Payment failed."));
                  return;
                }
                clearCart();
                router.push(
                  `/order/success?no=${encodeURIComponent(checkout.orderNumber)}`,
                );
                resolve();
              } catch {
                reject(new Error("Payment verification failed."));
              }
            },
            modal: {
              ondismiss: () => {
                reject(new Error("Payment cancelled."));
              },
            },
          });
          rzp.open();
        });
        return;
      }

      clearCart();
      router.push(
        `/order/success?no=${encodeURIComponent(data.order.orderNumber)}`,
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Network error. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">Your cart is empty.</p>
        <Link
          href="/services"
          className="mt-4 inline-block text-brand-blue font-semibold hover:underline"
        >
          Browse services
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-8 lg:grid-cols-[1fr_340px]"
    >
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">Delivery details</h2>
        <p className="text-sm text-slate-600">
          Online orders are delivered within <strong>Delhi (110xxx)</strong> only.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium sm:col-span-2">
            Full name *
            <input
              name="customerName"
              required
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium">
            Phone *
            <input
              name="phone"
              required
              inputMode="tel"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium">
            Email
            <input
              name="email"
              type="email"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium sm:col-span-2">
            Address line 1 *
            <input
              name="addressLine1"
              required
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium sm:col-span-2">
            Address line 2
            <input
              name="addressLine2"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium">
            City
            <input
              name="city"
              defaultValue="New Delhi"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium">
            Pincode *
            <input
              name="pincode"
              required
              pattern="110\d{3}"
              title="Delhi pincode (110xxx)"
              placeholder="110044"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium sm:col-span-2">
            Order notes
            <textarea
              name="notes"
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <h3 className="text-sm font-bold text-slate-900">Payment</h3>
          <div className="mt-2 space-y-2">
            <label className="flex cursor-pointer items-start gap-2 rounded-xl border border-slate-200 p-3 has-[:checked]:border-brand-blue has-[:checked]:bg-blue-50/50">
              <input
                type="radio"
                name="pay"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="mt-1"
              />
              <span>
                <span className="font-semibold text-slate-900">
                  Cash on Delivery (COD)
                </span>
                <span className="block text-xs text-slate-600">
                  Pay when your order is delivered in Delhi.
                </span>
              </span>
            </label>
            <label
              className={`flex items-start gap-2 rounded-xl border border-slate-200 p-3 ${
                razorpayReady
                  ? "cursor-pointer has-[:checked]:border-brand-blue"
                  : "opacity-60"
              }`}
            >
              <input
                type="radio"
                name="pay"
                disabled={!razorpayReady}
                checked={paymentMethod === "razorpay"}
                onChange={() => setPaymentMethod("razorpay")}
                className="mt-1"
              />
              <span>
                <span className="font-semibold text-slate-900">
                  Pay online (Razorpay)
                </span>
                <span className="block text-xs text-slate-600">
                  {razorpayReady
                    ? "UPI, cards & netbanking (test mode)."
                    : "Add Razorpay keys in Vercel env, redeploy, or use COD."}
                </span>
              </span>
            </label>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-blue py-3 text-sm font-bold text-white hover:bg-indigo-900 disabled:opacity-60"
        >
          {loading ? "Placing order…" : "Place order"}
        </button>
      </div>

      <aside className="rounded-2xl border border-slate-200 bg-white p-6 h-fit">
        <h2 className="font-bold text-slate-900">Order summary</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((item) => (
            <li key={item.cartId} className="flex justify-between gap-2">
              <span className="text-slate-700">
                {item.title} × {item.quantity}
              </span>
              <span className="font-medium">₹{lineTotal(item)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-1 border-t border-slate-100 pt-4 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>₹{subtotal}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Delhi delivery</dt>
            <dd>₹{DELHI_DELIVERY_FEE_INR}</dd>
          </div>
          <div className="flex justify-between text-base font-bold text-slate-900 pt-2">
            <dt>Total</dt>
            <dd>₹{total}</dd>
          </div>
        </dl>
      </aside>
    </form>
  );
}
