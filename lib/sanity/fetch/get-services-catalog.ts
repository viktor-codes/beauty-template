import type { AppLocale } from "@/i18n/routing";
import { buildStaticServicesCatalog } from "@/lib/services/catalog";
import type { ServicesCatalog } from "@/lib/types/services";

/** Static catalog used as mapper fallback and when Sanity is not configured. */
export function getStaticServicesCatalog(locale: AppLocale): ServicesCatalog {
  return buildStaticServicesCatalog(locale);
}
