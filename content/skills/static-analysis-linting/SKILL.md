---
name: static-analysis-linting
description: >-
  Set up or review a linting/static-analysis pipeline for a repo: two-tier
  gate (pre-commit fast feedback, build-phase non-bypassable check), tuning
  rules to avoid alert fatigue, and separating surface style linting from
  deeper logical/security static analysis. Use whenever Ethan is setting up
  CI/lint config for a new or existing project, asks "what should my linting
  setup look like", "add a pre-commit hook", "set up static analysis", or is
  reviewing why a project's linter output is being ignored.
---

# static-analysis-linting

Grounded in OWASP's DevSecOps Guideline linting chapter
(literature/software-quality/owasp-linting-and-static-analysis.md).

## 1. Two tiers, not one

Set up both integration points; either alone leaves a gap.

- Pre-commit (local, fast): runs before code enters the repo, the
  cheapest point to catch an issue. For Python: ruff check plus
  ruff format --check via a pre-commit hook. For C++: a fast subset
  (e.g. clang-format --dry-run), not the full static analyzer. Keep
  this tier fast enough that nobody reaches for --no-verify.
- Build-phase (centralized, non-bypassable): runs on the build
  server/CI, after push, and cannot be skipped the way a local hook
  can. This is where the deeper checks (below) belong, plus a re-run
  of the pre-commit tier as a backstop against --no-verify or a stale
  local hook.

Pre-commit-only means checks are skippable. Build-only means feedback is
slow. Both tiers exist for a reason; don't collapse to one.

## 2. Don't enable every rule; tune it

Alert fatigue is a named failure mode: verbose output trains developers to
tune out, and they miss the critical issues along with the trivial ones.
When configuring a linter:

- Start from a curated rule set, not "everything the tool ships with."
  For ruff, pick an explicit select list over a blanket ALL.
- Split severity: what fails the build (enforced) vs. what's surfaced as
  advisory/warning-only. Security and correctness rules go enforced.
  Style nits with no behavioral consequence go advisory or get
  auto-fixed silently, never a build-blocker.
- Re-review the rule set periodically; tool versions can change what
  identical code triggers, so a rule set isn't set-and-forget.

## 3. Linting is not static analysis; pick tools for both layers

These catch different defect classes; one tool covering one layer does
not cover the other.

- Linting equals syntax and style consistency (formatting, unused
  imports, naming). Ethan's default: ruff for Python.
- Static analysis equals deeper logical and security defects: null-pointer
  dereferences, out-of-bounds indexing, complexity metrics, alignment
  with security coding standards. This is a security control, not a
  style nicety, and needs a separate tool from the linter.

Checklist when setting up a new project: does the pipeline have a linter
(style) and a static analyzer (logic/security) at the build-phase tier,
or only the former? A ruff-only setup, for example, covers style but
leaves the logical/security layer unchecked.
