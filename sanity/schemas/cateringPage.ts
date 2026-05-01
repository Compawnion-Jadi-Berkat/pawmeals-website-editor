import { defineField, defineType } from "sanity";

export const cateringPage = defineType({
  name: "cateringPage",
  title: "Catering Page",
  type: "document",
  fields: [
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string", validation: (R) => R.required() }),
    defineField({ name: "heroSubheadline", title: "Hero Subheadline", type: "text", rows: 2 }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "services",
      title: "Catering Services / Packages",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Package Title", type: "string", validation: (R) => R.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({ name: "icon", title: "Icon (emoji)", type: "string" }),
            defineField({ name: "price", title: "Starting Price (IDR)", type: "string", description: "e.g. Mulai dari Rp 150.000/bulan" }),
            defineField({
              name: "image",
              title: "Package Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: "title", subtitle: "price" } },
        },
      ],
    }),
    defineField({
      name: "howItWorks",
      title: "How It Works Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "step", title: "Step Number", type: "number" }),
            defineField({ name: "title", title: "Step Title", type: "string" }),
            defineField({ name: "description", title: "Step Description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "step" } },
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
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
      name: "testimonials",
      title: "Catering Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Customer Name", type: "string" }),
            defineField({ name: "organization", title: "Organization / Location", type: "string" }),
            defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
            defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "name", subtitle: "organization" } },
        },
      ],
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Order Number",
      type: "string",
      description: "e.g. +62812345678 — used for the Order via WhatsApp button",
    }),
    defineField({ name: "ctaText", title: "CTA Button Text", type: "string" }),
  ],
  preview: {
    prepare: () => ({ title: "Catering Page Content" }),
  },
});
