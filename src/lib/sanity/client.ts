import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { WebsiteProduct } from "@/types/site-content";

const CANONICAL_SANITY_PROJECT_ID = "lr00lxe1";
const CANONICAL_SANITY_DATASET = "production";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || CANONICAL_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || CANONICAL_SANITY_DATASET;
// Sanity is always configured — Pawmeals Studio lives in the canonical project.
const isSanityConfigured = true;
const shouldTryCanonicalFallback =
  projectId !== CANONICAL_SANITY_PROJECT_ID || dataset !== CANONICAL_SANITY_DATASET;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  // Default to the live API so Studio publishes are reflected immediately on the website.
  // Set NEXT_PUBLIC_SANITY_USE_CDN=true only if cached reads are intentionally preferred.
  useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === "true",
  // Published website content is public. Avoid attaching SANITY_API_TOKEN here because
  // a stale or invalid Vercel token makes otherwise public reads fail and empties pages.
  perspective: "published",
});

const canonicalSanityClient = createClient({
  projectId: CANONICAL_SANITY_PROJECT_ID,
  dataset: CANONICAL_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === "true",
  // Published website content is public. Avoid attaching SANITY_API_TOKEN here because
  // a stale or invalid Vercel token makes otherwise public reads fail and empties pages.
  perspective: "published",
});

async function fetchWithCanonicalFallback<T>(
  query: string,
  params: Record<string, unknown> = {},
  isUsable: (value: T | null | undefined) => boolean,
  label: string,
  fallbackValue: T,
): Promise<T> {
  try {
    const primaryResult = await sanityClient.fetch<T>(query, params);
    if (isUsable(primaryResult)) return primaryResult;

    if (shouldTryCanonicalFallback) {
      const canonicalResult = await canonicalSanityClient.fetch<T>(query, params);
      if (isUsable(canonicalResult)) return canonicalResult;
    }

    return primaryResult ?? fallbackValue;
  } catch (primaryError) {
    console.warn(`[Sanity] ${label} primary fetch failed:`, primaryError);

    if (shouldTryCanonicalFallback) {
      try {
        const canonicalResult = await canonicalSanityClient.fetch<T>(query, params);
        if (isUsable(canonicalResult)) return canonicalResult;
      } catch (canonicalError) {
        console.warn(`[Sanity] ${label} canonical fallback failed:`, canonicalError);
      }
    }

    return fallbackValue;
  }
}

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
  *[
    _type == "homepage"
    && !(_id in path("drafts.**"))
    && (
      language == $locale
      || _id == "homepage__" + $locale
      || (!defined(language) && $locale == "id")
    )
  ] | order(select(_id == "homepage__" + $locale => 0, language == $locale => 1, 2))[0] {
    heroSlides[] {
      headline,
      subheadline,
      ctaText,
      ctaLink,
      layout,
      image { asset->{ _id, url, metadata { dimensions } }, alt }
    },
    whyPawmeals[] {
      icon,
      iconImage { asset->{ _id, url }, alt },
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
    },
    quizCta {
      eyebrow,
      headline,
      description,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      highlights
    },
    instagramFeed {
      handle,
      headline,
      ctaText,
      url,
      posts[] {
        label,
        url,
        image { asset->{ _id, url }, alt }
      }
    },
    newsletterSignup {
      headline,
      description,
      placeholder,
      buttonText,
      successMessage,
      invalidEmailMessage,
      errorMessage,
      privacyText,
      perks
    }
  }
`;

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings" && _id == "siteSettings" && !(_id in path("drafts.**"))][0] {
    brandName,
    tagline,
    logo { asset->{ _id, url }, alt },
    defaultOgImage { asset->{ _id, url }, alt },
    navItems[] { label, href },
    footerLinks[] { label, href, group },
    socials[] { platform, url },
    whatsappNumber,
    email,
    phone,
    location,
    vetClinicCount,
    primaryColor,
    accentColor,
    beigeColor,
    charcoalColor,
    headingFont,
    bodyFont,
    hideFooterWhatsAppBar,
    navItems[] { label, href, iconImage { asset->{ _id, url }, alt } },
    socials[] { platform, label, url, iconImage { asset->{ _id, url }, alt } }
  }
`;

