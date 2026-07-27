"use client";

import { useMemo, useState } from "react";

interface Skill {
  id: string;
  title: string;
  description: string;
  files: string[];
}

const REPO_URL = "https://github.com/ethanluh/claude-skills";
const REPO_BRANCH = "main";

export default function SkillDirectory({ skills }: { skills: Skill[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return skills;
    return skills.filter((skill) =>
      `${skill.title} ${skill.id} ${skill.description}`.toLowerCase().includes(q),
    );
  }, [skills, query]);

  return (
    <>
      <div className="sticky top-0 z-10 flex items-center gap-2.5 bg-[#f6f6f3] py-5 dark:bg-[#17181a]">
        <div className="relative flex-1">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-600"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name or what it does…"
            aria-label="Filter skills"
            className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pl-9 pr-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-600"
          />
        </div>
        <span className="whitespace-nowrap px-0.5 font-mono text-xs text-neutral-400 dark:text-neutral-600">
          {filtered.length} / {skills.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed border-neutral-300 py-10 text-center text-sm text-neutral-400 dark:border-neutral-700 dark:text-neutral-600">
          No skills match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="mt-1 grid grid-cols-1 gap-3">
          {filtered.map((skill) => {
            const skillUrl = `${REPO_URL}/tree/${REPO_BRANCH}/content/skills/${skill.id}`;
            return (
              <div
                key={skill.id}
                className="rounded-[10px] border border-neutral-200 bg-white p-[18px] transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-[15.5px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                    {skill.title}
                  </h2>
                  <span className="whitespace-nowrap font-mono text-[11.5px] text-neutral-400 dark:text-neutral-600">
                    {skill.id}
                  </span>
                </div>
                <p className="mt-1.5 max-w-[68ch] text-[13.5px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {skill.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
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
          })}
        </div>
      )}
    </>
  );
}
