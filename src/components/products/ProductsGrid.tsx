import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Cat, Dog, ShoppingBag, Sparkles, Star } from "lucide-react";
import { formatPrice } from "@/lib/shopify";
import type { Locale } from "@/lib/i18n/config";
import type { WebsiteProduct } from "@/types/site-content";

interface ProductsGridProps {
  locale: Locale;
  products: WebsiteProduct[];
  sort?: string;
}

export function ProductsGrid({ locale, products, sort }: ProductsGridProps) {
  const displayProducts = products;

  const sorted = [...displayProducts].sort((a, b) => {
    if (sort === "price-asc") return parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount);
    if (sort === "price-desc") return parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount);
    return 0;
  });

  if (sorted.length === 0) {
    return (
      <section aria-label={locale === "id" ? "Daftar produk Pawmeals" : "Pawmeals product list"}>
        <div className="rounded-3xl border border-pm-sand/50 bg-white/85 px-6 py-12 text-center shadow-warm-sm">
          <h2 className="font-heading text-2xl font-bold text-pm-brown mb-3">
            {locale === "id" ? "Belum ada produk yang dipublikasikan" : "No published products yet"}
          </h2>
          <p className="mx-auto max-w-xl text-body-md text-pm-brown/65">
            {locale === "id"
              ? "Tambahkan produk dan kategori di Pawmeals Studio agar katalog ini tampil di website."
              : "Add products and categories in Pawmeals Studio to populate this catalogue on the website."}
          </p>
        </div>
      </section>
    );
  }

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
          const isCat = product.category?.slug === "cat" || product.tags?.includes("cat");
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
                  {product.category?.title || (isCat ? locale === "id" ? "Makanan Kucing" : "Cat Food" : locale === "id" ? "Makanan Anjing" : "Dog Food")}
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
                    {product.ctaLabel || (locale === "id" ? "Pilih" : "Select")}
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
