export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Topic {
  slug: string;
  title: string;
  difficulty: Difficulty;
  videoUrl?: string;
  notebookUrl?: string;
}

export interface Section {
  title: string;
  topics: Topic[];
}

export interface RoadmapMeta {
  slug: string;
  title: string;
  description: string;
  icon: string;
  sections: Section[];
}
