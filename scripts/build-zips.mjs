#!/usr/bin/env node
// Zips each skill directory under content/skills/ into public/downloads/<id>.zip
// so the site can offer a direct download. Run before `next build`.

import { readdirSync, statSync, mkdirSync, rmSync, createWriteStream } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ZipArchive } from "archiver";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = join(REPO_ROOT, "content", "skills");
const OUT_DIR = join(REPO_ROOT, "public", "downloads");

function zipSkill(id) {
  const skillDir = join(SKILLS_DIR, id);
  const outFile = join(OUT_DIR, `${id}.zip`);
  return new Promise((resolve, reject) => {
    const output = createWriteStream(outFile);
    const archive = new ZipArchive({ zlib: { level: 9 } });
    output.on("close", resolve);
    archive.on("error", reject);
    archive.pipe(output);
    archive.directory(skillDir, id);
    archive.finalize();
  });
}

const skillIds = readdirSync(SKILLS_DIR)
  .filter((entry) => statSync(join(SKILLS_DIR, entry)).isDirectory())
  .sort();

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

for (const id of skillIds) {
  await zipSkill(id);
}

console.log(`Wrote ${skillIds.length} skill zips to public/downloads/`);
