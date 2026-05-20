import { defineField, defineType } from "sanity";

/** Document i18n: one landing document per locale (plugin adds language field). */
export const landingPage = defineType({
  name: "landingPage",
  title: "Landing page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string", validation: (r) => r.required() }),
        defineField({ name: "subtitle", type: "text", rows: 3 }),
        defineField({ name: "primaryCtaLabel", title: "Primary CTA label", type: "string" }),
        defineField({
          name: "secondaryCtaLabel",
          title: "Secondary CTA label",
          type: "string",
        }),
        defineField({
          name: "image",
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Landing page" }),
  },
});
