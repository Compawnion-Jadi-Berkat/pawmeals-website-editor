import type { Metadata } from "next";
import Link from "next/link";
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
        ? "Pawrenting Tips — Tips Merawat Hewan Peliharaan | Pawmeals"
        : "Pawrenting Tips — Pet Care Tips & Guides | Pawmeals",
    description:
      locale === "id"
        ? "Artikel dan panduan terpercaya tentang nutrisi, kesehatan, dan perawatan anjing dan kucing dari para ahli Pawmeals dan dokter hewan mitra kami."
        : "Trusted articles and guides on dog and cat nutrition, health, and care from Pawmeals experts and our partner veterinarians.",
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { "id-ID": "/id/blog", "en-US": "/en/blog" },
    },
  };
}

const PLACEHOLDER_POSTS = [
  {
    slug: "transisi-makanan-anjing",
    category: "Nutrition",
    readTime: "5 min",
    titleId: "Cara Benar Beralih ke Makanan Masak untuk Anjingmu",
    titleEn: "The Right Way to Transition Your Dog to Cooked Food",
    excerptId: "Transisi makanan yang terlalu cepat bisa menyebabkan gangguan pencernaan. Ikuti panduan 7-10 hari kami untuk hasil terbaik.",
    excerptEn: "Switching food too quickly can cause digestive upset. Follow our 7-10 day guide for the best results.",
    date: "2026-03-15",
    author: "Dr. Sari Dewi, DVM",
    emoji: "🍽️",
  },
  {
    slug: "nutrisi-anjing-senior",
    category: "Health",
    readTime: "7 min",
    titleId: "Kebutuhan Nutrisi Khusus Anjing Senior (7 Tahun ke Atas)",
    titleEn: "Special Nutritional Needs of Senior Dogs (7 Years and Above)",
    excerptId: "Seiring bertambahnya usia, kebutuhan nutrisi anjingmu berubah secara signifikan. Pelajari apa yang perlu diperhatikan.",
    excerptEn: "As your dog ages, their nutritional needs change significantly. Learn what to watch out for.",
    date: "2026-03-10",
    author: "Tim Nutrisi Pawmeals",
    emoji: "🌟",
  },
  {
    slug: "tanda-alergi-makanan-kucing",
    category: "Health",
    readTime: "6 min",
    titleId: "7 Tanda Kucing Kamu Mungkin Alergi Makanan",
    titleEn: "7 Signs Your Cat May Have a Food Allergy",
    excerptId: "Alergi makanan pada kucing sering kali tidak terdiagnosis. Kenali tanda-tandanya sebelum terlambat.",
    excerptEn: "Food allergies in cats are often undiagnosed. Recognize the signs before it's too late.",
    date: "2026-03-05",
    author: "Dr. Budi Santoso, DVM",
    emoji: "🐈",
  },
  {
    slug: "manfaat-makanan-masak-vs-kibble",
    category: "Nutrition",
    readTime: "8 min",
    titleId: "Makanan Masak vs Kibble: Mana yang Lebih Baik untuk Anjingmu?",
    titleEn: "Cooked Food vs Kibble: Which is Better for Your Dog?",
    excerptId: "Perbandingan ilmiah antara makanan masak segar dan kibble kering — kelebihan, kekurangan, dan rekomendasi para ahli.",
    excerptEn: "A scientific comparison between fresh cooked food and dry kibble — pros, cons, and expert recommendations.",
    date: "2026-02-28",
    author: "Tim Nutrisi Pawmeals",
    emoji: "🔬",
  },
  {
    slug: "hidrasi-hewan-peliharaan",
    category: "Wellness",
    readTime: "4 min",
    titleId: "Pentingnya Hidrasi untuk Kesehatan Hewan Peliharaanmu",
    titleEn: "The Importance of Hydration for Your Pet's Health",
    excerptId: "Banyak hewan peliharaan yang mengalami dehidrasi kronis tanpa pemiliknya menyadarinya. Makanan basah bisa membantu.",
    excerptEn: "Many pets suffer from chronic dehydration without their owners realizing it. Wet food can help.",
    date: "2026-02-20",
    author: "Dr. Sari Dewi, DVM",
    emoji: "💧",
  },
  {
    slug: "suplemen-anjing-aktif",
    category: "Wellness",
    readTime: "5 min",
    titleId: "Suplemen yang Dibutuhkan Anjing Aktif dan Energik",
    titleEn: "Supplements Needed by Active and Energetic Dogs",
    excerptId: "Anjing yang aktif membutuhkan nutrisi tambahan untuk mendukung performa dan pemulihan otot mereka.",
    excerptEn: "Active dogs need additional nutrients to support their performance and muscle recovery.",
    date: "2026-02-15",
    author: "Tim Nutrisi Pawmeals",
    emoji: "⚡",
  },
];

const categoryColors: Record<string, string> = {
  Nutrition: "bg-pm-caramel/10 text-pm-caramel-dark",
  Health: "bg-pm-sage/10 text-pm-sage-dark",
  Wellness: "bg-blue-50 text-blue-700",
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b border-pm-sand/50">
        <div className="container py-10">
          <p className="text-pm-caramel font-bold text-label-md uppercase tracking-widest mb-2">
            {locale === "id" ? "Blog & Tips" : "Blog & Tips"}
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-pm-brown mb-3">
            {locale === "id" ? "Pawrenting Tips" : "Pawrenting Tips"}
          </h1>
          <p className="text-pm-brown/70 text-body-lg max-w-2xl">
            {locale === "id"
              ? "Panduan terpercaya dari dokter hewan dan ahli nutrisi untuk membantu kamu menjadi pemilik hewan peliharaan yang lebih baik."
              : "Trusted guides from veterinarians and nutrition experts to help you become a better pet owner."}
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEHOLDER_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-pm-sand/40 hover:border-pm-caramel/40 hover:shadow-warm-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
            >
              <div className="aspect-video bg-gradient-to-br from-pm-caramel/10 to-pm-sand/20 flex items-center justify-center">
                <span className="text-6xl">{post.emoji}</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-body-xs font-bold px-2.5 py-1 rounded-pill ${categoryColors[post.category] ?? "bg-pm-cream text-pm-brown"}`}>
                    {post.category}
                  </span>
                  <span className="text-pm-brown/40 text-body-xs">{post.readTime} read</span>
                </div>
                <h2 className="font-heading font-bold text-pm-brown text-body-lg leading-snug mb-2 group-hover:text-pm-caramel transition-colors line-clamp-2">
                  {locale === "id" ? post.titleId : post.titleEn}
                </h2>
                <p className="text-pm-brown/60 text-body-sm line-clamp-2 flex-1 mb-4">
                  {locale === "id" ? post.excerptId : post.excerptEn}
                </p>
                <div className="flex items-center justify-between text-body-xs text-pm-brown/50">
                  <span>{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
