import type { AppLocale } from "@/i18n/routing";
import { getStaticLandingContent } from "@/lib/sanity/fetch/get-landing-content";
import type { LandingContent } from "@/lib/types/content";

import { mapHeroSafe, type SanityImageLike } from "@/lib/sanity/mappers/safe";
import type { LocaleFieldValues } from "@/lib/i18n/pick-locale-field";

/**
 * Document i18n: one `landingPage` per locale — fields are plain strings, not localeString.
 * Extend section-by-section during Phase 3 migration.
 */
export interface SanityLandingPageLike {
  hero?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
    image?: SanityImageLike | null;
  } | null;
}

/**
 * Maps a localized landing document into LandingContent.
 * Unmapped sections stay on static fallback until their CMS migration lands.
 */
export function mapLandingPageSafe(
  raw: SanityLandingPageLike | null | undefined,
  locale: AppLocale,
): LandingContent {
  const fallback = getStaticLandingContent(locale);

  if (!raw) return fallback;

  return {
    ...fallback,
    hero: mapHeroSafe(raw.hero, locale, fallback.hero),
  };
}
