import { defineArrayMember, defineField, defineType } from "sanity";

export const footerLegal = defineType({
  name: "footerLegal",
  title: "Legal footer",
  type: "object",
  fields: [
    defineField({ name: "notice", title: "Copyright notice", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "links",
      title: "Legal links",
      type: "array",
      of: [defineArrayMember({ type: "contentLink" })],
    }),
  ],
});
