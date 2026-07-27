---
name: conciseness-review
description: >-
  Run a behavior-preserving conciseness and clarity review across a codebase. Use this skill whenever
  the user asks to "review", "clean up", "tighten", "refactor for clarity", "reduce verbosity", "find
  duplication", "DRY up", or "cut dead code" in a repo or module — even if they don't say the word
  "conciseness". When pointed at a repository, it discovers modules, triages each one to decide whether
  it needs a quick single-pass or a rigorous two-pass review, dispatches a subagent per module, and
  aggregates everything into one repo-level report of PROPOSED changes. It never applies or commits
  changes — the human approves at the end. Trigger this for any "make this code cleaner without changing
  what it does" request at module or repo scale.
---

# Conciseness Review

A behavior-preserving review that reduces cognitive load across a codebase. The unit of work is the
**module**: the skill partitions a repo into modules, triages each to pick a review depth, runs a
subagent per module, and merges the results into one report the human approves before anything is
applied.

## The one rule that overrides everything

**Reduce cognitive load. Never trade clarity for character count.** A change that is shorter but harder
to read is a regression, not a win. Idiomatic brevity is only valuable when the result is *clearer* —
nested ternaries, overloaded comprehensions, and cryptic point-free chains are anti-goals even though
they are shorter.

## The safety stance (read before doing anything)

Subagents **propose, they never apply.** No subagent edits files, stages changes, or commits. They emit
inventories and diffs into the workspace; the human reviews the aggregated report and decides what
lands. This is deliberate: in a parallel fleet there is no human between detection and application
inside a single module, so the approval gate moves to the very end where the human can see every
proposed change at once.

Two further hard rules, both inherited from the review's purpose:

- **Behavior preservation is non-negotiable.** No proposed change may alter observable behavior, public
  interfaces, error-handling semantics, or performance characteristics. Anything a subagent cannot
  *prove* is behavior-preserving gets labeled "needs verification," not silently shipped.
- **Defensive code is presumed load-bearing.** Never propose removing a guard, validation, or error
  path unless the guarded condition is provably impossible. When in doubt, leave it and say why.

## Workflow

### Step 1 — Discover modules

Determine the repo's primary language(s) and partition it into modules. A "module" is the smallest unit
that makes sense to review and reason about independently:

- **JS/TS monorepo:** each `packages/*` or workspace entry; otherwise each top-level source directory
  containing a `package.json` or an `index.*` entry point.
- **Python:** each importable package (a directory with `__init__.py`), or each top-level dir under
  `src/`.
- **Go:** each package directory.
- **Generic fallback:** each top-level directory under the source root.

Always exclude: `node_modules`, `vendor`, `dist`, `build`, `.git`, generated/`*.min.*` files, lockfiles,
and anything in `.gitignore`. If the repo is a single flat directory with no clear module boundaries,
treat each source file (or small cluster of related files) as a module.

Produce a module list with, for each module: a path, an approximate file count, and an approximate line
count. Save it to `<workspace>/modules.json`. Keep the workspace as a sibling of the repo or under a
temp dir — never write inside the repo being reviewed.

### Step 2 — Triage each module

For each module, run a **lightweight triage subagent** (see `references/triage.md`). Triage is cheap
and decides two things per module: the **review depth** (one-shot vs two-pass) and the **model tier** to
run it on. The decision rests on whether a forced pause would actually catch a bad diff — size is just a
proxy for "does it still fit in context with room to think." The triage agent reads only enough of the
module to judge risk; it does not do the review itself.

Run triage subagents in parallel, but cap concurrency (see guardrails). Collect each decision into
`<workspace>/triage.json`.

### Step 3 — Dispatch review subagents

For each module, dispatch the review subagent that triage selected:

- **One-shot** → spawn one subagent with `references/oneshot.md`. It detects candidates and emits
  proposed diffs in a single pass. Used for small or low-risk modules.
- **Two-pass** → spawn one subagent that runs `references/detect.md` first (inventory candidates), then
  `references/apply.md` on its own inventory (self-verify behavior preservation, emit diffs only for
  what survives). Used for larger or load-bearing modules where a forced self-check earns its cost.

Each subagent writes to `<workspace>/modules/<module-name>/` — an inventory file, a diffs file, and a
watch-list file. Subagents work only within their assigned module; if a clean change would require
touching another module, the subagent flags it as a cross-module finding instead of doing it.

Respect the model tiers triage assigned (see guardrails for defaults). Run review subagents in parallel
within the concurrency cap.

### Step 4 — Aggregate and present

Once all review subagents finish, merge their outputs into one repo-level report at
`<workspace>/REVIEW.md`. Structure it as:

```
# Conciseness Review — <repo name>

## Summary
<2-4 sentences: where cognitive load concentrates across the repo; qualitative reduction band
 (low / moderate / high) with rationale — never a fabricated percentage.>
<Table: module | depth used | model | # Safe findings | # Needs-verification | watch-list count>

## Proposed changes by module
<Per module, grouped: Safe findings (with proof + diff) first, then Needs-verification (with the
 specific check the human must perform).>

## Cross-module findings
<Duplication or abstractions that span modules and couldn't be resolved inside one — these need a
 human decision about where shared code should live.>

## Watch list
<Things that looked like targets but were deliberately left alone, and why.>

## How to apply
<Reminder that nothing has been changed. The human picks findings to apply; Safe ones are
 mechanical, Needs-verification ones require the listed check first.>
```

Present `REVIEW.md` to the human. Do not apply, stage, or commit anything. If the human then approves
specific findings, apply only those, on a feature branch (`chore/conciseness-<module>`), never on
`main`/`master`, following the repo's existing style.

## Guardrails

- **Concurrency cap:** never spawn more than ~6–8 subagents at once. For a repo with more modules,
  process in waves. If the module count is very large (dozens+), tell the human and offer to scope to a
  subset (e.g. by directory or by churn) before launching a fleet.
- **Model tier defaults** (triage may override per module):
  - Triage subagent → a fast, cheap tier (Haiku-class).
  - One-shot review → the strongest available coding tier (Opus-class), since there's no second pass to
    catch its mistakes.
  - Two-pass: detection → a balanced tier (Sonnet-class) is fine, since over-flagging is harmless;
    application → the strongest available tier (Opus-class), since this is where a bad diff would land.
  - Verify the current model lineup and IDs rather than hardcoding names; the strongest coding model and
    its API string change over time.
- **No fabricated metrics.** Reduction estimates are qualitative bands with a one-line rationale, never
  invented percentages.
- **Stay in scope.** The skill reviews and proposes. It does not reformat, rename, or restyle unless a
  change directly serves clarity, and it does not touch files outside the module under review.

## Reference files

- `references/triage.md` — lightweight per-module triage: pick depth + model tier. Read in Step 2.
- `references/detect.md` — Pass 1 of two-pass: inventory candidates only. Read in Step 3 for two-pass.
- `references/apply.md` — Pass 2 of two-pass: self-verify and emit proven diffs. Read in Step 3 for
  two-pass.
- `references/oneshot.md` — merged single-pass review for small/low-risk modules. Read in Step 3 for
  one-shot.
