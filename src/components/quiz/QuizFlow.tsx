"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, RotateCcw, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

interface QuizFlowProps {
  locale: Locale;
}

interface QuizAnswer {
  petType?: "dog" | "cat";
  breed?: string;
  age?: "puppy" | "adult" | "senior";
  weight?: "small" | "medium" | "large";
  healthGoal?: string;
  activityLevel?: "low" | "moderate" | "high";
  allergies?: string[];
  email?: string;
}

interface ProductRecommendation {
  handle: string;
  title: string;
  description: string;
  matchScore: number;
  reason: string;
  tags: string[];
}

const QUIZ_STEPS = 7;

function getRecommendations(answers: QuizAnswer, locale: Locale): ProductRecommendation[] {
  const recs: ProductRecommendation[] = [];

  if (answers.petType === "dog") {
    if (answers.age === "puppy") {
      recs.push({
        handle: "pawmeals-puppy-growth",
        title: "Pawmeals Puppy Growth",
        description:
          locale === "id"
            ? "Formula khusus untuk anak anjing dengan DHA untuk perkembangan otak dan kalsium untuk tulang yang kuat."
            : "Special formula for puppies with DHA for brain development and calcium for strong bones.",
        matchScore: 98,
        reason:
          locale === "id"
            ? "Sempurna untuk usia anak anjing dengan kebutuhan nutrisi tinggi."
            : "Perfect for puppy age with high nutritional needs.",
        tags: ["dog", "puppy"],
      });
    } else if (answers.healthGoal === "weight") {
      recs.push({
        handle: "pawmeals-weight-management",
        title: "Pawmeals Weight Management",
        description:
          locale === "id"
            ? "Formula rendah kalori dengan protein tinggi untuk membantu menjaga berat badan ideal."
            : "Low-calorie, high-protein formula to help maintain ideal body weight.",
        matchScore: 97,
        reason:
          locale === "id"
            ? "Diformulasikan khusus untuk manajemen berat badan yang sehat."
            : "Specially formulated for healthy weight management.",
        tags: ["dog", "weight"],
      });
    } else if (answers.healthGoal === "joint") {
      recs.push({
        handle: "pawmeals-joint-care",
        title: "Pawmeals Joint Care",
        description:
          locale === "id"
            ? "Diperkaya dengan glucosamine dan chondroitin untuk kesehatan sendi yang optimal."
            : "Enriched with glucosamine and chondroitin for optimal joint health.",
        matchScore: 96,
        reason:
          locale === "id"
            ? "Mengandung nutrisi khusus untuk mendukung kesehatan sendi."
            : "Contains specialized nutrients to support joint health.",
        tags: ["dog", "joint"],
      });
    } else {
      recs.push({
        handle: "pawmeals-daily-wellness",
        title: "Pawmeals Daily Wellness",
        description:
          locale === "id"
            ? "Formula seimbang untuk kesehatan optimal sehari-hari dengan protein berkualitas tinggi."
            : "Balanced formula for optimal daily health with high-quality protein.",
        matchScore: 95,
        reason:
          locale === "id"
            ? "Formula terbaik untuk kesehatan umum dan vitalitas sehari-hari."
            : "Best formula for general health and daily vitality.",
        tags: ["dog", "wellness"],
      });
    }
  } else if (answers.petType === "cat") {
    if (answers.healthGoal === "hairball") {
      recs.push({
        handle: "pawmeals-cat-hairball",
        title: "Pawmeals Cat Hairball Control",
        description:
          locale === "id"
            ? "Formula khusus dengan serat tinggi untuk membantu mengurangi masalah hairball pada kucing."
            : "Special high-fiber formula to help reduce hairball issues in cats.",
        matchScore: 97,
        reason:
          locale === "id"
            ? "Serat khusus membantu mengurangi pembentukan hairball."
            : "Special fiber helps reduce hairball formation.",
        tags: ["cat", "hairball"],
      });
    } else {
      recs.push({
        handle: "pawmeals-cat-classic",
        title: "Pawmeals Cat Classic",
        description:
          locale === "id"
            ? "Makanan masak premium untuk kucing dengan protein tinggi dan tanpa pengawet."
            : "Premium cooked cat food with high protein and no preservatives.",
        matchScore: 95,
        reason:
          locale === "id"
            ? "Formula klasik terbaik untuk kesehatan kucing sehari-hari."
            : "Best classic formula for daily cat health.",
        tags: ["cat", "classic"],
      });
    }
  }

  // Always add a second recommendation
  if (answers.petType === "dog" && recs[0]?.handle !== "pawmeals-sensitive-digestion") {
    recs.push({
      handle: "pawmeals-sensitive-digestion",
      title: "Pawmeals Sensitive Digestion",
      description:
        locale === "id"
          ? "Formula lembut untuk anjing dengan pencernaan sensitif, menggunakan bahan-bahan yang mudah dicerna."
          : "Gentle formula for dogs with sensitive digestion, using easily digestible ingredients.",
      matchScore: 87,
      reason:
        locale === "id"
          ? "Pilihan alternatif yang baik untuk pencernaan yang lebih sensitif."
          : "Good alternative choice for more sensitive digestion.",
      tags: ["dog", "sensitive"],
    });
  }

  return recs;
}

