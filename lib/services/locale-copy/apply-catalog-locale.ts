import type { AppLocale } from "@/i18n/routing";
import {
  getCategoryLocaleCopyField,
  getProcedureLocaleCopy,
  getSubcategoryLocaleCopy,
} from "@/lib/services/locale-copy/get";
import type {
  ServiceCategory,
  ServiceProcedure,
  ServicesCatalog,
  ServiceSubcategory,
} from "@/lib/types/services";

function localizeProcedure(procedure: ServiceProcedure, locale: AppLocale): ServiceProcedure {
  const copy = getProcedureLocaleCopy(procedure.id, locale);
  if (!copy) return procedure;

  return {
    ...procedure,
    title: copy.title,
    description: copy.description ?? procedure.description,
  };
}

function localizeSubcategory(subcategory: ServiceSubcategory, locale: AppLocale): ServiceSubcategory {
  const copy = getSubcategoryLocaleCopy(subcategory.id, locale);

  return {
    ...subcategory,
    title: copy?.title ?? subcategory.title,
    description: copy?.description ?? subcategory.description,
    procedures: subcategory.procedures.map((p) => localizeProcedure(p, locale)),
  };
}

function localizeCategory(category: ServiceCategory, locale: AppLocale): ServiceCategory {
  const copy = getCategoryLocaleCopyField(category.id, locale);

  return {
    ...category,
    title: copy?.title ?? category.title,
    description: copy?.description ?? category.description,
    subcategories: category.subcategories.map((s) => localizeSubcategory(s, locale)),
  };
}

/** Applies UK/RU copy to an English services catalog (runtime + static fallback). */
export function localizeServicesCatalog(
  catalog: ServicesCatalog,
  locale: AppLocale,
): ServicesCatalog {
  if (locale === "en") return catalog;

  return {
    ...catalog,
    categories: catalog.categories.map((c) => localizeCategory(c, locale)),
  };
}
