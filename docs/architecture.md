# Architecture

## Overview

A static Next.js site, exported and deployed to Cloudflare Pages at
`skills.ethanluh.com`, that lists Ethan's shareable Claude Code skills and
links each one back to its folder on GitHub for cloning or direct
download.

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
- Cloudflare Pages project (configured in the Cloudflare dashboard, not in
  this repo) — builds `npm run build` and serves the `out/` directory on
  every push to `main`.

## Data Flow

1. A skill changes in BigBrain.
2. `npm run sync:skills` copies the allowlisted skill directories into
   `content/skills/`.
3. `npm run build:manifest` regenerates `content/skills.json` from those
   directories.
4. Commit and push. Cloudflare Pages builds the static export and deploys
   it to `skills.ethanluh.com`.
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
- **Cloudflare Pages over GitHub Pages.** `ethanluh.com`'s DNS already
  lives on Cloudflare, so a custom subdomain (`skills.ethanluh.com`) is a
  same-dashboard custom-domain add, with no GitHub Actions workflow to
  maintain. The site was briefly deployed to GitHub Pages first; that
  workflow has been removed in favor of this.
