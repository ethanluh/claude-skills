# Architecture

## Overview

A static Next.js site, exported and deployed as a Cloudflare Worker
serving static assets at `skills.ethanluh.com`, that lists Ethan's
shareable Claude Code skills and links each one back to its folder on
GitHub for cloning or direct download.

## Components

- `content/skills/<id>/` — copied skill files (source of truth is
  BigBrain's private `.claude/skills/`, not this repo).
- `content/skills.json` — generated manifest: id, display title, the
  frontmatter description, and the list of files per skill.
- `skills.config.json` — the `enabled` list controlling what's shown.
- `app/page.tsx` — a Server Component that reads both JSON files at build
  time and renders one card per enabled skill.
- `scripts/sync-skills.mjs`, `scripts/build-manifest.mjs` — the two-step
  update pipeline, run manually from a BigBrain checkout.
- `wrangler.jsonc` — declares a Worker (`assets.directory: "out"`, no
  `main` script) that serves the static export directly, bypassing
  Cloudflare's default Next.js/OpenNext (SSR) auto-config.
- `.github/workflows/deploy.yml` — builds and runs `wrangler deploy` on
  every push to `main`. Uses a `deploy-production` concurrency group with
  `cancel-in-progress: true`, so if two merges land in quick succession the
  older run is cancelled and only the latest is deployed.
- Cloudflare Worker project (configured in the Cloudflare dashboard, not in
  this repo) — hosts `skills.ethanluh.com` and serves what the Action
  deploys; its own automatic-deployments trigger is turned off so the
  Action is the only thing pushing new versions.

## Data Flow

1. A skill changes in BigBrain.
2. `npm run sync:skills` copies the allowlisted skill directories into
   `content/skills/`.
3. `npm run build:manifest` regenerates `content/skills.json` from those
   directories.
4. Commit and push. `deploy.yml` builds the static export and runs
   `wrangler deploy` to upload `out/` to `skills.ethanluh.com`.
5. To change what's visible without touching skill content, edit
   `skills.config.json` directly and push.

## Key Decisions

- **No embedded downloads.** The BigBrain-hosted prototype (a claude.ai
  Artifact) had to embed file contents as base64 because the source repo
  was private. This repo is public, so cards just link to GitHub — cloning
  or GitHub's own "Download ZIP" already covers it.
- **No hosted admin page.** Visibility is a single JSON file, edited and
  pushed like any other change — versioned, no auth surface to protect on
  a public site.
- **Cloudflare over GitHub Pages.** `ethanluh.com`'s DNS already lives on
  Cloudflare, so a custom subdomain (`skills.ethanluh.com`) is a
  same-dashboard custom-domain add. The site was briefly deployed to
  GitHub Pages first; that workflow has been removed in favor of this.
- **GitHub Actions over Cloudflare's own auto-deploy trigger.** Cloudflare's
  dashboard can watch `main` and deploy on its own, but it has no
  built-in way to cancel a superseded run when two merges land back to
  back. `deploy.yml`'s concurrency group gives that for free, so it's the
  single deploy trigger and Cloudflare's automatic-deployments setting is
  left off.
- **Static-assets Worker over Cloudflare Pages' default Next.js preset.**
  The dashboard's default "Next.js" framework preset assumes SSR and runs
  the OpenNext adapter (`npx wrangler deploy` triggers an auto-migration
  to it), which fails against a static export — there's no server build
  for it to bundle. Committing `wrangler.jsonc` with an explicit
  `assets.directory` makes `wrangler deploy` skip that auto-config
  entirely and just upload the static files.
