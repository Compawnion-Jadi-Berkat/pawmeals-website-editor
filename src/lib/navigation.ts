import type { Locale } from "@/lib/i18n/config";
import type { SiteFooterLink, SiteNavItem } from "@/types/site-content";

const LEGACY_ROUTE_ALIASES: Record<string, string> = {
  "/vet-exclusive": "/vet",
  "/pawrenting": "/blog",
};

const DEFAULT_NAV_LABELS: Record<Locale, SiteNavItem[]> = {
  id: [
    { label: "Katering", href: "/catering" },
    { label: "Tentang Kami", href: "/about" },
    { label: "Vet Exclusive", href: "/vet" },
    { label: "Produk", href: "/products" },
    { label: "Quiz", href: "/quiz" },
    { label: "Tips Pawrenting", href: "/blog" },
    { label: "FAQ", href: "/faqs" },
  ],
  en: [
    { label: "Catering", href: "/catering" },
    { label: "About Us", href: "/about" },
    { label: "Vet Exclusive", href: "/vet" },
    { label: "Products", href: "/products" },
    { label: "Quiz", href: "/quiz" },
    { label: "Pawrenting Tips", href: "/blog" },
    { label: "FAQs", href: "/faqs" },
  ],
};

const DEFAULT_FOOTER_LINKS: Record<Locale, SiteFooterLink[]> = {
  id: [
    { label: "Produk", href: "/products", group: "shop" },
    { label: "Quiz", href: "/quiz", group: "shop" },
    { label: "Katering", href: "/catering", group: "shop" },
    { label: "Tentang Kami", href: "/about", group: "company" },
    { label: "Vet Exclusive", href: "/vet", group: "company" },
    { label: "Tips Pawrenting", href: "/blog", group: "support" },
    { label: "FAQ", href: "/faqs", group: "support" },
  ],
  en: [
    { label: "Products", href: "/products", group: "shop" },
    { label: "Quiz", href: "/quiz", group: "shop" },
    { label: "Catering", href: "/catering", group: "shop" },
    { label: "About Us", href: "/about", group: "company" },
    { label: "Vet Exclusive", href: "/vet", group: "company" },
    { label: "Pawrenting Tips", href: "/blog", group: "support" },
    { label: "FAQs", href: "/faqs", group: "support" },
  ],
};

function stripLocale(path: string, locale: Locale) {
  if (path === `/${locale}`) return "/";
  if (path.startsWith(`/${locale}/`)) return path.slice(locale.length + 1) || "/";
  return path;
}

export function normalizePublicHref(href: string, locale: Locale) {
  if (!href) return `/${locale}`;
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return href;

  const withoutLocale = stripLocale(href.startsWith("/") ? href : `/${href}`, locale);
  const [pathname, suffix = ""] = withoutLocale.split(/(?=[?#])/, 2);
  const normalizedPath = LEGACY_ROUTE_ALIASES[pathname] || pathname;

  if (normalizedPath === "/") return `/${locale}${suffix}`;
  return `/${locale}${normalizedPath}${suffix}`;
}

export function getFallbackNavItems(locale: Locale) {
  return DEFAULT_NAV_LABELS[locale].map((item) => ({
    ...item,
    href: normalizePublicHref(item.href, locale),
  }));
}

export function getFallbackFooterLinks(locale: Locale) {
  return DEFAULT_FOOTER_LINKS[locale].map((item) => ({
    ...item,
    href: normalizePublicHref(item.href, locale),
  }));
}
