import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Stable ID",
      type: "slug",
      description: "Used for deep links and services-page FAQ matching.",
      options: { source: "question", maxLength: 96 },
    }),
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 5, validation: (r) => r.required() }),
    defineField({
      name: "isDefaultOpen",
      title: "Open by default",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "question" },
  },
});
