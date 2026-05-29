import { defineField, defineType } from "sanity";

/**
 * Document i18n: shared studio / contact defaults per locale.
 * Landing contact/footer can override copy; use for canonical phone, URLs, social.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      readOnly: true,
      hidden: true,
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Ukrainian", value: "uk" },
          { title: "Russian", value: "ru" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "phone", title: "Phone display", type: "string" }),
    defineField({ name: "phoneTelHref", title: "Phone tel: link", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "telegramHref", title: "Telegram URL", type: "url" }),
    defineField({ name: "whatsappHref", title: "WhatsApp URL", type: "url" }),
    defineField({ name: "directionsHref", title: "Directions URL", type: "url" }),
    defineField({ name: "developerCredit", title: "Developer credit", type: "footerDeveloperCredit" }),
  ],
  preview: {
    select: { language: "language", phone: "phone" },
    prepare: ({ language, phone }) => ({
      title: "Site settings",
      subtitle: [language, phone].filter(Boolean).join(" · "),
    }),
  },
});
