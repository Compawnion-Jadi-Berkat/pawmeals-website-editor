import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { QuizFlow } from "@/components/quiz/QuizFlow";
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
        ? "Temukan Makanan Sempurna untuk Hewanmu | Pawmeals"
        : "Find Your Pet's Perfect Food | Pawmeals",
    description:
      locale === "id"
        ? "Ikuti kuis interaktif kami untuk mendapatkan rekomendasi makanan yang dipersonalisasi berdasarkan ras, usia, dan kondisi kesehatan hewan peliharaanmu."
        : "Take our interactive quiz to get personalized food recommendations based on your pet's breed, age, and health condition.",
    alternates: {
      canonical: `/${locale}/quiz`,
      languages: { "id-ID": "/id/quiz", "en-US": "/en/quiz" },
    },
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pm-cream via-white to-pm-cream">
      {/* Page Header */}
      <div className="text-center pt-12 pb-8 px-4">
        <div className="inline-flex items-center gap-2 bg-pm-caramel/10 text-pm-caramel rounded-pill px-4 py-1.5 text-label-sm font-bold uppercase tracking-wider mb-4">
          ✨ {locale === "id" ? "Rekomendasi Personal" : "Personal Recommendation"}
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-pm-brown mb-3">
          {locale === "id"
            ? "Temukan Pawmeals yang Tepat"
            : "Find Your Pawfect Pawmeals"}
        </h1>
        <p className="text-pm-brown/70 text-body-lg max-w-xl mx-auto">
          {locale === "id"
            ? "Jawab beberapa pertanyaan singkat dan kami akan merekomendasikan produk terbaik untuk sahabat berbulumu."
            : "Answer a few quick questions and we'll recommend the best products for your furry friend."}
        </p>
      </div>

      {/* Quiz Flow Component */}
      <QuizFlow locale={locale} />
    </div>
  );
}
