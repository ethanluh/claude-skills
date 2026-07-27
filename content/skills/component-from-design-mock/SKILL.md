---
name: component-from-design-mock
description: >-
  Build Component From Design Mock — verify a human designer's Figma mock is
  complete (every interactive state designed, values expressed as named
  tokens/variables rather than raw hex/px), translate its design tokens into
  code using a consistent naming taxonomy, then implement against documented
  variants/constraints. Use whenever Ethan hands off a Figma file, Dev
  Mode/Code Panel link, or exported design spec and asks to build the
  component/page it shows. Distinct from `ui-work-artifact-first`, which
  governs sign-off on a Claude-authored HTML mock before Claude writes its
  own code — this skill instead governs implementing a mock someone else
  already designed and handed off via Figma.
---

# component-from-design-mock — Figma mock to implementation

Inputs: a Figma file/frame link, Dev Mode Code Panel access, or an exported
spec (screenshots + token list). If none of these exist, stop and ask for
one rather than guessing values from a flat image.

## 1. Verify the mock is complete — stop on any gap

Do not start implementation until the mock clears every check below. An
incomplete mock is a blocker, not something to guess-fill during coding.

- **States**: every interactive element has its full state set specified —
  default, hover, focus, active, disabled, and where applicable error,
  loading, success. A button with only a default state shown is an
  incomplete specification.
- **Values are tokens, not literals**: colors, spacing, typography, and
  elevation are expressed as named Figma Styles/variables, not raw hex or
  px values eyeballed off the canvas. If the file uses bare literals,
  flag it back to the designer rather than inventing token names yourself.
- **Variants and constraints are documented**: the component's variant set
  (size, emphasis, layout) and any documented constraints (min/max width,
  responsive behavior, content truncation rules) are visible in the file
  or its annotations — not left implicit.

If any of these is missing, report the specific gap to Ethan and wait;
don't fill it with an assumption.

## 2. Read the mock via Dev Mode / Code Panel

Prefer the Code Panel's inspection over eyeballing the canvas — it
surfaces the actual CSS values, spacing, and component properties Figma
has recorded, so token-to-value mapping in the next step starts from
ground truth, not estimation.

## 3. Translate tokens into code

Map each Figma Style/variable to a code token using the naming taxonomy
from the `design-tokens` skill (Base: Category/Property/Concept, Modifiers:
Variant/State/Scale/Mode, Objects: Component/Element, Namespaces: System/
Theme/Domain). Concretely:

- Match each Figma Style name to an existing project token first. Only
  invent a new token name if genuinely nothing in the project's taxonomy
  covers it, and follow the "start local, promote globally" rule doing
  so — scope it to this component; don't add it to a shared/global
  namespace speculatively.
- Keep homogeneity within a category (all color tokens follow one
  pattern, all spacing tokens follow another) so a token's kind is
  inferable from its name alone.
- If the same underlying value is about to serve two purposes that could
  diverge later (e.g. a color used for both a button background and an
  unrelated badge), alias rather than reuse the literal token — see the
  `design-tokens` skill for when aliasing is worth the extra indirection
  versus over-engineering it up front.

## 4. Implement against variants and constraints

Build the component to match the documented variant set and constraints
exactly — don't add variants the mock doesn't show, and don't drop
documented ones. Interactive states from step 1 all need corresponding
code paths (CSS states, ARIA states, or component props) — a state
designed but not wired up is as incomplete as one never designed.

## 5. Verify against the mock

Compare the built component to the Figma frame at each documented state
(default, hover, focus, disabled, etc.), not just the default view. Note
any deliberate deviation and why; don't silently drift from the spec.

## Output

One short prose block: which states/variants were implemented, any tokens
newly created (and why nothing existing covered them), and any mock gaps
that were flagged back rather than guessed through.
