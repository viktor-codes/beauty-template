import type { AppLocale } from "@/i18n/routing";
import { getLandingContent } from "@/lib/content";
import type { LandingContent } from "@/lib/types/content";

/** Static landing copy used as mapper fallback and when Sanity is not configured. */
export function getStaticLandingContent(locale: AppLocale): LandingContent {
  return getLandingContent(locale);
}
