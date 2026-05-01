import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "lr00lxe1";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
// Sanity is always configured — project ID lr00lxe1 is hardcoded as fallback
const isSanityConfigured = true;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
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

export const FAQS_QUERY = `
  *[_type == "faq" && !(_id in path("drafts.**"))] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;

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

//// ─── FETCH HELPERS ────────────────────────────────────────────────────────────
// All helpers return empty/null gracefully when Sanity is not configured or
// when the network request fails (e.g. during local dev without credentials).
export async function getBlogPosts(_locale: string = "id") {
  if (!isSanityConfigured) return [];
  try { return await sanityClient.fetch(BLOG_POSTS_QUERY); }
  catch (e) { console.warn("[Sanity] getBlogPosts failed:", e); return []; }
}
export async function getBlogPostBySlug(slug: string) {
  if (!isSanityConfigured) return null;
  try { return await sanityClient.fetch(BLOG_POST_BY_SLUG_QUERY, { slug }); }
  catch (e) { console.warn("[Sanity] getBlogPostBySlug failed:", e); return null; }
}
export async function getFAQs() {
  if (!isSanityConfigured) return [];
  try { return await sanityClient.fetch(FAQS_QUERY); }
  catch (e) { console.warn("[Sanity] getFAQs failed:", e); return []; }
}
export async function getVetArticles() {
  if (!isSanityConfigured) return [];
  try { return await sanityClient.fetch(VET_ARTICLES_QUERY); }
  catch (e) { console.warn("[Sanity] getVetArticles failed:", e); return []; }
}
export async function getHomepageContent() {
  if (!isSanityConfigured) return null;
  try { return await sanityClient.fetch(HOMEPAGE_QUERY); }
  catch (e) { console.warn("[Sanity] getHomepageContent failed:", e); return null; }
}
export async function getCateringContent() {
  if (!isSanityConfigured) return null;
  try { return await sanityClient.fetch(CATERING_QUERY); }
  catch (e) { console.warn("[Sanity] getCateringContent failed:", e); return null; }
}
export async function getAboutContent() {
  if (!isSanityConfigured) return null;
  try { return await sanityClient.fetch(ABOUT_QUERY); }
  catch (e) { console.warn("[Sanity] getAboutContent failed:", e); return null; }
}

export const PAWRENTING_TIPS_QUERY = `
  *[_type == "pawrentingTip" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
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
      credentials,
      photo { asset->{ _id, url } }
    },
    seo { title, description }
  }
`;

export const PAWRENTING_TIP_BY_SLUG_QUERY = `
  *[_type == "pawrentingTip" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
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
      credentials,
      bio,
      photo { asset->{ _id, url } }
    },
    relatedProducts,
    seo { title, description }
  }
`;

export const VET_EXCLUSIVE_QUERY = `
  *[_type == "vetExclusivePage" && !(_id in path("drafts.**"))][0] {
    heroHeadline,
    heroSubheadline,
    heroImage { asset->{ _id, url }, alt },
    vetTestimonials[] {
      vetName,
      credentials,
      clinicName,
      location,
      quote,
      photo { asset->{ _id, url } }
    },
    partnerClinics[] {
      clinicName,
      address,
      city,
      phone,
      googleMapsUrl,
      logo { asset->{ _id, url } }
    },
    vetQA[] {
      question,
      answer,
      answeredBy-> { name, credentials, photo { asset->{ _id, url } } }
    }
  }
`;

export const CATERING_FULL_QUERY = `
  *[_type == "cateringPage" && !(_id in path("drafts.**"))][0] {
    heroHeadline,
    heroSubheadline,
    heroImage { asset->{ _id, url }, alt },
    services[] {
      title,
      description,
      icon,
      price,
      image { asset->{ _id, url } }
    },
    howItWorks[] { step, title, description },
    gallery[] { asset->{ _id, url }, alt },
    testimonials[] {
      name,
      organization,
      quote,
      photo { asset->{ _id, url } }
    },
    whatsappNumber,
    ctaText
  }
`;

export const ABOUT_FULL_QUERY = `
  *[_type == "aboutPage" && !(_id in path("drafts.**"))][0] {
    heroHeadline,
    heroImage { asset->{ _id, url }, alt },
    story,
    pawmiracleStory,
    pawmiracleImage { asset->{ _id, url } },
    mission,
    vision,
    values[] { title, description, icon },
    brandProof[] { stat, description, icon },
    team[] {
      name,
      role,
      bio,
      photo { asset->{ _id, url } }
    },
    milestones[] { year, title, description },
    certifications[] {
      name,
      description,
      logo { asset->{ _id, url } }
    }
  }
`;

export async function getPawrentingTips() {
  if (!isSanityConfigured) return [];
  try { return await sanityClient.fetch(PAWRENTING_TIPS_QUERY); }
  catch (e) { console.warn("[Sanity] getPawrentingTips failed:", e); return []; }
}
export async function getPawrentingTipBySlug(slug: string) {
  if (!isSanityConfigured) return null;
  try { return await sanityClient.fetch(PAWRENTING_TIP_BY_SLUG_QUERY, { slug }); }
  catch (e) { console.warn("[Sanity] getPawrentingTipBySlug failed:", e); return null; }
}
export async function getVetExclusiveContent() {
  if (!isSanityConfigured) return null;
  try { return await sanityClient.fetch(VET_EXCLUSIVE_QUERY); }
  catch (e) { console.warn("[Sanity] getVetExclusiveContent failed:", e); return null; }
}
export async function getCateringFullContent() {
  if (!isSanityConfigured) return null;
  try { return await sanityClient.fetch(CATERING_FULL_QUERY); }
  catch (e) { console.warn("[Sanity] getCateringFullContent failed:", e); return null; }
}
export async function getAboutFullContent() {
  if (!isSanityConfigured) return null;
  try { return await sanityClient.fetch(ABOUT_FULL_QUERY); }
  catch (e) { console.warn("[Sanity] getAboutFullContent failed:", e); return null; }
}
