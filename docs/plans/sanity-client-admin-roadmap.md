# Roadmap: Sanity CMS и контент для клиента

**Цель:** админка, в которой владелец студии может **самостоятельно и без страха** править тексты, цены, услуги и юридические страницы на трёх языках (`en`, `uk`, `ru`).

**Статус документа:** согласовано — **можно выполнять по фазам** (§5, §8). Сводка решений: **§6**.

**Прогресс кода (2026-06-01):** выполнены **части 0–5** (см. §7 журнал). Ниже `[x]` = сделано в репозитории; `[ ]` = ещё впереди.

**Связанные документы:**

- [ADR 001 — i18n в Sanity](../adr/001-sanity-i18n-strategy.md)
- **[Матрица полей лендинга](./landing-sections-field-matrix.md)** — посекционный разбор EN/UK/RU и Sanity
- **[Treatment concerns](./treatment-concerns-spec.md)** — «Choose by goal» → справочник + флаги на процедурах

---

## 1. Критерии успеха (Definition of Done)

Считаем админку «готовой для клиента», когда:

- [ ] Редактор понимает **с чего начать** за 30 секунд (структура Studio улучшена частично — см. H.1).
- [x] Любое изменение на сайте делается **в одном ожидаемом месте** (категории: `serviceCategory`; контакты: `siteSettings`).
- [x] Ошибки ввода **ловятся в Studio** для части полей (флаги 4/5, tel/email/url, max reviews); мапперы с fallback.
- [x] Три языка: лендинг ×3, legal ×3, settings ×3; категории каталога с UK/RU (процедуры — EN + fallback).
- [ ] Есть **короткая инструкция для клиента** (1–2 страницы PDF/Notion или раздел в Studio).
- [x] Seed on production + webhook revalidate ([G.1](./../checklists/g2-post-seed-verification.md) §6, F.5 ✅); **preview** — F.6.

---

## 2. Текущее состояние (аудит)

### 2.1 Что уже есть

| Область | Sanity | Статика (`lib/content`, `lib/services`) | Примечание |
|--------|--------|----------------------------------------|------------|
| Лендинг (секции) | `landingPage` × 3 локали (document i18n) | `en.ts`, `uk.ts`, `ru.ts` + `faq/*` | `getLandingContent` → CMS или fallback |
| Site settings | `siteSettings` × 3 локали | `lib/content/shared.ts` (частично) | Телефон, соцсети, адрес |
| Legal | `legalPage` × 3 локали × 2 slug | `legal/en-pages.ts` | Тело legal в seed — EN; meta локализованы |
| Каталог услуг | `serviceCategory` / `Subcategory` / `Procedure` (field i18n) | `lib/services/catalog` + `categories/*` | `resolveServicesCatalog` |
| Studio structure | `sanity/structure/index.ts` | — | Дерево «Site / Services / Browse by category» |
| Seed | `pnpm seed:sanity` | Источник правды для первичного наполнения | Нужен write token |

### 2.2 Расхождения схема ↔ сайт

| Проблема | Статус | Примечание |
|----------|--------|------------|
| Флаги `featuredOnHomepage` / `featuredInNav` | ✅ Исправлено (ч.1) | На `serviceCategory`, max 4/5 |
| `shortTitle` для длинных названий в nav | ✅ Исправлено | `serviceCategory.shortTitle`, напр. Injectables |
| Категории на лендинге дублировали каталог | ✅ Исправлено (ч.1) | Превью из каталога, не `categories[]` |
| CTA hero/nav не из CMS | ✅ Исправлено (ч.2) | `primaryCtaLabel`, `nav.cta.label` |
| Форма в `messages/` | ✅ Исправлено (ч.2) | `landingPage.contactForm` |
| FAQ legacy `items` | ✅ Исправлено (ч.2) | Только `groups` |
| Brand logos только в `/public` | ✅ Исправлено (ч.3) | Upload в Studio + seed |
| Контакты в трёх местах | ✅ Частично (ч.4) | Канон в `siteSettings`, см. [site-settings-merge.md](../checklists/site-settings-merge.md) |
| **Goals** → keyword matching | ✅ Исправлено | `treatmentConcern` + `concerns[]`; chips с каталога |
| **Hero-фото** dev-only | ⏳ По дизайну | Не в CMS |
| **Галерея** — фото dev-only | ⏳ По дизайну | Тексты в CMS |
| **Nav** — presets для `href` | ⏳ Открыто | Dropdown из каталога есть, пресеты нет |
| **Legal** — UX 6 документов в Studio | ⏳ Открыто | E.4 |
| **HANDOFF.md** устарел | ⏳ Открыто | J.2 |
| Процедуры UK/RU в каталоге | ⏳ Частично (ч.5) | Только EN в CMS → fallback EN на `/uk` `/ru` |

