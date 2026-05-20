import type { AppLocale } from "@/i18n/routing";
import { getSanityClient } from "@/lib/sanity/client";
import type { SanityLandingPageLike } from "@/lib/sanity/mappers/landing";
import { landingPageQuery } from "@/lib/sanity/queries/landing";

const REVALIDATE_SECONDS = 60;

export async function fetchLandingPage(
  locale: AppLocale,
): Promise<SanityLandingPageLike | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    return await client.fetch<SanityLandingPageLike | null>(
      landingPageQuery,
      { locale },
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
  } catch {
    return null;
  }
}
