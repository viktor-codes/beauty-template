import type { LocaleFieldValues } from "@/lib/i18n/pick-locale-field";

/** Seeds EN only — UK/RU fall back to EN on the site when empty. */
export function toLocaleStringEnOnly(value: string): LocaleFieldValues {
  return { en: value };
}

/** Seeds EN + optional UK/RU when they differ from EN (avoids duplicate Studio noise). */
export function toLocaleStringI18n(en: string, uk?: string, ru?: string): LocaleFieldValues {
  const result: LocaleFieldValues = { en };
  const ukTrimmed = uk?.trim();
  const ruTrimmed = ru?.trim();

  if (ukTrimmed && ukTrimmed !== en.trim()) {
    result.uk = ukTrimmed;
  }
  if (ruTrimmed && ruTrimmed !== en.trim()) {
    result.ru = ruTrimmed;
  }

  return result;
}

export function toLocaleTextI18n(en: string, uk?: string, ru?: string): LocaleFieldValues {
  return toLocaleStringI18n(en, uk, ru);
}

/** @deprecated Use toLocaleStringEnOnly or toLocaleStringI18n */
export function toLocaleString(value: string): LocaleFieldValues {
  return toLocaleStringEnOnly(value);
}

/** @deprecated Use toLocaleTextI18n */
export function toLocaleText(value: string): LocaleFieldValues {
  return toLocaleStringEnOnly(value);
}
