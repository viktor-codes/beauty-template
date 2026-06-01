import { defineField, defineType } from "sanity";

import {
  validateFeaturedInNavLimit,
  validateFeaturedOnHomepageLimit,
} from "../validation/featured-category-limits";

/**
 * Field i18n: single document per category slug.
 * Procedures reference subcategories by stable _id — no per-locale document split.
 */
export const serviceCategory = defineType({
  name: "serviceCategory",
  title: "Service category",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL segment for /treatments/{slug}. Auto-generated from English title; do not change after publish.",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "image", title: "Image", type: "serviceImage" }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first when multiple categories share a feature flag.",
      initialValue: 0,
    }),
    defineField({
      name: "featuredOnHomepage",
      title: "Featured on homepage",
      type: "boolean",
      description: "Show on the landing services section (maximum 4 categories across the whole catalog).",
      initialValue: false,
      validation: (rule) => rule.custom(validateFeaturedOnHomepageLimit),
    }),
    defineField({
      name: "featuredInNav",
      title: "Featured in header menu",
      type: "boolean",
      description: "Show in the Treatments dropdown in the site header (maximum 5 categories).",
      initialValue: false,
      validation: (rule) => rule.custom(validateFeaturedInNavLimit),
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      slug: "slug.current",
      featuredOnHomepage: "featuredOnHomepage",
      featuredInNav: "featuredInNav",
    },
    prepare: ({ title, slug, featuredOnHomepage, featuredInNav }) => {
      const flags = [
        featuredOnHomepage ? "Home" : null,
        featuredInNav ? "Nav" : null,
      ].filter(Boolean);

      return {
        title: title ?? "Category",
        subtitle: [slug, flags.length > 0 ? flags.join(" · ") : null].filter(Boolean).join(" — "),
      };
    },
  },
});
