import { defineField, defineType } from "sanity";

export const contentLink = defineType({
  name: "contentLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL or hash",
      type: "string",
      description: "e.g. #contact, /services, https://…",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
