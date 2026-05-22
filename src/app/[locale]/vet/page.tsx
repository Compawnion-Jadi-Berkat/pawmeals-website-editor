import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Shield } from "lucide-react";
import { getVetExclusiveContent } from "@/lib/sanity/client";
import type { Locale } from "@/lib/i18n/config";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getVetExclusiveContent();
  return {
    title: content?.heroHeadline ? `${content.heroHeadline} | Pawmeals` : "Vet Exclusive | Pawmeals",
    description: content?.heroSubheadline,
    alternates: {
      canonical: `/${locale}/vet`,
      languages: { "id-ID": "/id/vet", "en-US": "/en/vet" },
    },
  };
}

export default async function VetPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const content = await getVetExclusiveContent();
  const testimonials = content?.vetTestimonials || [];
  const clinics = content?.partnerClinics || [];
  const qa = content?.vetQA || [];

  return (
    <>
      {(content?.heroHeadline || content?.heroSubheadline || content?.heroImage?.asset?.url) && (
        <section className="bg-gradient-to-br from-pm-sage/20 to-pm-cream section-padding">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-pm-sage/20 text-pm-sage-dark font-bold text-body-sm px-4 py-2 rounded-pill mb-6">
                <Shield className="w-4 h-4" />
                Vet Exclusive
              </div>
              {content?.heroHeadline && <h1 className="font-heading text-4xl sm:text-5xl font-bold text-pm-brown mb-6">{content.heroHeadline}</h1>}
              {content?.heroSubheadline && <p className="text-pm-brown/70 text-body-lg mb-8 max-w-2xl">{content.heroSubheadline}</p>}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/${locale}/vet/login`} className="inline-flex items-center gap-2 bg-pm-sage text-white font-bold px-8 py-4 rounded-xl hover:bg-pm-sage-dark transition-colors">
                  <Shield className="w-5 h-5" />
                  {locale === "id" ? "Masuk Portal" : "Enter Portal"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href={`/${locale}/vet/register`} className="inline-flex items-center gap-2 border-2 border-pm-sage text-pm-sage-dark font-bold px-8 py-4 rounded-xl hover:bg-pm-sage/10 transition-colors">
                  {locale === "id" ? "Daftar Mitra" : "Register Partner"}
                </Link>
              </div>
            </div>
            {content?.heroImage?.asset?.url && (
              <div className="rounded-3xl overflow-hidden shadow-warm-md bg-white aspect-[4/3]">
                <Image src={content.heroImage.asset.url} alt={content.heroImage.alt || content.heroHeadline || "Vet Exclusive"} width={720} height={540} className="w-full h-full object-cover" priority />
              </div>
            )}
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial: any, index: number) => (
                <article key={`${testimonial.vetName}-${index}`} className="bg-pm-cream rounded-3xl p-6 shadow-warm-sm">
                  <div className="flex items-center gap-4 mb-4">
                    {testimonial.photo?.asset?.url && <Image src={testimonial.photo.asset.url} alt={testimonial.vetName} width={64} height={64} className="w-16 h-16 rounded-full object-cover" />}
                    <div>
                      {testimonial.vetName && <h2 className="font-heading font-bold text-pm-brown">{testimonial.vetName}</h2>}
                      {[testimonial.credentials, testimonial.clinicName, testimonial.location].filter(Boolean).join(" · ") && (
                        <p className="text-pm-brown/60 text-body-xs">{[testimonial.credentials, testimonial.clinicName, testimonial.location].filter(Boolean).join(" · ")}</p>
                      )}
                    </div>
                  </div>
                  {testimonial.quote && <p className="text-pm-brown/75 text-body-sm leading-relaxed">“{testimonial.quote}”</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {clinics.length > 0 && (
        <section className="section-padding bg-pm-cream">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clinics.map((clinic: any, index: number) => (
                <article key={`${clinic.clinicName}-${index}`} className="bg-white rounded-2xl p-6 border border-pm-sand/50">
                  <div className="flex gap-4 items-start">
                    {clinic.logo?.asset?.url && <Image src={clinic.logo.asset.url} alt={clinic.clinicName} width={56} height={56} className="w-14 h-14 rounded-xl object-cover" />}
                    <div>
                      {clinic.clinicName && <h2 className="font-heading font-bold text-pm-brown">{clinic.clinicName}</h2>}
                      {[clinic.address, clinic.city].filter(Boolean).join(", ") && <p className="text-pm-brown/65 text-body-sm mt-1">{[clinic.address, clinic.city].filter(Boolean).join(", ")}</p>}
                      <div className="flex flex-wrap gap-3 mt-4">
                        {clinic.googleMapsUrl && <a href={clinic.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-pm-caramel font-bold text-body-xs"><MapPin className="w-4 h-4" />Map</a>}
                        {clinic.phone && <a href={`https://wa.me/${clinic.phone}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-pm-sage-dark font-bold text-body-xs"><MessageCircle className="w-4 h-4" />WhatsApp</a>}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {qa.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container max-w-3xl space-y-4">
            {qa.map((item: any, index: number) => (
              <article key={`${item.question}-${index}`} className="rounded-2xl border border-pm-sand/60 p-6">
                {item.question && <h2 className="font-heading text-xl font-bold text-pm-brown mb-2">{item.question}</h2>}
                {item.answer && <p className="text-pm-brown/70 text-body-sm leading-relaxed">{item.answer}</p>}
                {item.answeredBy?.name && <p className="text-pm-brown/50 text-body-xs mt-4">{item.answeredBy.name}</p>}
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
