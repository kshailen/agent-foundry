"use client";

import Link from "next/link";
import type { ProblemMeta } from "@/lib/problem-types";
import { CATEGORY_LABELS } from "@/lib/problem-types";
import type { ProblemStatus } from "@/lib/problem-progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProblemRowProps {
  problem: ProblemMeta;
  status: ProblemStatus;
}

const difficultyDisplay: Record<
  ProblemMeta["difficulty"],
  { label: string; className: string }
> = {
  easy: { label: "Easy", className: "text-green-500" },
  medium: { label: "Med.", className: "text-amber-500" },
  hard: { label: "Hard", className: "text-red-500" },
};

function StatusIcon({ status }: { status: ProblemStatus }) {
  if (status === "solved") {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500">
        <svg
          viewBox="0 0 12 12"
          fill="none"
          className="h-3 w-3"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 6.5L5 9l4.5-6" />
        </svg>
      </span>
    );
  }

  if (status === "attempted") {
    return (
      <span className="h-5 w-5 shrink-0 rounded-full border-2 border-amber-500 bg-amber-500/20" />
    );
  }

  return (
    <span className="h-5 w-5 shrink-0 rounded-full border-2 border-border/60" />
  );
}

export function ProblemRow({ problem, status }: ProblemRowProps) {
  const diff = difficultyDisplay[problem.difficulty];

  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-muted/30"
    >
      <StatusIcon status={status} />

      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
        {problem.number}
      </span>

      <span className="flex-1 text-sm font-medium">{problem.title}</span>

      <span className="flex items-center gap-1.5">
        {problem.categories.map((cat) => (
          <Badge
            key={cat}
            variant="outline"
            className="text-[10px] px-1.5 py-0"
          >
            {CATEGORY_LABELS[cat]}
          </Badge>
        ))}
      </span>

      <span className={cn("text-xs font-medium", diff.className)}>
        {diff.label}
      </span>
    </Link>
  );
}
