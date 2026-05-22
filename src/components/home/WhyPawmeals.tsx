import React from "react";
import { Flame, Shield, Heart, Award, Leaf, Truck } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

interface Feature {
  icon?: string;
  title: string;
  description: string;
}

interface WhyPawmealsProps {
  locale: Locale;
  features: Feature[] | null;
}

const defaultFeatures = (locale: Locale): Feature[] => [
  {
    icon: "flame",
    title: locale === "id" ? "Dimasak Segar Setiap Hari" : "Freshly Cooked Daily",
    description: locale === "id"
      ? "Setiap porsi dimasak segar menggunakan bahan-bahan alami berkualitas tinggi, tanpa pengawet atau bahan kimia."
      : "Every portion is freshly cooked using high-quality natural ingredients, with no preservatives or chemicals.",
  },
  {
    icon: "shield",
    title: locale === "id" ? "Direkomendasikan Dokter Hewan" : "Vet Recommended",
    description: locale === "id"
      ? "Lebih dari 220 klinik dokter hewan di seluruh Indonesia merekomendasikan Pawmeals untuk hewan peliharaan mereka."
      : "Over 220 veterinary clinics across Indonesia recommend Pawmeals for their patients.",
  },
  {
    icon: "heart",
    title: locale === "id" ? "Formula Khusus Kesehatan" : "Health-Specific Formulas",
    description: locale === "id"
      ? "Tersedia formula khusus untuk berbagai kondisi kesehatan: manajemen berat badan, kesehatan sendi, pencernaan sensitif, dan lebih banyak lagi."
      : "Available in special formulas for various health conditions: weight management, joint health, sensitive digestion, and more.",
  },
  {
    icon: "award",
    title: locale === "id" ? "Spesialis #1 di Indonesia" : "Indonesia's #1 Specialist",
    description: locale === "id"
      ? "Pionir makanan hewan masak di Indonesia dengan lebih dari 10.000 hewan peliharaan yang bahagia dan sehat."
      : "Pioneer of cooked pet food in Indonesia with over 10,000 happy and healthy pets.",
  },
  {
    icon: "leaf",
    title: locale === "id" ? "Bahan Alami 100%" : "100% Natural Ingredients",
    description: locale === "id"
      ? "Daging segar, sayuran organik, dan biji-bijian utuh. Tidak ada tepung daging, tidak ada pengawet, tidak ada pewarna buatan."
      : "Fresh meat, organic vegetables, and whole grains. No meat meal, no preservatives, no artificial coloring.",
  },
  {
    icon: "truck",
    title: locale === "id" ? "Pengiriman Segar ke Rumah" : "Fresh Home Delivery",
    description: locale === "id"
      ? "Dikirim dalam kemasan berpendingin langsung ke pintu rumahmu. Tersedia pengiriman berlangganan mingguan dan bulanan."
      : "Delivered in chilled packaging directly to your door. Weekly and monthly subscription delivery available.",
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  flame: Flame,
  shield: Shield,
  heart: Heart,
  award: Award,
  leaf: Leaf,
  truck: Truck,
};

const iconColors = [
  "bg-pm-caramel/15 text-pm-caramel-dark",
  "bg-pm-sage/15 text-pm-sage-dark",
  "bg-pm-terracotta/12 text-pm-terracotta",
  "bg-pm-gold/15 text-pm-brown",
  "bg-pm-sage-light/25 text-pm-sage-dark",
  "bg-pm-sand/45 text-pm-brown",
];

export function WhyPawmeals({ locale, features }: WhyPawmealsProps) {
  const displayFeatures = features?.length ? features : defaultFeatures(locale);

  return (
    <section className="section-padding bg-white" aria-labelledby="why-pawmeals-heading">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-pm-caramel font-bold text-label-md uppercase tracking-widest mb-3">
            {locale === "id" ? "Mengapa Pawmeals?" : "Why Pawmeals?"}
          </p>
          <h2
            id="why-pawmeals-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-pm-brown mb-4"
          >
            {locale === "id"
              ? "Makanan Terbaik, Dibuat dengan Cinta"
              : "The Best Food, Made with Love"}
          </h2>
          <p className="text-pm-brown/70 text-body-lg max-w-2xl mx-auto leading-relaxed">
            {locale === "id"
              ? "Kami percaya bahwa hewan peliharaan berhak mendapatkan makanan berkualitas sama seperti yang kita makan sendiri."
              : "We believe pets deserve food of the same quality we eat ourselves."}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayFeatures.map((feature, index) => {
            const IconComponent = iconMap[feature.icon || "heart"] || Heart;
            const colorClass = iconColors[index % iconColors.length];

            return (
              <div
                key={index}
                className="group p-6 rounded-3xl luxury-panel hover:bg-white hover:shadow-warm-lg transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClass} transition-transform duration-300 group-hover:scale-110`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-pm-brown text-body-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-pm-brown/70 text-body-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
