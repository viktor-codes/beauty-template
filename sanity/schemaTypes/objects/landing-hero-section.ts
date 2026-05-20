import { defineField, defineType } from "sanity";

export const landingHeroSection = defineType({
  name: "landingHeroSection",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", type: "text", rows: 3 }),
    defineField({ name: "primaryCtaLabel", title: "Primary CTA label", type: "string" }),
    defineField({ name: "secondaryCtaLabel", title: "Secondary CTA label", type: "string" }),
    defineField({
      name: "primaryCtaHref",
      title: "Primary CTA link",
      type: "string",
      initialValue: "#contact",
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "Secondary CTA link",
      type: "string",
      initialValue: "#services",
    }),
  ],
});
