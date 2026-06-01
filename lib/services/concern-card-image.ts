import { deviceImage, injectionImage, laserImage, peelImage } from "@/lib/services/helpers";
import type { StaticConcernSlug } from "@/lib/services/static-treatment-concerns";
import type { ServiceImage, TreatmentConcern } from "@/lib/types/services";

const CONCERN_FALLBACK_IMAGES: Record<StaticConcernSlug, ServiceImage> = {
  glow: peelImage,
  texture: peelImage,
  acne: peelImage,
  pigmentation: deviceImage,
  firmness: injectionImage,
  hair: laserImage,
};

function isStaticConcernSlug(id: string): id is StaticConcernSlug {
  return id in CONCERN_FALLBACK_IMAGES;
}

/** CMS image when uploaded; otherwise a stable dev fallback per concern slug. */
export function resolveConcernCardImage(concern: TreatmentConcern): ServiceImage {
  if (concern.image) return concern.image;
  if (isStaticConcernSlug(concern.id)) {
    const fallback = CONCERN_FALLBACK_IMAGES[concern.id];
    return { ...fallback, alt: concern.title };
  }
  return { ...peelImage, alt: concern.title };
}
