import type { Metadata } from "next";
import Link from "next/link";
import { Shield, BookOpen, Users, Award, ArrowRight } from "lucide-react";
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
        ? "Vet Exclusive — Portal Dokter Hewan | Pawmeals"
        : "Vet Exclusive — Veterinarian Portal | Pawmeals",
    description:
      locale === "id"
        ? "Portal eksklusif untuk dokter hewan mitra Pawmeals. Akses materi edukasi, data klinis, dan program rekomendasi."
        : "Exclusive portal for Pawmeals partner veterinarians. Access educational materials, clinical data, and recommendation programs.",
    alternates: {
      canonical: `/${locale}/vet`,
      languages: { "id-ID": "/id/vet", "en-US": "/en/vet" },
    },
  };
}

export default async function VetPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const benefits = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: locale === "id" ? "Materi Edukasi Klinis" : "Clinical Education Materials",
      desc: locale === "id"
        ? "Akses penelitian nutrisi terbaru, studi kasus, dan panduan rekomendasi berbasis bukti ilmiah."
        : "Access the latest nutrition research, case studies, and evidence-based recommendation guidelines.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: locale === "id" ? "Program Mitra Klinik" : "Clinic Partner Program",
      desc: locale === "id"
        ? "Bergabung dengan 220+ klinik mitra. Dapatkan komisi rekomendasi, sampel gratis, dan dukungan edukasi klien."
        : "Join 220+ partner clinics. Earn recommendation commissions, free samples, and client education support.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: locale === "id" ? "Data Klinis & Keamanan" : "Clinical Data & Safety",
      desc: locale === "id"
        ? "Akses laporan keamanan produk, analisis nutrisi lengkap, dan data uji klinis untuk setiap produk Pawmeals."
        : "Access product safety reports, complete nutritional analysis, and clinical trial data for every Pawmeals product.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: locale === "id" ? "Sertifikasi & CPD" : "Certification & CPD",
      desc: locale === "id"
        ? "Ikuti webinar nutrisi hewan, dapatkan poin CPD, dan sertifikat keahlian nutrisi dari Pawmeals."
        : "Attend animal nutrition webinars, earn CPD points, and get nutrition expertise certificates from Pawmeals.",
    },
  ];

  const stats = [
    { num: "220+", label: locale === "id" ? "Klinik Mitra" : "Partner Clinics" },
    { num: "2,000+", label: locale === "id" ? "Rekomendasi/Bulan" : "Recommendations/Month" },
    { num: "98%", label: locale === "id" ? "Kepuasan Klien" : "Client Satisfaction" },
    { num: "15+", label: locale === "id" ? "Webinar/Tahun" : "Webinars/Year" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-pm-sage/20 to-pm-cream section-padding">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-pm-sage/20 text-pm-sage-dark font-bold text-body-sm px-4 py-2 rounded-pill mb-6">
            <Shield className="w-4 h-4" />
            {locale === "id" ? "Hanya untuk Dokter Hewan Terverifikasi" : "For Verified Veterinarians Only"}
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-pm-brown mb-6">
            {locale === "id"
              ? "Portal Eksklusif Dokter Hewan Pawmeals"
              : "Pawmeals Veterinarian Exclusive Portal"}
          </h1>
          <p className="text-pm-brown/70 text-body-lg mb-8 max-w-2xl mx-auto">
            {locale === "id"
              ? "Bergabunglah dengan jaringan dokter hewan terpercaya Pawmeals. Akses materi klinis eksklusif, program mitra, dan dukungan edukasi untuk klien kamu."
              : "Join the Pawmeals trusted veterinarian network. Access exclusive clinical materials, partner programs, and client education support."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/vet/login`}
              className="inline-flex items-center gap-2 bg-pm-sage text-white font-bold px-8 py-4 rounded-xl hover:bg-pm-sage-dark transition-colors"
            >
              <Shield className="w-5 h-5" />
              {locale === "id" ? "Masuk ke Portal Vet" : "Enter Vet Portal"}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${locale}/vet/register`}
              className="inline-flex items-center gap-2 border-2 border-pm-sage text-pm-sage-dark font-bold px-8 py-4 rounded-xl hover:bg-pm-sage/10 transition-colors"
            >
              {locale === "id" ? "Daftar sebagai Mitra Vet" : "Register as Vet Partner"}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-pm-brown text-white py-10">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.num}>
                <div className="font-heading text-3xl sm:text-4xl font-bold text-pm-caramel mb-1">{s.num}</div>
                <div className="text-white/70 text-body-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-pm-brown">
              {locale === "id" ? "Keuntungan Menjadi Mitra Vet" : "Benefits of Becoming a Vet Partner"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4 p-6 rounded-2xl bg-pm-cream hover:shadow-warm-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-pm-sage/20 text-pm-sage flex items-center justify-center flex-shrink-0">
                  {b.icon}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-pm-brown mb-1">{b.title}</h3>
                  <p className="text-pm-brown/70 text-body-sm">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-pm-cream">
        <div className="container max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold text-pm-brown mb-4">
            {locale === "id" ? "Sudah terdaftar sebagai mitra?" : "Already registered as a partner?"}
          </h2>
          <p className="text-pm-brown/70 mb-6">
            {locale === "id"
              ? "Masuk ke portal eksklusif untuk mengakses semua materi klinis dan program mitra."
              : "Log in to the exclusive portal to access all clinical materials and partner programs."}
          </p>
          <Link
            href={`/${locale}/vet/login`}
            className="inline-flex items-center gap-2 bg-pm-caramel text-white font-bold px-8 py-4 rounded-xl hover:bg-pm-caramel-dark transition-colors"
          >
            {locale === "id" ? "Masuk Sekarang" : "Log In Now"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
