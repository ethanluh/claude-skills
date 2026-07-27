# CLAUDE.md

## Project

Static, public index site listing Ethan's shareable Claude Code skills, deployed to Cloudflare Pages at skills.ethanluh.com.

## Stack

Next.js (App Router, static export), TypeScript, Tailwind CSS, React 19, Vitest + Testing Library, ESLint, Prettier.

## Commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format` (check-only: `npm run format:check`)
- Type check: `npm run typecheck`
- Test: `npm run test`
- Sync skill content from BigBrain: `npm run sync:skills`
- Regenerate the manifest after syncing: `npm run build:manifest`

## Conventions

- Terse commit messages, imperative mood, no trailing period.
- Prefer smallest adequate file format (.md over .docx, .csv over .xlsx).
- No comments unless logic is non-obvious.
- Function components with hooks only; no class components.
- Co-locate component tests under `tests/`, mirroring the source path.
- Follow the UI/UX principles in `docs/ux-principles.md` for any UI or design work — check the quick checklist at the bottom of that file before considering UI work done.
- `content/skills/**` is synced content, not hand-authored — re-run `npm run sync:skills` instead of editing files there directly.
- Visibility on the deployed site is controlled by `skills.config.json` (an `enabled` array of skill ids) — there is no separate admin UI; edit that file and push.

## Directory map

- `app/` — routes, layouts, and pages (Next.js App Router)
- `content/skills/` — synced copies of shareable skills from BigBrain's `.claude/skills/`
- `content/skills.json` — generated manifest (title, description, file list per skill); regenerate with `npm run build:manifest`
- `skills.config.json` — which skill ids are visible on the site
- `scripts/` — `sync-skills.mjs` and `build-manifest.mjs`
- `tests/` — test suite (Vitest + Testing Library)
- `docs/` — architecture notes, setup instructions, UX principles
- `public/` — static assets

## Out of scope

Claude Code should not modify `.github/workflows/` without explicit request.
