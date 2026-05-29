import type { AppLocale } from "@/i18n/routing";
import { getSanityClient } from "@/lib/sanity/client";
import {
  SANITY_CACHE_TAG,
  SANITY_REVALIDATE_SECONDS,
} from "@/lib/sanity/cache-tags";
import type { SanityLegalPageLike } from "@/lib/sanity/mappers/legal-page";
import { legalPageQuery } from "@/lib/sanity/queries/legal-page";
import type { LegalPageSlug } from "@/lib/types/legal";

export async function fetchLegalPage(
  locale: AppLocale,
  slug: LegalPageSlug,
): Promise<SanityLegalPageLike | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    return await client.fetch<SanityLegalPageLike | null>(
      legalPageQuery,
      { locale, slug },
      {
        next: {
          revalidate: SANITY_REVALIDATE_SECONDS,
          tags: [
            SANITY_CACHE_TAG.all,
            SANITY_CACHE_TAG.legal(locale, slug),
          ],
        },
      },
    );
  } catch {
    return null;
  }
}