### 2.3 Что клиенту **не должно** попадать в руки (пока не решим иначе)

- Slug / anchor ID без подсказок
- Поля `href` в свободной форме без пресетов (`#contact`, `/treatments/...`)
- Vision GROQ tool
- Дублирование одних и тех же контактов в 3 местах без «источника правды»

---

## 3. Принципы UX админки (согласовать)

Предлагаем зафиксировать до правок схем:

1. **Один источник правды на сущность** — например, телефон: `siteSettings` → подтягивается в contact/footer, а не копипаста.
2. **Связи вместо дублей** — превью категорий на лендинге → reference на `serviceCategory`, а не ручной `id`/`href`.
3. **Ограниченный выбор ссылок** — preset + валидация для внутренних якорей и `/treatments/...`.
4. **Plain language в Studio** — UI Studio на **английском**; подсказки к полям можно дублировать по-русски.
5. **«Безопасные зоны»** — hero-фото, галерея-слайдер, dev-credit: **только dev** (по согласованию).
6. **Slug** — автогенерация из EN-названия, **read-only** для Инны после создания (категории, процедуры, FAQ).
7. **Один источник правды для услуг** — `serviceCategory`; на главной **max 4** (`featuredOnHomepage`), в dropdown шапки — **max 5** (`featuredInNav`).
8. **Контент:** сначала идеальный **EN** в prod, затем отдельный этап профессионального перевода UK/RU (без staging dataset).
9. **CTA:** короткая подпись — header; длинная — hero primary; разные поля в Sanity (см. матрицу §13).
10. **UK/RU пусто** → fallback на EN на сайте.
11. **Форма контакта** — все строки (лейблы, placeholder, ошибки) в Sanity per locale, не в `messages/`.
12. **Отзывы** — реальные имена; опциональная ссылка на Instagram (post / highlight / reel).
13. **Treatment concerns** — справочник + привязка к процедурам; **картинка** на карточке hub (см. D2).

---

## 4. Пункты для проработки

### Блок A — Инвентаризация и границы контента

- [x] **A.1** Полный список полей лендинга → [landing-sections-field-matrix.md](./landing-sections-field-matrix.md) (каталог + legal — в следующих итерациях матрицы).
- [x] **A.2** **`lib/content/*.ts`**: вечный fallback (не удаляем).
- [x] **A.3** **`lib/services/**`**: вечный fallback + источник для seed.
- [x] **A.4** UK/RU: seed из `uk.ts` / `ru.ts` + категории каталога; процедуры EN → fallback на сайте.

### Блок B — Лендинг (`landingPage`)

- [ ] **B.1** Группы и порядок полей в Studio (уже есть groups — проверить с реальным сценарием редактирования).
- [x] **B.2** **Hero:** фото — **dev-only**; тексты/CTA в CMS (починить маппер `primaryCta.label`).
- [x] **B.3** **Nav:** dropdown treatments из каталога (`featuredInNav` + `shortTitle`). *Осталось: presets для `href`.*
- [x] **B.4** **About:** brand logos в CMS (upload + alt per locale); `/public/logos` — fallback при пустом CMS.
- [x] **B.5** **Services preview:** `serviceCategory` + `featuredOnHomepage` (**max 4**) + `featuredInNav` (**max 5**); убрать ручной `categories[]`; валидация в Studio.
- [x] **B.5b** Починить мапперы CTA: nav label + hero `primaryCtaLabel` из CMS (см. матрица §13).
- [x] **B.6** Чипы «by concern» на лендинге — из справочника `treatmentConcern` (фаза **2b**, не ручной `goals[]`).
- [x] **B.7** **Gallery:** тексты в CMS; фото слайдера — **dev-only**.
- [x] **B.8** **Reviews:** реальные `authorName`; `authorRole` / treatment tag; опционально `instagramSourceUrl`; подсказка про согласие клиента; max ~6–8.
- [x] **B.8b** UI: ссылка «View on Instagram» если URL задан (открывает post/highlight в IG).
- [x] **B.12** **Contact form copy:** перенос `ContactForm` из `messages/*` → Sanity (`contactForm` on `landingPage`).
- [x] **B.9** **FAQ:** убрать дубль `items` — только `groups`; stable `id` в Studio description.
- [x] **B.10** **Contact + Footer:** слияние с `siteSettings` — см. [site-settings-merge.md](../checklists/site-settings-merge.md).
- [ ] **B.11** Подсказки к полям (`description`) на языке редактора + примеры хороших текстов.

