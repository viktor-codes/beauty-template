import { routing, type AppLocale } from "@/i18n/routing";
import { getSiteUrl, toAbsoluteUrl } from "@/lib/site-url";

/** Path with locale prefix (next-intl `as-needed` — default locale has no prefix). */
export function buildLocalizedPath(locale: AppLocale, pathname: string): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (locale === routing.defaultLocale) {
    return normalizedPath;
  }
  return `/${locale}${normalizedPath}`;
}

export function buildLocalizedAbsoluteUrl(
  locale: AppLocale,
  pathname: string,
): string {
  return toAbsoluteUrl(buildLocalizedPath(locale, pathname));
}

export function resolveSiteOrigin(): string {
  return getSiteUrl();
}
