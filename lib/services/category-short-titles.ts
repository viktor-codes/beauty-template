import type { AppLocale } from "@/i18n/routing";
import {
  pickLocaleField,
  type LocaleFieldValues,
} from "@/lib/i18n/pick-locale-field";

/**
 * Optional shorter nav labels when the main title is too long for the header dropdown.
 * CMS: `serviceCategory.shortTitle` overrides these after seed.
 */
export const STATIC_CATEGORY_SHORT_TITLES: Record<string, LocaleFieldValues> = {
  "aesthetic-injections": {
    en: "Injectables",
    uk: "Ін’єкції",
    ru: "Инъекции",
  },
};

export function getStaticCategoryShortTitle(
  categoryId: string,
  locale: AppLocale,
  fullTitle: string,
): string {
  const field = STATIC_CATEGORY_SHORT_TITLES[categoryId];
  if (!field) return fullTitle;
  return pickLocaleField(field, locale, fullTitle);
}
