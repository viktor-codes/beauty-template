# ADR 001: Sanity i18n — document vs field level

**Status:** Accepted  
**Date:** 2026-05-20

## Context

The site supports `en`, `uk`, and `ru` (see `i18n/routing.ts`). Content must be editable in Sanity and consumed in Next.js via mappers into existing types (`LandingContent`, `ServicesCatalog`).

Two i18n strategies exist in Sanity:

1. **Document Internationalization** — one document per locale (different `_id`s, linked translations).
2. **Field Internationalization** — one document, localized fields (`{ en, uk, ru }`).

## Problem

Using document i18n for the **services tree** (`serviceCategory` → `serviceSubcategory` → `serviceProcedure`) creates separate document IDs per locale. References between procedures and subcategories must be filtered by language in Studio (`options.filter`), or editors can link an EN procedure to a UK subcategory.

Structure (slugs, hierarchy, prices, shared images) is identical across locales; only copy changes.

## Decision

| Content | i18n strategy | Rationale |
|---------|---------------|-----------|
| `landingPage`, `siteSettings`, `legalPage` | **Document** (`@sanity/document-internationalization`) | Large, independent page blobs; editors work in one language at a time |
| `serviceCategory`, `serviceSubcategory`, `serviceProcedure` | **Field** (`localeString`, `localeText`, …) | Single `_id` and stable references across locales |
| Shared assets (e.g. procedure image) | Non-localized or localized **alt** only | Same file for all languages; alt text via `localeString` |

## Consequences

- GROQ for services: no `language == $locale` on documents; pass `$locale` into mappers only.
- Mappers use `pickLocaleField()` with fallback chain: requested locale → `en` → any filled locale → hardcoded default.
- Studio desk: services list is **not** split by language tab; landing/legal/settings use the document-i18n plugin UI.
- Migration: seed one category document per slug; fill `title.uk`, `title.ru`, etc.

## Mapper safety

Without GROQ codegen, mappers are the contract boundary. Every mapper uses `lib/sanity/mappers/safe.ts` helpers; missing CMS data must never throw — fall back to static content or safe defaults (see ADR implementation in `lib/sanity/mappers/`).
