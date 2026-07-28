import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Varela_Round, Nunito_Sans } from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { getSiteSettings } from "@/lib/sanity/client";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { TikTokPixel } from "@/components/analytics/TikTokPixel";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { locales, defaultLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import "@/app/globals.css";

const varelaRound = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#D8615A",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : defaultLocale;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      default: t("title"),
      template: `%s | Pawmeals`,
    },
    description: t("description"),
    keywords: t("keywords"),
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://pawmeals.com"),
    alternates: {
      canonical: "/",
      languages: {
        "id-ID": "/id",
        "en-US": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? "en_US" : "id_ID",
      siteName: "Pawmeals",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Pawmeals — Cooked Food Specialist",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

// generateStaticParams removed — all locale routes are fully dynamic (Shopify cart + next-intl).
// Locale routing is handled by middleware.ts at the edge.

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  const [messages, siteSettings] = await Promise.all([
    getMessages({ locale }),
    getSiteSettings().catch(() => null),
  ]);

  return (
    <html lang={locale} className={`${varelaRound.variable} ${nunitoSans.variable}`}>
      <head>
        {/* Preconnect to external services */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`} />
        <link rel="preconnect" href="https://cdn.sanity.io" />

        {/* Editor-driven brand tokens (Site Settings) */}
        {(() => {
          const primary = siteSettings?.primaryColor;
          const accent = siteSettings?.accentColor;
          const beige = siteSettings?.beigeColor;
          const charcoal = siteSettings?.charcoalColor;
          const headingFont = siteSettings?.headingFont;
          const bodyFont = siteSettings?.bodyFont;
          const fontsToLoad = Array.from(
            new Set([headingFont, bodyFont].filter(Boolean).filter((f) => f !== "Varela Round" && f !== "Nunito Sans"))
          ) as string[];
          const overrides: string[] = [];
          if (primary) overrides.push(`--color-primary:${primary};`);
          if (accent) overrides.push(`--color-accent:${accent};--color-gold:${accent};--color-warning:${accent};`);
          if (beige) overrides.push(`--color-bg-alt:${beige};`);
          if (charcoal) overrides.push(`--color-text:${charcoal};--color-bg-inverse:${charcoal};`);
          if (headingFont && headingFont !== "Varela Round") overrides.push(`--font-display:'${headingFont}', var(--font-heading), system-ui, sans-serif;`);
          if (bodyFont && bodyFont !== "Nunito Sans") overrides.push(`--font-sans:'${bodyFont}', var(--font-body), system-ui, sans-serif;`);
          return (
            <>
              {fontsToLoad.length > 0 && (
                <link
                  rel="stylesheet"
                  href={`https://fonts.googleapis.com/css2?${fontsToLoad
                    .map((f) => `family=${encodeURIComponent(f).replace(/%20/g, "+")}:wght@400;500;600;700;800`)
                    .join("&")}&display=swap`}
                />
              )}
              {overrides.length > 0 && (
                <style dangerouslySetInnerHTML={{ __html: `:root{${overrides.join("")}}` }} />
              )}
            </>
          );
        })()}

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Google Tag Manager */}
        <GoogleTagManager />
      </head>
      <body className="bg-pm-cream text-pm-brown antialiased">
        {/* AEO: Organization Structured Data */}
        <OrganizationSchema locale={locale} siteSettings={siteSettings} />

        <NextIntlClientProvider locale={locale} messages={messages}>
          <CartProvider>
            {/* Skip to main content for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-pm-caramel focus:text-white focus:rounded-lg focus:font-semibold"
            >
              {locale === "id" ? "Lewati ke konten utama" : "Skip to main content"}
            </a>

            <Navbar locale={locale} siteSettings={siteSettings} />

            <main id="main-content" className="pt-[var(--nav-height)]">
              {children}
            </main>

            <Footer locale={locale} siteSettings={siteSettings} />
          </CartProvider>
        </NextIntlClientProvider>

        {/* Analytics Pixels (loaded after hydration) */}
        <MetaPixel />
        <TikTokPixel />
      </body>
    </html>
  );
}
