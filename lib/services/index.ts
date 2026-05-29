import type { AppLocale } from "@/i18n/routing";
import { fetchServicesCatalog } from "@/lib/sanity/fetch/fetch-services-catalog";
import { mapServicesCatalogSafe } from "@/lib/sanity/mappers/services";
import type { ServicesCatalog } from "@/lib/types/services";

import { servicesCatalog } from "@/lib/services/catalog";

export { servicesCatalog };

export function getServicesCategory(slug: string) {
  return servicesCatalog.categories.find((c) => c.id === slug) ?? null;
}

export function getServicesSubcategory(categorySlug: string, subcategorySlug: string) {
  const category = getServicesCategory(categorySlug);
  if (!category) return null;
  return category.subcategories.find((s) => s.id === subcategorySlug) ?? null;
}

export function getServicesProcedure(
  categorySlug: string,
  subcategorySlug: string,
  procedureSlug: string,
) {
  const subcategory = getServicesSubcategory(categorySlug, subcategorySlug);
  if (!subcategory) return null;
  return subcategory.procedures.find((p) => p.id === procedureSlug) ?? null;
}

/** Static catalog — seed source and fallback when Sanity is unavailable. */
export function getStaticServicesCatalog(_locale: AppLocale): ServicesCatalog {
  return servicesCatalog;
}

/** Resolves catalog from Sanity with static fallback (client-editable in Studio). */
export async function resolveServicesCatalog(locale: AppLocale): Promise<ServicesCatalog> {
  const raw = await fetchServicesCatalog();
  return mapServicesCatalogSafe(raw, locale);
}
