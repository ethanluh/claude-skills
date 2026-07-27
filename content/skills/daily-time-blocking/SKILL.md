---
name: daily-time-blocking
description: >-
  Build a next-day time-block grid from current task lists, calendar, and any
  weekly/quarterly plan already in place, with deliberate slack and an
  explicit block for reactive/open-ended obligations. Use whenever Ethan asks
  to plan tomorrow's schedule, time-block his day, "block out" a day, or asks
  what his day should look like given his current tasks and calendar. Daily
  layer on top of `priority-triage`'s domain sort — that skill decides what
  matters, this one decides when it happens.
---

# daily-time-blocking — plan tomorrow in 30-minute blocks

Source: Cal Newport, "Deep Habits: The Importance of Planning Every Minute
of Your Work Day."

## 0. Gather inputs before drawing anything

Pull from whatever already exists — don't invent tasks:
- Current task list(s) (if a `priority-triage` sort exists, use its Do
  First / Schedule items as the task source, not a fresh brainstorm).
- Calendar: fixed commitments (classes, meetings) anchor the grid first;
  everything else gets placed around them.
- Any weekly/quarterly plan already in place — daily blocking layers on
  top of a weekly plan, it doesn't replace one. If no weekly plan exists,
  say so rather than fabricating one.

## 1. Build the grid

- One line per 30 minutes, covering the actual work day (not every waking
  hour).
- Assign each fixed commitment first, then place task-list items into the
  remaining lines, grouping same-theme work into contiguous blocks rather
  than fragmenting it.
- Every block gets a task or theme — no line stays blank by default.

## 2. Give reactive/open-ended obligations their own block

Don't leave "check messages," "handle incoming requests," or similar
ambient obligations unscheduled — left open, they colonize the whole day.
Instead:
- Assign a specific, bounded block for reactive work (e.g., "coursework
  Q&A / advisor messages").
- Give that block a secondary fallback task for any downtime inside it,
  so idle minutes inside the block still produce output.

## 3. Leave deliberate slack

Build slack into the grid itself, not as an afterthought:
- Don't wall-to-wall the day — leave room next to blocks (or a short
  buffer block) so a disruption doesn't blow up the whole plan.
- When the day does go off-script, cross out and redraw only the
  remainder of the grid — don't discard the plan and revert to
  unstructured reacting.

## 4. Close the loop that evening

- Planning tomorrow's grid takes 10-20 minutes, done the evening before
  (or first thing, if that's the workable cadence) — not a heavyweight
  process.
- If today's grid got redrawn more than once or twice, that's a signal
  the reactive block was undersized or fixed commitments weren't
  accounted for — adjust sizing tomorrow rather than repeating the same
  layout.

## Relationship to priority-triage

`priority-triage` sorts *what* matters across domains (classes, research,
applications) into urgent/important quadrants. This skill takes that
output — or any other task list — and decides *when* each item happens
today. Run triage first when the task list itself is unsorted or
overwhelming; run this skill whenever the next day needs an actual
schedule, sorted or not.
