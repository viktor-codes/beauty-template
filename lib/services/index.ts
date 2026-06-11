import { cache } from "react";

import type { AppLocale } from "@/i18n/routing";
import { fetchServicesCatalog } from "@/lib/sanity/fetch/fetch-services-catalog";
import { mapServicesCatalogSafe } from "@/lib/sanity/mappers/services";
import type { ServicesCatalog } from "@/lib/types/services";

import { buildStaticServicesCatalog, servicesCatalog } from "@/lib/services/catalog";

export {
  buildHomepageCategoryPreviews,
  buildNavCategoryPreviews,
} from "@/lib/services/category-previews";

export { servicesCatalog };
export { buildTreatmentsBreadcrumbs } from "@/lib/services/treatments-breadcrumbs";
export { resolveConcernCardImage } from "@/lib/services/concern-card-image";
export { isFlatCategory, getCategoryProcedures } from "@/lib/services/flat-categories";
export { buildProcedurePath, buildLegacyProcedurePath } from "@/lib/services/procedure-path";

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
export function getStaticServicesCatalog(locale: AppLocale): ServicesCatalog {
  return buildStaticServicesCatalog(locale);
}

/** Resolves catalog from Sanity with static fallback (client-editable in Studio). */
export const resolveServicesCatalog = cache(
  async (locale: AppLocale): Promise<ServicesCatalog> => {
    const raw = await fetchServicesCatalog();
    return mapServicesCatalogSafe(raw, locale);
  },
);
