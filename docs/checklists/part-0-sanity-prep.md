# Part 0 — Sanity prep (before schema changes)

Run once before Part 1+ and again before any mass schema migration on **production**.

## 1. Backup production dataset

From repo root (requires Sanity CLI login and project access):

```bash
cd sanity
npx sanity dataset export production backups/production-$(date +%Y%m%d).tar.gz
```

Store the archive outside the repo. Record the date in [sanity-client-admin-roadmap.md](../plans/sanity-client-admin-roadmap.md) §7.

## 2. Environment checklist

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Site GROQ |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` |
| `SANITY_API_READ_TOKEN` | Server fetch (optional for public dataset) |
| `SANITY_API_WRITE_TOKEN` | `pnpm seed:sanity` only — never client |
| `SANITY_REVALIDATE_SECRET` | Webhook → `/api/revalidate` |
| `sanity/.env` | `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET` |

## 3. EN smoke checklist (after each landing/catalog PR)

- [x] `/` — hero visible, primary CTA works (smoke 2026-06-11)
- [x] Header — nav links to `/treatments/{slug}` categories (smoke 2026-06-11)
- [x] Treatments dropdown — featured categories, links `/treatments/{slug}` (smoke 2026-06-11)
- [x] Services section — **4** homepage category cards (smoke 2026-06-11)
- [x] Footer — `tel:` from Site settings when CMS on (smoke 2026-06-11)
- [x] `/treatments` hub loads (smoke 2026-06-11)
- [x] One category page e.g. `/treatments/cosmetology` (smoke 2026-06-11)
- [x] Draft/publish: edit in Studio → revalidate → site updates (verified 2026-06-01)
- [ ] About: replace one brand logo in Studio → marquee shows CDN image (not `/public/logos`)
- [ ] Site settings EN: change phone → contact section + footer update (see [site-settings-merge.md](./site-settings-merge.md)) — tel present; live edit not re-verified

## 4. Content fallback policy (agreed)

- **Sanity production** = source of truth for editorial content after seed (see [g2-post-seed-verification.md](./g2-post-seed-verification.md)).
- `lib/content/*` and `lib/services/**` remain **permanent fallbacks** when CMS is empty or offline — **not** for Inna’s routine edits.
- UK/RU empty fields → EN on site (`pick-locale-field`).

## 5. After first prod seed (G.1 done)

- [x] `pnpm seed:sanity` on production (2026-06-01)
- [x] Publish → revalidate smoke — [g2](./g2-post-seed-verification.md) §4B (verified 2026-06-01)
