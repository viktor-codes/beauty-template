import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

import { catalogSlugField } from "../helpers/catalog-slug-field";

export const serviceProcedure = defineType({
  name: "serviceProcedure",
  title: "Service procedure",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "serviceProcedure" }),
    defineField({
      name: "subcategory",
      title: "Subcategory",
      type: "reference",
      to: [{ type: "serviceSubcategory" }],
      validation: (rule) => rule.required(),
      options: {
        filter: '_type == "serviceSubcategory" && isActive != false',
      },
    }),
    catalogSlugField({
      urlHint: "URL segment for /treatments/{category}/{subcategory}/{slug}.",
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
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Inactive procedures are hidden on the site but kept in Studio.",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order (legacy)",
      type: "number",
      description: "Fallback when orderRank is unset. Prefer drag-and-drop in Catalog.",
      initialValue: 0,
    }),
    defineField({
      name: "concerns",
      title: "Helps with concerns",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "treatmentConcern" }],
          options: {
            filter: '_type == "treatmentConcern" && isActive != false',
          },
        },
      ],
      description:
        "Select which client concerns this procedure addresses. Shown on /treatments/concerns/{slug} pages.",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subcategory: "subcategory.title.en",
      amount: "price.amount",
      isActive: "isActive",
      concerns: "concerns",
    },
    prepare: ({ title, subcategory, amount, isActive, concerns }) => {
      const concernCount = Array.isArray(concerns) ? concerns.length : 0;

      return {
        title: title ?? "Procedure",
        subtitle: [
          subcategory,
          typeof amount === "number" ? `€${amount}` : null,
          concernCount > 0 ? `${concernCount} concerns` : null,
          isActive === false ? "Hidden" : null,
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
