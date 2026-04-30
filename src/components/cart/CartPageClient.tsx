"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, RefreshCw } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/shopify";
import type { Locale } from "@/lib/i18n/config";

interface CartPageClientProps {
  locale: Locale;
}

export function CartPageClient({ locale }: CartPageClientProps) {
  const { cart, removeItem: removeFromCart, updateItem: updateQuantity, isLoading } = useCart();

  const t = {
    cart: locale === "id" ? "Keranjang Belanja" : "Shopping Cart",
    empty: locale === "id" ? "Keranjangmu masih kosong" : "Your cart is empty",
    emptyDesc: locale === "id" ? "Mulai belanja dan temukan makanan terbaik untuk hewan peliharaanmu." : "Start shopping and find the best food for your pet.",
    shopNow: locale === "id" ? "Belanja Sekarang" : "Shop Now",
    checkout: locale === "id" ? "Lanjut ke Pembayaran" : "Proceed to Checkout",
    subscribe: locale === "id" ? "Ubah ke Langganan & Hemat 15%" : "Switch to Subscribe & Save 15%",
    subtotal: locale === "id" ? "Subtotal" : "Subtotal",
    shipping: locale === "id" ? "Ongkir" : "Shipping",
    free: locale === "id" ? "Gratis" : "Free",
    total: locale === "id" ? "Total" : "Total",
    remove: locale === "id" ? "Hapus" : "Remove",
    items: locale === "id" ? "produk" : "items",
    continueShop: locale === "id" ? "Lanjut Belanja" : "Continue Shopping",
  };

  const lineItems = cart?.lines?.edges ?? [];
  const totalAmount = cart?.cost?.totalAmount;
  const subtotalAmount = cart?.cost?.subtotalAmount;

  if (lineItems.length === 0) {
    return (
      <div className="container py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-pm-sand mx-auto mb-4" />
        <h1 className="font-heading text-2xl font-bold text-pm-brown mb-2">{t.empty}</h1>
        <p className="text-pm-brown/60 mb-8">{t.emptyDesc}</p>
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center gap-2 bg-pm-caramel text-white font-bold px-8 py-4 rounded-xl hover:bg-pm-caramel-dark transition-colors"
        >
          {t.shopNow}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-pm-brown mb-2">{t.cart}</h1>
      <p className="text-pm-brown/50 text-body-sm mb-8">
        {lineItems.length} {t.items}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {lineItems.map(({ node: item }) => (
            <div key={item.id} className="bg-white rounded-2xl border border-pm-sand/40 p-4 flex gap-4">
              <div className="w-20 h-20 rounded-xl bg-pm-cream overflow-hidden flex-shrink-0">
                {item.merchandise?.product?.featuredImage ? (
                  <Image
                    src={item.merchandise.product.featuredImage.url}
                    alt={item.merchandise.product.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">🐾</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-pm-brown text-body-md truncate">
                  {item.merchandise?.product?.title}
                </h3>
                <p className="text-pm-brown/50 text-body-xs mb-3">{item.merchandise?.title}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 border border-pm-sand rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      disabled={isLoading}
                      className="w-8 h-8 flex items-center justify-center text-pm-brown hover:bg-pm-cream transition-colors disabled:opacity-50"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-bold text-pm-brown text-body-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={isLoading}
                      className="w-8 h-8 flex items-center justify-center text-pm-brown hover:bg-pm-cream transition-colors disabled:opacity-50"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-bold text-pm-caramel">
                      {formatPrice(item.cost?.totalAmount?.amount ?? "0", item.cost?.totalAmount?.currencyCode ?? "IDR")}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      disabled={isLoading}
                      className="text-pm-brown/30 hover:text-red-400 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Subscribe Upsell */}
          <div className="bg-pm-caramel/5 border border-pm-caramel/20 rounded-2xl p-4 flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-pm-caramel flex-shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-pm-brown text-body-sm">{t.subscribe}</p>
              <p className="text-pm-brown/60 text-body-xs">
                {locale === "id" ? "Pengiriman otomatis setiap 2-4 minggu" : "Auto delivery every 2-4 weeks"}
              </p>
            </div>
            <Link
              href={`/${locale}/subscribe`}
              className="text-pm-caramel font-bold text-body-xs hover:underline whitespace-nowrap"
            >
              {locale === "id" ? "Pelajari" : "Learn more"}
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-2xl border border-pm-sand/40 p-6 sticky top-24">
            <h2 className="font-heading font-bold text-pm-brown text-body-lg mb-4">
              {locale === "id" ? "Ringkasan Pesanan" : "Order Summary"}
            </h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-body-sm">
                <span className="text-pm-brown/70">{t.subtotal}</span>
                <span className="font-semibold text-pm-brown">
                  {subtotalAmount ? formatPrice(subtotalAmount.amount, subtotalAmount.currencyCode) : "—"}
                </span>
              </div>
              <div className="flex justify-between text-body-sm">
                <span className="text-pm-brown/70">{t.shipping}</span>
                <span className="font-semibold text-pm-sage-dark">{t.free}</span>
              </div>
              <div className="h-px bg-pm-sand/50" />
              <div className="flex justify-between">
                <span className="font-heading font-bold text-pm-brown">{t.total}</span>
                <span className="font-heading font-bold text-pm-caramel text-body-lg">
                  {totalAmount ? formatPrice(totalAmount.amount, totalAmount.currencyCode) : "—"}
                </span>
              </div>
            </div>
            <Link
              href={cart?.checkoutUrl ?? `/${locale}/checkout`}
              className="w-full flex items-center justify-center gap-2 bg-pm-caramel text-white font-bold py-4 rounded-xl hover:bg-pm-caramel-dark transition-colors mb-3"
            >
              {t.checkout}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${locale}/products`}
              className="w-full flex items-center justify-center text-pm-brown/60 text-body-sm hover:text-pm-caramel transition-colors"
            >
              {t.continueShop}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
