import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "productCategory" }] }),
    defineField({ name: "featured", title: "Feature on Homepage", type: "boolean", initialValue: false }),
    defineField({ name: "sortOrder", title: "Display Order", type: "number", initialValue: 100 }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 2 }),
    defineField({ name: "longDescription", title: "Long Description", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
        },
      ],
    }),
    defineField({
      name: "pricingTiers",
      title: "Pricing Tiers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", description: "For example: Weekly" }),
            defineField({ name: "weightLabel", title: "Weight Label", type: "string", description: "For example: Small / Medium / Large" }),
            defineField({ name: "priceIDR", title: "Price (IDR)", type: "number" }),
            defineField({ name: "note", title: "Note", type: "string" }),
          ],
          preview: {
            select: { label: "label", weightLabel: "weightLabel", priceIDR: "priceIDR" },
            prepare: ({ label, weightLabel, priceIDR }) => ({
              title: [label, weightLabel].filter(Boolean).join(" — ") || "Pricing tier",
              subtitle: typeof priceIDR === "number" ? `IDR ${priceIDR.toLocaleString("id-ID")}` : undefined,
            }),
          },
        },
      ],
    }),
    defineField({ name: "ingredients", title: "Ingredients", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "feedingGuide", title: "Feeding Guide", type: "text", rows: 4 }),
    defineField({ name: "badges", title: "Product Badges", type: "array", of: [{ type: "string" }], description: "Optional short badges such as Fresh Cooked, Vet Curated, or No Preservatives." }),
    defineField({
      name: "availableLocales",
      title: "Available Locales",
      type: "array",
      of: [{ type: "string" }],
      options: { list: ["id", "en"] },
      initialValue: ["id", "en"],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category.title", media: "images.0" },
  },
});
