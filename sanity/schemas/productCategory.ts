import { defineField, defineType } from "sanity";

export const productCategory = defineType({
  name: "productCategory",
  title: "Product Category",
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
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "icon",
      title: "Filter Icon",
      type: "string",
      description: "Optional icon key for the website filter, e.g. dog, cat, wellness, joint, weight, sensitive, senior.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first in the product filter list.",
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
