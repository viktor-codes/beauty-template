/** Whether a nav href points at the contact section (excluded from header nav when CTA covers it). */
export function isContactNavHref(href: string): boolean {
  const normalized = href.trim().toLowerCase();
  return normalized === "#contact" || normalized === "/#contact";
}
