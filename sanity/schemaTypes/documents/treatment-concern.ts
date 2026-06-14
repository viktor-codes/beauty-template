import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

import { ConcernProcedureLinksInput } from "../../components/concern-procedure-links-input";
import { catalogSlugField } from "../helpers/catalog-slug-field";

/**
 * Client concern / goal (field i18n). Linked from procedures; shown on /treatments hub.
 */
export const treatmentConcern = defineType({
  name: "treatmentConcern",
  title: "Treatment concern",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "treatmentConcern" }),
    catalogSlugField({
      urlHint: "URL path /treatments/concerns/{slug}.",
    }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "localeText",
      description: "Optional line on hub cards.",
    }),
    defineField({
      name: "image",
      title: "Hub card image",
      type: "serviceImage",
      description: "Shown on /treatments in the “Browse by concern” grid.",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order (legacy)",
      type: "number",
      description: "Fallback when orderRank is unset. Prefer drag-and-drop in Services → Browse by concern.",
      initialValue: 0,
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Inactive concerns are hidden on the site but kept in Studio.",
      initialValue: true,
    }),
    defineField({
      name: "linkedProceduresUi",
      title: "Linked procedures",
      type: "string",
      components: {
        input: ConcernProcedureLinksInput,
      },
      description:
        "Manage which procedures appear on this concern page. Saved on each procedure document.",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      slug: "slug.current",
      isActive: "isActive",
    },
    prepare: ({ title, slug, isActive }) => ({
      title: title ?? "Concern",
      subtitle: [slug, isActive === false ? "Hidden" : null].filter(Boolean).join(" · "),
    }),
  },
});
