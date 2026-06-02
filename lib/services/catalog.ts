import type { AppLocale } from "@/i18n/routing";
import type { ServicesCatalog } from "@/lib/types/services";
import { localizeServicesCatalog } from "@/lib/services/locale-copy/apply-catalog-locale";
import { getStaticTreatmentConcerns } from "@/lib/services/static-treatment-concerns";
import { getStaticTreatmentsHubCopy } from "@/lib/services/treatments-hub-copy";

import { aestheticInjectionsCategory } from "@/lib/services/categories/aesthetic-injections";
import { aestheticTreatmentsCategory } from "@/lib/services/categories/aesthetic-treatments";
import { advancedAestheticTreatmentsCategory } from "@/lib/services/categories/advanced-aesthetic-treatments";
import { antiAgeCategory } from "@/lib/services/categories/anti-age";
import { bloodTestsCategory } from "@/lib/services/categories/blood-tests";
import { bodySlimmingCategory } from "@/lib/services/categories/body-slimming";
import { cosmetologyCategory } from "@/lib/services/categories/cosmetology";
import { laserHairRemovalCategory } from "@/lib/services/categories/laser-hair-removal";
import { vitaminShotsCategory } from "@/lib/services/categories/vitamin-shots";

const staticServiceCategories = [
    cosmetologyCategory,
    bodySlimmingCategory,
    antiAgeCategory,
    vitaminShotsCategory,
    bloodTestsCategory,
    aestheticTreatmentsCategory,
    aestheticInjectionsCategory,
    advancedAestheticTreatmentsCategory,
    laserHairRemovalCategory,
];

/** Static catalog for a locale (seed source + Sanity fallback). */
export function buildStaticServicesCatalog(locale: AppLocale): ServicesCatalog {
  const hubUi = getStaticTreatmentsHubCopy(locale);

  return localizeServicesCatalog(
    {
      id: "treatments",
      title: hubUi.pageTitle,
      description: hubUi.pageDescription,
      categories: staticServiceCategories,
      concerns: getStaticTreatmentConcerns(locale),
      hubUi,
    },
    locale,
  );
}

/** English static catalog — used for generateStaticParams and seed. */
export const servicesCatalog = buildStaticServicesCatalog("en");
