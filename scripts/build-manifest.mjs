#!/usr/bin/env node
// Regenerates content/skills.json from the skill directories under
// content/skills/. Run after scripts/sync-skills.mjs.

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { SHAREABLE_SKILLS } from "./shareable-skills.mjs";

const CATEGORIES = Object.fromEntries(SHAREABLE_SKILLS.map(({ id, category }) => [id, category]));

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = join(REPO_ROOT, "content", "skills");
const OUT_FILE = join(REPO_ROOT, "content", "skills.json");

// Display names for skills whose id doesn't read well title-cased directly.
const TITLES = {
  pr: "PR: Commit, Push, Draft PR",
  "address-pr-comments": "Address PR Comments",
  "resolve-pr-conflicts": "Resolve PR Conflicts",
  "main-worktree-reconcile": "Main Worktree Reconcile",
  "worktree-cleanup": "Worktree Cleanup",
  "code-review": "Code Review",
  "conciseness-review": "Conciseness Review",
  "debug-recovery": "Debug Recovery",
  "adversarial-fleet": "Adversarial Fleet",
  counsel: "Counsel",
  "delegate-and-coordinate": "Delegate & Coordinate",
  "agentic-coding": "Agentic Coding",
  "explanation-craft": "Explanation Craft",
  "visual-explainer": "Visual Explainer",
  "system-and-frontend-architecture": "System & Frontend Architecture",
  "ui-ux-design": "UI/UX Design",
  "product-psychology": "Product Psychology",
  "ui-work-artifact-first": "UI Work: Artifact First",
};

function extractDescription(skillMdPath) {
  const text = readFileSync(skillMdPath, "utf-8");
  const frontmatterMatch = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatterMatch) return "";
  const fm = frontmatterMatch[1];
  const descMatch = fm.match(/(?:^|\n)description:\s*(>-|>|\|)?\s*\n?([\s\S]*?)(?=\n\w+:|$)/);
  if (!descMatch) return "";
  return descMatch[2]
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}

function listFiles(dir, base = dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...listFiles(full, base));
    } else {
      out.push(relative(base, full));
    }
  }
  return out.sort();
}

const skillIds = readdirSync(SKILLS_DIR)
  .filter((entry) => statSync(join(SKILLS_DIR, entry)).isDirectory())
  .sort();

const manifest = skillIds.map((id) => {
  const category = CATEGORIES[id];
  if (!category) {
    throw new Error(`No category for skill "${id}" — add it to scripts/shareable-skills.mjs`);
  }
  const skillDir = join(SKILLS_DIR, id);
  const skillMd = join(skillDir, "SKILL.md");
  return {
    id,
    title: TITLES[id] ?? id,
    description: extractDescription(skillMd),
    category,
    files: listFiles(skillDir),
  };
});

writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Wrote ${manifest.length} skills to content/skills.json`);
