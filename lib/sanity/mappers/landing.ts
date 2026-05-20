import type { AppLocale } from "@/i18n/routing";
import { getStaticLandingContent } from "@/lib/sanity/fetch/get-landing-content";
import type { LandingContent } from "@/lib/types/content";

import {
  mapFooterSafe,
  mapNavSafe,
  type SanityFooterLike,
  type SanityNavLike,
} from "@/lib/sanity/mappers/chrome";
import { mapAboutSafe, type SanityAboutLike } from "@/lib/sanity/mappers/about";
import { mapFaqSafe, type SanityFaqLike } from "@/lib/sanity/mappers/faq";
import { mapGallerySafe, type SanityGalleryLike } from "@/lib/sanity/mappers/gallery";
import { mapReviewsSafe, type SanityReviewsLike } from "@/lib/sanity/mappers/reviews";
import type { SanitySiteSettingsLike } from "@/lib/sanity/mappers/site-settings";
import { mapHeroSafe } from "@/lib/sanity/mappers/safe";

/**
 * Document i18n: one `landingPage` per locale — fields are plain strings, not localeString.
 */
export interface SanityLandingPageLike {
  nav?: SanityNavLike | null;
  footer?: SanityFooterLike | null;
  hero?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
    primaryCtaHref?: string;
    secondaryCtaHref?: string;
  } | null;
  about?: SanityAboutLike | null;
  gallery?: SanityGalleryLike | null;
  reviews?: SanityReviewsLike | null;
  faq?: SanityFaqLike | null;
}

/**
 * Maps a localized landing document into LandingContent.
 * Unmapped sections stay on static fallback until their CMS migration lands.
 */
export function mapLandingPageSafe(
  raw: SanityLandingPageLike | null | undefined,
  locale: AppLocale,
  settings?: SanitySiteSettingsLike | null,
): LandingContent {
  const fallback = getStaticLandingContent(locale);

  if (!raw) return fallback;

  return {
    ...fallback,
    nav: mapNavSafe(raw.nav, fallback.nav),
    footer: mapFooterSafe(raw.footer, fallback.footer, settings),
    hero: mapHeroSafe(raw.hero, locale, fallback.hero),
    about: mapAboutSafe(raw.about, fallback.about),
    gallery: mapGallerySafe(raw.gallery, fallback.gallery, settings?.instagramUrl),
    reviews: mapReviewsSafe(raw.reviews, fallback.reviews),
    faq: mapFaqSafe(raw.faq, fallback.faq),
  };
}
