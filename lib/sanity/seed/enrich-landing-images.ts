import type { SanityClient } from "@sanity/client";

import type { LandingContent } from "@/lib/types/content";
import { mapLandingContentToSanityDocument } from "@/lib/sanity/seed/map-landing-document";
import { imageRefFromAssetId, uploadPublicImage } from "@/lib/sanity/seed/upload-asset";
import type { AppLocale } from "@/i18n/routing";

/** Attaches uploaded brand logo assets from `/public/logos` to each landing document. */
export async function enrichLandingDocumentWithImages(
  client: SanityClient,
  locale: AppLocale,
  content: LandingContent,
) {
  const doc = mapLandingContentToSanityDocument(locale, content) as Record<string, unknown>;

  const about = doc.about as Record<string, unknown> | undefined;
  if (!about || content.about.brandLogos.length === 0) {
    return doc as ReturnType<typeof mapLandingContentToSanityDocument>;
  }

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

  const uploaded = brandLogos.filter(
    (entry): entry is NonNullable<typeof entry> => entry !== null,
  );

  if (uploaded.length > 0) {
    doc.about = { ...about, brandLogos: uploaded };
  }

  return doc as ReturnType<typeof mapLandingContentToSanityDocument>;
}
