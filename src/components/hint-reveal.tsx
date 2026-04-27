"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";

interface HintRevealProps {
  hints: string[];
}

export function HintReveal({ hints }: HintRevealProps) {
  const [revealedCount, setRevealedCount] = useState(0);

  return (
    <div className="space-y-3">
      {hints.slice(0, revealedCount).map((hint, i) => (
        <div key={i} className="rounded-lg border border-border/60 bg-muted/20 p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <div>
              <p className="text-xs font-medium text-amber-500 mb-1">Hint {i + 1}</p>
              <p className="text-sm text-foreground/80">{hint}</p>
            </div>
          </div>
        </div>
      ))}

      {revealedCount < hints.length ? (
        <button
          onClick={() => setRevealedCount((prev) => prev + 1)}
          className="inline-flex items-center gap-2 rounded-lg border border-border/60 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
        >
          <Lightbulb className="h-4 w-4" />
          Show Hint {revealedCount + 1} of {hints.length}
        </button>
      ) : (
        <p className="text-xs text-muted-foreground">All hints revealed</p>
      )}
    </div>
  );
}