export function QuizFlow({ locale }: QuizFlowProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer>({});
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const progress = Math.round((step / QUIZ_STEPS) * 100);

  const handleAnswer = useCallback(
    (key: keyof QuizAnswer, value: string | string[]) => {
      const newAnswers = { ...answers, [key]: value };
      setAnswers(newAnswers);

      if (step < QUIZ_STEPS - 1) {
        setStep((s) => s + 1);
      } else {
        const recs = getRecommendations(newAnswers, locale);
        setRecommendations(recs);
        setIsComplete(true);
      }
    },
    [answers, step, locale]
  );

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setRecommendations([]);
    setIsComplete(false);
    setEmail("");
    setEmailSubmitted(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/quiz/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, answers, recommendations, locale }),
      });
    } catch {
      // Silent fail — recommendations are still shown
    }
    setEmailSubmitted(true);
  };

  const t = {
    step: locale === "id" ? "Langkah" : "Step",
    of: locale === "id" ? "dari" : "of",
    back: locale === "id" ? "Kembali" : "Back",
    reset: locale === "id" ? "Mulai Ulang" : "Start Over",
    yourRecommendations: locale === "id" ? "Rekomendasi Untukmu" : "Your Recommendations",
    match: locale === "id" ? "Cocok" : "Match",
    shopNow: locale === "id" ? "Beli Sekarang" : "Shop Now",
    saveResults: locale === "id" ? "Simpan Hasil ke Email" : "Save Results to Email",
    emailPlaceholder: locale === "id" ? "Email kamu" : "Your email",
    sendResults: locale === "id" ? "Kirim Hasil" : "Send Results",
    emailSent: locale === "id" ? "Hasil telah dikirim ke email kamu!" : "Results sent to your email!",
  };

  const steps = [
    // Step 0: Pet type
    {
      question: locale === "id" ? "Hewan peliharaanmu adalah..." : "Your pet is a...",
      options: [
        { value: "dog", label: locale === "id" ? "Anjing" : "Dog", emoji: "🐕" },
        { value: "cat", label: locale === "id" ? "Kucing" : "Cat", emoji: "🐈" },
      ],
      key: "petType" as keyof QuizAnswer,
    },
    // Step 1: Age
    {
      question: locale === "id" ? "Berapa usia hewan peliharaanmu?" : "How old is your pet?",
      options: [
        { value: "puppy", label: locale === "id" ? "Anak (< 1 tahun)" : "Puppy/Kitten (< 1 yr)", emoji: "🐣" },
        { value: "adult", label: locale === "id" ? "Dewasa (1-7 tahun)" : "Adult (1-7 yrs)", emoji: "🐾" },
        { value: "senior", label: locale === "id" ? "Senior (> 7 tahun)" : "Senior (> 7 yrs)", emoji: "🌟" },
      ],
      key: "age" as keyof QuizAnswer,
    },
    // Step 2: Size/Weight
    {
      question: locale === "id" ? "Seberapa besar hewan peliharaanmu?" : "How big is your pet?",
      options: [
        { value: "small", label: locale === "id" ? "Kecil (< 10 kg)" : "Small (< 10 kg)", emoji: "🐩" },
        { value: "medium", label: locale === "id" ? "Sedang (10-25 kg)" : "Medium (10-25 kg)", emoji: "🐕" },
        { value: "large", label: locale === "id" ? "Besar (> 25 kg)" : "Large (> 25 kg)", emoji: "🦮" },
      ],
      key: "weight" as keyof QuizAnswer,
    },
    // Step 3: Health goal
    {
      question: locale === "id" ? "Apa tujuan kesehatan utama kamu?" : "What's your main health goal?",
      options: [
        { value: "wellness", label: locale === "id" ? "Kesehatan Umum" : "General Wellness", emoji: "💪" },
        { value: "weight", label: locale === "id" ? "Manajemen Berat Badan" : "Weight Management", emoji: "⚖️" },
        { value: "joint", label: locale === "id" ? "Kesehatan Sendi" : "Joint Health", emoji: "🦴" },
        { value: "digestion", label: locale === "id" ? "Pencernaan Sensitif" : "Sensitive Digestion", emoji: "🌿" },
        { value: "skin", label: locale === "id" ? "Kulit & Bulu" : "Skin & Coat", emoji: "✨" },
        { value: "hairball", label: locale === "id" ? "Kontrol Hairball" : "Hairball Control", emoji: "🐱" },
      ],
      key: "healthGoal" as keyof QuizAnswer,
    },
    // Step 4: Activity level
    {
      question: locale === "id" ? "Seberapa aktif hewan peliharaanmu?" : "How active is your pet?",
      options: [
        { value: "low", label: locale === "id" ? "Santai (lebih suka tidur)" : "Couch potato", emoji: "😴" },
        { value: "moderate", label: locale === "id" ? "Sedang (jalan-jalan rutin)" : "Moderate (regular walks)", emoji: "🚶" },
        { value: "high", label: locale === "id" ? "Sangat Aktif (suka berlari)" : "Very Active (loves running)", emoji: "🏃" },
      ],
      key: "activityLevel" as keyof QuizAnswer,
    },
    // Step 5: Allergies
    {
      question: locale === "id" ? "Apakah ada alergi yang diketahui?" : "Any known allergies?",
      options: [
        { value: "none", label: locale === "id" ? "Tidak Ada" : "None", emoji: "✅" },
        { value: "chicken", label: locale === "id" ? "Ayam" : "Chicken", emoji: "🐔" },
        { value: "beef", label: locale === "id" ? "Sapi" : "Beef", emoji: "🥩" },
        { value: "grain", label: locale === "id" ? "Biji-bijian" : "Grains", emoji: "🌾" },
      ],
      key: "allergies" as keyof QuizAnswer,
    },
    // Step 6: Breed (text input or skip)
    {
      question: locale === "id" ? "Apa ras hewan peliharaanmu?" : "What breed is your pet?",
      options: [
        { value: "mixed", label: locale === "id" ? "Campuran / Tidak Tahu" : "Mixed / Unknown", emoji: "🐾" },
        { value: "small_breed", label: locale === "id" ? "Ras Kecil" : "Small Breed", emoji: "🐩" },
        { value: "medium_breed", label: locale === "id" ? "Ras Sedang" : "Medium Breed", emoji: "🐕" },
        { value: "large_breed", label: locale === "id" ? "Ras Besar" : "Large Breed", emoji: "🦮" },
      ],
      key: "breed" as keyof QuizAnswer,
    },
  ];

  const currentStep = steps[step];

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 pb-16">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pm-sage/20 mb-4">
            <CheckCircle2 className="w-8 h-8 text-pm-sage" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-pm-brown mb-2">
            {t.yourRecommendations}
          </h2>
          <p className="text-pm-brown/70">
            {locale === "id"
              ? "Berdasarkan jawabanmu, ini adalah produk terbaik untuk hewan peliharaanmu:"
              : "Based on your answers, here are the best products for your pet:"}
          </p>
        </div>

        {/* Recommendations */}
        <div className="space-y-4 mb-8">
          {recommendations.map((rec, index) => (
            <div
              key={rec.handle}
              className={`rounded-2xl p-6 border-2 ${
                index === 0
                  ? "border-pm-caramel bg-pm-caramel/5"
                  : "border-pm-sand/50 bg-white"
              }`}
            >
              {index === 0 && (
                <div className="inline-flex items-center gap-1.5 bg-pm-caramel text-white text-body-xs font-bold px-3 py-1 rounded-pill mb-3">
                  ⭐ {locale === "id" ? "Pilihan Terbaik" : "Best Match"}
                </div>
              )}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-pm-brown text-body-lg mb-1">
                    {rec.title}
                  </h3>
                  <p className="text-pm-brown/70 text-body-sm mb-2">{rec.description}</p>
                  <p className="text-pm-caramel text-body-sm font-semibold italic">
                    💡 {rec.reason}
                  </p>
                </div>
                <div className="text-center flex-shrink-0">
                  <div className="font-heading text-2xl font-bold text-pm-caramel">
                    {rec.matchScore}%
                  </div>
                  <div className="text-pm-brown/50 text-body-xs">{t.match}</div>
                </div>
              </div>
              <Link
                href={`/${locale}/products/${rec.handle}`}
                className="mt-4 inline-flex items-center gap-2 btn-primary text-body-sm py-2.5 px-5"
              >
                {t.shopNow}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Email capture */}
        {!emailSubmitted ? (
          <div className="bg-pm-cream rounded-2xl p-6">
            <h3 className="font-heading font-bold text-pm-brown mb-2">{t.saveResults}</h3>
            <form onSubmit={handleEmailSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="flex-1 px-4 py-2.5 rounded-xl border border-pm-sand focus:outline-none focus:border-pm-caramel bg-white text-pm-brown"
              />
              <button type="submit" className="btn-primary py-2.5 px-5 text-body-sm">
                {t.sendResults}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-pm-sage/10 border border-pm-sage/30 rounded-2xl p-4 text-center text-pm-sage-dark font-semibold">
            ✅ {t.emailSent}
          </div>
        )}

        {/* Reset */}
        <div className="text-center mt-6">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 text-pm-brown/60 hover:text-pm-brown text-body-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            {t.reset}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pb-16">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-body-sm text-pm-brown/60 mb-2">
          <span>
            {t.step} {step + 1} {t.of} {QUIZ_STEPS}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-pm-sand/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-pm-caramel rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-pm-brown">
          {currentStep.question}
        </h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {currentStep.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(currentStep.key, option.value)}
            className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 hover:border-pm-caramel hover:bg-pm-caramel/5 hover:-translate-y-0.5 hover:shadow-warm-md ${
              answers[currentStep.key] === option.value
                ? "border-pm-caramel bg-pm-caramel/10"
                : "border-pm-sand/50 bg-white"
            }`}
          >
            <span className="text-4xl">{option.emoji}</span>
            <span className="font-semibold text-pm-brown text-body-sm text-center leading-snug">
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {step > 0 ? (
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-pm-brown/60 hover:text-pm-brown transition-colors font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={handleReset}
          className="text-pm-brown/40 hover:text-pm-brown/70 text-body-sm transition-colors"
        >
          {t.reset}
        </button>
      </div>
    </div>
  );
}
