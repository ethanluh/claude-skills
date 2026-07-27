import { REPO_BRANCH, REPO_URL, type Skill } from "./types";

export default function SkillCard({ skill }: { skill: Skill }) {
  const skillUrl = `${REPO_URL}/tree/${REPO_BRANCH}/content/skills/${skill.id}`;
  const downloadUrl = `/downloads/${skill.id}.zip`;
  return (
    <div className="rounded-[10px] border border-neutral-200 bg-white p-[18px] transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[15.5px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {skill.title}
        </h3>
        <span className="whitespace-nowrap font-mono text-[11.5px] text-neutral-400 dark:text-neutral-600">
          {skill.id}
        </span>
      </div>
      <p className="mt-1.5 max-w-[68ch] text-[13.5px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        {skill.description}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <a
          href={downloadUrl}
          download
          className="inline-flex items-center gap-1 rounded-md border border-amber-700 bg-amber-700 px-2.5 py-1 text-xs font-semibold text-white hover:bg-amber-800 dark:border-amber-500 dark:bg-amber-500/20 dark:text-amber-300 dark:hover:bg-amber-500/30"
        >
          Download .zip
        </a>
        <a
          href={skillUrl}
          className="inline-flex items-center gap-1 rounded-md border border-neutral-300 px-2.5 py-1 text-xs font-semibold text-amber-800 hover:border-amber-700 hover:bg-amber-50 dark:border-neutral-700 dark:text-amber-400 dark:hover:border-amber-500 dark:hover:bg-amber-500/10"
        >
          View on GitHub
          <span aria-hidden="true">↗</span>
        </a>
        {skill.files.map((file) => (
          <a
            key={file}
            href={`${REPO_URL}/blob/${REPO_BRANCH}/content/skills/${skill.id}/${file}`}
            className="rounded-md bg-neutral-100 px-2.5 py-1 font-mono text-xs text-neutral-600 hover:text-amber-800 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-amber-400"
          >
            {file}
          </a>
        ))}
      </div>
    </div>
  );
}
