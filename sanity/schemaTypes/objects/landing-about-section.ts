import { defineArrayMember, defineField, defineType } from "sanity";

export const landingAboutSection = defineType({
  name: "landingAboutSection",
  title: "About",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 6 }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [defineArrayMember({ type: "aboutStat" })],
    }),
    defineField({ name: "brandsEyebrow", title: "Brands eyebrow", type: "string" }),
    defineField({
      name: "brandLogos",
      title: "Brand logos",
      type: "array",
      of: [defineArrayMember({ type: "brandLogo" })],
    }),
  ],
});
