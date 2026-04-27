# Agent Foundry

**Open-source platform to learn about AI Agents through structured roadmaps and curated content.**

**Live:** 

---

## What is Agent Foundry?

Agent Foundry is a free, open-source learning platform — built specifically for developers who want to master AI agent frameworks. It provides structured roadmaps with hands-on code examples covering LangChain, CrewAI, OpenAI Agents SDK, LangGraph, and more.

## Roadmaps

| Roadmap | Topics | Description |
|---------|--------|-------------|
| **LangChain** | 12 | Chains, agents, tools, memory, RAG, and production patterns |
| **CrewAI** | 8 | Multi-agent orchestration, roles, tasks, and processes |
| **OpenAI Agents SDK** | 8 | Function calling, handoffs, guardrails, and the agent loop |
| **LangGraph** | 8 | Stateful agent graphs, nodes, edges, and persistence |

Each roadmap is organized into sections with topics tagged by difficulty level (Beginner, Intermediate, Advanced).

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, React Server Components)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theming:** [next-themes](https://github.com/pacocoursey/next-themes) (dark/light mode)
- **Content:** MDX files rendered via [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- **Deployment:** [Vercel](https://vercel.com/)

## Project Structure

```
agent-foundry/
├── content/
│   └── roadmaps/
│       ├── langchain/          # meta.json + topic .mdx files
│       ├── crewai/
│       ├── openai-agents-sdk/
│       └── langgraph/
├── src/
│   ├── app/
│   │   ├── page.tsx            # Landing page
│   │   └── roadmaps/
│   │       ├── page.tsx        # Roadmaps index
│   │       └── [slug]/
│   │           ├── page.tsx    # Roadmap detail (structured sheet)
│   │           └── [topicSlug]/
│   │               └── page.tsx # Topic page (MDX content)
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── roadmap-card.tsx
│   │   ├── topic-row.tsx
│   │   ├── difficulty-badge.tsx
│   │   ├── mdx-content.tsx
│   │   └── topic-nav.tsx
│   └── lib/
│       ├── content.ts          # Filesystem content loading utilities
│       ├── types.ts            # TypeScript types
│       └── utils.ts            # shadcn utility
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/kshailen/agent-foundry.git
cd agent-foundry
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
```

## Adding Content

All content lives in the `content/roadmaps/` directory. To add a new roadmap:

1. Create a new folder under `content/roadmaps/` (e.g., `content/roadmaps/autogen/`)
2. Add a `meta.json` defining the roadmap structure:

```json
{
  "title": "AutoGen",
  "description": "Learn multi-agent conversations with AutoGen",
  "icon": "bot",
  "sections": [
    {
      "title": "Getting Started",
      "topics": [
        { "slug": "introduction", "title": "What is AutoGen?", "difficulty": "beginner" }
      ]
    }
  ]
}
```

3. Create `.mdx` files for each topic slug (e.g., `introduction.mdx`)
4. The new roadmap appears automatically on the site

## Deployment

The project is deployed on [Vercel](https://vercel.com/) with automatic deployments on every push to `main`.

### Deploy Your Own

1. Fork this repository
2. Go to [vercel.com/new](https://vercel.com/new) and import your forked repo
3. Vercel auto-detects Next.js — no configuration needed
4. Click **Deploy** and your site will be live in under a minute

Alternatively, deploy via the Vercel CLI:

```bash
npm install -g vercel
vercel login
vercel --prod
```

Every subsequent `git push` to `main` triggers an automatic production deployment. Pull requests get preview deployments with unique URLs for testing changes before merging.

### Build Output

All pages are statically generated at build time (SSG), resulting in fast load times and zero server costs on Vercel's free tier:

- `/` — Static landing page
- `/roadmaps` — Static roadmaps index
- `/roadmaps/[slug]` — Pre-rendered per roadmap via `generateStaticParams`
- `/roadmaps/[slug]/[topicSlug]` — Pre-rendered per topic via `generateStaticParams`

## Contributing

Contributions are welcome! You can:

- Add new topic content (MDX files) to existing roadmaps
- Create entirely new roadmaps for other AI agent frameworks
- Improve existing content, fix errors, or enhance explanations
- Suggest features or report issues via GitHub Issues

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).