### Блок C — Site settings (`siteSettings`)

- [ ] **C.1** Расширить ли схему: часы работы, WhatsApp label, SEO defaults, favicon? *(не в Part 4)*
- [x] **C.2** Явная подпись в Studio: «Меняете телефон здесь — обновится везде».
- [x] **C.3** Валидация `tel:` / email / URL.

### Блок D — Каталог услуг (field i18n)

- [x] **D.1** Custom input для `localeString` / `localeText` (табы EN | UK | RU) — `sanity/components/locale-tabs-input.tsx`.
- [ ] **D.2** **Цены:** формат отображения (от/от €), опциональная цена, валюта только EUR?
- [ ] **D.3** **Изображения процедур:** Sanity assets + hotspot; alt на трёх языках.
- [ ] **D.4** Поля, которых нет в схеме, но есть в статике: duration, badges, contraindications — нужны ли клиенту?
- [ ] **D.5** **Studio structure:**  
  - улучшить «Browse by category» (редактирование процедур без 4 кликов);  
  - рассмотреть **Presentation** / orderable lists / `sanity-plugin-documents-pane`.
- [ ] **D.6** Запретить битые references (subcategory → category, procedure → subcategory).
- [ ] **D.7** Preview в списке: локаль редактора, цена, thumbnail.
- [ ] **D.8** Синхронизация slug: один slug на документ — документировать, что slug **не переводится**.
- [x] **D.9** Флаги на `serviceCategory`: `featuredOnHomepage` (**max 4**), `featuredInNav` (**max 5**); custom validation в Studio.

### Блок D2 — Treatment concerns (бывшие «goals»)

См. [treatment-concerns-spec.md](./treatment-concerns-spec.md).

- [x] **D2.1** Документ `treatmentConcern` (`localeString` title, slug автоген).
- [x] **D2.2** На `serviceProcedure`: `concerns[]` (references).
- [x] **D2.3** Убрать keyword scoring; hub + `?concern=` из явных связей Sanity `concerns[]`.
- [x] **D2.4** UI: сетка concerns на `/treatments` ✅; chips на лендинге из справочника — **B.6** ✅.
- [x] **D2.5** Seed + миграция с текущих `goal-*` (concern refs на процедурах).

### Блок E — Legal (`legalPage`)

- [x] **E.1** **Полный** текст legal на каждую локаль (EN, UK, RU).
- [x] **E.1b** Модель редактора: **оставить секции** `heading` + `body` (проще для клиента).
- [ ] **E.2** Упростить Portable Text для юриста (ограниченный набор стилей — уже почти так).
- [ ] **E.3** Шаблоны секций / locked blocks (например, «Data Controller») vs полная свобода.
- [ ] **E.4** Studio: кнопки «Privacy EN / UK / RU» без путаницы с document-i18n plugin.
- [ ] **E.5** Дата последнего обновления policy (опционально).

### Блок F — Схемы и технический контракт

- [x] **F.1** Флаги `featuredOnHomepage` / `featuredInNav` + `shortTitle` на `serviceCategory` (остальные поля схем — по мере фаз).
- [ ] **F.2** GROQ queries: покрытие всех полей, без over-fetch.
- [ ] **F.3** Мапперы: единые правила fallback (документировать в `lib/sanity/mappers/README` или в этом файле).
- [ ] **F.4** Типы `Sanity*Like` vs codegen (`sanity-typegen`) — нужен ли codegen.
- [x] **F.5** Revalidate: `POST /api/revalidate` + `revalidateSanityContent` (webhook on prod verified 2026-06-01).
- [ ] **F.6** Preview URL в Studio (draft mode) per locale.

### Блок G — Миграция и наполнение

- [x] **G.1** Прогон `pnpm seed:sanity` на **production** dataset (2026-06-01; бэкап — в командных заметках).
- [x] **G.2** Чеклист: [g2-post-seed-verification.md](../checklists/g2-post-seed-verification.md) + [part-5](../checklists/part-5-uk-ru.md) (лендинг UK/RU ✓; картинки — D.3).
- [ ] **G.3** План переключения prod: `isSanityConfigured` + env checklist (см. g2 §2–3).
- [ ] **G.4** Резервная копия dataset перед массовыми правками схем.

