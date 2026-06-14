import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

import { catalogSlugField } from "../helpers/catalog-slug-field";
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
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "serviceCategory" }),
    catalogSlugField({
      urlHint: "URL segment for /treatments/{slug}.",
    }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({
      name: "shortTitle",
      title: "Short title (header menu)",
      type: "localeString",
      description:
        "Optional shorter label for the Treatments dropdown (e.g. “Injectables”). Leave empty to use the main title.",
    }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "image", title: "Image", type: "serviceImage" }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Inactive categories are hidden on the site but kept in Studio.",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order (legacy)",
      type: "number",
      description: "Fallback when orderRank is unset. Prefer drag-and-drop in Catalog → Reorder categories.",
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
      shortTitle: "shortTitle.en",
      slug: "slug.current",
      featuredOnHomepage: "featuredOnHomepage",
      featuredInNav: "featuredInNav",
      isActive: "isActive",
    },
    prepare: ({ title, shortTitle, slug, featuredOnHomepage, featuredInNav, isActive }) => {
      const flags = [
        featuredOnHomepage ? "Home" : null,
        featuredInNav ? "Nav" : null,
      ].filter(Boolean);

      return {
        title: title ?? "Category",
        subtitle: [
          slug,
          shortTitle ? `Nav: ${shortTitle}` : null,
          flags.length > 0 ? flags.join(" · ") : null,
          isActive === false ? "Hidden" : null,
        ]
          .filter(Boolean)
          .join(" — "),
      };
    },
  },
});
