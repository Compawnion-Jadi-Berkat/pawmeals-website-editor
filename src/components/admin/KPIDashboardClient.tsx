"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  Eye,
  RefreshCw,
  DollarSign,
  BarChart3,
  Target,
  Repeat,
  UserPlus,
} from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

interface KPIMetric {
  id: string;
  label: string;
  labelId: string;
  value: string;
  change: number; // percentage change vs last period
  target?: string;
  icon: React.ReactNode;
  color: string;
  status: "on-track" | "at-risk" | "off-track";
}

interface KPIDashboardClientProps {
  locale: Locale;
}

export function KPIDashboardClient({ locale }: KPIDashboardClientProps) {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");
  const [metrics, setMetrics] = useState<KPIMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const t = {
    title: locale === "id" ? "Dashboard KPI Pawmeals" : "Pawmeals KPI Dashboard",
    subtitle: locale === "id" ? "Ringkasan performa bisnis real-time" : "Real-time business performance summary",
    period7d: locale === "id" ? "7 Hari" : "7 Days",
    period30d: locale === "id" ? "30 Hari" : "30 Days",
    period90d: locale === "id" ? "90 Hari" : "90 Days",
    vsLastPeriod: locale === "id" ? "vs periode sebelumnya" : "vs last period",
    target: locale === "id" ? "Target" : "Target",
    lastUpdated: locale === "id" ? "Diperbarui" : "Updated",
    onTrack: locale === "id" ? "Sesuai Target" : "On Track",
    atRisk: locale === "id" ? "Perlu Perhatian" : "At Risk",
    offTrack: locale === "id" ? "Di Bawah Target" : "Off Track",
    loading: locale === "id" ? "Memuat data..." : "Loading data...",
  };

  useEffect(() => {
    async function fetchKPIs() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/kpi?period=${period}`);
        if (res.ok) {
          const data = await res.json();
          setMetrics(buildMetrics(data, locale));
        } else {
          // Use placeholder data when API is not yet connected
          setMetrics(buildPlaceholderMetrics(locale));
        }
      } catch {
        setMetrics(buildPlaceholderMetrics(locale));
      } finally {
        setIsLoading(false);
        setLastUpdated(new Date());
      }
    }
    fetchKPIs();
  }, [period, locale]);

  return (
    <div className="min-h-screen bg-pm-cream">
      {/* Header */}
      <div className="bg-pm-brown text-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold">{t.title}</h1>
              <p className="text-white/60 text-body-sm mt-1">{t.subtitle}</p>
              {lastUpdated && (
                <p className="text-white/40 text-body-xs mt-1">
                  {t.lastUpdated}: {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>
            {/* Period Selector */}
            <div className="flex gap-2 bg-white/10 rounded-xl p-1">
              {(["7d", "30d", "90d"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-2 rounded-lg text-body-sm font-semibold transition-all ${
                    period === p
                      ? "bg-white text-pm-brown"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {p === "7d" ? t.period7d : p === "30d" ? t.period30d : t.period90d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 animate-pulse">
                <div className="h-4 bg-pm-sand/50 rounded mb-3 w-2/3" />
                <div className="h-8 bg-pm-sand/50 rounded mb-2 w-1/2" />
                <div className="h-3 bg-pm-sand/30 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <KPICard key={metric.id} metric={metric} t={t} />
            ))}
          </div>
        )}

        {/* Status Summary */}
        {!isLoading && metrics.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-4">
            {(["on-track", "at-risk", "off-track"] as const).map((status) => {
              const count = metrics.filter((m) => m.status === status).length;
              const label = status === "on-track" ? t.onTrack : status === "at-risk" ? t.atRisk : t.offTrack;
              const color = status === "on-track" ? "text-pm-sage-dark bg-pm-sage/10" : status === "at-risk" ? "text-amber-700 bg-amber-50" : "text-red-700 bg-red-50";
              return (
                <div key={status} className={`rounded-2xl p-4 text-center ${color}`}>
                  <div className="font-heading text-3xl font-bold">{count}</div>
                  <div className="text-body-sm font-semibold mt-1">{label}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function KPICard({ metric, t }: { metric: KPIMetric; t: Record<string, string> }) {
  const isPositive = metric.change >= 0;
  const statusColor =
    metric.status === "on-track"
      ? "border-pm-sage/30 bg-pm-sage/5"
      : metric.status === "at-risk"
      ? "border-amber-200 bg-amber-50/50"
      : "border-red-200 bg-red-50/50";

  return (
    <div className={`bg-white rounded-2xl p-5 border-2 ${statusColor} hover:shadow-warm-md transition-shadow`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${metric.color} flex items-center justify-center`}>
          {metric.icon}
        </div>
        <div
          className={`flex items-center gap-1 text-body-xs font-semibold px-2 py-1 rounded-pill ${
            isPositive ? "bg-pm-sage/10 text-pm-sage-dark" : "bg-red-50 text-red-600"
          }`}
        >
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(metric.change)}%
        </div>
      </div>
      <div className="font-heading text-2xl font-bold text-pm-brown mb-1">{metric.value}</div>
      <div className="text-pm-brown/60 text-body-xs mb-2">{metric.label}</div>
      {metric.target && (
        <div className="text-pm-brown/40 text-body-xs">
          {t.target}: {metric.target}
        </div>
      )}
      <div className="text-pm-brown/30 text-body-xs mt-1">{t.vsLastPeriod}</div>
    </div>
  );
}

