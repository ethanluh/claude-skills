---
name: code-review
description: >-
  Code review a pull request using a two-tier agent fleet (cheap holistic
  scan + narrow specialized scan) followed by an adversarial/counter-
  adversarial debate per issue before scoring. Use whenever Ethan says
  "/code-review", "code review this PR", "review PR #N", or the `pr` skill's
  non-skippable review gate calls for it. For reviewing a PR as a plain
  human-style read (not this fleet pipeline), that's a different, simpler
  "review" flow — this skill is specifically the fleet + debate pipeline.
---

# code-review — tiered fleet + adversarial debate

Provide a code review for the given pull request.

Follow these steps precisely:

1. Use a Haiku agent to check if the pull request (a) is closed, (b) is a
   draft, (c) does not need a code review (eg. because it is an automated
   pull request, or is very simple and obviously ok), or (d) already has a
   code review from you from earlier. If so, do not proceed.
2. Use another Haiku agent to give you a list of file paths to (but not the
   contents of) any relevant CLAUDE.md files from the codebase: the root
   CLAUDE.md file (if one exists), as well as any CLAUDE.md files in the
   directories whose files the pull request modified.
3. Use a Haiku agent to view the pull request, and ask the agent to return a
   summary of the change.
4. Launch a weak, holistic fleet: 3 parallel Haiku (or low-effort Sonnet)
   agents. Each independently reads the full PR diff and does an
   unstructured, holistic pass with no narrow lens assigned — looking for
   anything that seems off (bugs, CLAUDE.md violations, security issues,
   style, missed context). The point is breadth at low cost, catching things
   a narrowly-scoped agent might not think to look for. Each returns its own
   list of issues and the reason each issue was flagged.
5. Launch a strong, specialized fleet: 5 parallel Sonnet agents to
   independently code review the change. The agents should do the
   following, then return a list of issues and the reason each issue was
   flagged (eg. CLAUDE.md adherence, bug, historical git context, etc.):
   a. Agent #1: Audit the changes to make sure they comply with the
      CLAUDE.md. Note that CLAUDE.md is guidance for Claude as it writes
      code, so not all instructions will be applicable during code review.
   b. Agent #2: Read the file changes in the pull request, then do a
      shallow scan for obvious bugs. Avoid reading extra context beyond the
      changes, focusing just on the changes themselves. Focus on large
      bugs, and avoid small issues and nitpicks. Ignore likely false
      positives.
   c. Agent #3: Read the git blame and history of the code modified, to
      identify any bugs in light of that historical context.
   d. Agent #4: Read previous pull requests that touched these files, and
      check for any comments on those pull requests that may also apply to
      the current pull request.
   e. Agent #5: Read code comments in the modified files, and make sure the
      changes in the pull request comply with any guidance in the
      comments.
6. Merge the issue lists from steps 4 and 5 into one list. Where the weak
   and strong fleets flagged the same underlying issue, merge into a single
   entry, keeping the more specific/detailed description.
7. If running interactively (a person is present to answer), ask whether
   this should be a "deep review" with multiple adversarial exchange
   rounds, or the default single round. If running non-interactively (e.g.
   an automated PR review with no one to ask), default silently to a
   single round.
8. For each issue found in #6, run an adversarial exchange:
   a. Skeptic: launch a Sonnet agent whose job is to argue the issue is a
      false positive, reusing the "examples of false positives" list
      below. The skeptic must give concrete reasoning, not just assert.
   b. Counter-adversarial (advocate): launch a second Sonnet agent, given
      the original issue *and* the skeptic's refutation, whose job is to
      argue the issue is real by directly rebutting the skeptic's specific
      points (not a generic restatement).
   c. If a deep review was requested in step 7, repeat a-b for 2 or more
      rounds (skeptic responds to the rebuttal, advocate responds again,
      etc.) before proceeding to the judge. Otherwise, one skeptic pass and
      one advocate rebuttal is enough.
