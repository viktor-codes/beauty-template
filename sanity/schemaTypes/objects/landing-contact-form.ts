import { defineField, defineType } from "sanity";

export const landingContactForm = defineType({
  name: "landingContactForm",
  title: "Contact form copy",
  type: "object",
  fields: [
    defineField({ name: "nameLabel", title: "Name label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "namePlaceholder",
      title: "Name placeholder",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "emailLabel", title: "Email label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "emailPlaceholder",
      title: "Email placeholder",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "messageLabel",
      title: "Message label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "messagePlaceholder",
      title: "Message placeholder",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "submit", title: "Submit button", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "validation",
      title: "Validation messages",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "nameRequired", type: "string", validation: (r) => r.required() }),
        defineField({ name: "nameTooLong", type: "string", validation: (r) => r.required() }),
        defineField({ name: "emailInvalid", type: "string", validation: (r) => r.required() }),
        defineField({ name: "messageMin", type: "string", validation: (r) => r.required() }),
        defineField({ name: "messageTooLong", type: "string", validation: (r) => r.required() }),
      ],
    }),
  ],
});
