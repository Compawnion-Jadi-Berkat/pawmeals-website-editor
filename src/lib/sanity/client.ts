import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN, // only needed for mutations
  perspective: "published",
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function urlForImage(source: SanityImageSource, options?: {
  width?: number;
  height?: number;
  quality?: number;
  format?: "webp" | "jpg" | "png";
}) {
  let img = builder.image(source).auto("format");

  if (options?.width) img = img.width(options.width);
  if (options?.height) img = img.height(options.height);
  if (options?.quality) img = img.quality(options.quality);
  if (options?.format) img = img.format(options.format);

  return img.url();
}

// ─── GROQ QUERIES ─────────────────────────────────────────────────────────────

// Blog posts
export const BLOG_POSTS_QUERY = `
  *[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug { current },
    excerpt,
    publishedAt,
    readingTime,
    category,
    tags,
    featuredImage {
      asset->{ _id, url, metadata { dimensions } },
      alt
    },
    author-> {
      name,
      role,
      photo { asset->{ _id, url } }
    },
    seo { title, description }
  }
`;

export const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug { current },
    excerpt,
    publishedAt,
    readingTime,
    category,
    tags,
    body,
    featuredImage {
      asset->{ _id, url, metadata { dimensions } },
      alt
    },
    author-> {
      name,
      role,
      bio,
      photo { asset->{ _id, url } },
      credentials
    },
    relatedPosts[]-> {
      _id,
      title,
      slug { current },
      excerpt,
      publishedAt,
      featuredImage {
        asset->{ _id, url },
        alt
      }
    },
    seo { title, description }
  }
`;

// FAQs
export const FAQS_QUERY = `
  *[_type == "faq" && !(_id in path("drafts.**"))] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;

// Vet content
export const VET_ARTICLES_QUERY = `
  *[_type == "vetArticle" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug { current },
    excerpt,
    publishedAt,
    category,
    featuredImage {
      asset->{ _id, url },
      alt
    },
    author-> {
      name,
      credentials,
      photo { asset->{ _id, url } }
    }
  }
`;

// Homepage content
export const HOMEPAGE_QUERY = `
  *[_type == "homepage" && !(_id in path("drafts.**"))][0] {
    heroSlides[] {
      headline,
      subheadline,
      ctaText,
      ctaLink,
      image { asset->{ _id, url, metadata { dimensions } }, alt }
    },
    whyPawmeals[] {
      icon,
      title,
      description
    },
    featuredTestimonials[] {
      customerName,
      petName,
      petBreed,
      review,
      rating,
      photo { asset->{ _id, url } }
    },
    vetPartners[] {
      clinicName,
      vetName,
      location,
      quote,
      photo { asset->{ _id, url } }
    }
  }
`;

// Catering page
export const CATERING_QUERY = `
  *[_type == "cateringPage" && !(_id in path("drafts.**"))][0] {
    heroHeadline,
    heroSubheadline,
    services[] {
      title,
      description,
      icon,
      price
    },
    gallery[] {
      asset->{ _id, url },
      alt
    },
    testimonials[] {
      name,
      organization,
      quote,
      photo { asset->{ _id, url } }
    }
  }
`;

// About page
export const ABOUT_QUERY = `
  *[_type == "aboutPage" && !(_id in path("drafts.**"))][0] {
    story,
    mission,
    vision,
    values[] { title, description, icon },
    team[] {
      name,
      role,
      bio,
      photo { asset->{ _id, url } }
    },
    milestones[] { year, title, description },
    certifications[] {
      name,
      logo { asset->{ _id, url } },
      description
    }
  }
`;

// ─── FETCH HELPERS ────────────────────────────────────────────────────────────

export async function getBlogPosts(locale: string = "id") {
  const posts = await sanityClient.fetch(BLOG_POSTS_QUERY);
  return posts;
}

export async function getBlogPostBySlug(slug: string) {
  return sanityClient.fetch(BLOG_POST_BY_SLUG_QUERY, { slug });
}

export async function getFAQs() {
  return sanityClient.fetch(FAQS_QUERY);
}

export async function getVetArticles() {
  return sanityClient.fetch(VET_ARTICLES_QUERY);
}

export async function getHomepageContent() {
  return sanityClient.fetch(HOMEPAGE_QUERY);
}

export async function getCateringContent() {
  return sanityClient.fetch(CATERING_QUERY);
}

export async function getAboutContent() {
  return sanityClient.fetch(ABOUT_QUERY);
}
