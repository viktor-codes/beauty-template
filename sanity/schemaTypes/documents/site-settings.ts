import { defineField, defineType } from "sanity";

/** Document i18n: studio contact strings per locale. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "phone", title: "Phone display", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
