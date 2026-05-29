import type { AppLocale } from "@/i18n/routing";
import { getStaticLandingContent } from "@/lib/sanity/fetch/get-landing-content";
import type { LandingContent } from "@/lib/types/content";

import { mapAboutSafe, type SanityAboutLike } from "@/lib/sanity/mappers/about";
import { mapContactSafe, type SanityContactLike } from "@/lib/sanity/mappers/contact";
import {
  mapFooterSafe,
  mapNavSafe,
  type SanityFooterLike,
  type SanityNavLike,
} from "@/lib/sanity/mappers/chrome";
import { mapFaqSafe, type SanityFaqLike } from "@/lib/sanity/mappers/faq";
import { mapGallerySafe, type SanityGalleryLike } from "@/lib/sanity/mappers/gallery";
import { mapHeroSafe, type SanityHeroLike } from "@/lib/sanity/mappers/hero";
import {
  mapLandingServicesSafe,
  type SanityLandingServicesLike,
} from "@/lib/sanity/mappers/landing-services";
import { mapReviewsSafe, type SanityReviewsLike } from "@/lib/sanity/mappers/reviews";
import type { SanitySiteSettingsLike } from "@/lib/sanity/mappers/site-settings";

/** One `landingPage` document per locale (`language` from document i18n plugin). */
export interface SanityLandingPageLike {
  nav?: SanityNavLike | null;
  hero?: SanityHeroLike | null;
  about?: SanityAboutLike | null;
  services?: SanityLandingServicesLike | null;
  gallery?: SanityGalleryLike | null;
  reviews?: SanityReviewsLike | null;
  faq?: SanityFaqLike | null;
  contact?: SanityContactLike | null;
  footer?: SanityFooterLike | null;
}

/**
 * Maps CMS landing document → LandingContent.
 * Missing or invalid sections fall back to static locale files.
 */
export function mapLandingPageSafe(
  raw: SanityLandingPageLike | null | undefined,
  locale: AppLocale,
  settings?: SanitySiteSettingsLike | null,
): LandingContent {
  const fallback = getStaticLandingContent(locale);

  if (!raw) return fallback;

  return {
    nav: mapNavSafe(raw.nav, fallback.nav),
    hero: mapHeroSafe(raw.hero, fallback.hero),
    about: mapAboutSafe(raw.about, fallback.about),
    services: mapLandingServicesSafe(raw.services, fallback.services),
    gallery: mapGallerySafe(raw.gallery, fallback.gallery, settings?.instagramUrl),
    reviews: mapReviewsSafe(raw.reviews, fallback.reviews),
    faq: mapFaqSafe(raw.faq, fallback.faq),
    contact: mapContactSafe(raw.contact, fallback.contact, settings),
    footer: mapFooterSafe(raw.footer, fallback.footer, settings),
  };
}
