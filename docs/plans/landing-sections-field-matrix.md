# Лендинг: матрица полей (Sanity × локали × перевод)

Детальный разбор **каждой секции главной** и связанных данных.  
Дополняет [sanity-client-admin-roadmap.md](./sanity-client-admin-roadmap.md).

**Легенда**

| Символ | Значение |
|--------|----------|
| 📝 | Редактирует Инна в Sanity |
| 🌍 | Отдельный перевод на `en` / `uk` / `ru` (отдельный документ `landingPage` или `localeString`) |
| 🔒 | Только разработчик (код / не в CMS) |
| ⚙️ | Считается автоматически на сайте |
| 📋 | Сейчас в `messages/*.json` (next-intl), не в Sanity |
| 🔄 | Подтягивается из `siteSettings` (один раз правит — везде обновится) |
| ⚠️ | Есть в схеме, но маппер **игнорирует** или поле **отсутствует** в схеме |

**Модель локалей лендинга:** три документа `landingPage` (document i18n) — открыла «Landing EN» → все строки внутри на английском; «Landing UK» → украинский. Slug URL категорий услуг **не переводятся** (ADR 001).

---

## 0. Вне секций лендинга (но влияет на «что переводится»)

| Область | Где сейчас | EN | UK | RU | В Sanity? | Заметка |
|---------|------------|----|----|-----|-----------|---------|
| SEO title/description главной | `lib/site-metadata.ts` + `app/[locale]/layout.tsx` | 🔒 | 🔒 | 🔒 | Нет | Отдельный этап: `siteSettings` или document SEO |
| Форма контакта (лейблы, ошибки) | `messages/*` сейчас → **Sanity** `contactForm` | 📝 | 📝 | 📝 | **План:** фаза 1c | См. roadmap §6c |
| Cookie-баннер | `messages/*` → `Cookie` | 📋 | 📋 | 📋 | Нет | |
| A11y / меню (Open menu…) | `messages/*` → `Navigation`, `Accessibility` | 📋 | 📋 | 📋 | Нет | |
| Переключатель языка | `messages/*` → `Locale` | 📋 | 📋 | 📋 | Нет | |
| Телефон, email, адрес (канон) | `siteSettings` + `lib/content/shared.ts` | 🔄 | 🔄 | 🔄 | Частично | После seed — править в **Site settings** |
| Hero-файл `/hero.webp` | `lib/content/shared.ts` | 🔒 | 🔒 | 🔒 | Нет | По решению: dev-only |
| Фото галереи (6 шт.) | `gallery-section.tsx` | 🔒 | 🔒 | 🔒 | Нет | Слайдер позже, dev-only |
| Логотипы брендов (файлы) | `shared.ts` + опционально CMS | EN alt в CMS | 🌍 alt | 🌍 alt | Частично | Файлы можно оставить в коде, alt — в CMS |
| Developer credit в футере | только статика | 🔒 | 🔒 | 🔒 | Нет | Не показывать в Studio |

**Вывод:** лендинг в Sanity — не весь «переводимый» сайт. Перед переводом UK/RU нужен чеклист и для `messages/*`.

---

## 1. Header & footer (`landingPage.nav`, `landingPage.footer`)

### 1.1 Navigation (`nav`)

| Поле на сайте | Sanity (`landingNavSection`) | EN doc | UK/RU doc | Сейчас | Целевое |
|---------------|------------------------------|--------|-----------|--------|---------|
| `links[].label` | `links[].label` | 📝🌍 | 📝🌍 | 📝 | 📝 |
| `links[].href` | `links[].href` | 📝 | 📝 | 📝 | Пресеты: `#about`, `/treatments`, … |
| `cta.label` | `cta.label` | 📝🌍 | 📝🌍 | ⚠️ маппер **игнорирует** label | **Оставить намеренно:** короткая CTA («Consultation»); починить маппер → читать из CMS |
| `cta.href` | `cta.href` | 📝 | 📝 | 📝 | Обычно `#contact` |
| `links[].children` | — | ⚙️ | ⚙️ | ⚙️ | Строится из каталога + `featuredInNav` |
| `links[].viewAll` | — | ⚙️ | ⚙️ | ⚙️ | Берётся из `services.cta` |
| Пункт Contact в меню | — | 🔒 | 🔒 | 🔒 | Скрыт кодом (`isContactNavHref`) |

### 1.2 Footer (`footer`)

