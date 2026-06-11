"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { normalizePublicHref } from "@/lib/navigation";

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

export function HeroCarousel({ locale, slides }: HeroCarouselProps) {
  const displaySlides = slides?.filter((slide) => slide.headline) ?? [];
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    if (displaySlides.length === 0) return;
    setCurrent((prev) => (prev + 1) % displaySlides.length);
  }, [displaySlides.length]);

  const prev = useCallback(() => {
    if (displaySlides.length === 0) return;
    setCurrent((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
  }, [displaySlides.length]);

  useEffect(() => {
    if (!isAutoPlaying || displaySlides.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [displaySlides.length, isAutoPlaying, next]);

  if (displaySlides.length === 0) {
    return null;
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-[radial-gradient(circle_at_18%_18%,rgba(216,97,90,0.18),transparent_30%),radial-gradient(circle_at_82%_22%,rgba(242,185,67,0.16),transparent_28%),linear-gradient(135deg,#FDFDFE_0%,#FAE7D8_58%,#FDFDFE_100%)]"
      style={{ minHeight: "620px" }}
      aria-label={locale === "id" ? "Carousel utama" : "Hero carousel"}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {displaySlides.map((slide, index) => (
        <div
          key={`${slide.headline}-${index}`}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={index !== current}
        >
          <div className="container grid grid-cols-1 lg:grid-cols-[0.94fr_1.06fr] h-full min-h-[620px] items-center gap-10 py-12 lg:py-16">
            <div className="relative z-10 flex flex-col justify-center max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/82 border border-pm-sand/70 text-pm-caramel-dark rounded-pill px-4 py-2 text-label-sm font-bold uppercase tracking-[0.18em] mb-6 w-fit shadow-warm-sm backdrop-blur-sm">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                Pawmeals
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-pm-brown leading-[1.04] mb-5 max-w-[12ch]">
                {slide.headline}
              </h1>

              {slide.subheadline && (
                <p className="text-pm-brown-light text-body-lg leading-relaxed mb-8 max-w-xl">
                  {slide.subheadline}
                </p>
              )}

              {slide.ctaText && slide.ctaLink && (
                <div className="flex flex-wrap gap-3 mb-9">
                  <Link href={normalizePublicHref(slide.ctaLink, locale)} className="btn-primary px-7 py-3.5">
                    {slide.ctaText}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              )}
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
            aria-label={locale === "id" ? "Slide sebelumnya" : "Previous slide"}
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
                aria-label={locale === "id" ? `Buka slide ${index + 1}` : `Go to slide ${index + 1}`}
                aria-current={index === current ? "true" : undefined}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white shadow-warm-sm flex items-center justify-center text-pm-brown hover:bg-pm-cream-dark transition-all duration-200 cursor-pointer"
            aria-label={locale === "id" ? "Slide berikutnya" : "Next slide"}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
}
