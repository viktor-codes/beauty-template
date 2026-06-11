import type {
  ServiceCategory,
  ServiceProcedure,
  ServiceSubcategory,
} from "@/lib/types/services";

/** Categories that expose procedures at /treatments/{category}/{procedure}. */
export const FLAT_CATEGORY_IDS = new Set<string>([
  "blood-tests",
  "vitamin-shots",
  "laser-hair-removal",
]);

export function isFlatCategory(
  category: Pick<ServiceCategory, "id" | "isFlatCategory">,
): boolean {
  return category.isFlatCategory === true || FLAT_CATEGORY_IDS.has(category.id);
}

export interface CategoryProcedureEntry {
  subcategory: ServiceSubcategory;
  procedure: ServiceProcedure;
}

export function getCategoryProcedures(category: ServiceCategory): CategoryProcedureEntry[] {
  return category.subcategories.flatMap((subcategory) =>
    subcategory.procedures.map((procedure) => ({ subcategory, procedure })),
  );
}

export function findProcedureInCategory(
  category: ServiceCategory,
  procedureSlug: string,
): CategoryProcedureEntry | null {
  for (const entry of getCategoryProcedures(category)) {
    if (entry.procedure.id === procedureSlug) return entry;
  }
  return null;
}
