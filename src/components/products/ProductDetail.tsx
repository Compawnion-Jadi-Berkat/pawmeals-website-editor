"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Shield, Leaf, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { formatPrice } from "@/lib/shopify";
import { useCart } from "@/components/cart/CartProvider";
import type { Locale } from "@/lib/i18n/config";
import type { ShopifyProduct } from "@/types/shopify";

interface ProductDetailProps {
  locale: Locale;
  product: ShopifyProduct;
}

export function ProductDetail({ locale, product }: ProductDetailProps) {
  const { addItem: addToCart, isLoading } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants.edges[0]?.node.id ?? ""
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "nutrition" | "feeding">("description");
  const [addedToCart, setAddedToCart] = useState(false);

  const t = {
    addToCart: locale === "id" ? "Tambah ke Keranjang" : "Add to Cart",
    addedToCart: locale === "id" ? "Ditambahkan! ✓" : "Added! ✓",
    subscribe: locale === "id" ? "Langganan & Hemat 15%" : "Subscribe & Save 15%",
    vetApproved: locale === "id" ? "Disetujui Dokter Hewan" : "Vet Approved",
    noPreservatives: locale === "id" ? "Tanpa Pengawet" : "No Preservatives",
    naturalIngredients: locale === "id" ? "Bahan Alami" : "Natural Ingredients",
    description: locale === "id" ? "Deskripsi" : "Description",
    nutrition: locale === "id" ? "Nutrisi" : "Nutrition",
    feedingGuide: locale === "id" ? "Panduan Pemberian" : "Feeding Guide",
    quantity: locale === "id" ? "Jumlah" : "Quantity",
    inStock: locale === "id" ? "Tersedia" : "In Stock",
    outOfStock: locale === "id" ? "Habis" : "Out of Stock",
  };

  const firstVariant = product.variants.edges[0]?.node;
  const isAvailable = firstVariant?.availableForSale ?? false;

  const handleAddToCart = async () => {
    if (!selectedVariantId || !isAvailable) return;
    await addToCart(selectedVariantId, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const tabs = [
    { key: "description" as const, label: t.description },
    { key: "nutrition" as const, label: t.nutrition },
    { key: "feeding" as const, label: t.feedingGuide },
  ];

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
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
        {/* Product Image */}
        <div>
          <div className="aspect-square rounded-3xl overflow-hidden bg-pm-cream">
            {product.featuredImage ? (
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pm-caramel/10 to-pm-sand/20">
                <span className="text-9xl">{product.tags?.includes("cat") ? "🐈" : "🐕"}</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Category */}
          <span className="text-pm-brown/50 text-body-sm font-semibold uppercase tracking-wide">
            {product.tags?.includes("cat")
              ? locale === "id" ? "Makanan Kucing" : "Cat Food"
              : locale === "id" ? "Makanan Anjing" : "Dog Food"}
          </span>

          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-pm-brown mt-2 mb-3">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-pm-caramel text-pm-caramel" />
              ))}
            </div>
            <span className="text-pm-brown/60 text-body-sm">(4.9 · 127 {locale === "id" ? "ulasan" : "reviews"})</span>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex items-center gap-1.5 bg-pm-sage/10 text-pm-sage-dark text-body-xs font-bold px-3 py-1.5 rounded-pill">
              <Shield className="w-3.5 h-3.5" />
              {t.vetApproved}
            </div>
            <div className="flex items-center gap-1.5 bg-pm-caramel/10 text-pm-caramel-dark text-body-xs font-bold px-3 py-1.5 rounded-pill">
              <Leaf className="w-3.5 h-3.5" />
              {t.noPreservatives}
            </div>
            <div className="flex items-center gap-1.5 bg-green-50 text-green-700 text-body-xs font-bold px-3 py-1.5 rounded-pill">
              <Leaf className="w-3.5 h-3.5" />
              {t.naturalIngredients}
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="font-heading text-3xl font-bold text-pm-caramel">
              {formatPrice(
                product.priceRange.minVariantPrice.amount,
                product.priceRange.minVariantPrice.currencyCode
              )}
            </span>
            <span className="text-pm-brown/50 text-body-sm ml-2">/ pack</span>
          </div>

          {/* Availability */}
          <div className={`inline-flex items-center gap-1.5 text-body-sm font-semibold mb-6 ${isAvailable ? "text-pm-sage-dark" : "text-red-500"}`}>
            <span className={`w-2 h-2 rounded-full ${isAvailable ? "bg-pm-sage" : "bg-red-400"}`} />
            {isAvailable ? t.inStock : t.outOfStock}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-pm-brown font-semibold text-body-sm">{t.quantity}:</span>
            <div className="flex items-center gap-2 border border-pm-sand rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-pm-brown hover:bg-pm-cream transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-pm-brown">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-pm-brown hover:bg-pm-cream transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable || isLoading}
              className={`flex-1 flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-xl transition-all ${
                addedToCart
                  ? "bg-pm-sage text-white"
                  : "bg-pm-caramel text-white hover:bg-pm-caramel-dark"
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              <ShoppingCart className="w-5 h-5" />
              {addedToCart ? t.addedToCart : t.addToCart}
            </button>
            <Link
              href={`/${locale}/subscribe?product=${product.handle}`}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-pm-caramel text-pm-caramel font-bold py-4 px-6 rounded-xl hover:bg-pm-caramel hover:text-white transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              {t.subscribe}
            </Link>
          </div>

          {/* Tabs */}
          <div>
            <div className="flex border-b border-pm-sand/60 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2.5 text-body-sm font-semibold border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? "border-pm-caramel text-pm-caramel"
                      : "border-transparent text-pm-brown/60 hover:text-pm-brown"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="text-pm-brown/80 text-body-sm leading-relaxed">
              {activeTab === "description" && (
                <p>{product.description || (locale === "id" ? "Deskripsi produk akan segera tersedia." : "Product description coming soon.")}</p>
              )}
              {activeTab === "nutrition" && (
                <div className="space-y-2">
                  {[
                    { label: locale === "id" ? "Protein Kasar" : "Crude Protein", value: "28%" },
                    { label: locale === "id" ? "Lemak Kasar" : "Crude Fat", value: "12%" },
                    { label: locale === "id" ? "Serat Kasar" : "Crude Fiber", value: "3%" },
                    { label: locale === "id" ? "Kadar Air" : "Moisture", value: "72%" },
                    { label: locale === "id" ? "Abu" : "Ash", value: "2%" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between py-2 border-b border-pm-sand/40">
                      <span className="font-medium">{row.label}</span>
                      <span className="font-bold text-pm-caramel">{row.value}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "feeding" && (
                <div className="space-y-3">
                  {[
                    { size: locale === "id" ? "Kecil (< 10 kg)" : "Small (< 10 kg)", amount: "150-200g / hari" },
                    { size: locale === "id" ? "Sedang (10-25 kg)" : "Medium (10-25 kg)", amount: "250-350g / hari" },
                    { size: locale === "id" ? "Besar (> 25 kg)" : "Large (> 25 kg)", amount: "400-600g / hari" },
                  ].map((row) => (
                    <div key={row.size} className="flex justify-between items-center bg-pm-cream rounded-xl px-4 py-3">
                      <span className="font-medium">{row.size}</span>
                      <span className="font-bold text-pm-caramel">{row.amount}</span>
                    </div>
                  ))}
                  <p className="text-pm-brown/60 text-body-xs mt-2">
                    {locale === "id"
                      ? "* Sesuaikan porsi berdasarkan tingkat aktivitas dan kondisi kesehatan. Konsultasikan dengan dokter hewan untuk rekomendasi yang lebih spesifik."
                      : "* Adjust portions based on activity level and health condition. Consult your vet for more specific recommendations."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
