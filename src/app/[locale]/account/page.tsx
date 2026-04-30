"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type Tab = "overview" | "orders" | "subscriptions" | "profile";

interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  totalPrice: string;
  status: string;
  lineItems: { title: string; quantity: number; price: string }[];
}

interface Subscription {
  id: string;
  planName: string;
  petName: string;
  frequency: string;
  nextDelivery: string;
  status: "active" | "paused" | "cancelled";
  price: string;
}

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch from Shopify Customer API via backend proxy
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (tab === "orders") {
      setLoading(true);
      fetch(`${backendUrl}/api/users/orders`, { credentials: "include" })
        .then((r) => r.json())
        .then((d) => setOrders(d.orders || []))
        .finally(() => setLoading(false));
    }
    if (tab === "subscriptions") {
      setLoading(true);
      fetch(`${backendUrl}/api/users/subscriptions`, { credentials: "include" })
        .then((r) => r.json())
        .then((d) => setSubscriptions(d.subscriptions || []))
        .finally(() => setLoading(false));
    }
  }, [tab]);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "🏠" },
    { id: "orders", label: "My Orders", icon: "📦" },
    { id: "subscriptions", label: "Subscriptions", icon: "🔄" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <main className="min-h-screen bg-[#FAFAF7] py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A]">My Account</h1>
          <Link href="/" className="text-sm text-[#4A7C59] hover:underline">← Back to shop</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <nav className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-1">
              {tabs.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${tab === t.id ? "bg-[#4A7C59] text-white" : "text-gray-600 hover:bg-gray-50"}`}>
                  {t.icon} {t.label}
                </button>
              ))}
              <hr className="my-2" />
              <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
                🚪 Sign out
              </button>
            </div>
          </nav>

          {/* Content */}
          <div className="lg:col-span-3">
            {tab === "overview" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Total Orders", value: orders.length || "—", icon: "📦" },
                  { label: "Active Subscriptions", value: subscriptions.filter((s) => s.status === "active").length || "—", icon: "🔄" },
                  { label: "Loyalty Points", value: "1,240 pts", icon: "⭐" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {tab === "orders" && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-semibold text-[#1A1A1A] mb-4">Order History</h2>
                {loading ? (
                  <div className="text-center py-12 text-gray-400">Loading orders...</div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <div className="text-4xl mb-3">📦</div>
                    <p>No orders yet. <Link href="/products" className="text-[#4A7C59] underline">Shop now</Link></p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-100 rounded-xl p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-sm">Order #{order.orderNumber}</div>
                            <div className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString("id-ID")}</div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${order.status === "fulfilled" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">
                          {order.lineItems.map((item, i) => (
                            <span key={i}>{item.title} ×{item.quantity}{i < order.lineItems.length - 1 ? ", " : ""}</span>
                          ))}
                        </div>
                        <div className="mt-2 font-semibold text-sm text-[#1A1A1A]">IDR {Number(order.totalPrice).toLocaleString("id-ID")}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "subscriptions" && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-semibold text-[#1A1A1A] mb-4">My Subscriptions</h2>
                {loading ? (
                  <div className="text-center py-12 text-gray-400">Loading subscriptions...</div>
                ) : subscriptions.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <div className="text-4xl mb-3">🔄</div>
                    <p>No active subscriptions. <Link href="/subscribe" className="text-[#4A7C59] underline">Start a plan</Link></p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {subscriptions.map((sub) => (
                      <div key={sub.id} className="border border-gray-100 rounded-xl p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-sm">{sub.planName}</div>
                            <div className="text-xs text-gray-400 mt-1">For {sub.petName} · {sub.frequency}</div>
                            <div className="text-xs text-gray-400 mt-1">Next delivery: {sub.nextDelivery}</div>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${sub.status === "active" ? "bg-green-100 text-green-700" : sub.status === "paused" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                              {sub.status}
                            </span>
                            <div className="text-sm font-semibold text-[#1A1A1A] mt-2">{sub.price}</div>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
                            {sub.status === "active" ? "Pause" : "Resume"}
                          </button>
                          <button className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
                            Skip next
                          </button>
                          <button className="text-xs border border-red-200 text-red-500 rounded-lg px-3 py-1.5 hover:bg-red-50 transition-colors">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "profile" && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-semibold text-[#1A1A1A] mb-4">Profile Settings</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">First name</label>
                      <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Last name</label>
                      <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Email</label>
                    <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Phone</label>
                    <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C59]" />
                  </div>
                  <button type="submit" className="bg-[#4A7C59] text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-[#3d6b4a] transition-colors">
                    Save changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
