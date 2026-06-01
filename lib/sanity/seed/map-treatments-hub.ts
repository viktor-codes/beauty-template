import { getStaticTreatmentsHubCopy } from "@/lib/services/treatments-hub-copy";
import { toLocaleStringI18n, toLocaleTextI18n } from "@/lib/sanity/seed/to-locale-fields";

type SanitySeedDoc = Record<string, unknown> & { _id: string; _type: string };

export function buildTreatmentsHubDocument(): SanitySeedDoc {
  const en = getStaticTreatmentsHubCopy("en");
  const uk = getStaticTreatmentsHubCopy("uk");
  const ru = getStaticTreatmentsHubCopy("ru");

  return {
    _id: "treatmentsHub",
    _type: "treatmentsHub",
    hubTitle: toLocaleStringI18n(en.pageTitle, uk.pageTitle, ru.pageTitle),
    hubDescription: toLocaleTextI18n(en.pageDescription, uk.pageDescription, ru.pageDescription),
    goalsSectionTitle: toLocaleStringI18n(
      en.goalsSectionTitle,
      uk.goalsSectionTitle,
      ru.goalsSectionTitle,
    ),
    faqEyebrow: toLocaleStringI18n(en.faqEyebrow, uk.faqEyebrow, ru.faqEyebrow),
    faqTitle: toLocaleStringI18n(en.faqTitle, uk.faqTitle, ru.faqTitle),
    faqSubtitle: toLocaleTextI18n(en.faqSubtitle, uk.faqSubtitle, ru.faqSubtitle),
    viewFullFaqLabel: toLocaleStringI18n(
      en.viewFullFaqLabel,
      uk.viewFullFaqLabel,
      ru.viewFullFaqLabel,
    ),
  };
}
