import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { getAllProducts } from "@/lib/shopify";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { ProductFilters } from "@/components/products/ProductFilters";
import { BreadcrumbSchema } from "@/components/seo/OrganizationSchema";
import type { Locale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/products`,
      languages: { "id-ID": "/id/products", "en-US": "/en/products" },
    },
  };
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ type?: string; sort?: string }>;
}) {
  const { locale } = await params;
  const { type, sort } = await searchParams;

  const productsData = await getAllProducts().catch(() => ({ products: [] }));
  const allProducts = productsData.products ?? [];

  // Filter by type
  const filtered = type
    ? allProducts.filter((p) => p.tags?.includes(type))
    : allProducts;

  const breadcrumbs = [
    { name: "Pawmeals", url: `https://pawmeals.com/${locale}` },
    {
      name: locale === "id" ? "Produk" : "Products",
      url: `https://pawmeals.com/${locale}/products`,
    },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Page Header */}
      <div className="relative overflow-hidden border-b border-pm-sand/60 bg-gradient-to-br from-pm-ivory via-white to-pm-cream/70">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-pm-gold/20 blur-3xl" aria-hidden="true" />
        <div className="absolute left-8 top-10 h-24 w-24 rounded-full border border-pm-gold/20" aria-hidden="true" />
        <div className="container relative py-14 lg:py-18">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex rounded-full border border-pm-gold/30 bg-white/75 px-4 py-2 text-label-sm font-bold uppercase tracking-[0.24em] text-pm-caramel shadow-soft">
              {locale === "id" ? "Katalog Kurasi" : "Curated Catalogue"}
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-pm-brown mb-5">
              {locale === "id" ? "Semua Produk Pawmeals" : "All Pawmeals Products"}
            </h1>
            <p className="text-pm-brown/72 text-body-lg leading-relaxed max-w-2xl">
              {locale === "id"
                ? "Pilihan makanan masak alami untuk anjing dan kucing, dikurasi dengan bahan asli, tanpa pengawet, dan diarahkan untuk rutinitas makan yang lebih tenang."
                : "A refined selection of naturally cooked meals for dogs and cats, curated with real ingredients, no preservatives, and a calmer daily feeding ritual."}
            </p>
          </div>
        </div>
      </div>

      <div className="container py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters locale={locale} activeType={type} />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <Suspense
              fallback={
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-2xl bg-pm-cream animate-pulse" />
                  ))}
                </div>
              }
            >
              <ProductsGrid
                locale={locale}
                products={filtered}
                sort={sort}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
