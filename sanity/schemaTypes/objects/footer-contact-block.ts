import { defineField, defineType } from "sanity";

export const footerContactBlock = defineType({
  name: "footerContactBlock",
  title: "Footer contact",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "phone", title: "Phone link", type: "contentLink", validation: (r) => r.required() }),
    defineField({ name: "email", title: "Email link", type: "contentLink", validation: (r) => r.required() }),
    defineField({ name: "address", title: "Address", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "directionsHref", title: "Directions URL", type: "url" }),
    defineField({ name: "directionsLabel", title: "Directions label", type: "string" }),
  ],
});
