"use client";

import type { ProblemDifficulty, ProblemCategory, Framework } from "@/lib/problem-types";
import { CATEGORY_LABELS, FRAMEWORK_LABELS } from "@/lib/problem-types";
import { cn } from "@/lib/utils";

interface ProblemFiltersProps {
  difficulty: ProblemDifficulty | null;
  setDifficulty: (d: ProblemDifficulty | null) => void;
  category: ProblemCategory | null;
  setCategory: (c: ProblemCategory | null) => void;
  framework: Framework | null;
  setFramework: (f: Framework | null) => void;
  status: "all" | "todo" | "attempted" | "solved";
  setStatus: (s: "all" | "todo" | "attempted" | "solved") => void;
  search: string;
  setSearch: (s: string) => void;
}

const difficultyConfig: {
  value: ProblemDifficulty;
  label: string;
  active: string;
}[] = [
  { value: "easy", label: "Easy", active: "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30" },
  { value: "medium", label: "Medium", active: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30" },
  { value: "hard", label: "Hard", active: "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30" },
];

export function ProblemFilters({
  difficulty,
  setDifficulty,
  category,
  setCategory,
  framework,
  setFramework,
  status,
  setStatus,
  search,
  setSearch,
}: ProblemFiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Search problems..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-9 w-48 rounded-lg border border-border/60 bg-background px-3 text-sm outline-none focus:border-ring"
      />

      {difficultyConfig.map((d) => (
        <button
          key={d.value}
          onClick={() => setDifficulty(difficulty === d.value ? null : d.value)}
          className={cn(
            "h-8 rounded-lg px-3 text-xs font-medium transition-colors",
            difficulty === d.value
              ? d.active
              : "border border-border/60 bg-background hover:bg-muted/50",
          )}
        >
          {d.label}
        </button>
      ))}

      <select
        value={category ?? ""}
        onChange={(e) =>
          setCategory((e.target.value || null) as ProblemCategory | null)
        }
        className="h-8 rounded-lg border border-border/60 bg-background px-2 text-xs outline-none"
      >
        <option value="">All Categories</option>
        {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <select
        value={framework ?? ""}
        onChange={(e) =>
          setFramework((e.target.value || null) as Framework | null)
        }
        className="h-8 rounded-lg border border-border/60 bg-background px-2 text-xs outline-none"
      >
        <option value="">All Frameworks</option>
        {Object.entries(FRAMEWORK_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as "all" | "todo" | "attempted" | "solved")
        }
        className="h-8 rounded-lg border border-border/60 bg-background px-2 text-xs outline-none"
      >
        <option value="all">All</option>
        <option value="todo">Todo</option>
        <option value="attempted">Attempted</option>
        <option value="solved">Solved</option>
      </select>
    </div>
  );
}
