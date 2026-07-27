---
name: resolve-pr-conflicts
description: >-
  Rebase a conflicted PR branch onto its base and resolve the merge conflicts
  using explicit per-conflict rules, in a linked worktree, pushing with
  --force-with-lease. Use whenever Ethan says "resolve conflicts in pr 97",
  "fix conflicts on #N", "pr N has conflicts", "rebase pr N", or "resolve
  conflicts in all open PRs". Never operates in the primary worktree and
  escalates conflicts where both sides rewrote the same logic instead of
  guessing.
---

# resolve-pr-conflicts

Input: one or more PR numbers, or "all" → `gh pr list --state open --json
number,mergeable` and take every PR whose `mergeable` is `CONFLICTING`.
Process PRs one at a time; report per PR.

## Per-PR procedure

### 1. Confirm it actually conflicts

`gh pr view <N> --json headRefName,baseRefName,mergeable`.
`MERGEABLE` → report "no conflicts" and skip. `UNKNOWN` → wait 10s and
retry once (GitHub computes it lazily), then proceed by state.

### 2. Acquire a worktree — never the primary

`git fetch origin`. Then:
- `git worktree list --porcelain` already has a worktree on
  `headRefName` → work there; `git pull --ff-only` first (dirty tree or
  non-ff pull → stop and report; don't stash over someone's work).
- Otherwise `git worktree add ../<repo>-<headRefName> <headRefName>` and
  work there.
Never rebase in the primary worktree, even "just this once".

### 3. Rebase

`git rebase origin/<baseRefName>`.

### 4. Resolve each conflict — apply the first rule that fits

Orientation first: during a rebase, sides are INVERTED vs a merge —
`--ours` is the BASE branch, `--theirs` is the PR branch's commit being
replayed. Getting this backwards silently keeps the wrong version;
confirm with `git log --oneline ORIG_HEAD -1` if unsure.

a. **One side deleted, the other modified** → keep the modification.
   First check `git log --follow --oneline -- <path>` on the base for a
   rename; if renamed, apply the modification at the new path and let the
   deletion stand.
b. **Hunks touch different functions/blocks** → keep both sides.
c. **Same lines changed** → keep the PR branch's intent, rewritten to
   use the base's renames/signature changes (grep the base side for the
   new names before writing). Rule a vs c tiebreak: a `git log --follow`
   confirmed rename → rule a; otherwise c. (The resolutions converge —
   the letter only matters for reporting.)
d. **Lockfiles / generated files** (`package-lock.json`, `*.lock`,
   generated code) → never hand-merge; take the base version
   (`git checkout --ours <path>` during a rebase — see orientation
   above), then regenerate (`npm install`, the repo's codegen command, …).
e. **Both sides rewrote the same function with different logic** → do
   NOT guess and do NOT `git rebase --abort`. Resolve what rules a–d
   cover, then stop, show both versions side by side, and ask Ethan.

After resolving each conflicted commit: run the repo's build/typecheck
(whatever `package.json` scripts / Makefile define); it must pass before
`git rebase --continue`.

### 5. Verify and push

- Conflict resolution touched behavior (not just imports/formatting) →
  run `/verify`.
- `git push --force-with-lease` — never bare `--force`. If rejected,
  someone pushed meanwhile: `git fetch` and redo from step 3; never
  override.

### 6. Confirm

`gh pr view <N> --json mergeable` returns `MERGEABLE` (retry once after
10s if `UNKNOWN`).

## Output

Per PR: number, files resolved with the rule letter used (a–e), push
result, final mergeable status. PRs stopped for a human decision (rule e)
listed separately with the two versions shown. Do not mark the task done
while any PR sits in that bucket without Ethan's answer.
