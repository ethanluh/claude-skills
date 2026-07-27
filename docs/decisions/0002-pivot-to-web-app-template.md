# 0002. Pivot to a Next.js web app template

## Context

The repo started as a generic Python/C++ research template (uv, ruff, mypy,
pytest, CMake, Catch2). Its actual use has shifted to bootstrapping web
apps, so the tooling no longer matched what new projects need on day one.

## Decision

Replace the Python and C++ tooling with a Next.js (App Router) + TypeScript +
Tailwind CSS stack: npm scripts for dev/build/lint/format/typecheck/test,
ESLint + Prettier, and Vitest + Testing Library. Add `docs/ux-principles.md`
(Laws of UX) as a standing reference for UI work, linked from `CLAUDE.md`.
Update `.github/workflows/ci.yml` and `lint.yml` (with explicit sign-off, per
the `CLAUDE.md` restriction on workflow edits) to run the npm scripts instead
of the old Python/C++ toolchain.

## Consequences

- New repos start with a working Next.js app, lint/type-check/test tooling,
  a green CI pipeline, and a UX principles checklist out of the box.
- Deviating from this template (e.g. swapping Next.js for another framework)
  is expected and should be recorded as a new ADR in this directory.
