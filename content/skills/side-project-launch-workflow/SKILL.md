---
name: side-project-launch-workflow
description: >-
  Side-project launch workflow — chains positioning to README to launch
  post: (1) run the lightweight positioning pass to settle the "why should
  anyone care" line, (2) write/revise the README using that line as its
  opening frame, (3) draft platform-specific launch posts that point back
  at the README as landing page. Use whenever Ethan is prepping a side
  project or student build for a Show HN / Product Hunt / Reddit / X
  launch and wants the positioning, README, and launch post handled as one
  pass rather than three disconnected asks.
---

# side-project-launch-workflow — positioning to README to launch post

Three drafting skills, chained in order, each consuming the previous
stage's output as a fixed input rather than re-deriving it. Don't skip a
stage or run them out of order — the README's opening frame depends on
positioning already being settled, and the launch post depends on the
README existing as the page it points to.

## 1. Positioning pass

Invoke the `positioning-gtm-for-side-projects` skill on the project. Run
its five-step pass (competitive alternatives including "do nothing,"
unique attributes, translated value, target segment, market frame) and
produce its one-paragraph output.

Do not proceed to step 2 until step 3 of that pass (translated value) has
a real answer — a technical attribute restated as a feature ("built in
Rust") is not translated value. If it comes back empty, stay in this
stage and iterate rather than starting the README.

Output of this stage: one paragraph, and specifically one sentence
distilled from it — the "why should anyone care" line — that step 2 will
open with.

## 2. README pass

Invoke the `readme-writing` skill. Feed it the "why should anyone care"
line from step 1 as the opening frame — the paragraph that goes above the
fold, before any install block, per that skill's what/why/how-to-
start/where-to-get-help structure.

Run its draft/review checklist against the result, in particular:
- the why-paragraph precedes any install instructions
- the why is concrete (what step 1's translated-value answer said this
  does for someone), not the positioning paragraph pasted in verbatim
- getting-started stays copy-pasteable and jargon-free for a reader
  outside the project's context

This README is the artifact step 3 will treat as the landing page — it
must stand on its own for a reader arriving cold, without the launch
post's framing.

## 3. Launch post pass

Invoke the `launch-post-writing` skill once the README from step 2 exists.
Each platform-specific post (Show HN, Product Hunt, Reddit, X, or
whichever Ethan named) should:
- open with the same "why should anyone care" line from step 1, adapted
  to that platform's voice and length norms — not a re-derived pitch
- point back at the README as the landing page, not duplicate its
  getting-started content inline
- carry its own short "why" independent of the README, per the
  readme-writing skill's launch-post check — a reader may read the post
  without ever clicking through, so the post can't assume the README's
  framing already landed

## Output

Report all three artifacts together: the positioning paragraph (step 1),
the README diff or draft (step 2), and the launch post draft(s) (step 3).
Flag anywhere a later stage's answer forced a revision to an earlier one
(e.g. the README draft surfaced that step 1's target segment was too
broad) rather than silently patching it upstream without saying so.
