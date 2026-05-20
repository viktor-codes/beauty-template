# Handoff: The Skinbar (beauty-template) — состояние и backlog

**Дата:** 2026-05-20  
**Репозиторий:** `/Users/a123/Freelance Projects/beauty-template`  
**Хостинг:** Vercel  
**Язык ответов агенту:** русский. **Код:** английский.

---

## 1. Цель продукта

Лендинг косметологии (The Skinbar · Inna Chernovol) с:

- **3 локали:** `en` (default, без префикса), `uk`, `ru` — `next-intl`
- **CMS:** Sanity (Studio в `sanity/`)
- **Позже:** gift voucher modal + Stripe, contact form → Resend
- **Правила:** `AGENTS.md`, ADR `docs/adr/001-sanity-i18n-strategy.md`

Пользователь **сам коммитит** в git — агент не коммитит без явной просьбы.

---

## 2. Что уже сделано

### Фаза 0 — подготовка ✅

| Шаг | Содержание                                        |
| --- | ------------------------------------------------- |
| 0.1 | `.env.example` (Sanity, Stripe, Resend, site URL) |
| 0.2 | `next-intl` в dependencies                        |
| 0.3 | README: quick start, locales, Sanity, Stripe      |

### Фаза 1 — i18n ✅

| Шаг | Содержание                                                                                               |
| --- | -------------------------------------------------------------------------------------------------------- |
| 1.1 | `i18n/routing.ts`, `i18n/request.ts`, `i18n/navigation.ts`, `withNextIntl` в `next.config.ts`            |
| 1.2 | `messages/{en,uk,ru}.json` — UI: cookie, contact form, navigation, accessibility                         |
| 1.3 | `proxy.ts` (Next.js 16), `app/[locale]/…`, `NextIntlClientProvider`, `app/sitemap.ts`, hreflang в layout |
| —   | Локализованный **лендинг-контент** в `lib/content/{en,uk,ru}.ts` + `lib/content/faq/`                    |
| —   | `getLandingContent(locale)` — статика, не CMS                                                            |
| —   | Внутренние ссылки: `@/i18n/navigation` (`Link`)                                                          |

**Не переведено через CMS (ожидаемо):** `lib/services.ts` (~1000 строк, EN), legal pages (privacy/terms) — статичный React.

### Фаза 2 — Sanity (частично) 🟡

| Сделано                                                                                            | Не сделано                                                        |
| -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Каркас `sanity/`: config, schemas, structure                                                       | `@sanity/client` в Next root `package.json`                       |
| `lib/sanity/env.ts`, mappers (`safe`, `landing`, `services`)                                       | `lib/sanity/client.ts`                                            |
| ADR document vs field i18n                                                                         | `lib/sanity/queries/*.ts`                                         |
| `pnpm-workspace.yaml` включает `sanity`                                                            | GROQ fetch + переключение `getLandingContent` / catalog           |
| Studio deps установлены (user), `.env` в `sanity/`                                                 | Seed/migration скрипт статики → Sanity                            |
| Схемы: `landingPage`, `siteSettings`, `serviceCategory/Subcategory/Procedure`, `localeString/Text` | Схема `legalPage`, полные поля в `landingPage` (только hero stub) |
|                                                                                                    | `app/api/revalidate` webhook                                      |
|                                                                                                    | `next.config` remotePatterns `cdn.sanity.io`                      |

**Сайт сейчас не читает Sanity API** — все страницы импортируют `getLandingContent` из `@/lib/content`.

---

## 3. Архитектура (обязательно соблюдать)

### 3.1 i18n в Sanity (ADR 001)

| Контент                                                       | Стратегия                                          | Файлы                                                               |
| ------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------- |
| `landingPage`, `siteSettings` (+ будущий `legalPage`)         | **Document i18n** — отдельный документ на язык     | `@sanity/document-internationalization` в `sanity/sanity.config.ts` |
| `serviceCategory` → `serviceSubcategory` → `serviceProcedure` | **Field i18n** — один `_id`, поля `{ en, uk, ru }` | `localeString`, `localeText` в `sanity/schemaTypes/objects/`        |

**Не использовать document i18n для services tree** — иначе разные `_id` и hell с `reference` filters.

### 3.2 Слой данных Next.js

```
Page / Server Component
  → getLandingContent(locale)     // публичный API (сейчас lib/content/index.ts)
  → [будущее] fetch + mapLandingPageSafe
  → LandingContent (lib/types/content.ts)

Services pages
  → servicesCatalog из lib/services.ts  // [будущее] getServicesCatalog(locale)
  → ServicesCatalog (lib/types/services.ts)
```

