import type { ProcedureHit } from "@/lib/services-goals";
import type { ServicesCatalog } from "@/lib/types/services";

/** Procedures linked to a concern in Sanity (`concerns` references on `serviceProcedure`). */
export function getConcernRecommendations(
  concernSlug: string,
  catalog: ServicesCatalog,
  limit = 10,
): ProcedureHit[] {
  const hits: ProcedureHit[] = [];

  catalog.categories.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      subcategory.procedures.forEach((procedure) => {
        if (!procedure.concernIds?.includes(concernSlug)) return;

        hits.push({
          category,
          subcategory,
          procedure,
          href: `/treatments/${category.id}/${subcategory.id}/${procedure.id}`,
          score: 1,
        });
      });
    });
  });

  return hits.slice(0, limit);
}

export function getConcernTitle(concernSlug: string, catalog: ServicesCatalog): string {
  const concern = catalog.concerns.find((c) => c.id === concernSlug);
  return concern?.title ?? concernSlug;
}
