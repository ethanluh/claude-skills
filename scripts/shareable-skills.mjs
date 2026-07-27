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
  { id: "pr-screenshot", category: "git" },
  { id: "conciseness-review", category: "quality" },
  { id: "debug-recovery", category: "quality" },
  { id: "code-review-feedback", category: "quality" },
  { id: "code-review-technique", category: "quality" },
  { id: "performance-profiling", category: "quality" },
  { id: "performance-regression-debugging", category: "quality" },
  { id: "root-cause-debugging", category: "quality" },
  { id: "static-analysis-linting", category: "quality" },
  { id: "adversarial-fleet", category: "orchestration" },
  { id: "counsel", category: "orchestration" },
  { id: "delegate-and-coordinate", category: "orchestration" },
  { id: "agentic-coding", category: "orchestration" },
  { id: "explanation-craft", category: "writing" },
  { id: "concise-technical-prose", category: "writing" },
  { id: "documentation-structure", category: "writing" },
  { id: "notes-to-polished-draft", category: "writing" },
  { id: "reader-value-framing", category: "writing" },
  { id: "tone-voice-consistency", category: "writing" },
  { id: "visual-explainer", category: "frontend" },
  { id: "system-and-frontend-architecture", category: "frontend" },
  { id: "ui-ux-design", category: "frontend" },
  { id: "product-psychology", category: "frontend" },
  { id: "ui-work-artifact-first", category: "frontend" },
  { id: "accessibility-auditing", category: "frontend" },
  { id: "component-from-design-mock", category: "frontend" },
  { id: "css-layout-techniques", category: "frontend" },
  { id: "design-tokens", category: "frontend" },
  { id: "api-from-spec", category: "backend" },
  { id: "auth-patterns", category: "backend" },
  { id: "caching-strategies", category: "backend" },
  { id: "database-schema-design", category: "backend" },
  { id: "graphql-api-design", category: "backend" },
  { id: "rest-api-design", category: "backend" },
  { id: "ci-setup-workflow", category: "devops" },
  { id: "cicd-pipeline-basics", category: "devops" },
  { id: "containerization-fundamentals", category: "devops" },
  { id: "deploy-side-project-workflow", category: "devops" },
  { id: "environment-config-management", category: "devops" },
  { id: "launch-post-writing", category: "marketing" },
  { id: "portfolio-case-study-writing", category: "marketing" },
  { id: "positioning-gtm-for-side-projects", category: "marketing" },
  { id: "readme-writing", category: "marketing" },
  { id: "side-project-launch-workflow", category: "marketing" },
  // research (data-analysis/ and paper-writing/ are groups of skills in
  // BigBrain, not single skills — each leaf is shared individually)
  { id: "dataset-to-conclusion", category: "research", group: "data-analysis" },
  { id: "experiment-design", category: "research", group: "data-analysis" },
  { id: "exploratory-data-analysis", category: "research", group: "data-analysis" },
  { id: "hypothesis-testing", category: "research", group: "data-analysis" },
  { id: "statistical-pitfalls", category: "research", group: "data-analysis" },
  { id: "latex-conventions", category: "research", group: "paper-writing" },
  { id: "paper-structuring", category: "research", group: "paper-writing" },
  { id: "peer-review-response", category: "research", group: "paper-writing" },
  { id: "related-work-section-writing", category: "research", group: "paper-writing" },
  { id: "submittable-draft-workflow", category: "research", group: "paper-writing" },
  { id: "flaky-test-triage", category: "testing" },
  { id: "property-based-testing", category: "testing" },
  { id: "test-coverage-for-legacy-code", category: "testing" },
  { id: "unit-test-design", category: "testing" },
  { id: "context-switching-audit", category: "time-management" },
  { id: "daily-time-blocking", category: "time-management" },
  { id: "pomodoro-focus-sessions", category: "time-management" },
  { id: "priority-triage", category: "time-management" },
  { id: "weekly-planning-workflow", category: "time-management" },
];

export const CATEGORY_ORDER = [...new Set(SHAREABLE_SKILLS.map((s) => s.category))].sort();

const WORD_OVERRIDES = {
  ci: "CI",
  cicd: "CI/CD",
  api: "API",
  rest: "REST",
  css: "CSS",
  graphql: "GraphQL",
  gtm: "GTM",
  readme: "README",
  latex: "LaTeX",
};

export function humanizeId(id) {
  return id
    .split("-")
    .map((word) => WORD_OVERRIDES[word] ?? word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
