"use client";

import type { EvaluationCriterion } from "@/lib/problem-types";
import { ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface EvalChecklistProps {
  criteria: EvaluationCriterion[];
  checkedIds: string[];
  onToggle: (id: string) => void;
}

export function EvalChecklist({ criteria, checkedIds, onToggle }: EvalChecklistProps) {
  const checkedCount = checkedIds.length;

  return (
    <div className="mt-6 rounded-lg border border-border/60 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/30 border-b border-border/40">
        <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Evaluation Criteria</span>
        <span className="ml-auto text-xs font-medium text-muted-foreground">
          {checkedCount}/{criteria.length}
        </span>
      </div>
      <div className="divide-y divide-border/30">
        {criteria.map((criterion) => {
          const isChecked = checkedIds.includes(criterion.id);
          return (
            <button
              key={criterion.id}
              onClick={() => onToggle(criterion.id)}
              className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/20"
            >
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors",
                  isChecked
                    ? "border-green-500 bg-green-500"
                    : "border-2 border-border/60 bg-transparent"
                )}
              >
                {isChecked && (
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    className="h-3 w-3"
                  >
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <div>
                <p className={cn("text-sm font-medium", isChecked && "text-muted-foreground line-through")}>
                  {criterion.label}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{criterion.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
