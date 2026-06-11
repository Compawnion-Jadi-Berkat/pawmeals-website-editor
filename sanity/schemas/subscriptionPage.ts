import { defineField, defineType } from "sanity";

const cardFields = [
  defineField({ name: "icon", title: "Icon", type: "string" }),
  defineField({ name: "title", title: "Title", type: "string" }),
  defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
];

export const subscriptionPage = defineType({
  name: "subscriptionPage",
  title: "Subscription Page",
  type: "document",
  fields: [
    defineField({ name: "language", title: "Language", type: "string", options: { list: [{ title: "Indonesian", value: "id" }, { title: "English", value: "en" }] } }),
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "string" }),
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero Description", type: "text", rows: 3 }),
    defineField({ name: "heroCtaText", title: "Hero CTA Text", type: "string" }),
    defineField({ name: "heroCtaLink", title: "Hero CTA Link", type: "string" }),
    defineField({ name: "discountBadge", title: "Discount Badge", type: "string" }),
    defineField({ name: "perks", title: "Perk Cards", type: "array", of: [{ type: "object", fields: cardFields, preview: { select: { title: "title", subtitle: "description" } } }] }),
    defineField({ name: "stepsHeading", title: "Steps Heading", type: "string" }),
    defineField({ name: "steps", title: "Steps", type: "array", of: [{ type: "object", fields: cardFields, preview: { select: { title: "title", subtitle: "description" } } }] }),
    defineField({
      name: "frequencies",
      title: "Delivery Frequencies",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "savings", title: "Savings Text", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "badge" } },
        },
      ],
    }),
    defineField({ name: "frequencyHeading", title: "Frequency Heading", type: "string" }),
    defineField({ name: "finalCtaText", title: "Final CTA Text", type: "string" }),
    defineField({ name: "finalCtaLink", title: "Final CTA Link", type: "string" }),
  ],
  preview: {
    select: { language: "language" },
    prepare: ({ language }) => ({ title: `Subscription Page${language ? ` (${language})` : ""}` }),
  },
});
