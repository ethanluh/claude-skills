---
name: notes-to-polished-draft
description: >-
  Turn rough notes into a polished draft through reader-value framing,
  drafting, a structural revision pass, and a multi-pass self-edit — never
  mixing structural and surface-level checks in one read-through. Use
  whenever Ethan asks to turn notes into a draft, write up something from
  rough notes, or polish a draft from scratch through to final proofreading.
  For a portfolio/project write-up specifically, this workflow drives that
  structure via the `portfolio-case-study-writing` skill; for tightening
  prose that already exists without a full drafting pass, use
  `concise-technical-prose` directly instead.
---

# Notes-to-Polished-Draft

Four stages, run in order. Never fold a later stage's checks into an
earlier pass — each stage has a distinct failure mode it's built to catch,
and mixing them (e.g. fixing passive voice while still checking the thesis)
wastes the pass on the wrong layer (Purdue OWL, UNC Writing Center).

## 0. Inputs

Rough notes or a topic, and — if the deliverable is a portfolio/project
write-up — that fact stated up front so stage 2 routes through
`portfolio-case-study-writing` instead of a generic structure.

## 1. Reader-value framing (before drafting)

Load `reader-value-framing`. Decide, before writing a word of the draft:
what problem or tension does this specific reader already treat as
unresolved or worth their attention. Reject a background-first opening in
favor of Problem-then-Response — the draft's first paragraph should carry
an instability marker ("however," "but," "surprisingly," a named gap), not
settled context (McEnerney). This decision drives every later structural
choice; skipping it and drafting straight from notes is the most common
way a draft ends up organized around what the writer wants to say instead
of what the reader needs.

## 2. Draft

Write the draft against the framing decided in stage 1. If the deliverable
is a portfolio or project case study, hand structure to
`portfolio-case-study-writing` (Hook/Research/Build/Iterate/Outcome) as the
instantiation of this stage — don't invent a competing skeleton. Otherwise
draft freely; this stage optimizes for getting the argument and evidence
down, not for phrasing.

## 3. Structural revision pass (higher-order concerns only)

One read-through, checking only:
- Thesis: is the main point actually stated, and is it still the right one
  now that the draft exists?
- Purpose: does the draft argue, analyze, evaluate, or apply — and does
  every section serve that purpose?
- Evidence: does each section's support actually connect to the thesis?
- Cut: remove material that doesn't connect, even if well-written — it
  gets cut here, before it would otherwise get polished for nothing
  (Purdue OWL).

Read as if it were someone else's draft. Step away before stage 4 so the
next pass starts with distance (Purdue OWL).

## 4. Multi-pass self-edit (lower-order concerns, one category per pass)

This is the `self-editing-pass-routine` instantiation. Run separate,
single-purpose passes, never combined — attention narrows accuracy per
pass (UNC Writing Center):

1. Passive voice — flag and convert where it hides the actor.
2. Wordy filler — cut "there is," "due to the fact that," and similar; for
   sentence-level tightening beyond a quick pass, use
   `concise-technical-prose`.
3. Pronoun ambiguity — every "it," "this," "they" resolves to one clear
   antecedent.
4. Tone and consistency — check against the target reader from stage 1,
   not the writer's default register.
5. Final proofreading pass, surface-level only — spelling (including
   homophones spell-check misses), grammar, punctuation, citation
   mechanics. Read backwards sentence-by-sentence to catch spelling; read
   isolated sentences to catch grammar. No content or structure changes in
   this pass — if one surfaces, it belongs in stage 3, not here (Purdue
   OWL, UNC Writing Center).

## 5. Output

The polished draft, plus a short note of what stage 3 cut (if anything)
and which lower-order pass categories from stage 4 actually found issues —
so a re-edit later can skip clean categories.
