import { defineArrayMember, defineField, defineType } from "sanity";

export const landingServicesSection = defineType({
  name: "landingServicesSection",
  title: "Services preview",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "goalsHeading",
      title: "Goal chips heading",
      description: "Caption above concern chips (e.g. “or choose by your goal”).",
      type: "string",
    }),
    defineField({
      name: "goals",
      title: "Goal chips",
      type: "array",
      of: [defineArrayMember({ type: "servicesGoalPreview" })],
    }),
    defineField({ name: "cta", title: "Section CTA", type: "contentLink" }),
  ],
});
