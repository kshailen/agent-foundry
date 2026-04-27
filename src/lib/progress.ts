"use client";
import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "agent-foundry-progress";

function getStoredProgress(): Record<string, string[]> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, string[]>;
  } catch {
    return {};
  }
}

export function useProgress(roadmapSlug: string) {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const stored = getStoredProgress();
      setCompleted(stored[roadmapSlug] || []);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [roadmapSlug]);

  const toggleTopic = useCallback(
    (topicSlug: string) => {
      setCompleted((prev) => {
        const next = prev.includes(topicSlug)
          ? prev.filter((s) => s !== topicSlug)
          : [...prev, topicSlug];
        const stored = getStoredProgress();
        stored[roadmapSlug] = next;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        return next;
      });
    },
    [roadmapSlug],
  );

  const isCompleted = useCallback(
    (topicSlug: string) => completed.includes(topicSlug),
    [completed],
  );

  return { completed, toggleTopic, isCompleted, completedCount: completed.length };
}
