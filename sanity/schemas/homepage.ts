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
            defineField({ name: "layout", title: "Slide Layout", type: "string", options: { list: [{ title: "Split (image right)", value: "split" }, { title: "Full-bleed image", value: "fullBleed" }, { title: "Centered text", value: "centered" }] }, initialValue: "split" }),
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
            defineField({ name: "icon", title: "Icon (emoji or lucide name)", type: "string", description: "Optional preset. Icon Upload takes priority if set." }),
            defineField({ name: "iconImage", title: "Icon Upload (optional)", type: "image", fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
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
    defineField({
      name: "quizCta",
      title: "Quiz CTA Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
        defineField({ name: "primaryCtaText", title: "Primary CTA Text", type: "string" }),
        defineField({ name: "primaryCtaLink", title: "Primary CTA Link", type: "string" }),
        defineField({ name: "secondaryCtaText", title: "Secondary CTA Text", type: "string" }),
        defineField({ name: "secondaryCtaLink", title: "Secondary CTA Link", type: "string" }),
        defineField({ name: "highlights", title: "Highlights", type: "array", of: [{ type: "string" }] }),
      ],
    }),
    defineField({
      name: "instagramFeed",
      title: "Instagram Feed Section",
      type: "object",
      fields: [
        defineField({ name: "handle", title: "Instagram Handle", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "ctaText", title: "CTA Text", type: "string" }),
        defineField({ name: "url", title: "Instagram URL", type: "url" }),
        defineField({
          name: "posts",
          title: "Post Tiles",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "url", title: "Post URL", type: "url" }),
                defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
              ],
              preview: { select: { title: "label", media: "image" } },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "newsletterSignup",
      title: "Newsletter Signup Section",
      type: "object",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
        defineField({ name: "placeholder", title: "Email Placeholder", type: "string" }),
        defineField({ name: "buttonText", title: "Button Text", type: "string" }),
        defineField({ name: "successMessage", title: "Success Message", type: "string" }),
        defineField({ name: "invalidEmailMessage", title: "Invalid Email Message", type: "string" }),
        defineField({ name: "errorMessage", title: "Error Message", type: "string" }),
        defineField({ name: "privacyText", title: "Privacy Text", type: "string" }),
        defineField({ name: "perks", title: "Perks", type: "array", of: [{ type: "string" }] }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage Content" }),
  },
});
