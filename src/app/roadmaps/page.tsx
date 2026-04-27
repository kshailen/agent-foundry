import type { Metadata } from "next";
import { getAllRoadmaps } from "@/lib/content";
import { RoadmapCard } from "@/components/roadmap-card";
import { AnimatedSection } from "@/components/animated-section";

export const metadata: Metadata = {
  title: "Roadmaps",
  description:
    "Browse structured learning roadmaps for AI agent frameworks including LangChain, CrewAI, OpenAI Agents SDK, and LangGraph.",
};

export default function RoadmapsPage() {
  const roadmaps = getAllRoadmaps();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          All <span className="gradient-text">Roadmaps</span>
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Pick a framework and follow a structured learning path from beginner
          to advanced.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {roadmaps.map((roadmap, i) => (
          <AnimatedSection key={roadmap.slug} delay={i * 100}>
            <RoadmapCard roadmap={roadmap} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
