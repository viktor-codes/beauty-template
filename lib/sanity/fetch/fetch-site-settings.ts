import type { AppLocale } from "@/i18n/routing";
import { getSanityClient } from "@/lib/sanity/client";
import type { SanitySiteSettingsLike } from "@/lib/sanity/mappers/site-settings";
import { siteSettingsQuery } from "@/lib/sanity/queries/site-settings";

const REVALIDATE_SECONDS = 60;

export async function fetchSiteSettings(
  locale: AppLocale,
): Promise<SanitySiteSettingsLike | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    return await client.fetch<SanitySiteSettingsLike | null>(
      siteSettingsQuery,
      { locale },
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
  } catch {
    return null;
  }
}
