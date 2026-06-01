import { defineField, defineType } from "sanity";

import { LocaleTabsInput } from "../../components/locale-tabs-input";

/** Field-level i18n — one document, multiple languages (services tree). */
export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  components: { input: LocaleTabsInput },
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "uk", title: "Ukrainian", type: "string" }),
    defineField({ name: "ru", title: "Russian", type: "string" }),
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  components: { input: LocaleTabsInput },
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "uk", title: "Ukrainian", type: "text", rows: 4 }),
    defineField({ name: "ru", title: "Russian", type: "text", rows: 4 }),
  ],
});
