# Roadmap: Sanity CMS и контент для клиента

**Цель:** админка, в которой владелец студии может **самостоятельно и без страха** править тексты, цены, услуги и юридические страницы на трёх языках (`en`, `uk`, `ru`).

**Статус документа:** согласование с заказчиком — **код и схемы пока не меняем**, только план.

**Связанные документы:**

- [ADR 001 — i18n в Sanity](../adr/001-sanity-i18n-strategy.md)
- **[Матрица полей лендинга](./landing-sections-field-matrix.md)** — посекционный разбор EN/UK/RU и Sanity
- **[Treatment concerns](./treatment-concerns-spec.md)** — «Choose by goal» → справочник + флаги на процедурах

---

## 1. Критерии успеха (Definition of Done)

Считаем админку «готовой для клиента», когда:

- [ ] Редактор понимает **с чего начать** за 30 секунд (понятная структура Studio, без «сырых» технических полей).
- [ ] Любое изменение на сайте делается **в одном ожидаемом месте** (нет дублирования «категория в услугах» vs «карточка на главной» без объяснения).
- [ ] Ошибки ввода **ловятся в Studio** (валидация, подсказки), а не ломают прод (мапперы по-прежнему с fallback).
- [ ] Три языка: понятно, **где править EN/UK/RU** для лендинга/legal/settings и для каталога услуг.
- [ ] Есть **короткая инструкция для клиента** (1–2 страницы PDF/Notion или раздел в Studio).
- [ ] Seed + preview/revalidate: клиент видит изменения на сайте предсказуемо.

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

### 2.2 Расхождения схема ↔ сайт (важно для плана)

| Проблема | Где в коде | Влияние на клиента |
|----------|------------|-------------------|
| **`featuredInNav`** / **`featuredOnHomepage`** в статике, **нет на `serviceCategory`** | `lib/types/content.ts` | Два флага на категории каталога (см. §7) |
| **Goals** — keyword matching в коде, чипы на лендинге | `lib/services-goals.ts` | Заменить на `treatmentConcern` + refs на процедурах (фаза 2b) |
| **Hero-фото** только в коде | `lib/content/shared.ts`, комментарий в `landing-hero-section.ts` | Клиент не меняет главное фото без разработчика |
| **Галерея — только заголовки в CMS**; 6 фото захардкожены | `gallery-section.tsx` | Клиент не меняет фото галереи |
| **Категории на лендинге** дублируют каталог (ручные `id`/`href`) | `landing.services.categories` | Риск рассинхрона slug/ссылок при правке каталога |
| **FAQ: `groups` + `items`** | Схема помечает `items` как legacy | Путаница: что править, что использует treatments FAQ |
| **Nav dropdown** собирается кодом из `featuredInNav` + каталога | `lib/nav/build-nav-links.ts` | В CMS нет явного «меню процедур» |
| **Legal document i18n** отключён намеренно | `sanity.config.ts` | 6 отдельных документов — ок, но нужен UX «переводы» |
| **HANDOFF.md** устарел | `docs/HANDOFF.md` | Вводит в заблуждение команду/клиента |

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
- [ ] **A.2** Решить судьбу **`lib/content/*.ts`**: вечный fallback, только seed, или удалить после миграции.
- [ ] **A.3** Решить судьбу **`lib/services/**`**: то же для каталога.
- [ ] **A.4** Матрица языков: кто переводит UK/RU (клиент, переводчик, вы)?

### Блок B — Лендинг (`landingPage`)

