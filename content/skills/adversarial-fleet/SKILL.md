---
name: adversarial-fleet
description: Orchestrate a fleet of parallel implementer subagents (Workflow-based) to land a multi-part change on one branch/PR, closing with a mandatory lint-then-adversarial-review-then-fix chain before the PR opens. Use when the user says "spawn a fleet", "run agents in parallel to implement these", "adversarial fleet", or asks to implement a list of N items (e.g. a counsel's output) as one piece of work.
---

# Adversarial fleet

A fleet is for **building**, on one branch, with more hands than a single
agent turn allows — and it never ships without an adversarial pass finding
real defects first. If the ask is "which of these should we even do," use
`counsel` instead and feed its output into this skill afterward.

## Shape: worktree → waves → committer → verify chain, as one Workflow

**Git setup, before any agent runs.** One fleet = one branch = one PR
(never bundle unrelated topics, per this repo's one-topic-per-branch
rule). Create a linked worktree off the correct base — if the target
surface only exists on a feature branch (not `main`), branch off that:

```
git worktree add ../<repo>-<branch> -b <topic-branch> <correct-base>
cd ../<repo>-<branch> && pnpm install   # or the repo's install command
```

Never let a fleet agent touch git directly (see "Implementer prompts"
below) — a fleet mutating its own branch concurrently across a dozen
agents is exactly the race condition worktrees and single-writer
committers exist to prevent.

**Decompose into clusters, then waves.** Group the N items into
file-disjoint clusters — each cluster owns a specific list of files and
touches nothing else. Put everything file-disjoint into one `parallel()`
wave. If a later cluster's work depends on reading what an earlier
cluster produced (e.g. migrating pages onto a data layer a "foundation"
cluster just built), that's a new wave, run only after the earlier
wave's commit lands — not a same-wave parallel call.

A typical shape, as a `Workflow` script:

```js
phase('Wave 1')
const wave1 = await parallel([
  () => agent(CLUSTER_A_PROMPT, { label: 'impl:a', phase: 'Wave 1', schema: IMPL_SCHEMA }),
  () => agent(CLUSTER_B_PROMPT, { label: 'impl:b', phase: 'Wave 1', schema: IMPL_SCHEMA }),
  // ...file-disjoint clusters only
])
const commit1 = await agent(committerPrompt(wave1.filter(Boolean)), { label: 'commit:wave1' })

phase('Wave 2')
const wave2 = await parallel([ /* clusters that build on wave 1's output */ ])
const commit2 = await agent(committerPrompt(wave2.filter(Boolean)), { label: 'commit:wave2' })

phase('Verify')
const lintReport = await agent(LINT_FIX_PROMPT, { label: 'lint-fix' })
const review = await agent(ADVERSARIAL_REVIEW_PROMPT, { label: 'review' })
const fixes = await agent(fixPrompt(review), { label: 'fix-findings' })
```

**Implementer prompts — every one gets the same hard rules block:**

- Absolute working directory (the worktree), and which files it owns —
  "touch ONLY these files plus new files you create." Other agents are
  editing sibling files concurrently in the same wave; scope creep causes
  silent stomps.
- **No git commands** — a dedicated committer agent stages and commits.
  This is the single-writer rule that makes parallel implementers safe.
- Repo conventions restated explicitly, not assumed: design-token-only
  styling, no emojis, reuse-before-build order, fail-fast error handling,
  code-minimalism ladder. An implementer with no memory of this
  conversation will default to generic patterns unless told.
- **Structured output** (`schema`) naming exactly which files it
  changed/created plus a proposed commit subject/body — the committer
  reads this, it doesn't guess from `git status` alone (though it should
  cross-check against untracked files too, since agents sometimes forget
  to list a new file).

**The committer.** One agent, given every cluster's structured output
from a wave, stages *exactly* that cluster's files (never `git add -A`)
and commits with a real message — one commit per cluster, not one giant
commit per wave. This preserves bisectability and gives the eventual PR a
readable history.

## The verify chain — non-negotiable, always three steps

This is what makes it an *adversarial* fleet rather than just a parallel
one. Never open the PR straight from the implementation waves.

1. **Lint-fix agent.** Run the repo's real gate command (not a guess —
   read `package.json`/`CLAUDE.md` for it). Fix forward — types, imports,
   logic — never by deleting a feature or loosening config. Re-run until
   clean. Commit fixes only if there were any.
2. **Adversarial reviewer — read-only, full diff against the base
   branch** (not just the last commit). Give it the house rules again
   plus specific things to hunt: dead code left from a port, mock/fake
   state presented as real, swallowed errors, gates that block browsing
   instead of only commitment actions, anything the implementers were
   told not to do. Ask for **numbered CONFIRMED findings** (file:line,
   defect, why it's real — verified by reading the code, not speculated)
   separate from nits. This is the step that catches what parallel
   implementers reliably miss: cross-cutting regressions no single
   cluster could see (e.g. four of six pages silently bypassing a
   real-data hook that only one cluster wired up correctly).
3. **Fixer agent.** Address every confirmed finding, re-run lint until
   clean, commit as its own commit, and report fixed-vs-skipped with
   justification for any skip. Don't silently drop a confirmed finding.

Only after this chain lands does the fleet's work go through the repo's
normal PR skill (template, screenshots from a real dev-server run,
draft-by-default).

## Resuming an interrupted fleet

Long fleets get killed by session restarts, `TaskStop`, or timeouts.
Never restart from scratch — `Workflow` caches every completed `agent()`
call by `(prompt, opts)`:

```
Workflow({ scriptPath: '<path from the original launch>', resumeFromRunId: '<runId>' })
```

Before resuming, check whether anything changed underneath the branch
(you might have made manual edits, or an earlier PR in a stack might
have moved). If the branch needs a rebase onto updated upstream work
first, do that by hand (resolve conflicts, re-lint) *before* resuming —
resuming replays cached agent results verbatim, so a rebase after
resuming can silently reintroduce whatever the cached commits removed.

## Failure modes to avoid

- **Don't let two clusters in the same wave share a file.** That's what
  the next wave is for. If you're unsure whether two clusters collide,
  they probably do — split the wave.
- **Don't skip the adversarial review "to save time."** It is the step
  that has, in practice, caught real defects every single time it's been
  run seriously (dead-end navigation flows, toast regressions, favorites
  silently not persisting on 5 of 6 pages) — defects that lint and
  type-checking cannot see because the code is syntactically fine and
  type-correct while being behaviorally wrong.
- **Don't have the reviewer diff against the previous commit.** Diff
  against the branch's actual base — a reviewer that only sees the last
  commit misses regressions introduced two waves back.
- **Don't accept "no fixes needed" from the fixer without checking** that
  the review actually found something in the first place; an empty
  findings list is a valid outcome, but only verify it's the review's
  finding, not the fixer skipping work.
