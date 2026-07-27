import { readFileSync } from "node:fs";
import { join } from "node:path";
import CopyInstallCommand from "@/components/CopyInstallCommand";
import SkillDirectory from "@/components/SkillDirectory";

interface Skill {
  id: string;
  title: string;
  description: string;
  files: string[];
}

interface SkillsConfig {
  enabled: string[];
}

const REPO_URL = "https://github.com/ethanluh/claude-skills";

function loadSkills(): Skill[] {
  const skillsPath = join(process.cwd(), "content", "skills.json");
  return JSON.parse(readFileSync(skillsPath, "utf-8"));
}

function loadConfig(): SkillsConfig {
  const configPath = join(process.cwd(), "skills.config.json");
  return JSON.parse(readFileSync(configPath, "utf-8"));
}

export default function HomePage() {
  const skills = loadSkills();
  const config = loadConfig();
  const visible = skills.filter((s) => config.enabled.includes(s.id));

  return (
    <main className="mx-auto max-w-3xl bg-[#f6f6f3] px-6 pb-24 dark:bg-[#17181a]">
      <header className="border-b border-neutral-200 pb-8 pt-14 dark:border-neutral-800">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-700 dark:bg-amber-400" />
          {visible.length} skills shared
        </div>
        <h1 className="mt-3 text-balance text-[34px] font-bold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100">
          Claude Code Skills
        </h1>
        <p className="mt-3.5 max-w-[60ch] text-[15.5px] text-neutral-600 dark:text-neutral-400">
          A public index of Ethan&apos;s shareable Claude Code skills. Clone the repo, or grab
          one skill&apos;s folder straight from GitHub and drop it into{" "}
          <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[0.9em] text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
            ~/.claude/skills/&lt;name&gt;/
          </code>
          .
        </p>
        <CopyInstallCommand command="git clone https://github.com/ethanluh/claude-skills.git" />
      </header>

      {visible.length === 0 ? (
        <p className="mt-8 italic text-neutral-500">No skills are currently shared.</p>
      ) : (
        <SkillDirectory skills={visible} />
      )}

      <footer className="mt-12 flex flex-wrap justify-between gap-2 border-t border-neutral-200 pt-5 text-xs text-neutral-400 dark:border-neutral-800 dark:text-neutral-600">
        <span>
          Source on{" "}
          <a href={REPO_URL} className="text-neutral-600 underline underline-offset-2 dark:text-neutral-400">
            GitHub
          </a>
        </span>
        <span>skills.ethanluh.com</span>
      </footer>
    </main>
  );
}
