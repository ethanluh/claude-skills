---
name: root-cause-debugging
description: >-
  The scientific-method debugging loop: reproduce, hypothesize, test
  minimally, refine, plus the 10-minute rule for switching from ad hoc
  poking to systematic investigation. This is the FIRST-PASS investigation
  discipline used BEFORE any fix is attempted, distinct from
  `debug-recovery` (which handles recovering AFTER a fix already failed or
  an error recurs). Use whenever a bug hunt starts, or Ethan says "let's
  debug this properly", "stop guessing", "be systematic about this", or
  has been poking at something for a few minutes without a hypothesis.
---

# Root-cause debugging

## The 10-minute rule

If you've spent 10 minutes on ad hoc inspection (reading code, adding
prints, guessing) without a concrete hypothesis, stop. That's the trigger
to switch modes: write down what you actually know, then run the loop
below instead of continuing to poke.

## The loop

1. **Reproduce minimally.** Get a small, repeatable case that triggers the
   bug. If the trigger is large (a big input, a long sequence of steps),
   binary-search it: cut the input/steps in half, check if the bug still
   fires, repeat until it's minimal.
2. **Localize with binary search / slicing.** Don't scan the whole
   codebase. Bisect the code path (comment out or short-circuit halves)
   or trace backward from the bad value ("slicing": which lines could
   have produced this?) to rule out irrelevant code before forming a
   hypothesis. Same idea as `git bisect`, applied to code flow or data
   instead of commits.
3. **Delta debugging when you have a passing and a failing case.** Diff
   them and isolate the minimal difference that flips the outcome; that
   difference is usually the hypothesis, not a guess.
4. **Form one hypothesis, predict, test minimally.** State what you
   believe is wrong and what evidence would confirm or kill it before
   running anything. Use the smallest possible probe (print, assertion,
   breakpoint) for observation only. Do not patch code while probing;
   conflating "let me check something" with "let me try a fix" is the
   single most common way this loop degrades back into guessing.
5. **Refine or move on.** If confirmed, that's the cause: go fix the root
   cause, checking whether it's a design flaw or has siblings elsewhere
   before treating it as one-off. If refuted, that's real information;
   form the next hypothesis from it, don't discard it.
6. **Keep it out of your head.** Write down each hypothesis, the
   prediction, and the observed result as you go. This loop can span
   hours; memory is not the log.

## Handoff

- Root cause confirmed: fix it, then add the reproducing case to the
  regression suite so it can't silently return.
- A fix gets attempted and fails, or the same error resurfaces later:
  that's `debug-recovery`'s job (revert-then-diagnose), not this loop's.
  This skill only covers finding the cause before any fix is on the table.
