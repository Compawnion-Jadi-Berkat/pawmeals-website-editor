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
      <div className="bg-white border-b border-pm-sand/50">
        <div className="container py-10">
          <p className="text-pm-caramel font-bold text-label-md uppercase tracking-widest mb-2">
            {locale === "id" ? "Katalog Produk" : "Product Catalogue"}
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-pm-brown mb-3">
            {locale === "id" ? "Semua Produk Pawmeals" : "All Pawmeals Products"}
          </h1>
          <p className="text-pm-brown/70 text-body-lg max-w-2xl">
            {locale === "id"
              ? "12 varian makanan masak alami untuk anjing dan kucing. Tanpa pengawet, direkomendasikan dokter hewan."
              : "12 variants of natural cooked food for dogs and cats. No preservatives, vet recommended."}
          </p>
        </div>
      </div>

      <div className="container py-8">
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
