"use client";

import { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeBlock({
  children,
  className,
  ...props
}: React.ComponentProps<"pre">) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copyCode = () => {
    const code = preRef.current?.textContent ?? "";
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative mb-4">
      <button
        onClick={copyCode}
        className="absolute right-3 top-3 z-10 rounded-md border border-border/40 bg-background/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      <pre
        ref={preRef}
        className={cn(
          "overflow-x-auto rounded-lg border border-border/60 bg-[#0d1117] p-4 font-mono text-sm",
          className
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
