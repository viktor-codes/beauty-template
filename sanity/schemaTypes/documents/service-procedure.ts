import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineArrayMember, defineField, defineType } from "sanity";

import { catalogSlugField } from "../helpers/catalog-slug-field";

export const serviceProcedure = defineType({
  name: "serviceProcedure",
  title: "Service procedure",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "serviceProcedure" }),
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
      name: "listedIn",
      title: "Catalog placements",
      type: "array",
      description:
        "Subcategories where this procedure appears on the site. One document — one price everywhere.",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: "object",
          name: "procedureCatalogPlacement",
          fields: [
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
            defineField({
              name: "sortOrder",
              title: "Sort order in subcategory",
              type: "number",
              initialValue: 0,
            }),
          ],
          preview: {
            select: {
              title: "subcategory.title.en",
              sortOrder: "sortOrder",
            },
            prepare: ({ title, sortOrder }) => ({
              title: title ?? "Subcategory",
              subtitle: typeof sortOrder === "number" ? `Order ${sortOrder}` : undefined,
            }),
          },
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
      description: "Fallback when orderRank is unset. Prefer sort order inside each placement.",
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
      amount: "price.amount",
      isActive: "isActive",
      concerns: "concerns",
      listedIn: "listedIn",
    },
    prepare: ({ title, amount, isActive, concerns, listedIn }) => {
      const concernCount = Array.isArray(concerns) ? concerns.length : 0;
      const placementCount = Array.isArray(listedIn) ? listedIn.length : 0;

      return {
        title: title ?? "Procedure",
        subtitle: [
          typeof amount === "number" ? `€${amount}` : null,
          placementCount > 0 ? `${placementCount} placements` : null,
          concernCount > 0 ? `${concernCount} concerns` : null,
          isActive === false ? "Hidden" : null,
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
