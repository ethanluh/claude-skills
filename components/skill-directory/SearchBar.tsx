interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  matchCount: number;
  totalCount: number;
}

export default function SearchBar({
  query,
  onQueryChange,
  matchCount,
  totalCount,
}: SearchBarProps) {
  return (
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
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Filter by name or what it does…"
          aria-label="Filter skills"
          className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pl-9 pr-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-600"
        />
      </div>
      <span className="whitespace-nowrap px-0.5 font-mono text-xs text-neutral-400 dark:text-neutral-600">
        {matchCount} / {totalCount}
      </span>
    </div>
  );
}
