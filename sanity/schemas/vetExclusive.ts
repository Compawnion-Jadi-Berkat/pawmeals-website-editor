import { defineField, defineType } from "sanity";

/**
 * Vet Exclusive Page — singleton.
 * UAT spec: Vet articles, Q&A, testimonials, clinic finder
 */
export const vetExclusivePage = defineType({
  name: "vetExclusivePage",
  title: "Vet Exclusive Page",
  type: "document",
  fields: [
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string" }),
    defineField({ name: "heroSubheadline", title: "Hero Subheadline", type: "text", rows: 2 }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "vetTestimonials",
      title: "Vet Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "vetName", title: "Vet Name", type: "string", validation: (R) => R.required() }),
            defineField({ name: "credentials", title: "Credentials (e.g. drh., PhD)", type: "string" }),
            defineField({ name: "clinicName", title: "Clinic Name", type: "string" }),
            defineField({ name: "location", title: "City / Location", type: "string" }),
            defineField({ name: "quote", title: "Quote", type: "text", rows: 3, validation: (R) => R.required() }),
            defineField({ name: "photo", title: "Vet Photo", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "vetName", subtitle: "clinicName", media: "photo" } },
        },
      ],
    }),
    defineField({
      name: "partnerClinics",
      title: "Partner Clinics (Clinic Finder)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "clinicName", title: "Clinic Name", type: "string", validation: (R) => R.required() }),
            defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
            defineField({ name: "city", title: "City", type: "string" }),
            defineField({ name: "phone", title: "Phone / WhatsApp", type: "string" }),
            defineField({ name: "googleMapsUrl", title: "Google Maps URL", type: "url" }),
            defineField({ name: "logo", title: "Clinic Logo", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "clinicName", subtitle: "city", media: "logo" } },
        },
      ],
    }),
    defineField({
      name: "vetQA",
      title: "Vet Q&A",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string", validation: (R) => R.required() }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (R) => R.required() }),
            defineField({
              name: "answeredBy",
              title: "Answered By (Vet)",
              type: "reference",
              to: [{ type: "author" }],
            }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Vet Exclusive Page Content" }),
  },
});
