# web-app-template

This is a **template repository** for web app projects using Next.js,
TypeScript, and Tailwind CSS. It provides a starting point with app scaffolding,
testing setup, and documentation already wired up.

## Usage

Create a new repo from this template:

```
gh repo create <new-repo-name> --template ethanluh/web-app-template --private
```

Or use the "Use this template" button on GitHub.

Then:

1. Update `CLAUDE.md` (project description and stack details).
2. Update `package.json` (name, description).
3. Replace the placeholder content in `app/page.tsx`.
4. Update `docs/decisions/0001-template.md` — replace with project-specific ADRs.
5. `LICENSE` — add one appropriate to the new project.

## What to customize

- `app/` — replace with your routes, layouts, and pages.
- `app/components/` — add your shared components.
- `tests/` — add your test cases.
- `docs/ux-principles.md` — reference (and extend) when designing or reviewing UI.
- `docs/decisions/0001-template.md` — replace with project-specific ADRs.

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

No license is included by default — add one (e.g. MIT, Apache-2.0) before
treating a derived project as open source.
