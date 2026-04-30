import type { Metadata } from "next";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
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
        ? "Tentang Kami — Cooked Food Specialist | Pawmeals"
        : "About Us — Cooked Food Specialist | Pawmeals",
    description:
      locale === "id"
        ? "Pawmeals adalah spesialis makanan masak alami untuk anjing dan kucing di Indonesia. Tanpa pengawet, direkomendasikan oleh lebih dari 220 klinik veteriner."
        : "Pawmeals is Indonesia's natural cooked food specialist for dogs and cats. No preservatives, recommended by over 220 veterinary clinics.",
    alternates: {
      canonical: `/${locale}/about`,
      languages: { "id-ID": "/id/about", "en-US": "/en/about" },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const milestones = [
    { year: "2019", event: locale === "id" ? "Pawmeals didirikan di Jakarta" : "Pawmeals founded in Jakarta" },
    { year: "2020", event: locale === "id" ? "Ekspansi ke 5 kota besar" : "Expanded to 5 major cities" },
    { year: "2022", event: locale === "id" ? "Bermitra dengan 100+ klinik veteriner" : "Partnered with 100+ vet clinics" },
    { year: "2024", event: locale === "id" ? "220+ klinik veteriner, #1 di Indonesia" : "220+ vet clinics, #1 in Indonesia" },
    { year: "2026", event: locale === "id" ? "Project Phoenix — ekspansi internasional" : "Project Phoenix — international expansion" },
  ];

  const values = [
    {
      icon: "🌿",
      title: locale === "id" ? "Alami & Segar" : "Natural & Fresh",
      desc: locale === "id"
        ? "Semua bahan dipilih dengan cermat — daging segar, sayuran organik, tanpa pengawet buatan."
        : "All ingredients carefully selected — fresh meat, organic vegetables, no artificial preservatives.",
    },
    {
      icon: "🔬",
      title: locale === "id" ? "Berbasis Ilmu" : "Science-Based",
      desc: locale === "id"
        ? "Setiap resep diformulasikan oleh ahli nutrisi hewan dan divalidasi oleh dokter hewan berpengalaman."
        : "Every recipe formulated by animal nutritionists and validated by experienced veterinarians.",
    },
    {
      icon: "❤️",
      title: locale === "id" ? "Dibuat dengan Cinta" : "Made with Love",
      desc: locale === "id"
        ? "Kami memasak setiap batch dengan standar dapur rumahan — karena hewan peliharaanmu layak mendapatkan yang terbaik."
        : "We cook every batch to home kitchen standards — because your pet deserves the best.",
    },
    {
      icon: "🌏",
      title: locale === "id" ? "Bertanggung Jawab" : "Responsible",
      desc: locale === "id"
        ? "Kemasan ramah lingkungan, sumber bahan lokal, dan mendukung komunitas peternak Indonesia."
        : "Eco-friendly packaging, local ingredient sourcing, and supporting Indonesian farming communities.",
    },
  ];

  return (
    <>
      <OrganizationSchema locale={locale} />

      {/* Hero */}
      <section className="bg-pm-brown text-white section-padding">
        <div className="container max-w-4xl text-center">
          <p className="text-pm-caramel font-bold text-label-md uppercase tracking-widest mb-4">
            {locale === "id" ? "Tentang Kami" : "About Us"}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
            {locale === "id"
              ? "Spesialis Makanan Masak untuk Hewan Peliharaan Indonesia"
              : "Indonesia's Cooked Food Specialist for Pets"}
          </h1>
          <p className="text-white/80 text-body-lg leading-relaxed">
            {locale === "id"
              ? "Sejak 2019, Pawmeals telah menjadi pilihan utama pemilik hewan peliharaan yang peduli dengan nutrisi dan kesehatan sahabat berbulu mereka. Kami percaya bahwa makanan yang baik adalah fondasi kesehatan yang baik."
              : "Since 2019, Pawmeals has been the top choice for pet owners who care about the nutrition and health of their furry companions. We believe good food is the foundation of good health."}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-pm-caramel text-white py-10">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { num: "#1", label: locale === "id" ? "Merek Makanan Masak Anjing" : "Cooked Dog Food Brand" },
              { num: "220+", label: locale === "id" ? "Klinik Veteriner Mitra" : "Partner Vet Clinics" },
              { num: "15K+", label: locale === "id" ? "Pelanggan Aktif" : "Active Customers" },
              { num: "4.9★", label: locale === "id" ? "Rating Rata-rata" : "Average Rating" },
            ].map((stat) => (
              <div key={stat.num}>
                <div className="font-heading text-3xl sm:text-4xl font-bold mb-1">{stat.num}</div>
                <div className="text-white/80 text-body-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-pm-brown">
              {locale === "id" ? "Nilai-nilai Kami" : "Our Values"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center p-6 rounded-2xl bg-pm-cream hover:shadow-warm-md transition-shadow">
                <div className="text-5xl mb-4">{v.icon}</div>
                <h3 className="font-heading font-bold text-pm-brown mb-2">{v.title}</h3>
                <p className="text-pm-brown/70 text-body-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-pm-cream">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-pm-brown">
              {locale === "id" ? "Perjalanan Kami" : "Our Journey"}
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-pm-sand/60" />
            <div className="space-y-8">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-6 items-start">
                  <div className="w-16 h-16 rounded-full bg-pm-caramel text-white flex items-center justify-center font-heading font-bold text-body-sm flex-shrink-0 relative z-10">
                    {m.year}
                  </div>
                  <div className="pt-4">
                    <p className="text-pm-brown font-semibold">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
