import type { AppLocale } from "@/i18n/routing";
import type { ServiceLocaleCopy } from "@/lib/services/locale-copy/types";

/**
 * Uses locale-copy when CMS still has the English fallback text (pre-reseed or empty uk/ru).
 * Keeps intentional CMS overrides when the value differs from the English static string.
 */
export function resolveServiceLocalizedField(
  resolved: string,
  locale: AppLocale,
  enFallback: string,
  copy: ServiceLocaleCopy | undefined,
  pick: (entry: ServiceLocaleCopy) => string | undefined,
): string {
  if (locale === "en") return resolved.trim() || enFallback;

  const fromCopy = copy ? pick(copy)?.trim() : undefined;
  if (!fromCopy) return resolved.trim() || enFallback;

  const current = resolved.trim();
  const en = enFallback.trim();
  if (!current || current === en) return fromCopy;

  return current;
}
