"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

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
    image: undefined,
  },
  {
    headline: locale === "id" ? "Temukan Makanan Sempurna untuk Anjingmu" : "Find the Perfect Food for Your Dog",
    subheadline: locale === "id"
      ? "Ikuti kuis interaktif kami dan dapatkan rekomendasi personal berdasarkan ras, usia, dan kebutuhan kesehatan."
      : "Take our interactive quiz and get personalized recommendations based on breed, age, and health needs.",
    ctaText: locale === "id" ? "Mulai Kuis" : "Start Quiz",
    ctaLink: `/${locale}/quiz`,
    image: undefined,
  },
  {
    headline: locale === "id" ? "Spesialis Makanan Masak #1 di Indonesia" : "Indonesia's #1 Cooked Food Specialist",
    subheadline: locale === "id"
      ? "Lebih dari 10.000 hewan peliharaan bahagia. Dikirim segar langsung ke pintu rumahmu."
      : "Over 10,000 happy pets. Delivered fresh directly to your door.",
    ctaText: locale === "id" ? "Langganan Sekarang" : "Subscribe Now",
    ctaLink: `/${locale}/account/subscriptions`,
    image: undefined,
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

  const gradients = [
    "from-pm-caramel-dark/90 via-pm-caramel/70 to-transparent",
    "from-pm-brown/90 via-pm-brown/60 to-transparent",
    "from-pm-sage-dark/90 via-pm-sage/60 to-transparent",
  ];

  const bgColors = [
    "bg-gradient-to-br from-pm-caramel/20 to-pm-sand/40",
    "bg-gradient-to-br from-pm-brown/10 to-pm-cream-dark",
    "bg-gradient-to-br from-pm-sage/15 to-pm-cream",
  ];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "min(90vh, 680px)", minHeight: "480px" }}
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
          } ${bgColors[index % bgColors.length]}`}
          aria-hidden={index !== current}
        >
          {/* Background Image */}
          {slide.image?.asset?.url ? (
            <Image
              src={slide.image.asset.url}
              alt={slide.image.alt || slide.headline}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          ) : (
            /* Decorative background pattern when no image */
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-pm-caramel/10 blur-3xl" />
              <div className="absolute -left-10 bottom-0 w-80 h-80 rounded-full bg-pm-sand/30 blur-3xl" />
              <div className="absolute right-1/4 bottom-1/4 w-64 h-64 rounded-full bg-pm-sage/10 blur-2xl" />
              {/* Decorative paw prints */}
              <div className="absolute top-1/4 right-1/3 text-pm-caramel/10 text-[180px] select-none">🐾</div>
              <div className="absolute bottom-1/4 right-1/4 text-pm-sand/30 text-[120px] select-none rotate-12">🐾</div>
            </div>
          )}

          {/* Gradient overlay for text readability */}
          {slide.image?.asset?.url && (
            <div className={`absolute inset-0 bg-gradient-to-r ${gradients[index % gradients.length]}`} />
          )}

          {/* Content */}
          <div className="relative z-10 container h-full flex items-center">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-pm-caramel/15 border border-pm-caramel/30 text-pm-caramel-dark rounded-pill px-4 py-1.5 text-label-sm font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-pm-caramel animate-pulse" />
                {locale === "id" ? "Spesialis Makanan Masak" : "Cooked Food Specialist"}
              </div>

              {/* Headline */}
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-pm-brown leading-tight mb-4">
                {slide.headline}
              </h1>

              {/* Subheadline */}
              <p className="text-pm-brown/80 text-body-lg leading-relaxed mb-8 max-w-lg">
                {slide.subheadline}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={slide.ctaLink}
                  className="btn-primary flex items-center gap-2 text-base px-6 py-3.5"
                >
                  {slide.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/${locale}/quiz`}
                  className="btn-secondary flex items-center gap-2 text-base px-6 py-3.5"
                >
                  {locale === "id" ? "Cari Tahu Kebutuhan Hewanmu" : "Find Your Pet's Needs"}
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
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
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {displaySlides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm shadow-warm-md flex items-center justify-center text-pm-brown hover:bg-white hover:shadow-warm-lg transition-all duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm shadow-warm-md flex items-center justify-center text-pm-brown hover:bg-white hover:shadow-warm-lg transition-all duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {displaySlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
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
