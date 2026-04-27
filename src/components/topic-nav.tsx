"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Topic } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DifficultyDot } from "@/components/difficulty-badge";

interface TopicNavProps {
  roadmapSlug: string;
  prev: Topic | null;
  next: Topic | null;
}

export function TopicNav({ roadmapSlug, prev, next }: TopicNavProps) {
  return (
    <div className="mt-12 grid grid-cols-2 gap-4 border-t border-border/60 pt-6">
      {prev ? (
        <Link
          href={`/roadmaps/${roadmapSlug}/${prev.slug}`}
          className={cn(
            "group flex items-center gap-3 rounded-lg border border-border/40 p-4",
            "transition-all hover:border-primary/30 hover:bg-muted/30"
          )}
        >
          <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5" />
          <div className="min-w-0">
            <p className="mb-1 text-xs text-muted-foreground">Previous</p>
            <p className="truncate text-sm font-medium">{prev.title}</p>
            <DifficultyDot difficulty={prev.difficulty} className="mt-1.5" />
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/roadmaps/${roadmapSlug}/${next.slug}`}
          className={cn(
            "group flex items-center justify-end gap-3 rounded-lg border border-border/40 p-4 text-right",
            "transition-all hover:border-primary/30 hover:bg-muted/30"
          )}
        >
          <div className="min-w-0">
            <p className="mb-1 text-xs text-muted-foreground">Next</p>
            <p className="truncate text-sm font-medium">{next.title}</p>
            <DifficultyDot difficulty={next.difficulty} className="mt-1.5" />
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <Link
          href={`/roadmaps/${roadmapSlug}`}
          className={cn(
            "flex items-center justify-end gap-3 rounded-lg border border-border/40 p-4 text-right",
            "transition-all hover:border-primary/30 hover:bg-muted/30"
          )}
        >
          <div>
            <p className="mb-1 text-xs text-muted-foreground">Done!</p>
            <p className="text-sm font-medium">Back to Roadmap</p>
          </div>
        </Link>
      )}
    </div>
  );
}
