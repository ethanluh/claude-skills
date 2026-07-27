---
name: main-worktree-reconcile
description: >-
  Clear uncommitted changes out of a repo's primary worktree by routing each
  file to the linked worktree/PR it belongs to, asking before any discard. Use
  whenever Ethan says "clean up main worktree", "main worktree has uncommitted
  changes", "reconcile the main worktree", "move these changes to the right
  worktree", or "what's this junk in main". Complements worktree-cleanup
  (which prunes merged linked worktrees and never touches the primary): this
  skill is the one place primary-worktree changes are handled — it moves work
  OUT of the primary and never commits there.
---

# main-worktree-reconcile

This skill reads the primary worktree and moves work out of it. It never
commits in the primary worktree and never bulk-discards.

## 1. Assess

Primary worktree = first entry of `git worktree list --porcelain`.
`git -C <main> status --porcelain`. Empty → report "main worktree
clean" and stop.

## 2. Classify each dirty path

Build the candidate destinations: every linked worktree's branch, plus
open PR branches (`gh pr list --state open --json number,headRefName`).
For each branch: `git diff origin/<default>...<branch> --name-only`
(default branch from `gh repo view --json defaultBranchRef -q
.defaultBranchRef.name`).

A dirty file matches a branch when that branch already touches the same
file, or a sibling in the same directory. Exactly one match →
destination found. Zero or multiple matches → the "ask" bucket (step 5).

## 3. Move matched changes — land first, clean second

Tracked modifications, per destination branch:

```bash
git -C <main> diff -- <paths> > <scratchpad>/reconcile-<branch>.patch
git -C <worktree> apply --3way <scratchpad>/reconcile-<branch>.patch
```

The apply must succeed AND `git -C <worktree> diff` must show the hunks
before you touch anything in main. Apply fails → that file goes to the
ask bucket; do not force it.

Untracked files: `mv` into the same relative path in the worktree, then
confirm it exists there.

## 4. Clean main — only what verifiably landed

`git -C <main> checkout -- <path>` per file, only for tracked files
whose patch landed in step 3. Never `git checkout .`, `git clean`, or
`git reset --hard` — no wholesale operations in this skill, ever.

## 5. Ask bucket — one decision per file

For each unmatched/failed file, show a short diff summary and offer:
(a) new worktree + branch + draft PR via the `pr` skill,
(b) move into a named existing worktree,
(c) discard.
Discard requires explicit per-file confirmation from Ethan in this
conversation — "otherwise discard" in the original request is NOT
pre-approval. No answer → the file stays put and is listed as pending.

## 6. Final check

`git -C <main> status --porcelain` — empty, or only the pending
ask-bucket files.

## Output

A table: file → destination (worktree/branch, `discarded (approved)`,
or `pending — awaiting decision`), then the main worktree's final
status. Never report done while a discard is unconfirmed.
