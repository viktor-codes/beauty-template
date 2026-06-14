# Services catalog UX — baseline URL checklist

**Phase:** 0.2 (pre-implementation)  
**Date:** 2026-06-14  
**Branch:** `feat/services-catalog-cms-ux`  
**Spec:** [services-catalog-cms-ux-spec.md](../plans/services-catalog-cms-ux-spec.md)

Use this list in Phase 7 QA. All URLs must return **200** with the same content/prices as [catalog-ux-baseline-snapshot.json](./catalog-ux-baseline-snapshot.json) unless a phase explicitly changes behaviour (e.g. hide → 404).

## EN (minimum)

| URL | Notes |
|-----|-------|
| `/treatments` | Treatments hub |
| `/treatments/body-slimming` | Nested category |
| `/treatments/body-slimming/peels/tca-peel` | Canonical TCA peel path |
| `/treatments/anti-age/anti-age-peels/tca-peel` | Duplicate anti-age path — note for Phase 5 dedupe |
| `/treatments/blood-tests/tired-all-the-time` | Flat category (no subcategory in URL) |
| `/treatments/concerns/glow` | Concern page |

## Localized (one procedure each)

| URL | Notes |
|-----|-------|
| `/uk/treatments/body-slimming/peels/tca-peel` | UK title from CMS or locale-copy |
| `/ru/treatments/body-slimming/peels/tca-peel` | RU title from CMS or locale-copy |

## Homepage / nav

| Check | Expected |
|-------|----------|
| Homepage services section | 4 featured category cards |
| Header treatments dropdown | Featured categories link to `/treatments/{slug}` |

## Backup (Phase 0.1)

Before schema changes or re-seed:

```bash
cd sanity
mkdir -p backups
npx sanity dataset export production backups/pre-catalog-ux-$(date +%Y%m%d).tar.gz
```

Store the archive outside the repo if preferred. Record export date below.

| Export date | Archive path | By |
|-------------|--------------|-----|
| 2026-06-14 | `sanity/backups/pre-catalog-ux-20260614.tar.gz` | Phase 0 prep |
