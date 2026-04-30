/**
 * Pawmeals Placeholder Images
 * CDN URLs for brand-accurate placeholder images.
 * Replace with real Shopify/Sanity image URLs once connected.
 */

export const PLACEHOLDER_IMAGES = {
  // Hero carousel images
  hero1: "https://d2xsxph8kpxj0f.cloudfront.net/94657144/UbKbLaufZwS2zSdhe5Fuyd/pawmeals-hero-1_3f04e5a6.jpg",
  hero2: "https://d2xsxph8kpxj0f.cloudfront.net/94657144/UbKbLaufZwS2zSdhe5Fuyd/pawmeals-hero-2_f0324b33.jpg",
  hero3: "https://d2xsxph8kpxj0f.cloudfront.net/94657144/UbKbLaufZwS2zSdhe5Fuyd/pawmeals-hero-3_b5b2f8fc.jpg",

  // Product images
  productChicken: "https://d2xsxph8kpxj0f.cloudfront.net/94657144/UbKbLaufZwS2zSdhe5Fuyd/pawmeals-product-chicken_d98e88d6.jpg",
  productBeef: "https://d2xsxph8kpxj0f.cloudfront.net/94657144/UbKbLaufZwS2zSdhe5Fuyd/pawmeals-product-beef_b30fbfc9.jpg",
  // Fish and others use the compressed webp URLs from generate_image
  productFish: "https://d2xsxph8kpxj0f.cloudfront.net/94657144/UbKbLaufZwS2zSdhe5Fuyd/pawmeals-product-fish-APa2R298gGs9b9QbHoLBAA.webp",

  // Section images
  ingredients: "https://d2xsxph8kpxj0f.cloudfront.net/94657144/UbKbLaufZwS2zSdhe5Fuyd/pawmeals-ingredients-RWkGZCXdwBCvAcuKtWJrJq.webp",
  vetBadge: "https://d2xsxph8kpxj0f.cloudfront.net/94657144/UbKbLaufZwS2zSdhe5Fuyd/pawmeals-vet-badge-L55teuH9ymDzvJiyQRpgeD.webp",
  catering: "https://d2xsxph8kpxj0f.cloudfront.net/94657144/UbKbLaufZwS2zSdhe5Fuyd/pawmeals-catering-CHQiKusKHRUmqahhX9PPdv.webp",
  quizDog: "https://d2xsxph8kpxj0f.cloudfront.net/94657144/UbKbLaufZwS2zSdhe5Fuyd/pawmeals-quiz-dog-RW2nVckJJvfLMwLX7fzPjN.webp",
} as const;

export type PlaceholderImageKey = keyof typeof PLACEHOLDER_IMAGES;
