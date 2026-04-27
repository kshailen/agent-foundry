import { Badge } from "@/components/ui/badge";
import type { Difficulty } from "@/lib/types";
import { cn } from "@/lib/utils";

const config: Record<
  Difficulty,
  { label: string; className: string; dotColor: string }
> = {
  beginner: {
    label: "Beginner",
    className:
      "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    dotColor: "bg-green-500",
  },
  intermediate: {
    label: "Intermediate",
    className:
      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    dotColor: "bg-yellow-500",
  },
  advanced: {
    label: "Advanced",
    className:
      "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    dotColor: "bg-red-500",
  },
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { label, className } = config[difficulty];
  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}

export function DifficultyDot({
  difficulty,
  className,
}: {
  difficulty: Difficulty;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full",
        config[difficulty].dotColor,
        className
      )}
    />
  );
}
