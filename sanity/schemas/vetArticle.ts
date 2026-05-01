import { defineField, defineType } from "sanity";

export const vetArticle = defineType({
  name: "vetArticle",
  title: "Vet Article",
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
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Nutrition Science", value: "nutrition-science" },
          { title: "Health Conditions", value: "health-conditions" },
          { title: "Preventive Care", value: "preventive-care" },
          { title: "Research", value: "research" },
        ],
      },
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "author",
      title: "Author (Vet)",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "body",
      title: "Article Body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "featuredImage" },
  },
});
