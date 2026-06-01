/**
 * Rewrites legacy `/services` and `#treatments` anchor links from CMS to `/treatments` catalog routes.
 */
export function normalizeLegacyServicesHref(href: string): string {
  return href
    .replace(/\/services(?=\/|\?|#|$)/g, "/treatments")
    .replace(/\/#treatments(?=$|[?#])/g, "/treatments")
    .replace(/^#treatments(?=$|[?#])/g, "/treatments")
    .replace(/#services(?=$|[?#])/g, "/treatments");
}
