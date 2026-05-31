/**
 * Rewrites legacy `/services` paths from older CMS data to current `/treatments` routes.
 */
export function normalizeLegacyServicesHref(href: string): string {
  return href
    .replace(/\/services(?=\/|\?|#|$)/g, "/treatments")
    .replace(/#services(?=$|[?#])/g, "#treatments");
}
