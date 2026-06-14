import type { ServiceProcedure, ServicesCatalog } from "@/lib/types/services";

export interface ProcedureCatalogPlacement {
  categorySlug: string;
  subcategorySlug: string;
  subcategoryDocumentId: string;
  sortOrder: number;
  procedure: ServiceProcedure;
}

export function subcategoryDocumentId(categorySlug: string, subcategorySlug: string): string {
  return `serviceSubcategory-${categorySlug}-${subcategorySlug}`;
}

export function procedureDocumentId(procedureSlug: string): string {
  return `serviceProcedure-${procedureSlug}`;
}

/** All catalog placements for each procedure slug (supports duplicate static tree rows). */
export function collectProcedureListingIndex(
  catalog: ServicesCatalog,
): Map<string, ProcedureCatalogPlacement[]> {
  const index = new Map<string, ProcedureCatalogPlacement[]>();

  for (const category of catalog.categories) {
    for (const subcategory of category.subcategories) {
      subcategory.procedures.forEach((procedure, sortOrder) => {
        const placement: ProcedureCatalogPlacement = {
          categorySlug: category.id,
          subcategorySlug: subcategory.id,
          subcategoryDocumentId: subcategoryDocumentId(category.id, subcategory.id),
          sortOrder,
          procedure,
        };

        const placements = index.get(procedure.id) ?? [];
        placements.push(placement);
        index.set(procedure.id, placements);
      });
    }
  }

  return index;
}
