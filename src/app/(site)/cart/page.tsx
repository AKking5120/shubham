"use client";

import Link from "next/link";
import { DELHI_DELIVERY_FEE_INR } from "@/lib/constants";
import { lineTotal } from "@/lib/cart-types";
import { useCart } from "@/components/cart/CartProvider";

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const total = subtotal + (items.length > 0 ? DELHI_DELIVERY_FEE_INR : 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">Your cart</h1>

      {items.length === 0 ? (
        <p className="mt-6 text-slate-600">
          No items yet.{" "}
          <Link href="/services" className="text-brand-blue font-semibold">
            Order printing services
          </Link>
        </p>
      ) : (
        <>
          <ul className="mt-6 space-y-4">
            {items.map((item) => (
              <li
                key={item.cartId}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  {item.options && (
                    <p className="text-xs text-slate-500 mt-1 whitespace-pre-wrap">
                      {item.options}
                    </p>
                  )}
                  {item.fileUrl && (
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-brand-blue hover:underline mt-1 inline-block"
                    >
                      View uploaded artwork
                    </a>
                  )}
                  <p className="text-sm text-slate-600 mt-1">
                    ₹{item.unitPrice} each (estimate)
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    max={9999}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.cartId, Number(e.target.value) || 1)
                    }
                    className="w-20 rounded-lg border border-slate-200 px-2 py-1 text-sm"
                  />
                  <span className="font-bold text-slate-900 min-w-[4rem] text-right">
                    ₹{lineTotal(item)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.cartId)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>Delhi delivery</span>
              <span>₹{DELHI_DELIVERY_FEE_INR}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-slate-200">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <Link
              href="/checkout"
              className="mt-4 block w-full text-center rounded-xl bg-brand-blue py-3 text-sm font-bold text-white hover:bg-indigo-900"
            >
              Proceed to checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
