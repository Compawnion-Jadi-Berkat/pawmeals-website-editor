import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Instagram, MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer");
  const tc = useTranslations("nav");
  const year = new Date().getFullYear();

  const shopLinks = [
    { href: `/${locale}/products`, label: tc("products") },
    { href: `/${locale}/quiz`, label: tc("quiz") },
    { href: `/${locale}/catering`, label: tc("catering") },
    { href: `/${locale}/account/subscriptions`, label: locale === "id" ? "Langganan" : "Subscriptions" },
  ];

  const companyLinks = [
    { href: `/${locale}/about`, label: tc("about") },
    { href: `/${locale}/blog`, label: tc("blog") },
    { href: `/${locale}/vet`, label: tc("vet") },
    { href: `/${locale}/faqs`, label: tc("faqs") },
  ];

  const supportLinks = [
    { href: `/${locale}/faqs`, label: locale === "id" ? "Pusat Bantuan" : "Help Center" },
    { href: `/${locale}/shipping`, label: locale === "id" ? "Info Pengiriman" : "Shipping Info" },
    { href: `/${locale}/returns`, label: locale === "id" ? "Pengembalian" : "Returns" },
    { href: `/${locale}/contact`, label: locale === "id" ? "Hubungi Kami" : "Contact Us" },
  ];

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890";
  const whatsappMessage = encodeURIComponent(
    locale === "id"
      ? "Halo Pawmeals! Saya ingin bertanya tentang produk."
      : "Hello Pawmeals! I have a question about your products."
  );

  return (
    <footer className="bg-pm-brown text-white" role="contentinfo">
      {/* WhatsApp CTA Banner */}
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

      {/* Main Footer */}
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-pm-caramel flex items-center justify-center">
                <span className="text-white text-lg font-heading font-bold">P</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">Pawmeals</span>
            </Link>

            <p className="text-white/70 text-body-sm leading-relaxed mb-6 max-w-xs">
              {t("tagline")}
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                className="flex items-center gap-2 text-white/70 hover:text-white text-body-sm transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+62 812-3456-7890</span>
              </a>
              <a
                href="mailto:hello@pawmeals.com"
                className="flex items-center gap-2 text-white/70 hover:text-white text-body-sm transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>hello@pawmeals.com</span>
              </a>
              <div className="flex items-start gap-2 text-white/70 text-body-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/pawmeals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:bg-pm-caramel hover:text-white transition-all duration-200"
                aria-label="Pawmeals on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:bg-pm-caramel hover:text-white transition-all duration-200"
                aria-label="Pawmeals on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              {/* TikTok */}
              <a
                href="https://tiktok.com/@pawmeals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:bg-pm-caramel hover:text-white transition-all duration-200"
                aria-label="Pawmeals on TikTok"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-heading font-bold text-white text-body-md mb-4 uppercase tracking-wider">
              {t("shop")}
            </h3>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-body-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-bold text-white text-body-md mb-4 uppercase tracking-wider">
              {t("company")}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-body-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-heading font-bold text-white text-body-md mb-4 uppercase tracking-wider">
              {t("support")}
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-body-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Vet Badge */}
            <div className="mt-6 p-3 bg-pm-sage/20 rounded-xl border border-pm-sage/30">
              <p className="text-pm-sage-light text-label-sm font-semibold uppercase tracking-wider mb-1">
                {locale === "id" ? "Direkomendasikan" : "Recommended by"}
              </p>
              <p className="text-white font-bold text-body-sm">
                220+ {locale === "id" ? "Klinik Dokter Hewan" : "Vet Clinics"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-body-sm text-center sm:text-left">
            {t("copyright", { year })}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/privacy`}
              className="text-white/50 hover:text-white/80 text-body-sm transition-colors"
            >
              {t("privacy")}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-white/50 hover:text-white/80 text-body-sm transition-colors"
            >
              {t("terms")}
            </Link>
            <Link
              href={`/${locale}/shipping`}
              className="text-white/50 hover:text-white/80 text-body-sm transition-colors"
            >
              {t("shipping_policy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
