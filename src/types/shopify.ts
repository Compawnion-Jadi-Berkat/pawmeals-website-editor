// ─── SHOPIFY TYPES ────────────────────────────────────────────────────────────

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyMetafield {
  key: string;
  namespace: string;
  value: string;
  type: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  createdAt: string;
  updatedAt: string;
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoney;
  } | null;
  featuredImage: ShopifyImage | null;
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyProductVariant }[] };
  options: { id: string; name: string; values: string[] }[];
  metafields: (ShopifyMetafield | null)[] | null;
  seo: { title: string | null; description: string | null } | null;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: ShopifyMoney;
    amountPerQuantity: ShopifyMoney;
  };
  merchandise: {
    id: string;
    title: string;
    sku: string | null;
    price: ShopifyMoney;
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: ShopifyImage | null;
    };
    selectedOptions: { name: string; value: string }[];
  };
  attributes: { key: string; value: string }[];
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
    totalTaxAmount: ShopifyMoney | null;
  };
  lines: { edges: { node: ShopifyCartLine }[] };
  attributes: { key: string; value: string }[];
  discountCodes: { code: string; applicable: boolean }[];
}

export interface ShopifyCustomer {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  acceptsMarketing: boolean;
  defaultAddress: ShopifyAddress | null;
  addresses: { edges: { node: ShopifyAddress }[] };
  orders: {
    edges: {
      node: {
        id: string;
        orderNumber: number;
        processedAt: string;
        financialStatus: string;
        fulfillmentStatus: string;
        totalPrice: ShopifyMoney;
        lineItems: {
          edges: {
            node: {
              title: string;
              quantity: number;
              variant: {
                price: ShopifyMoney;
                image: ShopifyImage | null;
              } | null;
            };
          }[];
        };
      };
    }[];
  };
}

export interface ShopifyAddress {
  id: string;
  address1: string | null;
  address2: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  zip: string | null;
  phone: string | null;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: { edges: { node: Partial<ShopifyProduct> }[] };
}

// ─── API RESPONSE TYPES ───────────────────────────────────────────────────────

export interface ProductsResponse {
  products: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
    edges: { cursor: string; node: ShopifyProduct }[];
  };
}

export interface CartResponse {
  cart: ShopifyCart;
  userErrors: { field: string; message: string }[];
}

export interface CustomerResponse {
  customer: ShopifyCustomer | null;
  customerUserErrors: { field: string; message: string; code: string }[];
}

// ─── QUIZ TYPES ───────────────────────────────────────────────────────────────

export type PetType = "dog" | "cat";
export type LifeStage = "puppy" | "adult" | "senior" | "kitten" | "adult-cat" | "senior-cat";
export type HealthConcern =
  | "none"
  | "weight-management"
  | "digestive-health"
  | "joint-support"
  | "skin-coat"
  | "kidney-support"
  | "diabetes"
  | "allergies"
  | "dental-health";

export interface QuizAnswers {
  petType: PetType | null;
  petName: string;
  lifeStage: LifeStage | null;
  breed: string;
  weight: number | null;
  healthConcerns: HealthConcern[];
  currentFood: string;
  budget: "standard" | "premium" | "any" | null;
}

export interface QuizResult {
  recommendedProducts: ShopifyProduct[];
  explanation: string;
  dailyPortionGrams: number;
  monthlyEstimate: ShopifyMoney;
}

// ─── CART CONTEXT TYPES ───────────────────────────────────────────────────────

export interface CartContextType {
  cart: ShopifyCart | null;
  cartId: string | null;
  isLoading: boolean;
  isOpen: boolean;
  totalQuantity: number;
  addItem: (variantId: string, quantity: number, attributes?: { key: string; value: string }[]) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  applyDiscount: (code: string) => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}
