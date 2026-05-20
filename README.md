# The Skinbar — cosmetology landing (Next.js 16)

Marketing site for The Skinbar · Inna Chernovol. Hosted on [Vercel](https://vercel.com).

## Quick start

```bash
cp .env.example .env.local   # fill in values (see below)
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy [`.env.example`](./.env.example) to `.env.local`. Required for production:

| Variable                        | Purpose                                             |
| ------------------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Canonical URL (metadata, JSON-LD, Stripe redirects) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 (optional)                       |

See `.env.example` for the full list including Sanity, Stripe, and Resend.

## Locales (i18n)

Supported locales: **en** (default), **uk**, **ru**.

Routing uses `next-intl` with a `[locale]` segment (e.g. `/uk/services`). Default locale `en` is served at `/` without a prefix once Phase 1 is merged.

UI strings live in `messages/{locale}.json`. Page content will move to Sanity with per-locale documents.

## Sanity CMS

See [docs/adr/001-sanity-i18n-strategy.md](./docs/adr/001-sanity-i18n-strategy.md).

| Content                | Studio i18n                               | Why                                         |
| ---------------------- | ----------------------------------------- | ------------------------------------------- |
| Landing, site settings | **Document** (one doc per locale)         | Large page blobs                            |
| Services tree          | **Field** (`localeString` / `localeText`) | Same `_id` and references for all languages |

Next.js reads CMS via `lib/sanity/` (queries → **mappers with fallbacks** → `LandingContent` / `ServicesCatalog`). Pages keep calling `getLandingContent(locale)`; static files remain fallback until migration.

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Set `NEXT_PUBLIC_SANITY_*` in `.env.local` (Next) and `SANITY_STUDIO_*` in `sanity/.env` (Studio — same project/dataset).
3. Install Studio deps (from repo root): `pnpm install`
4. Copy `sanity/.env.example` → `sanity/.env`, set `SANITY_STUDIO_PROJECT_ID` and dataset.
5. `pnpm studio` — Sanity Studio in `sanity/`.

If `pnpm install` inside `sanity/` finishes in under a second with no new packages, run `pnpm install` from the repo root instead (workspace includes `sanity/`).

## Stripe (gift vouchers)

1. Create products/prices in [Stripe Dashboard](https://dashboard.stripe.com) or use dynamic Checkout amounts.
2. Set `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, and `STRIPE_WEBHOOK_SECRET` in Vercel env.
3. **Production webhook URL:** `https://<your-domain>/api/stripe/webhook`
4. **Local dev:** `stripe listen --forward-to localhost:3000/api/stripe/webhook` — use the signing secret from CLI output as `STRIPE_WEBHOOK_SECRET`.

## Scripts

```bash
pnpm dev      # development server
pnpm studio   # Sanity Studio (sanity/)
pnpm build    # production build
pnpm start    # run production build locally
pnpm lint     # ESLint
```

## Stack

Next.js 16 · React 19 · Tailwind CSS v4 · next-intl · Sanity · Stripe · Vercel
