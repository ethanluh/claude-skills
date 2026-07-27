---
name: pomodoro-focus-sessions
description: >-
  Focus-session structuring (Pomodoro) — break a time-block into estimated,
  tracked focus intervals with after-the-fact recording to calibrate future
  time estimates. Use whenever Ethan wants to run a focus session, asks to
  "pomodoro this", "break this into intervals", or needs to structure a
  time-block into sustained-attention chunks rather than just scheduling it.
  Composes with daily-time-blocking (that skill answers what happens in
  which hour; this one answers how to sustain attention once a block has
  started) — a time-block can be subdivided into pomodoros.
---

# Pomodoro focus sessions

Source: [[pomodoro-technique-official]] (confidence 0.65 — the fetched
primary source confirms the five-stage system below, but did not itself
verify the specific 25-minute-work / 5-minute-break interval lengths widely
cited as canonical. Treat those numbers as a common convention to adopt or
adjust, not a verified constant from this source.)

## The five stages

1. **Planning** — build (or pull from) an Activity Inventory of everything
   that needs doing. Don't skip straight to timing; know the full list
   first.
2. **Estimation** — assign an effort count (in intervals) to each item
   before starting. Estimates will likely be wrong — that's expected, not
   a planning failure.
3. **Daily Commitment** — pick a bounded subset for today (a "To-Do
   Today" list), not the whole inventory.
4. **Tracking** — record each completed focus interval as it happens, in
   real time, not from memory afterward.
5. **Recording/Analysis** — after the session, compare estimated vs.
   actual intervals per item. This is the calibration step; don't drop it
   even when pressed for time.

## Checklist for running a session

- [ ] Confirm the task list for this block already exists (pull from the
      time-block's task, or ask what's in scope) — don't start a timer
      against an undefined task.
- [ ] Estimate interval count per task before starting the first timer.
- [ ] Pick an interval length and stick to it for the whole session
      (default to the conventional 25/5 split unless Ethan specifies
      otherwise — flag it as convention, not a verified requirement).
- [ ] Treat starting the timer as the commitment point: once started, no
      renegotiating scope until the interval ends.
- [ ] Record each completed interval immediately (count actually spent),
      not reconstructed after the fact.
- [ ] After every 4 intervals, take the longer break before resuming.
- [ ] At session end, compare estimated vs. actual intervals per task and
      note the delta — this is the input for calibrating future estimates,
      not just a wrap-up formality.
- [ ] If a task is interrupted mid-interval, log the interruption rather
      than silently discarding or fudging the interval count — the
      distortion itself is useful calibration data.

## When this doesn't apply

If the work doesn't decompose into discrete, estimable tasks (open-ended
exploration, a single unbroken deep-work block with no subtasks), the
estimation/recording loop has nothing to calibrate against — a plain
timer or the daily-time-blocking skill alone is a better fit.
