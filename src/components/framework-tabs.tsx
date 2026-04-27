"use client";

import type { Framework } from "@/lib/problem-types";
import { FRAMEWORK_LABELS } from "@/lib/problem-types";
import { cn } from "@/lib/utils";

const accentVar: Record<Framework, string> = {
  langchain: "var(--accent-langchain)",
  crewai: "var(--accent-crewai)",
  "openai-agents-sdk": "var(--accent-openai)",
  langgraph: "var(--accent-langgraph)",
};

interface FrameworkTabsProps {
  frameworks: Framework[];
  selected: Framework;
  onSelect: (fw: Framework) => void;
}

export function FrameworkTabs({ frameworks, selected, onSelect }: FrameworkTabsProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {frameworks.map((fw) => {
        const isSelected = fw === selected;
        return (
          <button
            key={fw}
            onClick={() => onSelect(fw)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
              !isSelected && "border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/30"
            )}
            style={
              isSelected
                ? {
                    backgroundColor: `color-mix(in oklch, ${accentVar[fw]} 20%, transparent)`,
                    color: accentVar[fw],
                    border: `1px solid color-mix(in oklch, ${accentVar[fw]} 40%, transparent)`,
                  }
                : undefined
            }
          >
            {FRAMEWORK_LABELS[fw]}
          </button>
        );
      })}
    </div>
  );
}
