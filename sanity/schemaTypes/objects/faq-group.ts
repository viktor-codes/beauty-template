import { defineArrayMember, defineField, defineType } from "sanity";

export const faqGroup = defineType({
  name: "faqGroup",
  title: "FAQ group",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Group ID",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 2 }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle" },
  },
});
