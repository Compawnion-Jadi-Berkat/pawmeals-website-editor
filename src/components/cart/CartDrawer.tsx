"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/shopify";
import type { Locale } from "@/lib/i18n/config";

interface CartDrawerProps {
  locale: Locale;
}

export function CartDrawer({ locale }: CartDrawerProps) {
  const { cart, isOpen, isLoading, closeCart, updateItem, removeItem } = useCart();

  const lines = cart?.lines?.edges?.map((e) => e.node) ?? [];
  const subtotal = cart?.cost?.subtotalAmount;
  const total = cart?.cost?.totalAmount;

  const t = {
    title: locale === "id" ? "Keranjang Belanja" : "Your Cart",
    empty: locale === "id" ? "Keranjang kamu masih kosong" : "Your cart is empty",
    emptyDesc: locale === "id" ? "Temukan makanan terbaik untuk hewan peliharaanmu" : "Find the perfect food for your pet",
    shopNow: locale === "id" ? "Belanja Sekarang" : "Shop Now",
    subtotal: locale === "id" ? "Subtotal" : "Subtotal",
    total: locale === "id" ? "Total" : "Total",
    checkout: locale === "id" ? "Lanjut ke Pembayaran" : "Proceed to Checkout",
    continueShopping: locale === "id" ? "Lanjut Belanja" : "Continue Shopping",
    freeShipping: locale === "id" ? "Gratis ongkir untuk pembelian di atas Rp 250.000" : "Free shipping on orders over Rp 250,000",
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-pm-sand/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-pm-caramel" />
            <h2 className="font-heading font-bold text-lg text-pm-brown">{t.title}</h2>
            {lines.length > 0 && (
              <span className="bg-pm-caramel text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cart?.totalQuantity}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-pm-brown/60 hover:bg-pm-cream-dark hover:text-pm-brown transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-pm-cream flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-pm-caramel/50" />
              </div>
              <div>
                <p className="font-heading font-bold text-pm-brown text-lg mb-1">{t.empty}</p>
                <p className="text-pm-brown/60 text-sm">{t.emptyDesc}</p>
              </div>
              <Link
                href={`/${locale}/products`}
                onClick={closeCart}
                className="btn-primary"
              >
                {t.shopNow}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {lines.map((line) => (
                <div
                  key={line.id}
                  className="flex gap-3 p-3 bg-pm-cream rounded-xl"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    {line.merchandise?.product?.featuredImage ? (
                      <Image
                        src={line.merchandise.product.featuredImage.url}
                        alt={line.merchandise.product.featuredImage.altText || line.merchandise.product.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-pm-sand/30 flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-pm-brown/30" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/${locale}/products/${line.merchandise?.product?.handle}`}
                      onClick={closeCart}
                      className="font-semibold text-pm-brown text-sm hover:text-pm-caramel transition-colors line-clamp-2 leading-snug"
                    >
                      {line.merchandise?.product?.title}
                    </Link>
                    {line.merchandise?.selectedOptions?.map((opt) => (
                      <p key={opt.name} className="text-pm-brown/60 text-xs mt-0.5">
                        {opt.name}: {opt.value}
                      </p>
                    ))}
                    <p className="font-bold text-pm-caramel text-sm mt-1">
                      {formatPrice(line.cost?.amountPerQuantity?.amount, line.cost?.amountPerQuantity?.currencyCode)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          if (line.quantity <= 1) {
                            removeItem(line.id);
                          } else {
                            updateItem(line.id, line.quantity - 1);
                          }
                        }}
                        disabled={isLoading}
                        className="w-6 h-6 rounded-md bg-white border border-pm-sand flex items-center justify-center text-pm-brown hover:border-pm-caramel hover:text-pm-caramel transition-colors disabled:opacity-50"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-pm-brown">
                        {line.quantity}
                      </span>
                      <button
                        onClick={() => updateItem(line.id, line.quantity + 1)}
                        disabled={isLoading}
                        className="w-6 h-6 rounded-md bg-white border border-pm-sand flex items-center justify-center text-pm-brown hover:border-pm-caramel hover:text-pm-caramel transition-colors disabled:opacity-50"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(line.id)}
                        disabled={isLoading}
                        className="ml-auto w-6 h-6 rounded-md flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="px-6 py-4 border-t border-pm-sand/50 bg-white">
            {/* Free shipping notice */}
            <p className="text-center text-xs text-pm-sage font-semibold mb-3">
              🐾 {t.freeShipping}
            </p>

            {/* Totals */}
            <div className="space-y-1.5 mb-4">
              {subtotal && (
                <div className="flex justify-between text-sm text-pm-brown/70">
                  <span>{t.subtotal}</span>
                  <span>{formatPrice(subtotal.amount, subtotal.currencyCode)}</span>
                </div>
              )}
              {total && (
                <div className="flex justify-between font-bold text-pm-brown">
                  <span>{t.total}</span>
                  <span className="text-pm-caramel">
                    {formatPrice(total.amount, total.currencyCode)}
                  </span>
                </div>
              )}
            </div>

            {/* Checkout Button */}
            <a
              href={cart?.checkoutUrl}
              className="btn-primary w-full flex items-center justify-center gap-2 text-base py-3.5"
            >
              {t.checkout}
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={closeCart}
              className="w-full mt-2 text-center text-sm text-pm-brown/60 hover:text-pm-brown transition-colors py-2"
            >
              {t.continueShopping}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
