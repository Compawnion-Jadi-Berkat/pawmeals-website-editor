"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "@/components/cart/CartProvider";
import Link from "next/link";

type PaymentMethod = "xendit" | "stripe";

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const { cart } = useCart();
  const cartTotal = cart?.cost?.totalAmount?.amount ?? "0";
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("xendit");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const endpoint =
        paymentMethod === "xendit"
          ? `${backendUrl}/api/payments/xendit/create`
          : `${backendUrl}/api/payments/stripe/create`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: cart?.lines.edges.map((e) => ({
            variantId: e.node.merchandise.id,
            title: e.node.merchandise.product.title,
            quantity: e.node.quantity,
            price: e.node.merchandise.price.amount,
          })),
          total: cartTotal,
          currency: "IDR",
        }),
      });

      const data = await res.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else if (data.clientSecret) {
        // Stripe — redirect to Stripe-hosted checkout
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAF7] py-12">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left — Form */}
        <div>
          <Link href="/" className="text-sm text-[#4A7C59] mb-6 inline-block hover:underline">
            ← Back to cart
          </Link>
          <h1 className="text-2xl font-bold text-[#1A1A1A] mb-8">Checkout</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Contact */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">Contact</h2>
              <div className="grid grid-cols-1 gap-3">
                <input required placeholder="Full name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
                <input required type="email" placeholder="Email address" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
                <input required placeholder="Phone number (+62...)" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
              </div>
            </section>

            {/* Shipping */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-3">
                <input required placeholder="Street address" value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="City" value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
                  <input required placeholder="Province" value={form.province}
                    onChange={(e) => setForm({ ...form, province: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
                </div>
                <input required placeholder="Postal code" value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">Payment Method</h2>
              <div className="grid grid-cols-2 gap-3">
                <button type="button"
                  onClick={() => setPaymentMethod("xendit")}
                  className={`border-2 rounded-xl p-4 text-left transition-all ${paymentMethod === "xendit" ? "border-[#4A7C59] bg-[#4A7C59]/5" : "border-gray-200"}`}>
                  <div className="font-semibold text-sm text-[#1A1A1A]">🇮🇩 Xendit</div>
                  <div className="text-xs text-gray-500 mt-1">Transfer bank, QRIS, e-wallet (OVO, GoPay, Dana)</div>
                </button>
                <button type="button"
                  onClick={() => setPaymentMethod("stripe")}
                  className={`border-2 rounded-xl p-4 text-left transition-all ${paymentMethod === "stripe" ? "border-[#4A7C59] bg-[#4A7C59]/5" : "border-gray-200"}`}>
                  <div className="font-semibold text-sm text-[#1A1A1A]">💳 Stripe</div>
                  <div className="text-xs text-gray-500 mt-1">Credit / debit card (Visa, Mastercard)</div>
                </button>
              </div>
            </section>

            <button type="submit" disabled={loading}
              className="w-full bg-[#4A7C59] hover:bg-[#3d6b4a] text-white font-semibold py-4 rounded-xl transition-colors disabled:opacity-60">
              {loading ? "Processing..." : `Pay IDR ${Number(cartTotal || 0).toLocaleString("id-ID")}`}
            </button>
          </form>
        </div>

        {/* Right — Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-fit sticky top-8">
          <h2 className="font-semibold text-[#1A1A1A] mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {cart?.lines.edges.map((edge) => (
              <div key={edge.node.id} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {edge.node.merchandise.product.title} × {edge.node.quantity}
                </span>
                <span className="font-medium">
                  IDR {(Number(edge.node.merchandise.price.amount) * edge.node.quantity).toLocaleString("id-ID")}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-[#1A1A1A]">
            <span>Total</span>
            <span>IDR {Number(cartTotal || 0).toLocaleString("id-ID")}</span>
          </div>
          <p className="text-xs text-gray-400 mt-4">Free delivery for orders above IDR 300,000 within Jabodetabek.</p>
        </div>
      </div>
    </main>
  );
}
