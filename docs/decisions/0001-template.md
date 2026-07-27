# 0001. Use this template repo structure

## Context

New projects need a consistent starting point for tooling, CI, and docs so
that setup time isn't spent re-deriving the same conventions each time.

## Decision

Adopt this repo's structure (consistent tooling, CI, and docs conventions) as
the default template for new projects. See ADR 0002 for the current stack
(Next.js/TypeScript/Tailwind), which superseded the original Python/C++ setup.

## Consequences

- New repos start with working lint/type-check/test CI out of the box.
- Deviating from the template is expected and should be recorded as a new
  ADR in this directory.
