/** GROQ projection for Sanity `image` fields (hero, etc.). */
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
