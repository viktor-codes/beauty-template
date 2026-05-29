import type { AppLocale } from "@/i18n/routing";
import { getSanityClient } from "@/lib/sanity/client";
import {
  SANITY_CACHE_TAG,
  SANITY_REVALIDATE_SECONDS,
} from "@/lib/sanity/cache-tags";
import type { SanitySiteSettingsLike } from "@/lib/sanity/mappers/site-settings";
import { siteSettingsQuery } from "@/lib/sanity/queries/site-settings";

export async function fetchSiteSettings(
  locale: AppLocale,
): Promise<SanitySiteSettingsLike | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    return await client.fetch<SanitySiteSettingsLike | null>(
      siteSettingsQuery,
      { locale },
      {
        next: {
          revalidate: SANITY_REVALIDATE_SECONDS,
          tags: [SANITY_CACHE_TAG.all, SANITY_CACHE_TAG.siteSettings(locale)],
        },
      },
    );
  } catch {
    return null;
  }
}
