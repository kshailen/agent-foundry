import fs from "fs";
import path from "path";
import type { ProblemMeta } from "./problem-types";
import { isSafeSlug, resolvePathWithinRoot } from "./security-path";

const PROBLEMS_DIR = path.join(process.cwd(), "content", "problems");

export function getAllProblems(): ProblemMeta[] {
  if (!fs.existsSync(PROBLEMS_DIR)) return [];

  const dirs = fs
    .readdirSync(PROBLEMS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const problems = dirs
    .map((slug) => getProblemBySlug(slug))
    .filter(Boolean) as ProblemMeta[];

  return problems.sort((a, b) => a.number - b.number);
}

export function getProblemBySlug(slug: string): ProblemMeta | null {
  if (!isSafeSlug(slug)) return null;

  const metaPath = resolvePathWithinRoot(PROBLEMS_DIR, [slug, "meta.json"]);
  if (!metaPath) return null;
  if (!fs.existsSync(metaPath)) return null;

  const raw = fs.readFileSync(metaPath, "utf-8");
  const meta = JSON.parse(raw);
  return { ...meta, slug };
}

export function getProblemDescription(slug: string): string | null {
  if (!isSafeSlug(slug)) return null;

  const filePath = resolvePathWithinRoot(PROBLEMS_DIR, [slug, "description.mdx"]);
  if (!filePath) return null;
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export function getProblemEditorial(slug: string): string | null {
  if (!isSafeSlug(slug)) return null;

  const filePath = resolvePathWithinRoot(PROBLEMS_DIR, [slug, "editorial.mdx"]);
  if (!filePath) return null;
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export function getProblemStats() {
  const problems = getAllProblems();
  return {
    total: problems.length,
    easy: problems.filter((p) => p.difficulty === "easy").length,
    medium: problems.filter((p) => p.difficulty === "medium").length,
    hard: problems.filter((p) => p.difficulty === "hard").length,
  };
}