// ─── Placeholder data (shown before API is connected) ─────────────────────────
function buildPlaceholderMetrics(locale: Locale): KPIMetric[] {
  return [
    {
      id: "monthly_sales",
      label: locale === "id" ? "Total Penjualan Bulanan" : "Monthly Sales",
      labelId: "monthly_sales",
      value: "Rp 248.5M",
      change: 12.3,
      target: "Rp 300M",
      icon: <DollarSign className="w-5 h-5 text-pm-caramel" />,
      color: "bg-pm-caramel/10",
      status: "at-risk",
    },
    {
      id: "conversion_rate",
      label: locale === "id" ? "Tingkat Konversi" : "Conversion Rate",
      labelId: "conversion_rate",
      value: "3.2%",
      change: 0.4,
      target: "4.0%",
      icon: <Target className="w-5 h-5 text-pm-sage" />,
      color: "bg-pm-sage/10",
      status: "at-risk",
    },
    {
      id: "new_customers",
      label: locale === "id" ? "Pelanggan Baru" : "New Customers",
      labelId: "new_customers",
      value: "1,247",
      change: 8.1,
      target: "1,500",
      icon: <UserPlus className="w-5 h-5 text-blue-500" />,
      color: "bg-blue-50",
      status: "at-risk",
    },
    {
      id: "retained_customers",
      label: locale === "id" ? "Pelanggan Kembali" : "Retained Customers",
      labelId: "retained_customers",
      value: "3,891",
      change: 15.2,
      target: "3,500",
      icon: <Repeat className="w-5 h-5 text-purple-500" />,
      color: "bg-purple-50",
      status: "on-track",
    },
    {
      id: "shop_visitors",
      label: locale === "id" ? "Pengunjung Toko" : "Shop Visitors",
      labelId: "shop_visitors",
      value: "38,420",
      change: -2.1,
      target: "50,000",
      icon: <Eye className="w-5 h-5 text-pm-brown" />,
      color: "bg-pm-sand/30",
      status: "off-track",
    },
    {
      id: "product_views",
      label: locale === "id" ? "Tampilan Produk" : "Product Views",
      labelId: "product_views",
      value: "124,800",
      change: 5.7,
      target: "150,000",
      icon: <BarChart3 className="w-5 h-5 text-indigo-500" />,
      color: "bg-indigo-50",
      status: "at-risk",
    },
    {
      id: "add_to_cart",
      label: locale === "id" ? "Tambah ke Keranjang" : "Add to Cart",
      labelId: "add_to_cart",
      value: "8,934",
      change: 3.2,
      target: "10,000",
      icon: <ShoppingCart className="w-5 h-5 text-orange-500" />,
      color: "bg-orange-50",
      status: "at-risk",
    },
    {
      id: "purchases",
      label: locale === "id" ? "Total Transaksi" : "Total Purchases",
      labelId: "purchases",
      value: "1,228",
      change: 9.4,
      target: "1,500",
      icon: <ShoppingCart className="w-5 h-5 text-pm-caramel" />,
      color: "bg-pm-caramel/10",
      status: "at-risk",
    },
    {
      id: "avg_basket",
      label: locale === "id" ? "Rata-rata Nilai Keranjang" : "Average Basket Size",
      labelId: "avg_basket",
      value: "Rp 202,400",
      change: 2.8,
      target: "Rp 200,000",
      icon: <DollarSign className="w-5 h-5 text-pm-sage" />,
      color: "bg-pm-sage/10",
      status: "on-track",
    },
    {
      id: "retention_rate",
      label: locale === "id" ? "Tingkat Retensi" : "Retention Rate",
      labelId: "retention_rate",
      value: "67.8%",
      change: 4.1,
      target: "70%",
      icon: <Users className="w-5 h-5 text-teal-500" />,
      color: "bg-teal-50",
      status: "at-risk",
    },
    {
      id: "roas",
      label: locale === "id" ? "ROAS (Return on Ad Spend)" : "ROAS",
      labelId: "roas",
      value: "4.79x",
      change: 18.2,
      target: "3.0x",
      icon: <TrendingUp className="w-5 h-5 text-pm-sage" />,
      color: "bg-pm-sage/10",
      status: "on-track",
    },
  ];
}

// NOTE: Replace Record<string, unknown> with a typed API response interface
// once the real KPI API endpoint is connected.
function buildMetrics(data: Record<string, unknown> | null, locale: Locale): KPIMetric[] {
  if (!data || Object.keys(data).length === 0) {
    return buildPlaceholderMetrics(locale);
  }
  return buildPlaceholderMetrics(locale); // TODO: map real API fields here
}
