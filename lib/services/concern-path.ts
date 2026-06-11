/** Canonical path segment for treatment concern pages (parallel to category slugs). */
export const CONCERNS_ROUTE_SEGMENT = "concerns" as const;

export function buildConcernPath(concernSlug: string): `/treatments/${typeof CONCERNS_ROUTE_SEGMENT}/${string}` {
  return `/treatments/${CONCERNS_ROUTE_SEGMENT}/${concernSlug}`;
}
