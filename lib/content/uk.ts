import type { LandingContent } from "@/lib/types/content";

import { faqGroupsUk, faqItemsUk } from "./faq/uk";
import {
  brandLogos,
  heroImage,
  INSTAGRAM_PROFILE_HREF,
  studioContact,
} from "./shared";

export const ukLandingContent = {
  nav: {
    links: [
      { label: "Про мене", href: "#about" },
      { label: "Послуги", href: "#services" },
      { label: "Галерея", href: "#gallery" },
      { label: "Відгуки", href: "#reviews" },
      { label: "FAQ", href: "#faq" },
      { label: "Контакти", href: "#contact" },
    ],
    cta: { label: "Записатися на консультацію", href: "#contact" },
  },
  hero: {
    eyebrow: "Skinbar · Inna Chernovol",
    title: "Впевненість, яка видно в кожному відображенні",
    subtitle:
      "Персональний план процедур у спокійному просторі — результат, який видно, без нав’язливих продажів.",
    primaryCta: { label: "Записатися на консультацію", href: "#contact" },
    secondaryCta: { label: "Переглянути послуги", href: "#services" },
    image: {
      ...heroImage,
      alt: "Calm treatment room with natural light and minimal decor",
    },
  },
  about: {
    eyebrow: "Про Інну",
    title: "Skinbar by Inna Chernovol",
    description:
      "Ласкаво просимо до Skinbar by Inna Chernovol — тут ваші цілі на першому місці.\n\nПонад 15 років досвіду в естетичній медицини: процедури, після яких ви відчуваєте себе оновленою та впевненою. Від делікатної корекції губ до просунутих лазерних протоколів — індивідуальний підхід, якісні препарати, безпека, комфорт і помітний результат.\n\nРазом складемо персональний план для вашої унікальної beauty-подорожі.",
    stats: [
      { value: "15+", label: "Років практики" },
      { value: "2.5k+", label: "Проведених процедур" },
      { value: "4.9", label: "Середня оцінка клієнтів" },
    ],
    brandsEyebrow: "Бренди, з якими я працюю",
    brandLogos: [...brandLogos],
  },
  services: {
    eyebrow: "Що я пропоную",
    title: "Процедури, підібрані під вас",
    description:
      "Від підтримуючих доглядових облич до просунутих протоколів — пояснюю простою мовою, додаткові опції лише за бажанням, без тиску.",
    categories: [
      {
        id: "services-category-skin",
        title: "Шкіра та підтримка",
        description:
          "Доглядові обличчя, пілінги та протоколи для чистоти, сяйва та довгострокового балансу шкіри.",
        href: "/services/aesthetic-treatments",
      },
      {
        id: "services-category-injections",
        title: "Ін’єкції (природний результат)",
        description:
          "Гідратація, підтримка колагену та делікатна структура — консервативне та безпечне планування.",
        href: "/services/aesthetic-injections",
      },
      {
        id: "services-category-advanced",
        title: "Просунуті клінічні процедури",
        description:
          "Апаратне підтягнення та реновація, коли потрібна більш виразна зміна за протоколом.",
        href: "/services/advanced-aesthetic-treatments",
      },
      {
        id: "services-category-laser",
        title: "Лазерна епіляція",
        description:
          "Курсові сеанси під тип волосся та відтінок шкіри для стабільного та комфортного результату.",
        href: "/services/laser-hair-removal",
      },
    ],
    goals: [
      { id: "goal-glow", title: "Сяйво", href: "/services?goal=glow" },
      { id: "goal-texture", title: "Текстура", href: "/services?goal=texture" },
      { id: "goal-acne", title: "Контроль акне", href: "/services?goal=acne" },
      {
        id: "goal-pigmentation",
        title: "Пігментація",
        href: "/services?goal=pigmentation",
      },
      {
        id: "goal-firmness",
        title: "Пружність",
        href: "/services?goal=firmness",
      },
      { id: "goal-hair", title: "Випадіння волосся", href: "/services?goal=hair" },
    ],
    cta: { label: "Усі послуги", href: "/services" },
  },
  gallery: {
    eyebrow: "Результати та атмосфера",
    title: "Загляд у Skinbar",
    instagramUrl: INSTAGRAM_PROFILE_HREF,
  },
  reviews: {
    eyebrow: "Голоси клієнтів",
    title: "Що кажуть після візитів",
    items: [
      {
        quote:
          "Я просто сяю! Інно, мусила з вами поділитися. За кілька днів після біоревіталізації шкіра ніби народилася знову. Подруги постійно кажуть, наскільки вирівнялася текстура і як підтягнулося обличчя. Відчуваю себе свіжою та впевненою. Не можу дочекатися наступного сеансу цієї осені!",
        authorName: "Перевірений клієнт",
        authorRole: "Біоревіталізація та сяйво",
      },
      {
        quote:
          "Справжній професіонал і чудова людина. Рідко зустрічається такий баланс глибокої експертизи та щирої турботи. Інна не просто майстер своєї справи — вона точно розуміє, що потрібно вашій шкірі. Нарешті знайшла свого естетиста!",
        authorName: "Перевірений клієнт",
        authorRole: "Професіоналізм та увага",
      },
      {
        quote:
          "Шкіра як шовк. Дякую за чудову роботу! Після карбонового пілінгу шкіра ніжна, як шовк. А догляд для губ, який ви порадили? Ви були абсолютно права — я офіційно в захваті. До зустрічі дуже скоро!",
        authorName: "Перевірений клієнт",
        authorRole: "Карбоновий пілінг та губи",
      },
      {
        quote:
          "Шкіра м’яка, як у дитини, без болю. PRX-T33 — справжній прорив. Шкіра ніжна, як у немовляти. Ідеально перед подією: сяйво без реабілітації та дискомфорту. Дуже задоволена результатом!",
        authorName: "Перевірений клієнт",
        authorRole: "Пілінг PRX-T33",
      },
      {
        quote:
          "Шкіра буквально сяє. Вражена продуктами Esse! Ніколи не бачила її такою яскравою та здоровою. Усе, що ми з вами обрали, працює разом ідеально. Видно, що для клієнтів ви обираєте лише найвищу якість.",
        authorName: "Перевірений клієнт",
        authorRole: "Результати догляду Esse",
      },
      {
        quote:
          "Швидко і безболісно. Дуже задоволена лазерною епіляцією — безболісно та ефективно. Інна робить увесь процес максимально комфортним. Рекомендую всім, хто хоче гладку шкіру до літа!",
        authorName: "Перевірений клієнт",
        authorRole: "Лазерна епіляція",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "FAQ — перед записом",
    description:
      "Зрозумілі, обґрунтовані відповіді на питання, які клієнти ставлять перед бронюванням.",
    introBullets: [
      "Оберіть тему — відкривайте лише те, що потрібно.",
      "Курси, відновлення та правила безпеки згруповані, щоб важливе не загубилося.",
      "Якщо сумніваєтесь, почніть з «Планування та очікування», потім перейдіть до вашої категорії процедур.",
    ],
    groups: faqGroupsUk,
    items: faqItemsUk,
  },
  contact: {
    eyebrow: "Зв’язатися",
    title: "Я на відстані одного повідомлення",
    description:
      "Телефон, email або форма — відповідаю протягом одного робочого дня.",
    phone: studioContact.phone,
    email: studioContact.email,
    address: studioContact.address,
    phoneLabel: "Телефон",
    emailLabel: "Email",
    locationTitle: "Skinbar · Inna Chernovol",
    messengers: [
      {
        id: "telegram",
        href: studioContact.telegramHref,
        ariaLabel: "Відкрити Telegram",
      },
      {
        id: "whatsapp",
        href: studioContact.whatsappHref,
        ariaLabel: "Відкрити WhatsApp",
      },
      {
        id: "instagram",
        href: INSTAGRAM_PROFILE_HREF,
        ariaLabel: "Відкрити Instagram",
      },
    ],
  },
  footer: {
    brandTitle: "Skinbar · Inna Chernovol",
    tagline:
      "Уважний догляд, видимий результат — персональні естетичні процедури в спокійній студії.",
    navigation: {
      heading: "Навігація",
      links: [
        { label: "Про мене", href: "/#about" },
        { label: "Послуги", href: "/#services" },
        { label: "Галерея", href: "/#gallery" },
        { label: "Відгуки", href: "/#reviews" },
        { label: "FAQ", href: "/#faq" },
        { label: "Контакти", href: "/#contact" },
      ],
    },
    services: {
      heading: "Основні категорії",
      links: [
        {
          label: "Шкіра та підтримка",
          href: "/services/aesthetic-treatments",
        },
        {
          label: "Ін’єкції (природний результат)",
          href: "/services/aesthetic-injections",
        },
        {
          label: "Просунуті клінічні процедури",
          href: "/services/advanced-aesthetic-treatments",
        },
        {
          label: "Лазерна епіляція",
          href: "/services/laser-hair-removal",
        },
        { label: "Усі послуги", href: "/services" },
      ],
    },
    contact: {
      heading: "Студія",
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
      heading: "Соцмережі",
      links: [{ label: "Instagram", href: INSTAGRAM_PROFILE_HREF }],
    },
    legal: {
      notice: "© 2026 Inna Chernovol · Skinbar. Усі права захищені.",
      links: [
        { label: "Політика конфіденційності", href: "/privacy" },
        { label: "Умови використання", href: "/terms" },
      ],
    },
    developerCredit: {
      lead: "Дизайн і розробка — ",
      brandLabel: "RuraMade",
      tail: " · незалежна студія (чисельність: одна). Не агентство.",
      href: "https://ruramade.dev",
    },
  },
} satisfies LandingContent;
