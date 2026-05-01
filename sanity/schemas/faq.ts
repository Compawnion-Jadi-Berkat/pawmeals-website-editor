import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (R) => R.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (R) => R.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Products", value: "products" },
          { title: "Ordering", value: "ordering" },
          { title: "Delivery", value: "delivery" },
          { title: "Subscriptions", value: "subscriptions" },
          { title: "Nutrition", value: "nutrition" },
          { title: "General", value: "general" },
        ],
      },
    }),
    defineField({ name: "order", title: "Display Order", type: "number", description: "Lower numbers appear first" }),
  ],
  preview: {
    select: { title: "question", subtitle: "category" },
  },
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
