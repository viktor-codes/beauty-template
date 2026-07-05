# Передача проекта The Skinbar — полная инструкция

**Дата:** 4 июля 2026  
**Сайт:** The Skinbar · Inna Chernovol  
**Стек:** Next.js 16 · Sanity CMS · Stripe · Resend · Telegram · Vercel  
**Языки сайта:** English (основной), Ukrainian, Russian

---

## Содержание

1. [Чеклист разработчика перед сдачей](#1-чеклист-разработчика-перед-сдачей)
2. [Что нужно зарегистрировать и подключить (обзор)](#2-что-нужно-зарегистрировать-и-подключить-обзор)
3. [Vercel — хостинг и домен](#3-vercel--хостинг-и-домен)
4. [Sanity CMS — контент и админка](#4-sanity-cms--контент-и-админка)
5. [Stripe — оплата подарочных ваучеров](#5-stripe--оплата-подарочных-ваучеров)
6. [Resend — email с ваучерами](#6-resend--email-с-ваучерами)
7. [Telegram — уведомления с формы контактов](#7-telegram--уведомления-с-формы-контактов)
8. [Google Analytics и Search Console](#8-google-analytics-и-search-console)
9. [Переменные окружения — полная таблица](#9-переменные-окружения--полная-таблица)
10. [Инструкция для клиента: как пользоваться сайтом](#10-инструкция-для-клиента-как-пользоваться-сайтом)
11. [Тестирование перед запуском](#11-тестирование-перед-запуском)
12. [Текст о проделанной работе (для клиента)](#12-текст-о-проделанной-работе-для-кliента)
13. [Советы по продвижению сайта](#13-советы-по-продвижению-сайта)
14. [Поддержка и типичные проблемы](#14-поддержка-и-типичные-проблемы)

---

## 1. Чеклист разработчика перед сдачей

Выполни **до** передачи доступов клиенту.

### 1.1 Аккаунты и доступы

- [ ] **Vercel:** проект задеплоен, домен клиента подключён, все env vars заполнены в Production
- [ ] **Sanity:** проект создан, клиент приглашён как **Editor** (или Administrator)
- [ ] **Sanity Studio:** задеплоен на `*.sanity.studio` (`pnpm --dir sanity deploy`) или клиент знает, как запускать локально
- [ ] **Stripe:** webhook на production URL настроен, тестовая покупка ваучера прошла end-to-end
- [ ] **Resend:** домен верифицирован, тестовое письмо с ваучером получено
- [ ] **Telegram:** бот создан, сообщения с формы контактов приходят в чат/группу клиента
- [ ] **Google Analytics 4:** property создан, `NEXT_PUBLIC_GA_MEASUREMENT_ID` в Vercel
- [ ] **Google Search Console:** сайт добавлен, sitemap отправлен (`/sitemap.xml`)

### 1.2 Передача клиенту (файл / письмо)

- [ ] Список всех сервисов с логинами (или инструкция «зарегистрируйтесь сами по этой инструкции»)
- [ ] `.env.example` — клиент **не** получает секреты в открытом виде по email; только через Vercel / 1Password / Bitwarden
- [ ] Ссылка на Sanity Studio (hosted)
- [ ] Ссылка на Vercel dashboard (если клиент — владелец проекта)
- [ ] Краткая видео- или скрин-инструкция: «как изменить цену процедуры в Sanity» (5 мин)

### 1.3 Финальная проверка

- [ ] `NEXT_PUBLIC_SITE_URL` = финальный домен (без `/` в конце)
- [ ] Stripe в **live mode** (не test keys) — только когда клиент готов принимать реальные платежи
- [ ] Cookie-баннер работает, GA грузится только после согласия
- [ ] `/`, `/treatments`, `/gift-voucher`, `/privacy`, `/terms` — на EN, UK, RU
- [ ] Publish в Sanity → сайт обновляется (webhook revalidate)

---

## 2. Что нужно зарегистрировать и подключить (обзор)

| Сервис | Зачем | Кто владелец аккаунта | Платно? |
|--------|-------|----------------------|---------|
| **Vercel** | Хостинг Next.js сайта | Клиент (рекомендуется) | Free tier достаточно для старта |
| **Домен** (registrar) | `theskinbar.ie` или аналог | Клиент | ~€10–15/год |
| **Sanity** | CMS — тексты, цены, процедуры, legal | Клиент | Free до ~100k API requests/мес |
| **Stripe** | Оплата gift voucher | Клиент (юр. лицо / sole trader) | Комиссия ~1.4% + €0.25 (EU cards) |
| **Resend** | Email ваучеров покупателю и дарителю | Клиент | Free 100 emails/день |
| **Telegram Bot** | Уведомления с формы «Связаться» | Клиент | Бесплатно |
| **Google Analytics 4** | Статистика посещений | Клиент | Бесплатно |
| **Google Search Console** | Индексация в Google | Клиент | Бесплатно |
| **Google Business Profile** | Карта, отзывы, локальный SEO | Клиент | Бесплатно |

### Что вы могли упустить (важно!)

1. **Telegram для контактной формы** — форма **не** отправляет email через Resend. Она шлёт сообщение в Telegram. Без бота форма вернёт ошибку.
2. **`SANITY_API_WRITE_TOKEN`** — без него gift voucher checkout не создаст заказ в CMS.
3. **Webhook Sanity → `/api/revalidate`** — без него изменения в Studio появятся на сайте с задержкой (до следующего деплоя / ISR).
4. **`NEXT_PUBLIC_SITE_URL`** — без него ломаются Stripe redirect, sitemap, OG-теги, email-ссылки.
5. **DNS для Resend** (SPF, DKIM, DMARC) — без верификации домена письма с ваучерами не уйдут или попадут в spam.
6. **Stripe business verification** — для live payments Stripe запросит документы (может занять 1–7 дней).
7. **Google Business Profile** — критично для локального бизнеса (клиника), отдельно от сайта.
8. **Sanity Studio deploy** — клиенту нужна **веб-ссылка** на админку, не только `pnpm studio` на вашем ноутбуке.
9. **Резервное копирование Sanity** — экспорт dataset перед крупными правками.
10. **`RESEND_TO_EMAIL` в `.env.example`** — **не используется** в коде. Контакты идут в Telegram. Можно удалить из env или реализовать позже.

---

## 3. Vercel — хостинг и домен

### 3.1 Создание проекта (для клиента или от вашего имени с передачей)

1. Зайти на [vercel.com](https://vercel.com), зарегистрироваться через GitHub.
2. **Add New → Project** → подключить GitHub-репозиторий `beauty-template`.
3. Framework Preset: **Next.js** (определится автоматически).
4. Build Command: `pnpm build`  
   Install Command: `pnpm install`
5. Deploy.

### 3.2 Подключение домена

1. Vercel → Project → **Settings → Domains**.
2. Добавить домен, например `theskinbar.ie` и `www.theskinbar.ie`.
3. Vercel покажет DNS-записи. В панели регистратора домена добавить:
   - **A record** `@` → `76.76.21.21` (или CNAME как укажет Vercel)
   - **CNAME** `www` → `cname.vercel-dns.com`
4. Дождаться SSL (обычно 5–30 минут).
5. В **Environment Variables** добавить:

```
NEXT_PUBLIC_SITE_URL=https://theskinbar.ie
```

(без trailing slash)

### 3.3 Environment Variables в Vercel

Settings → Environment Variables → добавить **все** переменные из раздела 9 для **Production** (и Preview, если нужно).

После изменения env → **Redeploy** последнего деплоя.

---

## 4. Sanity CMS — контент и админка

### 4.1 Регистрация проекта

1. [sanity.io/manage](https://www.sanity.io/manage) → Create project.
2. Название: **The Skinbar**.
3. Dataset: **`production`** (не менять без необходимости).
4. Записать **Project ID** (например `abc123xy`).

### 4.2 API Tokens (критично)

Sanity → Project → **API → Tokens**:

| Token | Role | Где используется |
|-------|------|------------------|
| Read token (Viewer) | Viewer | `SANITY_API_READ_TOKEN` — опционально для draft |
| Write token (Editor) | Editor | `SANITY_API_WRITE_TOKEN` — **обязателен** для gift voucher orders |
| — | — | `SANITY_REVALIDATE_SECRET` — **не** токен Sanity; сгенерируй сам (32+ random chars) |

**Никогда** не публикуй write token в клиентском коде или GitHub.

### 4.3 Приглашение клиента

1. Sanity → Project → **Members → Invite**.
2. Email клиента → Role: **Editor** (может редактировать контент, не ломает схему).
3. Клиент входит через Google/GitHub — **отдельный email для Sanity не нужен**, нужен только аккаунт.

### 4.4 Деплой Sanity Studio (веб-админка)

Из корня репозитория (с заполненным `sanity/.env`):

```bash
cp sanity/.env.example sanity/.env
# SANITY_STUDIO_PROJECT_ID=<project id>
# SANITY_STUDIO_DATASET=production

pnpm install
pnpm --dir sanity deploy
```

Sanity предложит hostname, например: **`the-skinbar.sanity.studio`**

Эту ссылку дай клиенту как **основной способ редактирования контента**.

Локальный запуск (для разработчика): `pnpm studio` → http://localhost:3333

### 4.5 Webhook для мгновенного обновления сайта

1. Sanity → API → **Webhooks → Create**.
2. **Name:** Revalidate production site
3. **URL:** `https://theskinbar.ie/api/revalidate`
4. **Dataset:** production
5. **Trigger on:** Create, Update, Delete
6. **Filter (optional):** можно оставить пустым или `_type in ["landingPage","siteSettings",...]`
7. **HTTP method:** POST
8. **Headers:**
   ```
   Authorization: Bearer <ваш SANITY_REVALIDATE_SECRET>
   ```
9. **Secret** в Vercel: тот же `SANITY_REVALIDATE_SECRET`.

После настройки: измени заголовок Hero в Studio → Publish → сайт обновится за секунды.

### 4.6 Что клиент редактирует в Studio

| Хочу изменить… | Где в Studio |
|----------------|--------------|
| Тексты главной, FAQ, отзывы | Site → Landing pages → EN / UK / RU |
| Телефон, email, адрес | Site → Site settings → locale |
| Privacy / Terms | Site → Legal pages |
| Заголовок страницы Treatments | Services → Treatments hub page |
| Категории в меню / на главной | Services → Categories → flags |
| Цена и описание процедуры | Services → Browse by category → Procedures |
| Настройки gift voucher | Gift voucher (/gift-voucher) |
| Заказы ваучеров | Gift voucher orders |

**Важно:** `pnpm seed:sanity` **перезаписывает** контент — только для dev/миграции, не для клиента.

---

## 5. Stripe — оплата подарочных ваучеров

### 5.1 Регистрация

1. [dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Страна: **Ireland** (или страна регистрации бизнеса клиента).
3. Заполнить business profile (название клиники, адрес, IBAN для выплат).
4. **Verification** может занять несколько дней — начинай заранее.

### 5.2 API Keys

Developers → **API keys**:

| Key | Env variable | Режим |
|-----|--------------|-------|
| Publishable key | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Test → потом Live |
| Secret key | `STRIPE_SECRET_KEY` | Test → потом Live |

На старте используй **Test mode** (переключатель в Dashboard). Тестовая карта: `4242 4242 4242 4242`.

### 5.3 Webhook (обязателен для отправки ваучера)

Developers → **Webhooks → Add endpoint**:

- **URL:** `https://theskinbar.ie/api/stripe/webhook`
- **Events:** `checkout.session.completed`
- Скопировать **Signing secret** → `STRIPE_WEBHOOK_SECRET` в Vercel

**Без webhook:** оплата пройдёт, но код ваучера и email **не отправятся**.

### 5.4 Как работает оплата (для понимания)

1. Клиент заполняет форму на `/gift-voucher`.
2. Сайт создаёт заказ в Sanity (`giftVoucherOrder`, status: pending).
3. Stripe Checkout Session с суммой процедуры (EUR).
4. После оплаты Stripe шлёт webhook → сайт:
   - помечает заказ `paid`
   - генерирует код (например `SKIN-A7K2`)
   - отправляет 2 email через Resend (получателю + дарителю)
5. Заказ виден в Sanity → Gift voucher orders.

Процедура доступна для подарка, если у неё **есть цена > 0** в каталоге.

### 5.5 Переход на Live mode

1. Stripe → Activate account (верификация завершена).
2. Переключить Dashboard на **Live**.
3. Создать **новый** webhook endpoint для live URL.
4. Заменить все три Stripe env vars в Vercel на **live** keys.
5. Redeploy + тестовая покупка на €1 (можно refund).

---

## 6. Resend — email с ваучерами

### 6.1 Регистрация

1. [resend.com](https://resend.com) → Sign up.
2. **API Keys → Create** → скопировать → `RESEND_API_KEY` в Vercel.

### 6.2 Верификация домена (обязательно)

Domains → **Add Domain** → `theskinbar.ie`

Resend покажет DNS-записи. Добавить у регистратора домена:

- **TXT** (verification)
- **MX** (если нужен inbound — для ваучеров не обязателен)
- **DKIM** (CNAME records)
- Рекомендуется **DMARC** TXT: `v=DMARC1; p=none;` (или stricter позже)

Статус должен стать **Verified** (до 48 ч, обычно быстрее).

### 6.3 From address

```
RESEND_FROM_EMAIL=The Skinbar <hello@theskinbar.ie>
```

Формат: `Name <email@verified-domain.com>`

### 6.4 Что отправляется

После успешной оплаты **два письма**:

1. **Получателю** — код ваучера, процедура, сумма, персональное сообщение.
2. **Дарителю** — копия для records.

Шаблон HTML встроен в код (`lib/resend/gift-voucher-email.ts`), брендирован под The Skinbar.

---

## 7. Telegram — уведомления с формы контактов

Контактная форма на главной (`/#contact`) отправляет POST на `/api/contact` → **Telegram**, не email.

### 7.1 Создание бота

1. В Telegram найти **@BotFather**.
2. `/newbot` → имя: `The Skinbar Contact` → username: `theskinbar_contact_bot`.
3. Скопировать **token** → `TELEGRAM_BOT_TOKEN` в Vercel.

### 7.2 Куда приходят сообщения

**Вариант A — личный чат:**

1. Написать боту `/start`.
2. Открыть `https://api.telegram.org/bot<TOKEN>/getUpdates`
3. Найти `"chat":{"id":123456789}` → `TELEGRAM_CHAT_ID=123456789`

**Вариант B — группа (рекомендуется для команды):**

1. Создать группу, добавить бота.
2. Сделать бота админом (опционально).
3. Отправить сообщение в группу.
4. `getUpdates` → chat id будет **отрицательным**, напр. `-1001234567890`.

### 7.3 Формат сообщения

```
New contact request

Name: Jane Doe
Email: jane@example.com

Message:
I would like to book a consultation...
```

---

## 8. Google Analytics и Search Console

### 8.1 Google Analytics 4

1. [analytics.google.com](https://analytics.google.com) → Create account → Property **The Skinbar**.
2. Data stream → **Web** → URL: `https://theskinbar.ie`
3. Скопировать **Measurement ID** (`G-XXXXXXXXXX`) → `NEXT_PUBLIC_GA_MEASUREMENT_ID` в Vercel.

**Cookie consent:** GA загружается **только после согласия** пользователя (Consent Mode v2). Это уже реализовано на сайте.

### 8.2 Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → URL prefix: `https://theskinbar.ie`
3. **Verification:** на сайте уже добавлен meta-tag в `app/layout.tsx`:

   ```
   google: "N0d0-N4qDDZsQm5GS7EVEdsxyZKgh4PxN4b0OdKEnIo"
   ```

   Если клиент создаёт **новый** Search Console property — получит **новый** код верификации. Тогда нужно обновить `app/layout.tsx` и redeploy.

4. После верификации: **Sitemaps → Add** → `https://theskinbar.ie/sitemap.xml`

### 8.3 Что уже есть для SEO

- `sitemap.xml` — все страницы + hreflang для EN/UK/RU
- `robots.txt` — разрешает индексацию, блокирует `/api/`
- Open Graph + Twitter cards
- JSON-LD: LocalBusiness, FAQ, Reviews, Breadcrumbs, Services
- hreflang alternates на всех локалях
- Canonical URLs через `NEXT_PUBLIC_SITE_URL`

---

## 9. Переменные окружения — полная таблица

### Next.js / Vercel (Production)

| Variable | Обязательно | Описание |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | **Да** | `https://theskinbar.ie` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | **Да** | Project ID из Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | **Да** | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Нет | Default `2025-05-05` |
| `SANITY_API_READ_TOKEN` | Нет | Read-only, для draft preview |
| `SANITY_API_WRITE_TOKEN` | **Да** (ваучеры) | Editor token |
| `SANITY_REVALIDATE_SECRET` | **Да** | Random string для webhook |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | **Да** (ваучеры) | pk_live_... или pk_test_... |
| `STRIPE_SECRET_KEY` | **Да** (ваучеры) | sk_live_... или sk_test_... |
| `STRIPE_WEBHOOK_SECRET` | **Да** (ваучеры) | whsec_... |
| `RESEND_API_KEY` | **Да** (ваучеры) | re_... |
| `RESEND_FROM_EMAIL` | **Да** (ваучеры) | Verified sender |
| `TELEGRAM_BOT_TOKEN` | **Да** (контакт) | BotFather token |
| `TELEGRAM_CHAT_ID` | **Да** (контакт) | Chat / group ID |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Нет | G-XXXXXXXXXX |

### Sanity Studio (`sanity/.env` — только для deploy studio)

| Variable | Значение |
|----------|----------|
| `SANITY_STUDIO_PROJECT_ID` | = `NEXT_PUBLIC_SANITY_PROJECT_ID` |
| `SANITY_STUDIO_DATASET` | `production` |

---

## 10. Инструкция для клиента: как пользоваться сайтом

### 10.1 Ежедневная работа

1. Открыть **Sanity Studio**: `https://the-skinbar.sanity.studio` (ваш URL после deploy).
2. Внести изменения (цена, текст, новая процедура).
3. Нажать **Publish** (не Draft).
4. Подождать ~5–30 секунд — сайт обновится автоматически.

### 10.2 Изменить цену процедуры

1. Studio → Services → Browse by category.
2. Открыть категорию → подкатегорию → процедуру.
3. Поле **Price** → сохранить → **Publish**.
4. Если цена > 0 — процедура появится в gift voucher.

### 10.3 Обработать заказ ваучера

1. Studio → **Gift voucher orders**.
2. Найти заказ по коду / email.
3. При визите клиента: статус → **Redeemed**, указать **Redeemed at**.

### 10.4 Отключить продажу ваучеров

Studio → Gift voucher page → **Enable gift voucher purchases** → OFF → Publish.

### 10.5 Контактные заявки

Приходят в **Telegram** (не на email). Проверяйте чат/группу регулярно.

### 10.6 Чего не трогать

- GitHub / Vercel / env variables — только через разработчика.
- `pnpm seed:sanity` — удалит ваши правки.
- Файлы в репозитории (`lib/content/*.ts`) — fallback для разработки, не для редактирования.

---

## 11. Тестирование перед запуском

### Smoke test (30 минут)

| # | Действие | Ожидание |
|---|----------|----------|
| 1 | Открыть `/` | Hero, галерея, отзывы, FAQ, контакт |
| 2 | Переключить UK / RU | Контент на нужном языке |
| 3 | `/treatments` | Категории, concerns |
| 4 | Открыть процедуру с ценой | CTA «Gift this treatment» |
| 5 | `/gift-voucher` → выбрать процедуру → оплатить (test card) | Redirect на success, 2 email |
| 6 | Sanity → Gift voucher orders | Status: paid, code заполнен |
| 7 | Форма контактов | Сообщение в Telegram |
| 8 | Изменить телефон в Site settings → Publish | Новый телефон на сайте |
| 9 | Cookie banner → Accept | GA начинает собирать (проверить GA Realtime) |
| 10 | `theskinbar.ie/sitemap.xml` | XML открывается |

---

## 12. Текст о проделанной работе (для клиента)

> Ниже — готовый текст для email / PDF / Notion. Можно копировать и адаптировать.

---

**Уважаемая Inna,**

Передаю вам готовый профессиональный сайт **The Skinbar** — не шаблон «на коленке», а полноценная digital-платформа для вашей клиники эстетической косметологии.

### Что вы получаете

**1. Современный высокопроизводительный сайт**

Сайт построен на **Next.js 16** (тот же стек, что используют крупные бренды) и размещён на **Vercel** с автоматическим SSL, CDN и высокой скоростью загрузки. Это напрямую влияет на SEO и на то, останутся ли посетители на странице.

**2. Три языка из коробки**

Английский (основной), украинский и русский — с правильными SEO-тегами hreflang для Google. Ваши клиенты из разных языковых групп видят сайт на родном языке.

**3. Полноценная CMS (Sanity Studio)**

Вы **самостоятельно** редактируете тексты, цены, процедуры, FAQ, отзывы, legal-страницы — без программиста. Изменения публикуются на живой сайт за секунды. Контент-модель включает:

- главную страницу (все секции)
- каталог процедур (категории → подкатегории → процедуры)
- страницу Treatments с «Browse by concern»
- Privacy Policy и Terms of Service на 3 языках
- настройки контактов, соцсетей, footer

**4. Каталог услуг**

Десятки процедур с описаниями, FAQ, ценами, SEO-разметкой (Schema.org). Отдельные landing-страницы для каждой процедуры — это мощный инструмент для Google («laser hair removal Dublin», «lip filler» и т.д.).

**5. Подарочные ваучеры с оплатой online**

Полный e-commerce flow:

- выбор процедуры → персонализация → оплата через **Stripe**
- автоматическая генерация кода ваучера
- email получателю и покупателю через **Resend**
- учёт заказов в админке (paid / redeemed)

Это отдельный продуктовый модуль, который многие студии продают как add-on за €2 000+.

**6. Контактная форма → Telegram**

Заявки мгновенно приходят вам в Telegram — не теряются в spam-папке email.

**7. SEO и compliance**

- XML sitemap, robots.txt
- Open Graph для соцсетей
- JSON-LD structured data (LocalBusiness, FAQ, Reviews, Services)
- Cookie consent с Google Consent Mode v2 (GDPR-friendly)
- Google Analytics 4 (после согласия пользователя)
- Google Search Console verification

**8. Дизайн**

Премиальная эстетика: Playfair Display + Montserrat, палитра The Skinbar, галерея с lightbox, адаптивная вёрстка mobile-first.

### Масштаб работы (для понимания ценности)

- **~165 коммитов**, **~295 TypeScript/React файлов**
- Кастомная Sanity Studio с i18n, каталогом услуг, gift voucher module
- 8 категорий процедур, 70+ процедур в каталоге
- Server-side API: Stripe checkout + webhook, contact, CMS revalidation
- Полная типизация TypeScript, валидация Zod, ESLint

По рыночным оценкам, аналогичный проект «под ключ» в Ирландии/UK стоит **€8 000 – €15 000+** и 6–10 недель работы команды (design + dev + CMS + payments + i18n + SEO).

---

## 13. Советы по продвижению сайта

### 13.1 Первые 2 недели (quick wins)

1. **Google Business Profile** — создать/обновить профиль клиники: адрес, часы, фото, услуги, ссылка на сайт. Просить довольных клиентов оставлять отзывы **на Google**, не только на сайте.
2. **Search Console** — отправить sitemap, проверить «Pages» через 7–14 дней.
3. **Instagram / Facebook bio** — ссылка на сайт + highlight «Book now» / «Gift voucher».
4. **Gift voucher** — пост в соцсетях: «Подарите уход за кожей» → ссылка `/gift-voucher`. Это уникальное конкурентное преимущество.

### 13.3 SEO (среднесрочно, 1–6 месяцев)

1. **Локальные ключевые слова** в текстах процедур (уже частично есть): «aesthetic clinic [city]», «botox [area]», «laser hair removal [city]».
2. **Блог / статьи** (можно добавить позже в Sanity): «How to prepare for lip filler», «Laser hair removal: how many sessions» — ответы на вопросы клиентов = трафик из Google.
3. **Внутренние ссылки** — уже настроены между категориями, concerns, процедурами.
4. **Скорость** — не загружать ogromные фото; WebP, разумные размеры в Sanity Media.

### 13.4 Платная реклама (когда готовы)

1. **Google Ads** — search campaigns на high-intent: «book botox [city]», «aesthetic clinic near me».
2. **Meta Ads** — before/after (с согласия клиентов), gift voucher перед праздниками.
3. **Retargeting** — установить Meta Pixel / Google Ads tag (сейчас только GA4; pixels — отдельная задача).

### 13.5 Конверсия (без рекламы)

1. **CTA** — «Book consultation» в hero ведёт на `/#contact`. Отвечайте на Telegram заявки в течение 1–2 часов в рабочее время.
2. **Отзывы** — обновляйте в Sanity реальные отзывы; JSON-LD Reviews помогает rich snippets.
3. **Gift voucher** — сезонные кампании (Valentine's, Mother's Day, Christmas).

### 13.6 Чего избегать

- Покупка ссылок / fake reviews — Google penalize.
- Копирование текстов конкурентов — уникальный контент уже в CMS.
- Игнорирование мобильной версии — ~70% трафика beauty-сегмента с телефона (сайт адаптивен).

---

## 14. Поддержка и типичные проблемы

| Проблема | Причина | Решение |
|----------|---------|---------|
| Изменения в Studio не на сайте | Webhook не настроен | Проверить Sanity webhook + `SANITY_REVALIDATE_SECRET` |
| Gift voucher: «Unable to create order» | Нет write token | `SANITY_API_WRITE_TOKEN` в Vercel |
| Оплата прошла, email не пришёл | Resend domain / webhook | Проверить Resend logs, Stripe webhook logs |
| Контактная форма не работает | Telegram не настроен | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` |
| Stripe redirect на wrong URL | Нет site URL | `NEXT_PUBLIC_SITE_URL` = production domain |
| GA не показывает данные | Cookie rejected / нет ID | Принять cookies на сайте; проверить env var |
| Письма в spam | DNS не полный | DKIM + DMARC в Resend |

### Контакт разработчика

_Заполните перед передачей:_

- Разработчик: _______________
- Email: _______________
- Поддержка: ___ часов / ___ дней после сдачи
- SLA: _______________

---

_Документ подготовлен для передачи проекта The Skinbar. Актуальная техническая документация для разработчиков: `README.md`, `docs/checklists/g2-post-seed-verification.md`._
