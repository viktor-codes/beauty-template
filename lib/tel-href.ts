/**
 * Normalizes a display phone string for use in tel: links.
 */
export function toTelHref(phone: string): string {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/[^\d+]/g, "");
  return digits.length > 0 ? `tel:${digits}` : `tel:${trimmed}`;
}
