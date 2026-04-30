"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ShoppingBag, Menu, X, Globe, ChevronDown } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import type { Locale } from "@/lib/i18n/config";
import { localeNames, localeFlags } from "@/lib/i18n/config";
import { CartDrawer } from "@/components/cart/CartDrawer";

interface NavbarProps {
  locale: Locale;
}

const navLinks = (locale: Locale) => [
  { href: `/${locale}/products`, labelKey: "products" },
  { href: `/${locale}/catering`, labelKey: "catering" },
  { href: `/${locale}/quiz`, labelKey: "quiz" },
  { href: `/${locale}/blog`, labelKey: "blog" },
  { href: `/${locale}/vet`, labelKey: "vet" },
  { href: `/${locale}/about`, labelKey: "about" },
  { href: `/${locale}/faqs`, labelKey: "faqs" },
];

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const { totalQuantity, toggleCart, isOpen } = useCart();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Detect scroll for navbar style change
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const otherLocale: Locale = locale === "id" ? "en" : "id";
  const safePath = pathname ?? "/";
  const otherLocalePath = safePath.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileOpen
            ? "bg-white/95 backdrop-blur-md shadow-warm-sm border-b border-pm-sand/50"
            : "bg-transparent"
        }`}
        style={{ height: "var(--nav-height)" }}
      >
        <div className="container h-full flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 flex-shrink-0 group"
            aria-label="Pawmeals — Home"
          >
            <div className="w-9 h-9 rounded-xl bg-pm-caramel flex items-center justify-center shadow-warm-sm group-hover:shadow-warm-md transition-shadow">
              <span className="text-white text-lg font-heading font-bold">P</span>
            </div>
            <span className="font-heading font-bold text-xl text-pm-brown hidden sm:block">
              Pawmeals
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks(locale).map((link) => {
              const isActive = safePath === link.href || safePath.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-body-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-pm-caramel bg-pm-caramel/10"
                      : "text-pm-brown hover:text-pm-caramel hover:bg-pm-cream-dark"
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-body-sm font-semibold text-pm-brown hover:bg-pm-cream-dark transition-all duration-200"
                aria-label="Switch language"
                aria-expanded={isLangOpen}
              >
                <Globe className="w-4 h-4" />
                <span>{localeFlags[locale]}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isLangOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-warm-lg border border-pm-sand/50 overflow-hidden min-w-[160px] animate-scale-in">
                  {(["id", "en"] as Locale[]).map((loc) => (
                    <Link
                      key={loc}
                      href={loc === locale ? safePath : otherLocalePath}
                      onClick={() => setIsLangOpen(false)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 text-body-sm font-semibold transition-colors ${
                        loc === locale
                          ? "bg-pm-caramel/10 text-pm-caramel"
                          : "text-pm-brown hover:bg-pm-cream-dark"
                      }`}
                    >
                      <span>{localeFlags[loc]}</span>
                      <span>{localeNames[loc]}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl text-pm-brown hover:bg-pm-cream-dark transition-all duration-200"
              aria-label={`Cart (${totalQuantity} items)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalQuantity > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-pm-caramel text-white text-2xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {totalQuantity > 9 ? "9+" : totalQuantity}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-pm-brown hover:bg-pm-cream-dark transition-all duration-200"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden bg-white border-t border-pm-sand/50 shadow-warm-lg animate-fade-in">
            <nav className="container py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks(locale).map((link) => {
                const isActive = safePath === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 rounded-xl text-body-md font-semibold transition-all duration-200 ${
                      isActive
                        ? "text-pm-caramel bg-pm-caramel/10"
                        : "text-pm-brown hover:text-pm-caramel hover:bg-pm-cream-dark"
                    }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                );
              })}

              {/* Language switcher in mobile */}
              <div className="mt-2 pt-2 border-t border-pm-sand/50 flex gap-2">
                {(["id", "en"] as Locale[]).map((loc) => (
                  <Link
                    key={loc}
                    href={loc === locale ? safePath : otherLocalePath}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-body-sm font-semibold transition-colors flex-1 justify-center ${
                      loc === locale
                        ? "bg-pm-caramel/10 text-pm-caramel"
                        : "text-pm-brown hover:bg-pm-cream-dark"
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

      {/* Cart Drawer */}
      <CartDrawer locale={locale} />

      {/* Backdrop for language dropdown */}
      {isLangOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsLangOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
