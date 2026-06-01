import { defineField, defineType } from "sanity";

export const brandLogo = defineType({
  name: "brandLogo",
  title: "Brand logo",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Logo file",
      type: "image",
      description: "PNG or SVG on transparent background works best. Re-upload here to replace a partner logo.",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Accessible label for the brand (e.g. “Esse”). Use this locale’s language on UK/RU landing pages.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "width",
      title: "Display width (px)",
      type: "number",
      description: "Optional. Default on site: 140.",
      initialValue: 140,
    }),
    defineField({
      name: "height",
      title: "Display height (px)",
      type: "number",
      description: "Optional. Default on site: 44.",
      initialValue: 44,
    }),
  ],
  preview: {
    select: { title: "alt", media: "image" },
  },
});
