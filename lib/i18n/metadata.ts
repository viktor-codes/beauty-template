import type { Metadata } from "next";

import { routing, type AppLocale } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-url";

const OPEN_GRAPH_LOCALE: Record<AppLocale, string> = {
  en: "en_US",
  uk: "uk_UA",
  ru: "ru_RU",
};

function buildLocalizedPath(locale: AppLocale, pathname: string): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (locale === routing.defaultLocale) {
    return normalizedPath === "/" ? "/" : normalizedPath;
  }
  return normalizedPath === "/"
    ? `/${locale}`
    : `/${locale}${normalizedPath}`;
}

export function getOpenGraphLocale(locale: AppLocale): string {
  return OPEN_GRAPH_LOCALE[locale];
}

export function buildLanguageAlternates(
  pathname: string,
  currentLocale: AppLocale = routing.defaultLocale,
): Metadata["alternates"] {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return undefined;

  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${siteUrl}${buildLocalizedPath(locale, pathname)}`;
  }
  languages["x-default"] = `${siteUrl}${buildLocalizedPath(routing.defaultLocale, pathname)}`;

  return {
    canonical: `${siteUrl}${buildLocalizedPath(currentLocale, pathname)}`,
    languages,
  };
}
