import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { WhyPawmeals } from "@/components/home/WhyPawmeals";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { QuizCTA } from "@/components/home/QuizCTA";
import { VetEndorsement } from "@/components/home/VetEndorsement";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { getFeaturedSanityProducts, getHomepageContent } from "@/lib/sanity/client";
import type { Locale } from "@/lib/i18n/config";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { "id-ID": "/id", "en-US": "/en" },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // Parallel data fetching for performance
  const [homepageContent, featuredProductsData] = await Promise.allSettled([
    getHomepageContent(locale),
    getFeaturedSanityProducts(locale),
  ]);

  const content = homepageContent.status === "fulfilled" ? homepageContent.value : null;
  const featuredProducts =
    featuredProductsData.status === "fulfilled" ? featuredProductsData.value : [];

  return (
    <>
      {/* Hero Section with Carousel */}
      <HeroCarousel locale={locale} slides={content?.heroSlides ?? null} />

      {/* Why Pawmeals — Trust Signals */}
      <WhyPawmeals features={content?.whyPawmeals ?? null} />

      {/* Featured Products */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-pm-cream-dark" />}>
        <FeaturedProducts locale={locale} products={featuredProducts} />
      </Suspense>

      {/* Interactive Quiz CTA — Supergoop-style */}
      <QuizCTA content={content?.quizCta ?? null} />

      {/* Vet Endorsement Section */}
      <VetEndorsement locale={locale} vetPartners={content?.vetPartners ?? null} />

      {/* Customer Testimonials */}
      <Testimonials testimonials={content?.featuredTestimonials ?? null} />

      {/* Instagram Feed */}
      <InstagramFeed content={content?.instagramFeed ?? null} />

      {/* Newsletter Signup */}
      <NewsletterSignup locale={locale} content={content?.newsletterSignup ?? null} />
    </>
  );
}
