import type { Metadata } from "next";
import { FAQPageSchema } from "@/components/seo/OrganizationSchema";
import { FAQAccordion } from "@/components/faqs/FAQAccordion";
import { getFAQs } from "@/lib/sanity/client";
import type { Locale } from "@/lib/i18n/config";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === "id"
        ? "FAQ — Pertanyaan yang Sering Diajukan | Pawmeals"
        : "FAQ — Frequently Asked Questions | Pawmeals",
    description:
      locale === "id"
        ? "Temukan jawaban atas pertanyaan umum tentang produk Pawmeals, pengiriman, langganan, dan nutrisi hewan peliharaan."
        : "Find answers to common questions about Pawmeals products, delivery, subscriptions, and pet nutrition.",
    alternates: {
      canonical: `/${locale}/faqs`,
      languages: { "id-ID": "/id/faqs", "en-US": "/en/faqs" },
    },
  };
}

export default async function FAQsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const faqs = await getFAQs();

  return (
    <>
      <FAQPageSchema faqs={faqs} />

      <div className="bg-white border-b border-pm-sand/50">
        <div className="container py-10 max-w-3xl">
          <p className="text-pm-caramel font-bold text-label-md uppercase tracking-widest mb-2">FAQ</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-pm-brown mb-3">
            {locale === "id" ? "Pertanyaan yang Sering Diajukan" : "Frequently Asked Questions"}
          </h1>
        </div>
      </div>

      {faqs.length > 0 && (
        <div className="container py-10 max-w-3xl">
          <FAQAccordion faqs={faqs} locale={locale} />
        </div>
      )}
    </>
  );
}
