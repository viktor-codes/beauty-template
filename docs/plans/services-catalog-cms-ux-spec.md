# Services catalog — CMS UX rework (spec)

**Status:** Approved for implementation  
**Date:** 2026-06-14  
**Audience:** Developer implementing changes; reference for Inna (client guide links at end)

**Related documents:**

- [sanity-client-admin-roadmap.md](./sanity-client-admin-roadmap.md) — overall CMS roadmap (phases 0–5 done/partial)
- [treatment-concerns-spec.md](./treatment-concerns-spec.md) — concerns / goals model
- [ADR 001 — Sanity i18n](../adr/001-sanity-i18n-strategy.md) — field i18n for services tree
- [g2-post-seed-verification.md](../checklists/g2-post-seed-verification.md) — source-of-truth policy

---

## 1. Problem statement

The services catalog works technically but is **editor-unfriendly**:

| Editor intent | Current reality |
|---------------|-----------------|
| Remove peels from Body slimming | Must delete all procedures first, then subcategory; Sanity warns about references |
| Hide a service without losing data | No `isActive` on subcategories/procedures (unlike `treatmentConcern`) |
| Trust that CMS = site | Static fallback can **re-show** deleted/hidden content |
| Change a price | 3–4 clicks through “Browse by category” |
| One procedure in Body + Anti age | Duplicate Sanity documents with separate prices |
| Edit concern links | Only from each procedure, not from concern page |

**Goal:** deliver a CMS product Inna can use daily without developer help, **without changing site URLs or re-entering content manually**.

---

## 2. Decisions (locked)

| # | Decision | Choice |
|---|----------|--------|
| D1 | Technology | Stay on **Sanity v5** (`sanity@5.28` in `sanity/package.json`) — no Wagtail migration |
| D2 | Content migration | **No manual Studio entry** — static catalog + `pnpm seed:sanity` + migration scripts |
| D3 | Production dataset state | **Mostly seed** — re-seed allowed with backup; not blind re-seed after Inna edits without export |
| D4 | Anti-age dedupe | **Same project**, after Phase A (trust + hide) |
| D5 | Presentation Tool | **Phase 4** — after Studio UX + `isActive` |
| D6 | Staging dataset | **Not needed** — backup + local Studio against production |
| D7 | `isActive` on category | **Yes** — hide entire category on site without delete |
| D8 | Procedure UK/RU | **Already complete in codebase** — see §3 |

---

## 3. Translation audit (verified 2026-06-14)

Automated check: all catalog slugs in static tree vs `lib/services/locale-copy/translations/{uk,ru}.ts`.

| Entity | Count in catalog | UK titles | RU titles |
|--------|------------------|-----------|-----------|
| Categories | 9 | 9 / 9 | 9 / 9 |
| Subcategories | 31 | 31 / 31 | 31 / 31 |
| Procedures | 110 | 110 / 110 | 110 / 110 |

**Where translations live today:**

| Layer | Path | Role |
|-------|------|------|
| Canonical EN | `lib/services/categories/*` | English titles/descriptions; seed source |
| UK/RU copy | `lib/services/locale-copy/translations/uk.ts`, `ru.ts` | Full tree translations keyed by slug (`procedure.id`, etc.) |
| Runtime | `lib/services/locale-copy/apply-catalog-locale.ts` | Applies UK/RU to static catalog per locale |
| Seed | `lib/sanity/seed/map-services-documents.ts` | Writes `title`/`description` as `localeString` / `localeText` with EN + UK + RU via `getProcedureLocaleCopy()` |
| Mapper | `lib/sanity/mappers/services.ts` + `resolveServiceLocalizedField()` | CMS value → if empty or still EN → locale-copy → EN fallback |

**Implication for this project:**

- Do **not** plan a separate “translate all procedures in CMS” phase — translations exist.
- After schema changes, **re-seed** (with backup) repopulates UK/RU fields in Sanity.
- Inna edits UK/RU in Studio via existing `locale-tabs-input` on `localeString` / `localeText` fields.
- Update outdated note in `docs/checklists/part-5-uk-ru.md` (“procedures EN only in CMS”) when implementing — seed already fills UK/RU.

---

## 4. Current architecture (baseline)

### 4.1 Data model (Sanity)

Reference chain — **not** nested arrays on parent documents:

