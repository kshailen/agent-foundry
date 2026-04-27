"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Play, CheckCircle2 } from "lucide-react";
import { HintReveal } from "@/components/hint-reveal";
import { FrameworkTabs } from "@/components/framework-tabs";
import { EvalChecklist } from "@/components/eval-checklist";
import { useProblemProgress } from "@/lib/problem-progress";
import type { ProblemMeta, Framework, ProblemDifficulty } from "@/lib/problem-types";
import { CATEGORY_LABELS } from "@/lib/problem-types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { sanitizeNotebookUrl } from "@/lib/safe-url";

const difficultyConfig: Record<ProblemDifficulty, { label: string; className: string }> = {
  easy: {
    label: "Easy",
    className: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  },
  medium: {
    label: "Medium",
    className: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  },
  hard: {
    label: "Hard",
    className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  },
};

interface ProblemDetailClientProps {
  problem: ProblemMeta;
  descriptionContent: ReactNode;
  editorialContent: ReactNode | null;
}

export function ProblemDetailClient({
  problem,
  descriptionContent,
  editorialContent,
}: ProblemDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"description" | "hints" | "editorial">("description");
  const [selectedFramework, setSelectedFramework] = useState<Framework>(problem.frameworks[0]);
  const { getStatus, setStatus, getCheckedCriteria, toggleCriterion } = useProblemProgress();

  const status = getStatus(problem.slug);
  const { label: diffLabel, className: diffClass } = difficultyConfig[problem.difficulty];
  const colabUrl = sanitizeNotebookUrl(problem.colabUrls[selectedFramework]);

  const tabs = [
    { key: "description" as const, label: "Description" },
    { key: "hints" as const, label: "Hints" },
    { key: "editorial" as const, label: "Editorial" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:flex lg:gap-0 lg:py-8">
      <div className="min-w-0 flex-1 lg:max-w-[calc(100%-480px)]">
        <Link
          href="/problems"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All Problems
        </Link>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          #{problem.number}. {problem.title}
        </h1>

        <div className="mt-3 mb-6 flex flex-wrap items-center gap-3">
          <Badge variant="outline" className={diffClass}>
            {diffLabel}
          </Badge>
          {problem.categories.map((cat) => (
            <Badge key={cat} variant="outline" className="text-xs">
              {CATEGORY_LABELS[cat]}
            </Badge>
          ))}
        </div>

        <div className="mb-6 flex items-center gap-1 border-b border-border/40">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-4 py-2 text-sm transition-colors",
                activeTab === tab.key
                  ? "border-b-2 border-primary font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "description" && (
          <div>
            {descriptionContent}
            <div className="mt-8 rounded-lg border border-border/60 bg-muted/20 p-4">
              <h3 className="mb-3 text-sm font-semibold">Constraints</h3>
              <ul className="space-y-1.5">
                {problem.constraints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "hints" && <HintReveal hints={problem.hints} />}

        {activeTab === "editorial" && (
          <div>
            {editorialContent ? (
              editorialContent
            ) : (
              <div className="rounded-lg border border-border/60 bg-muted/20 p-8 text-center text-sm text-muted-foreground">
                Editorial coming soon.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 lg:mt-0 lg:w-[480px] lg:shrink-0 lg:border-l lg:border-border/40 lg:pl-6">
        <FrameworkTabs
          frameworks={problem.frameworks}
          selected={selectedFramework}
          onSelect={setSelectedFramework}
        />

        <div className="rounded-lg border border-border/60 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/40">
            <span className="text-xs font-medium text-muted-foreground">Starter Code</span>
          </div>
          <pre className="overflow-x-auto p-4 text-sm font-mono leading-relaxed text-foreground/80">
            <code>{problem.starterCode[selectedFramework] || "No starter code for this framework."}</code>
          </pre>
        </div>

        {colabUrl && (
          <a
            href={colabUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <Play className="h-4 w-4" />
            Open in Google Colab
          </a>
        )}

        <EvalChecklist
          criteria={problem.evaluationCriteria}
          checkedIds={getCheckedCriteria(problem.slug)}
          onToggle={(id) => toggleCriterion(problem.slug, id)}
        />

        <div className="mt-6 flex flex-col gap-3">
          {status === "unattempted" && (
            <button
              onClick={() => setStatus(problem.slug, "attempted")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Mark as Attempted
            </button>
          )}
          {status === "attempted" && (
            <>
              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-6 py-3 text-sm font-medium text-amber-500 transition-colors hover:bg-amber-500/20"
                disabled
              >
                Attempted
              </button>
              <button
                onClick={() => setStatus(problem.slug, "solved")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Mark as Solved
              </button>
            </>
          )}
          {status === "solved" && (
            <button
              onClick={() => setStatus(problem.slug, "unattempted")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-6 py-3 text-sm font-medium text-green-500 transition-colors hover:bg-green-500/20"
            >
              <CheckCircle2 className="h-4 w-4" />
              Solved
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
