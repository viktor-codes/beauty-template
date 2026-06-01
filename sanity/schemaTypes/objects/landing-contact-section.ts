import { defineArrayMember, defineField, defineType } from "sanity";

export const landingContactSection = defineType({
  name: "landingContactSection",
  title: "Contact",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "phone",
      title: "Phone (fallback)",
      type: "string",
      description:
        "Used only if Site settings → Phone is empty. Prefer editing phone in Site settings.",
      readOnly: false,
    }),
    defineField({
      name: "email",
      title: "Email (fallback)",
      type: "string",
      description: "Used only if Site settings → Email is empty.",
    }),
    defineField({
      name: "address",
      title: "Address (fallback)",
      type: "text",
      rows: 2,
      description: "Used only if Site settings → Address is empty.",
    }),
    defineField({
      name: "phoneLabel",
      title: "Phone row label",
      type: "string",
      description: "Translated label next to the phone number (e.g. “Phone”).",
    }),
    defineField({
      name: "emailLabel",
      title: "Email row label",
      type: "string",
      description: "Translated label next to the email line.",
    }),
    defineField({
      name: "locationTitle",
      title: "Location heading",
      type: "string",
      description: "Heading above the address (e.g. studio name).",
    }),
    defineField({
      name: "messengers",
      title: "Messengers",
      description:
        "Button labels stay here; URLs come from Site settings (Telegram, WhatsApp, Instagram) when set.",
      type: "array",
      of: [defineArrayMember({ type: "contactMessenger" })],
    }),
  ],
});