- [ ] **B.1** Группы и порядок полей в Studio (уже есть groups — проверить с реальным сценарием редактирования).
- [x] **B.2** **Hero:** фото — **dev-only**; тексты/CTA в CMS (починить маппер `primaryCta.label`).
- [ ] **B.3** **Nav:** presets для ссылок; dropdown treatments **автоматически** из каталога.
- [ ] **B.4** **About:** brand logos — файлы dev или CMS; **alt** переводится.
- [ ] **B.5** **Services preview:** `serviceCategory` + `featuredOnHomepage` (**max 4**) + `featuredInNav` (**max 5**); убрать ручной `categories[]`; валидация в Studio.
- [ ] **B.5b** Починить мапперы CTA: nav label + hero `primaryCtaLabel` из CMS (см. матрица §13).
- [ ] **B.6** Чипы «by concern» на лендинге — из справочника `treatmentConcern` (фаза **2b**, не ручной `goals[]`).
- [x] **B.7** **Gallery:** тексты в CMS; фото слайдера — **dev-only**.
- [ ] **B.8** **Reviews:** реальные `authorName`; `authorRole` / treatment tag; опционально `instagramSourceUrl`; подсказка про согласие клиента; max ~6–8.
- [ ] **B.8b** UI: ссылка «View on Instagram» если URL задан (открывает post/highlight в IG).
- [ ] **B.12** **Contact form copy:** перенос `ContactForm` из `messages/*` → Sanity (`contactForm` object на `landingPage` или `siteSettings` per locale).
- [ ] **B.9** **FAQ:** убрать дубль `items` vs только `groups`; правила stable `id` для matching на treatments.
- [ ] **B.10** **Contact + Footer:** слияние с `siteSettings`, какие поля override на лендинге.
- [ ] **B.11** Подсказки к полям (`description`) на языке редактора + примеры хороших текстов.

### Блок C — Site settings (`siteSettings`)

- [ ] **C.1** Расширить ли схему: часы работы, WhatsApp label, SEO defaults, favicon?
- [ ] **C.2** Явная подпись в Studio: «Меняете телефон здесь — обновится везде».
- [ ] **C.3** Валидация `tel:` / `mailto:` / URL.

### Блок D — Каталог услуг (field i18n)

- [ ] **D.1** Custom input для `localeString` / `localeText` (табы EN | UK | RU вместо трёх полей в столбик) — плагин или свой компонент.
- [ ] **D.2** **Цены:** формат отображения (от/от €), опциональная цена, валюта только EUR?
- [ ] **D.3** **Изображения процедур:** Sanity assets + hotspot; alt на трёх языках.
- [ ] **D.4** Поля, которых нет в схеме, но есть в статике: duration, badges, contraindications — нужны ли клиенту?
- [ ] **D.5** **Studio structure:**  
  - улучшить «Browse by category» (редактирование процедур без 4 кликов);  
  - рассмотреть **Presentation** / orderable lists / `sanity-plugin-documents-pane`.
- [ ] **D.6** Запретить битые references (subcategory → category, procedure → subcategory).
- [ ] **D.7** Preview в списке: локаль редактора, цена, thumbnail.
- [ ] **D.8** Синхронизация slug: один slug на документ — документировать, что slug **не переводится**.
- [ ] **D.9** Флаги на `serviceCategory`: `featuredOnHomepage` (**max 4**), `featuredInNav` (**max 5**); custom validation в Studio.

### Блок D2 — Treatment concerns (бывшие «goals»)

См. [treatment-concerns-spec.md](./treatment-concerns-spec.md).

- [ ] **D2.1** Документ `treatmentConcern` (`localeString` title, slug автоген).
- [ ] **D2.2** На `serviceProcedure`: `concerns[]` (references).
- [ ] **D2.3** Убрать keyword scoring; hub + `?concern=` из явных связей.
- [ ] **D2.4** UI: сетка concerns на `/treatments` **с изображением**; chips на лендинге из справочника.
- [ ] **D2.5** Seed + миграция с текущих `goal-*`.

### Блок E — Legal (`legalPage`)

- [x] **E.1** **Полный** текст legal на каждую локаль (EN, UK, RU).
- [x] **E.1b** Модель редактора: **оставить секции** `heading` + `body` (проще для клиента).
- [ ] **E.2** Упростить Portable Text для юриста (ограниченный набор стилей — уже почти так).
- [ ] **E.3** Шаблоны секций / locked blocks (например, «Data Controller») vs полная свобода.
- [ ] **E.4** Studio: кнопки «Privacy EN / UK / RU» без путаницы с document-i18n plugin.
- [ ] **E.5** Дата последнего обновления policy (опционально).

