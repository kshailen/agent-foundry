import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllRoadmaps,
  getRoadmapBySlug,
  getTopicContent,
  getAdjacentTopics,
  getFlatTopics,
} from "@/lib/content";
import { MDXContent } from "@/components/mdx-content";
import { TopicPageClient } from "./topic-page-client";

interface Props {
  params: Promise<{ slug: string; topicSlug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const roadmaps = getAllRoadmaps();
  return roadmaps.flatMap((r) =>
    getFlatTopics(r).map((t) => ({
      slug: r.slug,
      topicSlug: t.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, topicSlug } = await params;
  const roadmap = getRoadmapBySlug(slug);
  if (!roadmap) return { title: "Not Found" };

  const topic = getFlatTopics(roadmap).find((t) => t.slug === topicSlug);
  if (!topic) return { title: "Not Found" };

  return {
    title: `${topic.title} - ${roadmap.title}`,
    description: `Learn ${topic.title} in the ${roadmap.title} roadmap on Agent Foundry.`,
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug, topicSlug } = await params;
  const roadmap = getRoadmapBySlug(slug);
  if (!roadmap) notFound();

  const topic = getFlatTopics(roadmap).find((t) => t.slug === topicSlug);
  if (!topic) notFound();

  const rawContent = getTopicContent(slug, topicSlug);
  if (!rawContent) notFound();

  const { prev, next } = getAdjacentTopics(roadmap, topicSlug);
  const flat = getFlatTopics(roadmap);
  const topicIndex = flat.findIndex((t) => t.slug === topicSlug) + 1;
  const totalTopics = flat.length;

  return (
    <TopicPageClient
      slug={slug}
      topicSlug={topicSlug}
      roadmapTitle={roadmap.title}
      topic={topic}
      rawContent={rawContent}
      prev={prev}
      next={next}
      topicIndex={topicIndex}
      totalTopics={totalTopics}
    >
      <MDXContent source={rawContent} />
    </TopicPageClient>
  );
}
