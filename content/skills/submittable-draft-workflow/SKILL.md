---
name: submittable-draft-workflow
description: >-
  Research result to submittable draft — chains paper-structuring,
  related-work, and LaTeX/figure skills into an end-to-end pipeline: gather
  citations into a thematic related-work section, slot results into the
  section skeleton, and enforce LaTeX/figure hygiene before submission. Use
  whenever Ethan has a result (an experiment, a proof, a method) and wants it
  turned into a submittable paper draft, or says "turn this into a paper",
  "draft the paper", "get this ready to submit", or "assemble the draft".
---

# submittable-draft-workflow — result to submittable draft

Inputs: the research result itself (data/results, method description, or a
proof) and whatever citation pile already exists (a reading list, a `.bib`
file, or notes). If no citations exist yet, stage 2 starts from scratch.

This workflow chains three sibling skills in order — don't skip a stage or
reorder them; each stage's output is the next stage's input.

## 1. Structure the skeleton

Invoke `paper-structuring`. Produce the section skeleton (intro, related
work, methods, results, conclusion) and, for each section, note which
reader-question it must answer before any prose is written — motivation
(intro), prior-art gap (related work), mechanism (methods), evidence
(results), closure (conclusion). Also decide, per that skill's placement
rule, whether related work is folded into the intro (prior work is
prerequisite to understanding the contribution) or stands alone (comparison
is easier once the reader knows the paper's own approach). This decision
gates stage 2.

## 2. Build the related-work section

Invoke `related-work-section-writing` on the citation pile. Group sources
thematically (not one paragraph per citation), scale detail by proximity to
the paper's own contribution (background: name-drop; close work: 1-3
sentences; near-identical work: explicit differentiation), and close with an
explicit statement of the gap the paper fills. Enforce the citation-as-noun
anti-pattern (name authors, don't write "In [12], ..."). Target ~1 page in
standard conference format. If stage 1 chose intro-embedded placement,
compress this into the intro rather than producing a standalone section.

## 3. Slot in the result

Write methods and results directly into the skeleton from stage 1, using the
actual research result as source material. Keep methods to a single logical
throughline (2-4 sections, no scattering one idea's justification across
noncontiguous sections). Keep results presentation objective — tables,
figures, and text a reader can verify independently — with interpretation
held separate. Write the conclusion last: address stage 1's stated
objectives point-by-point, state advantages over the related-work section's
named prior approaches explicitly, and name open problems rather than a
vague "future work" line.

## 4. Enforce LaTeX and figure hygiene

Invoke `latex-conventions` over the assembled `.tex` source before treating
the draft as submittable:

- One sentence per line (no fixed-width wrapping) for legible diffs.
- Non-breaking reference spacing (`Figure~\ref{...}`), ideally via a wrapper
  command applied consistently.
- Notation fixed once via macros (scalar/vector/matrix/random-variable
  conventions), referenced everywhere rather than typed inline.
- Tables via `booktabs` (no vertical rules); `siunitx` for all units,
  currencies, and numeric alignment.
- Each data-derived figure has a dedicated regeneration script — no
  manually-replotted figures; vector format (EPS) unless a dense plot
  justifies rasterizing.

## 5. Output

One short prose block, no headers: which stage produced which artifact
(skeleton, related-work draft, filled sections, hygiene pass), any checklist
item deferred and why, and what's left before the draft is submission-ready
(e.g. missing figures, an unresolved placement decision from stage 1).
