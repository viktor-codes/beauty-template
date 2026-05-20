import { defineField, defineType } from "sanity";

/**
 * Field i18n: single document per category slug.
 * Procedures reference subcategories by stable _id — no per-locale document split.
 */
export const serviceCategory = defineType({
  name: "serviceCategory",
  title: "Service category",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "image", title: "Image", type: "serviceImage" }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title.en", slug: "slug.current" },
    prepare: ({ title, slug }) => ({
      title: title ?? "Category",
      subtitle: slug,
    }),
  },
});
