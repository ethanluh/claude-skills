---
name: product-psychology
description: >-
  Behavioral-psychology mechanisms for product and engagement design —
  variable reinforcement, goal-gradient, Zeigarnik, Fogg B=MAP,
  Self-Determination Theory and Reiss's 16 desires, a three-gate dark-pattern
  test, B2B/SaaS habit and retention mechanics, pricing psychology (anchoring,
  decoy pricing, Van Westendorp), and concrete product mechanics (remix
  culture, ambient presence, fast first wins) drawn from a fourteen-product
  audit plus a UCSC dissertation's pattern catalog. Use when designing or
  critiquing onboarding, retention, gamification, notifications, paywalls,
  pricing tiers, or any engagement loop, or when deciding whether an
  engagement mechanic crosses into manipulation.
---

# Product psychology

Distilled from `insights/product-psychology-insights.md` (BigBrain vault)
and its sources. Two halves: mechanisms (why engagement works) and
mechanics (what shipping products actually do). Use mechanisms to explain
and audit, mechanics to generate options.

## Mechanisms — why it works

**Foundational effects.** Default effect (the pre-selected option reads as
the recommendation); anchoring (first number seen becomes the ruler);
reciprocity (unexpected upfront value creates debt); IKEA effect (invested
effort inflates perceived value of the output); endowed progress (even
artificial head-start progress motivates); contrast effect (costs read
relative to what was just shown); commitment consistency (a small early
yes makes a bigger later yes feel consistent — distinct from IKEA, which
is effort→ownership, not pressure→consistency).

**Deeper levers.**
- **Variable ratio reinforcement** — highest, most persistent response
  rate of any reward schedule; the mechanism under pull-to-refresh,
  badges, loot boxes, infinite scroll. Also the single most ethically
  loaded lever: the same one gambling regulators target.
- **Goal-gradient** — motivation rises non-linearly as perceived distance
  to a goal shrinks (the real mechanism under endowed progress).
- **Zeigarnik** — uncompleted tasks intrude on memory more than completed
  ones; recall, not motivation. Explains streak-break anxiety and "your
  draft is still open".
- **Fogg B = MAP** — behavior needs motivation, ability, and a prompt to
  converge; most engagement failures are ability/prompt-timing problems,
  not motivation problems. Debug in that order.
- **Hyperbolic discounting** — instant loops beat objectively larger
  delayed rewards.
- **Self-Determination Theory** — durable engagement needs autonomy,
  competence, relatedness. The counterweight: reinforcement tricks move
  short-term metrics but trend compulsive, not satisfying.
- **Reiss's 16 desires** — a finer-grained, per-person-weighted superset of
  SDT (Independence→Autonomy, Power→Competence, Social Contact→Relatedness
  are the three SDT folds into). Covers desires SDT can't explain at all —
  collecting (Saving), competition (Vengeance), status-signaling (Status).
  Use SDT for a quick check, Reiss when a mechanic doesn't fit any of the
  three (it probably maps to one of the other 13).
- **The peanuts effect** — people go risk-seeking when stakes are trivial,
  flipping to risk-averse at real scale even at identical odds. A dissertation
  experiment (167 subjects) found players gambled far more than prospect
  theory predicts in a zero-real-stakes game — variable-reward/loss-aversion
  mechanics only work if the user is made to genuinely care about the virtual
  stakes; a withering-crop mechanic fails unless the crop matters to the user.

## Sequencing — short-term hooks vs long-term retention

1. Short-term mechanics (variable reward, goal-gradient) are the entry
   ramp for weeks 1–2, then taper; full intensity forever produces
   burnout and backlash.
2. Pair every short-term trigger with a competence signal — "you unlocked
   this because you got better" trains mastery-seeking, not compulsion.
3. Autonomy sets the ceiling: forced streaks, guilt notifications, hidden
   opt-outs are out. Loops that are easy to leave are trusted more, which
   raises voluntary engagement.
4. Reserve social/relatedness mechanics for retention (stickiest at
   months 3–12), not acquisition. Order: variable-reward hook week 1,
   competence by week 3–4, social compounding from month 2.

## The dark-pattern test — three separable gates, run per feature before shipping

A mechanic is a dark pattern only if it fails on intent AND fails both of
the other two gates — passing support OR disclosure nullifies it back to
an ordinary design pattern:

1. **Intent** — was this crafted with psychological insight against the
   user's interest, or is it an honest mistake (an anti-pattern, not a
   dark one)?
2. **Support** — does it serve the play style / workflow the user actually
   wants? A schedule-based challenge the user opted into is light; the
   same mechanic forcing a return-or-lose-progress cycle on someone who
   didn't choose it is dark. If the majority of users must engage with it
   against their own goals, that use is dark.
3. **Disclosure + literacy** — would an informed user, told exactly how
   and why this works, still consent? A paid feature that's openly,
   publicly a paid feature (priority queue, faster processing) is not
   dark even though it charges for convenience — the disclosure is what
   nullifies it.

Backstop checks from the older single-pass version, still useful: would
engagement collapse if the reward schedule were removed but the content
kept (yes → engagement-farming)? Does trigger frequency decrease as real
competence increases (no → red flag)? Multi-screen forms and progress
animation are legitimate when they reduce real cognitive load or cover
real value creation; dark when they only sunk-cost the user deeper.

