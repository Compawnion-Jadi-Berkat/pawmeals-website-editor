import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === "id"
        ? "Pawmeals Catering — Layanan Katering Hewan Peliharaan | Pawmeals"
        : "Pawmeals Catering — Pet Catering Service | Pawmeals",
    description:
      locale === "id"
        ? "Layanan katering makanan segar untuk hewan peliharaan. Disiapkan khusus sesuai kebutuhan nutrisi individual anjing dan kucing kamu."
        : "Fresh food catering service for pets. Specially prepared to meet the individual nutritional needs of your dog and cat.",
    alternates: {
      canonical: `/${locale}/catering`,
      languages: { "id-ID": "/id/catering", "en-US": "/en/catering" },
    },
  };
}

export default async function CateringPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const packages = [
    {
      name: locale === "id" ? "Paket Starter" : "Starter Pack",
      duration: locale === "id" ? "7 hari" : "7 days",
      price: "Rp 490.000",
      features: [
        locale === "id" ? "Konsultasi nutrisi awal" : "Initial nutrition consultation",
        locale === "id" ? "7 porsi makanan segar" : "7 fresh meal portions",
        locale === "id" ? "Panduan transisi makanan" : "Food transition guide",
        locale === "id" ? "WhatsApp support" : "WhatsApp support",
      ],
      highlight: false,
    },
    {
      name: locale === "id" ? "Paket Bulanan" : "Monthly Pack",
      duration: locale === "id" ? "30 hari" : "30 days",
      price: "Rp 1.800.000",
      features: [
        locale === "id" ? "Semua fitur Starter" : "All Starter features",
        locale === "id" ? "30 porsi makanan segar" : "30 fresh meal portions",
        locale === "id" ? "Pengiriman 2x seminggu" : "Delivery 2x per week",
        locale === "id" ? "Laporan kesehatan bulanan" : "Monthly health report",
        locale === "id" ? "Konsultasi vet online" : "Online vet consultation",
      ],
      highlight: true,
    },
    {
      name: locale === "id" ? "Paket Premium" : "Premium Pack",
      duration: locale === "id" ? "30 hari" : "30 days",
      price: locale === "id" ? "Hubungi Kami" : "Contact Us",
      features: [
        locale === "id" ? "Semua fitur Bulanan" : "All Monthly features",
        locale === "id" ? "Resep custom eksklusif" : "Exclusive custom recipe",
        locale === "id" ? "Pengiriman harian" : "Daily delivery",
        locale === "id" ? "Dedicated nutritionist" : "Dedicated nutritionist",
        locale === "id" ? "Kunjungan vet ke rumah" : "Home vet visit",
      ],
      highlight: false,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-pm-brown to-pm-brown/90 text-white section-padding">
        <div className="container max-w-4xl text-center">
          <p className="text-pm-caramel font-bold text-label-md uppercase tracking-widest mb-4">
            {locale === "id" ? "Layanan Katering" : "Catering Service"}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
            {locale === "id"
              ? "Makanan Segar Setiap Hari, Disiapkan Khusus untuknya"
              : "Fresh Food Every Day, Specially Prepared for Them"}
          </h1>
          <p className="text-white/80 text-body-lg mb-8 max-w-2xl mx-auto">
            {locale === "id"
              ? "Layanan katering premium kami menyiapkan makanan segar setiap hari berdasarkan kebutuhan nutrisi spesifik hewan peliharaanmu — seperti memiliki chef pribadi untuk mereka."
              : "Our premium catering service prepares fresh food daily based on your pet's specific nutritional needs — like having a personal chef for them."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {locale === "id" ? "Chat WhatsApp" : "WhatsApp Chat"}
            </Link>
            <Link
              href={`/${locale}/quiz`}
              className="inline-flex items-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-pm-brown transition-colors"
            >
              {locale === "id" ? "Mulai Kuis Nutrisi" : "Start Nutrition Quiz"}
            </Link>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-padding bg-pm-cream">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-pm-brown">
              {locale === "id" ? "Pilih Paket Katering" : "Choose Your Catering Package"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl p-6 flex flex-col ${
                  pkg.highlight
                    ? "bg-pm-caramel text-white shadow-warm-lg scale-105"
                    : "bg-white border border-pm-sand/50"
                }`}
              >
                {pkg.highlight && (
                  <div className="inline-block bg-white/20 text-white text-body-xs font-bold px-3 py-1 rounded-pill mb-3 self-start">
                    {locale === "id" ? "Paling Populer" : "Most Popular"}
                  </div>
                )}
                <h3 className={`font-heading text-xl font-bold mb-1 ${pkg.highlight ? "text-white" : "text-pm-brown"}`}>
                  {pkg.name}
                </h3>
                <p className={`text-body-sm mb-4 ${pkg.highlight ? "text-white/80" : "text-pm-brown/60"}`}>
                  {pkg.duration}
                </p>
                <p className={`font-heading text-3xl font-bold mb-6 ${pkg.highlight ? "text-white" : "text-pm-caramel"}`}>
                  {pkg.price}
                </p>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-body-sm">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.highlight ? "text-white" : "text-pm-sage"}`} />
                      <span className={pkg.highlight ? "text-white/90" : "text-pm-brown/80"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center font-bold py-3 rounded-xl transition-colors ${
                    pkg.highlight
                      ? "bg-white text-pm-caramel hover:bg-pm-cream"
                      : "bg-pm-caramel text-white hover:bg-pm-caramel-dark"
                  }`}
                >
                  {locale === "id" ? "Pesan Sekarang" : "Order Now"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
