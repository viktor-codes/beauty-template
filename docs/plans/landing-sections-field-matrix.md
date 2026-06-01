# Лендинг: матрица полей (Sanity × локали × перевод)

Детальный разбор **каждой секции главной** и связанных данных.  
Дополняет [sanity-client-admin-roadmap.md](./sanity-client-admin-roadmap.md).

**Синхронизация с кодом:** части 0–5 (2026-06-01). Колонка **Статус** — фактическое поведение сайта сейчас.

**Легенда**

| Символ | Значение |
|--------|----------|
| ✅ | Реализовано в коде (части 0–5) |
| 📝 | Редактирует Инна в Sanity |
| 🌍 | Отдельный перевод: документ `landingPage` per locale **или** `localeString` на каталоге |
| 🔒 | Только разработчик (код / не в CMS) |
| ⚙️ | Считается автоматически на сайте |
| 📋 | В `messages/*.json` (next-intl), не в Sanity |
| 🔄 | Канон в `siteSettings` → подмешивается в contact/footer |
| ⏳ | Запланировано, ещё не в коде |

**Модель локалей лендинга:** три документа `landingPage` (document i18n). Slug категорий услуг **не переводятся** (ADR 001). UK/RU пусто → **fallback EN** (`pick-locale-field`).

---

## 0. Вне секций лендинга

| Область | Статус | EN | UK | RU | Где править |
|---------|--------|----|----|-----|-------------|
| SEO title/description главной | ⏳ | 🔒 | 🔒 | 🔒 | `lib/site-metadata.ts` — отдельный этап |
| Форма контакта | ✅ | 📝 | 📝 | 📝 | `landingPage.contactForm` ×3 |
| Cookie-баннер | 📋 | 📋 | 📋 | 📋 | `messages/Cookie` |
| A11y / Open menu | 📋 | 📋 | 📋 | 📋 | `messages/Navigation` |
| Переключатель языка | 📋 | 📋 | 📋 | 📋 | `messages/Locale` |
| Телефон, email, адрес | ✅ 🔄 | 🔄 | 🔄 | 🔄 | **Site settings** → [merge doc](../checklists/site-settings-merge.md) |
| Hero `/hero.webp` | 🔒 | 🔒 | 🔒 | 🔒 | dev-only |
| Фото галереи (6 шт.) | 🔒 | 🔒 | 🔒 | 🔒 | dev-only |
| Логотипы брендов | ✅ | 📝 upload | 📝 alt | 📝 alt | `landingPage.about.brandLogos` (seed из `/public/logos`) |
| Developer credit | 🔒 | 🔒 | 🔒 | 🔒 | не в Studio |

**Вывод:** для полного UK/RU ещё нужен проход по `messages/*` и перевод **процедур** в каталоге (сейчас EN-only → fallback).

---

## 1. Header & footer

### 1.1 Navigation (`nav`)

| Поле | Статус | Sanity | EN/UK/RU | Примечание |
|------|--------|--------|----------|------------|
| `links[].label` | ✅ 📝🌍 | `links[].label` | 3 документа | |
| `links[].href` | ✅ 📝 | `links[].href` | 3 документа | ⏳ presets `#about`, `/treatments` |
| `cta.label` | ✅ 📝🌍 | `cta.label` | 3 документа | Короткая CTA («Consultation» / «Консультація») |
| `cta.href` | ✅ 📝 | `cta.href` | обычно `#contact` | |
| `links[].children` | ✅ ⚙️ | — | | Каталог + `featuredInNav` + **`shortTitle`** |
| `links[].viewAll` | ✅ ⚙️ | — | | Из `services.cta` |
| Contact в меню | 🔒 | — | | Скрыт кодом |

### 1.2 Footer (`footer`)

| Поле | Статус | Sanity | Перевод | Примечание |
|------|--------|--------|---------|------------|
| `brandTitle`, `tagline` | ✅ 📝🌍 | strings | 3 документа | |
| `navigation` | ✅ 📝🌍 | `footerLinkGroup` | 3 документа | |
| `services` links | ✅ 📝🌍 | `footerLinkGroup` | 3 документа | Ссылки пока в CMS, не автокаталог |
| `contact.*` labels | ✅ 📝🌍 | | 3 документа | |
| `contact.phone/email/address` | ✅ 🔄 | | | Из **siteSettings** |
| `contact.directions*` | ✅ 🔄🌍 | label в footer | | URL из settings |
| `social` + Instagram | ✅ 🔄🌍 | | | `instagramUrl` из settings |
| `legal` | ✅ 📝🌍 | | 3 документа | |
| `developerCredit` | 🔒 | нет в схеме | | статика |

---

