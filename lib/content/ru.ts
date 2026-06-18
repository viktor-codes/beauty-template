import type { LandingContent } from "@/lib/types/content";

import { contactFormCopyByLocale } from "./contact-form-copy";
import { faqGroupsRu, faqItemsRu } from "./faq/ru";
import {
  brandLogos,
  heroImage,
  INSTAGRAM_PROFILE_HREF,
  studioContact,
} from "./shared";

export const ruLandingContent = {
  nav: {
    links: [
      { label: "Обо мне", href: "#about" },
      { label: "Процедуры", href: "/treatments" },
      { label: "Галерея", href: "#gallery" },
      { label: "Отзывы", href: "#reviews" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: { label: "Консультация", href: "#contact" },
  },
  hero: {
    eyebrow: "The Skinbar · Inna Chernovol",
    title: "Уверенность, которая видна в каждом отражении",
    subtitle:
      "Персональный план процедур в спокойном пространстве — результат, который видно, без навязчивых продаж.",
    primaryCta: { label: "Записаться на консультацию", href: "#contact" },
    secondaryCta: { label: "Посмотреть процедуры", href: "/treatments" },
    image: {
      ...heroImage,
      alt: "Calm treatment room with natural light and minimal decor",
    },
  },
  about: {
    eyebrow: "Об Инне",
    title: "The Skinbar by Inna Chernovol",
    description:
      "Добро пожаловать в The Skinbar by Inna Chernovol — здесь ваши цели на первом месте.\n\nБолее 15 лет опыта в эстетической медицине: процедуры, после которых вы чувствуете себя обновлённой и уверенной. От деликатной коррекции губ до продвинутых лазерных протоколов — индивидуальный подход, качественные препараты, безопасность, комфорт и заметный результат.\n\nВместе составим персональный план для вашего уникального beauty-пути.",
    stats: [
      { value: "15+", label: "Лет практики" },
      { value: "2.5k+", label: "Проведённых процедур" },
      { value: "4.9", label: "Средняя оценка клиентов" },
    ],
    brandsEyebrow: "Бренды, с которыми я работаю",
    brandLogos: [...brandLogos],
  },
  services: {
    eyebrow: "Что я предлагаю",
    title: "Процедуры, подобранные под вас",
    description:
      "От базового ухода за кожей лица до продвинутых клинических протоколов — объясняю простым языком. Индивидуальный подбор назначений на основе синергии препаратов, без избыточных процедур.",
    categories: [
      {
        id: "services-category-cosmetology",
        title: "Косметология",
        description:
          "Инъекции, биостимуляторы, биоревитализация и аппаратные протоколы для лица и кожи.",
        href: "/treatments/cosmetology",
        featuredInNav: true,
      },
      {
        id: "services-category-body",
        title: "Процедуры для тела",
        description: "CRYO и Emsculpt для контура тела и тонуса мышц.",
        href: "/treatments/body-treatment",
        featuredInNav: true,
      },
      {
        id: "services-category-vitamins",
        title: "Vitamin shots",
        description:
          "Витаминные инъекции для энергии, иммунитета и поддержки кожи.",
        href: "/treatments/vitamin-shots",
        featuredInNav: true,
      },
      {
        id: "services-category-blood",
        title: "Анализы крови",
        description:
          "Анализы крови для wellness и фертильности — основа персонального плана.",
        href: "/treatments/blood-tests",
        featuredInNav: true,
      },
      {
        id: "services-category-skin",
        title: "Уход за лицом и пилинги",
        description:
          "Протоколы ухода Jan Marini и пилинги для чистоты, сияния и баланса кожи.",
        href: "/treatments/aesthetic-treatments",
      },
      {
        id: "services-category-injections",
        title: "Инъекции",
        description:
          "Гидратация, поддержка коллагена и деликатная структура — консервативное и безопасное планирование.",
        href: "/treatments/aesthetic-injections",
        featuredInNav: true,
      },
      {
        id: "services-category-advanced",
        title: "Продвинутые клинические процедуры",
        description:
          "Аппаратное подтягивание и реновация, когда нужна более выраженная смена по протоколу.",
        href: "/treatments/advanced-aesthetic-treatments",
      },
      {
        id: "services-category-laser",
        title: "Лазерная эпиляция",
        description:
          "Курсовые сеансы под тип волос и оттенок кожи для стабильного и комфортного результата.",
        href: "/treatments/laser-hair-removal",
      },
    ],
    goalsHeading: "или выберите по вашему запросу",
    goals: [
      { id: "goal-glow", title: "Сияние", href: "/treatments/concerns/glow" },
      {
        id: "goal-texture",
        title: "Текстура",
        href: "/treatments/concerns/texture",
      },
      {
        id: "goal-acne",
        title: "Контроль акне",
        href: "/treatments/concerns/acne",
      },
      {
        id: "goal-pigmentation",
        title: "Пигментация",
        href: "/treatments/concerns/pigmentation",
      },
      {
        id: "goal-firmness",
        title: "Упругость",
        href: "/treatments/concerns/firmness",
      },
      {
        id: "goal-hair",
        title: "Выпадение волос",
        href: "/treatments/concerns/hair",
      },
    ],
    cta: { label: "Все процедуры", href: "/treatments" },
  },
  gallery: {
    eyebrow: "Результаты и атмосфера",
    title: "Заглянуть в The Skinbar",
    instagramUrl: INSTAGRAM_PROFILE_HREF,
  },
  reviews: {
    eyebrow: "Голоса клиентов",
    title: "Что говорят после визитов",
    viewOnInstagramLabel: "Смотреть в Instagram",
    items: [
      {
        quote:
          "Я просто сияю! Инна, должна поделиться с вами. Через несколько дней после биоревитализации кожа словно обновилась, появилась невероятная плотность и свежесть. Подруги постоянно говорят, насколько выровнялась текстура и как подтянулось лицо. Чувствую себя свежей и уверенной. Не могу дождаться следующего сеанса этой осенью!",
        authorName: "Проверенный клиент",
        authorRole: "Биоревитализация и сияние",
      },
      {
        quote:
          "Настоящий профессионал и замечательный человек. Редко встречается такой баланс глубокой экспертизы и искренней заботы. Инна не просто мастер своего дела — она точно понимает, что нужно вашей коже. Наконец нашла своего эстетиста!",
        authorName: "Проверенный клиент",
        authorRole: "Профессионализм и внимание",
      },
      {
        quote:
          "Кожа как шёлк. Спасибо за прекрасную работу! После карбонового пилинга кожа нежная, как шёлк. А уход для губ, который вы посоветовали? Вы были абсолютно права — я официально в восторге. До встречи очень скоро!",
        authorName: "Проверенный клиент",
        authorRole: "Карбоновый пилинг и губы",
      },
      {
        quote:
          "Кожа мягкая, как у ребёнка, без боли. PRX-T33 — настоящий прорыв. Кожа нежная, как у младенца. Идеально перед событием: сияние без реабилитации и дискомфорта. Очень довольна результатом!",
        authorName: "Проверенный клиент",
        authorRole: "Пилинг PRX-T33",
      },
      {
        quote:
          "Кожа буквально сияет. Впечатлена продуктами Esse! Никогда не видела её такой яркой и здоровой. Всё, что мы с вами выбрали, работает вместе идеально. Видно, что для клиентов вы выбираете только высочайшее качество.",
        authorName: "Проверенный клиент",
        authorRole: "Результаты ухода Esse",
      },
      {
        quote:
          "Быстро и безболезненно. Очень довольна лазерной эпиляцией — безболезненно и эффективно. Инна делает весь процесс максимально комфортным. Рекомендую всем, кто хочет гладкую кожу к лету!",
        authorName: "Проверенный клиент",
        authorRole: "Лазерная эпиляция",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "FAQ — перед записью",
    description:
      "Понятные, обоснованные ответы на вопросы, которые клиенты задают перед бронированием.",
    introBullets: [
      "Выберите тему — открывайте только то, что нужно.",
      "Курсы, восстановление и правила безопасности сгруппированы, чтобы важное не потерялось.",
      "Если сомневаетесь, начните с «Планирование и ожидания», затем перейдите к вашей категории процедур.",
    ],
    nextStep: {
      eyebrow: "Следующий шаг",
      title: "Сомневаетесь, что выбрать?",
      description:
        "Расскажите о цели, сроках и желаемом восстановлении — на консультации быстро сузим варианты.",
    },
    groups: faqGroupsRu,
    items: faqItemsRu,
  },
  contactForm: contactFormCopyByLocale.ru,
  contact: {
    eyebrow: "Связаться",
    title: "Запись и консультация",
    description:
      "Телефон, email или форма — свяжитесь со мной удобным для вас способом.",
    phone: studioContact.phone,
    email: studioContact.email,
    address: studioContact.address,
    directionsHref: studioContact.directionsHref,
    phoneLabel: "Телефон",
    emailLabel: "Email",
    locationTitle: "The Skinbar · Inna Chernovol",
    messengers: [
      {
        id: "telegram",
        href: studioContact.telegramHref,
        ariaLabel: "Открыть Telegram",
      },
      {
        id: "whatsapp",
        href: studioContact.whatsappHref,
        ariaLabel: "Открыть WhatsApp",
      },
      {
        id: "instagram",
        href: INSTAGRAM_PROFILE_HREF,
        ariaLabel: "Открыть Instagram",
      },
    ],
  },
  footer: {
    brandTitle: "The Skinbar · Inna Chernovol",
    tagline:
      "Внимательный уход, видимый результат — персональные эстетические процедуры в спокойной студии.",
    navigation: {
      heading: "Навигация",
      links: [
        { label: "Обо мне", href: "/#about" },
        { label: "Процедуры", href: "/treatments" },
        { label: "Галерея", href: "/#gallery" },
        { label: "Отзывы", href: "/#reviews" },
        { label: "FAQ", href: "/#faq" },
        { label: "Контакты", href: "/#contact" },
      ],
    },
    services: {
      heading: "Основные категории",
      links: [
        { label: "Косметология", href: "/treatments/cosmetology" },
        { label: "Процедуры для тела", href: "/treatments/body-treatment" },
        { label: "Уход за лицом", href: "/treatments/aesthetic-treatments" },
        { label: "Blood tests", href: "/treatments/blood-tests" },
        { label: "Все процедуры", href: "/treatments" },
      ],
    },
    contact: {
      heading: "Студия",
      phone: { label: studioContact.phone, href: studioContact.phoneTelHref },
      email: {
        label: studioContact.email,
        href: `mailto:${studioContact.email}`,
      },
      address: studioContact.address,
      directionsHref: studioContact.directionsHref,
      directionsLabel: "Маршрут",
    },
    social: {
      heading: "Соцсети",
      links: [{ label: "Instagram", href: INSTAGRAM_PROFILE_HREF }],
    },
    legal: {
      notice: "© 2026 Inna Chernovol · The Skinbar. Все права защищены.",
      links: [
        { label: "Политика конфиденциальности", href: "/privacy" },
        { label: "Условия использования", href: "/terms" },
      ],
    },
    developerCredit: {
      lead: "Дизайн и разработка — ",
      brandLabel: "RuraMade",
      tail: " · независимая студия",
      href: "https://ruramade.dev",
    },
  },
} satisfies LandingContent;
