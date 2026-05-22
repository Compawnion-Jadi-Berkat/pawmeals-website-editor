import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Cat, Dog, Leaf, ShoppingBag, Star } from "lucide-react";
import { formatPrice } from "@/lib/shopify";
import type { Locale } from "@/lib/i18n/config";
import type { ShopifyProduct } from "@/types/shopify";
import { PLACEHOLDER_IMAGES } from "@/lib/placeholder-images";

const PRODUCT_IMAGES = [
  PLACEHOLDER_IMAGES.productChicken,
  PLACEHOLDER_IMAGES.productBeef,
  PLACEHOLDER_IMAGES.productFish,
  PLACEHOLDER_IMAGES.productChicken,
];

interface FeaturedProductsProps {
  locale: Locale;
  products: ShopifyProduct[];
}

export function FeaturedProducts({ locale, products }: FeaturedProductsProps) {
  const t = {
    badge: locale === "id" ? "Produk Unggulan" : "Featured Products",
    heading: locale === "id" ? "Menu Fresh-Cooked yang Paling Dicari" : "Most-Loved Fresh-Cooked Menus",
    subheading: locale === "id"
      ? "Dikurasi untuk kebutuhan harian, sensitivitas, dan rutinitas sehat hewan kesayangan."
      : "Curated for daily wellness, sensitivities, and healthier pet routines.",
    viewAll: locale === "id" ? "Lihat Semua Produk" : "View All Products",
    addToCart: locale === "id" ? "Pilih Menu" : "Select Menu",
    vetApproved: locale === "id" ? "Vet-informed" : "Vet-informed",
    noPreservatives: locale === "id" ? "Tanpa Pengawet" : "No Preservatives",
  };

  const placeholderProducts = Array.from({ length: 4 }, (_, i) => ({
    id: `placeholder-${i}`,
    title: ["Pawmeals Daily Wellness", "Pawmeals Joint Care", "Pawmeals Weight Management", "Pawmeals Cat Classic"][i],
    handle: ["daily-wellness", "joint-care", "weight-management", "cat-classic"][i],
    description: locale === "id"
      ? "Formula seimbang untuk kesehatan optimal hewan peliharaanmu sehari-hari."
      : "Balanced formula for your pet's optimal daily health.",
    priceRange: { minVariantPrice: { amount: String(75000 + i * 15000), currencyCode: "IDR" } },
    featuredImage: { url: PRODUCT_IMAGES[i], altText: ["Pawmeals Daily Wellness", "Pawmeals Joint Care", "Pawmeals Weight Management", "Pawmeals Cat Classic"][i] },
    tags: i < 3 ? ["dog"] : ["cat"],
    variants: { edges: [{ node: { availableForSale: true, id: `v-${i}` } }] },
    vendor: "Pawmeals",
  }));

  const displayProducts = products.length > 0 ? products.slice(0, 4) : placeholderProducts;

  return (
    <section className="section-padding bg-pm-cream" aria-labelledby="featured-products-heading">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 lg:mb-12">
          <div className="max-w-2xl">
            <p className="section-eyebrow">{t.badge}</p>
            <h2 id="featured-products-heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-pm-brown">
              {t.heading}
            </h2>
            <p className="text-pm-brown/70 text-body-lg mt-3 leading-relaxed">{t.subheading}</p>
          </div>
          <Link href={`/${locale}/products`} className="btn-secondary bg-white shadow-warm-sm flex-shrink-0">
            {t.viewAll}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => {
            const isCat = product.tags?.includes("cat");
            const SpeciesIcon = isCat ? Cat : Dog;
            return (
              <article key={product.id} className="group luxury-panel rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-xl flex flex-col">
                <Link href={`/${locale}/products/${product.handle}`} className="block relative" aria-label={product.title}>
                  <div className="aspect-[4/3] bg-pm-cream overflow-hidden">
                    {product.featuredImage ? (
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText || product.title}
                        width={500}
                        height={375}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pm-cream via-white to-pm-sand/30">
                        <SpeciesIcon className="w-14 h-14 text-pm-caramel/40" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1.5 bg-white/90 text-pm-brown text-body-xs font-bold px-2.5 py-1.5 rounded-pill shadow-warm-sm backdrop-blur-sm">
                      <Award className="w-3.5 h-3.5 text-pm-sage" aria-hidden="true" />
                      {t.vetApproved}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-pm-brown/86 text-white text-body-xs font-bold px-2.5 py-1.5 rounded-pill shadow-warm-sm backdrop-blur-sm">
                      <Leaf className="w-3.5 h-3.5" aria-hidden="true" />
                      {t.noPreservatives}
                    </span>
                  </div>
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  <span className="text-pm-caramel-dark text-body-xs font-bold uppercase tracking-[0.16em] mb-2">
                    {isCat ? locale === "id" ? "Makanan Kucing" : "Cat Food" : locale === "id" ? "Makanan Anjing" : "Dog Food"}
                  </span>
                  <Link href={`/${locale}/products/${product.handle}`}>
                    <h3 className="font-heading font-bold text-pm-brown text-xl leading-snug mb-2 hover:text-pm-caramel-dark transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-pm-brown/65 text-body-sm line-clamp-2 mb-4 flex-1">{product.description}</p>
                  <div className="flex items-center gap-1 mb-4" aria-label="4.9 star rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-pm-gold text-pm-gold" aria-hidden="true" />
                    ))}
                    <span className="text-pm-brown/50 text-body-xs ml-1">4.9</span>
                  </div>
                  <div className="flex items-end justify-between gap-3 border-t border-pm-sand/40 pt-4">
                    <p className="font-heading font-bold text-pm-brown text-lg">
                      {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                    </p>
                    <Link href={`/${locale}/products/${product.handle}`} className="inline-flex items-center gap-1.5 bg-pm-brown text-white text-body-sm font-bold px-4 py-2.5 rounded-pill hover:bg-pm-caramel-dark transition-colors">
                      <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                      {t.addToCart}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
