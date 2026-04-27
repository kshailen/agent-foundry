export type ProblemDifficulty = "easy" | "medium" | "hard";

export type ProblemCategory =
  | "tool-calling"
  | "prompt-design"
  | "multi-agent"
  | "error-recovery"
  | "guardrails"
  | "rag"
  | "memory"
  | "cost-optimization"
  | "evaluation"
  | "orchestration";

export type Framework =
  | "langchain"
  | "crewai"
  | "openai-agents-sdk"
  | "langgraph";

export interface EvaluationCriterion {
  id: string;
  label: string;
  description: string;
}

export interface ProblemMeta {
  slug: string;
  number: number;
  title: string;
  difficulty: ProblemDifficulty;
  categories: ProblemCategory[];
  frameworks: Framework[];
  constraints: string[];
  hints: string[];
  starterCode: Partial<Record<Framework, string>>;
  colabUrls: Partial<Record<Framework, string>>;
  evaluationCriteria: EvaluationCriterion[];
}

export const CATEGORY_LABELS: Record<ProblemCategory, string> = {
  "tool-calling": "Tool Calling",
  "prompt-design": "Prompt Design",
  "multi-agent": "Multi-Agent",
  "error-recovery": "Error Recovery",
  guardrails: "Guardrails",
  rag: "RAG",
  memory: "Memory",
  "cost-optimization": "Cost Optimization",
  evaluation: "Evaluation",
  orchestration: "Orchestration",
};

export const FRAMEWORK_LABELS: Record<Framework, string> = {
  langchain: "LangChain",
  crewai: "CrewAI",
  "openai-agents-sdk": "OpenAI Agents SDK",
  langgraph: "LangGraph",
};
