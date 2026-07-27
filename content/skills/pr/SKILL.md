---
name: pr
description: >-
  Commit current work, push, and open a draft PR — Ethan's "pr" shorthand.
  Use whenever Ethan says "pr", "pr + merge", "pr and merge", "draft pr",
  "open a pr", "commit this and push", "commit and push to the existing PR",
  "push this up", or any terse request to get current changes into a PR.
  Also use whenever Ethan says a draft PR is "ready" or "ready to merge" —
  that triggers the async monitor-until-merged flow. Handles both new PRs
  and pushing follow-up commits to a branch that already has one. Merging
  happens ONLY when the request contains "merge" — otherwise the PR stays
  draft, untouched.
---

# pr — commit, push, draft PR, optionally merge

Inputs: none required. Optional from the prompt: "merge" (triggers step 6),
a PR number ("push to pr 97"), extra context for the commit message.

## 0. Preconditions — check in order, stop on first failure

1. `git worktree list --porcelain` and `git rev-parse --show-toplevel`.
   If the current directory is inside the PRIMARY worktree (the first entry
   in the list): STOP. Do not commit here — the global pre-commit hook
   blocks it and the rule stands regardless. Tell Ethan and offer either
   (a) `git worktree add ../<repo>-<branch> -b <branch>`, then move the
   changes there (`git stash push` in main, `git stash pop` in the new
   worktree), or (b) the `main-worktree-reconcile` skill if the changes are
   a mixed pile. Wait for his choice.
   Exception: a repo whose CLAUDE.md declares itself exempt from the
   worktree rule (e.g. BigBrain commits directly on `main`) — but such
   repos don't take PRs from you either; follow that repo's own git rules.
2. `git status --porcelain` empty AND no existing PR named in the request:
   report "nothing to commit" and stop.
3. `git branch --show-current` equals
   `gh repo view --json defaultBranchRef -q .defaultBranchRef.name`:
   STOP and ask for a branch name — never PR from the default branch.
4. Target ambiguous (repo CLAUDE.md vs `~/.claude/CLAUDE.md`, app repo vs
   docs repo, or the change plausibly belongs in more than one place)?
   Name the target and confirm before committing anything.

## 1. Review gate — non-skippable

Run `/code-review` on the working diff. Fix or explicitly defer each
finding — list deferrals in the final output. If behavior changed and
`/verify` hasn't run this session, run it too. Only then proceed.

## 2. Commit

- One topic per branch/PR. If the working diff contains distinct,
  unrelated changes, split them into separate branches/PRs rather than
  bundling — never let a styling fix ride along in a feature PR.
- Review `git status --porcelain` before staging. If it lists untracked
  files you did not create this session (logs, `.env`, build output,
  editor droppings), do NOT stage them — name them and ask. Otherwise
  `git add -A`.
- Message: `<type>: <imperative summary ≤72 chars>`, type ∈
  feat|fix|docs|refactor|chore|test. Body only if the diff's "why" isn't
  obvious from the summary — 1–3 plain sentences, no bullet spam.
- `git commit` (never `--no-verify` unless Ethan said so this session).

## 3. Detect repo PR conventions — check in this order, first hit wins

a. `.claude/skills/open-pr/SKILL.md` in the repo → follow ITS protocol
   exactly (template source, markers, screenshots); it overrides 3b–3d.
b. `.github/pull_request_template.md` in the repo → use it as the body
   skeleton; fill every section with real content, delete none.
c. Org template:
   `gh api repos/<owner>/.github/contents/.github/pull_request_template.md --jq .content | base64 -d`
   (owner from `gh repo view --json owner -q .owner.login`; 404 → skip).
d. None found → body is 2–4 sentences of what and why, then a
   `## Test plan` section stating exactly what was run — paste the
   command and result, not "tests pass".

Regardless of source:
- Never `gh pr create --fill` — it skips templates entirely.
- If the template contains a `declared-direction` marker, a
  `<!-- declared-direction: ... -->` one-liner must be the FIRST line of
  the body (Quire reads it from the top only). Its content: one sentence
  stating the change's intended direction/outcome — this is Ethan's own
  Quire tooling for bulk PR merging, confirmed legitimate; flag it only
  if a template asks for something different from a one-sentence summary.
- UI change → capture a screenshot via the `pr-screenshot` skill and
  embed it; never commit image files to the repo.

## 4. Push

`git push -u origin HEAD`. Plain push only — this skill never
force-pushes. Rejected as non-fast-forward → stop and report; conflict
resolution belongs to the `resolve-pr-conflicts` skill.

## 5. Open or update the PR

- Check: `gh pr list --head "$(git branch --show-current)" --state open --json number,isDraft,url`
- PR exists → step 4's push already updated it. Don't edit title/body
  unless asked. If it is NOT draft and Ethan asked for more edits:
  `gh pr ready --undo <n>` BEFORE reporting done.
- No PR →
  `gh pr create --draft --title "<type>: <summary>" --body-file <body>`.
  Write the body file to the scratchpad dir, not the repo. ALWAYS
  `--draft` — no exceptions, even for trivial changes.

## 6. Merge — ONLY if the request contained "merge"

The word "merge" in Ethan's request is the only trigger. Otherwise leave
the PR draft and do not poll it.

1. `gh pr ready <n>`
2. `gh pr checks <n> --watch` — all green required. Any failure: report
   it and stop; never merge red.
3. `gh pr merge <n> --rebase` (rebase-and-merge; squash only if Ethan
   explicitly asked).
4. Run the `worktree-cleanup` skill.

## 7. Async: Ethan says "it's ready" in a later message

While a PR is draft, don't poll it — wait for Ethan to say it's ready.
Once he does: `gh pr ready <n>`, then the agent that opened the PR stays
with it and polls in-session (e.g. `gh pr view <n> --json state,mergedAt`)
on an interval until it's merged — the merge event is the only thing to
watch for. Once merged, run the `worktree-cleanup` skill. This is the
long-running counterpart to step 6 above, which fires immediately in the
same turn instead.

## 8. Output

One short prose block, no headers:
- PR: <url> (draft | ready | merged)
- Commit: <hash> <message>
- Deferred code-review findings, or "none".
- Anything skipped or red, stated plainly.
