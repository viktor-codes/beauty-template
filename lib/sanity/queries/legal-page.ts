/** Document i18n: one `legalPage` per locale and slug (`language` from plugin). */
export const legalPageQuery = /* groq */ `
  *[_type == "legalPage" && language == $locale && slug == $slug][0]{
    _id,
    language,
    slug,
    title,
    metaDescription,
    sections[] {
      heading,
      body[] {
        ...,
        markDefs[] {
          ...,
          _type == "link" => {
            href
          }
        }
      }
    }
  }
`;