**Мапперы:** `lib/sanity/mappers/` — всегда fallback на статику, никогда не throw на missing image/fields.  
**Хелперы:** `readLocalizedValue`, `pickLocaleField` в `lib/i18n/pick-locale-field.ts`.

### 3.3 Структура репозитория

```
app/
  [locale]/           # все routes
  layout.tsx          # pass-through + globals.css
  sitemap.ts
  api/                # [TODO] stripe, revalidate
components/sections/
i18n/
lib/
  content/            # статический fallback (en, uk, ru)
  sanity/             # client, queries, mappers, fetch
  services.ts         # статический каталог
  types/
messages/
sanity/               # Studio (отдельный package.json)
docs/adr/
docs/HANDOFF.md       # этот файл
proxy.ts
```

---

## 4. Environment variables

### Next (`.env.local` — корень)

| Variable                         | Назначение                  |
| -------------------------------- | --------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | Canonical URL               |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`  | GA4 (optional)              |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Sanity project              |
| `NEXT_PUBLIC_SANITY_DATASET`     | e.g. `production`           |
| `NEXT_PUBLIC_SANITY_API_VERSION` | e.g. `2025-05-05`           |
| `SANITY_API_READ_TOKEN`          | Server read (draft/private) |
| `SANITY_REVALIDATE_SECRET`       | Webhook revalidation        |
| `STRIPE_*`, `RESEND_*`           | Фазы 5–6                    |

### Studio (`sanity/.env`)

| Variable                   | Назначение   |
| -------------------------- | ------------ |
| `SANITY_STUDIO_PROJECT_ID` | = project id |
| `SANITY_STUDIO_DATASET`    | = dataset    |

**User:** Studio `.env` заполнен, project создан.

### Команды

```bash
pnpm install          # корень — Next + workspace sanity
pnpm dev              # Next http://localhost:3000
pnpm studio           # Sanity Studio
```

Если `pnpm install` в `sanity/` мгновенный — ставить из **корня** (см. `pnpm-workspace.yaml`).

---

## 5. Backlog — что осталось (по фазам)

### Фаза 2.2b — Sanity client + queries (следующий логичный шаг)

**Цель:** подключить API без смены UI-контрактов.

- [ ] `pnpm add @sanity/client @sanity/image-url` (корень)
- [ ] `lib/sanity/client.ts` — read client, `useCdn: true` in prod
- [ ] `lib/sanity/image.ts` — `urlFor` helper
- [ ] `lib/sanity/queries/fragments.ts`, `landing.ts`, `services.ts`
- [ ] `next.config.ts` — `images.remotePatterns` → `cdn.sanity.io`
- [ ] Рефактор `lib/content/index.ts`:

  ```ts
  export async function getLandingContent(
    locale: AppLocale,
  ): Promise<LandingContent> {
    if (!isSanityConfigured()) return staticLanding(locale);
    const raw = await fetchLandingPage(locale); // document i18n: language == locale
    return mapLandingPageSafe(raw, locale);
  }
  ```

- [ ] Обновить callers на `await getLandingContent` (pages/layouts async уже mostly ok)
- [ ] **Коммит:** `feat(cms): add sanity client and query layer`

**GROQ hints:**

- Landing (document i18n): `*[_type == "landingPage" && language == $locale][0]`
- Services: join categories → subcategories → procedures by reference; map with `mapServicesCatalogSafe(raw, locale)`

---

### Фаза 3 — миграция контента в Sanity (по секциям)

Каждый шаг = seed + переключение fetch + проверка 3 локалей. Статику не удалять до полной миграции.

| Шаг | Коммит (пример)                                    | Задачи                                                                                                                                                                 |
| --- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.0 | `feat(cms): extend landing and settings schemas`   | Расширить `landingPage` schema: nav, about, services preview, gallery, reviews, faq, contact, footer. `siteSettings`. Опционально seed script `scripts/seed-sanity.ts` |
| 3.1 | `feat(cms): load site chrome from sanity`          | settings + nav/footer                                                                                                                                                  |
| 3.2 | `feat(cms): load hero and about from sanity`       |                                                                                                                                                                        |
| 3.3 | `feat(cms): load marketing sections from sanity`   | reviews, gallery, faq                                                                                                                                                  |
| 3.4 | `feat(cms): load services catalog from sanity`     | `getServicesCatalog(locale)`, заменить `lib/services.ts` usage; GROQ tree                                                                                              |
| 3.5 | `feat(cms): load legal pages from sanity`          | schema `legalPage` (document i18n), перенести privacy/terms                                                                                                            |
| 3.6 | `refactor: remove migrated static content modules` | Удалить лишнее из `lib/content/`, `lib/services.ts` когда всё в CMS                                                                                                    |

**FAQ на /services:** `lib/services-faq.ts` уже берёт FAQ из `getLandingContent(locale)` — заработает на CMS автоматически после 3.3.

---

### Фаза 3b — Studio & DX

- [ ] `sanity-plugin-media` (optional)
- [ ] `app/api/revalidate/route.ts` + Sanity webhook
- [ ] Preview URL / draft mode (optional)
- [ ] Deploy Studio: `pnpm --dir sanity deploy` → `*.sanity.studio`

---

### Фаза 4 — Gift voucher modal

- [ ] Schema `giftVoucher` в Sanity (номиналы, copy, image)
- [ ] `gift-voucher-modal.tsx` + trigger в header/footer
- [ ] Локализация: messages + CMS fields

**Коммит:** `feat(ui): add gift voucher modal`

---

### Фаза 5 — Stripe

- [ ] `pnpm add stripe`
- [ ] `lib/stripe.ts`, `app/api/stripe/checkout/route.ts`
- [ ] `app/api/stripe/webhook/route.ts`
- [ ] Wire modal CTA → Checkout Session
- [ ] Env в Vercel

**Коммиты:** checkout endpoint → UI wire → webhook

---

### Фаза 6 — Resend (optional)

- [ ] Server Action + `resend` для `ContactForm`
- [ ] `RESEND_*` env

---

## 6. Ключевые файлы для нового агента

| Задача            | Файлы                                                     |
| ----------------- | --------------------------------------------------------- |
| Routing / locales | `i18n/routing.ts`, `proxy.ts`, `app/[locale]/layout.tsx`  |
| UI strings        | `messages/*.json`, `i18n/request.ts`                      |
| Static content    | `lib/content/index.ts`, `lib/content/{en,uk,ru}.ts`       |
| Services static   | `lib/services.ts`, `lib/types/services.ts`                |
| Sanity Studio     | `sanity/sanity.config.ts`, `sanity/schemaTypes/`          |
| Mappers           | `lib/sanity/mappers/safe.ts`, `landing.ts`, `services.ts` |
| Types contract    | `lib/types/content.ts`                                    |
| ADR               | `docs/adr/001-sanity-i18n-strategy.md`                    |

---

## 7. Подводные камни (прочитать перед кодом)

1. **Next.js 16:** middleware → `proxy.ts`, export `function proxy`.
2. **Document i18n только для landing/settings/legal** — не для services references.
3. **`getLandingContent` сейчас синхронный** — при CMS станет `async`; проверить все imports.
4. **Мапперы:** missing image → `/hero.webp`, не throw.
5. **`readLocalizedValue`:** document-level strings (plain `string`) vs field-level (`{en,uk,ru}`).
6. **Slugs services:** сохранить текущие id (`aesthetic-treatments`, …) в `slug.current` для URL parity.
7. **Не ставить библиотеки без согласия** — кроме уже запланированных Sanity/Stripe/Resend.
8. **Коммиты:** Conventional Commits, пользователь коммитит сам.

---

## 8. Проверка после каждого шага

```bash
pnpm build
pnpm dev
# / → en, /uk → uk UI + uk landing copy
# /ru → ru
pnpm studio   # Studio opens, schemas visible
```

---

## 9. Рекомендуемый порядок для нового агента

1. Прочитать `docs/adr/001-sanity-i18n-strategy.md` + этот HANDOFF.
2. **Фаза 2.2b** — client + queries + async `getLandingContent` с fallback.
3. Расширить schemas + **seed** одной секции (hero) — проверить E2E на `/uk`.
4. **Фаза 3** по таблице секций.
5. Фазы 4–6 по запросу пользователя.

---

## 10. Открытые вопросы к заказчику

- [ ] Нужен ли preview/draft mode в MVP?
- [ ] Legal pages в CMS или остаются в коде?
- [ ] Gift voucher: фиксированные номиналы или произвольная сумма в Stripe?
- [ ] Деплой Studio: subdomain или `sanity.studio` hosted?

---

_Конец handoff._
