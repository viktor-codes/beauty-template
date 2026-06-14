import { defineField, defineType } from "sanity";

export const serviceSubcategory = defineType({
  name: "serviceSubcategory",
  title: "Service subcategory",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "serviceCategory" }],
      validation: (rule) => rule.required(),
    }),
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
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Inactive subcategories are hidden on the site but kept in Studio.",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title.en", category: "category.title.en", isActive: "isActive" },
    prepare: ({ title, category, isActive }) => ({
      title: title ?? "Subcategory",
      subtitle: [category, isActive === false ? "Hidden" : null].filter(Boolean).join(" · "),
    }),
  },
});
