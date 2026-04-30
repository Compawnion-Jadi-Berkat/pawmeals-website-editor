import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { PLACEHOLDER_IMAGES } from "@/lib/placeholder-images";

interface VetPartner {
  name: string;
  clinic: string;
  location: string;
  quote: string;
  photo?: { asset: { url: string } };
}

interface VetEndorsementProps {
  locale: Locale;
  vetPartners: VetPartner[] | null;
}

const defaultVetPartners = (locale: Locale): VetPartner[] => [
  {
    name: "drh. Sarah Wijaya",
    clinic: "Klinik Hewan Sehat Bersama",
    location: "Jakarta Selatan",
    photo: { asset: { url: PLACEHOLDER_IMAGES.vetBadge } },
    quote: locale === "id"
      ? "Saya merekomendasikan Pawmeals kepada semua klien saya. Formulanya seimbang secara nutrisi dan hasilnya terlihat nyata pada kondisi bulu dan energi hewan peliharaan."
      : "I recommend Pawmeals to all my clients. The formula is nutritionally balanced and the results are visible in coat condition and pet energy levels.",
  },
  {
    name: "drh. Budi Santoso",
    clinic: "Animal Care Center",
    location: "Surabaya",
    photo: { asset: { url: PLACEHOLDER_IMAGES.vetBadge } },
    quote: locale === "id"
      ? "Untuk anjing dengan masalah pencernaan sensitif, Pawmeals adalah pilihan terbaik yang saya temukan di pasar Indonesia."
      : "For dogs with sensitive digestive issues, Pawmeals is the best option I've found in the Indonesian market.",
  },
  {
    name: "drh. Maya Kusuma",
    clinic: "Pet Health Clinic",
    location: "Bandung",
    photo: { asset: { url: PLACEHOLDER_IMAGES.vetBadge } },
    quote: locale === "id"
      ? "Bahan-bahan alami tanpa pengawet membuat Pawmeals menjadi pilihan ideal untuk hewan peliharaan yang membutuhkan diet khusus."
      : "Natural ingredients without preservatives make Pawmeals the ideal choice for pets requiring special diets.",
  },
];

export function VetEndorsement({ locale, vetPartners }: VetEndorsementProps) {
  const displayVets = vetPartners?.length ? vetPartners : defaultVetPartners(locale);

  return (
    <section className="section-padding bg-pm-cream" aria-labelledby="vet-endorsement-heading">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-pm-sage/15 text-pm-sage-dark rounded-pill px-4 py-1.5 text-label-sm font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            {locale === "id" ? "Dipercaya Dokter Hewan" : "Trusted by Vets"}
          </div>
          <h2
            id="vet-endorsement-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-pm-brown mb-4"
          >
            {locale === "id"
              ? "Direkomendasikan oleh 220+ Klinik Dokter Hewan"
              : "Recommended by 220+ Veterinary Clinics"}
          </h2>
          <p className="text-pm-brown/70 text-body-lg max-w-2xl mx-auto">
            {locale === "id"
              ? "Para profesional kesehatan hewan di seluruh Indonesia mempercayai Pawmeals untuk pasien mereka."
              : "Animal health professionals across Indonesia trust Pawmeals for their patients."}
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { number: "220+", label: locale === "id" ? "Klinik Vet" : "Vet Clinics" },
            { number: "2,000+", label: locale === "id" ? "Rekomendasi/Bulan" : "Recommendations/Month" },
            { number: "10K+", label: locale === "id" ? "Hewan Bahagia" : "Happy Pets" },
            { number: "4.9★", label: locale === "id" ? "Rating Rata-rata" : "Average Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-5 bg-white rounded-2xl shadow-warm-sm">
              <p className="font-heading text-2xl sm:text-3xl font-bold text-pm-caramel mb-1">
                {stat.number}
              </p>
              <p className="text-pm-brown/70 text-body-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Vet quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {displayVets.map((vet, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-warm-sm hover:shadow-warm-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                {vet.photo?.asset?.url ? (
                  <Image
                    src={vet.photo.asset.url}
                    alt={vet.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-pm-sage/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👩‍⚕️</span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-pm-brown text-body-sm">{vet.name}</p>
                  <p className="text-pm-brown/60 text-body-xs">{vet.clinic}</p>
                  <p className="text-pm-brown/50 text-body-xs">{vet.location}</p>
                </div>
              </div>
              <blockquote className="text-pm-brown/80 text-body-sm leading-relaxed italic">
                &ldquo;{vet.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-1 mt-3">
                <CheckCircle2 className="w-4 h-4 text-pm-sage" />
                <span className="text-pm-sage-dark text-body-xs font-semibold">
                  {locale === "id" ? "Dokter Hewan Terverifikasi" : "Verified Veterinarian"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/${locale}/vet-exclusive`}
            className="inline-flex items-center gap-2 text-pm-caramel font-bold hover:text-pm-caramel-dark transition-colors"
          >
            {locale === "id" ? "Lihat Program Vet Exclusive" : "View Vet Exclusive Program"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
