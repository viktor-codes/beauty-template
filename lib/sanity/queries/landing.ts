import { sanityImageFields } from "@/lib/sanity/queries/fragments";

/** Document i18n: one `landingPage` per locale (`language` from plugin). */
export const landingPageQuery = /* groq */ `
  *[_type == "landingPage" && language == $locale][0]{
    _id,
    language,
    hero {
      eyebrow,
      title,
      subtitle,
      primaryCtaLabel,
      secondaryCtaLabel,
      image {
        ${sanityImageFields}
      }
    }
  }
`;
