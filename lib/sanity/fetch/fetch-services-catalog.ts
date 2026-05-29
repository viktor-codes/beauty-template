import { getSanityClient } from "@/lib/sanity/client";
import {
  SANITY_CACHE_TAG,
  SANITY_REVALIDATE_SECONDS,
} from "@/lib/sanity/cache-tags";
import type { SanityServicesCatalogLike } from "@/lib/sanity/mappers/services";
import { servicesCatalogQuery } from "@/lib/sanity/queries/services";

export async function fetchServicesCatalog(): Promise<SanityServicesCatalogLike | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    return await client.fetch<SanityServicesCatalogLike | null>(
      servicesCatalogQuery,
      {},
      {
        next: {
          revalidate: SANITY_REVALIDATE_SECONDS,
          tags: [SANITY_CACHE_TAG.all, SANITY_CACHE_TAG.servicesCatalog],
        },
      },
    );
  } catch {
    return null;
  }
}
