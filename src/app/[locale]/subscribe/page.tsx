import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Percent, RefreshCw, Settings, Truck } from "lucide-react";
import { getSubscriptionContent } from "@/lib/sanity/client";
import type { Locale } from "@/lib/i18n/config";
import { normalizePublicHref } from "@/lib/navigation";

export const dynamic = "force-dynamic";

const iconMap = {
  percent: Percent,
  truck: Truck,
  settings: Settings,
  refresh: RefreshCw,
};

type IconKey = keyof typeof iconMap;

function CardIcon({ icon }: { icon?: string }) {
  const Icon = iconMap[(icon || "refresh").toLowerCase() as IconKey] || RefreshCw;
  return <Icon className="w-6 h-6" />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const content = await getSubscriptionContent(locale);
  return {
    title: content?.heroHeadline ? `${content.heroHeadline} | Pawmeals` : "Subscription | Pawmeals",
    description: content?.heroDescription,
    alternates: {
      canonical: `/${locale}/subscribe`,
      languages: { "id-ID": "/id/subscribe", "en-US": "/en/subscribe" },
    },
  };
}

export default async function SubscribePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const content = await getSubscriptionContent(locale);
  const perks = content?.perks || [];
  const steps = content?.steps || [];
  const frequencies = content?.frequencies || [];

  return (
    <>
      {(content?.heroEyebrow || content?.heroHeadline || content?.heroDescription || content?.heroCtaText) && (
        <section className="bg-gradient-to-br from-pm-caramel to-pm-caramel-dark text-white section-padding">
          <div className="container max-w-4xl text-center">
            {content?.heroEyebrow && (
              <div className="inline-flex items-center gap-2 bg-white/20 text-white font-bold text-body-sm px-4 py-2 rounded-pill mb-6">
                <RefreshCw className="w-4 h-4" />
                {content.heroEyebrow}
              </div>
            )}
            {content?.heroHeadline && <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">{content.heroHeadline}</h1>}
            {content?.heroDescription && <p className="text-white/80 text-body-lg mb-8 max-w-2xl mx-auto">{content.heroDescription}</p>}
            {content?.heroCtaText && content?.heroCtaLink && (
              <Link href={normalizePublicHref(content.heroCtaLink, locale)} className="inline-flex items-center gap-2 bg-white text-pm-caramel font-bold px-8 py-4 rounded-xl hover:bg-pm-cream transition-colors text-body-lg">
                {content.heroCtaText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </section>
      )}

      {perks.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {perks.map((perk: any, index: number) => (
                <div key={`${perk.title}-${index}`} className="text-center p-6 rounded-2xl bg-pm-cream hover:shadow-warm-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-pm-caramel/10 text-pm-caramel flex items-center justify-center mx-auto mb-4">
                    <CardIcon icon={perk.icon} />
                  </div>
                  {perk.title && <h3 className="font-heading font-bold text-pm-brown mb-1">{perk.title}</h3>}
                  {perk.description && <p className="text-pm-brown/60 text-body-sm">{perk.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {steps.length > 0 && (
        <section className="section-padding bg-pm-cream">
          <div className="container max-w-4xl">
            {content?.stepsHeading && (
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl font-bold text-pm-brown">{content.stepsHeading}</h2>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step: any, index: number) => (
                <div key={`${step.title}-${index}`} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-pm-caramel text-white font-heading text-xl font-bold flex items-center justify-center mx-auto mb-4">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  {step.title && <h3 className="font-heading font-bold text-pm-brown mb-2">{step.title}</h3>}
                  {step.description && <p className="text-pm-brown/70 text-body-sm">{step.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(frequencies.length > 0 || content?.finalCtaText) && (
        <section className="section-padding bg-white">
          <div className="container max-w-2xl text-center">
            {content?.frequencyHeading && <h2 className="font-heading text-2xl font-bold text-pm-brown mb-8">{content.frequencyHeading}</h2>}
            {frequencies.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {frequencies.map((frequency: any, index: number) => {
                  const highlight = index === 0;
                  return (
                    <div key={`${frequency.label}-${index}`} className={`relative rounded-2xl border-2 p-6 transition-all ${highlight ? "border-pm-caramel bg-pm-caramel/5" : "border-pm-sand/60 hover:border-pm-caramel/40"}`}>
                      {frequency.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pm-caramel text-white text-body-xs font-bold px-3 py-1 rounded-pill whitespace-nowrap">{frequency.badge}</div>}
                      {frequency.label && <div className={`font-heading font-bold text-lg mb-1 ${highlight ? "text-pm-caramel" : "text-pm-brown"}`}>{frequency.label}</div>}
                      {frequency.savings && <div className="text-pm-brown/60 text-body-sm">{frequency.savings}</div>}
                      {highlight && <CheckCircle2 className="w-5 h-5 text-pm-caramel absolute top-4 right-4" />}
                    </div>
                  );
                })}
              </div>
            )}
            {content?.finalCtaText && content?.finalCtaLink && (
              <Link href={normalizePublicHref(content.finalCtaLink, locale)} className="inline-flex items-center gap-2 bg-pm-caramel text-white font-bold px-8 py-4 rounded-xl hover:bg-pm-caramel-dark transition-colors">
                {content.finalCtaText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </section>
      )}
    </>
  );
}