export const PRODUCT_CATEGORIES_QUERY = `
  *[_type == "productCategory" && !(_id in path("drafts.**"))] | order(coalesce(order, 100) asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    iconImage { asset->{ _id, url }, alt },
    order
  }
`;

export const SANITY_PRODUCTS_QUERY = `
  *[
    _type == "product"
    && !(_id in path("drafts.**"))
    && (!defined(availableLocales) || $locale in availableLocales)
  ] | order(coalesce(sortOrder, 100) asc, title asc) {
    _id,
    title,
    "handle": slug.current,
    shortDescription,
    ctaLabel,
    longDescription,
    featured,
    sortOrder,
    pricingTiers,
    ingredients,
    feedingGuide,
    badges,
    category->{
      _id,
      title,
      "slug": slug.current,
      description,
      icon,
      iconImage { asset->{ _id, url }, alt },
      order
    },
    images[] {
      asset->{ _id, url, metadata { dimensions } },
      alt
    }
  }
`;

export const SANITY_PRODUCT_BY_HANDLE_QUERY = `
  *[
    _type == "product"
    && !(_id in path("drafts.**"))
    && slug.current == $handle
    && (!defined(availableLocales) || $locale in availableLocales)
  ][0] {
    _id,
    title,
    "handle": slug.current,
    shortDescription,
    ctaLabel,
    longDescription,
    featured,
    sortOrder,
    pricingTiers,
    ingredients,
    feedingGuide,
    badges,
    category->{
      _id,
      title,
      "slug": slug.current,
      description,
      icon,
      iconImage { asset->{ _id, url }, alt },
      order
    },
    images[] {
      asset->{ _id, url, metadata { dimensions } },
      alt
    }
  }
`;

export const FEATURED_SANITY_PRODUCTS_QUERY = `
  *[
    _type == "product"
    && !(_id in path("drafts.**"))
    && featured == true
    && (!defined(availableLocales) || $locale in availableLocales)
  ] | order(coalesce(sortOrder, 100) asc, title asc)[0...4] {
    _id,
    title,
    "handle": slug.current,
    shortDescription,
    ctaLabel,
    longDescription,
    featured,
    sortOrder,
    pricingTiers,
    ingredients,
    feedingGuide,
    badges,
    category->{
      _id,
      title,
      "slug": slug.current,
      description,
      icon,
      iconImage { asset->{ _id, url }, alt },
      order
    },
    images[] {
      asset->{ _id, url, metadata { dimensions } },
      alt
    }
  }
`;

export const SUBSCRIPTION_PAGE_QUERY = `
  *[
    _type == "subscriptionPage"
    && !(_id in path("drafts.**"))
    && (
      language == $locale
      || _id == "subscriptionPage__" + $locale
      || (!defined(language) && $locale == "id")
    )
  ] | order(select(_id == "subscriptionPage__" + $locale => 0, language == $locale => 1, 2))[0] {
    heroEyebrow,
    heroHeadline,
    heroDescription,
    heroCtaText,
    heroCtaLink,
    discountBadge,
    perks[] { icon, title, description },
    stepsHeading,
    steps[] { icon, title, description },
    frequencyHeading,
    frequencies[] { label, badge, savings },
    finalCtaText,
    finalCtaLink
  }
`;

