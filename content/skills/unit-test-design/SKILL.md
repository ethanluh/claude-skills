---
name: unit-test-design
description: >-
  Unit test design — classify tests by measurable size (small/medium/large)
  and design isolated, fast, single-responsibility tests as the default,
  reserving broader-scope tests for what actually needs them. Use whenever
  Ethan is writing new tests, reviewing a test suite, deciding whether
  something calling itself a "unit test" actually qualifies, or arguing
  about test taxonomy ("is this a unit or integration test"). Also use in
  TDD mode — the canonical list-one-test-pass-refactor-repeat loop — for
  "write this test-first", "practice TDD", or "am I doing TDD right".
---

# Unit test design

## Part 1 — Classify by measurable size, not by vibes

Don't argue about "unit" vs. "integration" — those labels mean different
things on every team. Classify by concrete, checkable constraints instead
(Google Testing Blog, test sizes):

- **Small** — runs in well under a minute, single process/thread, touches
  only the component under test. No filesystem, no network, no external
  services. This is the real definition of a unit test.
- **Medium** — up to a few minutes, may touch the local filesystem or a
  same-machine database, but still no network.
- **Large** — no time ceiling, real network access allowed. End-to-end /
  system tests. Most expensive, slowest, use sparingly.

Checklist when writing or reviewing a test:
- [ ] Before writing the test, ask: what's the smallest size that can
      validate this behavior? Default to small; only escalate when the
      behavior genuinely can't be verified without broader scope (e.g. a
      migration, a cross-service contract).
- [ ] A test calling itself "unit" that touches disk/network or spans
      processes doesn't qualify — reclassify it as medium/large or fix it.
- [ ] A healthy suite is dominated by small tests. If medium/large tests
      outnumber small ones, that's a smell worth naming in review, not
      silently accepting.
- [ ] Size should be enforceable by tooling (timeouts, network sandboxing)
      wherever the test runner supports it — not just a comment.

## Part 2 — TDD mode: the canonical loop

When Ethan asks to write code test-first or practice TDD, follow Kent
Beck's Canon TDD cycle literally, not a "write tests first" slogan:

1. **List** the test scenarios you intend to cover before writing any of
   them. Add newly discovered scenarios as you go.
2. **Pick one** item off the list and turn it into a concrete, runnable
   test — writing the test is where interface/behavior design happens
   ("what should this do, how is it called").
3. **Make it pass** — change the code so this test and every previously
   passing test pass. Nothing else. Do not restructure code in this step.
4. **Refactor** (optional) — now, separately, improve the internal
   structure. This is where implementation design happens. "Wear one hat
   at a time."
5. **Repeat** from step 2.

Non-negotiable rules:
- [ ] "Make it pass" and "refactor" never happen in the same edit/commit.
      Mixing them means a break can't be attributed to a behavior change
      or a structural change — this destroys the loop's diagnostic value.
- [ ] Order tests simple-to-complex on the list — this shapes both the
      incremental design and the pacing of the work.
- [ ] A test with no real assertion, or one that just asserts whatever the
      code currently outputs, isn't TDD — reject it.
- [ ] "Write every test up front" is a caricature, not the practice —
      don't do it and don't accept it as a description of TDD.

## Note on scope (dissent recorded)

TDD-mode was merged into this skill by a 3-2 triage vote alongside the
size-classification core. The maintainer/breadth-advocate voice dissented,
arguing TDD is an orthogonal *process* axis (when/how you write tests)
while size classification is an *artifact-quality* axis (what a test is
allowed to touch) — different questions, not the same content. Recorded
here rather than silently resolved; revisit if the combined skill becomes
unwieldy.

## Sources
- Google Testing Blog, "Test Sizes" (2010) — `literature/software-testing/google-testing-blog-test-sizes.md`
- Kent Beck, "Canon TDD" — `literature/software-testing/kent-beck-canon-tdd.md`
