export type CurrencyCode = "EUR";

export interface Money {
  amount: number;
  currency: CurrencyCode;
}

export interface ServiceImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ServiceProcedure {
  id: string;
  title: string;
  description: string;
  image?: ServiceImage;
  price?: Money;
  /** Slugs of linked treatmentConcern documents (for hub filtering). */
  concernIds?: string[];
}

export interface TreatmentConcern {
  id: string;
  title: string;
  shortDescription?: string;
  image?: ServiceImage;
  href: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface TreatmentsHubUi {
  pageTitle: string;
  pageDescription: string;
  goalsSectionTitle: string;
  faqEyebrow: string;
  faqTitle: string;
  faqSubtitle: string;
  viewFullFaqLabel: string;
  recommendedForPrefix: string;
  viewDetailsLabel: string;
  breadcrumbHome: string;
  breadcrumbTreatments: string;
  backToAllCategoriesLabel: string;
  backToCategoryPrefix: string;
  concernCardFallbackDescription: string;
}

export interface ServiceSubcategory {
  id: string;
  title: string;
  description: string;
  image?: ServiceImage;
  procedures: ServiceProcedure[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  image?: ServiceImage;
  subcategories: ServiceSubcategory[];
  /** Lower numbers sort first among featured categories. */
  sortOrder?: number;
  /** Landing services grid (max 4 across catalog). */
  featuredOnHomepage?: boolean;
  /** Header treatments dropdown (max 5 across catalog). */
  featuredInNav?: boolean;
  /** Shorter label for header nav; falls back to `title` when unset. */
  shortTitle?: string;
}

export interface ServicesCatalog {
  id: string;
  /** H1 on /treatments — from treatmentsHub, not the catalog id label. */
  title: string;
  description: string;
  categories: ServiceCategory[];
  concerns: TreatmentConcern[];
  hubUi: TreatmentsHubUi;
}

