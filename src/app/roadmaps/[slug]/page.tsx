import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllRoadmaps, getRoadmapBySlug, getTotalTopicCount } from "@/lib/content";
import { RoadmapSheetClient } from "./roadmap-sheet-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllRoadmaps().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const roadmap = getRoadmapBySlug(slug);
  if (!roadmap) return { title: "Not Found" };
  return {
    title: roadmap.title,
    description: roadmap.description,
  };
}

export default async function RoadmapDetailPage({ params }: Props) {
  const { slug } = await params;
  const roadmap = getRoadmapBySlug(slug);
  if (!roadmap) notFound();
  const totalTopics = getTotalTopicCount(roadmap);

  return <RoadmapSheetClient roadmap={roadmap} slug={slug} totalTopics={totalTopics} />;
}
