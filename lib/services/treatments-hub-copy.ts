import type { AppLocale } from "@/i18n/routing";
import type { TreatmentsHubUi } from "@/lib/types/services";

const HUB_COPY: Record<AppLocale, TreatmentsHubUi> = {
  en: {
    pageTitle: "Explore treatments by category",
    pageDescription:
      "Start with a direction or choose a concern. I keep it clear and calm—no overwhelming menus.",
    goalsSectionTitle: "Choose by concern",
    faqEyebrow: "FAQ",
    faqTitle: "Common questions",
    faqSubtitle:
      "Straight answers for planning, safety, and realistic expectations—before you book.",
    viewFullFaqLabel: "View the full FAQ on the homepage",
    recommendedForPrefix: "Recommended for",
    viewDetailsLabel: "View details",
    breadcrumbHome: "Home",
    breadcrumbTreatments: "Treatments",
  },
  uk: {
    pageTitle: "Процедури за категоріями",
    pageDescription:
      "Оберіть напрям або concern. Все просто й спокійно — без перевантаженого меню.",
    goalsSectionTitle: "Оберіть за запитом",
    faqEyebrow: "FAQ",
    faqTitle: "Поширені питання",
    faqSubtitle:
      "Чіткі відповіді про планування, безпеку та реалістичні очікування — до запису.",
    viewFullFaqLabel: "Повний FAQ на головній",
    recommendedForPrefix: "Рекомендовано для",
    viewDetailsLabel: "Детальніше",
    breadcrumbHome: "Головна",
    breadcrumbTreatments: "Процедури",
  },
  ru: {
    pageTitle: "Процедуры по категориям",
    pageDescription:
      "Выберите направление или concern. Всё понятно и спокойно — без перегруженного меню.",
    goalsSectionTitle: "Выберите по запросу",
    faqEyebrow: "FAQ",
    faqTitle: "Частые вопросы",
    faqSubtitle:
      "Понятные ответы о планировании, безопасности и реалистичных ожиданиях — до записи.",
    viewFullFaqLabel: "Полный FAQ на главной",
    recommendedForPrefix: "Рекомендуем для",
    viewDetailsLabel: "Подробнее",
    breadcrumbHome: "Главная",
    breadcrumbTreatments: "Процедуры",
  },
};

export function getStaticTreatmentsHubCopy(locale: AppLocale): TreatmentsHubUi {
  return HUB_COPY[locale];
}
