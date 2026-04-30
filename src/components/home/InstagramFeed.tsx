import React from "react";
import Link from "next/link";
import { Instagram } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

interface InstagramFeedProps {
  locale: Locale;
}

export function InstagramFeed({ locale }: InstagramFeedProps) {
  // Placeholder grid — replace with real Instagram Basic Display API or Curator.io embed
  const placeholderPosts = Array.from({ length: 6 }, (_, i) => ({
    id: `ig-${i}`,
    emoji: ["🐕", "🐈", "🥩", "🐾", "🌿", "❤️"][i],
    bg: [
      "from-pm-caramel/20 to-pm-sand/30",
      "from-pm-sage/20 to-pm-cream",
      "from-pm-brown/10 to-pm-caramel/10",
      "from-pm-sand/40 to-pm-cream-dark",
      "from-green-50 to-pm-sage/10",
      "from-red-50 to-pm-caramel/10",
    ][i],
  }));

  return (
    <section className="section-padding bg-pm-cream" aria-labelledby="instagram-heading">
      <div className="container">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-pm-brown/70 mb-3">
            <Instagram className="w-5 h-5" />
            <span className="font-bold text-body-sm">@pawmeals.id</span>
          </div>
          <h2
            id="instagram-heading"
            className="font-heading text-2xl sm:text-3xl font-bold text-pm-brown"
          >
            {locale === "id"
              ? "Ikuti Perjalanan Kami di Instagram"
              : "Follow Our Journey on Instagram"}
          </h2>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-6">
          {placeholderPosts.map((post) => (
            <Link
              key={post.id}
              href="https://instagram.com/pawmeals.id"
              target="_blank"
              rel="noopener noreferrer"
              className={`aspect-square rounded-xl bg-gradient-to-br ${post.bg} flex items-center justify-center text-4xl hover:opacity-80 hover:scale-105 transition-all duration-200 overflow-hidden`}
              aria-label="View on Instagram"
            >
              {post.emoji}
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="https://instagram.com/pawmeals.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-pm-brown/20 text-pm-brown font-bold px-6 py-3 rounded-pill hover:border-pm-caramel hover:text-pm-caramel transition-colors"
          >
            <Instagram className="w-4 h-4" />
            {locale === "id" ? "Ikuti @pawmeals.id" : "Follow @pawmeals.id"}
          </Link>
        </div>
      </div>
    </section>
  );
}
