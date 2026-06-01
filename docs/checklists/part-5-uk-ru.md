# Part 5 — UK / RU content verification

After `pnpm seed:sanity` (with prod backup per [part-0-sanity-prep.md](./part-0-sanity-prep.md)).

## What seed fills per locale

| Content | EN | UK | RU |
|---------|----|----|-----|
| `landingPage` | `landingPage-en` | `landingPage-uk` | `landingPage-ru` |
| `siteSettings` | `siteSettings-en` | … | … |
| `legalPage` | privacy + terms | ×3 locales | ×3 locales |
| Services **categories** | EN + UK/RU where static copy differs | from `uk.ts` / `ru.ts` preview cards |
| Services subcategories / procedures | EN only in CMS | UK/RU **fallback to EN** on site |

## Smoke checklist

### Landing (`/uk`, `/ru`)

- [ ] Hero title + CTA in Ukrainian / Russian (not English)
- [ ] Nav CTA short label localized
- [ ] Services section: 4 cards — titles/descriptions localized where seeded
- [ ] Contact form labels + validation messages localized
- [ ] FAQ groups visible; accordion text localized
- [ ] Reviews marquee — copy localized (`viewOnInstagramLabel`)

### Treatments hub

- [ ] `/uk/treatments` — category **titles** localized (e.g. «Ін’єкції», «Лазерна епіляція»)
- [ ] Procedure names may stay EN until translated in Studio (expected)

### Header

- [ ] Treatments dropdown — short titles (e.g. «Ін’єкції» for injectables on UK)

### Studio

- [ ] Open `landingPage-uk` — all section groups filled
- [ ] Open `serviceCategory-cosmetology` — `title.uk` / `title.ru` populated where different from EN
- [ ] Subcategory/procedure: only `en` filled → OK

## Gaps (follow-up, not blockers)

- Procedure/subcategory UK/RU: translate in Studio field i18n tabs (phase 6+) or future static export
- Treatments hub H1/subtitle/FAQ headings: **`treatmentsHub`** singleton in Sanity (seed + Studio); page reads `catalog.title` / `hubUi`
- Cookie / a11y strings still in `messages/*`
