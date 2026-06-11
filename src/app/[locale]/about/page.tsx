import type { Metadata } from "next";
import Image from "next/image";
import { getAboutContent } from "@/lib/sanity/client";
import type { Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getAboutContent();
  return {
    title: content?.heroHeadline ? `${content.heroHeadline} | Pawmeals` : "About Pawmeals",
    description: content?.mission || content?.vision,
    alternates: {
      canonical: `/${locale}/about`,
      languages: { "id-ID": "/id/about", "en-US": "/en/about" },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const content = await getAboutContent();
  const proofPoints = content?.brandProof || [];
  const values = content?.values || [];
  const milestones = content?.milestones || [];

  return (
    <>
      {(content?.heroHeadline || content?.heroImage?.asset?.url || content?.mission || content?.vision) && (
        <section className="bg-pm-brown text-white section-padding">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              {content?.heroHeadline && <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">{content.heroHeadline}</h1>}
              {content?.mission && <p className="text-white/80 text-body-lg leading-relaxed mb-4">{content.mission}</p>}
              {content?.vision && <p className="text-white/70 text-body-md leading-relaxed">{content.vision}</p>}
            </div>
            {content?.heroImage?.asset?.url && (
              <div className="rounded-3xl overflow-hidden shadow-warm-lg bg-pm-cream aspect-[4/3]">
                <Image
                  src={content.heroImage.asset.url}
                  alt={content.heroImage.alt || content.heroHeadline || "Pawmeals"}
                  width={720}
                  height={540}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </section>
      )}

      {proofPoints.length > 0 && (
        <section className="bg-pm-caramel text-white py-10">
          <div className="container">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {proofPoints.map((point: any, index: number) => (
                <div key={`${point.stat}-${index}`}>
                  {point.icon && <div className="text-2xl mb-2" aria-hidden="true">{point.icon}</div>}
                  {point.stat && <div className="font-heading text-3xl sm:text-4xl font-bold mb-1">{point.stat}</div>}
                  {point.description && <div className="text-white/80 text-body-sm">{point.description}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {values.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value: any, index: number) => (
                <div key={`${value.title}-${index}`} className="text-center p-6 rounded-2xl bg-pm-cream hover:shadow-warm-md transition-shadow">
                  {value.icon && <div className="text-5xl mb-4" aria-hidden="true">{value.icon}</div>}
                  {value.title && <h2 className="font-heading font-bold text-pm-brown mb-2">{value.title}</h2>}
                  {value.description && <p className="text-pm-brown/70 text-body-sm">{value.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {milestones.length > 0 && (
        <section className="section-padding bg-pm-cream">
          <div className="container max-w-3xl">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-pm-sand/60" />
              <div className="space-y-8">
                {milestones.map((milestone: any, index: number) => (
                  <div key={`${milestone.year}-${milestone.title}-${index}`} className="flex gap-6 items-start">
                    {milestone.year && (
                      <div className="w-16 h-16 rounded-full bg-pm-caramel text-white flex items-center justify-center font-heading font-bold text-body-sm flex-shrink-0 relative z-10">
                        {milestone.year}
                      </div>
                    )}
                    <div className="pt-4">
                      {milestone.title && <h2 className="text-pm-brown font-semibold">{milestone.title}</h2>}
                      {milestone.description && <p className="text-pm-brown/70 text-body-sm mt-1">{milestone.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