### Блок H — Документация для клиента

- [ ] **H.1** «Быстрый старт»: изменить цену процедуры, изменить отзыв, изменить FAQ.
- [ ] **H.2** «Что не трогать»: slugs, ID, технические поля.
- [ ] **H.3** Скринкасты или 3–5 GIF по частым задачам (опционально).
- [ ] **H.4** Контакт поддержки при поломке верстки/ссылки.

### Блок I — Качество и риски (non-functional)

- [ ] **I.1** Роли Sanity: Editor vs Developer (скрыть schema/raw).
- [ ] **I.2** Staging dataset для экспериментов клиента.
- [x] **I.3** Лимиты массивов: max **8** reviews (ч.2). *FAQ items limit — открыто.*
- [x] **I.4** Alt обязателен на `brandLogo` (ч.3). *Процедуры `serviceImage` — открыто (D.3).*

### Блок J — Порядок в репозитории (после контента, опционально)

*Не блокирует CMS, но снижает путаницу при разработке.*

- [x] **J.1** `lib/README.md` — куда смотреть: content vs services vs sanity (+ g2 source of truth).
- [ ] **J.2** Обновить `docs/HANDOFF.md` под реальность.
- [ ] **J.3** Перенос `services-faq`, misleading re-exports (отдельный PR).

---

## 5. Предлагаемые фазы

| Фаза | Статус | Фокус | Результат для клиента |
|------|--------|--------|------------------------|
| **0** | ✅ | Согласование A + принципы §3 + [part-0 checklist](../checklists/part-0-sanity-prep.md) | Границы зафиксированы |
| **1** | ✅ | Лендинг EN: флаги категорий, CTA, services из каталога | Главная + nav из CMS |
| **1c** | ✅ | Форма, отзывы+IG, FAQ | `contactForm`, reviews |
| **3** | ✅ | Brand logos в Studio | Инна загружает логотипы |
| **4** | ✅ | Site settings UX + merge doc | Телефон/URL в одном месте |
| **1b** | ✅ | UK/RU seed | [part-5 checklist](../checklists/part-5-uk-ru.md); процедуры EN fallback |
| **2** | ⏳ | D: цены, фото процедур, structure (D.1 tabs ✅) | Полный каталог в Studio |
| **2b** | ✅ | D2 treatment concerns | Hub + лендинг chips + CMS procedure links |
| **G** | ✅ | seed prod + g2 checklist | CMS = source of truth |
| **E+H** | ⏳ | Legal polish (E.2–E.5) + H быстрый старт | Инструкция для Инны |
| **G+F** | ⏳ | seed prod, revalidate, preview | Go-live |
| **J** | ⏳ | README, HANDOFF | Чище репо |

---

## 6. Сводка всех согласованных решений (чеклист)

| Тема | Решение |
|------|---------|
| Редактор | Только **Inna** |
| Studio UI | **English** |
| Dataset | Только **production** (бэкап перед seed) |
| Приоритет работ | **Лендинг → каталог/цены → legal** |
| Языки | Сначала **EN** в CMS, затем перевод **UK/RU**; на сайте fallback **EN** |
| Лендинг i18n | 3 документа `landingPage` (document i18n) |
| Каталог i18n | Field i18n на одном документе (`localeString`) |
| Legal | Полный текст × 3 локали; редактор **секции** `heading` + `body` |
| Hero / gallery photos | **Dev-only** (слайдер галереи позже) |
| Категории | Один источник — `serviceCategory` |
| Главная | `featuredOnHomepage` — **max 4** |
| Nav dropdown | `featuredInNav` — **max 5** |
| Slug | Автоген, read-only для Инны |
| CTA | Nav — короткая; Hero primary — длинная (`primaryCtaLabel`) |
| Concerns (быв. goals) | Справочник `treatmentConcern` + refs на процедурах; hub с **картинками** |
| Форма контакта | **`landingPage.contactForm`** (сделано) |
| `shortTitle` | Nav dropdown, напр. **Injectables** |
| Отзывы | **Реальные имена** + опциональная ссылка на Instagram |
| Форма / cookie / a11y UI | См. матрицу §0 — cookie и a11y пока в `messages/` |

---

## 6b. Отзывы и Instagram

### Что делаем

- В `reviewItem`: `authorName` (реальное имя или инициалы по согласию), `quote`, `authorRole`.
- Опционально: **`instagramSourceUrl`** — URL поста, Reel или **Highlight** (сохранённая story в подборке).
- На сайте: кнопка/ссылка «View on Instagram» рядом с отзывом, если URL заполнен.