```
serviceCategory          (no parent ref)
    ↑ category
serviceSubcategory
    ↑ subcategory
serviceProcedure
    → concerns[] → treatmentConcern
```

- Category does **not** store subcategories; GROQ uses `references(^._id)`.
- Procedure has **no** direct category field; category is inferred via subcategory.

**Document ID patterns** (stable, used by seed):

| Type | Pattern | Example |
|------|---------|---------|
| Category | `serviceCategory-{slug}` | `serviceCategory-body-slimming` |
| Subcategory | `serviceSubcategory-{cat}-{sub}` | `serviceSubcategory-body-slimming-peels` |
| Procedure | `serviceProcedure-{cat}-{sub}-{proc}` | `serviceProcedure-body-slimming-peels-tca-peel` |
| Concern | `treatmentConcern-{slug}` | `treatmentConcern-glow` |

### 4.2 Site resolution

```
fetchServicesCatalog()  →  GROQ (lib/sanity/queries/services.ts)
        ↓
mapServicesCatalogSafe()  →  merge with getStaticServicesCatalog(locale)
        ↓
Pages: /treatments/... , /treatments/concerns/{slug}
```

**Known mapper behaviour (must change in Phase 1):**

- If Sanity returns subcategory with **empty** `procedures[]` → mapper falls back to **static** procedures.
- If Sanity category has **no** subcategories from GROQ → falls back to **all** static subcategories.
- Categories missing entirely from Sanity → appended from static.

This causes “I deleted/hid in Studio but site still shows it”.

### 4.3 Anti-age duplication (code smell)

`lib/services/categories/anti-age.ts` **clones** subcategories/procedures from other categories (e.g. peels from `body-slimming` as `anti-age-peels`).

In Sanity seed this creates **separate documents**:

- Canonical: `serviceProcedure-body-slimming-peels-tca-peel`
- Duplicate: `serviceProcedure-anti-age-anti-age-peels-tca-peel`

Same slug `tca-peel`, different `_id`, **independent prices** in CMS.

### 4.4 Studio today

- Entry: `sanity/structure/index.ts` — flat lists + “Browse by category” tree
- Plugins: `structureTool`, `visionTool`, `documentInternationalization` (landing/settings only)
- **Not installed:** `@sanity/orderable-document-list`, `presentationTool`, custom document actions

### 4.5 Flat categories (URL shape)

Code flag in `lib/services/flat-categories.ts`: `blood-tests`, `vitamin-shots`, `laser-hair-removal`.

URLs: `/treatments/{category}/{procedure}` (no subcategory segment).  
Subcategories still exist in data; this is routing logic, not a Sanity field.

---

## 5. Sanity platform features (docs review, June 2026)

Project uses **Sanity Studio v5.28**. Below: what to adopt vs skip.

### 5.1 Adopt in this spec

