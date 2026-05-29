import type { AppLocale } from "@/i18n/routing";

/** Next.js fetch cache tags for on-demand revalidation (Sanity webhook). */
export const SANITY_CACHE_TAG = {
  all: "sanity:all",
  landing: (locale: AppLocale) => `sanity:landing:${locale}`,
  siteSettings: (locale: AppLocale) => `sanity:site-settings:${locale}`,
  servicesCatalog: "sanity:services-catalog",
} as const;

/** Fallback TTL when webhook delivery fails. */
export const SANITY_REVALIDATE_SECONDS = 3600;
