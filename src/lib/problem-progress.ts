"use client";
import { useState, useEffect, useCallback } from "react";

export type ProblemStatus = "unattempted" | "attempted" | "solved";

interface ProblemProgressData {
  status: ProblemStatus;
  checkedCriteria: string[];
}

const STORAGE_KEY = "agent-foundry-problem-progress";

function getStoredProgress(): Record<string, ProblemProgressData> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, ProblemProgressData>;
  } catch {
    return {};
  }
}

export function useProblemProgress() {
  const [progress, setProgress] = useState<Record<string, ProblemProgressData>>({});

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setProgress(getStoredProgress());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const getStatus = useCallback(
    (slug: string): ProblemStatus => progress[slug]?.status ?? "unattempted",
    [progress],
  );

  const setStatus = useCallback((slug: string, status: ProblemStatus) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        [slug]: { ...prev[slug], status, checkedCriteria: prev[slug]?.checkedCriteria ?? [] },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const getCheckedCriteria = useCallback(
    (slug: string): string[] => progress[slug]?.checkedCriteria ?? [],
    [progress],
  );

  const toggleCriterion = useCallback((slug: string, criterionId: string) => {
    setProgress((prev) => {
      const current = prev[slug] ?? { status: "unattempted", checkedCriteria: [] };
      const checked = current.checkedCriteria.includes(criterionId)
        ? current.checkedCriteria.filter((id) => id !== criterionId)
        : [...current.checkedCriteria, criterionId];
      const next = { ...prev, [slug]: { ...current, checkedCriteria: checked } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const stats = {
    solved: Object.values(progress).filter((p) => p.status === "solved").length,
    attempted: Object.values(progress).filter((p) => p.status === "attempted").length,
    total: Object.keys(progress).length,
  };

  return { getStatus, setStatus, getCheckedCriteria, toggleCriterion, stats };
}
