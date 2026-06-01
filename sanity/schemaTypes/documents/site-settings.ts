import { defineField, defineType } from "sanity";

import {
  validateEmailAddress,
  validateHttpUrl,
  validateTelHref,
} from "../validation/contact-fields";

/**
 * Document i18n: canonical contact details per locale.
 * Phone, email, address, and messenger URLs here override landing contact & footer.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    {
      name: "contact",
      title: "Contact details",
      default: true,
    },
    {
      name: "social",
      title: "Social & directions",
    },
  ],
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
    defineField({
      name: "phone",
      title: "Phone (display)",
      type: "string",
      group: "contact",
      description:
        "Visible phone number. Also used as the label on phone links in the footer. Edit once here — contact block and footer stay in sync.",
    }),
    defineField({
      name: "phoneTelHref",
      title: "Phone link (tel:)",
      type: "string",
      group: "contact",
      description: "Tap-to-call link for mobile. Format: tel:+353861234567",
      validation: (rule) => rule.custom(validateTelHref),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
      description: "Studio inbox. Site builds mailto: links automatically.",
      validation: (rule) => rule.custom(validateEmailAddress),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
      group: "contact",
      description: "Studio address shown in the contact section and footer.",
    }),
    defineField({
      name: "directionsHref",
      title: "Directions URL",
      type: "url",
      group: "social",
      description: "Google Maps or similar — “Directions” link in contact and footer.",
      validation: (rule) => rule.custom(validateHttpUrl),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "social",
      description: "Used for gallery link, contact Instagram button, and footer social link.",
      validation: (rule) => rule.custom(validateHttpUrl),
    }),
    defineField({
      name: "telegramHref",
      title: "Telegram URL",
      type: "url",
      group: "social",
      description: "Contact section Telegram messenger button.",
      validation: (rule) => rule.custom(validateHttpUrl),
    }),
    defineField({
      name: "whatsappHref",
      title: "WhatsApp URL",
      type: "url",
      group: "social",
      description: "Contact section WhatsApp messenger button.",
      validation: (rule) => rule.custom(validateHttpUrl),
    }),
  ],
  preview: {
    select: { language: "language", phone: "phone", email: "email" },
    prepare: ({ language, phone, email }) => ({
      title: "Site settings",
      subtitle: [language?.toUpperCase(), phone, email].filter(Boolean).join(" · "),
    }),
  },
});
