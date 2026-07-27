---
name: performance-profiling
description: >-
  Resource-first triage for a performance problem — check utilization,
  saturation, and errors across CPU, memory, disk, network, and software
  resources (queues, locks, connection pools), then drill down with
  CPU/off-CPU profiling — instead of blind tuning or symptom-guessing. Use
  whenever something is "slow" and the next question is where to look: a
  systems/backend regression, a "why is this endpoint/thread/loop slow",
  or a frontend page that feels sluggish. Not for choosing an architecture
  (system-and-frontend-architecture) or fixing a specific known bug.
---

# Performance profiling

## Method: USE, then profile

Before touching a profiler or changing a config, run the **USE Method**
(Brendan Gregg): for every resource, check three things — Utilization,
Saturation, Errors. A resource can look fine on utilization alone and still
be the bottleneck via saturation (e.g. 40% CPU but requests queueing) —
that gap is the single most common blind spot this catches.

| Resource | Utilization | Saturation | Errors |
|---|---|---|---|
| CPU | % busy | run-queue depth (`vmstat`, `sar`) | — |
| Memory | % used | swapping/paging | OOM kills |
| Disk | % busy | I/O queue depth | device errors |
| Network | throughput vs capacity | queue drops | link errors |
| Software (locks, thread pools, connection pools, queues) | % held/in-use | wait/queue depth | timeouts, rejections |

This is resource-first, not symptom-first: instead of starting from "it
feels slow" and guessing, run this checklist across every resource
mechanically. It's a triage tool, not the whole investigation — once it
flags the likely resource, hand off to the next stage.

**Sequence** (Gregg's full methodology, USE as one stage in it):
1. **Problem statement** — clarify the actual symptom, when it started, what changed.
2. **Workload characterization** — who/what/when is generating the load.
3. **USE Method** — triage which resource is saturated/erroring.
4. **CPU profiling** (flame graphs) if CPU-bound, or **off-CPU analysis**
   (stack traces at the blocking point) if the thread is waiting on I/O,
   locks, or scheduling — a flame graph that doesn't explain observed
   latency means the bottleneck is a wait state, not compute; redirect
   instead of re-profiling the same CPU data.
5. **Drill-down** — go from the high-level metric into finer-grained
   breakdowns only as deep as the symptom requires; stop once it's explained.

**Anti-methodologies to avoid**: blame-shifting between teams, random/blind
tuning ("change a config, see if it helps"), and passive benchmarking
without a hypothesis. These are the default failure modes under pressure
precisely because they skip the checklist above.

Applies uniformly to hardware and software resources — a C++ thread pool
or connection pool gets the same utilization/saturation/errors check as a
disk or NIC.

## Frontend variant (worked example, not load-bearing)

The same triage-then-drill-down shape applies to frontend performance,
currently operationalized as **Core Web Vitals**: LCP (loading, <2.5s),
INP (responsiveness, <200ms — replaced FID in 2024 because it measures
the full interaction, not just initial delay), and CLS (visual stability,
<0.1), judged at the 75th percentile of real-user (field) data, not lab
averages. Root-cause diagnosis chains backward the same way USE hands off
to profiling: LCP traces to TTFB and render-blocking resources, INP to
long main-thread tasks, CLS to unsized media or late-injected content.

Treat these specific metrics/thresholds as an example of the general
method applied to one domain at one point in time — they will need
refreshing as the field's metrics change (as INP already replaced FID).
The durable part is the shape: triage against a fixed checklist of named
signals, then drill down from the flagged signal to its mechanism —
not the specific numbers above.
