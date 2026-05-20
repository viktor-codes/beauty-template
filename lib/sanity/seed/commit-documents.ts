import type { SanityClient } from "@sanity/client";

type SeedDocument = Record<string, unknown> & { _id: string; _type: string };

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
      tx.createOrReplace(doc);
    }

    await tx.commit();
    console.log(`  → ${Math.min(offset + slice.length, documents.length)}/${documents.length}`);
  }
}
