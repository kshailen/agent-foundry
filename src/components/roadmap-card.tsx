import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Link as LinkIcon,
  Users,
  Sparkles,
  GitBranch,
} from "lucide-react";
import type { RoadmapMeta } from "@/lib/types";
import { getTotalTopicCount } from "@/lib/content";

const iconMap: Record<string, React.ElementType> = {
  link: LinkIcon,
  users: Users,
  sparkles: Sparkles,
  "git-branch": GitBranch,
};

const accentMap: Record<string, string> = {
  crewai: "var(--accent-crewai)",
  langchain: "var(--accent-langchain)",
  langgraph: "var(--accent-langgraph)",
  "openai-agents-sdk": "var(--accent-openai)",
};

export function RoadmapCard({ roadmap }: { roadmap: RoadmapMeta }) {
  const Icon = iconMap[roadmap.icon] ?? LinkIcon;
  const topicCount = getTotalTopicCount(roadmap);
  const accent = accentMap[roadmap.slug] ?? "var(--primary)";

  return (
    <Link href={`/roadmaps/${roadmap.slug}`} className="group block">
      <Card
        className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        style={{ borderTop: `3px solid ${accent}` }}
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{
                backgroundColor: `color-mix(in oklch, ${accent} 15%, transparent)`,
              }}
            >
              <Icon className="h-5 w-5" style={{ color: accent }} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{roadmap.title}</CardTitle>
            </div>
          </div>
          <CardDescription className="mt-2 line-clamp-2">
            {roadmap.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{topicCount} topics</Badge>
              <Badge variant="outline">
                {roadmap.sections.length} sections
              </Badge>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              Start Learning
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
