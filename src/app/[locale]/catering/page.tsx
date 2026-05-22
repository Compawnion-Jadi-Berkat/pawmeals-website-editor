import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { getCateringContent } from "@/lib/sanity/client";
import type { Locale } from "@/lib/i18n/config";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getCateringContent();
  return {
    title: content?.heroHeadline ? `${content.heroHeadline} | Pawmeals` : "Pawmeals Catering",
    description: content?.heroSubheadline,
    alternates: {
      canonical: `/${locale}/catering`,
      languages: { "id-ID": "/id/catering", "en-US": "/en/catering" },
    },
  };
}

export default async function CateringPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const content = await getCateringContent();
  const services = content?.services || [];
  const whatsappNumber = content?.whatsappNumber;
  const whatsappMessage = encodeURIComponent(
    locale === "id" ? "Halo Pawmeals, saya tertarik dengan layanan catering." : "Hello Pawmeals, I am interested in catering services."
  );

  return (
    <>
      {(content?.heroHeadline || content?.heroSubheadline || content?.heroImage?.asset?.url) && (
        <section className="bg-white border-b border-pm-sand/50">
          <div className="container py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              {content?.heroHeadline && (
                <h1 className="font-heading text-4xl sm:text-5xl font-bold text-pm-brown mb-4">{content.heroHeadline}</h1>
              )}
              {content?.heroSubheadline && <p className="text-pm-brown/70 text-body-lg mb-8">{content.heroSubheadline}</p>}
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-pm-caramel text-white px-6 py-3 rounded-pill font-bold hover:bg-pm-caramel-dark transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  {content?.ctaText || (locale === "id" ? "Pesan via WhatsApp" : "Order via WhatsApp")}
                </a>
              )}
            </div>
            {content?.heroImage?.asset?.url && (
              <div className="rounded-3xl overflow-hidden shadow-warm-md bg-pm-cream aspect-[4/3]">
                <Image
                  src={content.heroImage.asset.url}
                  alt={content.heroImage.alt || content.heroHeadline || "Pawmeals catering"}
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

      {services.length > 0 && (
        <section className="section-padding bg-pm-cream">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service: any, index: number) => (
                <article key={`${service.title}-${index}`} className="bg-white rounded-3xl p-6 shadow-warm-sm border border-pm-sand/40">
                  {service.icon && <div className="text-3xl mb-4" aria-hidden="true">{service.icon}</div>}
                  {service.title && <h2 className="font-heading text-2xl font-bold text-pm-brown mb-3">{service.title}</h2>}
                  {service.description && <p className="text-pm-brown/70 text-body-sm leading-relaxed mb-5">{service.description}</p>}
                  {service.price && <p className="font-heading text-xl font-bold text-pm-caramel">{service.price}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
