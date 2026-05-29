import type { LandingContent } from "@/lib/types/content";

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
      { label: "Услуги", href: "#services" },
      { label: "Галерея", href: "#gallery" },
      { label: "Отзывы", href: "#reviews" },
      { label: "FAQ", href: "#faq" },
      { label: "Контакты", href: "#contact" },
    ],
    cta: { label: "Записаться на консультацию", href: "#contact" },
  },
  hero: {
    eyebrow: "The Skinbar · Inna Chernovol",
    title: "Уверенность, которая видна в каждом отражении",
    subtitle:
      "Персональный план процедур в спокойном пространстве — результат, который видно, без навязчивых продаж.",
    primaryCta: { label: "Записаться на консультацию", href: "#contact" },
    secondaryCta: { label: "Посмотреть услуги", href: "#services" },
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
      "От уходовых лиц до продвинутых протоколов — объясняю простым языком, дополнительные опции только по желанию, без давления.",
    categories: [
      {
        id: "services-category-cosmetology",
        title: "Cosmetology",
        description:
          "Инъекции, биостимуляторы, биоревитализация и аппаратные протоколы для лица и кожи.",
        href: "/services/cosmetology",
      },
      {
        id: "services-category-body",
        title: "Body slimming & contouring",
        description:
          "CRYO, Emsculpt, пилинги, лазерная коррекция и процедуры для тела.",
        href: "/services/body-slimming",
      },
      {
        id: "services-category-anti-age",
        title: "Anti age",
        description:
          "Лифтинг, коллаген, нейромодуляторы и anti-age пилинги.",
        href: "/services/anti-age",
      },
      {
        id: "services-category-vitamins",
        title: "Vitamin shots",
        description:
          "Витаминные инъекции для энергии, иммунитета и поддержки кожи.",
        href: "/services/vitamin-shots",
      },
      {
        id: "services-category-blood",
        title: "Blood tests",
        description:
          "Анализы крови для wellness и фертильности — основа персонального плана.",
        href: "/services/blood-tests",
      },
      {
        id: "services-category-skin",
        title: "Facials & peels",
        description:
          "Уходовые лица Jan Marini и пилинги для чистоты, сияния и баланса кожи.",
        href: "/services/aesthetic-treatments",
      },
      {
        id: "services-category-injections",
        title: "Инъекции (естественный результат)",
        description:
          "Гидратация, поддержка коллагена и деликатная структура — консервативное и безопасное планирование.",
        href: "/services/aesthetic-injections",
      },
      {
        id: "services-category-advanced",
        title: "Продвинутые клинические процедуры",
        description:
          "Аппаратное подтягивание и реновация, когда нужна более выраженная смена по протоколу.",
        href: "/services/advanced-aesthetic-treatments",
      },
      {
        id: "services-category-laser",
        title: "Лазерная эпиляция",
        description:
          "Курсовые сеансы под тип волос и оттенок кожи для стабильного и комфортного результата.",
        href: "/services/laser-hair-removal",
      },
    ],
    goals: [
      { id: "goal-glow", title: "Сияние", href: "/services?goal=glow" },
      { id: "goal-texture", title: "Текстура", href: "/services?goal=texture" },
      { id: "goal-acne", title: "Контроль акне", href: "/services?goal=acne" },
      {
        id: "goal-pigmentation",
        title: "Пигментация",
        href: "/services?goal=pigmentation",
      },
      {
        id: "goal-firmness",
        title: "Упругость",
        href: "/services?goal=firmness",
      },
      {
        id: "goal-hair",
        title: "Выпадение волос",
        href: "/services?goal=hair",
      },
    ],
    cta: { label: "Все услуги", href: "/services" },
  },
  gallery: {
    eyebrow: "Результаты и атмосфера",
    title: "Заглянуть в The Skinbar",
    instagramUrl: INSTAGRAM_PROFILE_HREF,
  },
  reviews: {
    eyebrow: "Голоса клиентов",
    title: "Что говорят после визитов",
    items: [
      {
        quote:
          "Я просто сияю! Инна, должна поделиться с вами. Через несколько дней после биоревитализации кожа словно родилась заново. Подруги постоянно говорят, насколько выровнялась текстура и как подтянулось лицо. Чувствую себя свежей и уверенной. Не могу дождаться следующего сеанса этой осенью!",
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
    groups: faqGroupsRu,
    items: faqItemsRu,
  },
  contact: {
    eyebrow: "Связаться",
    title: "Я на расстоянии одного сообщения",
    description:
      "Телефон, email или форма — отвечаю в течение одного рабочего дня.",
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
        { label: "Услуги", href: "/#services" },
        { label: "Галерея", href: "/#gallery" },
        { label: "Отзывы", href: "/#reviews" },
        { label: "FAQ", href: "/#faq" },
        { label: "Контакты", href: "/#contact" },
      ],
    },
    services: {
      heading: "Основные категории",
      links: [
        { label: "Cosmetology", href: "/services/cosmetology" },
        { label: "Anti age", href: "/services/anti-age" },
        { label: "Body slimming", href: "/services/body-slimming" },
        { label: "Blood tests", href: "/services/blood-tests" },
        { label: "Все услуги", href: "/services" },
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
      tail: " · независимая студия (численность: одна). Не агентство.",
      href: "https://ruramade.dev",
    },
  },
} satisfies LandingContent;
