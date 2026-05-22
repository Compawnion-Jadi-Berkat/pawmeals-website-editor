"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronDown, ChevronUp, RefreshCw, ShoppingCart, Star } from "lucide-react";
import { formatPrice } from "@/lib/shopify";
import { useCart } from "@/components/cart/CartProvider";
import type { Locale } from "@/lib/i18n/config";
import type { WebsiteProduct } from "@/types/site-content";

interface ProductDetailProps {
  locale: Locale;
  product: WebsiteProduct;
}

export function ProductDetail({ locale, product }: ProductDetailProps) {
  const { addItem: addToCart, isLoading } = useCart();
  const firstVariant = product.variants?.edges?.[0]?.node;
  const [selectedVariantId] = useState(firstVariant?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "ingredients" | "feeding">("description");
  const [addedToCart, setAddedToCart] = useState(false);
  const isAvailable = firstVariant?.availableForSale ?? false;

  const t = {
    addToCart: locale === "id" ? "Tambah ke Keranjang" : "Add to Cart",
    addedToCart: locale === "id" ? "Ditambahkan" : "Added",
    subscribe: locale === "id" ? "Langganan" : "Subscribe",
    description: locale === "id" ? "Deskripsi" : "Description",
    ingredients: locale === "id" ? "Bahan" : "Ingredients",
    feedingGuide: locale === "id" ? "Panduan Pemberian" : "Feeding Guide",
    quantity: locale === "id" ? "Jumlah" : "Quantity",
    inStock: locale === "id" ? "Tersedia" : "In Stock",
    outOfStock: locale === "id" ? "Habis" : "Out of Stock",
    priceFrom: locale === "id" ? "Mulai dari" : "From",
  };

  const detailImages = product.images?.length ? product.images : product.featuredImage ? [product.featuredImage] : [];
  const badges = useMemo(() => (product.tags || []).filter((tag) => tag && tag !== product.category?.slug), [product.tags, product.category?.slug]);
  const hasIngredients = Boolean(product.ingredients?.length);
  const hasFeedingGuide = Boolean(product.feedingGuide);
  const tabs = [
    { key: "description" as const, label: t.description, visible: Boolean(product.description) },
    { key: "ingredients" as const, label: t.ingredients, visible: hasIngredients },
    { key: "feeding" as const, label: t.feedingGuide, visible: hasFeedingGuide },
  ].filter((tab) => tab.visible);

  const handleAddToCart = async () => {
    if (!selectedVariantId || !isAvailable) return;
    await addToCart(selectedVariantId, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="container py-8">
      <nav className="flex items-center gap-2 text-body-sm text-pm-brown/50 mb-6">
        <Link href={`/${locale}`} className="hover:text-pm-caramel transition-colors">
          {locale === "id" ? "Beranda" : "Home"}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/products`} className="hover:text-pm-caramel transition-colors">
          {locale === "id" ? "Produk" : "Products"}
        </Link>
        <span>/</span>
        <span className="text-pm-brown">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="space-y-4">
          {detailImages[0]?.url && (
            <div className="aspect-square rounded-3xl overflow-hidden bg-pm-cream">
              <Image
                src={detailImages[0].url}
                alt={detailImages[0].altText || product.title}
                width={720}
                height={720}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          )}
          {detailImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {detailImages.slice(1, 5).map((image) => (
                <div key={image.url} className="aspect-square rounded-2xl overflow-hidden bg-pm-cream">
                  <Image src={image.url} alt={image.altText || product.title} width={180} height={180} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.category?.title && (
            <span className="text-pm-brown/50 text-body-sm font-semibold uppercase tracking-wide">
              {product.category.title}
            </span>
          )}

          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-pm-brown mt-2 mb-3">
            {product.title}
          </h1>

          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {badges.map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 bg-pm-sage/10 text-pm-sage-dark text-body-xs font-bold px-3 py-1.5 rounded-pill">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {badge}
                </div>
              ))}
            </div>
          )}

          <div className="mb-6">
            <p className="text-pm-brown/50 text-body-sm font-semibold mb-1">{t.priceFrom}</p>
            <span className="font-heading text-3xl font-bold text-pm-caramel">
              {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
            </span>
          </div>

          {product.pricingTiers && product.pricingTiers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {product.pricingTiers.map((tier, index) => (
                <div key={`${tier.label}-${tier.weightLabel}-${index}`} className="rounded-2xl border border-pm-sand/70 bg-white p-4 shadow-warm-sm">
                  {tier.label && <p className="font-bold text-pm-brown text-body-sm">{tier.label}</p>}
                  {tier.weightLabel && <p className="text-pm-brown/60 text-body-xs mt-1">{tier.weightLabel}</p>}
                  {typeof tier.priceIDR === "number" && <p className="text-pm-caramel font-heading font-bold text-xl mt-2">{formatPrice(String(tier.priceIDR), "IDR")}</p>}
                  {tier.note && <p className="text-pm-brown/50 text-body-xs mt-2">{tier.note}</p>}
                </div>
              ))}
            </div>
          )}

          <div className={`inline-flex items-center gap-1.5 text-body-sm font-semibold mb-6 ${isAvailable ? "text-pm-sage-dark" : "text-red-500"}`}>
            <span className={`w-2 h-2 rounded-full ${isAvailable ? "bg-pm-sage" : "bg-red-400"}`} />
            {isAvailable ? t.inStock : t.outOfStock}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-pm-brown font-semibold text-body-sm">{t.quantity}:</span>
            <div className="flex items-center gap-2 border border-pm-sand rounded-xl overflow-hidden">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-pm-brown hover:bg-pm-cream transition-colors" aria-label="Decrease quantity">
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-pm-brown">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="w-10 h-10 flex items-center justify-center text-pm-brown hover:bg-pm-cream transition-colors" aria-label="Increase quantity">
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable || isLoading}
              className={`flex-1 flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-xl transition-all ${addedToCart ? "bg-pm-sage text-white" : "bg-pm-caramel text-white hover:bg-pm-caramel-dark"} disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              <ShoppingCart className="w-5 h-5" />
              {addedToCart ? t.addedToCart : t.addToCart}
            </button>
            <Link href={`/${locale}/subscribe?product=${product.handle}`} className="flex-1 flex items-center justify-center gap-2 border-2 border-pm-caramel text-pm-caramel font-bold py-4 px-6 rounded-xl hover:bg-pm-caramel hover:text-white transition-all">
              <RefreshCw className="w-4 h-4" />
              {t.subscribe}
            </Link>
          </div>

          {tabs.length > 0 && (
            <div>
              <div className="flex border-b border-pm-sand/60 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2.5 text-body-sm font-semibold border-b-2 transition-colors ${activeTab === tab.key ? "border-pm-caramel text-pm-caramel" : "border-transparent text-pm-brown/60 hover:text-pm-brown"}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="text-pm-brown/80 text-body-sm leading-relaxed">
                {activeTab === "description" && product.description && <p>{product.description}</p>}
                {activeTab === "ingredients" && hasIngredients && (
                  <ul className="flex flex-wrap gap-2">
                    {product.ingredients?.map((ingredient) => (
                      <li key={ingredient} className="rounded-pill bg-pm-cream px-3 py-1.5 font-semibold text-pm-brown/75">{ingredient}</li>
                    ))}
                  </ul>
                )}
                {activeTab === "feeding" && product.feedingGuide && <p className="whitespace-pre-line">{product.feedingGuide}</p>}
              </div>
            </div>
          )}

          <div className="sr-only" aria-hidden="true">
            <Star />
          </div>
        </div>
      </div>
    </div>
  );
}
