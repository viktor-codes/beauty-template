import { localeStringFields, serviceImageFields } from "@/lib/sanity/queries/fragments";

/**
 * Services tree (field i18n): single document IDs, no `language` filter.
 * Hub copy: singleton `treatmentsHub`. Concerns: `treatmentConcern` documents.
 */
export const servicesCatalogQuery = /* groq */ `
  {
    "hub": *[_type == "treatmentsHub"][0] {
      hubTitle { ${localeStringFields} },
      hubDescription { ${localeStringFields} },
      goalsSectionTitle { ${localeStringFields} },
      faqEyebrow { ${localeStringFields} },
      faqTitle { ${localeStringFields} },
      faqSubtitle { ${localeStringFields} },
      viewFullFaqLabel { ${localeStringFields} }
    },
    "concerns": *[_type == "treatmentConcern" && isActive != false] | order(sortOrder asc, title.en asc) {
      "slug": slug,
      title { ${localeStringFields} },
      shortDescription { ${localeStringFields} },
      image {
        ${serviceImageFields}
      },
      sortOrder,
      isActive
    },
    "categories": *[_type == "serviceCategory" && isActive != false] | order(sortOrder asc, title.en asc) {
      "slug": slug,
      title { ${localeStringFields} },
      shortTitle { ${localeStringFields} },
      description { ${localeStringFields} },
      image {
        ${serviceImageFields}
      },
      sortOrder,
      featuredOnHomepage,
      featuredInNav,
      "subcategories": *[_type == "serviceSubcategory" && references(^._id) && isActive != false] | order(sortOrder asc, title.en asc) {
        "slug": slug,
        title { ${localeStringFields} },
        description { ${localeStringFields} },
        image {
          ${serviceImageFields}
        },
        "procedures": *[_type == "serviceProcedure" && references(^._id) && isActive != false] | order(sortOrder asc, title.en asc) {
          "slug": slug,
          title { ${localeStringFields} },
          description { ${localeStringFields} },
          image {
            ${serviceImageFields}
          },
          price {
            amount,
            currency
          },
          sortOrder,
          "concernSlugs": concerns[]->slug.current
        }
      }
    }
  }
`;
