import { defineField, defineType } from "sanity";

/** Shared asset; localized alt only (field i18n). */
export const serviceImage = defineType({
  name: "serviceImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "asset",
      title: "File",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "localeString",
    }),
  ],
});
