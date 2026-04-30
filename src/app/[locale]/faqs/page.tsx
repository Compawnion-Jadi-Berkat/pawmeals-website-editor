import type { Metadata } from "next";
import { FAQPageSchema } from "@/components/seo/OrganizationSchema";
import { FAQAccordion } from "@/components/faqs/FAQAccordion";
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

const getFAQs = (locale: Locale) => [
  {
    question:
      locale === "id"
        ? "Apa yang membuat Pawmeals berbeda dari makanan hewan peliharaan biasa?"
        : "What makes Pawmeals different from regular pet food?",
    answer:
      locale === "id"
        ? "Pawmeals adalah makanan masak segar yang dibuat dari bahan-bahan alami berkualitas tinggi tanpa pengawet buatan, pewarna, atau perisa sintetis. Setiap resep diformulasikan oleh ahli nutrisi hewan dan disetujui oleh dokter hewan. Berbeda dengan kibble yang diproses dengan suhu sangat tinggi, Pawmeals mempertahankan nutrisi alami dari bahan-bahan segar."
        : "Pawmeals is freshly cooked food made from high-quality natural ingredients without artificial preservatives, colors, or synthetic flavors. Every recipe is formulated by animal nutritionists and approved by veterinarians. Unlike kibble processed at very high temperatures, Pawmeals retains the natural nutrients from fresh ingredients.",
  },
  {
    question:
      locale === "id"
        ? "Apakah Pawmeals aman untuk semua ras anjing dan kucing?"
        : "Is Pawmeals safe for all dog and cat breeds?",
    answer:
      locale === "id"
        ? "Ya, Pawmeals aman untuk semua ras. Kami memiliki berbagai varian yang dirancang untuk kebutuhan spesifik — anak anjing/kucing, dewasa, senior, dan kondisi kesehatan tertentu. Gunakan kuis rekomendasi kami untuk menemukan produk yang paling sesuai dengan hewan peliharaanmu."
        : "Yes, Pawmeals is safe for all breeds. We have various variants designed for specific needs — puppies/kittens, adults, seniors, and specific health conditions. Use our recommendation quiz to find the product that best suits your pet.",
  },
  {
    question:
      locale === "id"
        ? "Berapa lama Pawmeals bisa disimpan?"
        : "How long can Pawmeals be stored?",
    answer:
      locale === "id"
        ? "Pawmeals yang belum dibuka dapat disimpan di lemari es hingga 7 hari, atau di freezer hingga 3 bulan. Setelah dibuka, habiskan dalam 3 hari jika disimpan di lemari es. Jangan simpan di suhu ruangan lebih dari 2 jam."
        : "Unopened Pawmeals can be stored in the refrigerator for up to 7 days, or in the freezer for up to 3 months. Once opened, consume within 3 days if refrigerated. Do not store at room temperature for more than 2 hours.",
  },
  {
    question:
      locale === "id"
        ? "Bagaimana cara beralih dari makanan lama ke Pawmeals?"
        : "How do I transition from old food to Pawmeals?",
    answer:
      locale === "id"
        ? "Kami merekomendasikan transisi bertahap selama 7-10 hari: Hari 1-3: 25% Pawmeals + 75% makanan lama. Hari 4-6: 50% Pawmeals + 50% makanan lama. Hari 7-9: 75% Pawmeals + 25% makanan lama. Hari 10+: 100% Pawmeals. Transisi bertahap membantu sistem pencernaan hewan peliharaanmu beradaptasi."
        : "We recommend a gradual transition over 7-10 days: Days 1-3: 25% Pawmeals + 75% old food. Days 4-6: 50% Pawmeals + 50% old food. Days 7-9: 75% Pawmeals + 25% old food. Day 10+: 100% Pawmeals. A gradual transition helps your pet's digestive system adapt.",
  },
  {
    question:
      locale === "id"
        ? "Apakah tersedia layanan berlangganan?"
        : "Is there a subscription service available?",
    answer:
      locale === "id"
        ? "Ya! Layanan berlangganan Pawmeals memungkinkan kamu menerima pengiriman otomatis setiap 2 atau 4 minggu dengan diskon 10-15%. Kamu bisa mengubah produk, frekuensi pengiriman, atau membatalkan kapan saja tanpa biaya tambahan."
        : "Yes! The Pawmeals subscription service allows you to receive automatic deliveries every 2 or 4 weeks with a 10-15% discount. You can change products, delivery frequency, or cancel at any time without additional fees.",
  },
  {
    question:
      locale === "id"
        ? "Ke mana saja Pawmeals bisa dikirim?"
        : "Where can Pawmeals be delivered?",
    answer:
      locale === "id"
        ? "Saat ini Pawmeals melayani pengiriman ke seluruh Indonesia. Pengiriman ke Jakarta, Bodetabek, Surabaya, Bandung, Bali, dan Medan tersedia dalam 1-2 hari kerja. Kota lain 3-5 hari kerja. Pengiriman internasional akan segera tersedia melalui Project Phoenix."
        : "Pawmeals currently delivers throughout Indonesia. Delivery to Jakarta, Bodetabek, Surabaya, Bandung, Bali, and Medan is available in 1-2 business days. Other cities 3-5 business days. International shipping coming soon through Project Phoenix.",
  },
  {
    question:
      locale === "id"
        ? "Apakah Pawmeals direkomendasikan oleh dokter hewan?"
        : "Is Pawmeals recommended by veterinarians?",
    answer:
      locale === "id"
        ? "Ya, Pawmeals bermitra dengan lebih dari 220 klinik veteriner di seluruh Indonesia. Produk kami telah diuji dan disetujui oleh dokter hewan berpengalaman. Banyak dokter hewan secara aktif merekomendasikan Pawmeals kepada pasien mereka sebagai bagian dari rencana nutrisi yang sehat."
        : "Yes, Pawmeals partners with over 220 veterinary clinics across Indonesia. Our products have been tested and approved by experienced veterinarians. Many vets actively recommend Pawmeals to their patients as part of a healthy nutrition plan.",
  },
  {
    question:
      locale === "id"
        ? "Bagaimana jika hewan peliharaan saya tidak suka Pawmeals?"
        : "What if my pet doesn't like Pawmeals?",
    answer:
      locale === "id"
        ? "Kami menawarkan garansi uang kembali 100% dalam 14 hari pertama jika hewan peliharaanmu tidak menyukai produk kami. Hubungi tim customer service kami melalui WhatsApp atau email dan kami akan memproses pengembalian dana penuh tanpa pertanyaan."
        : "We offer a 100% money-back guarantee within the first 14 days if your pet doesn't like our product. Contact our customer service team via WhatsApp or email and we'll process a full refund, no questions asked.",
  },
];

export default async function FAQsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const faqs = getFAQs(locale);

  return (
    <>
      <FAQPageSchema faqs={faqs} />

      {/* Header */}
      <div className="bg-white border-b border-pm-sand/50">
        <div className="container py-10 max-w-3xl">
          <p className="text-pm-caramel font-bold text-label-md uppercase tracking-widest mb-2">FAQ</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-pm-brown mb-3">
            {locale === "id" ? "Pertanyaan yang Sering Diajukan" : "Frequently Asked Questions"}
          </h1>
          <p className="text-pm-brown/70 text-body-lg">
            {locale === "id"
              ? "Tidak menemukan jawaban yang kamu cari? Hubungi kami melalui WhatsApp."
              : "Can't find the answer you're looking for? Contact us via WhatsApp."}
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="container py-10 max-w-3xl">
        <FAQAccordion faqs={faqs} locale={locale} />
      </div>
    </>
  );
}
