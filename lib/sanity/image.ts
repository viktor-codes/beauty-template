import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";

import { getSanityClient } from "@/lib/sanity/client";

/**
 * Builds a Sanity CDN image URL. Prefer GROQ `asset->url` when possible;
 * use this for transforms (width, height, format) on image references.
 */
export function urlFor(source: SanityImageSource) {
  const client = getSanityClient();
  if (!client) {
    throw new Error("Sanity client is not configured");
  }
  return imageUrlBuilder(client).image(source);
}
