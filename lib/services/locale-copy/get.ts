import type { AppLocale } from "@/i18n/routing";
import type { ServiceLocaleCopy } from "@/lib/services/locale-copy/types";
import { serviceTreeLocaleCopyRu } from "@/lib/services/locale-copy/translations/ru";
import { serviceTreeLocaleCopyUk } from "@/lib/services/locale-copy/translations/uk";

const TREE_BY_LOCALE = {
  uk: serviceTreeLocaleCopyUk,
  ru: serviceTreeLocaleCopyRu,
} as const;

export function getCategoryLocaleCopyField(
  categoryId: string,
  locale: AppLocale,
): ServiceLocaleCopy | undefined {
  if (locale === "en") return undefined;
  return TREE_BY_LOCALE[locale].categories[categoryId];
}

export function getSubcategoryLocaleCopy(
  subcategoryId: string,
  locale: AppLocale,
): ServiceLocaleCopy | undefined {
  if (locale === "en") return undefined;
  return TREE_BY_LOCALE[locale].subcategories[subcategoryId];
}

export function getProcedureLocaleCopy(
  procedureId: string,
  locale: AppLocale,
): ServiceLocaleCopy | undefined {
  if (locale === "en") return undefined;
  return TREE_BY_LOCALE[locale].procedures[procedureId];
}
