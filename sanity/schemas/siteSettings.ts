import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      initialValue: "Pawmeals",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short brand descriptor shown beside the logo in the website header.",
      initialValue: "Cooked Pet Nutrition",
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default Social Sharing Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "navItems",
      title: "Navigation Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "href", title: "Link", type: "string", validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
            defineField({
              name: "group",
              title: "Group",
              type: "string",
              options: { list: ["shop", "company", "legal", "support"] },
            }),
          ],
          preview: { select: { title: "label", subtitle: "group" } },
        },
      ],
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: { list: ["instagram", "tiktok", "whatsapp", "email"] },
            }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        },
      ],
    }),
    defineField({ name: "whatsappNumber", title: "WhatsApp Number", type: "string" }),
    defineField({ name: "email", title: "Public Email", type: "string" }),
    defineField({ name: "phone", title: "Public Phone", type: "string" }),
    defineField({ name: "location", title: "Display Location", type: "string" }),
    defineField({ name: "vetClinicCount", title: "Vet Clinic Trust Count", type: "string", description: "For example: 220+ partner clinics" }),
    defineField({ name: "primaryColor", title: "Primary Color", type: "string", description: "Hex, e.g. #C2410C" }),
    defineField({ name: "accentColor", title: "Accent Color", type: "string", description: "Hex, e.g. #F97316" }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
