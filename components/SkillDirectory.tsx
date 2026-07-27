"use client";

import { useMemo, useState } from "react";
import { CATEGORY_ORDER, humanizeId } from "@/scripts/shareable-skills.mjs";

interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  files: string[];
}

const REPO_URL = "https://github.com/ethanluh/claude-skills";
const REPO_BRANCH = "main";

function SkillCard({ skill }: { skill: Skill }) {
  const skillUrl = `${REPO_URL}/tree/${REPO_BRANCH}/content/skills/${skill.id}`;
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

export default function SkillDirectory({ skills }: { skills: Skill[] }) {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  function setCategoryOpen(category: string, isOpen: boolean) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (isOpen) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  const isSearching = query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return skills;
    return skills.filter((skill) =>
      `${skill.title} ${skill.id} ${skill.description}`.toLowerCase().includes(q),
    );
  }, [skills, query]);

  const grouped = useMemo(() => {
    const byCategory = new Map<string, Skill[]>();
    for (const skill of filtered) {
      const group = byCategory.get(skill.category) ?? [];
      group.push(skill);
      byCategory.set(skill.category, group);
    }
    const categories = [...byCategory.keys()].sort(
      (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b),
    );
    return categories.map((category) => ({ category, skills: byCategory.get(category)! }));
  }, [filtered]);

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
        <div className="mt-1">
          {grouped.map(({ category, skills: categorySkills }) => {
            const isOpen = isSearching || !collapsed.has(category);
            return (
              <section key={category} className="mb-6 last:mb-0">
                <h2>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setCategoryOpen(category, collapsed.has(category))}
                    className="mb-2 flex w-full items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-600"
                  >
                    <svg
                      className={`h-2.5 w-2.5 shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      aria-hidden="true"
                    >
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                    {humanizeId(category)}
                    <span className="text-neutral-300 dark:text-neutral-700">
                      {categorySkills.length}
                    </span>
                  </button>
                </h2>
                <div className="grid grid-cols-1 gap-3" hidden={!isOpen}>
                  {categorySkills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </>
  );
}
