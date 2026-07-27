---
name: launch-post-writing
description: >-
  Launch post writing (Show HN / Product Hunt) — draft platform-specific
  launch copy: a rule-checked Show HN title and eligibility gate, and a
  separate Product Hunt tagline/gallery outline/maker comment. Use whenever
  Ethan asks to draft a Show HN post/title, write a Product Hunt tagline,
  gallery outline, or maker comment, or prep launch copy for a side project
  before posting to HN or PH.
---

# launch-post-writing — draft Show HN / Product Hunt launch copy

## Core: launch-copy compliance (platform-agnostic)

Every launch post is copy written for a specific platform's stated norms,
not generic marketing copy. Before drafting anything:

1. **Identify the platform(s)** the copy targets (HN, PH, or both — they
   are never the same text repurposed).
2. **Gate eligibility first, style second.** A perfectly-styled title for
   a thing that doesn't qualify for the venue is still wrong — check
   eligibility before wordsmithing.
3. **Check against that platform's worked example** (below) as a
   checklist, not vibes.
4. **State which rules you checked** when you hand back a draft — don't
   just assert "this follows the guidelines."

Platform specifics are worked examples layered on this core, sourced from
literature notes captured 2026-07-27. **Re-verify against the live
guidelines pages periodically** (HN's `newsguidelines.html`, PH's
`producthunt.com/launch`) before relying on this skill for a real launch —
platform norms drift and this skill will go stale silently otherwise.

## Worked example: Show HN (Hacker News)

Source: `literature/marketing/hacker-news-guidelines.md`

**Eligibility gate (check first, before drafting a title):**
- Is there something other people can actually try, run, or inspect right
  now (working demo, runnable repo, live artifact)? A blog post, landing
  page, newsletter, reading list, or fundraiser does not qualify as
  Show HN — reject or redirect those, don't title-polish them.

**Title rules (mechanical, checkable):**
- No uppercase or exclamation points used for emphasis.
- No editorializing or self-praise ("amazing," "revolutionary," etc.).
- No site/product name appended — HN renders the domain automatically.
- No gratuitous numbers ("10 Ways to X" becomes "How to X").

**Account/community norms (not part of the title, but part of "done"):**
- Note the self-promotion ratio constraint: an account should not read as
  launch-only spam. If relevant, flag this to Ethan rather than silently
  drafting a fifth consecutive self-post.
- Never draft anything that solicits upvotes/comments — that's a bright-line
  violation, not a style choice.
- Flag that active engagement in the comment thread after posting is
  expected — the discussion is the actual value exchange, not just the
  submission.

## Worked example: Product Hunt

Source: `literature/marketing/product-hunt-launch-guide.md`

Product Hunt needs three distinct artifacts, not one blob of copy:

1. **Tagline/description** — short positioning copy for the listing itself.
2. **Gallery outline** — roughly three images following a
   problem-to-solution-to-key-features arc. Treat this as a compressed
   pitch, not a screenshot dump; write the arc/captions even if Ethan
   supplies the actual images separately.
3. **Maker comment** — a distinct artifact from the description: tells
   the founder's story and explicitly invites feedback. This is the
   opening line of a conversation, not more ad copy — don't let it
   collapse into a restated tagline.

Other notes to apply:
- Mention the 12:01am Pacific timing recommendation if timing comes up,
  but treat readiness as primary — don't let a draft imply timing matters
  more than being ready.
- Community norms: ask people to visit and comment, never to upvote
  directly.
- Frame this as one launch among future iterations, not a one-shot event,
  if Ethan is deciding whether a v1 is "worth" a launch.

## Output format

When asked for HN: eligibility check (pass/fail and why), then the title,
then which title rules were verified.

When asked for PH: the three artifacts above, labeled separately, each
checked against its own bullet list.

If asked for both, produce both sets — do not merge them into one post.
