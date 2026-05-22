import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Cat, Dog, ShoppingBag, Sparkles, Star } from "lucide-react";
import { formatPrice } from "@/lib/shopify";
import type { Locale } from "@/lib/i18n/config";
import type { ShopifyProduct } from "@/types/shopify";
import { getProductPlaceholder } from "@/lib/placeholder-images";

interface ProductsGridProps {
  locale: Locale;
  products: ShopifyProduct[];
  sort?: string;
}

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
    <section aria-label={locale === "id" ? "Daftar produk Pawmeals" : "Pawmeals product list"}>
      <div className="mb-5 flex flex-col gap-3 rounded-3xl border border-pm-sand/50 bg-white/80 px-5 py-4 shadow-warm-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-body-xs font-bold uppercase tracking-[0.18em] text-pm-caramel-dark">
            {locale === "id" ? "Katalog Kurasi" : "Curated Catalogue"}
          </p>
          <p className="text-pm-brown/70 text-body-sm">
            {sorted.length} {locale === "id" ? "produk siap dipilih berdasarkan kebutuhan hewan" : "products selected by pet need"}
          </p>
        </div>
        <div className="flex items-center gap-2 text-body-xs font-bold uppercase tracking-[0.16em] text-pm-brown/60">
          <Award className="w-4 h-4 text-pm-caramel" aria-hidden="true" />
          {locale === "id" ? "Vet-informed" : "Vet-informed"}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
        {sorted.map((product) => {
          const isCat = product.tags?.includes("cat");
          const SpeciesIcon = isCat ? Cat : Dog;
          return (
            <Link
              key={product.id}
              href={`/${locale}/products/${product.handle}`}
              className="group luxury-panel rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-xl flex flex-col focus-visible:ring-2 focus-visible:ring-pm-caramel"
            >
              <div className="aspect-[4/3] bg-pm-cream overflow-hidden relative">
                {product.featuredImage ? (
                  <Image
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    width={560}
                    height={420}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pm-cream via-white to-pm-sand/30">
                    <SpeciesIcon className="w-16 h-16 text-pm-caramel/40" aria-hidden="true" />
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-pm-brown/45 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-white/92 text-pm-brown text-body-xs font-bold px-3 py-1.5 rounded-pill shadow-warm-sm backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5 text-pm-caramel" aria-hidden="true" />
                    {locale === "id" ? "Fresh Cooked" : "Fresh Cooked"}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-pill bg-pm-sage text-white px-3 py-1.5 text-body-xs font-bold shadow-warm-sm">
                  <Award className="w-3.5 h-3.5" aria-hidden="true" />
                  {locale === "id" ? "Dikurasi Vet" : "Vet Curated"}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-pm-caramel-dark text-body-xs font-bold uppercase tracking-[0.16em] mb-2">
                  {isCat ? locale === "id" ? "Makanan Kucing" : "Cat Food" : locale === "id" ? "Makanan Anjing" : "Dog Food"}
                </span>
                <h3 className="font-heading font-bold text-pm-brown text-xl leading-snug mb-2 group-hover:text-pm-caramel-dark transition-colors line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-pm-brown/65 text-body-sm line-clamp-2 mb-4 flex-1">{product.description}</p>
                <div className="flex items-center gap-1 mb-4" aria-label="4.9 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-pm-gold text-pm-gold" aria-hidden="true" />
                  ))}
                  <span className="text-pm-brown/50 text-body-xs ml-1">4.9</span>
                </div>
                <div className="flex items-end justify-between gap-3 border-t border-pm-sand/40 pt-4">
                  <div>
                    <span className="block text-body-xs text-pm-brown/50 font-semibold">{locale === "id" ? "Mulai dari" : "From"}</span>
                    <span className="font-heading font-bold text-pm-brown text-lg">
                      {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-pm-brown text-white text-body-sm font-bold px-4 py-2.5 rounded-pill group-hover:bg-pm-caramel-dark transition-colors">
                    <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                    {locale === "id" ? "Pilih" : "Select"}
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
