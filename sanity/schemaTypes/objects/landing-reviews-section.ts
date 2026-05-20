import { defineArrayMember, defineField, defineType } from "sanity";

export const landingReviewsSection = defineType({
  name: "landingReviewsSection",
  title: "Reviews",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "items",
      title: "Reviews",
      type: "array",
      of: [defineArrayMember({ type: "reviewItem" })],
    }),
  ],
});
