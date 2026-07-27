---
name: explanation-craft
description: Principles for explaining complex information clearly — simplification/ELI5 technique, public-speaking structure, technical-writing clarity, and information-design/cognitive-load rules for diagrams. Use when planning any explanation, presentation, proposal, or visual artifact, or when critiquing one for clarity, verbosity, or structure.
---

# Explanation Craft

Cross-domain principles for explaining things — complementary to skills that
generate the actual artifact (`visual-explainer` for HTML); this one is the
underlying reasoning for *why* a given structure or cut is correct. Distilled
from `insights/explanation-craft-insights.md` (20 sources across four
sub-topics).

## The one meta-principle

Sequence information in the order the audience needs it, built from what
they already know — not the order it was discovered, derived, or built.
Every sub-topic below arrives at this independently (curse-of-knowledge
research, Aristotle's *endoxa*, the inverted pyramid, Diátaxis's
mode-separation). When in doubt about structure, apply this first.

## Simplification (ELI5)

- Simplification is a sequencing problem, not a vocabulary problem: explain
  first, analogize second (analogy is for the genuinely unintuitive residue,
  not a default garnish); reveal detail progressively, general case before
  edge case.
- The curse of knowledge (an expert can't model what a novice doesn't know)
  is not fixed by being aware of it — not even paid incentives fix it. The
  only reliable remedy is testing the explanation on a real outsider.
- Depth has an empirically supported ceiling: more than two nested
  detail-layers ("if you want more detail...") degrades comprehension rather
  than serving the curious reader. Stop at two.
- Distinguish an individual bias (you assumed too much prior knowledge) from
  a structural incentive failure (optimizing for "feels satisfying" over
  "is accurate") — they need different fixes.

## Public speaking / narrative structure

- Structure operates at two altitudes simultaneously: a whole-piece arc (a
  throughline compressible to about 15 words; oscillation between "what is"
  and "what could be") and a sentence/argument-level unit (the rule of
  three; ethos/pathos/logos as three separate levers — speaker credibility,
  audience emotion, argument logic — not one generic "persuasiveness").
  Check both before calling a structure done.
- Cueing/signposting ("first... next... finally") has real measured
  effect on retention and transfer, not just subjective ease — it's worth
  the visual or verbal overhead even when it feels redundant to the writer.
- Build the argument (logos) from premises the audience already accepts, not
  from the explainer's own axioms — same move as the ELI5 meta-principle,
  applied to argument structure specifically.
- Formula (a repeatable template) and situational judgment are in real
  tension here, not resolved — use templates (sparkline, three-act) as a
  diagnostic to check a structure against, not a form to fill in
  mechanically.

## Technical writing

- A writing task has three independent layers, and clarity work should
  address them top-down, not jump straight to sentence-level polish:
  (1) which document/mode (tutorial vs. how-to vs. reference vs.
  explanation — mixing these within one document is the most common
  structural failure); (2) ordering within the document (need-to-know-first,
  not narrative/derivation order); (3) sentence-level execution (one idea
  per sentence, active voice, concrete subjects).
- Brevity for its own sake is not the goal and is actively contested —
  words that disambiguate (an added "that," "who," or article) can improve
  clarity even though they add length. The real target is removing
  ambiguity, not minimizing word count.
- Prefer style rules with a concrete, checkable test (a modifier-stack rule,
  an active-voice check) over unfalsifiable slogans ("omit needless
  words") — the latter give no way to tell which words are needless.

## Information design / diagrams

- A diagram beats prose only when its spatial structure (proximity,
  containment, connection) matches the content's actual logical structure —
  this is a structural-mapping problem, not an aesthetic choice: flowchart
  maps to sequence, table maps to lookup, timeline maps to duration, tree
  maps to hierarchy. Forcing content into the wrong diagram type imposes
  cognitive cost rather than just looking wrong.
- Remove everything not carrying information (data-ink ratio / extraneous
  cognitive load) — two independent research traditions (design aesthetics,
  working-memory psychology) converge on this, which is why it's a strong
  default. But it optimizes for analysis speed, not necessarily for
  audience engagement or trust — check which target actually matters before
  minimizing reflexively.
- A second channel (visual alongside verbal) only helps when it's
  complementary, not duplicative. A caption restating what's visually
  obvious, or alt-text repeating a chart's own title, actively costs
  comprehension (the redundancy effect) rather than reinforcing it.
- Integrate labels into the diagram itself rather than placing them
  adjacent with a legend to look up (the split-attention effect) —
  physical integration measurably reduces load without costing time.

## Ten categories of information, and which sub-topic principles apply hardest

Different kinds of content need different structural defaults. Diagnose
which category (or mix) is in play before choosing a structure:

1. **Process/workflow** (sequential steps, dependencies) — flowchart or
   numbered sequence; sequencing meta-principle applies directly.
2. **System architecture** (components + relationships) — diagram with
   spatial structure mapped to actual connectivity (Larkin & Simon); resist
   decorative layout that doesn't encode real relationships.
3. **Causal/mechanistic** (why something happens) — arrow-chain diagram or
   plain narrative logos-chain; test each link against "does the audience
   already accept this premise" (Aristotle's *endoxa*).
4. **Comparative/decision** (tradeoffs between options) — table (Larkin &
   Simon's lookup-structure match) over prose; Abela's four-category chart
   taxonomy as a starting heuristic, not a mechanical rule.
5. **Hierarchical/taxonomic** — tree or nested-indent structure; matches
   diagram-type to logical structure directly.
6. **Quantitative/statistical** — chart, with data-ink discipline (Tufte)
   balanced against Inbar et al.'s finding that audiences sometimes prefer
   less-minimal charts when trust/engagement matters more than extraction
   speed.
7. **Abstract/conceptual** (no physical form) — needs analogy-second
   (ELI5 discipline) more than any other category; test the analogy on a
   real outsider before trusting it.
8. **Temporal/historical** — timeline (duration-mapping diagram type);
   avoid forcing a hierarchy or flowchart onto what's actually a duration
   structure.
9. **Spatial/layout** — direct visual representation; least in need of
   verbal mediation, most vulnerable to chartjunk/decoration creep.
10. **Procedural instruction** (teach the reader to *do* something) — this
    is Diátaxis's "how-to" mode specifically; keep it separated from
    "explanation" mode rather than blending the two.

## Open tensions to carry forward, not resolve reflexively

- Formula vs. judgment-per-case (repeatable templates vs. "no set
  formula").
- Minimalism-for-analysis vs. richness-for-engagement (data-ink ratio vs.
  audience preference for detail).
- Brevity vs. disambiguation (omit-needless-words vs. Microsoft's
  translation-accuracy counterexamples).

When these tensions surface, name which target matters for the specific
audience and purpose at hand rather than defaulting to one side.
