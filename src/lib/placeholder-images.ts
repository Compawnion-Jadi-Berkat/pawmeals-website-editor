/**
 * Pawmeals Placeholder Images
 * Real free stock photos from Unsplash, hosted on Manus CDN.
 * These are used as fallbacks when Sanity / Shopify data is not yet connected.
 * Replace with actual brand photography once available in Sanity.
 *
 * Image license: Unsplash free license — https://unsplash.com/license
 */

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/94657144/UbKbLaufZwS2zSdhe5Fuyd";

export const PLACEHOLDER_IMAGES = {
  // ── Hero Carousel ─────────────────────────────────────────────────────────
  hero1: `${CDN}/hero-dog-eating_78f0a22c.jpg`,
  hero2: `${CDN}/hero-dogs-running_0a1ae0de.jpg`,
  hero3: `${CDN}/hero-dog-happy_f2b66dd1.jpg`,

  // ── Natural Ingredients ───────────────────────────────────────────────────
  ingredientChicken: `${CDN}/ingredient-chicken_83f61688.jpg`,
  ingredientBeef:    `${CDN}/ingredient-beef_db8dc068.jpg`,
  ingredientFish:    `${CDN}/ingredient-fish_ad26ed13.jpg`,
  ingredientLamb:    `${CDN}/ingredient-lamb_5cb71c95.jpg`,
  ingredientDuck:    `${CDN}/ingredient-duck_58fe1155.jpg`,
  freshIngredients:  `${CDN}/fresh-ingredients_173e4ce3.jpg`,

  // ── Dogs ──────────────────────────────────────────────────────────────────
  dogEatingBowl:    `${CDN}/dog-eating-bowl_f531df56.jpg`,
  dogHappyPortrait: `${CDN}/dog-happy-portrait_8210cad9.jpg`,
  dogGoldenHappy:   `${CDN}/dog-golden-happy_0f9a7719.jpg`,
  dogSmallCute:     `${CDN}/dog-small-cute_fc16bde5.jpg`,

  // ── Vet / Clinic ──────────────────────────────────────────────────────────
  vetWithDog:  `${CDN}/vet-with-dog_3b6c0c97.jpg`,
  vetPortrait: `${CDN}/vet-portrait_36946422.jpg`,
  vetClinic:   `${CDN}/vet-clinic_bc4bb8ae.jpg`,

  // ── About / Kitchen ───────────────────────────────────────────────────────
  kitchenCooking: `${CDN}/kitchen-cooking_9a86ebe4.jpg`,
  aboutTeam:      `${CDN}/about-team_65ef381c.jpg`,

  // ── Cat Food ──────────────────────────────────────────────────────────────
  catEating: `${CDN}/cat-eating_38edc78c.jpg`,
  catHappy:  `${CDN}/cat-happy_fccf6730.jpg`,

  // ── Quiz / Lifestyle ──────────────────────────────────────────────────────
  quizDogOwner:    `${CDN}/quiz-dog-owner_3e2905ba.jpg`,
  lifestyleDogOwner: `${CDN}/lifestyle-dog-owner_3d2f441d.jpg`,

  // ── Legacy keys (kept for backward compat with existing components) ───────
  productChicken: `${CDN}/ingredient-chicken_83f61688.jpg`,
  productBeef:    `${CDN}/ingredient-beef_db8dc068.jpg`,
  productFish:    `${CDN}/ingredient-fish_ad26ed13.jpg`,
  ingredients:    `${CDN}/fresh-ingredients_173e4ce3.jpg`,
  vetBadge:       `${CDN}/vet-with-dog_3b6c0c97.jpg`,
  catering:       `${CDN}/dog-eating-bowl_f531df56.jpg`,
  quizDog:        `${CDN}/quiz-dog-owner_3e2905ba.jpg`,
} as const;

export type PlaceholderImageKey = keyof typeof PLACEHOLDER_IMAGES;

/**
 * Maps a product title keyword → best matching placeholder image.
 * Used by ProductsGrid and FeaturedProducts as fallback.
 */
const PRODUCT_IMAGE_MAP: Array<[string, string]> = [
  ["chicken",  PLACEHOLDER_IMAGES.ingredientChicken],
  ["chicky",   PLACEHOLDER_IMAGES.ingredientChicken],
  ["beef",     PLACEHOLDER_IMAGES.ingredientBeef],
  ["beefy",    PLACEHOLDER_IMAGES.ingredientBeef],
  ["fish",     PLACEHOLDER_IMAGES.ingredientFish],
  ["fishy",    PLACEHOLDER_IMAGES.ingredientFish],
  ["salmon",   PLACEHOLDER_IMAGES.ingredientFish],
  ["tuna",     PLACEHOLDER_IMAGES.ingredientFish],
  ["lamb",     PLACEHOLDER_IMAGES.ingredientLamb],
  ["la la",    PLACEHOLDER_IMAGES.ingredientLamb],
  ["fame",     PLACEHOLDER_IMAGES.ingredientLamb],
  ["duck",     PLACEHOLDER_IMAGES.ingredientDuck],
  ["quack",    PLACEHOLDER_IMAGES.ingredientDuck],
  ["delish",   PLACEHOLDER_IMAGES.ingredientDuck],
  ["rabbit",   PLACEHOLDER_IMAGES.freshIngredients],
  ["rabbetit", PLACEHOLDER_IMAGES.freshIngredients],
  ["pork",     PLACEHOLDER_IMAGES.freshIngredients],
  ["porky",    PLACEHOLDER_IMAGES.freshIngredients],
  ["parazzi",  PLACEHOLDER_IMAGES.freshIngredients],
  ["goat",     PLACEHOLDER_IMAGES.freshIngredients],
  ["bundle",   PLACEHOLDER_IMAGES.dogEatingBowl],
  ["senior",   PLACEHOLDER_IMAGES.dogHappyPortrait],
  ["granny",   PLACEHOLDER_IMAGES.dogHappyPortrait],
  ["cat",      PLACEHOLDER_IMAGES.catEating],
];

/** Returns the best placeholder image URL for a given product title */
export function getProductPlaceholder(title: string): string {
  const lower = title.toLowerCase();
  for (const [key, url] of PRODUCT_IMAGE_MAP) {
    if (lower.includes(key)) return url;
  }
  return PLACEHOLDER_IMAGES.dogEatingBowl;
}
