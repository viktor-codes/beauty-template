import type { SanityClient } from "@sanity/client";

import type { LandingContent } from "@/lib/types/content";
import { mapLandingContentToSanityDocument } from "@/lib/sanity/seed/map-landing-document";
import { imageRefFromAssetId, uploadPublicImage } from "@/lib/sanity/seed/upload-asset";
import type { AppLocale } from "@/i18n/routing";

/** Attaches uploaded brand logo assets to a landing document payload. */
export async function enrichLandingDocumentWithImages(
  client: SanityClient,
  locale: AppLocale,
  content: LandingContent,
) {
  const doc = mapLandingContentToSanityDocument(locale, content) as Record<string, unknown>;

  const about = doc.about as Record<string, unknown> | undefined;
  if (about && content.about.brandLogos.length > 0) {
    const brandLogos = await Promise.all(
      content.about.brandLogos.map(async (logo) => {
        const assetId = await uploadPublicImage(client, logo.src.replace(/^\//, ""));
        if (!assetId) return null;
        return {
          _type: "brandLogo" as const,
          alt: logo.alt,
          width: logo.width,
          height: logo.height,
          image: imageRefFromAssetId(assetId),
        };
      }),
    );
    const filtered = brandLogos.filter(Boolean);
    if (filtered.length > 0) {
      doc.about = { ...about, brandLogos: filtered };
    }
  }

  return doc as ReturnType<typeof mapLandingContentToSanityDocument>;
}
