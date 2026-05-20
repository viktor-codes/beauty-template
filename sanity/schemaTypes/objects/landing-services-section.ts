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
      name: "categories",
      title: "Category cards",
      type: "array",
      of: [defineArrayMember({ type: "servicesCategoryPreview" })],
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
