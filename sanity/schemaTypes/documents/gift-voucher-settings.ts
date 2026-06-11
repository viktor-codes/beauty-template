import { defineField, defineType } from "sanity";

/**
 * Singleton: copy and rules for /gift-voucher (field i18n).
 */
export const giftVoucherSettings = defineType({
  name: "giftVoucherSettings",
  title: "Gift voucher page",
  type: "document",
  fields: [
    defineField({
      name: "isEnabled",
      title: "Enable gift voucher purchases",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "heroTitle",
      title: "Page title (H1)",
      type: "localeString",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Page introduction",
      type: "localeText",
    }),
    defineField({
      name: "termsBlurb",
      title: "Terms summary",
      type: "localeText",
      description: "Short validity / redemption note shown below the checkout button.",
    }),
    defineField({
      name: "validityMonths",
      title: "Voucher validity (months)",
      type: "number",
      initialValue: 12,
      validation: (rule) => rule.required().min(1).max(36),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Gift voucher (/gift-voucher)" }),
  },
});