export const CATERING_QUERY = `
  *[_type == "cateringPage" && !(_id in path("drafts.**"))][0] {
    heroHeadline,
    heroSubheadline,
    heroImage { asset->{ _id, url }, alt },
    whatsappNumber,
    ctaText,
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
    heroHeadline,
    heroImage { asset->{ _id, url }, alt },
    story,
    mission,
    vision,
    brandProof[] { stat, description, icon },
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
export async function getHomepageContent(locale: string = "id") {
  if (!isSanityConfigured) return null;
  return fetchWithCanonicalFallback<any | null>(
    HOMEPAGE_QUERY,
    { locale },
    (content) => Boolean(content && (
      content.heroSlides?.length ||
      content.whyPawmeals?.length ||
      content.featuredTestimonials?.length ||
      content.vetPartners?.length ||
      content.quizCta ||
      content.instagramFeed ||
      content.newsletterSignup
    )),
    "getHomepageContent",
    null,
  );
}

function mapSanityProduct(product: any): WebsiteProduct {
  const firstImage = product.images?.[0];
  const firstTier = product.pricingTiers?.find((tier: any) => typeof tier?.priceIDR === "number");
  const fallbackVariantId = `sanity-${product._id || product.handle || product.title}`;

  return {
    id: product._id,
    title: product.title,
    handle: product.handle,
    description: product.shortDescription,
    longDescription: product.longDescription,
    featuredImage: firstImage?.asset?.url
      ? { url: firstImage.asset.url, altText: firstImage.alt || product.title }
      : null,
    images: (product.images || [])
      .filter((image: any) => image?.asset?.url)
      .map((image: any) => ({ url: image.asset.url, altText: image.alt || product.title })),
    tags: [product.category?.slug, ...(product.badges || [])].filter(Boolean),
    category: product.category || null,
    pricingTiers: product.pricingTiers || [],
    ingredients: product.ingredients || [],
    feedingGuide: product.feedingGuide,
    priceRange: {
      minVariantPrice: {
        amount: String(firstTier?.priceIDR ?? 0),
        currencyCode: "IDR",
      },
    },
    variants: { edges: [{ node: { id: fallbackVariantId, availableForSale: true } }] },
    vendor: "Pawmeals",
    featured: Boolean(product.featured),
    ctaLabel: product.ctaLabel || undefined,
  };
}

export async function getSiteSettings() {
  if (!isSanityConfigured) return null;
  return fetchWithCanonicalFallback<any | null>(
    SITE_SETTINGS_QUERY,
    {},
    (settings) => Boolean(settings && (settings.brandName || settings.navItems?.length || settings.footerLinks?.length)),
    "getSiteSettings",
    null,
  );
}

export async function getProductCategories() {
  if (!isSanityConfigured) return [];
  return fetchWithCanonicalFallback<any[]>(
    PRODUCT_CATEGORIES_QUERY,
    {},
    (categories) => Boolean(categories?.length),
    "getProductCategories",
    [],
  );
}

export async function getSanityProducts(locale: string = "id") {
  if (!isSanityConfigured) return [];
  const products = await fetchWithCanonicalFallback<any[]>(
    SANITY_PRODUCTS_QUERY,
    { locale },
    (items) => Boolean(items?.length),
    "getSanityProducts",
    [],
  );
  return (products || []).map(mapSanityProduct);
}

export async function getFeaturedSanityProducts(locale: string = "id") {
  if (!isSanityConfigured) return [];
  const products = await fetchWithCanonicalFallback<any[]>(
    FEATURED_SANITY_PRODUCTS_QUERY,
    { locale },
    (items) => Boolean(items?.length),
    "getFeaturedSanityProducts",
    [],
  );
  return (products || []).map(mapSanityProduct);
}

export async function getSanityProductByHandle(handle: string, locale: string = "id") {
  if (!isSanityConfigured) return null;
  const product = await fetchWithCanonicalFallback<any | null>(
    SANITY_PRODUCT_BY_HANDLE_QUERY,
    { handle, locale },
    (item) => Boolean(item?._id),
    "getSanityProductByHandle",
    null,
  );
  return product ? mapSanityProduct(product) : null;
}
export async function getSubscriptionContent(locale: string = "id") {
  if (!isSanityConfigured) return null;
  try { return await sanityClient.fetch(SUBSCRIPTION_PAGE_QUERY, { locale }); }
  catch (e) { console.warn("[Sanity] getSubscriptionContent failed:", e); return null; }
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

export const PRODUCTS_PAGE_QUERY = `
  *[
    _type == "productsPage"
    && !(_id in path("drafts.**"))
    && (
      language == $locale
      || _id == "productsPage__" + $locale
      || (!defined(language) && $locale == "id")
    )
  ] | order(select(_id == "productsPage__" + $locale => 0, language == $locale => 1, 2))[0] {
    eyebrow,
    headline,
    intro,
    categoryHeadlines[] { slug, eyebrow, headline, intro }
  }
`;

export async function getProductsPageContent(locale: string = "id") {
  if (!isSanityConfigured) return null;
  return fetchWithCanonicalFallback<any | null>(
    PRODUCTS_PAGE_QUERY,
    { locale },
    (c) => Boolean(c && (c.headline || c.intro || c.categoryHeadlines?.length)),
    "getProductsPageContent",
    null,
  );
}
