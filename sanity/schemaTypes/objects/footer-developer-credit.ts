import { defineField, defineType } from "sanity";

export const footerDeveloperCredit = defineType({
  name: "footerDeveloperCredit",
  title: "Developer credit",
  type: "object",
  fields: [
    defineField({ name: "lead", title: "Text before link", type: "string" }),
    defineField({ name: "brandLabel", title: "Link label", type: "string" }),
    defineField({ name: "tail", title: "Text after link", type: "string" }),
    defineField({ name: "href", title: "URL", type: "url" }),
  ],
});
