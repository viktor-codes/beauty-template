import { defineField, defineType } from "sanity";

export const servicesCategoryPreview = defineType({
  name: "servicesCategoryPreview",
  title: "Category preview",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Anchor ID",
      type: "string",
      description: "Must match service category slug when linked to catalog.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "href", title: "Link", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title", subtitle: "href" },
  },
});
