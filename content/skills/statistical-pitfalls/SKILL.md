---
name: statistical-pitfalls
description: >-
  Checklist for the three failure modes that inflate false positives beyond
  their nominal rate — researcher-degrees-of-freedom/p-hacking, multiple-
  comparison inflation, and p-value misinterpretation — plus a decision rule
  for which correction fits which test structure. Use whenever Ethan is
  designing an analysis with more than one test, metric, or look at the data,
  or writing up a result that includes a p-value. ALSO use to review someone
  else's claimed statistical result ("is this finding legit", "sanity-check
  this p-value/A-B-test result") — same checklist, applied in reverse: was
  alpha fixed in advance, was the test stopped early, were multiple tests
  corrected for, is effect size reported, would a null result have been
  reported too.
---

# Statistical pitfalls

Two directions, one checklist: producing a result (author) or judging someone
else's (reviewer).

## Author checklist — before running the analysis

1. **Fix alpha and the hypotheses before seeing data.** State H0/Ha and alpha
   up front (NIST handbook). Choosing alpha, exclusion rules, subgroups, or
   the stopping point *after* looking at results is p-hacking even when each
   individual choice looks reasonable in isolation — Simmons/Nelson/Simonsohn
   showed this "researcher degrees of freedom" flexibility can push a nominal
   5% Type I rate up to 60% in the worst case.
2. **Fix the sample size and stopping rule before collecting data.** Peeking
   at a running p-value and stopping once it crosses significance invalidates
   a fixed-alpha test — Evan Miller quantifies continuous peeking as
   inflating 5% to as high as 26.1%. If the test must be monitored live, use
   a sequential/alpha-spending design instead of a plain fixed-alpha test.
3. **Correct for multiple comparisons, matched to the test's shape:**
   - Few tests, false positives costly -> **Bonferroni** (alpha/m; simple,
     conservative, loses power fast as tests multiply).
   - Many treatments vs. one control (typical multi-variant A/B test) ->
     **Dunnett's test** (more powerful than Bonferroni for this shape since
     it accounts for the shared control).
   - Many exploratory tests, missing a real effect costs more than a stray
     false positive -> **Benjamini-Hochberg (FDR)**.
   - Continuously monitored / dashboard-style test -> **sequential
     testing / alpha-spending**, not a fixed-alpha correction.
4. **Report effect size and design context alongside any p-value** — never a
   bare p-value (ASA principles 3 and 5). Statistical significance is not
   practical importance; a tiny effect can hit p<0.05 purely from sample
   size, and p=0.049 vs. p=0.051 is not a real difference in evidence.
5. **Report the result regardless of outcome, or say you didn't.** The
   strongest structural fix is publishing (or at least writing down) the
   finding whether or not it came out significant — Registered Reports show
   roughly half the "significant" rate of standard write-ups (44% vs. 96%),
   which is a measure of how much selection pressure exists when only
   significant results get shared.

## Reviewer checklist — sanity-checking someone else's claimed result

Same five questions, asked in reverse, about a result already in hand:

1. Was alpha (and H0/Ha) fixed *before* the data was seen, or chosen/adjusted
   after? If unstated, treat the p-value as unverified rather than assuming
   good faith.
2. Was the test stopped early because it looked significant, or was the
   sample size/stopping point set in advance? "We checked the dashboard
   until it turned green" is a peeking violation, not a valid stop.
3. If multiple tests, metrics, or variants were run, was any correction
   applied (Bonferroni/Dunnett/FDR/sequential)? "We tested 15 metrics and
   #12 was significant" with no correction mentioned is the single
   highest-yield red flag to raise.
4. Is effect size reported, not just the p-value? A significant-but-tiny
   effect, or a p-value with no effect size at all, is under-supported by
   design.
5. Would a null result have been reported too? A "preregistered" badge alone
   is a weak signal — check what was actually preregistered, not just
   whether a badge exists — and ask whether this result would have surfaced
   at all if it hadn't come out significant.

A result that fails (1) or (2) is not fixable by re-reading it more
generously — the nominal p-value is untrustworthy regardless of magnitude,
and the honest response is to say so rather than accept the headline number.
