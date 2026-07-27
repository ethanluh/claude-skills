---
name: latex-conventions
description: >-
  LaTeX conventions — enforces source hygiene (one-sentence-per-line),
  notation macros, booktabs/siunitx table formatting, and non-breaking
  reference spacing on a .tex draft. Use whenever Ethan is writing or
  reviewing a .tex paper draft, setting up notation for a new paper, adding
  or reviewing a table, or asks "clean up this LaTeX" / "check my LaTeX
  conventions" / "is this table formatted right".
---

# latex-conventions

Checklist for disciplined `.tex` source, grounded in
[[paper-tips-and-tricks-latex]] (Wookai's paper-tips-and-tricks). Apply this
to any `.tex` draft being written or reviewed — it's about the habits that
separate a clean, reviewable submission from a messy one, not LaTeX syntax
itself.

## Checklist

**Source hygiene**
- [ ] One sentence per line in the source — never wrap prose to a fixed
      column width. This is a version-control argument: a reviewer or
      co-author's diff should show exactly which sentence changed, not a
      reflowed paragraph blob.

**Reference spacing**
- [ ] Every reference to a figure, table, section, or equation uses a
      non-breaking space (`~`) between the type word and its number:
      `Figure~\ref{fig:x}`, `Table~\ref{tab:y}`. A regular space lets line
      breaks separate "Figure" from "3."
- [ ] If the paper has more than a handful of references, wrap the pattern
      in a custom command (e.g. `\newcommand{\reffig}[1]{Figure~\ref{#1}}`)
      so the convention is enforced structurally instead of remembered
      per-instance.

**Notation macros**
- [ ] Fix notation once, in the preamble, via macros — never hand-type the
      same symbol type inconsistently across the paper:
  - scalars: lowercase italic (`$x$`)
  - vectors: bold italic lowercase (`\vec{x}`)
  - matrices: bold italic uppercase (`\mat{X}`)
  - random variables: italic uppercase (`$X$`)
- [ ] Reference notation only through these macros. A later notation change
      (e.g. switching vector style) becomes a one-line edit to the macro
      definition, not a manual find-and-replace across the draft.

**Tables**
- [ ] Use `booktabs` (`\toprule`, `\midrule`, `\bottomrule`) — never manual
      `\hline` grids or vertical rules (`|`). Vertical rules and heavy
      grids read as an unpolished draft at top venues.
- [ ] Use `\cmidrule` for partial horizontal rules under grouped columns,
      and `\addlinespace` for breathing room between grouped rows — don't
      fake spacing with blank rows or extra `\hline`s.
- [ ] Use `siunitx` (`\num`, `\si`, the `S` column type) for every unit,
      currency, and numeric value — never format numbers by hand. Manual
      formatting is how one table ends up with 3 decimal places and
      another with 2; `siunitx` owns alignment and rounding centrally.

**Figures (production pipeline, not design)**
- [ ] Each data-derived figure has its own generating script — regenerating
      a figure after the underlying data changes should be a script re-run,
      not a manual re-plot. Treat figures as build artifacts.
- [ ] Save figures as EPS (vector) for LaTeX/pdfLaTeX compatibility;
      rasterize only where file size actually matters (dense scatter/heatmap
      plots).

## When reviewing someone else's draft

Flag violations plainly rather than silently fixing them if the fix would
touch prose you don't own — call out the line, the rule violated, and the
specific correction (e.g. "line 142: `Figure \ref{fig:3}` needs a `~`, not a
space").
