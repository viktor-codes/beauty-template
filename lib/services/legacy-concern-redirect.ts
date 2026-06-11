import { CONCERNS_ROUTE_SEGMENT } from "@/lib/services/concern-path";

/** Legacy query keys from landing chips before path-based concern routes. */
const LEGACY_CONCERN_QUERY_KEYS = ["concern", "goal"] as const;

function isTreatmentsHubPath(pathname: string): boolean {
  if (pathname.includes(`/treatments/${CONCERNS_ROUTE_SEGMENT}/`)) return false;
  return pathname === "/treatments" || pathname.endsWith("/treatments");
}

function readLegacyConcernSlug(searchParams: URLSearchParams): string | null {
  for (const key of LEGACY_CONCERN_QUERY_KEYS) {
    const value = searchParams.get(key)?.trim();
    if (value) return value;
  }
  return null;
}

/**
 * Redirect `/treatments?concern=` / `?goal=` → `/treatments/concerns/{slug}`.
 * Runs in proxy so the hub page stays static (no `searchParams` in RSC).
 */
export function resolveLegacyConcernRedirectPath(
  pathname: string,
  searchParams: URLSearchParams,
): string | null {
  if (!isTreatmentsHubPath(pathname)) return null;

  const concernSlug = readLegacyConcernSlug(searchParams);
  if (!concernSlug) return null;

  const treatmentsIndex = pathname.lastIndexOf("/treatments");
  const prefix = treatmentsIndex >= 0 ? pathname.slice(0, treatmentsIndex) : "";
  return `${prefix}/treatments/${CONCERNS_ROUTE_SEGMENT}/${concernSlug}`;
}
