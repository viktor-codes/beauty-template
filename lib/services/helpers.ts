import type {
  Money,
  ServiceCategory,
  ServiceImage,
  ServiceProcedure,
  ServiceSubcategory,
} from "@/lib/types/services";

export const injectionImage: ServiceImage = {
  src: "/injection.webp",
  alt: "Clean clinical aesthetic setting for injectables",
  width: 1200,
  height: 800,
};

export const peelImage: ServiceImage = {
  src: "/peel.webp",
  alt: "Skincare products and towels in a calm setting",
  width: 1200,
  height: 800,
};

export const deviceImage: ServiceImage = {
  src: "/device.webp",
  alt: "Modern aesthetic device in a minimal clinic",
  width: 1200,
  height: 800,
};

export const laserImage: ServiceImage = {
  src: "/laser.webp",
  alt: "Laser treatment room with soft neutral tones",
  width: 1200,
  height: 800,
};

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

/** Deep-clone subcategories/procedures for duplicate Anti age listings. */
export function cloneSubcategory(sub: ServiceSubcategory): ServiceSubcategory {
  return {
    ...sub,
    procedures: sub.procedures.map((p) => ({ ...p, price: p.price ? { ...p.price } : undefined })),
  };
}

export function cloneSubcategories(
  category: ServiceCategory,
  subcategoryIds: string[],
): ServiceSubcategory[] {
  return subcategoryIds
    .map((id) => category.subcategories.find((s) => s.id === id))
    .filter((s): s is ServiceSubcategory => s !== undefined)
    .map(cloneSubcategory);
}

export function filterProcedures(
  sub: ServiceSubcategory,
  procedureIds: string[],
): ServiceSubcategory {
  return {
    ...sub,
    procedures: sub.procedures.filter((p) => procedureIds.includes(p.id)),
  };
}
