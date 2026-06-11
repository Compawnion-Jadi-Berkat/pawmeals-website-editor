import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSanityProductByHandle } from "@/lib/sanity/client";
import { ProductDetail } from "@/components/products/ProductDetail";
import { ProductSchema, BreadcrumbSchema } from "@/components/seo/OrganizationSchema";
import type { Locale } from "@/lib/i18n/config";
export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ locale: string; handle: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, handle } = await params;
  const product = await getSanityProductByHandle(handle, locale).catch(() => null);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | Pawmeals`,
    description: product.description?.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description?.slice(0, 160),
      images: product.featuredImage
        ? [{ url: product.featuredImage.url, alt: product.featuredImage.altText || product.title }]
        : [],
    },
    alternates: {
      canonical: `/${locale}/products/${handle}`,
      languages: {
        "id-ID": `/id/products/${handle}`,
        "en-US": `/en/products/${handle}`,
      },
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, handle } = await params;
  const product = await getSanityProductByHandle(handle, locale).catch(() => null);

  if (!product) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Pawmeals", url: `https://pawmeals.com/${locale}` },
    {
      name: locale === "id" ? "Produk" : "Products",
      url: `https://pawmeals.com/${locale}/products`,
    },
    {
      name: product.title,
      url: `https://pawmeals.com/${locale}/products/${handle}`,
    },
  ];

  return (
    <>
      {/* AEO Structured Data */}
      <ProductSchema product={product} locale={locale} />
      <BreadcrumbSchema items={breadcrumbs} />

      <ProductDetail locale={locale as Locale} product={product} />
    </>
  );
}
