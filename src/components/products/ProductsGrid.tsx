import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/shopify";
import type { Locale } from "@/lib/i18n/config";
import type { ShopifyProduct } from "@/types/shopify";
import { getProductPlaceholder } from "@/lib/placeholder-images";

interface ProductsGridProps {
  locale: Locale;
  products: ShopifyProduct[];
  sort?: string;
}

// Real product names from UAT spec (WebsiteDevelopment.xlsx Sheet 4A)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PLACEHOLDER_PRODUCTS = [
  { id: "1",  title: "Clucky Chicky",       handle: "clucky-chicky",       description: "Cooked chicken — balanced daily nutrition for adult dogs",       priceRange: { minVariantPrice: { amount: "75000",  currencyCode: "IDR" } }, featuredImage: { url: getProductPlaceholder("Clucky Chicky"),       altText: "Pawmeals Clucky Chicky" },       tags: ["dog", "chicken"], variants: { edges: [{ node: { id: "v1",  availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "2",  title: "Beefy Buddy",         handle: "beefy-buddy",         description: "Cooked beef — rich in protein for strong muscles",               priceRange: { minVariantPrice: { amount: "80000",  currencyCode: "IDR" } }, featuredImage: { url: getProductPlaceholder("Beefy Buddy"),         altText: "Pawmeals Beefy Buddy" },         tags: ["dog", "beef"],    variants: { edges: [{ node: { id: "v2",  availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "3",  title: "Fishy Frenzy",        handle: "fishy-frenzy",        description: "Cooked fish — omega-3 for healthy skin and shiny coat",          priceRange: { minVariantPrice: { amount: "78000",  currencyCode: "IDR" } }, featuredImage: { url: getProductPlaceholder("Fishy Frenzy"),        altText: "Pawmeals Fishy Frenzy" },        tags: ["dog", "fish"],    variants: { edges: [{ node: { id: "v3",  availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "4",  title: "Perky Porky",         handle: "perky-porky",         description: "Cooked pork — flavourful and highly digestible",               priceRange: { minVariantPrice: { amount: "82000",  currencyCode: "IDR" } }, featuredImage: { url: getProductPlaceholder("Perky Porky"),         altText: "Pawmeals Perky Porky" },         tags: ["dog", "pork"],    variants: { edges: [{ node: { id: "v4",  availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "5",  title: "Goat Goodness",       handle: "goat-goodness",       description: "Cooked goat — hypoallergenic protein for sensitive dogs",       priceRange: { minVariantPrice: { amount: "85000",  currencyCode: "IDR" } }, featuredImage: { url: getProductPlaceholder("Goat Goodness"),       altText: "Pawmeals Goat Goodness" },       tags: ["dog", "goat"],    variants: { edges: [{ node: { id: "v5",  availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "6",  title: "Bon Rabbetit",        handle: "bon-rabbetit",        description: "Cooked rabbit — lean protein, ideal for weight management",    priceRange: { minVariantPrice: { amount: "86000",  currencyCode: "IDR" } }, featuredImage: { url: getProductPlaceholder("Bon Rabbetit"),        altText: "Pawmeals Bon Rabbetit" },        tags: ["dog", "rabbit"],  variants: { edges: [{ node: { id: "v6",  availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "7",  title: "La La Lamb",          handle: "la-la-lamb",          description: "Cooked lamb — rich in zinc and iron for vitality",            priceRange: { minVariantPrice: { amount: "85000",  currencyCode: "IDR" } }, featuredImage: { url: getProductPlaceholder("La La Lamb"),          altText: "Pawmeals La La Lamb" },          tags: ["dog", "lamb"],    variants: { edges: [{ node: { id: "v7",  availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "8",  title: "Duck Delish",         handle: "duck-delish",         description: "Cooked duck — novel protein, great for allergy-prone dogs",   priceRange: { minVariantPrice: { amount: "76000",  currencyCode: "IDR" } }, featuredImage: { url: getProductPlaceholder("Duck Delish"),         altText: "Pawmeals Duck Delish" },         tags: ["dog", "duck"],    variants: { edges: [{ node: { id: "v8",  availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "9",  title: "Lamb of Fame",        handle: "lamb-of-fame",        description: "Grain Free Lamb — premium grain-free formula",               priceRange: { minVariantPrice: { amount: "100000", currencyCode: "IDR" } }, featuredImage: { url: getProductPlaceholder("Lamb of Fame"),        altText: "Pawmeals Lamb of Fame" },        tags: ["dog", "lamb", "grain-free"], variants: { edges: [{ node: { id: "v9",  availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "10", title: "Granny Rabbity",      handle: "granny-rabbity",      description: "Cooked rabbit for senior dogs — gentle on joints",           priceRange: { minVariantPrice: { amount: "86000",  currencyCode: "IDR" } }, featuredImage: { url: getProductPlaceholder("Granny Rabbity"),      altText: "Pawmeals Granny Rabbity" },      tags: ["dog", "senior"],  variants: { edges: [{ node: { id: "v10", availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "11", title: "Cat Quack'A Tuna",    handle: "cat-quack-a-tuna",    description: "Duck & tuna cooked cat food — irresistible flavour",         priceRange: { minVariantPrice: { amount: "75000",  currencyCode: "IDR" } }, featuredImage: { url: getProductPlaceholder("Cat Quack Tuna"),      altText: "Pawmeals Cat Quack'A Tuna" },    tags: ["cat", "duck"],    variants: { edges: [{ node: { id: "v11", availableForSale: true } }] }, vendor: "Pawmeals" },
  { id: "12", title: "Cat Salmon Rostie",   handle: "cat-salmon-rostie",   description: "Salmon & chicken cooked cat food — rich in omega-3",         priceRange: { minVariantPrice: { amount: "65000",  currencyCode: "IDR" } }, featuredImage: { url: getProductPlaceholder("Cat Salmon Rostie"),   altText: "Pawmeals Cat Salmon Rostie" },   tags: ["cat", "salmon"],  variants: { edges: [{ node: { id: "v12", availableForSale: true } }] }, vendor: "Pawmeals" },
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
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pm-caramel/10 to-pm-sand/20">
                  <span className="text-5xl">{product.tags?.includes("cat") ? "🐈" : "🐕"}</span>
                </div>
              )}
              <div className="absolute top-2 left-2">
                <span className="bg-pm-sage text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {locale === "id" ? "Vet ✓" : "Vet ✓"}
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <span className="text-pm-brown/50 text-xs font-semibold uppercase tracking-wide mb-1">
                {product.tags?.includes("cat")
                  ? locale === "id" ? "Kucing" : "Cat"
                  : locale === "id" ? "Anjing" : "Dog"}
              </span>
              <h3 className="font-heading font-bold text-pm-brown text-sm leading-snug mb-1 line-clamp-2 group-hover:text-pm-caramel transition-colors">
                {product.title}
              </h3>
              <p className="text-pm-brown/60 text-xs line-clamp-2 mb-3 flex-1">{product.description}</p>
              <div className="flex items-center gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-pm-caramel text-pm-caramel" />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-pm-caramel">
                  {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                </span>
                <span className="flex items-center gap-1 bg-pm-caramel/10 text-pm-caramel text-xs font-bold px-2.5 py-1 rounded-lg group-hover:bg-pm-caramel group-hover:text-white transition-colors">
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
