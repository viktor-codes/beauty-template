/** Localized title + optional description for a catalog node (category / subcategory / procedure). */
export interface ServiceLocaleCopy {
  title: string;
  description?: string;
}

export type ServiceLocaleCopyMap = Record<string, ServiceLocaleCopy>;

export interface ServiceTreeLocaleCopy {
  categories: ServiceLocaleCopyMap;
  subcategories: ServiceLocaleCopyMap;
  procedures: ServiceLocaleCopyMap;
}
