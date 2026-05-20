# Skinbar — cosmetology landing (Next.js 16)

Marketing site for Skinbar · Inna Chernovol. Hosted on [Vercel](https://vercel.com).

## Quick start

```bash
cp .env.example .env.local   # fill in values (see below)
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy [`.env.example`](./.env.example) to `.env.local`. Required for production:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (metadata, JSON-LD, Stripe redirects) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 (optional) |

See `.env.example` for the full list including Sanity, Stripe, and Resend.

## Locales (i18n)

Supported locales: **en** (default), **uk**, **ru**.

Routing uses `next-intl` with a `[locale]` segment (e.g. `/uk/services`). Default locale `en` is served at `/` without a prefix once Phase 1 is merged.

UI strings live in `messages/{locale}.json`. Page content will move to Sanity with per-locale documents.

## Sanity CMS

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and optionally `SANITY_API_READ_TOKEN` in `.env.local`.
3. Sanity Studio lives in `sanity/` (added in Phase 2). Deploy Studio separately or use `*.sanity.studio`.

Content is fetched at build/request time via GROQ in Server Components.

## Stripe (gift vouchers)

1. Create products/prices in [Stripe Dashboard](https://dashboard.stripe.com) or use dynamic Checkout amounts.
2. Set `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, and `STRIPE_WEBHOOK_SECRET` in Vercel env.
3. **Production webhook URL:** `https://<your-domain>/api/stripe/webhook`
4. **Local dev:** `stripe listen --forward-to localhost:3000/api/stripe/webhook` — use the signing secret from CLI output as `STRIPE_WEBHOOK_SECRET`.

## Scripts

```bash
pnpm dev      # development server
pnpm build    # production build
pnpm start    # run production build locally
pnpm lint     # ESLint
```

## Stack

Next.js 16 · React 19 · Tailwind CSS v4 · next-intl · Sanity · Stripe · Vercel
