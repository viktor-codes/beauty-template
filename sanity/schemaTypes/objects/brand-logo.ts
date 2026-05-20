import { defineField, defineType } from "sanity";

export const brandLogo = defineType({
  name: "brandLogo",
  title: "Brand logo",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Logo",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "alt", title: "Alt text", type: "string", validation: (r) => r.required() }),
    defineField({ name: "width", title: "Width (px)", type: "number" }),
    defineField({ name: "height", title: "Height (px)", type: "number" }),
  ],
  preview: {
    select: { title: "alt", media: "image" },
  },
});
