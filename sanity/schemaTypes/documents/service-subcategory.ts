import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

import { catalogSlugField } from "../helpers/catalog-slug-field";

export const serviceSubcategory = defineType({
  name: "serviceSubcategory",
  title: "Service subcategory",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "serviceSubcategory" }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "serviceCategory" }],
      validation: (rule) => rule.required(),
    }),
    catalogSlugField({
      urlHint: "URL segment for /treatments/{category}/{slug}.",
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
      title: "Sort order (legacy)",
      type: "number",
      description: "Fallback when orderRank is unset. Prefer drag-and-drop in Catalog.",
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
