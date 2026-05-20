import type { SanityClient } from "@sanity/client";
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";

const uploadCache = new Map<string, string>();

/**
 * Uploads a file from `/public` and returns the asset document id.
 * Returns undefined when the file is missing or upload fails.
 */
export async function uploadPublicImage(
  client: SanityClient,
  publicRelativePath: string,
): Promise<string | undefined> {
  const normalized = publicRelativePath.replace(/^\//, "");
  const cached = uploadCache.get(normalized);
  if (cached) return cached;

  const absolutePath = path.join(process.cwd(), "public", normalized);
  if (!existsSync(absolutePath)) return undefined;

  try {
    const asset = await client.assets.upload("image", createReadStream(absolutePath), {
      filename: path.basename(absolutePath),
    });
    uploadCache.set(normalized, asset._id);
    return asset._id;
  } catch {
    return undefined;
  }
}

export function imageRefFromAssetId(assetId: string, alt?: string) {
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: assetId },
    ...(alt ? { alt } : {}),
  };
}
