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
    categoryMetaTitleSuffix: "consultations & protocols",
    subcategoriesSrOnlyLabel: "Subcategories",
    proceduresSrOnlyLabel: "Procedures",
    categoryFaqTitleTemplate: "{title}: common questions",
    categoryFaqSubtitle: "Focused answers for this direction—plus what to ask during consultation.",
    subcategoryFaqTitleTemplate: "{title}: what clients ask",
    subcategoryFaqSubtitle:
      "Practical guidance for planning, downtime, and safety—tailored to this treatment group.",
    procedureFaqTitleTemplate: "Before you book: {title}",
    procedureFaqSubtitle:
      "A shortlist of the most relevant questions—plus the full FAQ library on the homepage.",
    consultationRecommendedLabel: "Consultation recommended",
    subcategoryConsultationBlurb:
      "Not sure where to start? Book a consultation and I’ll map out the safest, most effective plan for your goal and timeline.",
    procedureConsultationBlurb:
      "I’ll confirm suitability, expected downtime, and aftercare during your consultation. If you have upcoming events or active skincare (retinoids, peels), mention it so I can plan safely.",
    viewFullFaqLabel: "View the full FAQ on the homepage",
    recommendedForPrefix: "Recommended for",
    viewDetailsLabel: "View details",
    breadcrumbHome: "Home",
    breadcrumbTreatments: "Treatments",
    backToAllCategoriesLabel: "Back to all categories",
    backToCategoryPrefix: "Back to",
    concernCardFallbackDescription: "See treatments matched to this concern.",
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
    categoryMetaTitleSuffix: "консультації та протоколи",
    subcategoriesSrOnlyLabel: "Підкатегорії",
    proceduresSrOnlyLabel: "Процедури",
    categoryFaqTitleTemplate: "{title}: поширені питання",
    categoryFaqSubtitle:
      "Сфокусовані відповіді для цього напряму — плюс що варто запитати на консультації.",
    subcategoryFaqTitleTemplate: "{title}: що запитують найчастіше",
    subcategoryFaqSubtitle:
      "Практичні підказки про планування, відновлення та безпеку — саме для цієї групи процедур.",
    procedureFaqTitleTemplate: "Перед записом: {title}",
    procedureFaqSubtitle:
      "Короткий список найважливіших питань — і повна бібліотека FAQ на головній сторінці.",
    consultationRecommendedLabel: "Рекомендована консультація",
    subcategoryConsultationBlurb:
      "Не знаєте, з чого почати? Запишіться на консультацію — я підберу найбезпечніший і найефективніший план під вашу мету та строки.",
    procedureConsultationBlurb:
      "На консультації підтверджу показання, очікуване відновлення та догляд після процедури. Якщо у вас є важливі події або активний догляд (ретиноїди, пілінги) — скажіть, щоб спланувати все безпечно.",
    viewFullFaqLabel: "Повний FAQ на головній",
    recommendedForPrefix: "Рекомендовано для",
    viewDetailsLabel: "Детальніше",
    breadcrumbHome: "Головна",
    breadcrumbTreatments: "Процедури",
    backToAllCategoriesLabel: "Усі категорії",
    backToCategoryPrefix: "Назад до",
    concernCardFallbackDescription: "Процедури під цей запит.",
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
    categoryMetaTitleSuffix: "консультации и протоколы",
    subcategoriesSrOnlyLabel: "Подкатегории",
    proceduresSrOnlyLabel: "Процедуры",
    categoryFaqTitleTemplate: "{title}: частые вопросы",
    categoryFaqSubtitle:
      "Сфокусированные ответы по этому направлению — плюс что спросить на консультации.",
    subcategoryFaqTitleTemplate: "{title}: что спрашивают чаще всего",
    subcategoryFaqSubtitle:
      "Практичные ответы про планирование, восстановление и безопасность — именно для этой группы процедур.",
    procedureFaqTitleTemplate: "Перед записью: {title}",
    procedureFaqSubtitle:
      "Короткий список самых важных вопросов — и полная библиотека FAQ на главной странице.",
    consultationRecommendedLabel: "Рекомендуется консультация",
    subcategoryConsultationBlurb:
      "Не уверены, с чего начать? Запишитесь на консультацию — я составлю самый безопасный и эффективный план под вашу цель и сроки.",
    procedureConsultationBlurb:
      "На консультации уточню показания, ожидаемое восстановление и уход после процедуры. Если у вас есть важные события или активный уход (ретиноиды, пилинги) — скажите, чтобы спланировать всё безопасно.",
    viewFullFaqLabel: "Полный FAQ на главной",
    recommendedForPrefix: "Рекомендуем для",
    viewDetailsLabel: "Подробнее",
    breadcrumbHome: "Главная",
    breadcrumbTreatments: "Процедуры",
    backToAllCategoriesLabel: "Все категории",
    backToCategoryPrefix: "Назад к",
    concernCardFallbackDescription: "Процедуры под этот запрос.",
  },
};

export function getStaticTreatmentsHubCopy(locale: AppLocale): TreatmentsHubUi {
  return HUB_COPY[locale];
}
