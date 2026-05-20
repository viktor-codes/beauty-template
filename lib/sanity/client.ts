import { createClient, type SanityClient } from "@sanity/client";

import { getSanityEnv, isSanityConfigured } from "@/lib/sanity/env";

let readClient: SanityClient | null = null;

/**
 * Server-side read client. Returns null when project/dataset env is missing.
 * useCdn: true in production for public published content.
 */
export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) return null;

  const env = getSanityEnv();
  if (!env) return null;

  if (!readClient) {
    readClient = createClient({
      projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
      useCdn: process.env.NODE_ENV === "production",
      token: env.SANITY_API_READ_TOKEN,
    });
  }

  return readClient;
}
