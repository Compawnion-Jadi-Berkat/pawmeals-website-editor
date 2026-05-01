import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Us Page",
  type: "document",
  fields: [
    // Hero
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string" }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),

    // Brand Story
    defineField({
      name: "story",
      title: "Brand Story",
      type: "array",
      of: [{ type: "block" }],
      description: "The Pawmeals origin story — rich text with headings and paragraphs",
    }),

    // Pawmiracle Story (UAT requirement)
    defineField({
      name: "pawmiracleStory",
      title: "Pawmiracle Story",
      type: "array",
      of: [{ type: "block" }],
      description: "The Pawmiracle transformation story — specific brand proof section",
    }),
    defineField({
      name: "pawmiracleImage",
      title: "Pawmiracle Image",
      type: "image",
      options: { hotspot: true },
    }),

    // Mission & Vision
    defineField({ name: "mission", title: "Mission Statement", type: "text", rows: 3 }),
    defineField({ name: "vision", title: "Vision Statement", type: "text", rows: 3 }),

    // Brand Values
    defineField({
      name: "values",
      title: "Brand Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Value Title", type: "string", validation: (R) => R.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            defineField({ name: "icon", title: "Icon (emoji)", type: "string" }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),

    // Brand Proof Points (UAT: "Pawmeals Brand Proof")
    defineField({
      name: "brandProof",
      title: "Brand Proof Points",
      description: "Key statistics and achievements — e.g. #1 natural dog food brand, 33% market share",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "stat", title: "Statistic / Headline", type: "string", validation: (R) => R.required() }),
            defineField({ name: "description", title: "Supporting Description", type: "string" }),
            defineField({ name: "icon", title: "Icon (emoji)", type: "string" }),
          ],
          preview: { select: { title: "stat", subtitle: "description" } },
        },
      ],
    }),

    // Team
    defineField({
      name: "team",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", validation: (R) => R.required() }),
            defineField({ name: "role", title: "Role / Title", type: "string" }),
            defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
            defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "name", subtitle: "role", media: "photo" } },
        },
      ],
    }),

    // Milestones
    defineField({
      name: "milestones",
      title: "Company Milestones",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "year", title: "Year", type: "string" }),
            defineField({ name: "title", title: "Milestone Title", type: "string", validation: (R) => R.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "year" } },
        },
      ],
    }),

    // Certifications
    defineField({
      name: "certifications",
      title: "Certifications & Awards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Certification Name", type: "string", validation: (R) => R.required() }),
            defineField({ name: "description", title: "Description", type: "string" }),
            defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "name", media: "logo" } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Us Page Content" }),
  },
});
