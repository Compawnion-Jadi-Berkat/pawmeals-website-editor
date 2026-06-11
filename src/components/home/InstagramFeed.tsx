import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";

interface InstagramPost {
  label?: string;
  url?: string;
  image?: { asset?: { url: string }; alt?: string };
}

interface InstagramFeedContent {
  handle?: string;
  headline?: string;
  ctaText?: string;
  url?: string;
  posts?: InstagramPost[];
}

interface InstagramFeedProps {
  content: InstagramFeedContent | null;
}

export function InstagramFeed({ content }: InstagramFeedProps) {
  if (!content?.headline && !content?.handle && !content?.posts?.length) return null;
  const feedUrl = content?.url || undefined;

  return (
    <section className="section-padding bg-pm-cream">
      <div className="container">
        <div className="text-center mb-8">
          {content?.handle && (
            <div className="inline-flex items-center gap-2 text-pm-brown/70 mb-3">
              <Camera className="w-5 h-5" aria-hidden="true" />
              <span className="font-bold text-body-sm">{content.handle}</span>
            </div>
          )}
          {content?.headline && <h2 className="font-heading text-2xl sm:text-3xl font-bold text-pm-brown">{content.headline}</h2>}
        </div>

        {content?.posts?.length ? (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-6">
            {content.posts.map((post, index) => {
              const href = post.url || feedUrl;
              if (!post.image?.asset?.url) return null;
              const tile = (
                <div className="group aspect-square rounded-2xl border border-pm-sand/50 bg-white overflow-hidden hover:-translate-y-1 hover:shadow-warm-md transition-all duration-200">
                  <Image src={post.image.asset.url} alt={post.image.alt || post.label || content.handle || "Instagram post"} width={320} height={320} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              );
              return href ? (
                <Link key={`${post.label}-${index}`} href={href} target="_blank" rel="noopener noreferrer" aria-label={post.label || content.handle || "Instagram"}>
                  {tile}
                </Link>
              ) : (
                <div key={`${post.label}-${index}`}>{tile}</div>
              );
            })}
          </div>
        ) : null}

        {feedUrl && content?.ctaText && (
          <div className="text-center">
            <Link href={feedUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-pm-brown/20 text-pm-brown font-bold px-6 py-3 rounded-pill hover:border-pm-caramel hover:text-pm-caramel transition-colors">
              <Camera className="w-4 h-4" aria-hidden="true" />
              {content.ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
