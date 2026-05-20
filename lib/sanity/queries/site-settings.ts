/** Document i18n: one `siteSettings` per locale. */
export const siteSettingsQuery = /* groq */ `
  *[_type == "siteSettings" && language == $locale][0]{
    _id,
    language,
    phone,
    phoneTelHref,
    email,
    address,
    instagramUrl,
    telegramHref,
    whatsappHref,
    directionsHref,
    developerCredit {
      lead,
      brandLabel,
      tail,
      href
    }
  }
`;