## 2. Hero (`landingPage.hero`)

| Поле | Статус | Sanity | Перевод | Примечание |
|------|--------|--------|---------|------------|
| `eyebrow`, `title`, `subtitle` | ✅ 📝🌍 | strings/text | 3 документа | |
| `primaryCta.label` | ✅ 📝🌍 | `primaryCtaLabel` | 3 документа | Длинная CTA |
| `primaryCta.href` | ✅ 📝 | `primaryCtaHref` | | |
| `secondaryCta.label` | ✅ 📝🌍 | `secondaryCtaLabel` | 3 документа | |
| `secondaryCta.href` | ✅ 📝 | `secondaryCtaHref` | | |
| `image` | 🔒 | — | | `/hero.webp` в коде |
| `image.alt` | ⏳ | — | | В статике UK/RU часто EN |

---

## 3. About (`landingPage.about`)

| Поле | Статус | Sanity | Перевод | Примечание |
|------|--------|--------|---------|------------|
| `eyebrow`, `title`, `description` | ✅ 📝🌍 | | 3 документа | |
| `stats[]` | ✅ 📝🌍 | | 3 документа | |
| `brandsEyebrow` | ✅ 📝🌍 | | 3 документа | |
| `brandLogos[].image` | ✅ 📝 | image | | Upload в Studio |
| `brandLogos[].alt` | ✅ 📝🌍 | string | per document | Имена брендов часто латиницей |

---

## 4. Services preview (`landingPage.services`)

### 4.1 Заголовки секции — ✅ в CMS

| Поле | Статус | Sanity | Перевод |
|------|--------|--------|---------|
| `eyebrow`, `title`, `description` | ✅ | есть | 🌍 3 документа |
| `cta` | ✅ | `contentLink` | 🌍 |

### 4.2 Карточки категорий на главной — ✅ из каталога (не ручной список)

| Поле на сайте | Статус | Источник |
|---------------|--------|----------|
| 4 карточки | ✅ ⚙️ | `serviceCategory` где `featuredOnHomepage` (max 4) |
| `title`, `description` | ✅ 🌍 | `serviceCategory.title` / `description` (field i18n) |
| `href` | ✅ ⚙️ | `/treatments/{slug}` |
| Ручной `categories[]` на лендинге | ✅ удалён | Больше нет в схеме |

**Studio:** Services → Categories → флаги **Featured on homepage** / **Featured in header menu** + **Short title** (nav).

| Поле на `serviceCategory` | Статус | Примечание |
|---------------------------|--------|------------|
| `featuredOnHomepage` | ✅ | max 4 |
| `featuredInNav` | ✅ | max 5 |
| `shortTitle` | ✅ | напр. Injectables / Ін'єкції |
| `sortOrder` | ✅ | порядок в списках |

### 4.3 Goal chips (`goals[]`) — ⏳ без изменений

| Поле | Статус | Примечание |
|------|--------|------------|
| `goals[]` на лендинге | 📝 🌍 | Ручной массив в `landingPage` |
| Hub `?goal=` | ⏳ | Keyword matching → фаза **2b** `treatmentConcern` |

---

## 5. Gallery (`landingPage.gallery`)

| Поле | Статус | Sanity | Примечание |
|------|--------|--------|------------|
| `eyebrow`, `title` | ✅ 📝🌍 | 3 документа |
| `instagramUrl` | ✅ 🔄 | из **siteSettings** |
| Изображения | 🔒 | dev-only |

---

## 6. Reviews (`landingPage.reviews`)

| Поле | Статус | Sanity | Примечание |
|------|--------|--------|------------|
| `eyebrow`, `title` | ✅ 📝🌍 | |
| `viewOnInstagramLabel` | ✅ 📝🌍 | напр. «View on Instagram» |
| `items[].quote`, `authorName`, `authorRole` | ✅ 📝🌍 | max 8 в Studio |
| `items[].instagramSourceUrl` | ✅ 📝 | опционально; UI-ссылка |

---

## 7. FAQ (`landingPage.faq`)

| Поле | Статус | Sanity | Примечание |
|------|--------|--------|------------|
| Заголовки, `introBullets` | ✅ 📝🌍 | |
| `groups[]` | ✅ 📝🌍 | **единственный** источник |
| `items[]` flat | ✅ удалён | Flat list ⚙️ из `groups` |
| `groups[].items[].id` | ✅ slug | для matching на treatments |

---

## 8. Contact (`landingPage.contact` + `contactForm`)

### 8.1 Секция Contact

