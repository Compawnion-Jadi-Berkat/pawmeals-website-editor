import React from "react";
import Image from "next/image";
import { Award, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

interface VetPartner {
  name: string;
  clinic: string;
  location: string;
  quote: string;
  photo?: { asset: { url: string } };
}

interface VetEndorsementProps {
  locale: Locale;
  vetPartners: VetPartner[] | null;
}

export function VetEndorsement({ locale, vetPartners }: VetEndorsementProps) {
  const displayVets = vetPartners?.filter((vet) => vet.name && vet.quote) ?? [];

  if (displayVets.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-pm-cream" aria-labelledby="vet-endorsement-heading">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-pm-sage/15 text-pm-sage-dark rounded-pill px-4 py-1.5 text-label-sm font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            {locale === "id" ? "Dipercaya Dokter Hewan" : "Trusted by Vets"}
          </div>
          <h2
            id="vet-endorsement-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-pm-brown mb-4"
          >
            {locale === "id" ? "Rekomendasi Dokter Hewan" : "Veterinarian Recommendations"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {displayVets.map((vet, index) => (
            <div
              key={`${vet.name}-${index}`}
              className="bg-white rounded-2xl p-6 shadow-warm-sm hover:shadow-warm-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                {vet.photo?.asset?.url && (
                  <Image
                    src={vet.photo.asset.url}
                    alt={vet.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div>
                  <p className="font-bold text-pm-brown text-body-sm">{vet.name}</p>
                  {vet.clinic && <p className="text-pm-brown/60 text-body-xs">{vet.clinic}</p>}
                  {vet.location && <p className="text-pm-brown/50 text-body-xs">{vet.location}</p>}
                </div>
              </div>
              <blockquote className="text-pm-brown/80 text-body-sm leading-relaxed italic">
                &ldquo;{vet.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-1 mt-3">
                <CheckCircle2 className="w-4 h-4 text-pm-sage" />
                <span className="text-pm-sage-dark text-body-xs font-semibold">
                  {locale === "id" ? "Dokter Hewan Terverifikasi" : "Verified Veterinarian"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
