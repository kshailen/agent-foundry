"use client";

import { useProgress } from "@/lib/progress";
import { ProgressRing } from "@/components/progress-ring";
import { ProgressBar } from "@/components/progress-bar";
import { TopicRow } from "@/components/topic-row";
import type { RoadmapMeta } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RoadmapSheetClientProps {
  roadmap: RoadmapMeta;
  slug: string;
  totalTopics: number;
}

function getSectionTier(title: string): "green" | "amber" | "red" | "default" {
  const lower = title.toLowerCase();
  if (lower.includes("beginner") || lower.includes("getting started")) return "green";
  if (lower.includes("intermediate")) return "amber";
  if (lower.includes("advanced")) return "red";
  return "default";
}

const tierStyles = {
  green: "bg-gradient-to-r from-green-500/20 to-green-500/5 text-green-600 dark:text-green-400",
  amber: "bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-600 dark:text-amber-400",
  red: "bg-gradient-to-r from-red-500/20 to-red-500/5 text-red-600 dark:text-red-400",
  default: "bg-gradient-to-r from-primary/20 to-primary/5 text-primary",
} as const;

const tierBadge = {
  green: "bg-green-500/15 text-green-700 dark:text-green-400",
  amber: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  red: "bg-red-500/15 text-red-700 dark:text-red-400",
  default: "bg-primary/15 text-primary",
} as const;

export function RoadmapSheetClient({ roadmap, slug, totalTopics }: RoadmapSheetClientProps) {
  const { completedCount, toggleTopic, isCompleted } = useProgress(slug);

  let globalIndex = 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      {/* Sticky progress header */}
      <div className="sticky top-0 z-20 -mx-4 mb-10 border-b border-border/40 bg-background/80 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex items-center gap-5">
          <ProgressRing value={completedCount} max={totalTopics} size={56} strokeWidth={4} />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl truncate">
              {roadmap.title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {completedCount} of {totalTopics} completed
            </p>
            <ProgressBar value={completedCount} max={totalTopics} className="mt-2 max-w-md" />
          </div>
        </div>
      </div>

      {/* Section cards */}
      <div className="space-y-6">
        {roadmap.sections.map((section, sectionIdx) => {
          const tier = getSectionTier(section.title);
          const sectionCompleted = section.topics.filter((t) =>
            isCompleted(t.slug),
          ).length;

          return (
            <div
              key={sectionIdx}
              className="rounded-xl border border-border/60 overflow-hidden"
            >
              {/* Section header */}
              <div className={cn("px-5 py-3.5 flex items-center gap-3", tierStyles[tier])}>
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold",
                    tierBadge[tier],
                  )}
                >
                  {sectionIdx + 1}
                </span>
                <h2 className="flex-1 text-sm font-semibold">{section.title}</h2>
                <span className="text-xs font-medium opacity-80">
                  {sectionCompleted}/{section.topics.length}
                </span>
              </div>

              {/* Topic rows */}
              <div className="divide-y divide-border/30">
                {section.topics.map((topic) => {
                  const idx = globalIndex++;
                  return (
                    <TopicRow
                      key={topic.slug}
                      topic={topic}
                      index={idx}
                      roadmapSlug={slug}
                      isCompleted={isCompleted(topic.slug)}
                      onToggle={() => toggleTopic(topic.slug)}
                      hasNotebook={!!topic.notebookUrl}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
