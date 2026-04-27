import Link from "next/link";
import { Bot, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto bg-gradient-to-b from-background to-muted/20">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Bot className="h-5 w-5 text-primary" />
              <span>Agent Foundry</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Open-source platform to learn about AI Agents through structured
              roadmaps and curated content.
            </p>
          </div>

          <div className="flex gap-16">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Platform</h4>
              <nav className="flex flex-col gap-2">
                <Link href="/roadmaps" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Roadmaps
                </Link>
                <Link href="/problems" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Problems
                </Link>
              </nav>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Community</h4>
              <nav className="flex flex-col gap-2">
                <a
                  href="https://github.com/kshailen/agent-foundry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                  GitHub
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Agent Foundry. All rights reserved.
          Licensed under GPL-3.0.
        </p>
      </div>
    </footer>
  );
}
