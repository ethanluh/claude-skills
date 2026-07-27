import { humanizeId } from "@/scripts/shareable-skills.mjs";
import SkillCard from "./SkillCard";
import type { Skill } from "./types";

interface CategorySectionProps {
  category: string;
  skills: Skill[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function CategorySection({
  category,
  skills,
  isOpen,
  onToggle,
}: CategorySectionProps) {
  return (
    <section className="mb-6 last:mb-0">
      <h2>
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={onToggle}
          className="mb-2 flex w-full items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
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
          <span className="font-normal text-neutral-400 dark:text-neutral-600">
            {skills.length}
          </span>
        </button>
      </h2>
      {isOpen && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </section>
  );
}
