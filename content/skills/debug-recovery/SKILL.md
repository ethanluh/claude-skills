---
name: debug-recovery
description: >-
  Recover cleanly when a fix didn't work or an error recurs, instead of
  stacking a second guess on top of a wrong one. Use whenever Ethan says
  "that didn't work", "still broken", "same error again", "that fix
  failed", or any variant of a previous fix not holding.
---

# Debug recovery

## When a fix didn't work

Revert it first, then re-diagnose. Do not stack a second guess on top of a
wrong fix — restore the last known-good state (`git checkout -- <file>` or
equivalent for the specific change, not a broad reset), confirm you're back
to the pre-fix behavior, then investigate from there with a fresh
hypothesis. Never leave a failed fix in place while trying another one on
top of it — that compounds uncertainty about which change did what.

## On any failure

Feed the error back and patch; don't regenerate from scratch. Read the
actual error, form a hypothesis about the specific cause, make the
smallest targeted change that addresses it.

## When the same error signature shows up a second time

That's a signal to promote it into a standing rule rather than fixing it
ad hoc again:
- Recurs within one repo → add a Don't-X-Do-Y rule to that repo's
  `CLAUDE.md`.
- Recurs across repos → it belongs in a skill instead, so the next
  session in any repo gets the rule automatically.
