import { notFound } from "next/navigation";

import type { ServicesCatalog, ServiceCategory, ServiceSubcategory } from "@/lib/types/services";

export function findCategory(catalog: ServicesCatalog, categorySlug: string): ServiceCategory {
  const category = catalog.categories.find((c) => c.id === categorySlug) ?? null;
  if (!category) notFound();
  return category;
}

export function findSubcategory(
  catalog: ServicesCatalog,
  categorySlug: string,
  subcategorySlug: string,
): { category: ServiceCategory; subcategory: ServiceSubcategory } {
  const category = findCategory(catalog, categorySlug);
  const subcategory =
    category.subcategories.find((s) => s.id === subcategorySlug) ?? null;
  if (!subcategory) notFound();
  return { category, subcategory };
}

export function findProcedure(
  catalog: ServicesCatalog,
  categorySlug: string,
  subcategorySlug: string,
  procedureSlug: string,
) {
  const { category, subcategory } = findSubcategory(catalog, categorySlug, subcategorySlug);
  const procedure = subcategory.procedures.find((p) => p.id === procedureSlug) ?? null;
  if (!procedure) notFound();
  return { category, subcategory, procedure };
}
