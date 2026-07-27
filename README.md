# claude-skills

A public, browsable index of Ethan's shareable Claude Code skills — no
access to the private `BigBrain` vault repo required. The skills themselves
live in `content/skills/`, synced in from BigBrain; the site links each one
back to its folder on GitHub so anyone can clone the repo or grab a single
skill's files.

Live site: `https://skills.ethanluh.com` (via a Cloudflare Worker serving
static assets — see below).

## Updating a skill's content

Skills are authored in `BigBrain/.claude/skills/`, not here. When one
changes:

```bash
npm run sync:skills      # copies the allowlisted skills from ~/Obsidian/BigBrain/.claude/skills
npm run build:manifest   # regenerates content/skills.json (titles, descriptions, file lists)
```

Then commit and push. Don't hand-edit anything under `content/skills/` —
it's overwritten by the next sync.

## Choosing which skills are visible

`skills.config.json` at the repo root is the single source of truth:

```json
{ "enabled": ["pr", "code-review", "..."] }
```

Edit the list, commit, and push. There's no separate admin UI — the config
file _is_ the admin dashboard, and it's versioned like everything else.

## One-time deploy setup (Cloudflare)

`ethanluh.com`'s DNS is already on Cloudflare. This deploys as a Worker
that serves static assets (`wrangler.jsonc`'s `assets.directory`), not
through the Next.js/OpenNext SSR adapter — this app is a static export and
has no server-side code, so there's nothing for that adapter to run.
Cloudflare's dashboard defaults a Git-connected Next.js project to the
OpenNext path, which fails on a static export; committing `wrangler.jsonc`
here is what makes `wrangler deploy` skip that auto-config and just upload
`out/` directly.

Done once in the Cloudflare dashboard, under Workers & Pages, then Create,
then Import a repository:

1. Connect this repo, production branch `main`.
2. Build command: `npm run build`.
3. Deploy command: `npx wrangler deploy`.
4. After the first deploy succeeds, open the project's Custom domains tab
   and add `skills.ethanluh.com`. Since the zone is already on Cloudflare,
   the DNS record is created automatically.

Every push to `main` after that triggers a new build and deploy
automatically — there's no GitHub Actions workflow involved.

## Developing

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Testing

```bash
npm run test
npm run typecheck
npm run lint
```

## License

No license is included — this repo is meant for direct browsing/cloning by
the team, not third-party redistribution. Add one if that changes.
