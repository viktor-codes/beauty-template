import { defineField, defineType } from "sanity";

export const landingGallerySection = defineType({
  name: "landingGallerySection",
  title: "Gallery",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
  ],
});
