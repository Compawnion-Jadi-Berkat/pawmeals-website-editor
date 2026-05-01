import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroSlides",
      title: "Hero Carousel Slides",
      type: "array",
      description: "Up to 5 slides for the homepage hero carousel",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "headline", title: "Headline", type: "string", validation: (R) => R.required() }),
            defineField({ name: "subheadline", title: "Subheadline", type: "text", rows: 2 }),
            defineField({ name: "ctaText", title: "CTA Button Text", type: "string" }),
            defineField({ name: "ctaLink", title: "CTA Button Link", type: "string", description: "e.g. /id/products" }),
            defineField({
              name: "image",
              title: "Background Image",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
            }),
          ],
          preview: {
            select: { title: "headline", media: "image" },
          },
        },
      ],
    }),
    defineField({
      name: "whyPawmeals",
      title: "Why Pawmeals Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Icon (emoji or icon name)", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),
    defineField({
      name: "featuredTestimonials",
      title: "Featured Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "customerName", title: "Customer Name", type: "string", validation: (R) => R.required() }),
            defineField({ name: "petName", title: "Pet Name", type: "string" }),
            defineField({ name: "petBreed", title: "Pet Breed", type: "string" }),
            defineField({ name: "review", title: "Review Text", type: "text", rows: 3, validation: (R) => R.required() }),
            defineField({ name: "rating", title: "Rating (1–5)", type: "number", validation: (R) => R.min(1).max(5) }),
            defineField({
              name: "photo",
              title: "Customer / Pet Photo",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: "customerName", subtitle: "review" } },
        },
      ],
    }),
    defineField({
      name: "vetPartners",
      title: "Vet Partner Quotes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "vetName", title: "Vet Name", type: "string", validation: (R) => R.required() }),
            defineField({ name: "clinicName", title: "Clinic Name", type: "string" }),
            defineField({ name: "location", title: "City / Location", type: "string" }),
            defineField({ name: "quote", title: "Quote", type: "text", rows: 3, validation: (R) => R.required() }),
            defineField({
              name: "photo",
              title: "Vet Photo",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: "vetName", subtitle: "clinicName" } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage Content" }),
  },
});
