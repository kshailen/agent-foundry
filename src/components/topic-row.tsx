"use client";

import Link from "next/link";
import { TopicCheckbox } from "@/components/topic-checkbox";
import { Play, BookOpen } from "lucide-react";
import type { Topic } from "@/lib/types";
import { cn } from "@/lib/utils";

const difficultyColor = {
  beginner: "bg-green-500",
  intermediate: "bg-amber-500",
  advanced: "bg-red-500",
} as const;

interface TopicRowProps {
  topic: Topic;
  index: number;
  roadmapSlug: string;
  isCompleted: boolean;
  onToggle: () => void;
  hasNotebook?: boolean;
}

export function TopicRow({
  topic,
  index,
  roadmapSlug,
  isCompleted,
  onToggle,
  hasNotebook,
}: TopicRowProps) {
  const isProject = topic.slug.startsWith("project-");

  return (
    <Link
      href={`/roadmaps/${roadmapSlug}/${topic.slug}`}
      className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-muted/30"
    >
      <TopicCheckbox checked={isCompleted} onChange={onToggle} />

      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
        {index + 1}
      </span>

      <span
        className={cn(
          "flex-1 text-sm font-medium",
          isCompleted && "text-muted-foreground line-through",
        )}
      >
        {topic.title}
      </span>

      <span className={cn("h-2 w-2 shrink-0 rounded-full", difficultyColor[topic.difficulty])} />

      {isProject && (
        <BookOpen className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      )}

      {hasNotebook && (
        <Play className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      )}
    </Link>
  );
}
