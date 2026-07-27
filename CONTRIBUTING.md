# Contributing

## Branch naming

`<type>/<short-description>`, e.g. `fix/off-by-one-in-parser`,
`feat/add-retry-logic`. Types: `feat`, `fix`, `docs`, `refactor`, `test`,
`chore`.

## Commit style

Terse, imperative mood, no trailing period (e.g. `Fix off-by-one in parser`).

## Pull request checklist

- [ ] `npm run test` passes
- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] `npm run typecheck` passes
- [ ] UI changes reviewed against `docs/ux-principles.md`
- [ ] PR description explains _why_, not just _what_
