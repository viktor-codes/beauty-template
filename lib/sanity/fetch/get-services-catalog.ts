import type { AppLocale } from "@/i18n/routing";
import { servicesCatalog } from "@/lib/services/catalog";
import type { ServicesCatalog } from "@/lib/types/services";

/** Static catalog used as mapper fallback and when Sanity is not configured. */
export function getStaticServicesCatalog(_locale: AppLocale): ServicesCatalog {
  return servicesCatalog;
}
