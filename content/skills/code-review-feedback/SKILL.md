---
name: code-review-feedback
description: >-
  How to phrase and scope individual code review comments so they land well
  and get acted on: stick to functional defects, missing validation,
  convention violations, and API misuse; skip out-of-scope suggestions and
  empty praise. This is the "how to phrase a comment" companion to the
  `code-review-technique` skill's "what order to check things in" checklist —
  use that one to decide what to look at, this one to decide whether and how
  to write the comment once you've found something. Use whenever Ethan is
  drafting review comments on a PR, asks "how should I word this feedback",
  "is this comment worth leaving", or is reviewing a collaborator's/
  classmate's diff and wants the feedback itself to be effective rather than
  just present.
---

# code-review-feedback — phrasing and scoping individual comments

Grounded in Dr. Michaela Greiler's research on what code review feedback
authors actually rate as useful, versus what reads as noise.

## The scope filter

Before posting any comment, ask: is this a **functional defect**, **missing
validation/edge case**, a **convention/best-practice violation**, or **API
misuse**? Those four categories are what the research shows authors actually
act on. If a comment doesn't fit one of them, it's probably out of scope for
the review — say it in a separate conversation instead:

- Alternative implementations you'd have chosen but that aren't wrong —
  that's preference, not a defect.
- Unrelated technical debt the diff didn't introduce.
- "Future work" or scope-creep suggestions bolted onto this PR.
- Comments that are really just your own curiosity about the code, not a
  request for the author to change anything.

If you catch yourself writing a comment because you're interested rather
than because something needs to change, delete it.

## Skip empty praise

Sandwich-feedback advice says open with a compliment to soften the rest.
The underlying research found the opposite: authors did not rate
praise-only comments as useful. Praise doesn't buy you credibility or make
criticism land softer — it's just noise in the diff. Save comments for
things that need to change; if something is genuinely a good pattern worth
calling out because you want it repeated elsewhere, say why, don't just
say "nice."

## Always pair a problem with a path forward

A comment that only flags an issue is half the value of one that also
points toward a fix. State the defect, then either the fix itself or
enough direction that the author isn't left guessing ("this will throw on
an empty list — guard it or document that empty isn't a valid input").
Don't make the author reconstruct your reasoning from a bare "this is
wrong."

## Route by reviewer familiarity, when you have the choice

Reviewers who've previously worked in the file under review give measurably
more useful comments than reviewers seeing it cold. When you're picking who
reviews what (not just who's free), weight it toward familiarity. When
you're the one reviewing unfamiliar code, say so explicitly on sections
you can't evaluate rather than commenting anyway to look thorough.

## Quick check before posting

For each comment: does it name a functional defect, missing validation, a
convention violation, or API misuse? Does it avoid praise-only filler and
out-of-scope suggestions? Does it leave the author with a concrete next
step? If any answer is no, cut or rewrite the comment before posting.

See `code-review-technique` for the ordered checklist of *what* to look at
(design, functionality, complexity, tests, naming, comments, style, docs)
before applying this filter to *how* you write up what you find.
