---
name: dataset-to-conclusion
description: >-
  Raw dataset to defensible conclusion — chains EDA -> design/assumption
  check -> hypothesis test -> reporting (effect size + error rates, not a
  bare p-value), so every analytic choice traces back to something
  inspected before the test was run.
---

# dataset-to-conclusion — raw data to a defensible conclusion

Sources: NIST/SEMATECH Engineering Statistics Handbook — Exploratory Data
Analysis (`literature/data-analysis/nist-exploratory-data-analysis-handbook.md`),
Introduction to Hypothesis Testing
(`literature/data-analysis/nist-hypothesis-testing-handbook.md`), Design of
Experiments Basics
(`literature/data-analysis/nist-design-of-experiments-handbook.md`).

Inputs: a raw dataset and a question to answer about it (a comparison, a
relationship, an effect). Output: a conclusion whose every analytic choice
(transform, exclusion, test, alpha) traces back to something inspected
before the test ran, not asserted after.

## 1. EDA pass — invoke `exploratory-data-analysis`

Before naming a test, run that skill's checklist against the raw data:
distributions, outliers, missingness, and the assumptions the test you're
heading toward requires. Keep its output (plots, summary stats) as the
artifact for this run — later stages cite it, they don't re-derive it.

Stop here and flag, don't proceed, if: a distribution badly violates the
intended test's assumption and no transform fixes it, or missingness looks
structured. Either changes the test choice made in stage 3.

## 2. Design/provenance check — how was this data generated?

Before treating the data as fit for inference, establish where it came
from, using the vocabulary from the design-of-experiments handbook:

- **Designed experiment** (randomized, replicated, possibly blocked): note
  which of those three mechanisms were present. Randomization is what lets
  a later difference be attributed to the treatment rather than a
  confounder; replication is what turns a single observation into an
  estimate of variability; blocking is what removes a known nuisance
  source (day, batch, operator) from the noise estimate.
- **Observational / convenience-sampled data**: no randomization occurred.
  State this explicitly in the final write-up rather than letting a
  significance test in stage 4 imply causal footing it doesn't have.
- If a new experiment is still being planned (not just analyzing existing
  data), invoke `experiment-design` here to set objectives -> factors/levels
  -> design *before* collection, rather than designing a study around a
  test picked in advance.

This stage is a gate: a dataset with no design behind it still gets
analyzed, but the write-up in stage 5 must say so.

## 3. Hypothesis test — invoke `hypothesis-testing`

Hand that skill the question plus what stages 1–2 established (assumptions
checked, transforms applied, design caveats). It enforces the mechanical
order: state H0/Ha and fix alpha before computing anything, then compute
the test statistic against the critical region. Do not let this stage
re-open stage 1's assumption checks after seeing results — if an
assumption turns out unmet only now, that's a sign stage 1 was skipped or
incomplete, go back to it rather than patching the test in place.

## 4. Report — never a bare p-value

Assemble the final write-up from all three stages. Required contents,
per `hypothesis-testing`'s completeness rule:

1. H0/Ha and alpha, as fixed in stage 3 before data collection.
2. The test statistic, its reference distribution, and the decision.
3. Type I risk (alpha) and, where estimable, Type II risk (beta) or power.
4. Effect size and practical significance alongside statistical
   significance — a small p-value with a trivial effect is not "the
   effect is real and important."
5. The stage-1 EDA artifact (or a pointer to it) and the stage-2 design
   provenance statement (designed vs. observational, and what that implies
   for causal claims).

A conclusion missing any of these is incomplete — say which piece is
missing rather than presenting the p-value alone as the answer.
