---
name: accessibility-auditing
description: >-
  Run an accessibility (a11y) audit against WCAG: Easy Checks first pass,
  automated scan (aXe/Lighthouse/WAVE), manual screen-reader testing
  (VoiceOver/NVDA), WCAG-EM-style conformance write-up. Use whenever Ethan
  asks for an accessibility audit, "a11y review", "check WCAG compliance",
  "run aXe/Lighthouse on this", or wants a screen-reader pass on a page or
  component. Also covers a "wired into CI" configuration mode — run the
  automated scan as a CI gate (aXe integrates into Grunt/Gulp/Selenium/npm)
  rather than a one-off, while manual assistive-tech testing stays a
  periodic/pre-release step, not something CI can do. Use this mode whenever
  Ethan asks to "wire accessibility into CI", "add an a11y gate", or "make
  aXe run on every PR".
---

# Accessibility (a11y) Auditing

## Why this order

No automated tool alone can determine whether a site is accessible —
"knowledgeable human evaluation is required" (W3C WAI). Automated scanners
are necessary but explicitly insufficient. Stopping after the automated
scan is the single most common shortcut both source docs warn against.
Evaluate early and throughout development, not as a pre-launch gate —
accessibility problems are cheaper to fix the earlier they're caught.

## Manual audit checklist (default mode)

1. **Easy Checks first pass** — lightweight manual pass before tooling:
   page title, heading structure, keyboard-only navigation, image alt text,
   visible focus indicators, zoom/resize behavior. Catches the obvious
   before spending tool budget.
2. **Automated scan** — run aXe, Lighthouse, or WAVE. Also do a source-order
   check: disable CSS in the browser and confirm the page still reads
   sensibly top-to-bottom, since screen readers follow HTML document order,
   not visual layout. Run a contrast checker here too.
3. **Manual assistive-technology testing** — at minimum one pass with a
   real screen reader:
   - VoiceOver (macOS): Cmd+F5 to activate, VO+U for the rotor.
   - NVDA (Windows, free): NVDA+Q to quit, H / Shift+H to navigate headings.
   Check that the accessibility tree (role, name, state — e.g. dialog
   open/closed) exposes what sighted users get visually; semantic HTML and
   ARIA states matter even when nothing changes on screen. Where feasible,
   involve an actual disabled user rather than only self-testing.
4. **WCAG-EM-style conformance write-up** — record findings in a
   standardized report (per WCAG-EM), not just fixed ad hoc. An audit isn't
   done until it's written up in a comparable format: what was checked,
   what failed, against which WCAG success criterion, and severity.

Do not stop at step 2. Automated tools + manual testing + user testing is
the comprehensive combination; each layer catches what the others miss.

## CI-wired mode

Use when the automated-scan stage should run continuously instead of as a
one-off:

- Wire aXe (the most CI-integrable of the automated tools) into the actual
  pipeline: task runners (Grunt/Gulp), test automation (Selenium/Cucumber),
  unit-test frameworks (Jasmine), or plain npm scripts. This operationalizes
  WAI's "evaluate early and throughout" principle as a concrete gate rather
  than a review-time reminder.
- The CI gate covers step 2 only (automated scan). Steps 1, 3, and 4 do not
  belong in CI — Easy Checks and manual AT testing need a human, and the
  conformance write-up is a periodic deliverable. Keep manual screen-reader
  testing as a scheduled or pre-release step (e.g. before each release, or
  on a cadence), not blocked on every commit.
- A failing CI scan blocks merge on concrete violations (missing alt text,
  contrast failures, missing form labels, etc.) — it does not certify WCAG
  conformance by itself. Conformance still requires the manual + user
  testing layers above; say so explicitly in any report so a green CI badge
  isn't mistaken for full accessibility sign-off.

## Sources

[[w3c-wai-evaluating-web-accessibility]] — WCAG-EM methodology, why human
evaluation is required, the staged Easy-Checks-to-full-evaluation path.
[[mdn-accessibility-tooling-and-assistive-technology]] — concrete tool
list, source-order/CSS-disabled technique, screen-reader commands, and the
aXe-in-CI integration detail.
