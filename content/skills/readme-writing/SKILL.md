---
name: readme-writing
description: >-
  Draft or review a project README against the what/why/how-to-start/where-
  to-get-help structure, front-loading the case for caring before
  installation steps. Use whenever Ethan asks to write, draft, review, or
  fix up a README for a repo or side project — including "does this README
  work", "write a README for this", "review my README", or prepping a repo
  before a Show HN / Product Hunt launch where the README is the de facto
  landing page.
---

# readme-writing — draft or review a project README

Grounded in GitHub's Open Source Guide, "Starting a Project": a README is a
persuasion and onboarding document, not a formality — for most repos it's
the only thing a stranger reads before deciding whether to use, contribute
to, or abandon it.

## The four questions, in order

A README must answer these, in this order, before anything else:

1. **What** does this project do?
2. **Why** is it useful?
3. **How** do I get started?
4. **Where** can I get more help?

Skipping straight to install instructions without "what/why" loses readers
who don't yet know why they're there — most people self-select out within
seconds if that framing is missing.

## Draft/review checklist

- [ ] **Above the fold, before any install block**: one paragraph of "why
      this exists" — the problem it solves, who it's for. Not a features
      list, not a badge row. If a reader has to scroll past a `pip install`
      or `npm install` block to find out why they should care, reorder it.
- [ ] **What/why is concrete**, not the abstract restated — say what the
      thing actually does for someone, in plain language.
- [ ] **Getting started is copy-pasteable** and assumes no insider context —
      write for a reader with a different background, native language, and
      familiarity level than the maintainer. No unexplained jargon.
- [ ] **Scope beyond "how to run it"**: does the README signal project
      goals, contribution policy, license, and maintenance/production-
      readiness status? A reader should be able to self-serve on "is this
      maintained" or "can I use this at work" without opening an issue.
- [ ] **Contribution details live in CONTRIBUTING.md**, linked from the
      README, not duplicated inline — keep the front door short, route
      engaged readers onward.
- [ ] **File placement**: root-level `README.md` only — GitHub auto-renders
      that file on the repo homepage, so anything not there is invisible to
      a first-time visitor.
- [ ] **Launch-post check** (Show HN, Product Hunt, X): the README is the
      landing page that traffic lands on. It must carry its own "why should
      I care" independent of whatever framing the launch post used —
      readers arriving cold from a link won't have that context.

## When reviewing an existing README

Read it in first-screen order only (what a GitHub visitor sees without
scrolling). If the first screen is a badge row, a table of contents, or an
install command with no framing, that's the finding — say so plainly and
point to where the "why" paragraph should go, rather than rewriting the
whole file unasked.

Source: [[opensource-guide-starting-a-project]]
