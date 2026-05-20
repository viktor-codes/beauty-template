import { defineArrayMember, defineField, defineType } from "sanity";

export const landingFaqSection = defineType({
  name: "landingFaqSection",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({
      name: "introBullets",
      title: "Intro bullets",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "groups",
      title: "FAQ groups",
      type: "array",
      of: [defineArrayMember({ type: "faqGroup" })],
    }),
    defineField({
      name: "items",
      title: "Flat FAQ list (legacy / services matching)",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })],
    }),
  ],
});
