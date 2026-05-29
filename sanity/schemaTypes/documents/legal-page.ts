import { defineField, defineType } from "sanity";

export const LEGAL_PAGE_SLUGS = ["privacy", "terms"] as const;

/** One document per locale + slug (`legalPage-privacy-en`). Not using document i18n plugin. */
export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Ukrainian", value: "uk" },
          { title: "Russian", value: "ru" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "Privacy policy", value: "privacy" },
          { title: "Terms & conditions", value: "terms" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      description: "Shown as H1 and used in SEO title.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [{ type: "legalSection" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug", language: "language" },
    prepare: ({ title, slug, language }) => ({
      title: title ?? slug ?? "Legal page",
      subtitle: [slug, language].filter(Boolean).join(" · "),
    }),
  },
});
