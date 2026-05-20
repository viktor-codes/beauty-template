import { defineField, defineType } from "sanity";

export const servicesGoalPreview = defineType({
  name: "servicesGoalPreview",
  title: "Goal chip",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Goal ID",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title", subtitle: "href" },
  },
});