9. For each issue, launch a Haiku agent as judge, giving it the PR, the
   issue description, the list of CLAUDE.md files (from step 2), and the
   full skeptic/advocate exchange from step 8. It returns a score to
   indicate its level of confidence for whether the issue is real or false
   positive, informed by both sides of the debate rather than an isolated
   read. To do that, the agent should score each issue on a scale from
   0-100, indicating its level of confidence. For issues that were flagged
   due to CLAUDE.md instructions, the agent should double check that the
   CLAUDE.md actually calls out that issue specifically. The scale is (give
   this rubric to the agent verbatim):
   a. 0: Not confident at all. This is a false positive that doesn't stand
      up to light scrutiny, or is a pre-existing issue.
   b. 25: Somewhat confident. This might be a real issue, but may also be a
      false positive. The agent wasn't able to verify that it's a real
      issue. If the issue is stylistic, it is one that was not explicitly
      called out in the relevant CLAUDE.md.
   c. 50: Moderately confident. The agent was able to verify this is a real
      issue, but it might be a nitpick or not happen very often in
      practice. Relative to the rest of the PR, it's not very important.
   d. 75: Highly confident. The agent double checked the issue, and
      verified that it is very likely it is a real issue that will be hit
      in practice. The existing approach in the PR is insufficient. The
      issue is very important and will directly impact the code's
      functionality, or it is an issue that is directly mentioned in the
      relevant CLAUDE.md.
   e. 100: Absolutely certain. The agent double checked the issue, and
      confirmed that it is definitely a real issue, that will happen
      frequently in practice. The evidence directly confirms this.
10. Filter out any issues with a score less than 75. (The rubric's discrete
    anchors mean a genuine "75 — highly confident" verdict must not be
    discarded just because it isn't "100 — absolutely certain"; 75 is meant
    to clear the bar, not sit just under it.) If there are no issues that
    meet this criteria, do not proceed.
11. Use a Haiku agent to repeat the eligibility check from #1, to make sure
    that the pull request is still eligible for code review.
12. Finally, use the `gh` bash command to comment back on the pull request
    with the result. When writing your comment, keep in mind to:
    a. Keep your output brief.
    b. No emojis, ever — not even the conventional bot-signature emoji some
       templates use. Plain text only.
    c. Link and cite relevant code, files, and URLs.

## Examples of false positives, for step 8 (the skeptic's refutation)

- Pre-existing issues.
- Something that looks like a bug but is not actually a bug.
- Pedantic nitpicks that a senior engineer wouldn't call out.
- Issues that a linter, typechecker, or compiler would catch (eg. missing or
  incorrect imports, type errors, broken tests, formatting issues, pedantic
  style issues like newlines). No need to run these build steps yourself —
  it is safe to assume that they will be run separately as part of CI.
- General code quality issues (eg. lack of test coverage, general security
  issues, poor documentation), unless explicitly required in CLAUDE.md.
- Issues that are called out in CLAUDE.md, but explicitly silenced in the
  code (eg. due to a lint ignore comment).
- Changes in functionality that are likely intentional or are directly
  related to the broader change.
- Real issues, but on lines that the user did not modify in their pull
  request.

## Notes

- Do not check build signal or attempt to build or typecheck the app. These
  will run separately, and are not relevant to your code review.
- Use `gh` to interact with GitHub (eg. to fetch a pull request, or to
  create inline comments), rather than web fetch.
- Make a todo list first.
- You must cite and link each bug (eg. if referring to a CLAUDE.md, you
  must link it).
- For your final comment, follow this format precisely (assuming for this
  example that you found 3 issues):

  ```
  ### Code review

  Found 3 issues:

  1. <brief description of bug> (CLAUDE.md says "<...>")

  <link to file and line with full sha1 + line range for context, note
  that you MUST provide the full sha and not use bash here, eg.
  https://github.com/anthropics/claude-code/blob/1d54823877c4de72b2316a64032a54afc404e619/README.md#L13-L17>

  2. <brief description of bug> (some/other/CLAUDE.md says "<...>")

  <link to file and line with full sha1 + line range for context>

  3. <brief description of bug> (bug due to <file and code snippet>)

  <link to file and line with full sha1 + line range for context>

  Generated with Claude Code — https://claude.ai/code
  ```

  Or, if you found no issues:

  ```
  ### Code review

  No issues found. Checked for bugs and CLAUDE.md compliance.

  Generated with Claude Code — https://claude.ai/code
  ```

- When linking to code, follow this format precisely, otherwise the
  Markdown preview won't render correctly:
  `https://github.com/anthropics/claude-cli-internal/blob/c21d3c10bc8e898b7ac1a2d745bdc9bc4e423afe/package.json#L10-L15`
  - Requires full git sha.
  - You must provide the full sha. Commands like
    `https://github.com/owner/repo/blob/$(git rev-parse HEAD)/foo/bar` will
    not work, since your comment will be directly rendered in Markdown.
  - Repo name must match the repo you're code reviewing.
  - `#` sign after the file name.
  - Line range format is `L[start]-L[end]`.
  - Provide at least 1 line of context before and after, centered on the
    line you are commenting about (eg. if you are commenting about lines
    5-6, you should link to `L4-7`).
