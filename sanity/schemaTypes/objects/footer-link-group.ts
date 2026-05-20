import { defineArrayMember, defineField, defineType } from "sanity";

export const footerLinkGroup = defineType({
  name: "footerLinkGroup",
  title: "Link group",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [defineArrayMember({ type: "contentLink" })],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading" },
  },
});
