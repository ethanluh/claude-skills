---
name: exploratory-data-analysis
description: >-
  Run a graphical, assumption-checking EDA pass before any confirmatory
  statistical test (t-test, ANOVA, regression, chi-square, etc.). Use
  whenever Ethan hands over a raw dataset and wants a test run, a model
  fit, or a conclusion drawn - before choosing the test, check
  distributions, outliers, missingness, and the assumptions the test
  requires, and keep the plots/summary stats as an artifact justifying
  later modeling choices (transforms, exclusions, test choice). Not for
  the confirmatory test itself, and not for routine data cleaning with no
  inferential claim attached.
---

# Exploratory Data Analysis

Grounded in Tukey's EDA philosophy (NIST/SEMATECH Engineering Statistics
Handbook, ch. 1): EDA precedes and informs modeling - let the data reveal
structure first, rather than assuming a model and testing it. A confirmatory
test run without this pass isn't defensible; the EDA output is the evidentiary
record for later choices (which test, which transform, which points to
exclude).

## Checklist - run before choosing or running any confirmatory test

1. **Distributions.** Histogram (or KDE) per variable. Check shape: skew,
   multimodality, heavy tails. Probability plot (Q-Q) against the
   distribution the test assumes (usually normal) - don't assume normality,
   check it.
2. **Outliers and anomalies.** Box plot per variable; flag points beyond
   1.5x IQR. For time-ordered data, a data trace / lag plot to catch
   anomalies a static plot hides (drift, autocorrelation, non-randomness).
3. **Missingness.** Count and pattern of missing values per variable -
   is it random or structured (e.g. missing at high/low values, missing by
   group)? Structured missingness breaks the "missing at random" assumption
   most tests implicitly make.
4. **Assumption check for the specific test in mind.** Name the test you're
   heading toward and list what it assumes (normality, homoscedasticity,
   independence, linearity) - check each one graphically (mean plots,
   standard-deviation plots across groups for homoscedasticity; scatter
   plots for linearity) rather than asserting it holds.
5. **Summary stats as a supplement, not a replacement.** Mean/median/SD are
   fine alongside the plots but never a substitute for looking at the
   graphics - Tukey's point is that visual pattern recognition catches what
   tables of numbers miss.

## Non-negotiable: keep the artifact

Save the plots and summary stats generated in this pass (as a notebook cell
output, a markdown file, or an image directory alongside the analysis) -
don't discard them once the test is chosen. This is the record that
justifies later modeling decisions (a log transform, a dropped outlier, a
non-parametric test instead of a t-test) as principled rather than
post-hoc. If asked to reproduce or defend a conclusion later, this artifact
is what gets pointed to.

## When to stop and flag, not proceed

- Distribution badly violates the test's assumption and no transform fixes
  it: say so and propose an alternative test (e.g. Mann-Whitney instead of
  a t-test), don't silently run the parametric test anyway.
- Missingness looks structured: flag it before imputing or dropping rows;
  don't default to a fallback that hides the pattern.
