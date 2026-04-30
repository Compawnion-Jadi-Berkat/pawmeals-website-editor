"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ShopifyCart, CartContextType } from "@/types/shopify";

const CartContext = createContext<CartContextType | null>(null);

const CART_ID_KEY = "pawmeals_cart_id";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCartId = localStorage.getItem(CART_ID_KEY);
    if (storedCartId) {
      setCartId(storedCartId);
      fetchCart(storedCartId);
    }
  }, []);

  const fetchCart = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/cart?cartId=${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.cart) {
          setCart(data.cart);
        } else {
          // Cart expired or not found
          localStorage.removeItem(CART_ID_KEY);
          setCartId(null);
          setCart(null);
        }
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }, []);

  const createOrGetCart = useCallback(async (): Promise<string> => {
    if (cartId) return cartId;

    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create" }),
    });

    const data = await res.json();
    const newCartId = data.cart.id;

    localStorage.setItem(CART_ID_KEY, newCartId);
    setCartId(newCartId);
    setCart(data.cart);

    return newCartId;
  }, [cartId]);

  const addItem = useCallback(
    async (
      variantId: string,
      quantity: number,
      attributes?: { key: string; value: string }[]
    ) => {
      setIsLoading(true);
      try {
        const id = await createOrGetCart();

        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "add",
            cartId: id,
            lines: [{ merchandiseId: variantId, quantity, attributes }],
          }),
        });

        const data = await res.json();
        setCart(data.cart);
        setIsOpen(true); // Open cart drawer on add
      } catch (error) {
        console.error("Failed to add to cart:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [createOrGetCart]
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cartId) return;
      setIsLoading(true);
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update",
            cartId,
            lines: [{ id: lineId, quantity }],
          }),
        });

        const data = await res.json();
        setCart(data.cart);
      } catch (error) {
        console.error("Failed to update cart:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [cartId]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cartId) return;
      setIsLoading(true);
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "remove",
            cartId,
            lineIds: [lineId],
          }),
        });

        const data = await res.json();
        setCart(data.cart);
      } catch (error) {
        console.error("Failed to remove from cart:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [cartId]
  );

  const applyDiscountCode = useCallback(
    async (code: string) => {
      if (!cartId) return;
      setIsLoading(true);
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "discount",
            cartId,
            discountCodes: [code],
          }),
        });

        const data = await res.json();
        setCart(data.cart);
      } catch (error) {
        console.error("Failed to apply discount:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [cartId]
  );

  const totalQuantity = cart?.totalQuantity ?? 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        isLoading,
        isOpen,
        totalQuantity,
        addItem,
        updateItem,
        removeItem,
        applyDiscount: applyDiscountCode,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((prev) => !prev),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
