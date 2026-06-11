import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/sanity/client";
import type { Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

const categoryColors: Record<string, string> = {
  Nutrition: "bg-pm-caramel/10 text-pm-caramel-dark",
  Health: "bg-pm-sage/10 text-pm-sage-dark",
  Wellness: "bg-blue-50 text-blue-700",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Pawrenting Tips | Pawmeals",
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { "id-ID": "/id/blog", "en-US": "/en/blog" },
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const posts = await getBlogPosts(locale);

  return (
    <>
      <div className="bg-white border-b border-pm-sand/50">
        <div className="container py-10">
          <p className="text-pm-caramel font-bold text-label-md uppercase tracking-widest mb-2">Blog & Tips</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-pm-brown mb-3">Pawrenting Tips</h1>
        </div>
      </div>

      {posts.length > 0 && (
        <div className="container section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <Link key={post._id || post.slug?.current} href={`/${locale}/blog/${post.slug?.current}`} className="group bg-white rounded-2xl overflow-hidden border border-pm-sand/40 hover:border-pm-caramel/40 hover:shadow-warm-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
                {post.featuredImage?.asset?.url && (
                  <div className="aspect-video bg-pm-cream relative overflow-hidden">
                    <Image src={post.featuredImage.asset.url} alt={post.featuredImage.alt || post.title || ""} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {post.category && <span className={`text-body-xs font-bold px-2.5 py-1 rounded-pill ${categoryColors[post.category] ?? "bg-pm-cream text-pm-brown"}`}>{post.category}</span>}
                    {post.readingTime && <span className="text-pm-brown/40 text-body-xs">{post.readingTime}</span>}
                  </div>
                  {post.title && <h2 className="font-heading font-bold text-pm-brown text-body-lg leading-snug mb-2 group-hover:text-pm-caramel transition-colors line-clamp-2">{post.title}</h2>}
                  {post.excerpt && <p className="text-pm-brown/60 text-body-sm line-clamp-2 flex-1 mb-4">{post.excerpt}</p>}
                  <div className="flex items-center justify-between text-body-xs text-pm-brown/50">
                    {post.author?.name && <span>{post.author.name}</span>}
                    {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", { day: "numeric", month: "short", year: "numeric" })}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
