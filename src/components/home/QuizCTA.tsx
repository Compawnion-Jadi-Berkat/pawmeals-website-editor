import Link from "next/link";
import { ArrowRight, ClipboardList, Dog, Sparkles, Utensils } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

interface QuizCTAProps {
  locale: Locale;
}

export function QuizCTA({ locale }: QuizCTAProps) {
  const steps = locale === "id"
    ? [
        { icon: Dog, label: "Pilih jenis hewan" },
        { icon: ClipboardList, label: "Ceritakan kondisinya" },
        { icon: Utensils, label: "Dapatkan rekomendasi" },
      ]
    : [
        { icon: Dog, label: "Choose pet type" },
        { icon: ClipboardList, label: "Tell us about them" },
        { icon: Utensils, label: "Get recommendations" },
      ];

  return (
    <section
      className="section-padding bg-gradient-to-br from-pm-brown via-pm-caramel-dark to-pm-caramel relative overflow-hidden"
      aria-labelledby="quiz-cta-heading"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/8 blur-3xl" />
        <div className="absolute -left-10 bottom-0 w-60 h-60 rounded-full bg-pm-brown/25 blur-2xl" />
        <div className="absolute top-1/2 right-1/4 w-56 h-56 -translate-y-1/2 rounded-full border border-white/10" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/18 text-white rounded-pill px-4 py-1.5 text-label-sm font-bold uppercase tracking-wider mb-6 border border-white/20 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            {locale === "id" ? "Rekomendasi Personal" : "Personal Recommendation"}
          </div>

          <h2 id="quiz-cta-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {locale === "id" ? "Temukan Makanan Sempurna untuk Hewan Peliharaanmu" : "Find the Perfect Food for Your Pet"}
          </h2>

          <p className="text-white/85 text-body-lg leading-relaxed mb-8 max-w-xl mx-auto">
            {locale === "id"
              ? "Jawab beberapa pertanyaan singkat tentang ras, usia, dan kondisi kesehatan hewanmu. Kami akan merekomendasikan produk yang paling tepat."
              : "Answer a few quick questions about your pet's breed, age, and health condition. We'll recommend the most suitable products."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="contents">
                  <div className="flex items-center gap-3 bg-white/14 border border-white/18 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-warm-sm">
                    <span className="w-9 h-9 rounded-xl bg-white/18 flex items-center justify-center text-white">
                      <Icon className="w-4.5 h-4.5" aria-hidden="true" />
                    </span>
                    <span className="text-white font-semibold text-body-sm">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && <ArrowRight className="w-4 h-4 text-white/55 hidden sm:block" aria-hidden="true" />}
                </div>
              );
            })}
          </div>

          <Link href={`/${locale}/quiz`} className="inline-flex items-center gap-2 bg-white text-pm-caramel-dark font-bold text-body-lg px-8 py-4 rounded-pill shadow-warm-lg hover:shadow-warm-xl hover:-translate-y-0.5 transition-all duration-200">
            {locale === "id" ? "Mulai Kuis Sekarang" : "Start Quiz Now"}
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>

          <p className="text-white/65 text-body-sm mt-4">
            {locale === "id" ? "Hanya 2 menit • Gratis • Tanpa daftar" : "Only 2 minutes • Free • No sign-up needed"}
          </p>
        </div>
      </div>
    </section>
  );
}
