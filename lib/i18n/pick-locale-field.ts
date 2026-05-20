import { routing, type AppLocale } from "@/i18n/routing";

/** Sanity field-level i18n object (localeString, localeText, …). */
export type LocaleFieldValues = Partial<Record<AppLocale, string | undefined>>;

/**
 * Resolves a localized Sanity field for the active locale.
 * Fallback order: requested locale → default locale → first non-empty → explicit fallback.
 */
export function pickLocaleField(
  field: LocaleFieldValues | null | undefined,
  locale: AppLocale,
  fallback: string,
): string {
  if (!field) return fallback;

  const requested = field[locale]?.trim();
  if (requested) return requested;

  const defaultLocaleValue = field[routing.defaultLocale]?.trim();
  if (defaultLocaleValue) return defaultLocaleValue;

  for (const code of routing.locales) {
    const candidate = field[code]?.trim();
    if (candidate) return candidate;
  }

  return fallback;
}

/**
 * Document i18n: value is already a plain string on the localized document.
 * Field i18n: value is `{ en, uk, ru }`. Both paths share one mapper API.
 */
export function readLocalizedValue(
  field: LocaleFieldValues | string | null | undefined,
  locale: AppLocale,
  fallback: string,
): string {
  if (typeof field === "string") {
    const trimmed = field.trim();
    return trimmed || fallback;
  }
  return pickLocaleField(field, locale, fallback);
}
