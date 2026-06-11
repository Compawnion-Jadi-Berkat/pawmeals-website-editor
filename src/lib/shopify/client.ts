/**
 * Shopify Storefront API Client
 * Connects to Shopify Headless via the Storefront API (GraphQL)
 * Credentials injected via environment variables
 */

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "";
const SHOPIFY_API_VERSION = "2025-01";

const endpoint = SHOPIFY_STORE_DOMAIN
  ? `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`
  : "";

type ShopifyFetchOptions = {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number;
};

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  tags,
  revalidate,
}: ShopifyFetchOptions): Promise<{ data: T; errors?: unknown[] }> {
  // Guard: return empty response when Shopify env vars are not configured (e.g., during build)
  if (!endpoint) {
    return { data: {} as T };
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: {
      ...(tags && { tags }),
      ...(revalidate !== undefined && { revalidate }),
    },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    console.error("Shopify GraphQL errors:", json.errors);
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`);
  }

  return json;
}

// ─── PRODUCT FRAGMENTS ────────────────────────────────────────────────────────

export const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    createdAt
    updatedAt
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
    }
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          quantityAvailable
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
    options {
      id
      name
      values
    }
    metafields(identifiers: [
      { namespace: "custom", key: "nutrition_info" }
      { namespace: "custom", key: "feeding_guide" }
      { namespace: "custom", key: "ingredients" }
      { namespace: "custom", key: "vet_approved" }
      { namespace: "custom", key: "pet_type" }
      { namespace: "custom", key: "life_stage" }
      { namespace: "custom", key: "health_benefit" }
      { namespace: "custom", key: "weight_range" }
    ]) {
      key
      namespace
      value
      type
    }
    seo { title description }
  }
`;

// ─── PRODUCT QUERIES ──────────────────────────────────────────────────────────

export const GET_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetProducts($first: Int!, $after: String, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
      pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
      edges {
        cursor
        node { ...ProductFields }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
    }
  }
`;

export const GET_PRODUCT_RECOMMENDATIONS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...ProductFields
    }
  }
`;

// ─── CART QUERIES ─────────────────────────────────────────────────────────────

export const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount { amount currencyCode }
            amountPerQuantity { amount currencyCode }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              sku
              price { amount currencyCode }
              product {
                id
                handle
                title
                featuredImage { url altText }
              }
              selectedOptions { name value }
            }
          }
          attributes { key value }
        }
      }
    }
    attributes { key value }
    discountCodes { code applicable }
  }
`;

export const CREATE_CART_MUTATION = `
  ${CART_FRAGMENT}
  mutation CreateCart($lines: [CartLineInput!], $attributes: [AttributeInput!]) {
    cartCreate(input: { lines: $lines, attributes: $attributes }) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

export const ADD_TO_CART_MUTATION = `
  ${CART_FRAGMENT}
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

export const UPDATE_CART_MUTATION = `
  ${CART_FRAGMENT}
  mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

export const REMOVE_FROM_CART_MUTATION = `
  ${CART_FRAGMENT}
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

export const GET_CART_QUERY = `
  ${CART_FRAGMENT}
  query GetCart($cartId: ID!) {
    cart(id: $cartId) { ...CartFields }
  }
`;

export const APPLY_DISCOUNT_MUTATION = `
  ${CART_FRAGMENT}
  mutation ApplyDiscount($cartId: ID!, $discountCodes: [String!]!) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

// ─── COLLECTION QUERIES ───────────────────────────────────────────────────────

export const GET_COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          image { url altText }
          products(first: 12) {
            edges {
              node {
                id
                handle
                title
                featuredImage { url altText }
                priceRange {
                  minVariantPrice { amount currencyCode }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// ─── CUSTOMER QUERIES ─────────────────────────────────────────────────────────

export const CUSTOMER_CREATE_MUTATION = `
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
        phone
        acceptsMarketing
      }
      customerUserErrors { field message code }
    }
  }
`;

export const CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors { field message code }
    }
  }
`;

export const GET_CUSTOMER_QUERY = `
  query GetCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      phone
      acceptsMarketing
      defaultAddress {
        id
        address1
        address2
        city
        province
        country
        zip
        phone
      }
      addresses(first: 10) {
        edges {
          node {
            id
            address1
            address2
            city
            province
            country
            zip
            phone
          }
        }
      }
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice { amount currencyCode }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    price { amount currencyCode }
                    image { url altText }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// ─── SHOP INFO ────────────────────────────────────────────────────────────────

export const GET_SHOP_QUERY = `
  query GetShop {
    shop {
      name
      description
      primaryDomain { url }
      paymentSettings {
        currencyCode
        acceptedCardBrands
        enabledPresentmentCurrencies
      }
      shippingPolicy { body }
      refundPolicy { body }
      privacyPolicy { body }
      termsOfService { body }
    }
  }
`;
