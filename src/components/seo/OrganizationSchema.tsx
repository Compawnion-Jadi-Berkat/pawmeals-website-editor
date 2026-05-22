import type { Locale } from "@/lib/i18n/config";
import type { SiteSettingsContent } from "@/types/site-content";

interface OrganizationSchemaProps {
  locale: Locale;
  siteSettings?: SiteSettingsContent | null;
}

export function OrganizationSchema({ locale, siteSettings }: OrganizationSchemaProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pawmeals.com";
  const brandName = siteSettings?.brandName || "Pawmeals";
  const sameAs = [
    ...(siteSettings?.socials?.map((social) => social.url).filter(Boolean) ?? []),
    siteSettings?.whatsappNumber ? `https://wa.me/${siteSettings.whatsappNumber.replace(/[^0-9]/g, "")}` : undefined,
  ].filter(Boolean);
  const offerItems = siteSettings?.navItems
    ?.filter((item) => item.href?.includes("products") || item.href?.includes("catering") || item.href?.includes("vet"))
    .map((item) => ({
      "@type": "OfferCatalog",
      name: item.label,
      url: item.href.startsWith("http") ? item.href : `${siteUrl}${item.href}`,
    }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: brandName,
    alternateName: brandName,
    url: siteUrl,
    logo: siteSettings?.logo?.asset?.url
      ? {
          "@type": "ImageObject",
          url: siteSettings.logo.asset.url,
        }
      : undefined,
    description: siteSettings?.tagline,
    foundingLocation: siteSettings?.location
      ? {
          "@type": "Place",
          name: siteSettings.location,
          addressCountry: "ID",
        }
      : undefined,
    address: siteSettings?.location
      ? {
          "@type": "PostalAddress",
          addressCountry: "ID",
          streetAddress: siteSettings.location,
        }
      : undefined,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: locale === "id" ? ["Indonesian", "English"] : ["English", "Indonesian"],
        telephone: siteSettings?.phone,
        email: siteSettings?.email,
      },
    ].filter((point) => point.telephone || point.email),
    sameAs,
    hasOfferCatalog: offerItems?.length
      ? {
          "@type": "OfferCatalog",
          name: `${brandName} Catalogue`,
          itemListElement: offerItems,
        }
      : undefined,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }} />;
}

// ─── PRODUCT SCHEMA ───────────────────────────────────────────────────────────

interface ProductSchemaProps {
  product: {
    title: string;
    description?: string;
    handle: string;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    featuredImage?: { url: string; altText?: string | null } | null;
    variants?: { edges: { node: { availableForSale: boolean; sku?: string | null } }[] };
    vendor?: string;
    tags?: string[];
    category?: { title?: string } | null;
  };
  locale: string;
}

export function ProductSchema({ product, locale }: ProductSchemaProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pawmeals.com";
  const variant = product.variants?.edges?.[0]?.node;
  const isAvailable = variant?.availableForSale ?? true;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || product.title,
    url: `${siteUrl}/${locale}/products/${product.handle}`,
    image: product.featuredImage?.url,
    brand: {
      "@type": "Brand",
      name: product.vendor || "Pawmeals",
    },
    sku: variant?.sku,
    offers: {
      "@type": "Offer",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      price: product.priceRange.minVariantPrice.amount,
      availability: isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: product.vendor || "Pawmeals",
      },
      url: `${siteUrl}/${locale}/products/${product.handle}`,
    },
    category: product.category?.title || product.tags?.[0],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }} />;
}

// ─── FAQ SCHEMA ───────────────────────────────────────────────────────────────

interface FAQSchemaProps {
  faqs: { question: string; answer: string }[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }} />;
}

// ─── ARTICLE SCHEMA ───────────────────────────────────────────────────────────

interface ArticleSchemaProps {
  article: {
    title: string;
    excerpt?: string;
    publishedAt: string;
    slug: { current: string };
    author?: { name: string; credentials?: string };
    featuredImage?: { asset: { url: string } };
  };
  locale: string;
}

export function ArticleSchema({ article, locale }: ArticleSchemaProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pawmeals.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    url: `${siteUrl}/${locale}/blog/${article.slug.current}`,
    image: article.featuredImage?.asset?.url,
    author: {
      "@type": "Person",
      name: article.author?.name,
      jobTitle: article.author?.credentials,
    },
    publisher: {
      "@type": "Organization",
      name: "Pawmeals",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Pawmeals",
      url: siteUrl,
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }} />;
}

// ─── BREADCRUMB SCHEMA ────────────────────────────────────────────────────────

interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }} />;
}

export const FAQPageSchema = FAQSchema;
