import { landingPage } from "./documents/landing-page";
import { serviceCategory } from "./documents/service-category";
import { serviceProcedure } from "./documents/service-procedure";
import { serviceSubcategory } from "./documents/service-subcategory";
import { siteSettings } from "./documents/site-settings";
import { localeString, localeText } from "./objects/locale-string";
import { serviceImage } from "./objects/service-image";

export const schemaTypes = [
  localeString,
  localeText,
  serviceImage,
  serviceCategory,
  serviceSubcategory,
  serviceProcedure,
  landingPage,
  siteSettings,
];
