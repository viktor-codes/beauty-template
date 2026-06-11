import { buildHomepageCategoryPreviews } from "@/lib/services/category-previews";
import { buildLandingConcernChips } from "@/lib/services/concern-chips";
import type { LandingContent } from "@/lib/types/content";
import type { ServicesCatalog } from "@/lib/types/services";

/** Injects homepage category cards and concern chips from the services catalog. */
export function mergeLandingWithCatalog(
  landing: LandingContent,
  catalog: ServicesCatalog,
): LandingContent {
  const concernChips = buildLandingConcernChips(catalog);

  return {
    ...landing,
    services: {
      ...landing.services,
      categories: buildHomepageCategoryPreviews(catalog),
      goals: concernChips.length > 0 ? concernChips : landing.services.goals,
    },
  };
}
