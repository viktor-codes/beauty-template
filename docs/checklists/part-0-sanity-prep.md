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

- [ ] `/` — hero visible, primary CTA works
- [ ] Header — short nav CTA → `#contact` or configured href
- [ ] Treatments dropdown — up to **5** categories, links `/treatments/{slug}`
- [ ] Services section — exactly **4** homepage cards, images load
- [ ] Footer — phone/email match Site settings when CMS on
- [ ] `/treatments` hub loads
- [ ] One category page e.g. `/treatments/cosmetology`
- [x] Draft/publish: edit in Studio → revalidate → site updates (verified 2026-06-01)
- [ ] About: replace one brand logo in Studio → marquee shows CDN image (not `/public/logos`)
- [ ] Site settings EN: change phone → contact section + footer update (see [site-settings-merge.md](./site-settings-merge.md))

## 4. Content fallback policy (agreed)

- **Sanity production** = source of truth for editorial content after seed (see [g2-post-seed-verification.md](./g2-post-seed-verification.md)).
- `lib/content/*` and `lib/services/**` remain **permanent fallbacks** when CMS is empty or offline — **not** for Inna’s routine edits.
- UK/RU empty fields → EN on site (`pick-locale-field`).

## 5. After first prod seed (G.1 done)

- [x] `pnpm seed:sanity` on production (2026-06-01)
- [x] Publish → revalidate smoke — [g2](./g2-post-seed-verification.md) §4B (verified 2026-06-01)
