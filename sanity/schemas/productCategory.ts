import { defineField, defineType } from "sanity";

export const productCategory = defineType({
  name: "productCategory",
  title: "Product Category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (R) => R.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "icon", title: "Filter Icon (preset key)", type: "string", description: "Fallback lucide key: dog, cat, wellness, joint, weight, sensitive, senior, all." }),
    defineField({ name: "iconImage", title: "Filter Icon (custom upload)", type: "image", description: "Overrides preset when provided.", fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 100 }),
  ],
  preview: { select: { title: "title", subtitle: "description", media: "iconImage" } },
});
