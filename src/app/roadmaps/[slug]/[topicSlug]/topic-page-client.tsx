"use client";

import { type ReactNode } from "react";
import { ReadingProgress } from "@/components/reading-progress";
import { TopicNav } from "@/components/topic-nav";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { ColabButton } from "@/components/colab-button";
import { TableOfContents } from "@/components/table-of-contents";
import { useProgress } from "@/lib/progress";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { Topic } from "@/lib/types";

interface TopicPageClientProps {
  slug: string;
  topicSlug: string;
  roadmapTitle: string;
  topic: Topic;
  rawContent: string;
  prev: Topic | null;
  next: Topic | null;
  topicIndex: number;
  totalTopics: number;
  children: ReactNode;
}

export function TopicPageClient({
  slug,
  topicSlug,
  roadmapTitle,
  topic,
  rawContent,
  prev,
  next,
  topicIndex,
  totalTopics,
  children,
}: TopicPageClientProps) {
  const { isCompleted, toggleTopic } = useProgress(slug);
  const completed = isCompleted(topicSlug);

  return (
    <div>
      <ReadingProgress />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:flex lg:gap-10">
        <article className="min-w-0 max-w-3xl flex-1">
          <Link
            href={`/roadmaps/${slug}`}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {roadmapTitle}
          </Link>

          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {topic.title}
          </h1>

          <div className="mb-8 flex flex-wrap items-center gap-3">
            <DifficultyBadge difficulty={topic.difficulty} />
            <span className="text-sm text-muted-foreground">
              Topic {topicIndex} of {totalTopics}
            </span>
            {topic.notebookUrl && (
              <ColabButton notebookUrl={topic.notebookUrl} />
            )}
          </div>

          {children}

          <div className="mt-10">
            <button
              onClick={() => toggleTopic(topicSlug)}
              className={
                completed
                  ? "inline-flex w-full items-center justify-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-6 py-3 text-sm font-medium text-green-500 transition-colors hover:bg-green-500/20 sm:w-auto"
                  : "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
              }
            >
              {completed && <CheckCircle2 className="h-4 w-4" />}
              {completed ? "Completed" : "Mark as Complete"}
            </button>
          </div>

          <TopicNav roadmapSlug={slug} prev={prev} next={next} />
        </article>

        <aside className="hidden lg:block lg:w-64 lg:shrink-0">
          <div className="sticky top-20">
            <TableOfContents source={rawContent} />
          </div>
        </aside>
      </div>
    </div>
  );
}
