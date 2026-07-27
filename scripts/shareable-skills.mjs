// BigBrain organizes skills under .claude/skills/<category>/<id>/. Shared
// between sync-skills.mjs (needs the source path) and build-manifest.mjs
// (needs the category for the manifest) without either depending on the
// other's script body.
export const SHAREABLE_SKILLS = [
  { id: "pr", category: "git" },
  { id: "address-pr-comments", category: "git" },
  { id: "resolve-pr-conflicts", category: "git" },
  { id: "main-worktree-reconcile", category: "git" },
  { id: "worktree-cleanup", category: "git" },
  { id: "code-review", category: "git" },
  { id: "conciseness-review", category: "quality" },
  { id: "debug-recovery", category: "quality" },
  { id: "adversarial-fleet", category: "orchestration" },
  { id: "counsel", category: "orchestration" },
  { id: "delegate-and-coordinate", category: "orchestration" },
  { id: "agentic-coding", category: "orchestration" },
  { id: "explanation-craft", category: "writing" },
  { id: "visual-explainer", category: "frontend" },
  { id: "system-and-frontend-architecture", category: "frontend" },
  { id: "ui-ux-design", category: "frontend" },
  { id: "product-psychology", category: "frontend" },
  { id: "ui-work-artifact-first", category: "frontend" },
];

export const CATEGORY_ORDER = [...new Set(SHAREABLE_SKILLS.map((s) => s.category))].sort();
