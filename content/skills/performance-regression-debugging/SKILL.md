---
name: performance-regression-debugging
description: >-
  Chain USE-method triage with scientific-method root-causing to take a
  performance regression from symptom to fix — first localize which
  resource/subsystem regressed, then pin down the exact code-level cause,
  plus a backend/service-specific case for checking cache behavior as the
  triage step. Use whenever something that used to be fast is now slow and
  the path from "it's slower" to "here's the line/commit" isn't obvious:
  a regression report, a "this got slower after X" complaint, or an endpoint/
  job/loop whose latency crept up. Not for a first-time performance problem
  with no prior baseline (that's `performance-profiling` alone) or a
  functional bug with no latency angle (that's `root-cause-debugging` alone).
---

# Performance regression debugging

A regression is a two-part problem: *where* did it regress, and *why*. Doing
these in one undifferentiated pass is how people end up profiling the wrong
subsystem or guess-patching a symptom. This skill chains two existing skills
staged, plus one backend-specific triage shortcut.

## 1. Confirm it's a regression, not a new problem

Get the delta: what changed (deploy, config, data volume, dependency bump)
and when the symptom started, compared against a known-good baseline. If
there's no baseline — this has just always been slow — this isn't a
regression; go straight to `performance-profiling` and skip step 2 entirely.

## 2. Triage: USE Method (invoke `performance-profiling`)

Run the USE Method across CPU, memory, disk, network, and software resources
(locks, queues, connection pools) to localize which resource regressed.
Utilization alone is not enough — check saturation too, since a resource can
sit at 40% utilization and still be the bottleneck if work is queueing.
Stop as soon as one resource is flagged; this stage only narrows *where*, not
*why*.

## 3. Backend/service case: check cache behavior first

If the regressing component is a backend service sitting in front of a
database or external call, check cache behavior before deep-profiling
anything else: hit rate, TTL, and which pattern is in play (cache-aside vs.
write-through — production systems typically run both, write-through for
hot data with cache-aside as the miss fallback). A dropped hit rate, an
expired/misconfigured TTL, or a cold cache after a deploy explains a large
share of backend latency regressions and is cheaper to check than a query
plan or index. Also correlate the regression's onset against recent
deploys/config changes — this is frequently the actual cause, not a newly
discovered bottleneck.

**Dissent on scope**: an earlier draft of this workflow had this as a full
"diagnosing a production backend performance issue" case, sourced from the
Google SRE troubleshooting model (report -> triage -> examine -> diagnose ->
test/treat, with "stabilize before root-causing" as the load-bearing rule for
live incidents). The career-advocate persona argued for removing this case
entirely, on the grounds that Ethan isn't operating production backends as a
student and the incident-response framing (rollback/feature-flag-first,
on-call urgency) doesn't match his actual context. That dissent is preserved
here rather than resolved: the case is kept, narrowed to the cache-check
step, because it's still directly useful for any backend/course project with
a cache in front of a database — but the fuller SRE incident-response
apparatus (stabilize-before-diagnose, incident docs) was left out as
premature. Revisit and expand this case if Ethan's trajectory moves toward
running real production services.

## 4. Root-cause: scientific-method loop (invoke `root-cause-debugging`)

Once step 2 (or step 3) has localized the regression to a resource,
subsystem, or cache path, switch to the hypothesis-test-refine loop: get a
minimal reproduction, binary-search/slice to localize further, form one
hypothesis, test it minimally, refine or move on. Apply the 10-minute rule —
if ad hoc poking at the localized area runs past 10 minutes without a
hypothesis, that's the trigger to start writing hypotheses down instead of
continuing to poke.

## 5. Fix and close the loop

Fix the root cause, not the symptom found in step 2/3. Check whether it's a
one-off or a design flaw with siblings elsewhere (e.g. the same missing TTL
on other cache keys). Add the regression as a reproducible case — a
benchmark, load test, or assertion on the previously-regressed metric — so
it can't silently return.
