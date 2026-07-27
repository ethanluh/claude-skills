# CLAUDE.md

## Project

<one-line description — fill in per-project>

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, React 19, Vitest + Testing Library, ESLint, Prettier.

## Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format` (check-only: `npm run format:check`)
- Type check: `npm run typecheck`
- Test: `npm run test`

## Conventions

- Terse commit messages, imperative mood, no trailing period.
- Prefer smallest adequate file format (.md over .docx, .csv over .xlsx).
- No comments unless logic is non-obvious.
- Function components with hooks only; no class components.
- Co-locate component tests under `tests/`, mirroring the source path.
- Follow the UI/UX principles in `docs/ux-principles.md` for any UI or design work — check the quick checklist at the bottom of that file before considering UI work done.

## Directory map

- `app/` — routes, layouts, and pages (Next.js App Router)
- `app/components/` — shared React components
- `tests/` — test suite (Vitest + Testing Library)
- `docs/` — architecture notes, ADRs, setup instructions, UX principles
- `public/` — static assets

## Out of scope

Claude Code should not modify `.github/workflows/` without explicit request.