| Поле | Статус | Sanity | Примечание |
|------|--------|--------|------------|
| `eyebrow`, `title`, `description` | ✅ 📝🌍 | |
| `phoneLabel`, `emailLabel`, `locationTitle` | ✅ 📝🌍 | |
| `phone`, `email`, `address` | ✅ 🔄 | fallback на лендинге; канон → **siteSettings** |
| `messengers[].ariaLabel` | ✅ 📝🌍 | |
| `messengers[].href` | ✅ 🔄 | TG/WA/IG из **siteSettings** |

### 8.2 Форма (`landingPage.contactForm`)

| Поле | Статус | Примечание |
|------|--------|------------|
| labels, placeholders, submit | ✅ 📝🌍 | 3 документа; не `messages/` |
| validation messages | ✅ 📝🌍 | |

---

## 9. Site settings (`siteSettings` × 3)

| Поле | Статус | Примечание |
|------|--------|------------|
| `phone`, `phoneTelHref` | ✅ 📝 | validation `tel:` |
| `email` | ✅ 📝 | validation email |
| `address` | ✅ 📝🌍 | можно переводить per locale |
| Social URLs | ✅ 📝 | validation http(s) |
| Studio UX | ✅ | группы + «меняете здесь — обновится везде» |

См. [site-settings-merge.md](../checklists/site-settings-merge.md).

---

## 10. Каталог услуг (не секция лендинга, но влияет на главную и nav)

| Область | Статус | EN | UK | RU |
|---------|--------|----|----|-----|
| Category `title` / `description` | ✅ 🌍 | seed EN | из `uk.ts`/`ru.ts` preview | из `ru.ts` preview |
| `shortTitle` | ✅ | Injectables | Ін'єкції | Инъекции |
| Subcategory / procedure | ✅ EN only | seed | fallback EN | fallback EN |
| Цены в CMS | ✅ | `price` на procedure | | |
| Фото процедур | ⏳ | D.3 | | |
| Locale tabs в Studio | ⏳ | D.1 | | |

---

## 11. Legal (отдельные документы)

| Поле | Статус | Примечание |
|------|--------|------------|
| `legalPage` × 3 locales × 2 slugs | ✅ 📝🌍 | privacy + terms |
| Модель `sections[]` heading + body | ✅ | как согласовано |
| Studio UX (Privacy EN/UK/RU) | ⏳ | E.4 |

---

## 12. Сводка мапперов (бывшие баги)

| # | Было | Сейчас |
|---|------|--------|
| 1 | nav/hero CTA label не из CMS | ✅ `cta.label` + `primaryCtaLabel` |
| 2 | Ручные категории на лендинге | ✅ каталог + флаги 4/5 |
| 3 | Дубль контактов | ✅ siteSettings + merge doc |
| 4 | FAQ `items` + `groups` | ✅ только `groups` |
| 5 | Форма в messages | ✅ `contactForm` |
| 6 | Brand logos только static | ✅ CMS upload |
| 7 | Reviews без IG | ✅ `instagramSourceUrl` |
| 8 | SEO не в Sanity | ⏳ |
| 9 | Nav href presets | ⏳ |
| 10 | Goals → concerns | ⏳ фаза 2b |

---

## 13. CTA: короткая (nav) vs длинная (hero)

| Место | Статус | Sanity | Пример EN |
|-------|--------|--------|-----------|
| Header `nav.cta` | ✅ | `cta.label` | Consultation |
| Hero `primaryCta` | ✅ | `primaryCtaLabel` | Book a consultation |
| Hero `secondaryCta` | ✅ | `secondaryCtaLabel` | View treatments |

---

## 14. План контента EN → UK/RU

| Шаг | Статус | Действие |
|-----|--------|----------|
| 1 | ✅ | EN в схемах + статика |
| 2 | ⏳ | Seed prod + [part-5 checklist](../checklists/part-5-uk-ru.md) |
| 3 | ✅ | `landingPage` uk/ru + legal + category UK/RU в seed |
| 4 | ⏳ | Процедуры: перевод в Studio (`localeString.uk/ru`) |
| 5 | ⏳ | QA `/uk`, `/ru` |
| 6 | ⏳ | `messages/*` для cookie/a11y |

---

## 15. Закрыто (решения)

| Тема | Решение |
|------|---------|
| Homepage / nav categories | `featuredOnHomepage` (4), `featuredInNav` (5), `shortTitle` |
| Contact form | `landingPage.contactForm` |
| Reviews | Реальные имена + optional Instagram URL |
| Legal | Секции `heading` + `body` |
| Fallback UK/RU | EN если поле пустое |
| Concerns | [treatment-concerns-spec.md](./treatment-concerns-spec.md) — фаза 2b |

Журнал: [sanity-client-admin-roadmap.md](./sanity-client-admin-roadmap.md) §7.
