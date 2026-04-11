<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# AGENTS.md — Project Context & Rules (Cosmetology Landing)

## 1. AI BEHAVIOUR & STYLE

- **Language**: Always respond in Russian.
- **Code**: English only (variables, comments, strings, types).
- **Meta**: Lead with "Why", then "How". No silent refactors.
- **Scope**: Ask before touching files not mentioned in the task.
- **Limits**: Components/Functions < 150 lines. No 'any' in TS.
- **Architecture**: page/layout → feature component → shared component → hook/util.

## 2. TECH STACK (Next.js 16 Specifics)

- **Framework**: Next.js 16 (App Router, NO `src/` directory).
- **Package Manager**: `pnpm` exclusively (packageManager: pnpm@9.x).
- **Icons**: `@phosphor-icons/react` (weights: thin/light for beauty aesthetic).
- **Fonts**: `next/font` only (Playfair Display for headings, Montserrat for body).
- **Forms**: Resend (Server Actions) + Zod for validation.

## 3. TAILWIND CSS v4 (MANDATORY)

- **Import**: `@import "tailwindcss";` in `globals.css` (NO @tailwind directives).
- **Config**: NO `tailwind.config.js`. Use `@theme` block in CSS.
- **Design Tokens**:
  - `--color-background: #FAFAF8;`
  - `--color-surface: #F0EDE8;`
  - `--color-primary: #2C2C2C;`
  - `--color-accent: #C4956A;`
  - `--color-muted: #8A8A8A;`
  - `--color-border: #E5E0D8;`
- **Syntax**: Use slash for opacity (`bg-primary/50`), parentheses for vars (`bg-(--color-accent)`).

## 4. COMPONENT RULES

- **Naming**: kebab-case for files, PascalCase for exports (UserCard.tsx).
- **Booleans**: prefix with is/has/can (e.g., `isVisible`).
- **Images**: Use `next/image` with priority for Hero.
- **Buttons**: Action + Outcome (e.g., "Записаться на консультацию").

## 5. COPYWRITING (Senior Mode)

- **Framework**: JTBD (Focus on outcomes, not features).
- **Headlines**: 4U (Urgency, Ultra-specific, Unique, Useful).
- **Format**: Provide 3 variants (Safe, Punchy, Benefit-driven) for marketing copy.

## 6. PROJECT STRUCTURE

- `/app` - Routes, layouts, Server Actions.
- `/components/ui` - Atomic shared components (Buttons, Badges).
- `/components/sections` - Landing blocks (Hero, BeforeAfter).
- `/lib` - Configs, API clients, Zod schemas.

## 7. PERFORMANCE

- Images: WebP only, explicit width/height always
- Lazy load everything below the fold
- No layout shift (CLS) — reserve space for images

<!-- END:nextjs-agent-rules -->
