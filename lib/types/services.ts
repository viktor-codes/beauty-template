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
}

export interface ServicesCatalog {
  id: string;
  title: string;
  description: string;
  categories: ServiceCategory[];
}

