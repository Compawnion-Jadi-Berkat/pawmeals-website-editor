import type { Locale } from "@/lib/i18n/config";

interface OrganizationSchemaProps {
  locale: Locale;
}

export function OrganizationSchema({ locale }: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://pawmeals.com/#organization",
    name: "Pawmeals",
    alternateName: "Pawmeals Indonesia",
    url: "https://pawmeals.com",
    logo: {
      "@type": "ImageObject",
      url: "https://pawmeals.com/logo.png",
      width: 200,
      height: 200,
    },
    description:
      locale === "id"
        ? "Pawmeals adalah spesialis makanan hewan peliharaan masak pertama di Indonesia. Makanan alami, tanpa pengawet, direkomendasikan oleh lebih dari 220 klinik dokter hewan."
        : "Pawmeals is Indonesia's first cooked pet food specialist. Natural, preservative-free food recommended by over 220 veterinary clinics.",
    foundingDate: "2022",
    foundingLocation: {
      "@type": "Place",
      addressCountry: "ID",
      addressLocality: "Jakarta",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressLocality: "Jakarta",
      addressRegion: "DKI Jakarta",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["Indonesian", "English"],
        contactOption: "TollFree",
      },
    ],
    sameAs: [
      "https://instagram.com/pawmeals",
      "https://tiktok.com/@pawmeals",
      "https://wa.me/6281234567890",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "id" ? "Katalog Produk Pawmeals" : "Pawmeals Product Catalogue",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: locale === "id" ? "Makanan Anjing" : "Dog Food",
          url: `https://pawmeals.com/${locale}/products?type=dog`,
        },
        {
          "@type": "OfferCatalog",
          name: locale === "id" ? "Makanan Kucing" : "Cat Food",
          url: `https://pawmeals.com/${locale}/products?type=cat`,
        },
        {
          "@type": "OfferCatalog",
          name: "Pawmeals Catering",
          url: `https://pawmeals.com/${locale}/catering`,
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

// ─── PRODUCT SCHEMA ───────────────────────────────────────────────────────────

interface ProductSchemaProps {
  product: {
    title: string;
    description: string;
    handle: string;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    featuredImage?: { url: string; altText?: string | null } | null;
    variants: { edges: { node: { availableForSale: boolean; sku?: string | null } }[] };
    vendor: string;
    tags?: string[];
  };
  locale: string;
}

export function ProductSchema({ product, locale }: ProductSchemaProps) {
  const variant = product.variants?.edges?.[0]?.node;
  const isAvailable = variant?.availableForSale ?? true;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    url: `https://pawmeals.com/${locale}/products/${product.handle}`,
    image: product.featuredImage?.url,
    brand: {
      "@type": "Brand",
      name: "Pawmeals",
    },
    sku: variant?.sku,
    offers: {
      "@type": "Offer",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      price: product.priceRange.minVariantPrice.amount,
      availability: isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Pawmeals",
      },
      url: `https://pawmeals.com/${locale}/products/${product.handle}`,
    },
    category: product.tags?.includes("dog") ? "Dog Food" : "Cat Food",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Preservative Free",
        value: "true",
      },
      {
        "@type": "PropertyValue",
        name: "Natural Ingredients",
        value: "true",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
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
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    url: `https://pawmeals.com/${locale}/blog/${article.slug.current}`,
    image: article.featuredImage?.asset?.url,
    author: {
      "@type": "Person",
      name: article.author?.name,
      jobTitle: article.author?.credentials,
    },
    publisher: {
      "@type": "Organization",
      name: "Pawmeals",
      logo: {
        "@type": "ImageObject",
        url: "https://pawmeals.com/logo.png",
      },
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Pawmeals",
      url: "https://pawmeals.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
