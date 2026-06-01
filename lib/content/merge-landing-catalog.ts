import { buildHomepageCategoryPreviews } from "@/lib/services/category-previews";
import type { LandingContent } from "@/lib/types/content";
import type { ServicesCatalog } from "@/lib/types/services";

/** Injects homepage category cards from the services catalog (featuredOnHomepage). */
export function mergeLandingWithCatalog(
  landing: LandingContent,
  catalog: ServicesCatalog,
): LandingContent {
  return {
    ...landing,
    services: {
      ...landing.services,
      categories: buildHomepageCategoryPreviews(catalog),
    },
  };
}
