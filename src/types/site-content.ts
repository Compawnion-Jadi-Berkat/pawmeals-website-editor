export interface SiteNavItem {
  label: string;
  href: string;
}

export interface SiteFooterLink extends SiteNavItem {
  group?: "shop" | "company" | "legal" | "support" | string;
}

export interface SiteSocialLink {
  platform?: "instagram" | "tiktok" | "whatsapp" | "email" | string;
  url?: string;
}

export interface SiteSettingsContent {
  brandName?: string;
  tagline?: string;
  navItems?: SiteNavItem[];
  footerLinks?: SiteFooterLink[];
  socials?: SiteSocialLink[];
  whatsappNumber?: string;
  email?: string;
  phone?: string;
  location?: string;
  vetClinicCount?: string;
  defaultOgImage?: { asset?: { url?: string }; alt?: string };
  logo?: { asset?: { url?: string }; alt?: string };
}

export interface ProductCategoryContent {
  _id?: string;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  order?: number;
}

export interface WebsiteProduct {
  id: string;
  title: string;
  handle: string;
  description?: string;
  longDescription?: unknown[];
  featuredImage?: { url: string; altText?: string } | null;
  images?: Array<{ url: string; altText?: string }>;
  tags?: string[];
  category?: ProductCategoryContent | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  pricingTiers?: Array<{ label?: string; weightLabel?: string; priceIDR?: number; note?: string }>;
  ingredients?: string[];
  feedingGuide?: string;
  variants?: { edges: Array<{ node: { id: string; availableForSale: boolean } }> };
  vendor?: string;
  featured?: boolean;
}
