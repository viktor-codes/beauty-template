import { defineArrayMember, defineField, defineType } from "sanity";

export const landingNavSection = defineType({
  name: "landingNavSection",
  title: "Navigation",
  type: "object",
  fields: [
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [defineArrayMember({ type: "contentLink" })],
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: "cta", title: "Header CTA", type: "contentLink", validation: (r) => r.required() }),
  ],
});