| Поле | Sanity | Перевод | Сейчас | Целевое |
|------|--------|---------|--------|---------|
| `brandTitle` | string | 🌍 | 📝 | 📝 |
| `tagline` | text | 🌍 | 📝 | 📝 |
| `navigation.heading` + links | `footerLinkGroup` | 🌍 | 📝 | 📝, href пресеты |
| `services.heading` + links | `footerLinkGroup` | 🌍 | 📝 | ⚙️ ссылки из каталога (опционально) |
| `contact.heading` | string | 🌍 | 📝 | 📝 |
| `contact.phone` label/href | `contentLink` | 🔄/🌍 label | 📝 | phone из **siteSettings** |
| `contact.email` | `contentLink` | 🔄 | 📝 | email из settings |
| `contact.address` | text | 🔄 | 📝 | адрес из settings |
| `contact.directionsHref/Label` | url + string | 🌍 label, 🔄 url | 📝 | |
| `social.heading` + links | `footerLinkGroup` | 🌍 | 📝 | Instagram href 🔄 из settings |
| `legal.notice` | string | 🌍 | 📝 | 📝 |
| `legal.links` | `contentLink[]` | 🌍 labels | 📝 | href фикс: `/privacy`, `/terms` |
| `developerCredit` | **нет в схеме** | 🔒 | 🔒 | 🔒 |

---

## 2. Hero (`landingPage.hero`)

| Поле | Sanity | Перевод | Сейчас | Целевое |
|------|--------|---------|--------|---------|
| `eyebrow` | string | 🌍 | 📝 | 📝 |
| `title` | string | 🌍 | 📝 | 📝 |
| `subtitle` | text | 🌍 | 📝 | 📝 |
| `primaryCta.label` | `primaryCtaLabel` | 🌍 | 📝 | ⚠️ маппер берёт только статику | **Длинная** CTA hero — должна идти из CMS (`primaryCtaLabel`) |
| `primaryCta.href` | `primaryCtaHref` | общий | 📝 | пресет `#contact` |
| `secondaryCta.label` | `secondaryCtaLabel` | 🌍 | 📝 | 📝 | Короткая вторая кнопка — уже из CMS |
| `secondaryCta.href` | `secondaryCtaHref` | общий | 📝 | |
| `image.src` | — | 🔒 | 🔒 | 🔒 dev |
| `image.alt` | — | ⚠️ | только fallback EN | 🌍 в CMS **или** 🔒 |

---

## 3. About (`landingPage.about`)

| Поле | Sanity | Перевод | Сейчас | Целевое |
|------|--------|---------|--------|---------|
| `eyebrow`, `title`, `description` | strings/text | 🌍 | 📝 | 📝 |
| `stats[].value` | string | 🌍* | 📝 | *числа «15+» можно не переводить |
| `stats[].label` | string | 🌍 | 📝 | 📝 |
| `brandsEyebrow` | string | 🌍 | 📝 | 📝 |
| `brandLogos[].image` | image | 🔒/📝 | опционально CMS | dev или CMS |
| `brandLogos[].alt` | string | 🌍 | 📝 | 📝 |

---

## 4. Services preview (`landingPage.services`) — **ключевая переделка**

Сейчас: 8+ **ручных** карточек (`id`, `title`, `description`, `href`) + отдельно `featuredInNav` в статике, **нет в схеме**.

### 4.1 Заголовки секции

| Поле | Sanity | Перевод | Целевое |
|------|--------|---------|---------|
| `eyebrow`, `title`, `description` | есть | 🌍 | 📝 |
| `cta.label`, `cta.href` | `contentLink` | 🌍 / общий href | 📝 |

### 4.2 Карточки категорий на главной (нужно **4 штуки**)

| Поле сейчас | Проблема | Целевая модель |
|-------------|----------|----------------|
| `categories[].id` | ручной, легко ошибиться | ⚙️ из `serviceCategory.slug` |
| `categories[].title` | дубль каталога | 🌍 из `serviceCategory.title` |
| `categories[].description` | дубль | 🌍 из `serviceCategory.description` (короткий teaser?) |
| `categories[].href` | дубль | ⚙️ `/treatments/{slug}` |
| `featuredInNav` | только статика | 📝 на **`serviceCategory`**: `featuredInNav` (**max 5**, dropdown) |
| (нет поля) | — | 📝 **`featuredOnHomepage`** + `sortOrder`, **max 4** |

**Предлагаемый UX в Studio (один источник правды):**

