import { getSanityClient } from "@/lib/sanity/client";
import type { SanityServicesCatalogLike } from "@/lib/sanity/mappers/services";
import { servicesCatalogQuery } from "@/lib/sanity/queries/services";

const REVALIDATE_SECONDS = 60;

export async function fetchServicesCatalog(): Promise<SanityServicesCatalogLike | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    return await client.fetch<SanityServicesCatalogLike | null>(
      servicesCatalogQuery,
      {},
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
  } catch {
    return null;
  }
}
