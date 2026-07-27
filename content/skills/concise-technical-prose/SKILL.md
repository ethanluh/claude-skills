---
name: concise-technical-prose
description: >-
  Sentence-level editing checklist for tightening prose using concrete,
  checkable structural moves (un-nominalize buried verbs, tighten
  subject-verb distance, audit stress position) rather than vague "tighten
  this up" taste calls. Use whenever Ethan asks to tighten, tighten up, cut
  the fat from, make more concise, or edit for clarity ANY piece of prose —
  code comments, PR descriptions, docs, commit messages, chat replies. Not
  for restructuring how a complex idea is explained (that's
  `explanation-craft`) or for the Slack standup's specific message format
  (that's `slack-standup`) — this skill only edits sentences that already
  exist, at the sentence level.
---

# Concise Technical Prose

Distilled from Gopen & Swan, "The Science of Scientific Writing" (1990) —
see `literature/writing-craft/science-of-scientific-writing-gopen-swan.md`.
Their claim: unclear prose is rarely unclear thought — it's information
placed where readers don't expect it. The fixes below are structural checks,
not subjective polish, so they're a repeatable pass, not a taste call.

Apply this to sentences that already exist. If the problem is *what order to
explain things in* or *which document mode to use*, that's `explanation-craft`
instead — this skill never reorders paragraphs or picks an analogy, only
tightens sentences.

## The checklist — apply per sentence or paragraph

1. **Un-nominalize buried verbs.** Find nouns ending in `-tion`, `-ment`,
   `-ance`, `-sis` that are hiding an action ("we performed an analysis of",
   "there was a reduction in"). Rewrite so the actual action is the
   grammatical verb: "we analyzed", "X dropped". Test: can you point at the
   verb in the sentence and say it's the real action? If the real action is
   a noun and the verb is just `is`/`perform`/`conduct`/`provide`, fix it.

2. **Tighten subject-verb distance.** Find the subject and its main verb.
   Count what's wedged between them — parenthetical clauses, qualifying
   phrases, stacked modifiers. Long gaps force the reader to hold the
   subject in memory while parsing the interruption. Move the interruption
   to before the subject, after the verb, or into its own sentence.

3. **Audit stress position (sentence/paragraph end).** Readers automatically
   weight whatever sits at the point of syntactic closure — the last clause
   of a sentence, the last sentence of a paragraph. Check what's actually
   there. If the important finding, the caveat, or the conclusion is buried
   mid-sentence and the ending is a throwaway ("...which was expected" /
   "...as shown below"), move the important thing to the end.

4. **Audit topic position (sentence/paragraph start).** The opening is where
   readers look for orientation — old, already-established information, not
   a new fact dropped cold. If a sentence opens with brand-new information
   the reader has no context for, that's a flow break — either supply the
   context first or restructure so the new information lands in stress
   position of the *previous* sentence instead.

5. **One function per sentence/paragraph.** Each unit should support one
   claim or introduce one point. If a sentence is doing two jobs (stating a
   result and qualifying it and citing a source), split it.

## What this is not

- Not word-count minimization — a "that", "who", or article that removes
  ambiguity is worth the extra word. The target is misplaced information,
  not raw length.
- Not a rewrite-for-voice pass (that's `slack-standup` for its one format,
  or ad hoc voice-matching elsewhere).
- Not a call on document structure, ordering, or which explanation mode to
  use (tutorial vs. reference, analogy choice, diagram vs. prose) — that's
  `explanation-craft`.

## Output

Show the edited version with the original for comparison on request; for a
short passage, just give the tightened version. If a sentence fails more
than one check, fix the stress-position problem first — it changes what the
rest of the sentence needs to build toward.
