import type { Metadata } from "next";
import { getAllProblems, getProblemStats } from "@/lib/problems";
import { ProblemListClient } from "./problem-list-client";

export const metadata: Metadata = {
  title: "Problems",
  description:
    "Practice building AI agents with hands-on problems. Fix prompts, choose tools, handle errors, and build multi-agent systems.",
};

export default function ProblemsPage() {
  const problems = getAllProblems();
  const stats = getProblemStats();

  return <ProblemListClient problems={problems} stats={stats} />;
}
