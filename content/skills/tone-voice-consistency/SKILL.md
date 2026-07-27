---
name: tone-voice-consistency
description: >-
  Tone and Voice Consistency — calibrating and holding one register across a
  body of technical writing (docs, PR descriptions, comments) using a concrete
  three-tier too-informal/right/too-formal check. Use whenever Ethan asks to
  check, calibrate, or make consistent the tone/voice of docs, READMEs,
  docstrings, commit messages, PR descriptions, or comments — including
  "does this sound right", "is this too formal/casual", or reviewing a body
  of writing for a single consistent register.
---

# Tone and Voice Consistency

Source: Google Developer Documentation Style Guide, "Voice and tone"
(see `literature/writing-craft/google-developer-documentation-style-guide-voice-and-tone.md`).

## The target register

Write like a knowledgeable friend who understands what the reader wants to
do: informed but not clinical, warm but not chatty. Tone is a design
decision with a fixed target — not whatever mood the writer happened to be
in when they typed a given paragraph.

## The three-tier check

For any sentence that feels off, place it on this scale and aim for the
middle:

- **Too informal**: "Dude! This API is totally awesome!"
- **Right**: "This API lets you collect data about what your users like."
- **Too formal**: "The API documented by this page may enable the
  acquisition of information pertaining to user preferences."

If a line reads like either extreme, rewrite toward the middle rather than
softening it halfway.

## Checklist

- **Register check.** Run the sentence through the three-tier scale above.
  Slang/chumminess and bureaucratic/passive over-formality both fail —
  don't correct one by overshooting into the other.
- **Reader-state check.** Assume the reader is in a hurry looking for a
  specific answer. Cut anything that exists for entertainment or flavor
  at the expense of speed to the actual information.
- **Durability check.** Flag internet slang, pop-culture references, and
  culturally specific idioms. They date the writing and don't travel
  across regions or time even when they land today.
- **Politeness ceiling.** Instructions are imperative, not polite requests.
  "To view the document, click View" — not "...please click View."
  Overusing "please" in steps reads as excessive, not courteous.
- **Hedge-word flag.** Strike "simply," "just," and "easily" before a step.
  They misjudge the reader's actual effort and read as condescending the
  moment the step isn't simple for that reader.
- **Consistency pass.** When reviewing a body of writing (a README, a set
  of docstrings, a PR description plus its inline comments), apply the
  same tier target across every piece — inconsistency between sections
  reads as more than one author, even when there's one.

## When to use this

Apply it to anything meant to read as one voice: READMEs, docstrings,
commit messages, PR descriptions, and code comments. It's a calibration
pass on tone specifically — for sentence-level tightening (cutting words,
restructuring clauses), use `concise-technical-prose` instead; for
document-level structure (what content goes where), use
`documentation-structure`.
