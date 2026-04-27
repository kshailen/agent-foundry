import fs from "fs";
import path from "path";
import type { RoadmapMeta, Topic } from "./types";
import { isSafeSlug, resolvePathWithinRoot } from "./security-path";

const CONTENT_DIR = path.join(process.cwd(), "content", "roadmaps");

export function getAllRoadmaps(): RoadmapMeta[] {
  const dirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  return dirs.map((slug) => getRoadmapBySlug(slug)).filter(Boolean) as RoadmapMeta[];
}

export function getRoadmapBySlug(slug: string): RoadmapMeta | null {
  if (!isSafeSlug(slug)) return null;

  const metaPath = resolvePathWithinRoot(CONTENT_DIR, [slug, "meta.json"]);
  if (!metaPath) return null;
  if (!fs.existsSync(metaPath)) return null;

  const raw = fs.readFileSync(metaPath, "utf-8");
  const meta = JSON.parse(raw);
  return { ...meta, slug };
}

export function getTopicContent(roadmapSlug: string, topicSlug: string): string | null {
  if (!isSafeSlug(roadmapSlug) || !isSafeSlug(topicSlug)) return null;

  const filePath = resolvePathWithinRoot(CONTENT_DIR, [roadmapSlug, `${topicSlug}.mdx`]);
  if (!filePath) return null;
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export function getTotalTopicCount(roadmap: RoadmapMeta): number {
  return roadmap.sections.reduce((sum, s) => sum + s.topics.length, 0);
}

export function getFlatTopics(roadmap: RoadmapMeta): Topic[] {
  return roadmap.sections.flatMap((s) => s.topics);
}

export function getAdjacentTopics(
  roadmap: RoadmapMeta,
  topicSlug: string
): { prev: Topic | null; next: Topic | null } {
  const flat = getFlatTopics(roadmap);
  const idx = flat.findIndex((t) => t.slug === topicSlug);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}
