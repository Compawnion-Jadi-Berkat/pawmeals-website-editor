import { defineField, defineType } from "sanity";

export const quizResult = defineType({
  name: "quizResult",
  title: "Quiz Result",
  type: "document",
  fields: [
    defineField({ name: "key", title: "Result Key", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({
      name: "recommendedProducts",
      title: "Recommended Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "key", media: "image" },
  },
});
