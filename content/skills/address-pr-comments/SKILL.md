---
name: address-pr-comments
description: >-
  Fetch the unresolved review comments on a PR, fix or answer each one per
  explicit rules, push, and reply/resolve the threads. Use whenever Ethan says
  "read pr comments on #N and address them", "address review comments",
  "respond to the feedback on pr N", "new comment left", or "fix what the
  reviewer said". Only resolves threads that got a pushed fix; questions get
  replies and stay open for the reviewer.
---

# address-pr-comments

Input: a PR number (required — if absent, `gh pr list --head` for the
current branch; still ambiguous → ask).

## 1. Fetch every open thread

Unresolved review threads (fill in owner/repo from
`gh repo view --json owner,name`):

```bash
gh api graphql -f query='
  query { repository(owner: "<owner>", name: "<repo>") {
    pullRequest(number: <N>) {
      reviewThreads(first: 100) { nodes {
        id isResolved path line
        comments(first: 20) { nodes { author { login } body url } }
      } }
    } } }'
```

Keep only `isResolved: false`. Also fetch top-level conversation:
`gh pr view <N> --json reviews,comments` — include review bodies and
issue comments that ask for something and haven't been answered.

Zero open items → report that and stop.

## 2. Enter the branch's worktree — never the primary

`git fetch origin`; get the branch from `gh pr view <N> --json
headRefName`. If `git worktree list --porcelain` has a worktree on that
branch, work there (`git pull --ff-only` first; dirty tree → stop and
report). Otherwise `git worktree add ../<repo>-<headRefName>
<headRefName>`.

## 3. Act on each thread — first rule that fits

a. **Concrete requested change** ("rename X", "handle null here",
   "extract this") → apply it.
b. **Question** → reply with the answer; no code change.
c. **Reviewer misread / the code already handles it** → reply pointing
   at the exact line; no code change.
d. **Disagreement or architectural ask** → draft the reply, show Ethan,
   wait for his answer before posting anything.

Never resolve a thread without either a pushed code change or a posted
reply.

## 4. Review, commit, push

`/code-review` on the resulting diff (fix or defer findings). Commit:
one `fix: address review comments on #<N>` commit, or per-topic commits
if the fixes span more than 3 unrelated concerns. `git push` — plain
push; addressing comments never rewrites history, so no force flags.

## 5. Reply and resolve

Per thread, one-sentence reply + the commit hash for fixes:

```bash
gh api graphql -f query='mutation {
  addPullRequestReviewThreadReply(input: {
    pullRequestReviewThreadId: "<threadId>", body: "<reply>"
  }) { comment { url } } }'
```

Resolve ONLY threads whose fix was pushed:

```bash
gh api graphql -f query='mutation {
  resolveReviewThread(input: { threadId: "<threadId>" })
  { thread { isResolved } } }'
```

Questions (rule b) and pointers (rule c) get replies but stay unresolved
— the reviewer closes them.

## Output

A table: `path:line` → action (`fixed <hash>` | `replied` | `escalated
to Ethan`), plus the push result. Escalated threads (rule d) listed with
the drafted replies awaiting his call.
