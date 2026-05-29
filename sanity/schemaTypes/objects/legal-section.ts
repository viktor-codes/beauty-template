import { defineField, defineType } from "sanity";

export const legalSection = defineType({
  name: "legalSection",
  title: "Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "legalBlockContent",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title ?? "Section" }),
  },
});
