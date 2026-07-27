#!/usr/bin/env node
// Copies the allowlisted skill directories from a BigBrain checkout into
// content/skills/. Run manually whenever a skill's content changes --- CI
// can't reach the private BigBrain repo.

import { existsSync, rmSync, cpSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DEST = join(REPO_ROOT, "content", "skills");

const SHAREABLE_SKILLS = [
  "pr",
  "address-pr-comments",
  "resolve-pr-conflicts",
  "main-worktree-reconcile",
  "worktree-cleanup",
  "code-review",
  "conciseness-review",
  "debug-recovery",
  "adversarial-fleet",
  "counsel",
  "delegate-and-coordinate",
  "agentic-coding",
  "explanation-craft",
  "visual-explainer",
  "system-and-frontend-architecture",
  "ui-ux-design",
  "product-psychology",
  "ui-work-artifact-first",
];

const source = process.argv[2] ?? join(homedir(), "Obsidian", "BigBrain", ".claude", "skills");

if (!existsSync(source)) {
  console.error(`Source not found: ${source}`);
  console.error("Usage: node scripts/sync-skills.mjs [path-to-BigBrain/.claude/skills]");
  process.exit(1);
}

const missing = SHAREABLE_SKILLS.filter((id) => !existsSync(join(source, id)));
if (missing.length) {
  console.error(`Missing at source: ${missing.join(", ")}`);
  process.exit(1);
}

rmSync(DEST, { recursive: true, force: true });
mkdirSync(DEST, { recursive: true });

for (const id of SHAREABLE_SKILLS) {
  cpSync(join(source, id), join(DEST, id), { recursive: true });
}

console.log(`Synced ${SHAREABLE_SKILLS.length} skills from ${source} into content/skills/`);
