"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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
    headline: locale === "id" ? "Masakan Terbaik untuk Sahabat Berbulumu" : "The Best Cooking for Your Furry Friend",
    subheadline: locale === "id"
      ? "Makanan masak alami, tanpa pengawet. Direkomendasikan oleh 220+ dokter hewan di seluruh Indonesia."
      : "Natural cooked food, no preservatives. Recommended by 220+ vets across Indonesia.",
    ctaText: locale === "id" ? "Temukan Produk" : "Explore Products",
    ctaLink: `/${locale}/products`,
    image: { asset: { url: PLACEHOLDER_IMAGES.hero1 }, alt: "Pawmeals premium cooked pet food" },
  },
  {
    headline: locale === "id" ? "Temukan Makanan Sempurna untuk Anjingmu" : "Find the Perfect Food for Your Dog",
    subheadline: locale === "id"
      ? "Ikuti kuis interaktif kami dan dapatkan rekomendasi personal berdasarkan ras, usia, dan kebutuhan kesehatan."
      : "Take our interactive quiz and get personalized recommendations based on breed, age, and health needs.",
    ctaText: locale === "id" ? "Mulai Kuis" : "Start Quiz",
    ctaLink: `/${locale}/quiz`,
    image: { asset: { url: PLACEHOLDER_IMAGES.hero2 }, alt: "Pawmeals fresh ingredients" },
  },
  {
    headline: locale === "id" ? "Spesialis Makanan Masak #1 di Indonesia" : "Indonesia's #1 Cooked Food Specialist",
    subheadline: locale === "id"
      ? "Lebih dari 10.000 hewan peliharaan bahagia. Dikirim segar langsung ke pintu rumahmu."
      : "Over 10,000 happy pets. Delivered fresh directly to your door.",
    ctaText: locale === "id" ? "Langganan Sekarang" : "Subscribe Now",
    ctaLink: `/${locale}/account/subscriptions`,
    image: { asset: { url: PLACEHOLDER_IMAGES.hero3 }, alt: "Happy pet with Pawmeals food" },
  },
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
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  return (
    <section
      className="relative w-full overflow-hidden bg-pm-cream"
      style={{ minHeight: "560px" }}
      aria-label="Hero carousel"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      {displaySlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={index !== current}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[560px]">
            {/* Left: Text content */}
            <div className="flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-20 bg-pm-cream">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-pm-caramel/15 border border-pm-caramel/30 text-pm-caramel-dark rounded-pill px-4 py-1.5 text-label-sm font-bold uppercase tracking-wider mb-6 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-pm-caramel animate-pulse" />
                {locale === "id" ? "Spesialis Makanan Masak" : "Cooked Food Specialist"}
              </div>

              {/* Headline */}
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-5xl font-bold text-pm-brown leading-tight mb-5">
                {slide.headline}
              </h1>

              {/* Subheadline */}
              <p className="text-pm-brown-light text-body-lg leading-relaxed mb-8 max-w-lg">
                {slide.subheadline}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href={slide.ctaLink}
                  className="btn-primary flex items-center gap-2 text-base px-7 py-3.5"
                >
                  {slide.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${locale}/quiz`}
                  className="btn-secondary flex items-center gap-2 text-base px-7 py-3.5"
                >
                  {locale === "id" ? "Cari Tahu Kebutuhan Hewanmu" : "Find Your Pet's Needs"}
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6">
                {[
                  { icon: "🏥", text: locale === "id" ? "220+ Klinik Vet" : "220+ Vet Clinics" },
                  { icon: "🐾", text: locale === "id" ? "10K+ Hewan Bahagia" : "10K+ Happy Pets" },
                  { icon: "🌿", text: locale === "id" ? "Tanpa Pengawet" : "No Preservatives" },
                ].map((badge) => (
                  <div
                    key={badge.text}
                    className="flex items-center gap-1.5 text-pm-brown/70 text-body-sm font-semibold"
                  >
                    <span>{badge.icon}</span>
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative hidden lg:block overflow-hidden">
              {slide.image?.asset?.url ? (
                <Image
                  src={slide.image.asset.url}
                  alt={slide.image.alt || slide.headline}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  sizes="50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-pm-caramel/20 to-pm-sand/40 flex items-center justify-center">
                  <div className="text-pm-caramel/20 text-[200px] select-none">🐾</div>
                </div>
              )}
              {/* Subtle gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-pm-cream/10" />
            </div>
          </div>

          {/* Mobile: show image as background with overlay */}
          <div className="lg:hidden absolute inset-0 -z-10">
            {slide.image?.asset?.url && (
              <>
                <Image
                  src={slide.image.asset.url}
                  alt={slide.image.alt || slide.headline}
                  fill
                  className="object-cover object-center opacity-15"
                  priority={index === 0}
                  sizes="100vw"
                />
              </>
            )}
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {displaySlides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 bottom-8 z-20 w-10 h-10 rounded-full bg-white/90 shadow-warm-md flex items-center justify-center text-pm-brown hover:bg-white hover:shadow-warm-lg transition-all duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute left-16 bottom-8 z-20 w-10 h-10 rounded-full bg-white/90 shadow-warm-md flex items-center justify-center text-pm-brown hover:bg-white hover:shadow-warm-lg transition-all duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {displaySlides.length > 1 && (
        <div className="absolute bottom-9 left-28 z-20 flex items-center gap-2">
          {displaySlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`rounded-full transition-all duration-300 ${
                index === current
                  ? "w-6 h-2.5 bg-pm-caramel"
                  : "w-2.5 h-2.5 bg-pm-brown/30 hover:bg-pm-brown/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === current ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}
