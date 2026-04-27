import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProblems, getProblemBySlug, getProblemDescription, getProblemEditorial } from "@/lib/problems";
import { MDXContent } from "@/components/mdx-content";
import { ProblemDetailClient } from "./problem-detail-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllProblems().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  if (!problem) return { title: "Not Found" };
  return {
    title: `${problem.title} - Problems`,
    description: `Solve "${problem.title}" - an AI agent challenge on Agent Foundry.`,
  };
}

export default async function ProblemPage({ params }: Props) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  if (!problem) notFound();

  const description = getProblemDescription(slug);
  if (!description) notFound();

  const editorial = getProblemEditorial(slug);

  return (
    <ProblemDetailClient
      problem={problem}
      descriptionContent={<MDXContent source={description} />}
      editorialContent={editorial ? <MDXContent source={editorial} /> : null}
    />
  );
}
