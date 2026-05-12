import { defineField, defineType } from "sanity";

export const quizQuestion = defineType({
  name: "quizQuestion",
  title: "Quiz Question",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Order", type: "number", validation: (Rule) => Rule.required() }),
    defineField({ name: "question", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "key", title: "Frontend Key", type: "string", description: "snake_case key used by the frontend" }),
    defineField({
      name: "options",
      title: "Options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({
              name: "scores",
              title: "Result Scores",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "resultKey", title: "Result Key", type: "string" }),
                    defineField({ name: "weight", title: "Weight", type: "number" }),
                  ],
                  preview: {
                    select: { title: "resultKey", subtitle: "weight" },
                  },
                },
              ],
            }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "question", subtitle: "order" },
    prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle ? `Order ${subtitle}` : undefined }),
  },
});
