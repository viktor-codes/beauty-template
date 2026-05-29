import type { SanityClient } from "@sanity/client";

import { addMissingArrayKeys } from "@/lib/sanity/seed/add-array-keys";

type SeedDocument = Record<string, unknown> & { _id: string; _type: string };

const SEED_COMMIT_OPTIONS = { autoGenerateArrayKeys: true } as const;

export async function commitDocumentsInChunks(
  client: SanityClient,
  documents: SeedDocument[],
  chunkSize = 50,
): Promise<void> {
  if (documents.length === 0) return;

  for (let offset = 0; offset < documents.length; offset += chunkSize) {
    const slice = documents.slice(offset, offset + chunkSize);
    const tx = client.transaction();

    for (const doc of slice) {
      tx.createOrReplace(addMissingArrayKeys(doc));
    }

    await tx.commit(SEED_COMMIT_OPTIONS);
    console.log(`  → ${Math.min(offset + slice.length, documents.length)}/${documents.length}`);
  }
}
