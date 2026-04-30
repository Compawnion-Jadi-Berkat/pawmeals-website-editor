import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/CartPageClient";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "id" ? "Keranjang Belanja | Pawmeals" : "Shopping Cart | Pawmeals",
    robots: { index: false },
  };
}

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <CartPageClient locale={locale} />;
}
