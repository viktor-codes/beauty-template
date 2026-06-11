import { defineField, defineType } from "sanity";

export const serviceProcedure = defineType({
  name: "serviceProcedure",
  title: "Service procedure",
  type: "document",
  fields: [
    defineField({
      name: "subcategory",
      title: "Subcategory",
      type: "reference",
      to: [{ type: "serviceSubcategory" }],
      validation: (rule) => rule.required(),
      // Single subcategory _id for all locales — no language filter needed.
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
      name: "price",
      title: "Price (EUR)",
      type: "object",
      fields: [
        defineField({ name: "amount", title: "Amount", type: "number" }),
        defineField({
          name: "currency",
          title: "Currency",
          type: "string",
          initialValue: "EUR",
          readOnly: true,
        }),
      ],
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "concerns",
      title: "Helps with concerns",
      type: "array",
      of: [{ type: "reference", to: [{ type: "treatmentConcern" }] }],
      description:
        "Select which client concerns this procedure addresses. Shown on /treatments/concerns/{slug} pages.",
    }),
  ],
  preview: {
    select: { title: "title.en", subcategory: "subcategory.title.en" },
    prepare: ({ title, subcategory }) => ({
      title: title ?? "Procedure",
      subtitle: subcategory,
    }),
  },
});
