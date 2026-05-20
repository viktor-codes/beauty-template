import { localeStringFields, serviceImageFields } from "@/lib/sanity/queries/fragments";

/**
 * Services tree (field i18n): single document IDs, no `language` filter.
 * Hub title/description optional until siteSettings / hub fields exist in CMS.
 */
export const servicesCatalogQuery = /* groq */ `
  {
    "categories": *[_type == "serviceCategory"] | order(sortOrder asc, title.en asc) {
      "slug": slug,
      title { ${localeStringFields} },
      description { ${localeStringFields} },
      image {
        ${serviceImageFields}
      },
      "subcategories": *[_type == "serviceSubcategory" && references(^._id)] | order(sortOrder asc, title.en asc) {
        "slug": slug,
        title { ${localeStringFields} },
        description { ${localeStringFields} },
        image {
          ${serviceImageFields}
        },
        "procedures": *[_type == "serviceProcedure" && references(^._id)] | order(sortOrder asc, title.en asc) {
          "slug": slug,
          title { ${localeStringFields} },
          description { ${localeStringFields} },
          image {
            ${serviceImageFields}
          },
          price {
            amount,
            currency
          }
        }
      }
    }
  }
`;