1. Инна правит категорию в **Services → Categories** (название, описание EN/UK/RU, slug автоген).
2. Флаги на категории:
   - `Show on homepage` (не больше 4 активных — валидация).
   - `Show in header dropdown` (отдельно, можно те же 4 или другой набор).
3. На лендинге — только заголовки секции + CTA, **без** ручного списка карточек.

### 4.3 Goal chips (`goals[]`)

| Поле | Sanity | Перевод | Целевое |
|------|--------|---------|---------|
| `id` | string | 🔒 технический (`goal-glow`) | ⚙️ константа в коде |
| `title` | string | 🌍 | 📝 |
| `href` | string | ⚙️ | `/treatments?goal={id}` |

*Опционально:* вынести goals в `siteSettings` или singleton — не блокер фазы 1.

---

## 5. Gallery (`landingPage.gallery`)

| Поле | Sanity | Перевод | Сейчас | Целевое |
|------|--------|---------|--------|---------|
| `eyebrow`, `title` | есть | 🌍 | 📝 | 📝 |
| `instagramUrl` | url | 🔄 | 📝 | из **siteSettings** |
| Изображения сетки | — | 🔒 | 🔒 | 🔒 dev (слайдер позже) |

---

## 6. Reviews (`landingPage.reviews`)

| Поле | Sanity | Перевод | Сейчас | Целевое |
|------|--------|---------|--------|---------|
| `eyebrow`, `title` | есть | 🌍 | 📝 | 📝 |
| `items[].quote` | text | 🌍 | 📝 | 📝 |
| `items[].authorName` | string | 🌍 | 📝 | **Реальные имена** (с согласием клиента) |
| `items[].authorRole` | string | 🌍 | 📝 | подпись «тип процедуры» |
| `items[].instagramSourceUrl` | **добавить** url | — | нет | ссылка на post / highlight / reel; UI «View on Instagram» |

Рекомендация: max 6–8 отзывов; в Studio — reminder про GDPR/согласие. Автосинхронизация story из IG **не** планируется (ручная ссылка). См. roadmap §6b.

---

## 7. FAQ (`landingPage.faq`)

| Поле | Sanity | Перевод | Сейчас | Целевое |
|------|--------|---------|--------|---------|
| `eyebrow`, `title`, `description` | есть | 🌍 | 📝 | 📝 |
| `introBullets[]` | string[] | 🌍 | 📝 | 📝 |
| `groups[].id` | slug | ⚙️ автоген | 📝 | slug из title, **не показывать** Инне |
| `groups[].title`, `subtitle` | | 🌍 | 📝 | 📝 |
| `groups[].items[]` | `faqItem` | 🌍 | 📝 | **единственный** источник |
| `items[]` (flat) | есть | — | legacy | **Убрать из схемы**; flat list ⚙️ из groups |
| `items[].id` | slug | ⚙️ | 📝 | автоген для matching на `/treatments` |

Treatments-страницы подбирают FAQ по `id` — стабильные slug обязательны, но **не ручной ввод**.

---

## 8. Contact (`landingPage.contact`)

| Поле | Sanity | Перевод | Сейчас | Целевое |
|------|--------|---------|--------|---------|
| `eyebrow`, `title`, `description` | есть | 🌍 | 📝 | 📝 |
| `phoneLabel`, `emailLabel`, `locationTitle` | | 🌍 | 📝 | 📝 |
| `phone`, `email`, `address` | есть | 🔄 | дубль | убрать с лендинга → только **siteSettings** |
| `directionsHref` | **нет в схеме contact** | 🔄 | fallback | только settings |
| `messengers[].id` | enum | 🔒 | 📝 | telegram/whatsapp/instagram |
| `messengers[].href` | url | 🔄 | 📝 | TG/WA из settings; IG 🔄 |
| `messengers[].ariaLabel` | string | 🌍 | 📝 | 📝 |

---

## 9. Site settings (`siteSettings` × 3 локали)

| Поле | Перевод | Примечание |
|------|---------|------------|
| `phone`, `phoneTelHref` | одинаковые | display vs tel: |
| `email`, `address` | address можно 🌍 | адрес на языке локали |
| `instagramUrl`, `telegramHref`, `whatsappHref`, `directionsHref` | общие URL | |

Документ на локаль нужен, если адрес/подписи различаются; URL обычно общие.

---

## 10. Legal (отдельные документы, не секция лендинга)