Named dark patterns worth checking a feature against directly: **Grind**
(repeated tasks, reward untied to skill), **Interaction by Demand**
(forcing engagement on the app's schedule, not the user's), **Hellbroadcast**
(filtering a user's own posts/content without telling them), **Currency
Confusion** (arbitrary in-app currency obscuring real cost), **Monetized
Rivalries** (pay-to-win), **Pay to Skip**, **Social Pyramid Schemes** (app
uninteresting until N others join), **Impersonation** (fabricated
activity attributed to the user).

## Mechanics — what products do (by function)

- **Onboarding:** guarantee a fast first win; default to remix/templates
  over blank canvas; taste-collection ritual to seed the first feed; sell
  outcomes before signup; personalization worth the time (Headspace's
  multi-goal quiz lifted trial conversion ~10%); contextual nudges over
  tutorial pop-ups; custom pre-screen before the OS notification prompt.
- **Discovery:** serendipitous browsing and precise search as two co-equal
  modes (library model), not one blended bar; algorithmic feed plus
  structured lateral browsing.
- **Social:** remixing as a first-class celebrated format with baked-in
  attribution (Duets, Scratch remix credit) so forking never reads as a
  social risk; quantified public proof (stars/forks); ambient live
  presence. Remix/co-creation is the highest-leverage, most defensible
  mechanic — the one that maps to relatedness rather than reward hacks.
- **Creation tools:** keep AI output legible — inspectable component map,
  per-prompt diff/history, tight prompt-to-preview loop.
- **Gamification:** unlock capability with demonstrated comfort; positive
  variable reward (surprise delight), never unpredictability tied to
  spending.
- **Navigation:** legible, low-commitment ("duck in" browsing); never the
  casino pattern of disorienting layout to maximize time-on-app — in a
  tool, trust beats time-on-floor.
- **Retention:** social-reciprocity notifications ("someone interacted
  with your build") over feature pings; fixed cadence (weekly drops) over
  infinite content.
- **Monetization:** creator revenue share for power users; gate
  convenience/speed, never core content or the ability to be social;
  status/badges as the non-financial layer.

**Tie-breakers when mechanics conflict:** show don't gate; make the first
success fast and guaranteed; treat remixing as the celebrated core loop.

## B2B / tool engagement — distinct from consumer-social mechanics

Tools get used to get work done, not for their own sake — the mechanics
above (remix culture, social feed, ambient presence) mostly don't apply.
What actually drives habit and retention in a tool:

- **Trigger is internal, not social.** A work-anxiety state ("things are
  disorganized," "I don't know if this shipped") sends the user back to
  the tool, not a notification or a friend's activity.
- **Investment is accumulated organizational data and workflow lock-in** —
  the B2B equivalent of a consumer app's social graph. Imported data,
  learned shortcuts, team configuration all raise switching cost and
  should be treated as the retention mechanism, not a side effect.
- **Time-to-value gates habit formation.** Fast TTV (<10 min B2B) shortens
  the action→reward gap that any reward-schedule mechanic depends on;
  a slow first "aha moment" undercuts every other mechanic in this file.
- **Free tiers should give a role in a real workflow, not a feature
  sandbox.** Convert on collaboration (value expands individual → team),
  not on a paywall hit mid-task. Gate scope (seats, team size) over
  granular feature toggles — freemium fits self-serve individual/small-
  team use, not complex enterprise evaluation cycles.
- **DAU/MAU stickiness** is the honest proxy for whether a tool became a
  default behavior rather than a one-off. Feature-adoption rate is a
  competence-signal metric — mastery across the toolset, not funnel
  pressure.
- Pure self-serve growth plateaus once deals need to go enterprise-wide:
  the handoff point is a "product-qualified" user (has already gotten
  real value, shown by usage) moving to a sales-assisted conversation for
  scope expansion — not a cold funnel.

## Pricing psychology

- **Anchoring** is the mechanism underneath nearly every tactic below: the
  first number/tier a user sees becomes the reference point everything
  else is judged against, not evaluated in isolation.
- **Decoy pricing** — add a third tier, deliberately inferior to the
  target tier on value-per-dollar, priced close to it. The decoy isn't
  meant to sell; it makes the target tier look obviously correct by
  comparison (classic case: Economist Web-only $59 / Print-only $125 /
  Web+Print $125 — the useless print-only option shifts preference to
  the bundle). Requires ≥3 comparable price points and positioning that
  makes the decoy's inferiority legible at a glance.
- **Charm / odd-even pricing** — endings in 9 read as a deal (left-digit
  bias), round numbers signal premium/luxury. Don't charm-price a premium
  tier; don't round-price an entry tier.
- **Center-stage effect** — users gravitate to whichever option sits
  visually in the middle of a lineup; position the preferred tier there
  without touching the price.
- **Van Westendorp price sensitivity meter** — a research method for
  finding the acceptable price range without asking "how much would you
  pay?" directly: ask too-cheap / bargain / costly / too-expensive
  thresholds, plot cumulative curves, read off the optimal price point
  from where the too-cheap and too-expensive curves cross. Directional
  guidance for narrowing a pricing zone, not a demand forecast — it
  ignores competitors and elasticity, and should be triangulated with
  real price testing.
