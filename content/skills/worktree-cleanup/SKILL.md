---
name: worktree-cleanup
description: >-
  Clean up git worktrees in the current repo — remove linked worktrees whose
  branch is done and delete the merged branches. Use this skill whenever Ethan
  asks to "clean up worktrees", "remove merged/stale worktrees", "prune
  worktrees", "delete stale branches", "tidy up git worktrees", "get rid of old
  worktrees", or anything that sounds like post-merge worktree housekeeping. It
  auto-removes worktrees whose branch is merged into the default branch OR whose
  upstream is [gone] (squash-merged) AND whose working tree is clean; it never
  touches the primary worktree, the current worktree, the default branch, or
  anything dirty/locked/detached, and it surfaces those for a manual decision.
---

# Worktree cleanup

Automates the post-merge worktree chore from Ethan's worktree-first workflow
(`git worktree add ../<repo>-<branch> -b <branch>` → after merge →
`git worktree remove` + `git branch -d`). Scope is the **current repo only**.

## How to run

From inside the target repo, run the bundled script in apply mode (auto-remove is
the chosen behavior):

```bash
bash "$CLAUDE_PLUGIN_ROOT/scripts/cleanup-worktrees.sh" --apply
```

If `$CLAUDE_PLUGIN_ROOT` isn't set, use the absolute path
`~/.claude/skills/worktree-cleanup/scripts/cleanup-worktrees.sh`.

- Omit `--apply` for a **dry-run** that only prints what it would remove — use this
  first if the user seems cautious or wants a preview.
- Add `--no-fetch` to skip the `git fetch --prune` step (offline, or to avoid the
  network round-trip). Note that `[gone]` detection of squash-merged branches is
  only accurate after a prune, so without a fetch some stale worktrees may be left.

## What it does

A worktree is **auto-removed** only when ALL hold: it's a linked (non-primary)
worktree, not the one you're standing in, its working tree is clean, and its branch
is either merged into the default branch or has a `[gone]` upstream. Removal is
`git worktree remove` (no force) followed by `git branch -d` (or `-D` for gone-only
branches, which look unmerged locally after a squash). It finishes with
`git worktree prune` to clear admin records for worktree dirs deleted by hand.

Everything else is **left in place and reported**: dirty worktrees, unmerged
branches whose upstream isn't gone, locked/detached/bare worktrees, the default
branch, the primary worktree, and the current one.

## After running

Relay the script's report to the user:
- **Removed** — what was cleaned up.
- **Skipped** — each entry with its reason. These are deliberate safety holds; offer
  the manual follow-up where it makes sense, e.g. `git worktree remove --force <path>`
  for a dirty worktree they're done with, or `git branch -D <branch>` for an unmerged
  branch they want gone.

Don't force-remove or `-D` anything beyond what the script did without the user
asking — the skipped list exists so those stay manual decisions.
