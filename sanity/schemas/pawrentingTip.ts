import { defineField, defineType } from "sanity";

/**
 * Pawrenting Tips — the blog/educational content section.
 * UAT spec: Feeding guide, How to serve, Transition Guide, Dog Nutrition, Nutritional Tips
 */
export const pawrentingTip = defineType({
  name: "pawrentingTip",
  title: "Pawrenting Tip",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({ name: "excerpt", title: "Excerpt / Summary", type: "text", rows: 3 }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "readingTime", title: "Reading Time (minutes)", type: "number" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Feeding Guide", value: "feeding-guide" },
          { title: "How to Serve", value: "how-to-serve" },
          { title: "Transition Guide", value: "transition-guide" },
          { title: "Dog Nutrition", value: "dog-nutrition" },
          { title: "Nutritional Tips", value: "nutritional-tips" },
          { title: "Health & Wellness", value: "health-wellness" },
          { title: "Recipes", value: "recipes" },
        ],
      },
    }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "body",
      title: "Article Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
        },
      ],
    }),
    defineField({
      name: "relatedProducts",
      title: "Related Products (Shopify handles)",
      type: "array",
      of: [{ type: "string" }],
      description: "Shopify product handles to show as related products at the bottom of this article",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", title: "SEO Title", type: "string" }),
        defineField({ name: "description", title: "Meta Description", type: "text", rows: 2 }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "featuredImage" },
  },
  orderings: [
    { title: "Published Date (Newest)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Category", name: "categoryAsc", by: [{ field: "category", direction: "asc" }] },
  ],
});
