import { defineField, defineType } from "sanity";

/**
 * Singleton: copy for /treatments hub (field i18n — one document, EN/UK/RU fields).
 * Categories and procedures use separate documents; this is only page chrome + FAQ headings.
 */
export const treatmentsHub = defineType({
  name: "treatmentsHub",
  title: "Treatments hub page",
  type: "document",
  fields: [
    defineField({
      name: "hubTitle",
      title: "Page title (H1)",
      type: "localeString",
      description: "Main heading on /treatments (e.g. “Explore treatments by category”).",
    }),
    defineField({
      name: "hubDescription",
      title: "Page introduction",
      type: "localeText",
      description: "Subtitle below the H1.",
    }),
    defineField({
      name: "goalsSectionTitle",
      title: "Concerns section label",
      type: "localeString",
      description: "Heading above concern chips/cards (e.g. “Choose by concern”).",
    }),
    defineField({
      name: "faqEyebrow",
      title: "FAQ eyebrow",
      type: "localeString",
    }),
    defineField({
      name: "faqTitle",
      title: "FAQ title",
      type: "localeString",
    }),
    defineField({
      name: "faqSubtitle",
      title: "FAQ subtitle",
      type: "localeText",
    }),
    defineField({
      name: "viewFullFaqLabel",
      title: "Link to homepage FAQ",
      type: "localeString",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Treatments hub (/treatments)" }),
  },
});
