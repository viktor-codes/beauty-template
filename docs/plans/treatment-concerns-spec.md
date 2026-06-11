# Treatment concerns («Choose by goal») — спецификация

Связано: [sanity-client-admin-roadmap.md](./sanity-client-admin-roadmap.md), фаза **2b**.

## Зачем

Сейчас «goals» — это **чипы на лендинге** + **подбор процедур по ключевым словам** в коде (`lib/services-goals.ts`). Инна не управляет связями; переводы целей размазаны по `landingPage.services.goals`.

**Цель:** отдельный справочник «запросов клиента» (concerns), к каждой процедуре — явная привязка в Studio; на `/treatments` — полноценный блок (не только badges), как второй способ навигации рядом с категориями.

## Нейминг (для Studio и сайта)

| Вариант | EN в UI | Комментарий |
|---------|---------|-------------|
| **Рекомендуем** | **Skin concerns** / «Browse by concern» | Понятно клиенту, не звучит как маркетинговый «goal» |
| Альтернатива | Treatment focus | Нейтрально, клинический тон |
| Избегать | Goals | Слишком абстрактно для мед. контекста |

Техническое имя типа в Sanity: `treatmentConcern` (slug: `glow`, `acne`, …).

## Модель данных (Sanity)

### Документ `treatmentConcern` (field i18n, как категории)

| Поле | Тип | Кто правит |
|------|-----|------------|
| `slug` | slug, автоген из `title.en` | ⚙️ read-only для Инны |
| `title` | `localeString` | 📝 EN / UK / RU |
| `shortDescription` | `localeText` (optional) | 📝 для карточки на hub |
| `image` | `serviceImage` или Sanity image + alt (`localeString`) | 📝 **обязательно для hub-карточки** |
| `sortOrder` | number | 📝 порядок в списке |
| `isActive` | boolean | скрыть без удаления |

Один документ на concern — стабильный `_id`, переводы в полях.

### Процедура `serviceProcedure`

| Поле | Тип | Кто правит |
|------|-----|------------|
| `concerns` | `array` of `reference` → `treatmentConcern` | 📝 Инна отмечает, что подходит |

В Studio: на процедуре — чеклист / multi-select «This treatment helps with…».

Валидация: необязательно, но подсказка «выберите хотя бы один concern для hub».

### Что убрать / заменить

| Было | Станет |
|------|--------|
| `landing.services.goals[]` (`servicesGoalPreview`) | ⚙️ список активных concerns из CMS (или только заголовок секции на лендинге) |
| `lib/services-goals.ts` keyword scoring | ⚙️ фильтр: `procedure.concerns` contains `concern.slug` |
| `GoalSlug` union в TS | генерировать из concerns или `string` slug + валидация |

## Поведение на сайте

### `/treatments/concerns/glow` (канонический URL)

- Заголовок: `title` concern на текущей локали.
- Breadcrumbs: Home → Treatments → {concern title}.
- Список процедур: все `serviceProcedure`, у которых в `concerns` есть этот concern.
- Без keyword-guessing.
- Legacy `?concern=` / `?goal=` на hub → redirect на path.

### Лендинг (`#treatments`)

- Блок «or choose by your concern» — ссылки из **активных** concerns (как сейчас chips).
- Текст eyebrow можно оставить в `landing.services` (🌍 per locale).

### Hub `/treatments` (серьёзнее, чем chips)

- Секция **Browse by concern**: сетка карточек (как категории): **image** + title + shortDescription + ссылка.
- Ниже или рядом — категории (как сейчас).
- Карточки concern ведут на `/treatments/concerns/{slug}` (отдельная страница, не режим hub).

## Studio UX для Инны

1. **Treatment concerns** — список в меню Services (над или под Categories).
2. Редактирует названия EN/UK/RU, порядок, вкл/выкл.
3. В каждой **Procedure** — поле «Helps with concerns» (references).
4. Slug не трогает.

## Миграция

1. Seed 6 concerns из текущих `goal-*` + `goalKeywords` labels.
2. Скрипт или ручной проход: проставить `concerns` на процедуры по текущему scoring (порог score > 0) → Инна правит в Studio.
3. Редирект `?goal=` → `?concern=` (301 или query alias).

## Фазы

| Шаг | Работа |
|-----|--------|
| 2b.1 | Схемы `treatmentConcern` + `concerns` на procedure |
| 2b.2 | GROQ, маппер, типы `ServicesCatalog` / API |
| 2b.3 | Заменить `getGoalRecommendations` |
| 2b.4 | UI hub + лендинг chips |
| 2b.5 | Seed + инструкция для Инны |

**Не в фазе 1** (лендинг EN) — после каталога и флагов `featuredOnHomepage` / `featuredInNav`.

## Закрыто

| Вопрос | Решение |
|--------|---------|
| Картинка на hub | **Да** — поле `image` на `treatmentConcern` |
| Лимит concerns | ~6–8 активных (как сейчас); без жёсткого cap в схеме, порядок через `sortOrder` |
