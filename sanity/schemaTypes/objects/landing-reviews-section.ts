import { defineArrayMember, defineField, defineType } from "sanity";

const MAX_REVIEWS = 8;

export const landingReviewsSection = defineType({
  name: "landingReviewsSection",
  title: "Reviews",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "viewOnInstagramLabel",
      title: "Instagram link label",
      type: "string",
      description: "Shown when a review has an Instagram URL (e.g. “View on Instagram”).",
      initialValue: "View on Instagram",
    }),
    defineField({
      name: "items",
      title: "Reviews",
      type: "array",
      validation: (rule) => rule.max(MAX_REVIEWS),
      of: [defineArrayMember({ type: "reviewItem" })],
    }),
  ],
});
