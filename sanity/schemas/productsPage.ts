import { defineField, defineType } from "sanity";

export const productsPage = defineType({
  name: "productsPage",
  title: "Products Page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow (small label)", type: "string", initialValue: "Curated Catalogue" }),
    defineField({ name: "headline", title: "Default Headline", type: "string", initialValue: "All Pawmeals Products" }),
    defineField({ name: "intro", title: "Default Intro Text", type: "text", rows: 3 }),
    defineField({
      name: "categoryHeadlines", title: "Per-Category Headlines",
      description: "Override headline & intro when a customer filters by a specific category slug.",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "slug", title: "Category Slug", type: "string", validation: (R) => R.required() }),
          defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
          defineField({ name: "headline", title: "Headline", type: "string", validation: (R) => R.required() }),
          defineField({ name: "intro", title: "Intro Text", type: "text", rows: 3 }),
        ],
        preview: { select: { title: "headline", subtitle: "slug" } },
      }],
    }),
    defineField({
      name: "language", title: "Language", type: "string",
      options: { list: [{ title: "Indonesian", value: "id" }, { title: "English", value: "en" }] },
      initialValue: "id",
    }),
  ],
  preview: { prepare: () => ({ title: "Products Page" }) },
});
