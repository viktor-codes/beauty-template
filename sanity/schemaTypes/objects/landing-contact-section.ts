import { defineArrayMember, defineField, defineType } from "sanity";

export const landingContactSection = defineType({
  name: "landingContactSection",
  title: "Contact",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "phone", title: "Phone display", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "address", type: "text", rows: 2 }),
    defineField({ name: "phoneLabel", type: "string" }),
    defineField({ name: "emailLabel", type: "string" }),
    defineField({ name: "locationTitle", title: "Location heading", type: "string" }),
    defineField({
      name: "messengers",
      title: "Messengers",
      type: "array",
      of: [defineArrayMember({ type: "contactMessenger" })],
    }),
  ],
});
