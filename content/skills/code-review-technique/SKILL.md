---
name: code-review-technique
description: >-
  A lightweight, single-pass personal checklist and approval bar for
  reviewing someone else's diff — your own PR on another project, a
  classmate's code, or a quick self-check before submitting. This is NOT
  the vault's fleet-based `/code-review` pipeline (multi-agent adversarial
  debate, specific to this vault's own PR process, see the `code-review`
  skill) — it's the plain human technique: what order to check things in,
  and when to stop nitpicking and approve. Use whenever Ethan says "review
  this PR", "how should I review this diff", "what should I look for in a
  code review", or is about to review a collaborator's/classmate's code
  by hand.
---

# code-review-technique — ordered checklist for reviewing a diff

Grounded in Google's `eng-practices` reviewer docs. Go through in this
order — earlier items can invalidate later ones, so don't spend time on
naming or style in code that might get redesigned.

1. **Design.** Does this change belong in the codebase at all? Does the
   overall approach make sense, independent of implementation detail?
   Fix design problems before anything else — line comments on code that
   gets rewritten are wasted cycles.
2. **Functionality.** Does the code do what the author intended, and is
   that what the user/caller actually needs? Read every human-authored
   line you're responsible for — don't skim logic, only skim generated
   code or data files. If it's too hard to follow, that's feedback to
   give back, not something to push through silently.
3. **Complexity.** Is the code more complex than it needs to be, at the
   function or file level? Over-engineering (solving hypothetical future
   problems instead of the actual requirement) is a defect, not a style
   preference — call it out the same way you'd call out under-engineering.
4. **Tests.** Are there tests for new logic, and are they actually
   correct? Verify a test would fail if the underlying logic broke — a
   test that passes regardless of whether the logic is right is not a
   real test.
5. **Naming.** Are names clear at the point of use, without needing to
   jump to the definition?
6. **Comments.** Do comments explain *why*, not *what*? A comment that
   restates the code is a smell — the code itself should carry the
   "what"; prose is for reasoning that isn't visible in the code.
7. **Style.** Does it follow the project's conventions? Mark pure
   preference with a `Nit:` prefix so the author knows it's optional,
   not blocking.
8. **Docs.** Do related docs, README, or config comments need updating
   alongside this change?

If you lack the expertise to evaluate a section (e.g. an unfamiliar
subsystem or domain), say so explicitly rather than rubber-stamping it.

## The approval bar

Approve once the change **net-improves the codebase's health**, not once
it's perfect — "there is only better code," never perfect code. The
question to ask is "does this move things forward," not "is this how I'd
have written it"; the latter is the most common cause of unnecessary
review friction, especially with a classmate's or collaborator's code.

Don't let a review stall on unresolved disagreement — that's its own
code-health failure. If you and the author can't agree: talk it through
directly first, then escalate to whoever has final say (a lead, professor,
or team decision) rather than letting the diff sit unmerged indefinitely.
