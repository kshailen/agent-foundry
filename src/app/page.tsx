import Link from "next/link";
import {
  Bot,
  BookOpen,
  Route,
  Layers,
  Zap,
  ArrowRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RoadmapCard } from "@/components/roadmap-card";
import { AnimatedSection } from "@/components/animated-section";
import { getAllRoadmaps } from "@/lib/content";

const steps = [
  {
    icon: Route,
    title: "Pick a Framework",
    description:
      "Choose from CrewAI, LangChain, LangGraph, or OpenAI Agents SDK.",
  },
  {
    icon: BookOpen,
    title: "Follow the Path",
    description:
      "Work through structured topics from beginner to advanced.",
  },
  {
    icon: Zap,
    title: "Build Projects",
    description:
      "Apply what you learn with hands-on code examples and real projects.",
  },
];

const valueProps = [
  {
    icon: Route,
    title: "Structured Roadmaps",
    description:
      "Follow curated learning paths from beginner to advanced for each AI agent framework.",
  },
  {
    icon: BookOpen,
    title: "Free & Open Source",
    description:
      "All content is freely available and open source. Learn at your own pace, contribute what you know.",
  },
  {
    icon: Layers,
    title: "Framework Coverage",
    description:
      "LangChain, CrewAI, OpenAI Agents SDK, LangGraph, and more — all in one place.",
  },
  {
    icon: Zap,
    title: "Practical & Hands-On",
    description:
      "Every topic includes real code examples you can run immediately. No fluff, just working code.",
  },
];

const faqs = [
  {
    question: "Who is this platform for?",
    answer:
      "Agent Foundry is for developers who want to learn how to build AI agents. Whether you're a beginner exploring the space or an experienced developer evaluating frameworks, you'll find structured paths to guide your learning.",
  },
  {
    question: "Is all the content free?",
    answer:
      "Yes. Agent Foundry is completely free and open source under the GPL-3.0 license. All roadmaps, content, and code examples are available at no cost.",
  },
  {
    question: "Which AI agent frameworks are covered?",
    answer:
      "We currently cover LangChain, CrewAI, OpenAI Agents SDK, and LangGraph. More frameworks will be added as the platform grows.",
  },
  {
    question: "How do I contribute?",
    answer:
      "Agent Foundry is open source on GitHub. You can contribute by adding new content, improving existing topics, fixing errors, or suggesting new roadmaps via pull requests.",
  },
  {
    question: "Do I need prior AI experience?",
    answer:
      "Basic Python knowledge is helpful, but each roadmap starts from the fundamentals. The beginner-level topics assume no prior experience with AI agents or LLMs.",
  },
];

export default function HomePage() {
  const roadmaps = getAllRoadmaps();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120,119,198,0.15), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground shadow-[0_0_15px_-3px] shadow-primary/20">
              <Bot className="h-4 w-4" />
              <span>
                {roadmaps.length} Roadmaps &middot;{" "}
                {roadmaps.reduce(
                  (sum, r) =>
                    sum +
                    r.sections.reduce((s, sec) => s + sec.topics.length, 0),
                  0
                )}
                + Topics
              </span>
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Build with{" "}
              <span className="gradient-text">AI Agents</span> — The
              Structured Way
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Master AI agent frameworks with structured roadmaps, hands-on code
              examples, and curated learning paths. From CrewAI to LangGraph —
              completely free and open source.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/roadmaps"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 px-5 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-5px] shadow-primary/40 transition-all hover:shadow-primary/60 hover:brightness-110"
              >
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/kshailen/agent-foundry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
              >
                View on GitHub
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
              <span>CrewAI</span>
              <span className="text-border">•</span>
              <span>LangChain</span>
              <span className="text-border">•</span>
              <span>LangGraph</span>
              <span className="text-border">•</span>
              <span>OpenAI Agents SDK</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
            <p className="mt-3 text-muted-foreground">
              Three steps to go from zero to building real AI agents.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                {i < steps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-px w-[calc(100%-4rem)] translate-x-1/2 border-t-2 border-dashed border-border sm:block" />
                )}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/20">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Featured Roadmaps */}
      <section className="border-t border-border/40 bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Choose Your Path
            </h2>
            <p className="mt-3 text-muted-foreground">
              Pick a framework and follow a structured path from beginner to
              advanced.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {roadmaps.map((roadmap, i) => (
              <AnimatedSection key={roadmap.slug} delay={i * 100}>
                <RoadmapCard roadmap={roadmap} />
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/roadmaps"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              View All Roadmaps
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Everything You Need to Build AI Agents
          </h2>
          <p className="mt-3 text-muted-foreground">
            A single platform with structured learning, real code, and
            framework-specific guidance.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {valueProps.map((prop, i) => (
            <AnimatedSection key={prop.title} delay={i * 100}>
              <div className="flex gap-4 rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/30">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                  <prop.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{prop.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {prop.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/40 bg-muted/20">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                className="transition-all data-[open]:border-l-2 data-[open]:border-l-primary data-[open]:pl-4"
              >
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
