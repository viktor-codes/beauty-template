import type { AppLocale } from "@/i18n/routing";
import { getStaticLandingContent } from "@/lib/content/static";
import { isSanityConfigured } from "@/lib/sanity/env";
import { fetchLandingPage } from "@/lib/sanity/fetch/fetch-landing-page";
import { mapLandingPageSafe } from "@/lib/sanity/mappers/landing";
import type { LandingContent } from "@/lib/types/content";

export async function getLandingContent(locale: AppLocale): Promise<LandingContent> {
  if (!isSanityConfigured()) {
    return getStaticLandingContent(locale);
  }

  const raw = await fetchLandingPage(locale);
  return mapLandingPageSafe(raw, locale);
}

export { getStaticLandingContent } from "@/lib/content/static";
export { enLandingContent as content } from "./en";
export type { LandingContent } from "@/lib/types/content";
