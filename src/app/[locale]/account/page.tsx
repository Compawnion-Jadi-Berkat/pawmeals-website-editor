"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Package, RefreshCw, Star, Home, User, LogOut } from "lucide-react";

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

const TABS: { id: Tab; label: string; Icon: React.FC<{ className?: string }> }[] = [
  { id: "overview",      label: "Overview",       Icon: Home },
  { id: "orders",        label: "My Orders",      Icon: Package },
  { id: "subscriptions", label: "Subscriptions",  Icon: RefreshCw },
  { id: "profile",       label: "Profile",        Icon: User },
];

export default function AccountPage() {
  const [tab, setTab]                   = useState<Tab>("overview");
  const [orders, setOrders]             = useState<Order[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading]           = useState(false);
  const [fetchError, setFetchError]     = useState<string | null>(null);

  const fetchData = useCallback(async (activeTab: Tab) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) return; // Backend not configured yet — show empty state

    if (activeTab !== "orders" && activeTab !== "subscriptions") return;

    setLoading(true);
    setFetchError(null);
    try {
      const endpoint =
        activeTab === "orders"
          ? `${backendUrl}/api/users/orders`
          : `${backendUrl}/api/users/subscriptions`;
      const res = await fetch(endpoint, { credentials: "include" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (activeTab === "orders")        setOrders(data.orders ?? []);
      if (activeTab === "subscriptions") setSubscriptions(data.subscriptions ?? []);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setFetchError(`Failed to load ${activeTab}: ${msg}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(tab);
  }, [tab, fetchData]);

  return (
    <main className="min-h-screen bg-pm-cream py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-pm-brown">My Account</h1>
          <Link href="/" className="text-sm text-pm-sage hover:underline">← Back to shop</Link>
        </div>

        {fetchError && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {fetchError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <nav className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-pm-sand/40 p-4 space-y-1">
              {TABS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    tab === id
                      ? "bg-pm-sage text-white"
                      : "text-pm-brown/70 hover:bg-pm-sand/30"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </button>
              ))}
              <hr className="my-2 border-pm-sand/40" />
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
                <LogOut className="w-4 h-4 flex-shrink-0" />
                Sign out
              </button>
            </div>
          </nav>

          {/* Content */}
          <div className="lg:col-span-3">
            {tab === "overview" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Total Orders",         value: orders.length || "—",                                              Icon: Package },
                  { label: "Active Subscriptions", value: subscriptions.filter((s) => s.status === "active").length || "—", Icon: RefreshCw },
                  { label: "Loyalty Points",        value: "1,240 pts",                                                      Icon: Star },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl border border-pm-sand/40 p-6">
                    <stat.Icon className="w-6 h-6 text-pm-caramel mb-2" />
                    <div className="text-2xl font-bold text-pm-brown">{stat.value}</div>
                    <div className="text-sm text-pm-brown/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {tab === "orders" && (
              <div className="bg-white rounded-2xl border border-pm-sand/40 p-6">
                <h2 className="font-semibold text-pm-brown mb-4">Order History</h2>
                {loading ? (
                  <div className="text-center py-12 text-pm-brown/40">Loading orders…</div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 text-pm-brown/40">
                    <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p>No orders yet.{" "}
                      <Link href="/products" className="text-pm-sage underline">Shop now</Link>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-pm-sand/40 rounded-xl p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-sm text-pm-brown">Order #{order.orderNumber}</div>
                            <div className="text-xs text-pm-brown/40 mt-1">
                              {new Date(order.createdAt).toLocaleDateString("id-ID")}
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            order.status === "fulfilled"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="mt-3 text-sm text-pm-brown/60">
                          {order.lineItems.map((item, i) => (
                            <span key={i}>
                              {item.title} ×{item.quantity}
                              {i < order.lineItems.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                        <div className="mt-2 font-semibold text-sm text-pm-brown">
                          IDR {Number(order.totalPrice).toLocaleString("id-ID")}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "subscriptions" && (
              <div className="bg-white rounded-2xl border border-pm-sand/40 p-6">
                <h2 className="font-semibold text-pm-brown mb-4">My Subscriptions</h2>
                {loading ? (
                  <div className="text-center py-12 text-pm-brown/40">Loading subscriptions…</div>
                ) : subscriptions.length === 0 ? (
                  <div className="text-center py-12 text-pm-brown/40">
                    <RefreshCw className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p>No active subscriptions.{" "}
                      <Link href="/subscribe" className="text-pm-sage underline">Start a plan</Link>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {subscriptions.map((sub) => (
                      <div key={sub.id} className="border border-pm-sand/40 rounded-xl p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-sm text-pm-brown">{sub.planName}</div>
                            <div className="text-xs text-pm-brown/40 mt-1">
                              For {sub.petName} · {sub.frequency}
                            </div>
                            <div className="text-xs text-pm-brown/40 mt-1">
                              Next delivery: {sub.nextDelivery}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              sub.status === "active"
                                ? "bg-green-100 text-green-700"
                                : sub.status === "paused"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}>
                              {sub.status}
                            </span>
                            <div className="text-sm font-semibold text-pm-brown mt-2">{sub.price}</div>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button className="text-xs border border-pm-sand/60 rounded-lg px-3 py-1.5 hover:bg-pm-sand/20 transition-colors text-pm-brown">
                            {sub.status === "active" ? "Pause" : "Resume"}
                          </button>
                          <button className="text-xs border border-pm-sand/60 rounded-lg px-3 py-1.5 hover:bg-pm-sand/20 transition-colors text-pm-brown">
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
              <div className="bg-white rounded-2xl border border-pm-sand/40 p-6">
                <h2 className="font-semibold text-pm-brown mb-4">Profile Settings</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-pm-brown/50 mb-1 block">First name</label>
                      <input className="w-full border border-pm-sand/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pm-sage text-pm-brown" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-pm-brown/50 mb-1 block">Last name</label>
                      <input className="w-full border border-pm-sand/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pm-sage text-pm-brown" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-pm-brown/50 mb-1 block">Email</label>
                    <input type="email" className="w-full border border-pm-sand/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pm-sage text-pm-brown" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-pm-brown/50 mb-1 block">Phone</label>
                    <input className="w-full border border-pm-sand/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pm-sage text-pm-brown" />
                  </div>
                  <button
                    type="submit"
                    className="bg-pm-sage text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-pm-sage/90 transition-colors"
                  >
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
