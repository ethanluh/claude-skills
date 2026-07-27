---
name: cicd-pipeline-basics
description: >-
  CI/CD pipeline basics — the workflow/job/step/runner mental model and how
  to wire a lint+test job that gates PR merges. Use when setting up CI for a
  new repo, explaining what a "pipeline" or "workflow" is, deciding how to
  split jobs/steps, or making a check required before merge. Provider-
  agnostic core; GitHub Actions is the current worked example.
---

# CI/CD pipeline basics

## The mental model (provider-agnostic)

Every CI system decomposes the same way, regardless of vendor:

- **Workflow** — a definition triggered by an event (push, pull request,
  schedule, manual dispatch). Keep workflows single-purpose: one for CI on
  push/PR, a separate one for deploy-on-merge, another for scheduled tasks.
  One monolithic workflow is a beginner mistake.
- **Job** — a unit of work that runs on a runner. Jobs run **in parallel by
  default**. Put independent checks (lint, unit tests, typecheck) in
  separate jobs so they run concurrently; only make a job depend on another
  when it genuinely needs that job's output (e.g. a build artifact).
- **Step** — an action inside a job, run **sequentially**. Anything that
  must happen in order (checkout -> install -> build -> test) is steps
  within one job, not separate jobs.
- **Runner** — the actual execution environment (VM or container) a job
  runs on.

## Why (Fowler's continuous integration)

The mechanics above only pay off if the practice behind them is followed:

- **One version-controlled mainline.** A fresh clone must build the
  complete product from what's checked in — no hidden local state.
- **No code sits unintegrated for more than a couple hours.** Running
  checks on a branch that never merges isn't real integration — the point
  is catching conflicts between people's changes, which only happens once
  code lands on the shared mainline.
- **Only the mainline is monitored, and a broken mainline build is
  stop-the-line.** Revert the offending commit and restore green first;
  debug separately afterward. Don't leave the team (or your future self)
  blocked while investigating in place.
- **Target a fast commit-build cycle (Fowler suggests ~10 minutes) via a
  staged pipeline**: fast unit tests/lint first for quick feedback, slower
  integration/e2e tests after. Order jobs by speed and confidence, not
  convenience.
- **Build status must be visible** — surfaced on every PR, not discovered
  days later.
- If integration currently happens every 10 days, halve it to 5 rather than
  jumping straight to daily — incremental adoption beats an unattainable
  target that gets abandoned.

## GitHub Actions (current worked example)

GitHub Actions is today's concrete implementation of the model above —
swap in the equivalent for whatever provider is actually in use.

- Workflows are YAML files in `.github/workflows/`, triggered by
  `on: push` / `on: pull_request` (and others). A workflow wired only to
  `push` will never run on PRs — a common cause of a required status check
  silently deadlocking a PR.
- Steps are either `run:` (a shell command) or `uses:` (a reusable,
  versioned action like `actions/checkout`, `actions/setup-python`).
  Default to `uses:` for solved problems instead of hand-rolling shell.

Minimal lint+test workflow, gating merges:

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

`lint` and `test` run as parallel jobs (fast checks, per Fowler's staging
advice). To actually gate merges: repo Settings -> Branches -> branch
protection rule on the default branch -> "Require status checks to pass" ->
select both `lint` and `test`. Without this step the workflow only reports
red/green — it doesn't block anything.
