import type { Metadata } from "next";

import { routing, type AppLocale } from "@/i18n/routing";
import { SITE_NAME_FULL, SITE_OG_IMAGE } from "@/lib/site-metadata";
import { getSiteUrl } from "@/lib/site-url";

const SITE_OG_IMAGE_META = {
  url: SITE_OG_IMAGE,
  width: 1200,
  height: 630,
  alt: SITE_NAME_FULL,
} as const;

/** Ensures child `openGraph` overrides keep a default preview image for Google/social crawlers. */
export function buildOpenGraph(
  fields: NonNullable<Metadata["openGraph"]>,
  imageAlt: string = SITE_NAME_FULL,
): NonNullable<Metadata["openGraph"]> {
  return {
    ...fields,
    images: fields.images ?? [
      {
        ...SITE_OG_IMAGE_META,
        alt: imageAlt,
      },
    ],
  };
}

export function buildDefaultTwitterCard(
  fields: NonNullable<Metadata["twitter"]> = {},
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    ...fields,
    images: fields.images ?? [SITE_OG_IMAGE],
  };
}

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
