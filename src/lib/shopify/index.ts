import {
  shopifyFetch,
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_PRODUCT_RECOMMENDATIONS_QUERY,
  GET_COLLECTIONS_QUERY,
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  GET_CART_QUERY,
  APPLY_DISCOUNT_MUTATION,
  CUSTOMER_CREATE_MUTATION,
  CUSTOMER_ACCESS_TOKEN_CREATE,
  GET_CUSTOMER_QUERY,
  GET_SHOP_QUERY,
} from "./client";
import type {
  ShopifyProduct,
  ShopifyCart,
  ShopifyCustomer,
  ShopifyCollection,
  ProductsResponse,
  CartResponse,
  CustomerResponse,
} from "@/types/shopify";

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

export async function getProducts({
  first = 20,
  after,
  query,
  sortKey,
  reverse,
}: {
  first?: number;
  after?: string;
  query?: string;
  sortKey?: string;
  reverse?: boolean;
} = {}) {
  const { data } = await shopifyFetch<ProductsResponse>({
    query: GET_PRODUCTS_QUERY,
    variables: { first, after, query, sortKey, reverse },
    tags: ["products"],
    revalidate: 60,
  });

  return {
    products: data.products.edges.map((e) => e.node),
    pageInfo: data.products.pageInfo,
  };
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const { data } = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    tags: [`product-${handle}`],
    revalidate: 60,
  });

  return data.product;
}

export async function getProductRecommendations(productId: string): Promise<ShopifyProduct[]> {
  const { data } = await shopifyFetch<{ productRecommendations: ShopifyProduct[] }>({
    query: GET_PRODUCT_RECOMMENDATIONS_QUERY,
    variables: { productId },
    revalidate: 300,
  });

  return data.productRecommendations;
}

export async function getDogProducts() {
  return getProducts({ query: "tag:dog", first: 20, tags: ["products", "dog"] } as any);
}

export async function getCatProducts() {
  return getProducts({ query: "tag:cat", first: 20, tags: ["products", "cat"] } as any);
}

export async function getHealthProducts() {
  return getProducts({ query: "tag:health-formula", first: 20 });
}

export async function getFeaturedProducts() {
  return getProducts({ query: "tag:featured", first: 8 });
}

export async function getBestsellerProducts() {
  return getProducts({ query: "tag:bestseller", first: 6 });
}

// ─── COLLECTIONS ──────────────────────────────────────────────────────────────

export async function getCollections() {
  const { data } = await shopifyFetch<{ collections: { edges: { node: ShopifyCollection }[] } }>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first: 20 },
    tags: ["collections"],
    revalidate: 300,
  });

  return data.collections.edges.map((e) => e.node);
}

// ─── CART ─────────────────────────────────────────────────────────────────────

export async function createCart(lines?: { merchandiseId: string; quantity: number }[]) {
  const { data } = await shopifyFetch<{ cartCreate: CartResponse }>({
    query: CREATE_CART_MUTATION,
    variables: { lines: lines || [] },
    cache: "no-store",
  });

  if (data.cartCreate.userErrors?.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number; attributes?: { key: string; value: string }[] }[]
) {
  const { data } = await shopifyFetch<{ cartLinesAdd: CartResponse }>({
    query: ADD_TO_CART_MUTATION,
    variables: { cartId, lines },
    cache: "no-store",
  });

  if (data.cartLinesAdd.userErrors?.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }

  return data.cartLinesAdd.cart;
}

export async function updateCart(
  cartId: string,
  lines: { id: string; quantity: number }[]
) {
  const { data } = await shopifyFetch<{ cartLinesUpdate: CartResponse }>({
    query: UPDATE_CART_MUTATION,
    variables: { cartId, lines },
    cache: "no-store",
  });

  if (data.cartLinesUpdate.userErrors?.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }

  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const { data } = await shopifyFetch<{ cartLinesRemove: CartResponse }>({
    query: REMOVE_FROM_CART_MUTATION,
    variables: { cartId, lineIds },
    cache: "no-store",
  });

  if (data.cartLinesRemove.userErrors?.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }

  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const { data } = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: "no-store",
  });

  return data.cart;
}

export async function applyDiscount(cartId: string, discountCodes: string[]) {
  const { data } = await shopifyFetch<{ cartDiscountCodesUpdate: CartResponse }>({
    query: APPLY_DISCOUNT_MUTATION,
    variables: { cartId, discountCodes },
    cache: "no-store",
  });

  return data.cartDiscountCodesUpdate.cart;
}

// ─── CUSTOMER ─────────────────────────────────────────────────────────────────

export async function createCustomer(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  acceptsMarketing?: boolean;
}) {
  const { data } = await shopifyFetch<{ customerCreate: CustomerResponse }>({
    query: CUSTOMER_CREATE_MUTATION,
    variables: { input },
    cache: "no-store",
  });

  if (data.customerCreate.customerUserErrors?.length > 0) {
    throw new Error(data.customerCreate.customerUserErrors[0].message);
  }

  return data.customerCreate.customer;
}

export async function loginCustomer(email: string, password: string) {
  const { data } = await shopifyFetch<{
    customerAccessTokenCreate: {
      customerAccessToken: { accessToken: string; expiresAt: string } | null;
      customerUserErrors: { field: string; message: string; code: string }[];
    };
  }>({
    query: CUSTOMER_ACCESS_TOKEN_CREATE,
    variables: { input: { email, password } },
    cache: "no-store",
  });

  if (data.customerAccessTokenCreate.customerUserErrors?.length > 0) {
    throw new Error(data.customerAccessTokenCreate.customerUserErrors[0].message);
  }

  return data.customerAccessTokenCreate.customerAccessToken;
}

export async function getCustomer(customerAccessToken: string): Promise<ShopifyCustomer | null> {
  const { data } = await shopifyFetch<{ customer: ShopifyCustomer | null }>({
    query: GET_CUSTOMER_QUERY,
    variables: { customerAccessToken },
    cache: "no-store",
  });

  return data.customer;
}

// ─── PRICE FORMATTING ─────────────────────────────────────────────────────────

export function formatPrice(
  amount: string | number,
  currencyCode: string = "IDR",
  locale: string = "id-ID"
): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);
}

export function getProductMetafield(product: ShopifyProduct, key: string): string | null {
  const metafield = product.metafields?.find((m) => m?.key === key);
  return metafield?.value ?? null;
}

export function isProductVetApproved(product: ShopifyProduct): boolean {
  const vetApproved = getProductMetafield(product, "vet_approved");
  return vetApproved === "true" || product.tags?.includes("vet-approved") || false;
}

export function getProductPetType(product: ShopifyProduct): "dog" | "cat" | "both" {
  const petType = getProductMetafield(product, "pet_type");
  if (petType === "cat") return "cat";
  if (petType === "both") return "both";
  return "dog";
}

// Alias: getAllProducts fetches all products without filters
export async function getAllProducts() {
  return getProducts({});
}
