import type { AppLocale } from "@/i18n/routing";
import { getSanityClient } from "@/lib/sanity/client";
import {
  SANITY_CACHE_TAG,
  SANITY_REVALIDATE_SECONDS,
} from "@/lib/sanity/cache-tags";
import type { SanityLandingPageLike } from "@/lib/sanity/mappers/landing";
import { landingPageQuery } from "@/lib/sanity/queries/landing";

export async function fetchLandingPage(
  locale: AppLocale,
): Promise<SanityLandingPageLike | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    return await client.fetch<SanityLandingPageLike | null>(
      landingPageQuery,
      { locale },
      {
        next: {
          revalidate: SANITY_REVALIDATE_SECONDS,
          tags: [SANITY_CACHE_TAG.all, SANITY_CACHE_TAG.landing(locale)],
        },
      },
    );
  } catch {
    return null;
  }
}
