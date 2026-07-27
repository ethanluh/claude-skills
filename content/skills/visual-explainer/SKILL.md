---
name: visual-explainer
description: Build an HTML explanation or planning artifact (a diagram, walkthrough, proposal, or plan laid out visually) instead of explaining in chat prose alone. Use whenever a request is explanation- or planning-shaped and would benefit from a visual layout — "explain how X works," "walk me through this plan," "lay out the options," "show me the architecture" — not for validating code changes (that stays prohibited).
---

# Visual Explainer

Workflow for turning an explanation or a plan into a standalone HTML
artifact, instead of a wall of chat prose. Pairs with `explanation-craft`
(the principles this skill applies) — load that skill's category table
first to pick a structure, then build here.

**Scope boundary:** this is for genuine explanation/planning deliverables
the user asked for — not for spinning up a page or visualizer to check that
code works, which stays prohibited regardless of format.

## Process

1. **Classify the content** against `explanation-craft`'s ten information
   categories (process, architecture, causal, comparative, hierarchical,
   quantitative, abstract, temporal, spatial, procedural). Most real
   requests are a mix — name the dominant one, since it decides the base
   layout (flowchart, table, tree, timeline, etc.), and don't force
   secondary content into that same shape if it doesn't fit.
2. **Apply the sequencing meta-principle before laying anything out**: order
   sections by what the reader needs to know next, not by the order you
   figured it out. If the plan has a "why" and a "what," the why usually
   comes first only if the audience doesn't already accept the premise —
   otherwise lead with the what.
3. **Load `artifact-design`** before writing HTML (required by the
   `Artifact` tool itself) — it covers layout, theming, and responsive
   rules this skill doesn't duplicate.
4. **Keep channels complementary, not redundant** — a diagram and its
   caption should each carry information the other doesn't. Don't caption a
   chart with a sentence that just restates its title, and don't add prose
   next to a diagram that only re-describes what's already visually
   obvious (the redundancy effect, from `explanation-craft`).
5. **Cap nested depth at two layers.** If the explanation wants a third
   "click to expand further" tier, that's a sign the content needs
   splitting into a separate artifact instead, not another disclosure
   level.
6. **Publish with `Artifact`** using a specific, stable title and a
   one-sentence description. Redeploy the same file path on revision rather
   than minting a new URL, per that tool's own rules.

## Fast defaults by category

- Process/workflow and causal chains take a numbered flow or arrow-chain
  diagram, not prose paragraphs describing steps in order.
- Comparative/decision content takes a table, not a bulleted pro/con list
  per option.
- Hierarchical content takes a nested tree/indent matching the actual
  structure, not a flat list dressed up with headers.
- Quantitative content takes a chart with a clear single takeaway stated in
  the same view, not a data dump the reader has to interpret unaided.
- Temporal content takes a literal timeline, not a hierarchy or flowchart
  wearing dates.
- Abstract/conceptual content leads with a plain-language explanation, then
  one tested analogy for the genuinely unintuitive part — analogy second,
  not first, and only where the content is actually unintuitive.

## When not to reach for this skill

- The explanation is short enough that a few sentences in chat serve the
  reader better than an artifact would (a one-line answer doesn't need a
  page).
- The task is validating that code works, not explaining or planning
  something — build a script/test instead, per the standing prohibition on
  validation pages.
