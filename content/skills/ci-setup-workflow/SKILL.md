---
name: ci-setup-workflow
description: >-
  Setting up CI for a new repo — define what "self-testing build" means for
  the project, write a CI workflow triggered on push/PR with fast jobs
  first, wire it as a required status check, and establish a
  stop-the-line/revert response to a broken mainline. Use whenever setting
  up CI for a new repo, or a repo has CI checks running but nothing actually
  gates merges.
---

# ci-setup-workflow — set up CI for a new repo

This is the durable core (from Fowler's continuous integration article):
define the self-testing build first, then wire *any* provider to enforce
it. GitHub Actions is used below as the worked example — swap the
provider-specific mechanics for whatever the repo actually uses; see the
`cicd-pipeline-basics` skill for the provider-agnostic workflow/job/step
mental model this builds on.

## 1. Define the self-testing build

Before writing any workflow file, pin down what "self-testing" means for
this project:

- What does a fresh clone need to build/run without hidden local state
  (env vars, cached deps, a database seeded by hand)? If cloning to a bare
  machine can't produce a working build, fix that first — CI will just
  encode the same gap.
- What's the fast layer (lint, typecheck, unit tests — seconds) versus the
  slow layer (integration/e2e tests — minutes)? Fowler's target is a
  commit-build cycle around 10 minutes; if the project is nowhere near
  that, note it but don't block on it — a slower pipeline that runs beats
  no pipeline.
- Does a test environment need to mirror production meaningfully (same
  DB engine, same language version)? If yes, that's a job-level detail
  (matrix or container image) to carry into step 2, not an afterthought.

## 2. Write the workflow file, fast jobs first

- Trigger on both `push` and `pull_request` — a workflow wired only to
  `push` never runs on PRs, which silently deadlocks step 3's required
  check later. This is the single most common setup mistake.
- Split independent checks (lint, typecheck, unit tests) into separate
  jobs so they run in parallel; keep only genuinely sequential steps
  (checkout -> install -> build -> test) inside one job.
- Order for feedback speed: fast jobs (lint, unit tests) before slow ones
  (integration/e2e). Don't gate the fast feedback behind the slow tests.
- Default to reusable actions (`actions/checkout`, `actions/setup-*`) over
  hand-rolled shell for solved problems.
- Minimal example:

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12" }
      - run: pip install ruff && ruff check .

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12" }
      - run: pip install -e ".[dev]" && pytest
```

## 3. Wire it as a required status check

A workflow that only reports red/green doesn't block anything on its own.
Make it actually gate merges: repo Settings -> Branches -> branch
protection rule on the default branch -> "Require status checks to pass
before merging" -> select each job (`lint`, `test`, ...) by name.

Verify it worked: open a throwaway PR with a failing test and confirm the
merge button is actually disabled, not just showing a red X.

## 4. Establish the stop-the-line / revert response

Write down (in the repo's CONTRIBUTING notes, or wherever the team keeps
process docs) what happens when the required check goes red on mainline
after a merge — because only mainline gets monitored, and a broken
mainline blocks everyone behind it:

1. Don't leave it red while investigating in place. Revert the offending
   commit first, restore a green build, then debug the revert separately.
2. Surface the failure somewhere visible (PR comment, team channel) —
   visibility is as much a part of "self-testing" as the automation
   itself; a red build nobody sees might as well not run.
3. Once the fix is ready, land it as a normal PR through the same gated
   path — no direct pushes to mainline to "fix it faster."

## 5. Report back

State plainly: what the self-testing build covers (and what it doesn't
yet — e.g. no e2e layer), which jobs are required checks, and whether the
revert response is written down somewhere durable or only lives in this
conversation.
