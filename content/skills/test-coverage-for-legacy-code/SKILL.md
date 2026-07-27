---
name: test-coverage-for-legacy-code
description: >-
  Adding test coverage to an untested module — pin current behavior with
  characterization tests (write a placeholder assertion, run it, observe
  the real output, then correct the assertion) before touching any code,
  then use seams and the Sprout/Wrap techniques to add new tested code
  without a risky full rewrite. Use whenever Ethan needs to add tests to
  legacy code that has none, is about to change behavior in an untested
  module, or asks "how do I safely test this" for code without a spec.
---

# test-coverage-for-legacy-code — pin, then extend

Legacy code here means Feathers' definition: code without tests. The
paradox is you need tests before changing it safely, but adding tests
often requires changing it to make it testable. This skill resolves that
with an ordered sequence — never skip ahead to refactoring before a
characterization test exists.

## 1. Find the change point

Identify exactly what needs to change or be tested — the specific
method/function, not the whole module. Everything downstream targets
this one change point.

## 2. Find a seam

A seam is "a place to alter program behavior without changing the code
in that place." Look for where a dependency (DB connector, network
client, clock, file system) can be substituted — most often via
inheritance/interface substitution in OO code. If no seam exists yet,
that's the smallest allowable pre-test edit: introduce one (e.g. extract
an interface) without touching logic. Do not refactor logic here.

## 3. Write characterization tests, before any logic change

For the change point, pin current behavior exactly as Feathers
describes:

1. Write a test that calls the code with a real or seamed input and
   asserts a deliberately wrong/placeholder expected value.
2. Run it. It will fail — read the actual output from the failure.
3. Replace the placeholder with that observed output.
4. Rename the test to describe the behavior just discovered (not the
   behavior you assumed).
5. Repeat across the input scenarios that matter for the change ahead;
   don't stop at one case.

These tests claim only "the code currently does this," never "the code
is correct." Keep them fast (sub-100ms) and free of infrastructure
dependencies; anything slower or infra-bound is a secondary category,
not the safety net.

## 4. Choose how to add the change: refactor, Sprout, or Wrap

Decide based on how much surrounding code can be safely touched and how
much time is available:

- Enough coverage and time to refactor the existing code directly, then
  do it, protected by step 3's characterization tests.
- New functionality, existing method can stay untouched: **Sprout**,
  write the new logic as a separate, fully unit-tested piece, then call
  it from the untouched legacy code.
- Must alter an existing method under time pressure: **Wrap**, rename
  the existing method, add a new method with the old name that delegates
  to it, and test the wrapper's added logic only.

Both Sprout and Wrap let new code be trustworthy without requiring the
old code to become so.

## 5. Make the change

With characterization tests green and the seam in place, make the
actual change (behavior fix, feature, or refactor). Re-run the
characterization tests; any unintended regression should fail them
immediately.

## 6. Refactor only after the change is safe

If the change point still needs cleanup, do it now, under the
characterization tests' protection, not before step 3. Avoid smearing a
specific library's API directly through the codebase during this step;
wrap dependencies at the boundary so future seams stay cheap.

## Output

Report: which change point was targeted, what seam (if any) was
introduced, how many characterization tests were added and what they
pin, and which of refactor/Sprout/Wrap was used for the actual change.
