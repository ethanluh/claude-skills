---
name: ui-ux-design
description: Layout, typography, and UX-psychology principles for critiquing or planning a visual design — grid systems, spacing/hierarchy discipline, Hick's Law and other cognitive-load heuristics, dark-pattern ethics, the skeuomorphism-to-claymorphism material lineage (including Liquid Glass/glassmorphism and spatial/visionOS design), named web design styles (minimalism, brutalism, Swiss Style, bento, etc.) and their historical lineages, and concrete layout patterns. Use when reviewing a design for genericness, choosing a grid/spacing system or named style, applying UX psychology to a flow, deciding whether a skeuomorphic/glass/clay visual treatment fits, or picking a layout pattern for a specific page type.
---

# UI/UX Design Principles

Layout, psychology, and material-style guidance for evaluating or planning
visual design — complementary to skills that generate the actual build; this
one is for the underlying principles.

## Foundations: layout, typography, hierarchy

- Use a compound grid (structural + compositional) as the practical default
  over any single pure grid system.
- Pick a divisible base spacing unit (4-point or 8-point) and enforce it
  everywhere. The exact unit matters less than universal enforcement.
- Constrain numerically: 3-4 type hierarchies, 1-2 accent colors, 1-2
  typefaces per project. Treat single-typeface/multi-weight vs.
  display+body pairing as context-dependent (editorial/poster vs.
  product/web UI), not a settled rule.
- One accent color reserved for key indicators; deliberate, not decorative,
  use of visual effects (shadows, motion, glass).
- Interaction quality is the differentiator beyond static layout: define
  explicit states (default/hover/pressed/disabled) and design flows, not
  isolated screens.
- Use broad checklists (21-point Apple-derived lists, similar surveys) as a
  pre-ship audit, not as primary design guidance — they're useful for
  catching misses, not for generating direction.

## Psychology and ethics

- Hick's Law (more choices = slower decisions) and the serial position
  effect (people best remember first and last items) are cross-validated,
  near-canonical UX heuristics — apply them by default to menus, choice
  lists, and onboarding flows.
- Gestalt principles (symmetry, similarity, proximity, common region,
  continuation, closure, figure-ground) explain perceptual grouping — use
  them to justify or critique spacing/grouping decisions, pairing with grid
  structure.
- Persuasion mechanics (objective-first design, emotionally resonant
  imagery, consistency via mere-exposure, anchoring) are a separate lens
  from cognitive/perceptual principles — don't conflate "makes it easier to
  understand" with "makes it more persuasive"; be explicit about which goal
  a given design choice serves.
- Name dark patterns when you see them — bait-and-switch, hidden costs,
  forced continuity, confirmshaming, infinite scroll/autoplay/variable
  rewards used to manufacture compulsive engagement — and flag them rather
  than treating them as neutral growth tactics.
- A complete design review checks two layers: mechanical execution (grids,
  spacing, typography, states) and psychological grounding (why those
  choices work on users). Checking only one is an incomplete review.

## Material lineage: skeuomorphism → neomorphism → glassmorphism → claymorphism

All four styles are the same shadow/highlight vocabulary applied with
escalating restraint — treat them as one lineage, not unrelated trends.

- **Skeuomorphism** — realistic texture/shadow mimicking physical objects.
  Avoid its four classic failure modes: over-texturing, performance cost,
  poor cross-device responsiveness, systemic inconsistency.
- **Neomorphism** — matched light/dark shadow pairs on a background-matched
  color. Its low contrast is a settled accessibility failure (poor
  legibility for colorblind users and in poor lighting), not a matter of
  taste — don't reach for it where legibility matters.
- **Glassmorphism** — semi-transparent gradient fill + background blur +
  gradient stroke; needs a busy/colorful background behind it to read at
  all. `backdrop-filter: blur()` is the CSS-native implementation. Apple's
  Liquid Glass is glassmorphism refined with OS-level 3D rendering, not a
  new effect — apply the same discipline: native components over custom
  glass code, color/transparency used sparingly, real performance and
  legibility costs outside Apple's own rendering stack.
- **Claymorphism** — soft, rounded, "fluffy 3D." A cited study found it
  outperforms flat buttons for general (not tech-savvy) users — consider
  audience before reaching for it. Combines naturally with glass
  translucency on the same component.
- Styles combine per-component rather than being mutually exclusive — a
  single tab bar can mix neomorphism and glassmorphism.

## Spatial / visionOS design

- Liquid Glass (visual material) and spatial-design principles
  (familiarity, human-centered/ergonomics, grounded depth, immersion
  spectrum, authenticity) cover the two halves of spatial UI: one governs
  how surfaces look, the other how they behave in 3D space. Apply both when
  designing for headset/AR-VR contexts, not just the visual layer.

## Minimalism, maximalism, brutalism

- Lock structure (grid, layout, layer hierarchy) first, then layer
  deliberate imperfection (noise, distress, blur) on top for a brutalist
  treatment — degradation is a controlled layer, not a substitute for
  structure, and is distinct from anti-design's rule-breaking.
- Minimalism, maximalism, and brutalism disagree on how much visual
  restraint or excess to apply, but agree that hierarchy/structure is
  non-negotiable regardless. When critiquing any of the three, check
  structure first regardless of the aesthetic direction chosen.

## Named web design styles: two lineages

Nine named styles (Minimalism, Brutalism/Neobrutalism, Constructivism, Swiss
Style, Editorial, Hand-Drawn, Retro, Flat, Bento) trace back through two
lineages, not a flat list of unrelated trends.
- Grid/typography lineage: Bauhaus to Constructivism/De Stijl to Swiss
  Style to Minimalism and Flat design. Each step keeps the prior step's
  grid/typography discipline and strips further ornament.
- Rebellion lineage: each style reacts against whatever became the safe
  default before it. Skeuomorphism gave way to flat, minimalism gave way
  to maximalism/anti-design, corporate polish gave way to
  brutalism/neobrutalism.
- A style's most extreme signature elements (fully sketchy hand-drawn UI,
  fully raw brutalism, dense retro texture) are consistently best used as
  accents over full commitment. Restraint-in-application is cross-cutting,
  not style-specific advice.
- Style-agnostic fundamentals (grid math, an 8pt spacing scale, WCAG
  contrast/focus criteria, Core Web Vitals) sit underneath every named
  style. A site can commit to any aesthetic and still fail if this layer
  is wrong; check it independently of which style is being critiqued.
- A style guide is a subset of a design system (NN/g's distinction). The
  most commonly under-documented section in practice is component
  interaction states (hover/focus/disabled/error), not color or type;
  check for it specifically when reviewing a style guide.

## Concrete layout patterns

- Catalogue layout choices by column count and use case (pricing tiers,
  onboarding, directories, dashboards) rather than treating layout as one
  undifferentiated decision. Bento grids and nested 12-column grids serve
  different use cases than step-by-step numbered flows or before/after
  comparisons.
- Two operational, code-relevant rules: collapse 3+ column layouts to
  swipeable horizontal scroll on mobile rather than forcing vertical
  scroll, and use solid-fill CTAs over ghost/outline buttons by default.
