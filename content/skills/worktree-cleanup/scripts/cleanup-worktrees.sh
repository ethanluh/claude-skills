#!/usr/bin/env bash
#
# cleanup-worktrees.sh — tidy up linked git worktrees in the CURRENT repo.
#
# Removes linked worktrees whose branch is done (merged into the default branch,
# or whose upstream is [gone] — i.e. squash-merged) AND whose working tree is clean.
# Never touches the primary worktree, the worktree you're standing in, the default
# branch, or anything dirty/locked/detached.
#
# Usage:
#   cleanup-worktrees.sh            # dry-run: show what WOULD be removed
#   cleanup-worktrees.sh --apply    # actually remove safe worktrees + branches
#   cleanup-worktrees.sh --no-fetch # skip `git fetch --prune` (offline / faster)
#
set -euo pipefail

APPLY=0
FETCH=1
for arg in "$@"; do
  case "$arg" in
    --apply)    APPLY=1 ;;
    --no-fetch) FETCH=0 ;;
    -h|--help)
      sed -n '3,17p' "$0" | sed 's/^# \{0,1\}//'
      exit 0 ;;
    *)
      echo "unknown argument: $arg" >&2
      exit 2 ;;
  esac
done

# 1. Must be inside a git repo.
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "error: not inside a git repository" >&2
  exit 1
fi

# Resolve the default branch.
default="$(git symbolic-ref --quiet refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@' || true)"
if [ -z "$default" ]; then
  if   git show-ref --verify --quiet refs/heads/main;   then default=main
  elif git show-ref --verify --quiet refs/heads/master; then default=master
  fi
fi
if [ -z "$default" ]; then
  echo "error: could not determine default branch (no origin/HEAD, no main/master)" >&2
  exit 1
fi

# 2. Refresh remote-tracking so [gone] detection is accurate.
if [ "$FETCH" -eq 1 ]; then
  echo "Fetching (git fetch --prune)…"
  git fetch --prune --quiet || echo "warning: fetch failed; [gone] detection may be stale" >&2
fi

# 3. Worktrees we must never remove.
current="$(git rev-parse --show-toplevel)"

mode_label="DRY-RUN (no changes made; pass --apply to remove)"
[ "$APPLY" -eq 1 ] && mode_label="APPLY"
echo "Default branch: $default"
echo "Mode: $mode_label"
echo

removed=()
skipped=()

# 4. Parse `git worktree list --porcelain` into per-worktree records.
wt_path=""; wt_branch=""; wt_detached=0; wt_bare=0; wt_locked=0; primary_seen=0
is_primary=1   # the first worktree block is always the primary

process_worktree() {
  [ -z "$wt_path" ] && return

  # Decide whether to skip / remove, recording a reason.
  local reason=""

  if [ "$is_primary" -eq 1 ]; then
    is_primary=0; return    # primary worktree: silently leave it
  fi
  if [ "$wt_path" = "$current" ]; then reason="current worktree";        skipped+=("$wt_path :: $reason"); return; fi
  if [ "$wt_bare" -eq 1 ];        then reason="bare";                    skipped+=("$wt_path :: $reason"); return; fi
  if [ "$wt_locked" -eq 1 ];      then reason="locked";                  skipped+=("$wt_path :: $reason"); return; fi
  if [ "$wt_detached" -eq 1 ];    then reason="detached HEAD";           skipped+=("$wt_path :: $reason"); return; fi
  if [ "$wt_branch" = "$default" ];then reason="on default branch";      skipped+=("$wt_path :: $reason"); return; fi

  # Dirty check.
  if [ -n "$(git -C "$wt_path" status --porcelain 2>/dev/null)" ]; then
    skipped+=("$wt_path ($wt_branch) :: uncommitted changes"); return
  fi

  # Done check: merged into default, or upstream gone.
  local merged=0 gone=0
  git merge-base --is-ancestor "refs/heads/$wt_branch" "$default" 2>/dev/null && merged=1
  [ "$(git for-each-ref --format='%(upstream:track)' "refs/heads/$wt_branch" 2>/dev/null)" = "[gone]" ] && gone=1

  if [ "$merged" -eq 0 ] && [ "$gone" -eq 0 ]; then
    skipped+=("$wt_path ($wt_branch) :: not merged and upstream not gone"); return
  fi

  # Safe to remove.
  local why; why=$([ "$merged" -eq 1 ] && echo "merged" || echo "upstream gone")
  if [ "$APPLY" -eq 0 ]; then
    removed+=("$wt_path ($wt_branch) :: would remove [$why]"); return
  fi

  if ! git worktree remove "$wt_path" 2>/dev/null; then
    skipped+=("$wt_path ($wt_branch) :: worktree remove failed (run with --force manually?)"); return
  fi
  # Branch delete: -d when merged, -D for gone-only (looks unmerged locally after squash).
  if [ "$merged" -eq 1 ]; then
    git branch -d "$wt_branch" 2>/dev/null || git branch -D "$wt_branch" 2>/dev/null || true
  else
    git branch -D "$wt_branch" 2>/dev/null || true
  fi
  removed+=("$wt_path ($wt_branch) :: removed [$why]")
}

while IFS= read -r line; do
  case "$line" in
    "worktree "*)
      process_worktree
      wt_path="${line#worktree }"; wt_branch=""; wt_detached=0; wt_bare=0; wt_locked=0 ;;
    "branch "*)   wt_branch="${line#branch refs/heads/}" ;;
    "detached")   wt_detached=1 ;;
    "bare")       wt_bare=1 ;;
    "locked"*)    wt_locked=1 ;;
  esac
done < <(git worktree list --porcelain)
process_worktree   # flush the last record

# 7. Prune stale admin entries for dirs deleted outside git.
pruned_note=""
if [ "$APPLY" -eq 1 ]; then
  prune_out="$(git worktree prune --verbose 2>&1 || true)"
  [ -n "$prune_out" ] && pruned_note="$prune_out"
else
  prune_out="$(git worktree prune --dry-run --verbose 2>&1 || true)"
  [ -n "$prune_out" ] && pruned_note="(dry-run) $prune_out"
fi

# 8. Report.
echo "=== Removed (${#removed[@]}) ==="
if [ "${#removed[@]}" -eq 0 ]; then echo "  (none)"; else printf '  %s\n' "${removed[@]}"; fi
echo
echo "=== Skipped (${#skipped[@]}) ==="
if [ "${#skipped[@]}" -eq 0 ]; then echo "  (none)"; else printf '  %s\n' "${skipped[@]}"; fi
if [ -n "$pruned_note" ]; then
  echo
  echo "=== Pruned admin entries ==="
  echo "  $pruned_note"
fi
