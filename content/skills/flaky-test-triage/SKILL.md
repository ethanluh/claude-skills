---
name: flaky-test-triage
description: >-
  Triage a flaky test — rerun a suspect test repeatedly to estimate a real
  flake rate, quarantine it out of the blocking suite immediately with a
  tracked expiry, then diagnose root cause against a fixed taxonomy
  (isolation, async, remote services, time, resource leaks) before attempting
  a fix. Use whenever a test fails intermittently, passes on rerun with no
  code change, or someone says "this test is flaky", "just rerun it", or
  "quarantine this test".
---

# flaky-test-triage — quantify, contain, then diagnose

Inputs: the suspect test's name/path, and how it was observed to fail
(single anomalous failure vs. already-suspected-flaky).

## 1. Quantify — don't act on a single anomalous failure

Rerun the suspect test in isolation a fixed number of times (10-20x) with no
code change in between. Compute the failure rate. A single red run proves
nothing — cheap repeated reruns are the triage step before any expensive
investigation. If it fails 0/20, it may have been a one-off environment
issue; note it and stop unless it recurs.

## 2. Quarantine immediately — before diagnosing

If the rerun confirms a nonzero flake rate, pull the test out of the
blocking suite right away, independent of whether the cause is known yet.
Trust in CI erodes the moment developers learn red doesn't reliably mean
broken — once that happens they start reflexively dismissing failures as
"probably flaky," and a real regression can ship under cover of that
dismissal. Quarantining first means the fix can be investigated without the
pressure of a blocked pipeline.

- Move it to a non-blocking/quarantine suite (whatever mechanism this repo
  uses for that — separate CI job, `@flaky`/skip marker, etc.).
- Track it with a hard expiry: a ticket/issue with an owner and a date or
  build-count limit. Quarantine is a parking spot with a deadline, not a
  permanent exemption — an untracked quarantine list is just a slower way of
  losing trust in the suite.

## 3. Diagnose against the fixed taxonomy — don't guess

Classify the failure against these five causes, in order of likelihood,
before writing any fix:

1. **Isolation** — does the test share mutable state (DB row, global,
   file, shared fixture) with other tests? Suspect this first if failures
   correlate with execution order or parallelism. Fix direction: rebuild
   starting conditions from scratch per test; use transactional rollback
   where the infra supports it.
2. **Async** — does the test wait on a callback, event, or background job?
   A bare `sleep()` is the tell. Fix direction: callback-based
   synchronization, or polling with an explicit timeout — never a
   guessed-and-hoped-for delay.
3. **Remote services** — does the test call a real network dependency
   (API, external service)? Fix direction: replace with a test double,
   validated separately by a periodic contract test.
4. **Time** — does the test depend on wall-clock or system time (deadlines,
   expiry, date-sensitive logic)? Fix direction: wrap/freeze the clock so
   the test controls time explicitly.
5. **Resource leaks** — does the test exhaust a pool (connections, file
   handles, threads) only under certain orderings or load? Fix direction:
   shrink the relevant pool to size 1 during testing so a leak fails fast
   and visibly instead of accumulating silently.

Also check whether the flakiness is configuration-dependent (a specific
flag, platform, or environment) rather than a fixed property of the test —
the same test can be flaky under one configuration and stable under
another, so reproduce under the configuration where it was actually
observed to fail before ruling a cause out.

## 4. Fix and release from quarantine

Implement the fix matching the diagnosed cause (not a speculative catch-all
retry or timeout bump). Rerun the same 10-20x loop from step 1 to confirm
the flake rate has dropped to zero before moving the test back into the
blocking suite. Close out the tracked quarantine ticket from step 2.

## 5. Output

One short block: flake rate observed, quarantine location/tracking ticket,
diagnosed cause (one of the five, or "undetermined — needs more reruns"),
and fix applied or "deferred, tracked in <ticket>".
