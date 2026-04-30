import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/shopify";
import type { Locale } from "@/lib/i18n/config";
import type { ShopifyProduct } from "@/types/shopify";

interface ProductsGridProps {
  locale: Locale;
  products: ShopifyProduct[];
  sort?: string;
}

// 12 SKU placeholder products matching the brand brief
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PLACEHOLDER_PRODUCTS = [
  { id: "1", title: "Pawmeals Daily Wellness", handle: "daily-wellness", description: "Balanced daily nutrition for adult dogs", priceRange: { minVariantPrice: { amount: "75000", currencyCode: "IDR" } }, featuredImage: null, tags: ["dog", "adult", "wellness"], variants: { edges: [{ node: { id: "v1", availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "2", title: "Pawmeals Joint Care", handle: "joint-care", description: "Glucosamine & chondroitin for joint health", priceRange: { minVariantPrice: { amount: "85000", currencyCode: "IDR" } }, featuredImage: null, tags: ["dog", "adult", "joint"], variants: { edges: [{ node: { id: "v2", availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "3", title: "Pawmeals Weight Management", handle: "weight-management", description: "Low-calorie formula for healthy weight", priceRange: { minVariantPrice: { amount: "80000", currencyCode: "IDR" } }, featuredImage: null, tags: ["dog", "adult", "weight"], variants: { edges: [{ node: { id: "v3", availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "4", title: "Pawmeals Puppy Growth", handle: "puppy-growth", description: "DHA & calcium for growing puppies", priceRange: { minVariantPrice: { amount: "78000", currencyCode: "IDR" } }, featuredImage: null, tags: ["dog", "puppy"], variants: { edges: [{ node: { id: "v4", availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "5", title: "Pawmeals Senior Vitality", handle: "senior-vitality", description: "Gentle formula for senior dogs 7+", priceRange: { minVariantPrice: { amount: "82000", currencyCode: "IDR" } }, featuredImage: null, tags: ["dog", "senior"], variants: { edges: [{ node: { id: "v5", availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "6", title: "Pawmeals Sensitive Digestion", handle: "sensitive-digestion", description: "Easily digestible for sensitive stomachs", priceRange: { minVariantPrice: { amount: "83000", currencyCode: "IDR" } }, featuredImage: null, tags: ["dog", "sensitive"], variants: { edges: [{ node: { id: "v6", availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "7", title: "Pawmeals Skin & Coat", handle: "skin-coat", description: "Omega-3 & 6 for healthy skin and shiny coat", priceRange: { minVariantPrice: { amount: "87000", currencyCode: "IDR" } }, featuredImage: null, tags: ["dog", "skin"], variants: { edges: [{ node: { id: "v7", availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "8", title: "Pawmeals High Energy", handle: "high-energy", description: "High-protein for active and working dogs", priceRange: { minVariantPrice: { amount: "90000", currencyCode: "IDR" } }, featuredImage: null, tags: ["dog", "active"], variants: { edges: [{ node: { id: "v8", availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "9", title: "Pawmeals Cat Classic", handle: "cat-classic", description: "Premium cooked food for adult cats", priceRange: { minVariantPrice: { amount: "72000", currencyCode: "IDR" } }, featuredImage: null, tags: ["cat", "adult"], variants: { edges: [{ node: { id: "v9", availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "10", title: "Pawmeals Cat Hairball", handle: "cat-hairball", description: "High-fiber formula to reduce hairballs", priceRange: { minVariantPrice: { amount: "76000", currencyCode: "IDR" } }, featuredImage: null, tags: ["cat", "hairball"], variants: { edges: [{ node: { id: "v10", availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "11", title: "Pawmeals Cat Kitten", handle: "cat-kitten", description: "DHA-rich formula for growing kittens", priceRange: { minVariantPrice: { amount: "74000", currencyCode: "IDR" } }, featuredImage: null, tags: ["cat", "kitten"], variants: { edges: [{ node: { id: "v11", availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "12", title: "Pawmeals Cat Senior", handle: "cat-senior", description: "Gentle nutrition for senior cats 7+", priceRange: { minVariantPrice: { amount: "78000", currencyCode: "IDR" } }, featuredImage: null, tags: ["cat", "senior"], variants: { edges: [{ node: { id: "v12", availableForSale: true } }] }, vendor: "Pawmeals" },
];

export function ProductsGrid({ locale, products, sort }: ProductsGridProps) {
  const displayProducts: ShopifyProduct[] = products.length > 0 ? products : (PLACEHOLDER_PRODUCTS as unknown as ShopifyProduct[]);

  const sorted = [...displayProducts].sort((a, b) => {
    if (sort === "price-asc") return parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount);
    if (sort === "price-desc") return parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount);
    return 0;
  });

  return (
    <div>
      <p className="text-pm-brown/60 text-body-sm mb-4">
        {sorted.length} {locale === "id" ? "produk" : "products"}
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((product) => (
          <Link
            key={product.id}
            href={`/${locale}/products/${product.handle}`}
            className="group bg-white rounded-2xl overflow-hidden border border-pm-sand/40 hover:border-pm-caramel/40 hover:shadow-warm-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
          >
            <div className="aspect-square bg-pm-cream overflow-hidden relative">
              {product.featuredImage ? (
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pm-caramel/10 to-pm-sand/20">
                  <span className="text-5xl">{product.tags?.includes("cat") ? "🐈" : "🐕"}</span>
                </div>
              )}
              <div className="absolute top-2 left-2">
                <span className="bg-pm-sage text-white text-body-xs font-bold px-2 py-0.5 rounded-pill">
                  {locale === "id" ? "Vet ✓" : "Vet ✓"}
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <span className="text-pm-brown/50 text-body-xs font-semibold uppercase tracking-wide mb-1">
                {product.tags?.includes("cat")
                  ? locale === "id" ? "Kucing" : "Cat"
                  : locale === "id" ? "Anjing" : "Dog"}
              </span>
              <h3 className="font-heading font-bold text-pm-brown text-body-md leading-snug mb-1 line-clamp-2 group-hover:text-pm-caramel transition-colors">
                {product.title}
              </h3>
              <p className="text-pm-brown/60 text-body-xs line-clamp-2 mb-3 flex-1">{product.description}</p>
              <div className="flex items-center gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-pm-caramel text-pm-caramel" />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-pm-caramel">
                  {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                </span>
                <span className="flex items-center gap-1 bg-pm-caramel/10 text-pm-caramel text-body-xs font-bold px-2.5 py-1 rounded-lg group-hover:bg-pm-caramel group-hover:text-white transition-colors">
                  <ShoppingCart className="w-3 h-3" />
                  {locale === "id" ? "Beli" : "Buy"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
