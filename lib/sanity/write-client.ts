import { createClient, type SanityClient } from "@sanity/client";

import { getSanityEnv, isSanityConfigured } from "@/lib/sanity/env";

let writeClient: SanityClient | null = null;

/** Server-only Sanity client with Editor token for order documents. */
export function getSanityWriteClient(): SanityClient | null {
  const token = process.env.SANITY_API_WRITE_TOKEN?.trim();
  if (!token || !isSanityConfigured()) return null;

  const env = getSanityEnv();
  if (!env) return null;

  if (!writeClient) {
    writeClient = createClient({
      projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
      useCdn: false,
      token,
    });
  }

  return writeClient;
}
