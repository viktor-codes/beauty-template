import { defineField, defineType } from "sanity";

export const reviewItem = defineType({
  name: "reviewItem",
  title: "Review",
  type: "object",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "authorName",
      title: "Author name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "authorRole", title: "Author role / treatment", type: "string" }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "authorRole" },
  },
});