### Блок F — Схемы и технический контракт

- [ ] **F.1** Добавить недостающие поля в схемы (`featuredInNav`, и др. из A.1).
- [ ] **F.2** GROQ queries: покрытие всех полей, без over-fetch.
- [ ] **F.3** Мапперы: единые правила fallback (документировать в `lib/sanity/mappers/README` или в этом файле).
- [ ] **F.4** Типы `Sanity*Like` vs codegen (`sanity-typegen`) — нужен ли codegen.
- [ ] **F.5** Revalidate: webhook, какие документы инвалидируют какие теги.
- [ ] **F.6** Preview URL в Studio (draft mode) per locale.

### Блок G — Миграция и наполнение

- [ ] **G.1** Прогон `pnpm seed:sanity` на **production** dataset (staging нет — бэкап перед seed).
- [ ] **G.2** Чеклист сравнения: статика vs CMS после seed (секция за секцией).
- [ ] **G.3** План переключения prod: `isSanityConfigured` + env checklist.
- [ ] **G.4** Резервная копия dataset перед массовыми правками схем.

### Блок H — Документация для клиента

- [ ] **H.1** «Быстрый старт»: изменить цену процедуры, изменить отзыв, изменить FAQ.
- [ ] **H.2** «Что не трогать»: slugs, ID, технические поля.
- [ ] **H.3** Скринкасты или 3–5 GIF по частым задачам (опционально).
- [ ] **H.4** Контакт поддержки при поломке верстки/ссылки.

### Блок I — Качество и риски (non-functional)

- [ ] **I.1** Роли Sanity: Editor vs Developer (скрыть schema/raw).
- [ ] **I.2** Staging dataset для экспериментов клиента.
- [ ] **I.3** Лимиты массивов (max reviews, max FAQ items).
- [ ] **I.4** Accessibility: alt-тексты обязательны для загружаемых изображений.

### Блок J — Порядок в репозитории (после контента, опционально)

*Не блокирует CMS, но снижает путаницу при разработке.*

- [ ] **J.1** `lib/README.md` — куда смотреть: content vs services vs sanity.
- [ ] **J.2** Обновить `docs/HANDOFF.md` под реальность.
- [ ] **J.3** Перенос `services-faq`, misleading re-exports (отдельный PR).

---

## 5. Предлагаемые фазы

| Фаза | Фокус | Результат для клиента |
|------|--------|------------------------|
| **0** | Согласование A + принципы §3 + матрица лендинга | Зафиксированы границы |
| **1** | **Лендинг EN** в Sanity: B + C + F.1, починить мапперы | Инна правит главную на EN |
| **1b** | Перевод UK/RU лендинга (по чеклисту матрицы) | `/uk`, `/ru` без дыр |
| **2** | D (каталог) + flags + slug | Цены, процедуры; 4 на главной, 5 в nav dropdown |
| **1c** | B.12 форма в Sanity (можно вместе с 1 или 1b) | Инна правит подписи формы |
| **2b** | D2 treatment concerns | Инна привязывает процедуры к concerns; hub «Browse by concern» |
| **3** | E (legal, полный текст × 3) + H | Policy/terms |
| **4** | G + F.5–F.6 (seed, preview, prod) | Go-live |
| **5** | J (опционально) | Чище репо |

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
| Форма контакта | **Перенести в Sanity** (не `messages/`) |
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

---

## 8. Следующий шаг

**PR 1:** схемы + Studio — лендинг EN, флаги категорий (4/5), CTA-мапперы, reviews + IG URL, contact form object.  
**PR 2:** мапперы + GROQ + UI wiring.  
**PR 3:** seed prod + чеклист EN.  
**PR 4:** перевод UK/RU.  
**PR 5 (фаза 2/2b):** каталог, concerns, hub UI.
