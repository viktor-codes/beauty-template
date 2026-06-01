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
      description: "Organize questions by topic. Each item needs a stable ID slug for treatment-page matching.",
      type: "array",
      of: [defineArrayMember({ type: "faqGroup" })],
    }),
  ],
});
