import type { Money, ServiceImage, ServiceProcedure } from "@/lib/types/services";

const CATEGORY_IMAGE_DIR = "/categories";
const DEFAULT_IMAGE_SIZE = { width: 1200, height: 800 } as const;

function categoryAsset(filename: string, alt: string): ServiceImage {
  return {
    src: `${CATEGORY_IMAGE_DIR}/${filename}`,
    alt,
    ...DEFAULT_IMAGE_SIZE,
  };
}

/** Shared visuals for subcategories and treatment-type fallbacks. */
export const injectionImage = categoryAsset(
  "injection.webp",
  "Clean clinical aesthetic setting for injectables",
);
export const peelImage = categoryAsset(
  "peel.webp",
  "Skincare products and towels in a calm setting",
);
export const deviceImage = categoryAsset(
  "device.webp",
  "Modern aesthetic device in a minimal clinic",
);
export const laserImage = categoryAsset(
  "laser.webp",
  "Laser treatment room with soft neutral tones",
);

/** Top-level service category card images (slug-aligned filenames). */
export const cosmetologyCategoryImage = categoryAsset(
  "cosmetology.webp",
  "Cosmetology treatments in a calm clinical setting",
);
export const bodySlimmingCategoryImage = categoryAsset(
  "body-slimming.webp",
  "Body contouring and slimming treatment",
);
export const vitaminShotsCategoryImage = categoryAsset(
  "vitamin-shots.webp",
  "Vitamin injection wellness support",
);
export const bloodTestsCategoryImage = categoryAsset(
  "blood-test.webp",
  "Laboratory blood testing for personalised care",
);

export function eur(amount: number): Money {
  return { amount, currency: "EUR" };
}

export function proc(
  id: string,
  title: string,
  description: string,
  amount: number,
): ServiceProcedure {
  return {
    id,
    title,
    description,
    price: eur(amount),
  };
}
