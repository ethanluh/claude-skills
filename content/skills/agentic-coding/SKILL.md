---
name: agentic-coding
description: Practices for steering coding agents effectively — writing/optimizing CLAUDE.md-style rule files, structuring autonomous iteration loops, verification discipline, choosing between MCP and Skills for extending an agent, and avoiding generic "AI slop" output. Use when writing or reviewing agent rule files, setting up a recurring/autonomous coding loop, deciding whether a capability should be an MCP server or a Skill, reviewing AI-generated web/UI output for genericness, or when a session's context-management or delegation approach needs tightening.
---

# Agentic Coding

Practices for building and steering coding agents, synthesized from
loop-engineering and agent-workflow sources.

## Standing rule files over re-briefing

Write standing instructions to a file the agent re-reads, rather than
re-briefing it every session. This converges across every source: `CLAUDE.md`,
`AGENTS.md`, `DESIGN.md`, `memory.md` are the same pattern under different
names. When a project develops a recurring convention (a lint rule always
gets forgotten, a design system always needs restating), promote it to a
rule file immediately rather than repeating it in chat.

When writing or reviewing a `CLAUDE.md`-style rule file, apply attention-
budget theory:
- Keep it short — every line competes for the same limited attention budget.
- Prefer verifiable, checkable rules ("run `pytest` before committing") over
  vague guidance ("write good tests").
- Use the Don't-X-Do-Y pattern for corrections: state the wrong approach and
  the right one together, not just the right one in isolation.
- Use progressive disclosure — a short pointer in the main file linking out
  to a longer reference, rather than inlining everything.

## Loop engineering

For autonomous or repeated-iteration work (overnight runs, `/loop`-style
recurring tasks), frame the task as an *objective plus a self-verifying
iteration step*, not a single-shot instruction. A loop needs:
- A concrete, checkable definition of "done" (tests pass, a specific file
  changed, a metric crossed a threshold) — not "keep improving this."
- A way for the agent to verify its own progress each iteration, so it can
  self-correct instead of drifting.
- Where available, wire the loop to an external verification signal (test
  suite, linter, build) rather than trusting the model's own judgment of
  success.

This is the same discipline whether the deliverable is code, a generated
web page, or a document — define objective and constraints up front, then
iterate against them, instead of prompting once and hoping.

## Orchestration: one agent, several specialists

For work that spans distinct concerns (research vs. implementation vs.
review), prefer one coordinating agent delegating to specialized
sub-agents with shared context/memory over one agent doing everything
serially. Keep the human at the *direction* layer — approving scope,
redirecting approach — not the *execution* layer of re-typing instructions
for every sub-step.

Task specificity, not model capability, is usually the actual bottleneck
here — vague subagent instructions cause duplicated or misdirected work
even from strong models. The fix is a structured handoff (objectives,
context, success criteria as a verifiable checklist, constraints,
milestones, task breakdowns, handoff notes) rather than a one-line
delegation. See the `delegate-and-coordinate` skill for the full
brief-writing workflow.

This same orchestration shape has a security side worth naming: what a
spawned subagent inherits — context, memory, tool surface — is an
attack/correctness surface, not just convenience. A compromised or
carelessly-forwarded parent context can propagate to every descendant
unconditionally if inheritance isn't scoped. Pass a child the minimum it
needs for its task; never blind-forward untrusted content (a fetched
page, a raw conversation dump) into a subagent's instructions. See the
context-hygiene note in `delegate-and-coordinate` for the practical rule.

## Verification discipline

Treat every agent-generated line as needing senior-engineer-level review,
not a rubber stamp:
- For bug fixes, give exact file/line context rather than a broad
  description — narrow context produces narrower, more correct diffs.
- Build reusable skills for recurring workflows (code review, doc
  generation, PR descriptions) instead of re-deriving the approach each
  time.
- Verify claims about code state (tests passing, a function existing)
  by actually running the check, not by asserting it.
- Adversarial, edge-case-specific prompts ("can a user bypass X?") find
  more real bugs than general audit requests — this holds for security
  review specifically (RLS misconfiguration, front-end-only rate limits,
  exposed sensitive APIs are common Supabase/Firebase failure modes) and
  is the same narrow-context principle as the bug-fix point above, applied
  to auditing instead of fixing.

## MCP vs. Skills

Two different extension mechanisms, not competing options for the same
job:
- MCP is for real-time, authenticated external data access — a live
  connection to a system outside the agent's own context.
- Skills are lightweight, reusable, conditionally-loaded domain
  knowledge — the packaged, "when to use" version of a standing-
  instructions file, loaded only when relevant rather than always in
  context.
- Reach for MCP when the task needs current external state; reach for a
  Skill when the task needs a repeatable procedure or body of practice
  the agent already has everything it needs to execute.

## Avoiding "AI slop" output

Generic AI-generated web/UI output (default fonts, purple gradients, glow
effects) is a predictable consequence of underspecified, single-shot
prompting — the same failure mode loop engineering above addresses,
applied to a concrete deliverable instead of an abstract agent loop. The
fix is a structured pipeline instead of adjective-based prompting:
- Wireframe or sitemap first, then an explicit style guide, then generate
  code against both — don't ask for "a modern landing page" and iterate
  on vibes.
- Ground the request in references (screenshots, URLs) rather than
  adjectives ("clean," "modern") that the model can't verify against.
- Make the style guide persistent (`AGENTS.md`/`DESIGN.md` or equivalent)
  so it survives across sessions instead of being re-typed per prompt —
  the same standing-rule-file discipline as the CLAUDE.md section above.
