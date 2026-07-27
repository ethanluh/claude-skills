---
name: experiment-design
description: >-
  Experiment design — walk through objectives -> factors/levels -> design
  structure (randomization, replication, blocking, factorial vs.
  fractional-factorial), plus fixing sample size and stopping rule before
  data collection starts. Use whenever Ethan is planning an A/B test, a
  class-project comparison of conditions, or any experiment with a
  null/alternative structure, before any data gets collected. Not for
  analyzing data that's already been collected (that's
  `exploratory-data-analysis` or `hypothesis-testing`) and not for auditing
  a claimed result after the fact.
---

# Experiment design

Order matters: skipping ahead to "what design should I use" before the
objective is nailed down is a described failure mode, not a shortcut.
Work through these in order, before touching data collection.

## 1. Objective

- Write down the actual question the experiment answers — not the design,
  not the metric, the question. "Does variant B increase conversion" is an
  objective; "run an A/B test" is not.
- If you can't state it as a testable claim, you're not ready to pick
  factors yet.

## 2. Factors and levels

- List every process variable you're deliberately manipulating and the
  levels each one takes.
- If more than one factor might plausibly interact (common whenever
  several tunable parameters are in play), note that now — it determines
  whether a one-factor-at-a-time approach is even valid later.

## 3. Design structure

- **Randomization**: assign units to conditions randomly. This is what
  lets you attribute an observed difference to the treatment rather than
  to unmeasured confounders.
- **Replication**: take more than one observation per condition.
  Replication is what turns a single observation into an estimate of
  variability — without it you have no noise floor to compare against.
- **Blocking**: if there's a known-but-uninteresting source of variation
  (day-to-day, batch-to-batch, user cohort), group units into blocks so
  that variation is removed from the effect estimate instead of
  inflating noise or confounding the result.
- **Factorial vs. fractional-factorial**: full factorial tests every
  combination of factors (and their interactions) but grows expensive
  fast. When you have many candidate factors and mainly need to screen
  which ones matter, a fractional-factorial/screening design trades away
  some information (usually higher-order interactions) for far fewer
  runs.

## 4. Sample size and stopping rule — fix before collecting data

- Compute the required sample size from the desired effect size and
  variance *before* launch. Write it down.
- Decide the stopping rule at the same time: either (a) run to the
  precomputed sample size and stop, full stop; (b) use a sequential
  design with predetermined checkpoints that preserve valid significance
  levels; or (c) use Bayesian methods designed to allow anytime stopping.
- **Do not "watch the dashboard until it turns green."** Continuously
  peeking at a running p-value and stopping the moment it crosses
  significance invalidates the test — checking after every observation
  can inflate a nominal 5% false-positive rate to as high as 26.1%, and
  even 10 peeks turns a reported 1% significance level into an actual
  ~5%. Each peek is another chance for noise to look real; stopping on
  "significance" is a selection-bias mechanism baked into the monitoring
  habit itself, not a one-off mistake.

## Checklist before data collection starts

- [ ] Objective is written as a testable claim, decided before the design
- [ ] Factors and levels listed; potential interactions flagged
- [ ] Randomization scheme decided
- [ ] Replication plan set (how many observations per condition)
- [ ] Blocking variable identified, if one exists
- [ ] Design chosen (full factorial vs. fractional/screening) and matched
      to how many factors need testing
- [ ] Sample size computed from effect size + variance, in writing
- [ ] Stopping rule fixed (fixed-N, sequential checkpoints, or Bayesian) —
      and no peeking-and-stopping-early outside that rule

## Sources
- [[nist-design-of-experiments-handbook]] — objectives -> factors/levels ->
  design ordering; randomization, replication, blocking; factorial vs.
  fractional-factorial trade-off.
- [[how-not-to-run-an-ab-test]] — peeking/early-stopping inflates false
  positives; precommit sample size and stopping rule before collection.
