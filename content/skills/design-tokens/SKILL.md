---
name: design-tokens
description: >-
  Design Tokens & Component Design Systems — naming and scoping design tokens
  (Base/Modifier/Object/Namespace taxonomy, start-local-then-promote
  discipline) so a component library stays consistent and discoverable as it
  grows. Use whenever naming a new design token, reviewing a token name for
  consistency, deciding whether a value belongs on a component or in the
  global token set, or a token system feels inconsistent or hard to navigate.
---

# Design Tokens & Component Design Systems

Source: [[naming-tokens-in-design-systems]] (Nathan Curtis, EightShapes).

A token system lives or dies on naming discipline. A bad token name is worse
than a hardcoded value — it looks authoritative while lying about what it
covers. Run every new token through this checklist before it ships.

## Checklist

1. **Identify the four layers before naming anything.**
   - Base: Category (color, space, type...), Property (background, border...),
     Concept (action, danger, neutral...)
   - Modifier: Variant, State (hover, disabled...), Scale, Mode (light/dark)
   - Object: Component, Element, Component group
   - Namespace: System name, Theme, Domain
   Not every token needs every layer — but know which ones apply before
   picking a string.

2. **Pick one layer order and never deviate.** Whether it's
   `$color-action-background-primary-hover` or
   `$action-primary-background-hover`, the order encodes meaning. Mixing
   orders across the token set breaks the "name alone tells you the
   category" property.

3. **Homogeneity within, heterogeneity between.** All tokens in one category
   (all color tokens, all spacing tokens) share a pattern. Distinct
   categories should be visibly distinct in the name, not just in a docs
   table. If you can't tell a token's category from its name alone, the
   naming has failed.

4. **Start local, promote globally — never the reverse.** A new token starts
   scoped to the one component that needs it (e.g. a component-local token,
   not a global one). Only promote it to the shared/global namespace once a
   **third** independent component needs the identical decision. Two is
   coincidence; three is a pattern.
   - Don't invent a global token speculatively "in case other components
     need it later." That's premature globalization — it pollutes the
     shared namespace with tokens nobody asked for and nobody owns.
   - When promoting, rename to fit the global naming order (layer 2), don't
     just hoist the local name as-is.

5. **Alias instead of reusing when purposes might diverge.** If two usages
   currently resolve to the same literal value but represent different
   *concepts* (e.g. a border color that happens to equal a text color today),
   create two token names that both alias the same primitive rather than
   pointing both usages at one token. This lets them evolve independently
   later without a breaking rename or a surprise visual side effect.

6. **Before adding a token, ask what it replaces.** A token replacing a
   magic value in a mock or component should map cleanly to an existing
   Base/Modifier/Object layer. If it doesn't fit any existing layer, that's
   a signal to extend the taxonomy deliberately, not to freehand a one-off
   name.

7. **Sanity-check discoverability.** Could another engineer, seeing only the
   token name, correctly guess its category, the component it's scoped to
   (if local), and its state/variant? If not, the name needs another pass
   before it ships.

## When reviewing an existing token system

Look for: inconsistent layer ordering across tokens, global tokens with only
one consumer (should have stayed local), and same-value tokens serving two
diverging concepts (should have been aliased, not shared).
