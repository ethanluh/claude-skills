---
name: counsel
description: Run a multi-persona deliberation panel — several differently-biased agents independently judge a large option set (features, approaches, keep/change/remove/add calls), cross-examine each other's verdicts, then a chair synthesizes one categorized document with dissent preserved. Use when the user says "spawn a counsel", "get multiple perspectives on this", "run a panel of agents to decide", "have agents debate this and pick", or asks for a keep/cut/change list over something too large for one pass.
---

# Counsel

A counsel is for **judgment over a large option set**, not for building
something. If the ask is "implement X," this is the wrong skill — use
`adversarial-fleet`. If the ask is "which of these N things should we do,
and how strongly," this is it.

Signs a task wants a counsel rather than a single agent's opinion: the
option set is large enough that one pass will under-cover it (a feature
catalog, a backlog, a set of competing designs), the decision benefits from
genuinely different value systems pulling against each other (ship-it vs.
cut-it, user delight vs. maintenance cost), and getting it wrong is
expensive enough to be worth the extra tokens.

## Shape: three rounds, always run as a Workflow

Always implement this as a `Workflow` script (not manual sequential
`Agent` calls) — the phases are genuinely parallel-then-barrier and the
tool's `pipeline`/`parallel` primitives are built for exactly this. Never
run a counsel by calling `Agent` in a loop from the main thread; that's
slower and defeats the point of a panel deliberating independently.

**Round 1 — Deliberate (parallel, one agent per persona).**
Every persona gets the *same* factual brief (source material, target,
schema) plus a *distinct* persona block with four named parts:

- **Type** — supportive / adversarial / pragmatist / user-advocate /
  maintainer / whatever axis matters for this decision. Name it explicitly
  in the prompt; a persona without a named type drifts back to generic
  helpfulness by turn two.
- **Goal** — what this persona is trying to accomplish, stated as an
  action ("identify the strongest candidates for X" / "hunt
  over-engineering and cheaper alternatives").
- **Completion criteria** — a *minimum count or coverage requirement*
  ("at least 8 keep/change verdicts," "cover every route," "at least 6
  remove verdicts with cost rationale"). Without a floor, personas
  converge to whatever's easiest and the panel stops being a panel.
- **Constraint** — what keeps the persona honest and prevents it from
  being a caricature. A skeptic constrained to "must propose the cheaper
  alternative when killing something" produces useful output; an
  unconstrained skeptic just says no to everything.

5 personas is a good default (odd number, wide enough coverage without the
merge step exploding). Scale down to 3 for a narrower decision, up to 7
only if the option set is genuinely huge.

Every persona returns structured output via `schema` — never free text —
so round 2 can merge deterministically. A typical schema:

```js
const SCHEMA = {
  type: 'object',
  required: ['persona', 'items'],
  properties: {
    persona: { type: 'string' },
    items: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'source_paths', 'verdict', 'rationale', 'size'],
        properties: {
          name: { type: 'string' },
          source_paths: { type: 'array', items: { type: 'string' } },
          target: { type: 'string' },
          verdict: { type: 'string', enum: ['keep', 'change', 'remove', 'add'] },
          rationale: { type: 'string' },
          size: { type: 'string', enum: ['S', 'M', 'L', 'XL'] },
          notes: { type: 'string' },
        },
      },
    },
  },
}
```

Merge round 1 in plain script code (not an agent call) by a stable key
(name, normalized) — this is exactly the "barrier is justified" case from
the Workflow tool's own guidance: round 2 genuinely needs every
persona's full round-1 output to find conflicts.

**Round 2 — Cross-examine (parallel, same personas, barrier after
round 1).** Each persona receives the *full merged list* — every
persona's verdict, size, and rationale on every item — still in
character, and is asked to:

- endorse a verdict/size where others disagree, staying true to its type
  but **conceding where another persona's evidence is stronger** (this is
  the mechanism that keeps a counsel honest instead of five monologues —
  build a `concession: boolean` field into the schema and mean it)
- flag anything the whole panel missed

This round is what catches a persona that latched onto a factually wrong
premise (e.g. "these two files are coupled" when they aren't) — a later
round can independently re-verify and the vote shifts.

**Round 3 — Chair synthesis (single agent, no persona).** One neutral
agent receives the merged list plus every round-2 position and resolves
every conflict explicitly: a stated concession wins outright; otherwise
majority of round-2 endorsements; anything still contested gets carried
into the doc as live dissent rather than silently dropped. The chair's
job is compiling, not re-deciding from scratch — give it the resolution
rule in the prompt so it doesn't just average opinions.

## Output document shape

The chair should produce (and you should write to disk, e.g.
`docs/artifacts/<topic>-counsel.md`, following this repo's shared-memory
convention):

- Short preamble: what was evaluated, the personas used, source/target.
- Sections that match how the *consumer* will act on this — by task size,
  by page/surface, by phase — not by persona. Within each section, order
  by consensus strength (unanimous first, contested last).
- Every adopted item: verdict, what changes (for "change"), target,
  source paths, which personas endorsed it, one line of dissent if any
  remains.
- An explicit **"explicitly rejected"** section — items with a remove
  verdict that won, one line each, so a future session doesn't
  re-litigate a decision this one already made.
- Optionally a suggested sequencing/implementation order if the items
  have dependencies on each other.

## Failure modes to avoid

- **Don't skip the completion-criteria floor.** Without it, "5 personas
  deliberate" quietly becomes "5 personas each name 2 things," which is
  strictly worse than one careful pass.
- **Don't let the chair silently pick a side.** If round 2 leaves a real
  split with no concession, the document must say so — that's
  information the human needs, not noise to clean up.
- **Don't run round 2 as a fresh read of the source material.** Its job
  is to react to the *other personas' claims*, not redo round 1. Feed it
  the merged list, not just the original brief.
- **Verify before trusting a persona's factual claim that changes a
  vote.** "The Skeptic says these files are coupled" is a claim, not a
  fact — round 2's job includes catching that, but if you (the
  orchestrator) notice a load-bearing claim, it's worth a quick
  independent check before it shapes the final document.
