import type { AppLocale } from "@/i18n/routing";
import { mergeLandingWithCatalog } from "@/lib/content/merge-landing-catalog";
import { getStaticLandingContent } from "@/lib/content/static";
import { isSanityConfigured } from "@/lib/sanity/env";
import { fetchLandingPage } from "@/lib/sanity/fetch/fetch-landing-page";
import { fetchSiteSettings } from "@/lib/sanity/fetch/fetch-site-settings";
import { mapLandingPageSafe } from "@/lib/sanity/mappers/landing";
import { resolveServicesCatalog } from "@/lib/services";
import type { LandingContent } from "@/lib/types/content";

export async function getLandingContent(locale: AppLocale): Promise<LandingContent> {
  const catalog = await resolveServicesCatalog(locale);

  if (!isSanityConfigured()) {
    return mergeLandingWithCatalog(getStaticLandingContent(locale), catalog);
  }

  const [raw, settings] = await Promise.all([
    fetchLandingPage(locale),
    fetchSiteSettings(locale),
  ]);

  return mergeLandingWithCatalog(mapLandingPageSafe(raw, locale, settings), catalog);
}

export { getStaticLandingContent } from "@/lib/content/static";
export { enLandingContent as content } from "./en";
export type { LandingContent } from "@/lib/types/content";
