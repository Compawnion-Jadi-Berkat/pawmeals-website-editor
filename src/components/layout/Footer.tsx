import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { SiteFooterLink, SiteSettingsContent } from "@/types/site-content";
import { getFallbackFooterLinks, normalizePublicHref } from "@/lib/navigation";

interface FooterProps {
  locale: Locale;
  siteSettings?: SiteSettingsContent | null;
}

function socialIcon(platform?: string) {
  if (platform === "instagram") return <Instagram className="w-4 h-4" />;
  if (platform === "email") return <Mail className="w-4 h-4" />;
  if (platform === "whatsapp") return <MessageCircle className="w-4 h-4" />;
  return <MessageCircle className="w-4 h-4" />;
}

function groupedLinks(links: SiteFooterLink[] | undefined, group: string, locale: Locale) {
  return (links || [])
    .filter((link) => link?.label && link?.href && link.group === group)
    .map((link) => ({ ...link, href: normalizePublicHref(link.href, locale) }));
}

export function Footer({ locale, siteSettings }: FooterProps) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  const brandName = siteSettings?.brandName || "Pawmeals";
  const tagline = siteSettings?.tagline || t("tagline");
  const footerLinks = siteSettings?.footerLinks?.some((link) => link?.label && link?.href)
    ? siteSettings.footerLinks
    : getFallbackFooterLinks(locale);
  const shopLinks = groupedLinks(footerLinks, "shop", locale);
  const companyLinks = groupedLinks(footerLinks, "company", locale);
  const supportLinks = groupedLinks(footerLinks, "support", locale);
  const legalLinks = groupedLinks(footerLinks, "legal", locale);
  const whatsappNumber = siteSettings?.whatsappNumber;
  const whatsappMessage = encodeURIComponent(
    locale === "id"
      ? `Halo ${brandName}! Saya ingin bertanya tentang produk.`
      : `Hello ${brandName}! I have a question about your products.`
  );

  return (
    <footer className="bg-pm-brown text-white" role="contentinfo">
      {whatsappNumber && (
        <div className="bg-pm-caramel">
          <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white font-semibold text-body-md text-center sm:text-left">
              {locale === "id"
                ? "Ada pertanyaan? Chat langsung dengan tim kami di WhatsApp!"
                : "Have questions? Chat directly with our team on WhatsApp!"}
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-pm-caramel-dark px-5 py-2.5 rounded-pill font-bold text-body-sm hover:bg-pm-cream transition-colors flex-shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              {locale === "id" ? "Chat WhatsApp" : "Chat on WhatsApp"}
            </a>
          </div>
        </div>
      )}

      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-pm-caramel flex items-center justify-center">
                <span className="text-white text-lg font-heading font-bold">{brandName.slice(0, 1)}</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">{brandName}</span>
            </Link>

            {tagline && <p className="text-white/70 text-body-sm leading-relaxed mb-6 max-w-xs">{tagline}</p>}

            {(whatsappNumber || siteSettings?.email || siteSettings?.phone || siteSettings?.location) && (
              <div className="space-y-2 mb-6">
                {(siteSettings?.phone || whatsappNumber) && (
                  <a
                    href={whatsappNumber ? `https://wa.me/${whatsappNumber}` : `tel:${siteSettings?.phone}`}
                    className="flex items-center gap-2 text-white/70 hover:text-white text-body-sm transition-colors"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{siteSettings?.phone || whatsappNumber}</span>
                  </a>
                )}
                {siteSettings?.email && (
                  <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-2 text-white/70 hover:text-white text-body-sm transition-colors">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span>{siteSettings.email}</span>
                  </a>
                )}
                {siteSettings?.location && (
                  <div className="flex items-start gap-2 text-white/70 text-body-sm">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{siteSettings.location}</span>
                  </div>
                )}
              </div>
            )}

            {siteSettings?.socials && siteSettings.socials.length > 0 && (
              <div className="flex items-center gap-3">
                {siteSettings.socials.filter((social) => social?.url).map((social) => (
                  <a
                    key={`${social.platform}-${social.url}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:bg-pm-caramel hover:text-white transition-all duration-200"
                    aria-label={`${brandName} on ${social.platform || "social media"}`}
                  >
                    {socialIcon(social.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {shopLinks.length > 0 && (
            <div>
              <h3 className="font-heading font-bold text-white text-body-md mb-4 uppercase tracking-wider">{t("shop")}</h3>
              <ul className="space-y-2.5">
                {shopLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link href={link.href} className="text-white/70 hover:text-white text-body-sm transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {companyLinks.length > 0 && (
            <div>
              <h3 className="font-heading font-bold text-white text-body-md mb-4 uppercase tracking-wider">{t("company")}</h3>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link href={link.href} className="text-white/70 hover:text-white text-body-sm transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {supportLinks.length > 0 && (
            <div>
              <h3 className="font-heading font-bold text-white text-body-md mb-4 uppercase tracking-wider">{t("support")}</h3>
              <ul className="space-y-2.5">
                {supportLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link href={link.href} className="text-white/70 hover:text-white text-body-sm transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>

              {siteSettings?.vetClinicCount && (
                <div className="mt-6 p-3 bg-pm-sage/20 rounded-xl border border-pm-sage/30">
                  <p className="text-pm-sage-light text-label-sm font-semibold uppercase tracking-wider mb-1">
                    {locale === "id" ? "Direkomendasikan" : "Recommended by"}
                  </p>
                  <p className="text-white font-bold text-body-sm">{siteSettings.vetClinicCount}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-body-sm text-center sm:text-left">{t("copyright", { year })}</p>
          {legalLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {legalLinks.map((link) => (
                <Link key={`${link.href}-${link.label}`} href={link.href} className="text-white/50 hover:text-white/80 text-body-sm transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
