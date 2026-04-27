import { Play } from "lucide-react";
import { sanitizeNotebookUrl } from "@/lib/safe-url";

interface ColabButtonProps {
  notebookUrl: string;
}

export function ColabButton({ notebookUrl }: ColabButtonProps) {
  const safeNotebookUrl = sanitizeNotebookUrl(notebookUrl);
  if (!safeNotebookUrl) return null;

  return (
    <a
      href={safeNotebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-500/20 dark:text-amber-400"
    >
      <Play className="h-3.5 w-3.5" />
      Open in Colab
    </a>
  );
}
