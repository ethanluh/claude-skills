---
name: documentation-structure
description: >-
  Organize READMEs and project docs by which of four distinct reader needs a
  piece of content serves — tutorial, how-to, reference, explanation —
  instead of letting one document try to do all four jobs badly. Use when
  writing or reviewing a README, project doc, or docs site; when a doc feels
  bloated or unfocused; when deciding where a piece of content belongs; or
  when someone asks "why is this README so long/confusing."
---

# Documentation Structure (Diátaxis)

Grounded in the Diátaxis framework (Daniele Procida; adopted by Django,
Cloudflare, Gatsby). Root cause of most bad docs: conflating four distinct
reader needs into one undifferentiated file.

## The four quadrants

| Mode | Reader need | Oriented toward | Rule |
|---|---|---|---|
| **Tutorial** | Learning, guided | doing + acquisition | Instructor owns the learner's success. Optimize for confidence/momentum, not efficiency or completeness. No troubleshooting, no option coverage — that breaks the lesson. |
| **How-to guide** | Solve one specific problem | doing + application | Assumes a competent reader who knows the domain. Give the steps to the goal. No background explanation — verbosity works against the reader here. |
| **Reference** | Look something up | cognition + application | Neutral, structural, complete. Mirrors the shape of the thing (e.g., a codebase's module structure). No narrative, no persuasion — just facts. |
| **Explanation** | Understand why | cognition + acquisition | The only mode about understanding, not doing. Discusses context, alternatives, tradeoffs. The one place discursive "by the way" content belongs. |

## Checklist: identifying which quadrant content belongs to

For any paragraph or section, ask:

1. Is the reader trying to **do** something right now, or trying to
   **understand** something? (action vs. cognition axis)
2. Are they **learning** the domain for the first time, or **applying**
   knowledge they already have? (acquisition vs. application axis)
3. Those two answers pin one of the four quadrants. If you can't answer
   both questions for a given passage, it's probably drifted out of its
   document's mode.

Apply this per-paragraph, not just per-document — a how-to guide with a
paragraph of "why this works" explanation embedded in step 3 has the same
bug as a whole document with the wrong mode.

## Anti-pattern: one document serving all four jobs

A README that tries to simultaneously onboard a new user (tutorial), give
quick command references (reference), and explain design rationale
(explanation) in one wall of text is the textbook failure. Symptoms:

- A beginner drowns in options meant for an expert (reference bleeding
  into tutorial).
- An expert wades through hand-holding to find one command (tutorial
  bleeding into how-to/reference).
- Rationale and alternatives interrupt someone who just wants the steps
  (explanation bleeding into how-to).

The fix is **splitting by function, not editing prose** — move each
quadrant's content into its own doc (or clearly delimited section), don't
try to trim the wall of text into something shorter that still does all
four jobs. A "Quick Start" tutorial, a "How-to" section per task, a
command/API reference table, and a "Design notes"/"Why" doc are four
different artifacts, not four headings in one file.

## Applying to a README/project-docs review

1. List every section currently in the doc.
2. Tag each with its quadrant using the two-axis test above.
3. Flag any section (or paragraph within a section) whose tag doesn't
   match its neighbors — that's bleed.
4. Propose a split: which sections become their own file/section, in
   quadrant-pure form.

Related but distinct: `explanation-craft` covers simplification technique
*within* a passage — this skill decides *which kind of document to write
and where information belongs* in the first place.
