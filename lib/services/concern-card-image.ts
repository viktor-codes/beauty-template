import type { StaticConcernSlug } from "@/lib/services/static-treatment-concerns";
import type { ServiceImage, TreatmentConcern } from "@/lib/types/services";

const CONCERN_IMAGE_DIR = "/concerns";
const DEFAULT_IMAGE_SIZE = { width: 1200, height: 800 } as const;

const CONCERN_IMAGE_FILENAMES: Record<StaticConcernSlug, string> = {
  glow: "glow.webp",
  texture: "texture.webp",
  acne: "acne.webp",
  pigmentation: "pigmentation.webp",
  firmness: "elasticy.webp",
  hair: "hairloss.webp",
};

function concernAsset(filename: string, alt: string): ServiceImage {
  return {
    src: `${CONCERN_IMAGE_DIR}/${filename}`,
    alt,
    ...DEFAULT_IMAGE_SIZE,
  };
}

function isStaticConcernSlug(id: string): id is StaticConcernSlug {
  return id in CONCERN_IMAGE_FILENAMES;
}

/** CMS image when uploaded; otherwise a stable dev fallback per concern slug. */
export function resolveConcernCardImage(concern: TreatmentConcern): ServiceImage {
  if (concern.image) return concern.image;
  if (isStaticConcernSlug(concern.id)) {
    const filename = CONCERN_IMAGE_FILENAMES[concern.id];
    return concernAsset(filename, concern.title);
  }
  return concernAsset("glow.webp", concern.title);
}