### Что **не** делаем автоматически

- **Нельзя** «подтянуть» story из Instagram в Sanity без API/ручного копирования — Meta не даёт простой публичный feed для stories на сторонний сайт.
- **Нельзя** гарантировать ссылку на **истёкшую** story (24 ч) — только если Инна добавила в **Highlights** и вставила permalink.
- Встраивание story на страницу (iframe) — **не поддерживается** надёжно; только внешняя ссылка в новую вкладку / приложение IG.

### Workflow для Инны

1. Получить согласие клиента на публикацию имени и цитаты на сайте (короткая заметка в Studio).
2. Сохранить отзыв в Highlight → «Поделиться» → скопировать ссылку → вставить в `instagramSourceUrl`.
3. Альтернатива: ссылка на пост/Reel, если отзыв там.

---

## 6c. Форма контакта в Sanity

Переносим namespace **`ContactForm`** из `messages/{en,uk,ru}.json`:

- Лейблы полей, placeholders, текст кнопки submit.
- Сообщения валидации (`nameRequired`, `emailInvalid`, …).

**Размещение (предпочтение):** объект `contactForm` на **`landingPage`** (рядом с секцией Contact, тот же document i18n) **или** блок на `siteSettings` — решить в PR 1c; лендинг логичнее для копирайта формы.

**Код:** `contact-form.tsx` читает из `getLandingContent` / нового поля, не `useTranslations("ContactForm")`.

---

## 6d. Открытые вопросы

*На данный момент нет блокеров для фазы 1.*

| # | Вопрос | Статус |
|---|--------|--------|
| — | Cookie / Navigation strings в `messages/` | Оставить в next-intl (не блокер); при желании — фаза 2+ |

---

## 7. Журнал решений

| Дата | Решение | Автор |
|------|---------|-------|
| 2026-06-01 | Создан roadmap | — |
| 2026-06-01 | Редактор: Inna; Studio EN; hero/gallery images dev-only; 4 homepage categories from catalog; legal full i18n; priority landing→services→legal; prod only; EN first then translation pass | Inna / команда |
| 2026-06-01 | Добавлена [матрица полей лендинга](./landing-sections-field-matrix.md) | — |
| 2026-06-01 | Два флага категорий; legal секциями; fallback EN; CTA nav vs hero; [treatment concerns](./treatment-concerns-spec.md) | Inna / команда |
| 2026-06-01 | `featuredInNav` **max 5**; `featuredOnHomepage` max 4; форма → Sanity; concerns с картинками; отзывы — реальные имена + optional IG URL | Inna / команда |
| 2026-06-01 | A.2/A.3: статика — вечный fallback; Part 1: флаги категорий, homepage/nav из каталога | команда |
| 2026-06-01 | Part 2: CTA из CMS, contactForm на landingPage, reviews+IG, FAQ без legacy items | команда |
| 2026-06-01 | Part 3: brand logos upload в Studio, CMS-first mapper, seed assets | команда |
| 2026-06-01 | Part 4: site settings UX, validation, messenger URL merge, B.10 doc | команда |
| 2026-06-01 | Part 5: UK/RU seed — landing×3, category localeString, procedures EN-only fallback | команда |
| 2026-06-01 | [Матрица полей](./landing-sections-field-matrix.md) синхронизирована с частями 0–5 (колонка «Статус», закрытые баги мапперов) | команда |
| 2026-06-01 | G.1 seed на production; G.2 [g2-post-seed-verification.md](../checklists/g2-post-seed-verification.md); hub + concerns; лендинг UK/RU QA; картинки — D.3 | команда |
| 2026-06-01 | F.5 smoke: Studio publish → webhook → `/` обновляется (редактор) | команда |

---

## 8. Следующий шаг

**G.1–G.2:** seed prod ✅ — политика и чеклисты: [g2-post-seed-verification.md](../checklists/g2-post-seed-verification.md), [lib/README.md](../../lib/README.md).

**Дальше по приоритету:**

1. **B.6 + D2.3** — chips на лендинге из concerns; убрать keyword fallback.
2. **D.3** — изображения процедур/категорий в CMS (сейчас в основном `/public`).
3. **F.5–F.6 + H.1** — revalidate, preview, быстрый старт для Инны.

*Отдельно (не блокер):* B.3 presets `href`, B.11 подсказки, E.4 legal UX, J.2 HANDOFF.
