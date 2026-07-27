"use client";

import { useState } from "react";

export default function CopyInstallCommand({ command }: { command: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    setTimeout(() => setStatus("idle"), 1500);
  }

  return (
    <div className="mt-5 flex max-w-xl overflow-hidden rounded-lg border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
      <div className="flex-1 overflow-x-auto whitespace-nowrap px-3.5 py-2.5 font-mono text-[13px] text-neutral-800 dark:text-neutral-200">
        <span className="text-neutral-400 dark:text-neutral-500">
          # clone just the skills you want
        </span>
        <br />
        {command}
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-1.5 border-l border-neutral-300 px-4 text-xs font-semibold text-neutral-600 hover:bg-amber-50 hover:text-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-amber-500/10 dark:hover:text-amber-400"
      >
        <span aria-live="polite">
          {status === "copied" ? "Copied" : status === "failed" ? "Couldn't copy" : "Copy"}
        </span>
      </button>
    </div>
  );
}
