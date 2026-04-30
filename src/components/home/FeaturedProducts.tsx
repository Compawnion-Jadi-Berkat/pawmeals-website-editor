import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingCart, Star } from "lucide-react";
import { formatPrice } from "@/lib/shopify";
import type { Locale } from "@/lib/i18n/config";
import type { ShopifyProduct } from "@/types/shopify";

interface FeaturedProductsProps {
  locale: Locale;
  products: ShopifyProduct[];
}

export function FeaturedProducts({ locale, products }: FeaturedProductsProps) {
  const t = {
    badge: locale === "id" ? "Produk Unggulan" : "Featured Products",
    heading: locale === "id" ? "Pilihan Terbaik untuk Sahabatmu" : "Best Picks for Your Companion",
    subheading: locale === "id"
      ? "Diformulasikan oleh ahli nutrisi hewan dan disetujui oleh dokter hewan."
      : "Formulated by animal nutritionists and approved by veterinarians.",
    viewAll: locale === "id" ? "Lihat Semua Produk" : "View All Products",
    addToCart: locale === "id" ? "Tambah ke Keranjang" : "Add to Cart",
    vetApproved: locale === "id" ? "Disetujui Vet" : "Vet Approved",
    noPreservatives: locale === "id" ? "Tanpa Pengawet" : "No Preservatives",
  };

  // Fallback placeholder products if Shopify not connected
  const placeholderProducts = Array.from({ length: 4 }, (_, i) => ({
    id: `placeholder-${i}`,
    title: [
      "Pawmeals Daily Wellness",
      "Pawmeals Joint Care",
      "Pawmeals Weight Management",
      "Pawmeals Cat Classic",
    ][i],
    handle: ["daily-wellness", "joint-care", "weight-management", "cat-classic"][i],
    description: locale === "id"
      ? "Formula seimbang untuk kesehatan optimal hewan peliharaanmu sehari-hari."
      : "Balanced formula for your pet's optimal daily health.",
    priceRange: {
      minVariantPrice: { amount: String(75000 + i * 15000), currencyCode: "IDR" },
    },
    featuredImage: null,
    tags: i < 3 ? ["dog"] : ["cat"],
    variants: { edges: [{ node: { availableForSale: true, id: `v-${i}` } }] },
    vendor: "Pawmeals",
  }));

  const displayProducts = products.length > 0 ? products.slice(0, 4) : placeholderProducts;

  return (
    <section className="section-padding bg-pm-cream" aria-labelledby="featured-products-heading">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-pm-caramel font-bold text-label-md uppercase tracking-widest mb-2">
              {t.badge}
            </p>
            <h2
              id="featured-products-heading"
              className="font-heading text-3xl sm:text-4xl font-bold text-pm-brown"
            >
              {t.heading}
            </h2>
            <p className="text-pm-brown/70 text-body-sm mt-2">{t.subheading}</p>
          </div>
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 text-pm-caramel font-bold hover:text-pm-caramel-dark transition-colors flex-shrink-0"
          >
            {t.viewAll}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-warm-sm hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Product Image */}
              <Link href={`/${locale}/products/${product.handle}`} className="block relative">
                <div className="aspect-square bg-pm-cream overflow-hidden">
                  {product.featuredImage ? (
                    <Image
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pm-caramel/10 to-pm-sand/20">
                      <span className="text-6xl">🥩</span>
                    </div>
                  )}
                </div>
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="bg-pm-sage text-white text-body-xs font-bold px-2.5 py-1 rounded-pill">
                    {t.vetApproved}
                  </span>
                  <span className="bg-pm-caramel text-white text-body-xs font-bold px-2.5 py-1 rounded-pill">
                    {t.noPreservatives}
                  </span>
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-1">
                {/* Category tag */}
                <span className="text-pm-brown/50 text-body-xs font-semibold uppercase tracking-wide mb-1">
                  {product.tags?.includes("cat")
                    ? locale === "id" ? "Makanan Kucing" : "Cat Food"
                    : locale === "id" ? "Makanan Anjing" : "Dog Food"}
                </span>

                <Link href={`/${locale}/products/${product.handle}`}>
                  <h3 className="font-heading font-bold text-pm-brown text-body-lg leading-snug mb-2 hover:text-pm-caramel transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                </Link>

                <p className="text-pm-brown/60 text-body-sm line-clamp-2 mb-3 flex-1">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-pm-caramel text-pm-caramel" />
                  ))}
                  <span className="text-pm-brown/50 text-body-xs ml-1">(4.9)</span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between mt-auto">
                  <p className="font-heading font-bold text-pm-caramel text-body-lg">
                    {formatPrice(
                      product.priceRange.minVariantPrice.amount,
                      product.priceRange.minVariantPrice.currencyCode
                    )}
                  </p>
                  <Link
                    href={`/${locale}/products/${product.handle}`}
                    className="flex items-center gap-1.5 bg-pm-caramel text-white text-body-sm font-bold px-3.5 py-2 rounded-xl hover:bg-pm-caramel-dark transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    {t.addToCart}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
