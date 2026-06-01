# `lib/` — content, catalog, Sanity

Where runtime data comes from and what **not** to edit for CMS day-to-day work.

## Layout

| Path | Purpose |
|------|---------|
| `lib/content/` | Static **fallback** landing copy (`en.ts`, `uk.ts`, `ru.ts`, `faq/`). Seed source for `landingPage`. |
| `lib/services/` | Static **fallback** services catalog (`catalog.ts`, `categories/*`). Seed source for category tree. |
| `lib/sanity/` | GROQ queries, fetch, mappers (CMS → types), seed scripts, revalidate tags. |
| `lib/i18n/` | Locale helpers (`pick-locale-field`). |
| `lib/types/` | Shared TS types for content & services. |

## Source of truth

When `NEXT_PUBLIC_SANITY_PROJECT_ID` is set (see `lib/sanity/env.ts`):

1. **Sanity production dataset** is authoritative for published content.
2. **`lib/content` and `lib/services`** supply defaults when CMS is missing a document/field or fetch fails.
3. **`messages/*.json`** remain the source for cookie banner, nav a11y strings, locale switcher labels.

**Inna edits Studio, not `lib/content/*.ts`.**  
Re-run `pnpm seed:sanity` only with a backup — it overwrites seeded document IDs.

Full verification checklist: [docs/checklists/g2-post-seed-verification.md](../docs/checklists/g2-post-seed-verification.md).

## Entry points (app)

| Need | Function |
|------|----------|
| Landing page data | `getLandingContent(locale)` — `lib/content/index.ts` |
| Services catalog + hub UI | `resolveServicesCatalog(locale)` — `lib/services/index.ts` |
| Legal | `lib/sanity/fetch` + legal mappers |

## Images

Hero and gallery are **code/public** only. Category, concern, procedure, and brand logos can come from Sanity when uploaded; otherwise mappers fall back to `/public` paths from static catalog.
