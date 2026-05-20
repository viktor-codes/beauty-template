import { defineField, defineType } from "sanity";

export const landingFooterSection = defineType({
  name: "landingFooterSection",
  title: "Footer",
  type: "object",
  fields: [
    defineField({ name: "brandTitle", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "text", rows: 2 }),
    defineField({ name: "navigation", type: "footerLinkGroup", validation: (r) => r.required() }),
    defineField({ name: "services", type: "footerLinkGroup", validation: (r) => r.required() }),
    defineField({ name: "contact", type: "footerContactBlock", validation: (r) => r.required() }),
    defineField({ name: "social", type: "footerLinkGroup", validation: (r) => r.required() }),
    defineField({ name: "legal", type: "footerLegal", validation: (r) => r.required() }),
    defineField({ name: "developerCredit", type: "footerDeveloperCredit" }),
  ],
});
