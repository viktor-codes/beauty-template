import { defineField, defineType } from "sanity";

/**
 * Client concern / goal (field i18n). Linked from procedures; shown on /treatments hub.
 */
export const treatmentConcern = defineType({
  name: "treatmentConcern",
  title: "Treatment concern",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "URL path /treatments/concerns/{slug}. Auto-generated from English title; do not change after publish.",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
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
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Inactive concerns are hidden on the site but kept in Studio.",
      initialValue: true,
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