| Feature | Use case | Official docs |
|---------|----------|---------------|
| **Structure Builder — parent/child taxonomy** | Category → subcategory → procedure tree | [Parent/Child Taxonomy](https://www.sanity.io/docs/developer-guides/parent-child-taxonomy) |
| **Initial Value Templates** | Pre-fill `subcategory` / `category` when creating from tree | [Initial Value Templates](https://www.sanity.io/docs/studio/initial-value-templates) |
| **`reference.options.filter`** | Valid parents only; active concerns only | [Reference type](https://www.sanity.io/docs/studio/reference-type) |
| **`@sanity/orderable-document-list`** | Drag-and-drop order (categories, subs, procedures) | [Plugin](https://www.sanity.io/plugins/orderable-document-list) |
| **Document Actions** | Hide/show, delete-with-children, move procedure | [Document actions](https://www.sanity.io/docs/studio/document-actions) |
| **Built-in Unpublish** | From **published** perspective only (Studio v4.6.1+) | [Document actions](https://www.sanity.io/docs/studio/document-actions) |
| **Presentation Tool** | Live preview, “Used on” links (Phase 4) | [Configuring Presentation](https://www.sanity.io/docs/visual-editing/configuring-the-presentation-tool) |
| **`defineDocuments` / `defineLocations`** | Map procedure/concern ↔ frontend routes | Same as Presentation docs |

### 5.2 Skip for now

| Feature | Reason |
|---------|--------|
| Canvas / Agent Actions / Functions | Solo editor; no AI workflow need |
| Content Releases | No team scheduling requirement |
| App SDK custom app | Structure + actions sufficient |
| Presentation page-building (block DnD) | Site is catalog routes, not page builder |
| Staging dataset | Explicitly declined (D6) |

---

## 6. Target architecture

### 6.1 Source of truth policy (after Phase 1)

| Layer | Role |
|-------|------|
| **Sanity (published)** | Primary for structure, copy, prices, flags, `isActive`, concerns |
| **`lib/services/**`** | Seed source + fallback **only when document/slug missing in CMS** |
| **`lib/services/locale-copy/**`** | Fallback for UK/RU when CMS field empty or still equals EN |

**Rules:**

1. Category exists in Sanity → subcategories/procedures come **only** from GROQ tree (respecting `isActive`).
2. Empty `procedures[]` in Sanity → **empty on site**, not static refill.
3. Missing category in Sanity → static category still shown (backward compat).
4. Field-level fallback (title/description) unchanged — EN/UK/RU chain via `resolveServiceLocalizedField`.

### 6.2 New schema fields

#### `serviceCategory`

```typescript
isActive: boolean  // default true
  // description: "Inactive categories are hidden on the site but kept in Studio."
```

Existing: `slug`, `title`, `shortTitle`, `description`, `image`, `sortOrder`, `featuredOnHomepage`, `featuredInNav`.

#### `serviceSubcategory`

```typescript
isActive: boolean  // default true
orderRank?: string // if using @sanity/orderable-document-list (see Phase 2)
```

#### `serviceProcedure`

```typescript
isActive: boolean  // default true
orderRank?: string
// Phase 5 optional:
alsoListedIn?: array of {
  category: reference → serviceCategory
  displaySubcategoryTitle?: localeString  // virtual grouping label, e.g. "Anti-age peels"
  sortOrder?: number
}
```

#### `treatmentConcern`

No schema change. Already has `isActive`.

### 6.3 GROQ changes (Phase 1)

File: `lib/sanity/queries/services.ts`

- Categories: `*[_type == "serviceCategory" && isActive != false]`
- Subcategories: add `&& isActive != false` inside nested query
- Procedures: add `&& isActive != false` inside nested query
- Order: prefer `order(orderRank asc, sortOrder asc, title.en asc)` after Phase 2

### 6.4 Mapper changes (Phase 1)

File: `lib/sanity/mappers/services.ts`

**In `mapSubcategory`:**

```typescript
// BEFORE (problematic):
procedures: procedures.length > 0 ? procedures : fallbackProcedures,

// AFTER:
procedures: procedures,  // empty array is valid CMS state
```

**In `mapCategory`:**

```typescript
// BEFORE:
subcategories: subcategories.length > 0 ? subcategories : fallbackSubs,

// AFTER:
// If raw.subcategories came from Sanity (parent category in Sanity result),
// use mapped list even if empty. Only use fallbackSubs when entire category
// is missing from Sanity (handled at mapServicesCatalogSafe level).
```

Implement explicit flag or check: “category document exists in Sanity response” vs “built only from fallback”.

**In `mapServicesCatalogSafe`:**

- Keep merging `missingFromSanity` static categories.
- Do **not** merge static subcategories into Sanity-backed categories.

---

## 7. Implementation phases

### Phase 0 — Preparation (0.5–1 day)

| ID | Task | Details |
|----|------|---------|
| 0.1 | Export backup | `sanity dataset export production ./backups/pre-catalog-ux-$(date +%Y%m%d).tar.gz` |
| 0.2 | Baseline URL list | Save checklist — minimum URLs below |
| 0.3 | Baseline data snapshot | GROQ or script: slug + price for all 110 procedures; store JSON in `docs/checklists/` or commit message |
| 0.4 | Branch | `feat/services-catalog-cms-ux` |

**Baseline URLs (minimum):**

- `/treatments`
- `/treatments/body-slimming`
- `/treatments/body-slimming/peels/tca-peel`
- `/treatments/anti-age/anti-age-peels/tca-peel` (duplicate path — note for Phase 5)
- `/treatments/blood-tests/{any-procedure}` (flat)
- `/treatments/concerns/glow`
- `/uk/treatments/...` and `/ru/treatments/...` (one procedure each)
- Homepage services section (featured categories)

**DoD:** backup file exists; baseline captured.

---

### Phase 1 — Trust + hide without delete (3–4 days)

**Priority:** highest — unblocks “remove peels” and CMS trust.

#### 1.1 Schema

Files:

- `sanity/schemaTypes/documents/service-category.ts`
- `sanity/schemaTypes/documents/service-subcategory.ts`
- `sanity/schemaTypes/documents/service-procedure.ts`

Add `isActive` boolean, `initialValue: true`, description for editors.

Preview: show “Hidden” in subtitle when `isActive === false`.

#### 1.2 GROQ + mapper

See §6.3, §6.4.

#### 1.3 Seed

File: `lib/sanity/seed/map-services-documents.ts` — set `isActive: true` on all category/subcategory/procedure docs.

Run `pnpm seed:sanity` after backup.

#### 1.4 Custom document actions

New files suggested:

- `sanity/actions/toggle-active-action.ts`
- `sanity/actions/delete-subcategory-with-children.ts`

Register in `sanity/sanity.config.ts`:

```typescript
document: {
  actions: (prev, context) => { /* filter by schemaType */ },
},
```

**Toggle active action**

- Types: `serviceCategory`, `serviceSubcategory`, `serviceProcedure`
- Label: `Hide on website` / `Show on website`
- Implementation: `useDocumentOperation` → `patch.execute([{ set: { isActive: false } }])` → optional `publish.execute()`
- Show confirmation dialog on hide for categories (warns about hiding entire branch)

**Delete subcategory with children**

- Type: `serviceSubcategory` only
- Query client for `*[_type == "serviceProcedure" && references($id)]`
- Dialog: “Delete N procedures permanently?”
- Delete procedures then subcategory (irreversible — secondary to Hide)

#### 1.5 Site behaviour for inactive category

When `serviceCategory.isActive === false`:

- Exclude from `servicesCatalogQuery` root list
- Exclude from nav previews / homepage featured (mapper or query)
- Direct URL `/treatments/{slug}` → **404** (verify page helper uses catalog)

Files to check:

- `lib/services/category-previews.ts`
- `app/[locale]/treatments/[categorySlug]/page.tsx`
- `generateStaticParams` if any

#### 1.6 Tests

Add/update tests for mapper:

- Sanity category with empty procedures → empty array on site
- `isActive: false` procedure → not in catalog
- `isActive: false` category → not in catalog
- UK/RU title still resolves when CMS has locale fields

**DoD Phase 1:**

- [ ] Hide peels subcategory → gone from `/treatments/body-slimming`, doc remains in Studio
- [ ] Hide single procedure → gone from lists, concern page, category page
- [ ] Hide category → 404 on category URL, removed from nav/home previews
- [ ] Re-seed restores all `isActive: true`
- [ ] UK/RU procedure title unchanged on `/uk/...` and `/ru/...`

---

### Phase 2 — Studio UX: catalog workspace (4–5 days)

#### 2.1 Install plugin

In `sanity/package.json`:

```bash
pnpm add @sanity/orderable-document-list --filter the-skinbar-studio
```

(or from `sanity/` directory per project convention)

Add `orderRankField` to category, subcategory, procedure schemas.

#### 2.2 Restructure `sanity/structure/index.ts`

**Target menu (English UI for Studio):**

```
The Skinbar
├── Site (per locale)          [unchanged]
├── Services
│   ├── Treatments hub         [singleton]
│   ├── Browse by concern      [orderable treatmentConcern list]
│   └── Catalog                [PRIMARY ENTRY — see below]
├── Gift voucher               [unchanged]
└── (remove or collapse legacy flat "1. Categories / 2. Subcategories / 3. Procedures")
```

**Catalog → Categories (orderable)** → pick category →

```
Category: {title}
├── Edit category
├── Subcategories (orderable, filter: category._ref == $categoryId)
│   └── {subcategory} →
│       ├── Edit subcategory
│       └── Procedures (orderable, filter: subcategory._ref == $subcategoryId)
└── All procedures in this category (flat GROQ list for search)
```

Reference implementation pattern: [Sanity parent-child taxonomy guide](https://www.sanity.io/docs/developer-guides/parent-child-taxonomy).

#### 2.3 Initial value templates

In `sanity/sanity.config.ts` → `schema.templates`:

| Template ID | Params | Pre-filled fields |
|-------------|--------|-------------------|
| `subcategory-in-category` | `categoryId` | `category: { _ref: categoryId }` |
| `procedure-in-subcategory` | `subcategoryId` | `subcategory: { _ref: subcategoryId }` |

Wire via `.initialValueTemplates([S.initialValueTemplateItem('procedure-in-subcategory', { subcategoryId })])` on procedure list panes.

#### 2.4 Reference filters

**`serviceProcedure.subcategory`:**

```typescript
options: {
  filter: ({ document }) => {
    // If document has optional categoryContext or infer from subcategory ref
    return { filter: '_type == "serviceSubcategory" && isActive != false', params: {} }
  },
}
```

Optional: add read-only `category` reference on procedure for filtering (denormalized, set by template) — simplifies filter UX.

**`serviceProcedure.concerns`:**

```typescript
filter: '_type == "treatmentConcern" && isActive != false'
```

#### 2.5 List previews

Enhance `preview.prepare` on procedures: price amount, `isActive`, count of concerns.

#### 2.6 Slug protection

After first publish, set slug field `readOnly: true` for non-developers OR always readOnly with description “contact developer to change URL”.

Align with roadmap §3.6.

#### 2.7 Seed + orderRank

Migration in seed: set `orderRank` from existing `sortOrder` ordering within each parent scope.

**DoD Phase 2:**

- [ ] Change procedure price in ≤ 2 clicks from Catalog
- [ ] New procedure in subcategory: subcategory pre-selected
- [ ] Drag-and-drop order reflects on site
- [ ] Inna uses Catalog as primary entry (document in H.1)

---

### Phase 3 — Concerns editing UX (2–3 days)

#### 3.1 Structure pane for concern

Under each `treatmentConcern`:

- **Edit concern**
- **Linked procedures** — document list:

```groq
_type == "serviceProcedure" && references($concernId) && isActive != false
```

Read-only list with links to open procedure documents.

#### 3.2 Optional: bidirectional editor (recommended)

Custom input component on `treatmentConcern` OR separate “Concern links” tool:

- Multi-select all procedures
- On save: patch each affected procedure’s `concerns[]` array
- **Single source of truth remains** `serviceProcedure.concerns[]` (concern side is UI only)

Algorithm:

1. Load current linked procedure IDs
2. On save, compute added/removed sets
3. Patch added: append concern ref; patch removed: filter out ref

**DoD Phase 3:**

- [ ] From concern “Acne control”, see all linked procedures
- [ ] Add/remove link without opening 20 procedure forms

---

### Phase 4 — Presentation Tool + draft mode (3–5 days)

**Prerequisite:** `SANITY_API_READ_TOKEN` on Next.js server (read drafts).

#### 4.1 Next.js routes (new)

- `app/api/draft-mode/enable/route.ts`
- `app/api/draft-mode/disable/route.ts`

Follow [Sanity configuring Presentation tool](https://www.sanity.io/docs/visual-editing/configuring-the-presentation-tool):

- Use `@sanity/preview-url-secret` → `validatePreviewUrl`
- Set perspective cookie
- Redirect to preview path

#### 4.2 Sanity config

```typescript
import { presentationTool, defineDocuments, defineLocations } from 'sanity/presentation'

presentationTool({
  previewUrl: {
    initial: process.env.SANITY_STUDIO_PREVIEW_URL ?? 'http://localhost:3000',
    previewMode: {
      enable: '/api/draft-mode/enable',
      disable: '/api/draft-mode/disable',
    },
  },
  allowOrigins: [
    'http://localhost:*',
    'https://YOUR_PRODUCTION_DOMAIN',
  ],
  resolve: { mainDocuments, locations },
})
```

Env: `SANITY_STUDIO_PREVIEW_URL` for deployed Studio.

#### 4.3 Route resolvers

| Document type | Route pattern | Notes |
|---------------|---------------|-------|
| `treatmentsHub` | `/treatments` | singleton |
| `serviceCategory` | `/treatments/:categorySlug` | |
| `serviceSubcategory` | `/treatments/:cat/:sub` | skip for flat categories in locations |
| `serviceProcedure` | `/treatments/:cat/:sub/:proc` OR flat | two `defineDocuments` entries |
| `treatmentConcern` | `/treatments/concerns/:slug` | |

**defineLocations for procedure** — “Used on” panel:

- Category page URL
- Subcategory page URL (if not flat)
- Each active concern page where linked

#### 4.4 Visual editing (minimal v1)

- Enable stega on Sanity client when draft mode active
- Add `@sanity/visual-editing` to root layout when draft
- Full click-to-edit overlays optional v2

#### 4.5 CORS

Sanity manage → API → CORS → add frontend origin.

**DoD Phase 4:**

- [ ] Open procedure in Studio → Presentation shows correct page
- [ ] “Used on” lists category + concern URLs
- [ ] Publish → existing webhook revalidates site (F.5)

---

### Phase 5 — Procedure dedupe ✅ (completed 2026-06-14)

**Goal:** one canonical `serviceProcedure` document per slug; shared procedures appear in multiple subcategories without duplicate CMS rows.

**Status:** Done. Anti-age category was **removed** (not curated — client decision). Phase 4 (Presentation) skipped.

#### Implemented model

`serviceProcedure` uses **`listedIn[]`** (not `alsoListedIn`):

```typescript
listedIn: array of {
  subcategory: reference → serviceSubcategory
  sortOrder: number
}
```

- Document ID: `serviceProcedure-{slug}` (110 unique slugs → 105 after Botox removal)
- GROQ: `references(^._id)` on subcategory + `listingSortOrder` from matching placement
- Seed: `collectProcedureListingIndex()` from finalized static catalog
- Static: canonical rows in cosmetology / body-slimming; secondary placements via `ADDITIONAL_PROCEDURE_LISTINGS` + `finalizeStaticServicesCatalog()`
- Migration: `pnpm purge:sanity:legacy-procedures` then `pnpm seed:sanity` (no merge script)
- Concerns: dedupe in `getConcernRecommendations()`
- Studio: **Catalog placements** on procedure; **Linked procedures** bulk editor on subcategory (mirrors concern UX)

#### Scripts

| Command | Purpose |
|---------|---------|
| `pnpm purge:sanity:legacy-procedures` | Remove pre-dedupe procedure document IDs |
| `pnpm purge:sanity:botox` | Remove Botox subcategory + procedure docs |
| `pnpm seed:sanity` | Re-seed catalog (includes `theskinbarbyic@gmail.com` in site settings) |

**DoD Phase 5:**

- [x] Single price edit updates everywhere
- [x] One Studio row per procedure slug
- [x] Concern page lists each procedure once
- [x] Static TS duplicates removed from secondary category files
- [x] Subcategory bulk link editor (like concerns)
- [x] Botox removed from catalog (site + CMS)
- [ ] ~~Anti-age curated view~~ — N/A (category removed)

---

### Phase 6 — Client documentation (1–2 days)

Create `docs/client/sanity-quick-start.md` (or Notion export):

| Section | Content |
|---------|---------|
| Start here | Open **Services → Catalog** |
| Change a price | Catalog → category → subcategory → procedure → Price → Publish |
| Hide a service | Procedure → ⋮ → **Hide on website** (or toggle `Active`) |
| Hide whole section | Subcategory or Category → Hide |
| Concern links | Procedure → “Helps with concerns” OR Concern → Linked procedures |
| Subcategory links | Procedure → “Catalog placements” OR Subcategory → Linked procedures |
| Featured flags | Category → Featured on homepage (max 4) / Featured in nav (max 5) |
| Languages | EN / UK / RU tabs on title fields |
| Don't touch | Slugs, document IDs, Vision tool |
| When site doesn't update | Publish + wait ~1 min; contact developer if webhook issue |

Optional: 3 short GIFs for price / hide / concerns.

Update `docs/checklists/g2-post-seed-verification.md` policy section after Phase 1.

**DoD Phase 6:** Inna completes quick start unaided.

---

### Phase 7 — QA & rollout (1–2 days)

| Check | Expected |
|-------|----------|
| All baseline URLs | 200, same content/prices as snapshot |
| Hide procedure | Absent from category, concern, sitemap |
| Hide category | 404, absent from nav/home |
| UK/RU | `/uk/` and `/ru/` procedure pages translated |
| Flat categories | URLs without subcategory segment |
| Sitemap | `app/sitemap.ts` respects `isActive` |
| Revalidate | Publish triggers update |
| Re-seed | Restores full catalog with backup policy |

---

## 8. File touch list (implementation reference)

| Area | Files |
|------|-------|
| Schema | `sanity/schemaTypes/documents/service-*.ts`, `sanity/schemaTypes/index.ts` |
| Structure | `sanity/structure/index.ts` |
| Actions | `sanity/actions/*.ts`, `sanity/sanity.config.ts` |
| Seed | `lib/sanity/seed/map-services-documents.ts` |
| GROQ | `lib/sanity/queries/services.ts` |
| Mapper | `lib/sanity/mappers/services.ts` |
| Static / anti-age | `lib/services/categories/anti-age.ts`, `lib/services/catalog.ts` |
| Concerns list dedupe | `lib/services/concern-recommendations.ts` (Phase 5) |
| Previews / nav | `lib/services/category-previews.ts` |
| Pages 404 | `app/[locale]/treatments/**/page.tsx` |
| Draft mode | `app/api/draft-mode/**`, `lib/sanity/client.ts` |
| Presentation | `sanity/sanity.config.ts` |
| Migration | `scripts/migrate-dedupe-procedures.ts` |
| Tests | `lib/sanity/mappers/services.test.ts` (create if missing) |
| Docs | this file, `g2-post-seed-verification.md`, `part-5-uk-ru.md`, client quick start |

---

## 9. Dependencies & schedule

```text
Phase 0 (1d)
    ↓
Phase 1 (3–4d) ──────────────────────────────┐
    ↓                                        ↓
Phase 2 (4–5d)                          Phase 5 (5–8d, starts after Phase 1)
    ↓                                        ↓
Phase 3 (2–3d) ────┐                         │
Phase 4 (3–5d) ────┼── parallel after Phase 2
                   ↓
              Phase 6 (1–2d)
                   ↓
              Phase 7 (1–2d)
```

**Total estimate:** ~3–4 weeks sequential; Phase 3 ∥ Phase 4 saves ~2 days.

**MVP for Inna (release 1):** Phase 0 + 1 + 2 + 6 (partial)  
**Release 2:** Phase 3 + 4 + 5 + 6 (full) + 7

---

## 10. Risks & mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Mapper fallback hides bugs | Site shows stale content | Phase 1 tests + g2 policy update |
| Re-seed overwrites Inna edits | Lost CMS work | Backup before seed; migration not re-seed for Phase 5 |
| orderRank vs sortOrder drift | Wrong order | Seed maps sortOrder → orderRank; GROQ uses both |
| Anti-age URL break | SEO / bookmarks | 301 redirects; baseline URL test |
| Presentation CORS / iframe | Preview blank | allowOrigins + CSP frame-ancestors |
| Dedupe breaks concern links | Missing on concern pages | Migration merges concerns[]; dedupe in getter |
| Flat category resolver wrong | Preview opens wrong URL | Separate defineDocuments entries |

---

## 11. Out of scope (this spec)

- Staging dataset
- Canvas / Agent Actions / Sanity Functions
- Procedure images in CMS (roadmap D.3 — separate)
- Cookie / a11y strings in `messages/` (roadmap)
- Legal Studio UX polish (E.4)
- Removing static catalog entirely (remains seed + safety net)

---

## 12. Acceptance criteria (project complete)

1. Inna hides subcategory **without delete**; site matches within revalidate window.
2. Inna changes price in **≤ 2 clicks** from Catalog entry.
3. CMS published state **matches site** — no static structure resurrection.
4. Each procedure slug exists **once** in Studio; one price everywhere (shared subcategories via `listedIn`).
5. UK/RU procedure pages show translated titles (CMS or locale-copy fallback).
6. Presentation preview works for category, procedure, concern (Phase 4).
7. Client quick start document delivered (Phase 6).

---

## 13. Changelog

| Date | Change |
|------|--------|
| 2026-06-14 | Initial spec: translation audit, phased plan, Sanity docs review, locked decisions D1–D8 |
| 2026-06-14 | Phase 5 complete: `listedIn` dedupe, static cleanup, subcategory bulk links, anti-age + Botox removed, seed email updated |
