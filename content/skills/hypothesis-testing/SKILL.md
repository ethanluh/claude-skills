---
name: hypothesis-testing
description: >-
  Enforce correct statistical hypothesis-testing methodology when running or
  reviewing a test (t-test, chi-square, ANOVA, or any other). Use whenever
  Ethan asks to run a hypothesis test, check significance, interpret a
  p-value, review someone else's statistical claim, or design an experiment
  with a null/alternative hypothesis. Forces the mechanical order — state
  H0/Ha and fix alpha before seeing data, only then compute the test
  statistic against a critical region — and makes the Type I/Type II
  trade-off explicit instead of collapsing everything to "p < 0.05."
---

# hypothesis-testing — mechanical order + explicit error trade-off

Source: NIST Engineering Statistics Handbook, "Introduction to Hypothesis
Testing" (see `literature/data-analysis/nist-hypothesis-testing-handbook.md`).

## Mandatory order — enforce this sequence, not just its outputs

1. **State H0 and Ha first.** H0 is the specific conjecture being tested;
   Ha is what's being guarded against. Decide one-sided vs. two-sided based
   on which direction of departure actually matters here — don't default to
   two-sided out of habit.
2. **Fix alpha before looking at data.** Alpha is a policy choice — the
   accepted risk of rejecting a true H0 (Type I error) — made in advance.
   Choosing or adjusting alpha after seeing the p-value invalidates the
   test's guarantees, full stop.
3. **Then, and only then, compute the test statistic** from the sample and
   compare it against the critical region derived from the test's reference
   distribution. Reject H0 only if the statistic lands in that region —
   never reject or fail to reject based on how "surprising" the data feel.

If Ethan (or a claimed result you're reviewing) presents a p-value without
H0/Ha and alpha specified in advance, that's the first thing to flag —
the nominal p-value is untrustworthy regardless of magnitude, independent
of how small it is.

## Make the Type I/II trade-off explicit

- **Type I (alpha):** rejecting a true H0 — a false positive.
- **Type II (beta):** failing to reject a false H0 — a missed real effect.
- These trade off at fixed sample size: shrinking alpha grows beta. Power
  and sample size are not an afterthought — if beta/power wasn't considered
  before data collection, say so plainly rather than letting a significant
  result imply the test had adequate power to detect an unimportant effect,
  or a non-significant result imply "no effect" when the test may have had
  no power to find one.
- When reviewing a claimed result, ask what beta/power was at the chosen
  alpha and sample size before accepting the conclusion.

## What a complete write-up must report

Never accept or produce a result that reports only a p-value. Require:

1. H0 and Ha, stated before data collection.
2. Alpha, fixed before data collection.
3. The test statistic and its reference distribution.
4. The critical region and the decision (reject / fail to reject).
5. Type I risk (alpha) and, where estimable, Type II risk (beta) or power.
6. Practical significance alongside statistical significance — a small
   p-value with a trivial effect size is not "the effect is real and
   important."

If any of 1–5 is missing from a result Ethan brings you, say which, before
discussing what the number means.
