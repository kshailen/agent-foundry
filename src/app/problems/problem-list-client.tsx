"use client";

import { useState } from "react";
import type {
  ProblemMeta,
  ProblemDifficulty,
  ProblemCategory,
  Framework,
} from "@/lib/problem-types";
import { useProblemProgress } from "@/lib/problem-progress";
import { ProblemRow } from "@/components/problem-row";
import { ProblemFilters } from "@/components/problem-filters";
import { AnimatedSection } from "@/components/animated-section";

interface ProblemListClientProps {
  problems: ProblemMeta[];
  stats: { total: number; easy: number; medium: number; hard: number };
}

export function ProblemListClient({ problems, stats }: ProblemListClientProps) {
  const [difficulty, setDifficulty] = useState<ProblemDifficulty | null>(null);
  const [category, setCategory] = useState<ProblemCategory | null>(null);
  const [framework, setFramework] = useState<Framework | null>(null);
  const [status, setStatus] = useState<"all" | "todo" | "attempted" | "solved">("all");
  const [search, setSearch] = useState("");

  const { getStatus, stats: progressStats } = useProblemProgress();

  const filtered = problems.filter((p) => {
    if (difficulty && p.difficulty !== difficulty) return false;
    if (category && !p.categories.includes(category)) return false;
    if (framework && !p.frameworks.includes(framework)) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (status !== "all") {
      const s = getStatus(p.slug);
      if (status === "todo" && s !== "unattempted") return false;
      if (status === "attempted" && s !== "attempted") return false;
      if (status === "solved" && s !== "solved") return false;
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <AnimatedSection>
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Agent <span className="gradient-text">Problems</span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Practice building AI agents with hands-on challenges.
          </p>
          <div className="mt-3 flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">{stats.total} problems</span>
            <span className="text-green-500">{stats.easy} Easy</span>
            <span className="text-amber-500">{stats.medium} Medium</span>
            <span className="text-red-500">{stats.hard} Hard</span>
            <span className="text-muted-foreground">
              · {progressStats.solved} solved
            </span>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <ProblemFilters
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          category={category}
          setCategory={setCategory}
          framework={framework}
          setFramework={setFramework}
          status={status}
          setStatus={setStatus}
          search={search}
          setSearch={setSearch}
        />
      </AnimatedSection>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-sm text-muted-foreground">
          No problems match your filters.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border/60">
          <div className="divide-y divide-border/30">
            {filtered.map((problem) => (
              <ProblemRow
                key={problem.slug}
                problem={problem}
                status={getStatus(problem.slug)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
