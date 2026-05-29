import type { AppLocale } from "@/i18n/routing";
import { getStaticLegalPage } from "@/lib/content/legal/en-pages";
import { isSanityConfigured } from "@/lib/sanity/env";
import { fetchLegalPage } from "@/lib/sanity/fetch/fetch-legal-page";
import { mapLegalPageSafe } from "@/lib/sanity/mappers/legal-page";
import type { LegalPageContent, LegalPageSlug } from "@/lib/types/legal";

export async function getLegalPageContent(
  locale: AppLocale,
  slug: LegalPageSlug,
): Promise<LegalPageContent> {
  const fallback = getStaticLegalPage(locale, slug);

  if (!isSanityConfigured()) {
    return fallback;
  }

  const raw = await fetchLegalPage(locale, slug);
  return mapLegalPageSafe(raw, fallback);
}
