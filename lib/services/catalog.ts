import type { AppLocale } from "@/i18n/routing";
import type { ServicesCatalog } from "@/lib/types/services";
import { localizeServicesCatalog } from "@/lib/services/locale-copy/apply-catalog-locale";
import { finalizeStaticServicesCatalog } from "@/lib/services/procedure-additional-listings";
import { getStaticTreatmentConcerns } from "@/lib/services/static-treatment-concerns";
import { getStaticTreatmentsHubCopy } from "@/lib/services/treatments-hub-copy";

import { aestheticInjectionsCategory } from "@/lib/services/categories/aesthetic-injections";
import { aestheticTreatmentsCategory } from "@/lib/services/categories/aesthetic-treatments";
import { advancedAestheticTreatmentsCategory } from "@/lib/services/categories/advanced-aesthetic-treatments";
import { bloodTestsCategory } from "@/lib/services/categories/blood-tests";
import { bodyTreatmentCategory } from "@/lib/services/categories/body-treatment";
import { cosmetologyCategory } from "@/lib/services/categories/cosmetology";
import { laserHairRemovalCategory } from "@/lib/services/categories/laser-hair-removal";
import { vitaminShotsCategory } from "@/lib/services/categories/vitamin-shots";

const staticServiceCategories = [
    cosmetologyCategory,
    bodyTreatmentCategory,
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

  return finalizeStaticServicesCatalog(
    localizeServicesCatalog(
      {
        id: "treatments",
        title: hubUi.pageTitle,
        description: hubUi.pageDescription,
        categories: staticServiceCategories,
        concerns: getStaticTreatmentConcerns(locale),
        hubUi,
      },
      locale,
    ),
  );
}

/** English static catalog — used for generateStaticParams and seed. */
export const servicesCatalog = buildStaticServicesCatalog("en");
