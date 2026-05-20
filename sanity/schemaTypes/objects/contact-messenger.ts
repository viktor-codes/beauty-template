import { defineField, defineType } from "sanity";

const MESSENGER_IDS = [
  { title: "Telegram", value: "telegram" },
  { title: "WhatsApp", value: "whatsapp" },
  { title: "Instagram", value: "instagram" },
] as const;

export const contactMessenger = defineType({
  name: "contactMessenger",
  title: "Messenger link",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Messenger",
      type: "string",
      options: { list: [...MESSENGER_IDS] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "href", title: "URL", type: "url", validation: (r) => r.required() }),
    defineField({
      name: "ariaLabel",
      title: "Aria label",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "id", subtitle: "href" },
  },
});
