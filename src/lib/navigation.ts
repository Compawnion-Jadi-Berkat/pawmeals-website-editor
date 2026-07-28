import type { Locale } from "@/lib/i18n/config";
import type { SiteFooterLink, SiteNavItem } from "@/types/site-content";

const LEGACY_ROUTE_ALIASES: Record<string, string> = {
  "/vet-exclusive": "/vet",
  "/pawrenting": "/blog",
};

const DEFAULT_NAV_LABELS: Record<Locale, SiteNavItem[]> = {
  id: [
    { label: "Katering", href: "/catering" },
    { label: "Quiz", href: "/quiz" },
    { label: "Tentang Kami", href: "/about" },
    { label: "Vet Exclusive", href: "/vet" },
    { label: "Produk", href: "/products" },
    { label: "Tips Pawrenting", href: "/blog" },
    { label: "FAQ", href: "/faqs" },
  ],
  en: [
    { label: "Catering", href: "/catering" },
    { label: "Quiz", href: "/quiz" },
    { label: "About Us", href: "/about" },
    { label: "Vet Exclusive", href: "/vet" },
    { label: "Products", href: "/products" },
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
  // Strip ANY known locale prefix, not just the current one. Sanity-authored
  // hrefs may already include `/id/...` or `/en/...`; without this, switching
  // locale produces double-prefixed URLs like `/en/id/products` → 404.
  for (const loc of ["id", "en"] as const) {
    if (path === `/${loc}`) return "/";
    if (path.startsWith(`/${loc}/`)) return path.slice(loc.length + 1) || "/";
  }
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

export function prioritizeQuizAfterCatering(items: SiteNavItem[]) {
  const cateringIndex = items.findIndex((item) => item.href.includes("/catering"));
  const quizIndex = items.findIndex((item) => item.href.includes("/quiz"));

  if (cateringIndex === -1 || quizIndex === -1 || quizIndex === cateringIndex + 1) {
    return items;
  }

  const reordered = [...items];
  const [quizItem] = reordered.splice(quizIndex, 1);
  const updatedCateringIndex = reordered.findIndex((item) => item.href.includes("/catering"));
  reordered.splice(updatedCateringIndex + 1, 0, quizItem);
  return reordered;
}

export function getFallbackNavItems(locale: Locale) {
  return prioritizeQuizAfterCatering(
    DEFAULT_NAV_LABELS[locale].map((item) => ({
      ...item,
      href: normalizePublicHref(item.href, locale),
    })),
  );
}

export function getFallbackFooterLinks(locale: Locale) {
  return DEFAULT_FOOTER_LINKS[locale].map((item) => ({
    ...item,
    href: normalizePublicHref(item.href, locale),
  }));
}
