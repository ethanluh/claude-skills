#!/usr/bin/env node
// Copies the allowlisted skill directories from a BigBrain checkout into
// content/skills/. Run manually whenever a skill's content changes --- CI
// can't reach the private BigBrain repo.

import { existsSync, rmSync, cpSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";
import { SHAREABLE_SKILLS } from "./shareable-skills.mjs";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DEST = join(REPO_ROOT, "content", "skills");

const source = process.argv[2] ?? join(homedir(), "Obsidian", "BigBrain", ".claude", "skills");

if (!existsSync(source)) {
  console.error(`Source not found: ${source}`);
  console.error("Usage: node scripts/sync-skills.mjs [path-to-BigBrain/.claude/skills]");
  process.exit(1);
}

function sourcePath({ id, category, group }) {
  return group ? join(source, category, group, id) : join(source, category, id);
}

const missing = SHAREABLE_SKILLS.filter((skill) => !existsSync(sourcePath(skill)));
if (missing.length) {
  console.error(`Missing at source: ${missing.map((s) => sourcePath(s)).join(", ")}`);
  process.exit(1);
}

rmSync(DEST, { recursive: true, force: true });
mkdirSync(DEST, { recursive: true });

for (const skill of SHAREABLE_SKILLS) {
  cpSync(sourcePath(skill), join(DEST, skill.id), { recursive: true });
}

console.log(`Synced ${SHAREABLE_SKILLS.length} skills from ${source} into content/skills/`);
