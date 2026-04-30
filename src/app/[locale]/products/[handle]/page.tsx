import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/shopify";
import { ProductDetail } from "@/components/products/ProductDetail";
import { ProductSchema, BreadcrumbSchema } from "@/components/seo/OrganizationSchema";
import type { Locale } from "@/lib/i18n/config";

interface ProductPageProps {
  params: Promise<{ locale: Locale; handle: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, handle } = await params;
  const data = await getProductByHandle(handle).catch(() => null);

  if (!data?.product) {
    return { title: "Product Not Found" };
  }

  const product = data.product;

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
  const data = await getProductByHandle(handle).catch(() => null);

  if (!data?.product) {
    notFound();
  }

  const product = data.product;

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

      <ProductDetail locale={locale} product={product} />
    </>
  );
}
