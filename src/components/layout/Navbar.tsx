"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ShoppingBag, Menu, X, Globe, ChevronDown, Sparkles } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import type { Locale } from "@/lib/i18n/config";
import { localeNames, localeFlags } from "@/lib/i18n/config";
import { CartDrawer } from "@/components/cart/CartDrawer";

interface NavbarProps {
  locale: Locale;
}

const primaryNavLinks = (locale: Locale) => [
  { href: `/${locale}/products`, labelKey: "products" },
  { href: `/${locale}/quiz`, labelKey: "quiz" },
  { href: `/${locale}/vet`, labelKey: "vet" },
  { href: `/${locale}/about`, labelKey: "about" },
];

const secondaryNavLinks = (locale: Locale) => [
  { href: `/${locale}/catering`, labelKey: "catering" },
  { href: `/${locale}/blog`, labelKey: "blog" },
  { href: `/${locale}/faqs`, labelKey: "faqs" },
];

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const { totalQuantity, toggleCart } = useCart();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsMoreOpen(false);
  }, [pathname]);

  const otherLocale: Locale = locale === "id" ? "en" : "id";
  const safePath = pathname ?? "/";
  const otherLocalePath = safePath.replace(`/${locale}`, `/${otherLocale}`);
  const allMobileLinks = [...primaryNavLinks(locale), ...secondaryNavLinks(locale)];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileOpen
            ? "bg-white/92 backdrop-blur-xl shadow-warm-sm border-b border-pm-sand/50"
            : "bg-white/55 backdrop-blur-md border-b border-white/30"
        }`}
        style={{ height: "var(--nav-height)" }}
      >
        <div className="container h-full flex items-center justify-between gap-4">
          <Link href={`/${locale}`} className="flex items-center gap-2.5 flex-shrink-0 group" aria-label="Pawmeals — Home">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pm-brown to-pm-caramel flex items-center justify-center shadow-warm-md group-hover:shadow-warm-lg transition-all duration-300 group-hover:-translate-y-0.5">
              <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="hidden sm:block leading-none">
              <span className="font-heading font-bold text-xl text-pm-brown block">Pawmeals</span>
              <span className="text-[0.62rem] uppercase tracking-[0.18em] font-bold text-pm-caramel-dark">Cooked Pet Nutrition</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 rounded-pill bg-white/68 border border-pm-sand/45 p-1 shadow-warm-sm" aria-label="Main navigation">
            {primaryNavLinks(locale).map((link) => {
              const isActive = safePath === link.href || safePath.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-pill text-body-sm font-bold transition-all duration-200 ${
                    isActive ? "text-white bg-pm-brown shadow-warm-sm" : "text-pm-brown hover:text-pm-caramel-dark hover:bg-pm-cream"
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-pill text-body-sm font-bold text-pm-brown hover:text-pm-caramel-dark hover:bg-pm-cream transition-all duration-200 cursor-pointer"
                aria-expanded={isMoreOpen}
              >
                {locale === "id" ? "Lainnya" : "More"}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""}`} />
              </button>
              {isMoreOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-warm-lg border border-pm-sand/50 overflow-hidden min-w-[180px] animate-scale-in p-1">
                  {secondaryNavLinks(locale).map((link) => (
                    <Link key={link.href} href={link.href} className="block px-4 py-2.5 rounded-xl text-body-sm font-bold text-pm-brown hover:bg-pm-cream hover:text-pm-caramel-dark transition-colors">
                      {t(link.labelKey)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-body-sm font-bold text-pm-brown hover:bg-white transition-all duration-200 cursor-pointer"
                aria-label="Switch language"
                aria-expanded={isLangOpen}
              >
                <Globe className="w-4 h-4" />
                <span>{localeFlags[locale]}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-warm-lg border border-pm-sand/50 overflow-hidden min-w-[160px] animate-scale-in p-1">
                  {(["id", "en"] as Locale[]).map((loc) => (
                    <Link
                      key={loc}
                      href={loc === locale ? safePath : otherLocalePath}
                      onClick={() => setIsLangOpen(false)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-body-sm font-bold transition-colors ${
                        loc === locale ? "bg-pm-caramel/10 text-pm-caramel-dark" : "text-pm-brown hover:bg-pm-cream"
                      }`}
                    >
                      <span>{localeFlags[loc]}</span>
                      <span>{localeNames[loc]}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={toggleCart}
              className="relative flex items-center justify-center w-11 h-11 rounded-2xl text-pm-brown bg-white/70 hover:bg-white hover:shadow-warm-sm transition-all duration-200 cursor-pointer"
              aria-label={`Cart (${totalQuantity} items)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalQuantity > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-pm-caramel text-white text-2xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {totalQuantity > 9 ? "9+" : totalQuantity}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-2xl text-pm-brown bg-white/70 hover:bg-white transition-all duration-200 cursor-pointer"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileOpen && (
          <div className="lg:hidden bg-white border-t border-pm-sand/50 shadow-warm-lg animate-fade-in">
            <nav className="container py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {allMobileLinks.map((link) => {
                const isActive = safePath === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 rounded-xl text-body-md font-bold transition-all duration-200 ${
                      isActive ? "text-white bg-pm-brown" : "text-pm-brown hover:text-pm-caramel-dark hover:bg-pm-cream"
                    }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                );
              })}
              <div className="mt-2 pt-2 border-t border-pm-sand/50 flex gap-2">
                {(["id", "en"] as Locale[]).map((loc) => (
                  <Link
                    key={loc}
                    href={loc === locale ? safePath : otherLocalePath}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-body-sm font-bold transition-colors flex-1 justify-center ${
                      loc === locale ? "bg-pm-caramel/10 text-pm-caramel-dark" : "text-pm-brown hover:bg-pm-cream"
                    }`}
                  >
                    <span>{localeFlags[loc]}</span>
                    <span>{localeNames[loc]}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer locale={locale} />

      {(isLangOpen || isMoreOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsLangOpen(false);
            setIsMoreOpen(false);
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
