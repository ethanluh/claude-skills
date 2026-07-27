---
name: css-layout-techniques
description: >-
  Modern CSS layout mechanisms for component-level responsiveness --
  container queries as the core technique, distinct from page-level
  media queries and from design-principle heuristics like grid systems
  or spacing (that's the `ui-ux-design` skill's territory). Use whenever
  building or reviewing a reusable component (card, widget, form section,
  sidebar module) that needs to look right in more than one placement,
  when a layout bug traces back to "this only works in the spot it was
  designed for," or when deciding whether a responsive rule belongs on
  `@media` or `@container`. Covers `container-type`/`@container` syntax
  and how it composes with viewport media queries; does not cover grid
  systems or spacing scales as design principles.
---

# CSS Layout Techniques -- Container Queries

## Core reframe
A component's ideal layout depends on the space its *container* gives it,
not the screen size. The same card can need different breakpoints in a
sidebar versus a full-width hero, even on an identical viewport. Media
queries answer "how big is the screen"; container queries answer "how
much space do I actually have." They are complementary, not competing --
media queries still govern page-level shifts (nav collapse, page grid
column counts); container queries handle a single component's internal
adaptation wherever it's dropped.

## Checklist

- [ ] **Identify the responsibility level first.** Is this rule about the
      page/viewport (nav collapsing, overall grid column count) or about
      one component's internal layout? Page/viewport rules use `@media`;
      single-component rules use `@container`.
- [ ] **Any component meant for more than one placement** (card, widget,
      form section, sidebar module) defaults to container queries, not an
      assumed single fixed context. If it's only ever rendered in one
      spot, this is premature -- don't add ceremony YAGNI would skip.
- [ ] **Opt in explicitly.** Container queries don't work on arbitrary
      ancestors -- an ancestor element must be declared a query container
      first:
      ```css
      .card-wrapper { container-type: inline-size; }

      @container (min-width: 400px) {
        .card { grid-template-columns: 1fr 2fr; }
      }
      ```
      Forgetting `container-type` on the ancestor is the most common
      reason `@container` rules silently never fire.
- [ ] **Reuse existing breakpoint tokens** (SM/MD/LG/XL) at the container
      level instead of inventing a parallel token system -- the practical
      adoption path is applying tokens teams already have, just scoped to
      `@container` instead of only `@media`.
- [ ] **Don't treat container queries as a universal replacement** for
      media queries -- keep media queries for genuine page-level
      responsiveness; specify per-rule which one applies rather than
      picking one mechanism vault-wide.
- [ ] **Check baseline support** before relying on container queries in a
      project with a hard legacy-browser requirement (support was
      "Baseline Widely Available" as of the source article; verify
      current status if the target audience is unusual).
- [ ] **Design-principle questions stay out of scope here** -- grid
      systems, spacing scales, and visual hierarchy are the `ui-ux-design`
      skill's job. This skill is the CSS mechanism (`container-type` /
      `@container`, and related implementation-level tools like
      `:has()`, subgrid, cascade layers), not the design heuristic.

## Source
Grounded in [[how-to-use-container-queries-now]] (web.dev, "How to Use
Container Queries Now").
