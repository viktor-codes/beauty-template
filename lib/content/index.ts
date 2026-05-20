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

export function getLandingContent(locale: AppLocale): LandingContent {
  return landingByLocale[locale] ?? landingByLocale.en;
}

export { enLandingContent as content };
export type { LandingContent } from "@/lib/types/content";
