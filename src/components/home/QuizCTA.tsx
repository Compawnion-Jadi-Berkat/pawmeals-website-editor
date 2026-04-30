import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

interface QuizCTAProps {
  locale: Locale;
}

export function QuizCTA({ locale }: QuizCTAProps) {
  const steps = locale === "id"
    ? [
        { emoji: "🐕", label: "Pilih jenis hewan" },
        { emoji: "📋", label: "Ceritakan kondisinya" },
        { emoji: "🥩", label: "Dapatkan rekomendasi" },
      ]
    : [
        { emoji: "🐕", label: "Choose pet type" },
        { emoji: "📋", label: "Tell us about them" },
        { emoji: "🥩", label: "Get recommendations" },
      ];

  return (
    <section
      className="section-padding bg-gradient-to-br from-pm-caramel to-pm-caramel-dark relative overflow-hidden"
      aria-labelledby="quiz-cta-heading"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -left-10 bottom-0 w-60 h-60 rounded-full bg-pm-caramel-dark/30 blur-2xl" />
        <div className="absolute top-1/2 right-1/4 text-white/5 text-[200px] select-none">🐾</div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 text-white rounded-pill px-4 py-1.5 text-label-sm font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {locale === "id" ? "Rekomendasi Personal" : "Personal Recommendation"}
          </div>

          <h2
            id="quiz-cta-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
          >
            {locale === "id"
              ? "Temukan Makanan Sempurna untuk Hewan Peliharaanmu"
              : "Find the Perfect Food for Your Pet"}
          </h2>

          <p className="text-white/85 text-body-lg leading-relaxed mb-8 max-w-xl mx-auto">
            {locale === "id"
              ? "Jawab beberapa pertanyaan singkat tentang ras, usia, dan kondisi kesehatan hewanmu. Kami akan merekomendasikan produk yang paling tepat."
              : "Answer a few quick questions about your pet's breed, age, and health condition. We'll recommend the most suitable products."}
          </p>

          {/* Steps */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {steps.map((step, index) => (
              <React.Fragment key={step.label}>
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3">
                  <span className="text-2xl">{step.emoji}</span>
                  <span className="text-white font-semibold text-body-sm">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-white/50 hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>

          <Link
            href={`/${locale}/quiz`}
            className="inline-flex items-center gap-2 bg-white text-pm-caramel-dark font-bold text-body-lg px-8 py-4 rounded-pill shadow-warm-lg hover:shadow-warm-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            {locale === "id" ? "Mulai Kuis Sekarang" : "Start Quiz Now"}
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-white/60 text-body-sm mt-4">
            {locale === "id" ? "Hanya 2 menit • Gratis • Tanpa daftar" : "Only 2 minutes • Free • No sign-up needed"}
          </p>
        </div>
      </div>
    </section>
  );
}