Текущая модель: `legalPage` → `sections[]` → `{ heading, body }`.

| Поле | Перевод | Замечание |
|------|---------|-----------|
| `title`, `metaDescription` | 🌍 | уже заложено |
| `sections[].heading` | 🌍 | то, что не нравится — «заголовок на каждый блок» |
| `sections[].body` | 🌍 | Portable Text |

### Как делают обычно (и что предложить Инне)

| Подход | Плюсы | Минусы |
|--------|-------|--------|
| **A. Секции (как сейчас)** | Оглавление, якоря, порядок блоков | Больше полей, «ощущение формы» |
| **B. Один поток текста** (`body` — один Portable Text) | Проще писать и переводить | Сложнее переставлять блоки, слабее структура для SEO-якорей |
| **C. Гибрид (рекомендация)** | Один документ `body`; заголовки только **H2/H3 внутри редактора**, без отдельного поля `heading` | Нужна миграция seed + компонент рендера |

**Решение зафиксировать до фазы 3 (legal).** Полный текст на **каждую** локаль — да (по твоему ответу).

---

## 11. Сводка: что упустили / баги мапперов

| # | Проблема | Действие |
|---|----------|----------|
| 1 | `nav.cta.label` не из CMS; `hero.primaryCta.label` не из CMS | Nav: **включить** короткий label из CMS. Hero: **включить** `primaryCtaLabel`. Не смешивать одно поле |
| 2 | `featuredInNav` / выбор 4 категорий на главной | Поля на `serviceCategory`, убрать ручные `categories[]` с лендинга |
| 3 | `contact.directionsHref` нет в схеме contact | Только settings |
| 4 | Дубль телефона/email в contact + footer + settings | Один источник: settings |
| 5 | FAQ `items` + `groups` | Оставить только `groups` |
| 6 | `hero.image.alt` на UK/RU всё ещё EN в статике | Перевести или CMS |
| 7 | Форма контакта не в Sanity | Решить: оставить messages или перенести в фазу 2+ |
| 8 | SEO metadata не в Sanity | Отдельный пункт roadmap |

---

## 12. План контента EN → UK/RU (без staging)

| Шаг | Действие |
|-----|----------|
| 1 | Довести **EN** в Sanity (prod): один проход по секциям из этой матрицы |
| 2 | Сверка EN: Studio ↔ сайт (`/en`) |
| 3 | Экспорт текстов EN (таблица / CSV / doc) для переводчика |
| 4 | Перевод **UK** → документы `landingPage` (uk), `legalPage`, поля `*.uk` в services |
| 5 | Перевод **RU** → то же |
| 6 | QA: `/uk`, `/ru` — без «дыр»; fallback EN только где явно согласовано |
| 7 | Чеклист `messages/*` для UK/RU |

**Slug:** автоген из английского названия для `serviceCategory` / `Subcategory` / `Procedure` — **да**, Инне slug не трогать (read-only после создания). FAQ/group slug — автоген, скрыть в UI.

---

## 13. CTA: короткая (nav) vs длинная (hero primary)

| Место | Роль | Пример EN | Sanity | Маппер сейчас |
|-------|------|-----------|--------|----------------|
| Header `nav.cta` | Короткая, всегда в шапке | Consultation | `cta.label` | ❌ label только статика |
| Hero `primaryCta` | Длинная, главное действие | Book a consultation | `primaryCtaLabel` | ❌ label только статика |
| Hero `secondaryCta` | Вторая кнопка | View treatments | `secondaryCtaLabel` | ✅ из CMS |

**Правильный подход:** не один тип «CTA», а **два явных поля в схеме** с подсказками в Studio (*Short header button* / *Hero main button*). В коде — два маппера без «fallback label» для hero primary.

---

## 14. Закрыто

| Вопрос | Решение |
|--------|---------|
| Homepage vs dropdown | `featuredOnHomepage` (**max 4**), `featuredInNav` (**max 5**) |
| Contact form | Перенос в **Sanity** (roadmap §6c) |
| Reviews | Реальные имена + optional Instagram URL |
| Concern images | **Да** на hub |
| Legal | Оставить **секции** `heading` + `body` (как сейчас) |
| Fallback UK/RU | Показывать **EN**, если поле пустое |
| Concerns / goals | См. [treatment-concerns-spec.md](./treatment-concerns-spec.md) |

См. журнал в [sanity-client-admin-roadmap.md](./sanity-client-admin-roadmap.md) §7.
