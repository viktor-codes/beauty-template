/** Inline link object used in nav, footer, etc. */
export const contentLinkFields = /* groq */ `
  label,
  href
`;

export const footerLinkGroupFields = /* groq */ `
  heading,
  links[] {
    ${contentLinkFields}
  }
`;

export const servicesCategoryPreviewFields = /* groq */ `
  id,
  title,
  description,
  href
`;

export const servicesGoalPreviewFields = /* groq */ `
  id,
  title,
  href
`;

export const contactMessengerFields = /* groq */ `
  id,
  href,
  ariaLabel
`;

export const faqItemFields = /* groq */ `
  "id": id.current,
  question,
  answer,
  isDefaultOpen
`;

export const faqGroupFields = /* groq */ `
  "id": id.current,
  title,
  subtitle,
  items[] {
    ${faqItemFields}
  }
`;

/** GROQ projection for Sanity `image` fields (e.g. brand logos). */
export const sanityImageFields = /* groq */ `
  asset->{
    _id,
    url
  },
  alt
`;

/** GROQ projection for `serviceImage` object (nested asset + localeString alt). */
export const serviceImageFields = /* groq */ `
  asset->{
    _id,
    url
  },
  alt
`;

/** Field-level i18n: fetch all locale keys for mapper `pickLocaleField`. */
export const localeStringFields = /* groq */ `
  en,
  uk,
  ru
`;
