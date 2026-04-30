import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCw, Truck, Percent, Settings, CheckCircle2, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === "id"
        ? "Langganan Pawmeals — Hemat 15% Setiap Bulan | Pawmeals"
        : "Pawmeals Subscription — Save 15% Every Month | Pawmeals",
    description:
      locale === "id"
        ? "Langganan Pawmeals dan hemat 15% setiap pengiriman. Atur jadwal, ubah produk, atau batalkan kapan saja. Gratis ongkir untuk pelanggan aktif."
        : "Subscribe to Pawmeals and save 15% on every delivery. Set your schedule, change products, or cancel anytime. Free shipping for active subscribers.",
    alternates: {
      canonical: `/${locale}/subscribe`,
      languages: { "id-ID": "/id/subscribe", "en-US": "/en/subscribe" },
    },
  };
}

export default async function SubscribePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const perks = [
    {
      icon: <Percent className="w-6 h-6" />,
      title: locale === "id" ? "Hemat 15%" : "Save 15%",
      desc: locale === "id" ? "Diskon otomatis di setiap pengiriman langganan" : "Automatic discount on every subscription delivery",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: locale === "id" ? "Gratis Ongkir" : "Free Shipping",
      desc: locale === "id" ? "Pengiriman gratis untuk semua pelanggan aktif" : "Free delivery for all active subscribers",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: locale === "id" ? "Fleksibel Penuh" : "Fully Flexible",
      desc: locale === "id" ? "Ubah produk, jeda, atau batalkan kapan saja" : "Change products, pause, or cancel anytime",
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: locale === "id" ? "Pengiriman Otomatis" : "Auto Delivery",
      desc: locale === "id" ? "Pilih jadwal 2 minggu atau 4 minggu sekali" : "Choose 2-week or 4-week delivery schedule",
    },
  ];

  const steps = [
    {
      num: "01",
      title: locale === "id" ? "Pilih Produk" : "Choose Products",
      desc: locale === "id" ? "Pilih produk yang sesuai dengan kebutuhan hewan peliharaanmu" : "Select products that match your pet's needs",
    },
    {
      num: "02",
      title: locale === "id" ? "Atur Jadwal" : "Set Schedule",
      desc: locale === "id" ? "Pilih frekuensi pengiriman 2 atau 4 minggu sekali" : "Choose 2-week or 4-week delivery frequency",
    },
    {
      num: "03",
      title: locale === "id" ? "Nikmati & Hemat" : "Enjoy & Save",
      desc: locale === "id" ? "Terima pengiriman otomatis dengan diskon 15% setiap kali" : "Receive automatic deliveries with 15% off every time",
    },
  ];

  const frequencies = [
    {
      value: "2weeks",
      label: locale === "id" ? "Setiap 2 Minggu" : "Every 2 Weeks",
      badge: locale === "id" ? "Paling Populer" : "Most Popular",
      highlight: true,
    },
    {
      value: "4weeks",
      label: locale === "id" ? "Setiap 4 Minggu" : "Every 4 Weeks",
      badge: null,
      highlight: false,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-pm-caramel to-pm-caramel-dark text-white section-padding">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white font-bold text-body-sm px-4 py-2 rounded-pill mb-6">
            <RefreshCw className="w-4 h-4" />
            {locale === "id" ? "Langganan & Hemat" : "Subscribe & Save"}
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
            {locale === "id"
              ? "Makanan Segar Otomatis, Hemat 15% Setiap Bulan"
              : "Automatic Fresh Food, Save 15% Every Month"}
          </h1>
          <p className="text-white/80 text-body-lg mb-8 max-w-2xl mx-auto">
            {locale === "id"
              ? "Tidak perlu repot memesan setiap minggu. Atur sekali, dan Pawmeals akan hadir di depan pintu kamu secara otomatis — dengan harga lebih hemat."
              : "No need to order every week. Set it once, and Pawmeals will arrive at your door automatically — at a better price."}
          </p>
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 bg-white text-pm-caramel font-bold px-8 py-4 rounded-xl hover:bg-pm-cream transition-colors text-body-lg"
          >
            {locale === "id" ? "Mulai Langganan" : "Start Subscription"}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Perks */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((p) => (
              <div key={p.title} className="text-center p-6 rounded-2xl bg-pm-cream hover:shadow-warm-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-pm-caramel/10 text-pm-caramel flex items-center justify-center mx-auto mb-4">
                  {p.icon}
                </div>
                <h3 className="font-heading font-bold text-pm-brown mb-1">{p.title}</h3>
                <p className="text-pm-brown/60 text-body-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-pm-cream">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-pm-brown">
              {locale === "id" ? "Cara Kerja Langganan" : "How Subscription Works"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-16 h-16 rounded-full bg-pm-caramel text-white font-heading text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-heading font-bold text-pm-brown mb-2">{step.title}</h3>
                <p className="text-pm-brown/70 text-body-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequency Selector */}
      <section className="section-padding bg-white">
        <div className="container max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold text-pm-brown mb-8">
            {locale === "id" ? "Pilih Frekuensi Pengiriman" : "Choose Delivery Frequency"}
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {frequencies.map((f) => (
              <div
                key={f.value}
                className={`relative rounded-2xl border-2 p-6 cursor-pointer transition-all ${
                  f.highlight
                    ? "border-pm-caramel bg-pm-caramel/5"
                    : "border-pm-sand/60 hover:border-pm-caramel/40"
                }`}
              >
                {f.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pm-caramel text-white text-body-xs font-bold px-3 py-1 rounded-pill whitespace-nowrap">
                    {f.badge}
                  </div>
                )}
                <div className={`font-heading font-bold text-lg mb-1 ${f.highlight ? "text-pm-caramel" : "text-pm-brown"}`}>
                  {f.label}
                </div>
                <div className="text-pm-brown/60 text-body-sm">
                  {locale === "id" ? "Hemat 15%" : "Save 15%"}
                </div>
                {f.highlight && (
                  <CheckCircle2 className="w-5 h-5 text-pm-caramel absolute top-4 right-4" />
                )}
              </div>
            ))}
          </div>
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 bg-pm-caramel text-white font-bold px-8 py-4 rounded-xl hover:bg-pm-caramel-dark transition-colors"
          >
            {locale === "id" ? "Pilih Produk Sekarang" : "Choose Products Now"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
