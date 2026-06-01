import type { ProcedureHit } from "@/lib/services-goals";
import { getGoalRecommendations, isGoalSlug } from "@/lib/services-goals";
import { isStaticConcernSlug } from "@/lib/services/static-treatment-concerns";
import type { ServicesCatalog } from "@/lib/types/services";

export function isConcernSlug(value: string): boolean {
  return isStaticConcernSlug(value) || isGoalSlug(value);
}

/**
 * Procedures explicitly linked to a concern in Sanity (`concerns` references).
 * Falls back to keyword scoring when CMS links are missing (e.g. before seed).
 */
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

  if (hits.length > 0) {
    return hits.slice(0, limit);
  }

  if (isGoalSlug(concernSlug)) {
    return getGoalRecommendations(concernSlug, catalog, limit);
  }

  return [];
}

export function getConcernTitle(
  concernSlug: string,
  catalog: ServicesCatalog,
): string {
  const concern = catalog.concerns.find((c) => c.id === concernSlug);
  if (concern) return concern.title;
  if (isGoalSlug(concernSlug)) {
    const labels: Record<string, string> = {
      glow: "Glow",
      texture: "Texture",
      acne: "Acne control",
      pigmentation: "Pigmentation",
      firmness: "Firmness",
      hair: "Hair loss",
    };
    return labels[concernSlug] ?? concernSlug;
  }
  return concernSlug;
}
