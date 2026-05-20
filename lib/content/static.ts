import type { AppLocale } from "@/i18n/routing";
import type { LandingContent } from "@/lib/types/content";

import { enLandingContent } from "./en";
import { ruLandingContent } from "./ru";
import { ukLandingContent } from "./uk";

const landingByLocale = {
  en: enLandingContent,
  uk: ukLandingContent,
  ru: ruLandingContent,
} satisfies Record<AppLocale, LandingContent>;

/** Static landing copy — mapper fallback and when Sanity is not configured. */
export function getStaticLandingContent(locale: AppLocale): LandingContent {
  return landingByLocale[locale] ?? landingByLocale.en;
}
