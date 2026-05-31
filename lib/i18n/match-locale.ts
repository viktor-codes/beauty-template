import { routing, type AppLocale } from "@/i18n/routing";

/** Auto-detected on first visit. Russian is manual-only via the locale switcher. */
export const AUTO_DETECT_LOCALES = ["en", "uk"] as const satisfies readonly AppLocale[];

function resolveLanguageTag(
  tag: string,
  allowedLocales: ReadonlySet<string>,
): AppLocale | undefined {
  const normalized = tag.trim().toLowerCase();
  if (allowedLocales.has(normalized)) {
    return normalized as AppLocale;
  }

  const primary = normalized.split("-")[0];
  if (allowedLocales.has(primary)) {
    return primary as AppLocale;
  }

  return undefined;
}

function parseLanguageTags(
  languageTags: string | readonly string[] | null | undefined,
): string[] {
  if (typeof languageTags === "string") {
    return languageTags
      .split(",")
      .map((part) => part.split(";")[0]?.trim())
      .filter((tag): tag is string => Boolean(tag));
  }

  return [...(languageTags ?? [])];
}

/**
 * Maps Accept-Language or navigator.languages to a supported app locale.
 */
export function matchLocaleFromLanguageTags(
  languageTags: string | readonly string[] | null | undefined,
  defaultLocale: AppLocale = routing.defaultLocale,
  allowedLocales: readonly AppLocale[] = routing.locales,
): AppLocale {
  const allowed = new Set<string>(allowedLocales);

  for (const tag of parseLanguageTags(languageTags)) {
    const matched = resolveLanguageTag(tag, allowed);
    if (matched) {
      return matched;
    }
  }

  return defaultLocale;
}
