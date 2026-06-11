import Link from "next/link";
import { ArrowRight, ClipboardList, Dog, Sparkles, Utensils } from "lucide-react";

interface QuizCtaContent {
  eyebrow?: string;
  headline?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  highlights?: string[];
}

interface QuizCTAProps {
  content: QuizCtaContent | null;
}

const highlightIcons = [Dog, ClipboardList, Utensils];

export function QuizCTA({ content }: QuizCTAProps) {
  if (!content?.headline && !content?.description && !content?.primaryCtaText && !content?.highlights?.length) return null;

  return (
    <section className="section-padding bg-gradient-to-br from-pm-brown via-pm-caramel-dark to-pm-caramel relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/8 blur-3xl" />
        <div className="absolute -left-10 bottom-0 w-60 h-60 rounded-full bg-pm-brown/25 blur-2xl" />
        <div className="absolute top-1/2 right-1/4 w-56 h-56 -translate-y-1/2 rounded-full border border-white/10" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {content.eyebrow && (
            <div className="inline-flex items-center gap-2 bg-white/18 text-white rounded-pill px-4 py-1.5 text-label-sm font-bold uppercase tracking-wider mb-6 border border-white/20 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              {content.eyebrow}
            </div>
          )}

          {content.headline && <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{content.headline}</h2>}
          {content.description && <p className="text-white/85 text-body-lg leading-relaxed mb-8 max-w-xl mx-auto">{content.description}</p>}

          {content.highlights?.length ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              {content.highlights.map((highlight, index) => {
                const Icon = highlightIcons[index % highlightIcons.length];
                return (
                  <div key={`${highlight}-${index}`} className="contents">
                    <div className="flex items-center gap-3 bg-white/14 border border-white/18 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-warm-sm">
                      <span className="w-9 h-9 rounded-xl bg-white/18 flex items-center justify-center text-white">
                        <Icon className="w-4.5 h-4.5" aria-hidden="true" />
                      </span>
                      <span className="text-white font-semibold text-body-sm">{highlight}</span>
                    </div>
                    {index < (content.highlights?.length || 0) - 1 && <ArrowRight className="w-4 h-4 text-white/55 hidden sm:block" aria-hidden="true" />}
                  </div>
                );
              })}
            </div>
          ) : null}

          {content.primaryCtaText && content.primaryCtaLink && (
            <Link href={content.primaryCtaLink} className="inline-flex items-center gap-2 bg-white text-pm-caramel-dark font-bold text-body-lg px-8 py-4 rounded-pill shadow-warm-lg hover:shadow-warm-xl hover:-translate-y-0.5 transition-all duration-200">
              {content.primaryCtaText}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          )}

          {content.secondaryCtaText && content.secondaryCtaLink && (
            <div className="mt-4">
              <Link href={content.secondaryCtaLink} className="text-white/75 text-body-sm font-semibold hover:text-white transition-colors">
                {content.secondaryCtaText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
