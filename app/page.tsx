import { readFileSync } from "node:fs";
import { join } from "node:path";

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
const REPO_BRANCH = "main";

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
    <main className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Claude Code Skills
      </h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Clone this repo or grab a skill&apos;s folder from GitHub, then drop it into{" "}
        <code className="rounded bg-neutral-100 px-1.5 py-0.5 dark:bg-neutral-800">
          ~/.claude/skills/&lt;name&gt;/
        </code>
        .
      </p>

      {visible.length === 0 ? (
        <p className="mt-8 italic text-neutral-500">No skills are currently shared.</p>
      ) : (
        <div className="mt-8 space-y-3">
          {visible.map((skill) => {
            const skillUrl = `${REPO_URL}/tree/${REPO_BRANCH}/content/skills/${skill.id}`;
            return (
              <div
                key={skill.id}
                className="rounded-lg border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  {skill.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {skill.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                  <a
                    href={skillUrl}
                    className="rounded-md border border-neutral-300 px-2.5 py-1 font-medium text-amber-700 hover:border-amber-700 dark:border-neutral-700 dark:text-amber-500 dark:hover:border-amber-500"
                  >
                    View on GitHub
                  </a>
                  {skill.files.map((file) => (
                    <a
                      key={file}
                      href={`${REPO_URL}/blob/${REPO_BRANCH}/content/skills/${skill.id}/${file}`}
                      className="rounded-md bg-neutral-100 px-2.5 py-1 text-neutral-700 hover:text-amber-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:text-amber-500"
                    >
                      {file}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
