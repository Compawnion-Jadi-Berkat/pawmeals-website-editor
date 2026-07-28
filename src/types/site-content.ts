export interface SanityImage { asset?: { url?: string; _id?: string }; alt?: string }

export interface SiteNavItem {
  label: string;
  href: string;
  iconImage?: SanityImage;
}

export interface SiteFooterLink extends SiteNavItem {
  group?: "shop" | "company" | "legal" | "support" | string;
}

export interface SiteSocialLink {
  platform?: "instagram" | "tiktok" | "whatsapp" | "email" | "facebook" | "youtube" | "x" | "custom" | string;
  label?: string;
  url?: string;
  iconImage?: SanityImage;
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
  defaultOgImage?: SanityImage;
  logo?: SanityImage;
  primaryColor?: string;
  accentColor?: string;
  beigeColor?: string;
  charcoalColor?: string;
  headingFont?: string;
  bodyFont?: string;
  hideFooterWhatsAppBar?: boolean;
}

export interface ProductCategoryContent {
  _id?: string;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  iconImage?: SanityImage;
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
  ctaLabel?: string;
}

export interface ProductsPageCategoryOverride {
  slug: string;
  eyebrow?: string;
  headline: string;
  intro?: string;
}

export interface ProductsPageContent {
  eyebrow?: string;
  headline?: string;
  intro?: string;
  categoryHeadlines?: ProductsPageCategoryOverride[];
}
