import type { ProcedureHit } from "@/lib/services-goals";
import { buildProcedurePath } from "@/lib/services/procedure-path";
import type { ServicesCatalog } from "@/lib/types/services";

export interface GetConcernRecommendationsOptions {
  limit?: number;
}

/** Procedures linked to a concern in Sanity (`concerns` references on `serviceProcedure`). */
export function getConcernRecommendations(
  concernSlug: string,
  catalog: ServicesCatalog,
  options?: GetConcernRecommendationsOptions,
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
          href: buildProcedurePath({ category, subcategory, procedure }),
          score: 1,
        });
      });
    });
  });

  const { limit } = options ?? {};
  return limit !== undefined ? hits.slice(0, limit) : hits;
}
