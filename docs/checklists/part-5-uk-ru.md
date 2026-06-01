# Part 5 — UK / RU content verification

After `pnpm seed:sanity` (with prod backup per [part-0-sanity-prep.md](./part-0-sanity-prep.md)).

**Post-seed sign-off:** see [g2-post-seed-verification.md](./g2-post-seed-verification.md) (CMS = source of truth, images gap documented).

## What seed fills per locale

| Content | EN | UK | RU |
|---------|----|----|-----|
| `landingPage` | `landingPage-en` | `landingPage-uk` | `landingPage-ru` |
| `siteSettings` | `siteSettings-en` | … | … |
| `legalPage` | privacy + terms | ×3 locales | ×3 locales |
| `treatmentsHub` | field i18n EN/UK/RU on one doc | | |
| `treatmentConcern` | ×6 slugs, field i18n | | |
| Services **categories** | EN + UK/RU where static copy differs | from `uk.ts` / `ru.ts` preview cards |
| Services subcategories / procedures | EN only in CMS | UK/RU **fallback to EN** on site |

## Smoke checklist

### Landing (`/uk`, `/ru`)

- [x] Hero title + CTA in Ukrainian / Russian (editor QA, 2026-06-01)
- [x] Nav CTA short label localized
- [x] Services section: 4 cards — titles/descriptions localized where seeded
- [x] Contact form labels + validation messages localized
- [x] FAQ groups visible; accordion text localized
- [x] Reviews marquee — copy localized (`viewOnInstagramLabel`)

### Treatments hub

- [x] `/uk/treatments`, `/ru/treatments` — hub H1 + intro from `treatmentsHub` (not hardcoded EN)
- [x] Category **titles** localized where seeded (e.g. «Ін’єкції»)
- [x] Concern cards / chips — titles from `treatmentConcern` (images may be `/public` fallback)
- [x] Procedure names EN until translated in Studio — **expected**

### Header

- [x] Treatments dropdown — short titles (e.g. «Ін’єкції» for injectables on UK)

### Studio

- [x] `landingPage-uk` / `-ru` — sections filled
- [x] `treatmentsHub` — EN | UK | RU tabs
- [x] `treatmentConcern-*` — titles; procedure `concerns[]` links
- [x] `serviceCategory-*` — `title.uk` / `title.ru` where different from EN
- [x] Subcategory/procedure: only `en` filled → OK

## Gaps (follow-up, not blockers)

- Procedure/subcategory UK/RU: translate in Studio when ready (EN-only policy until then)
- **Images:** most treatment/category photos still from `/public` — upload in Studio (phase **D.3**) or keep static
- Landing `services.goals[]` chips — still from `landingPage`; hub uses `treatmentConcern` (unify in **B.6**)
- Cookie / a11y strings still in `messages/*`
