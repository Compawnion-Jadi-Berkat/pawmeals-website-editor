"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { PLACEHOLDER_IMAGES } from "@/lib/placeholder-images";

interface HeroSlide {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  image?: { asset: { url: string }; alt: string };
}

interface HeroCarouselProps {
  locale: Locale;
  slides: HeroSlide[] | null;
}

const defaultSlides = (locale: Locale): HeroSlide[] => [
  {
    headline: locale === "id" ? "Makanan Masak Premium untuk Sahabat Berbulumu" : "Premium Cooked Meals for Your Furry Companion",
    subheadline: locale === "id"
      ? "Resep segar, alami, dan vet-informed untuk membantu hewan peliharaan hidup lebih sehat setiap hari."
      : "Fresh, natural, vet-informed recipes designed to help pets live healthier every day.",
    ctaText: locale === "id" ? "Jelajahi Menu" : "Explore Menu",
    ctaLink: `/${locale}/products`,
    image: { asset: { url: PLACEHOLDER_IMAGES.hero1 }, alt: "Pawmeals premium cooked pet food" },
  },
  {
    headline: locale === "id" ? "Temukan Formula yang Tepat dengan Kuis Nutrisi" : "Find the Right Formula with the Nutrition Quiz",
    subheadline: locale === "id"
      ? "Dapatkan rekomendasi berdasarkan usia, ras, berat badan, dan kebutuhan kesehatan hewanmu."
      : "Get recommendations based on your pet's age, breed, weight, and health needs.",
    ctaText: locale === "id" ? "Mulai Kuis" : "Start Quiz",
    ctaLink: `/${locale}/quiz`,
    image: { asset: { url: PLACEHOLDER_IMAGES.hero2 }, alt: "Pawmeals fresh ingredients" },
  },
  {
    headline: locale === "id" ? "Dipercaya 220+ Klinik Dokter Hewan" : "Trusted by 220+ Veterinary Clinics",
    subheadline: locale === "id"
      ? "Lebih dari 10.000 hewan menikmati makanan segar Pawmeals, dikirim langsung ke rumah."
      : "More than 10,000 pets enjoy fresh Pawmeals recipes, delivered directly to their homes.",
    ctaText: locale === "id" ? "Berlangganan" : "Subscribe",
    ctaLink: `/${locale}/subscribe`,
    image: { asset: { url: PLACEHOLDER_IMAGES.hero3 }, alt: "Happy pet with Pawmeals food" },
  },
];

const trustBadges = (locale: Locale) => [
  { icon: Stethoscope, text: locale === "id" ? "220+ Klinik Vet" : "220+ Vet Clinics" },
  { icon: ShieldCheck, text: locale === "id" ? "10K+ Hewan Sehat" : "10K+ Healthy Pets" },
  { icon: Leaf, text: locale === "id" ? "Tanpa Pengawet" : "No Preservatives" },
];

export function HeroCarousel({ locale, slides }: HeroCarouselProps) {
  const displaySlides = slides?.length ? slides : defaultSlides(locale);
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % displaySlides.length);
  }, [displaySlides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
  }, [displaySlides.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  return (
    <section
      className="relative w-full overflow-hidden bg-[radial-gradient(circle_at_18%_18%,rgba(200,149,108,0.18),transparent_30%),linear-gradient(135deg,#FAF6F0_0%,#FFFDF8_48%,#F2EBE0_100%)]"
      style={{ minHeight: "620px" }}
      aria-label="Hero carousel"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {displaySlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={index !== current}
        >
          <div className="container grid grid-cols-1 lg:grid-cols-[0.94fr_1.06fr] h-full min-h-[620px] items-center gap-10 py-12 lg:py-16">
            <div className="relative z-10 flex flex-col justify-center max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/82 border border-pm-sand/70 text-pm-caramel-dark rounded-pill px-4 py-2 text-label-sm font-bold uppercase tracking-[0.18em] mb-6 w-fit shadow-warm-sm backdrop-blur-sm">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                {locale === "id" ? "Cooked Food Specialist" : "Cooked Food Specialist"}
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-pm-brown leading-[1.04] mb-5 max-w-[12ch]">
                {slide.headline}
              </h1>

              <p className="text-pm-brown-light text-body-lg leading-relaxed mb-8 max-w-xl">
                {slide.subheadline}
              </p>

              <div className="flex flex-wrap gap-3 mb-9">
                <Link href={slide.ctaLink} className="btn-primary px-7 py-3.5">
                  {locale === "id" && /shop now/i.test(slide.ctaText) ? "Belanja Sekarang" : slide.ctaText}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link href={`/${locale}/quiz`} className="btn-secondary bg-white/70 px-7 py-3.5 backdrop-blur-sm">
                  {locale === "id" ? "Cek Kebutuhan Nutrisi" : "Check Nutrition Needs"}
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {trustBadges(locale).map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div key={badge.text} className="flex items-center gap-2 rounded-pill bg-white/75 border border-pm-sand/60 px-3.5 py-2 text-pm-brown/75 text-body-sm font-bold shadow-warm-sm backdrop-blur-sm">
                      <Icon className="w-4 h-4 text-pm-caramel" aria-hidden="true" />
                      <span>{badge.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative hidden lg:block h-[520px]">
              <div className="absolute inset-0 rounded-[2.5rem] bg-pm-caramel/12 rotate-3" />
              <div className="relative h-full overflow-hidden rounded-[2.5rem] border border-white/70 shadow-warm-2xl bg-white">
                {slide.image?.asset?.url ? (
                  <Image
                    src={slide.image.asset.url}
                    alt={slide.image.alt || slide.headline}
                    fill
                    className="object-cover object-center"
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 52vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-pm-caramel/10 to-pm-sand/30 flex items-center justify-center">
                    <Leaf className="w-24 h-24 text-pm-caramel/35" aria-hidden="true" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-pm-brown/28 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/88 p-4 shadow-warm-md backdrop-blur-md border border-white/70">
                  <p className="text-body-xs font-bold uppercase tracking-[0.18em] text-pm-caramel-dark mb-1">
                    {locale === "id" ? "Fresh, warm, informed" : "Fresh, warm, informed"}
                  </p>
                  <p className="font-heading text-xl font-bold text-pm-brown">
                    {locale === "id" ? "Nutrisi harian yang terasa homemade." : "Daily nutrition that feels homemade."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden absolute inset-0 -z-10">
            {slide.image?.asset?.url && (
              <Image
                src={slide.image.asset.url}
                alt={slide.image.alt || slide.headline}
                fill
                className="object-cover object-center opacity-10"
                priority={index === 0}
                sizes="100vw"
              />
            )}
          </div>
        </div>
      ))}

      {displaySlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-pill bg-white/82 border border-pm-sand/60 p-2 shadow-warm-md backdrop-blur-md">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white shadow-warm-sm flex items-center justify-center text-pm-brown hover:bg-pm-cream-dark transition-all duration-200 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 px-1">
            {displaySlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  index === current ? "w-7 h-2.5 bg-pm-caramel" : "w-2.5 h-2.5 bg-pm-brown/25 hover:bg-pm-brown/45"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === current ? "true" : undefined}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white shadow-warm-sm flex items-center justify-center text-pm-brown hover:bg-pm-cream-dark transition-all duration-200 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
}
