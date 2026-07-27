---
name: paper-structuring
description: >-
  Check that each section of a CS paper does its functional job — motivate,
  situate, explain, evidence, close — rather than just existing under the
  right heading. Use whenever Ethan is drafting or reviewing a paper's
  introduction, related work, methods, results, or conclusion section, asks
  "does my intro/related-work/results section work", "review my paper
  structure", or is assembling a draft from research results section by
  section. Not for sentence-level prose editing (concise-technical-prose) or
  related-work placement/evaluative framing specifics (a dedicated
  related-work skill) — this is the whole-paper skeleton check.
---

# Paper structuring

Source: [[how-to-write-a-scientific-paper-tu-wien]] (TU Wien Computer
Graphics group). Core claim: structure is functional, not decorative — each
section exists to answer a specific reader question at a specific point in
the argument. A section can be present, well-written, and still fail if it
isn't doing its job. Check function, not just presence.

## How to use this

For each section below, don't just confirm it exists — read it and answer
the check question directly. If you can't answer it from the section's
content, the section is failing its job regardless of length or polish.

### Introduction — job: motivate
- Does paragraph one alone tell a reader what the paper claims and why it
  matters, even if they read nothing else?
- Are objectives stated explicitly, not just implied by background?
- Is motivation present as *argument* (why this matters) and not just
  *context* (what area this is in)?

### Related work — job: situate
- Decide placement first: is prior work prerequisite knowledge the reader
  needs before the contribution makes sense (fold into the intro), or
  comparison material best judged once the reader knows the paper's own
  approach (standalone section later)? This is a structural decision, not a
  style preference — check it was actually made, not defaulted.
- Is the section evaluative — does it name specific drawbacks of existing
  approaches and explain why those drawbacks necessitate the new method?
- Reject a related-work section that is a list of "X did A, Y did B" with no
  verdict attached to any of them.

### Methods / main content — job: explain
- Does the block run as 2-4 sections with one logical throughline, or does
  the justification for a single idea get scattered across noncontiguous
  sections? If a reader has to jump backward to reassemble one argument,
  this fails.
- Is each section's content there because it's the next step in the
  mechanism, not because it seemed to belong somewhere?

### Results — job: evidence
- Is the presentation objective — tables/figures/text laid out so a reader
  could independently verify the claim — with interpretation kept separate
  from raw findings?
- Flag any spot where interpretation is smuggled into what should be plain
  presentation of data.

### Conclusion — job: close
- Does it address the original objectives point-by-point (closing the loop
  the introduction opened), rather than summarizing in different words?
- Are advantages over existing methods stated explicitly?
- Are open problems named concretely, not gestured at with a generic
  "future work" line?

## Failure mode to watch for

A section that exists under the right heading, reads fine sentence-by-
sentence, and still fails the check above. That's the case this skill exists
to catch — checking headers is not checking structure.
