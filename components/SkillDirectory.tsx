"use client";

import { useMemo, useState } from "react";
import { CATEGORY_ORDER } from "@/scripts/shareable-skills.mjs";
import CategorySection from "./skill-directory/CategorySection";
import SearchBar from "./skill-directory/SearchBar";
import type { Skill } from "./skill-directory/types";

export default function SkillDirectory({ skills }: { skills: Skill[] }) {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  function toggleCategory(category: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
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
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        matchCount={filtered.length}
        totalCount={skills.length}
      />

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed border-neutral-300 py-10 text-center text-sm text-neutral-400 dark:border-neutral-700 dark:text-neutral-600">
          No skills match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="mt-1">
          {grouped.map(({ category, skills: categorySkills }) => (
            <CategorySection
              key={category}
              category={category}
              skills={categorySkills}
              isOpen={isSearching || !collapsed.has(category)}
              onToggle={() => toggleCategory(category)}
            />
          ))}
        </div>
      )}
    </>
  );
}
