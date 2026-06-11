import type { ServicesGoalPreview } from "@/lib/types/content";
import type { ServicesCatalog } from "@/lib/types/services";

function compareBySortOrder(
  a: { sortOrder?: number; title: string },
  b: { sortOrder?: number; title: string },
): number {
  const orderDiff = (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
  if (orderDiff !== 0) return orderDiff;
  return a.title.localeCompare(b.title);
}

/** Active treatment concerns as landing chips — same source as /treatments hub. */
export function buildLandingConcernChips(catalog: ServicesCatalog): ServicesGoalPreview[] {
  return catalog.concerns
    .filter((concern) => concern.isActive !== false)
    .sort(compareBySortOrder)
    .map((concern) => ({
      id: concern.id,
      title: concern.title,
      href: concern.href,
    }));
}
