import Link from "next/link";
import { Camera, Heart, Instagram, Leaf, ShieldCheck, Sparkles, Utensils } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

interface InstagramFeedProps {
  locale: Locale;
}

const icons = [Camera, Utensils, Leaf, ShieldCheck, Sparkles, Heart];

export function InstagramFeed({ locale }: InstagramFeedProps) {
  const placeholderPosts = Array.from({ length: 6 }, (_, i) => ({
    id: `ig-${i}`,
    Icon: icons[i],
    label: [
      locale === "id" ? "Daily bowl" : "Daily bowl",
      locale === "id" ? "Fresh cooked" : "Fresh cooked",
      locale === "id" ? "Natural" : "Natural",
      locale === "id" ? "Vet trust" : "Vet trust",
      locale === "id" ? "Wellness" : "Wellness",
      locale === "id" ? "Companion" : "Companion",
    ][i],
    bg: [
      "from-pm-brown/12 via-white to-pm-caramel/18",
      "from-pm-caramel/18 via-white to-pm-sand/35",
      "from-pm-sage/16 via-white to-pm-cream",
      "from-pm-sand/45 via-white to-pm-caramel/12",
      "from-pm-gold/16 via-white to-pm-cream-dark",
      "from-pm-terracotta/12 via-white to-pm-caramel/12",
    ][i],
  }));

  return (
    <section className="section-padding bg-pm-cream" aria-labelledby="instagram-heading">
      <div className="container">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-pm-brown/70 mb-3">
            <Instagram className="w-5 h-5" aria-hidden="true" />
            <span className="font-bold text-body-sm">@pawmeals.id</span>
          </div>
          <h2 id="instagram-heading" className="font-heading text-2xl sm:text-3xl font-bold text-pm-brown">
            {locale === "id" ? "Ikuti Perjalanan Kami di Instagram" : "Follow Our Journey on Instagram"}
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-6">
          {placeholderPosts.map((post) => {
            const Icon = post.Icon;
            return (
              <Link
                key={post.id}
                href="https://instagram.com/pawmeals.id"
                target="_blank"
                rel="noopener noreferrer"
                className={`group aspect-square rounded-2xl border border-pm-sand/50 bg-gradient-to-br ${post.bg} flex flex-col items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-warm-md transition-all duration-200 overflow-hidden`}
                aria-label="View on Instagram"
              >
                <span className="w-10 h-10 rounded-2xl bg-white/82 text-pm-caramel-dark flex items-center justify-center shadow-warm-sm group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="hidden sm:block text-[0.63rem] uppercase tracking-[0.16em] font-bold text-pm-brown/55">{post.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="https://instagram.com/pawmeals.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-pm-brown/20 text-pm-brown font-bold px-6 py-3 rounded-pill hover:border-pm-caramel hover:text-pm-caramel transition-colors"
          >
            <Instagram className="w-4 h-4" aria-hidden="true" />
            {locale === "id" ? "Ikuti @pawmeals.id" : "Follow @pawmeals.id"}
          </Link>
        </div>
      </div>
    </section>
  );
}
