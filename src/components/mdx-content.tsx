import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { CodeBlock } from "@/components/code-block";
import { sanitizeHref } from "@/lib/safe-url";

const EXTERNAL_HTTP_PATTERN = /^https?:\/\//i;

const components = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h1 className="mt-8 mb-4 text-3xl font-bold tracking-tight" {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="mt-8 mb-3 scroll-mt-20 border-b border-border/40 pb-2 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-6 mb-2 scroll-mt-20 text-xl font-semibold" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mb-4 leading-7 text-foreground/80" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul
      className="mb-4 ml-6 list-disc space-y-1 text-foreground/80"
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol
      className="mb-4 ml-6 list-decimal space-y-1 text-foreground/80"
      {...props}
    />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="leading-7" {...props} />
  ),
  code: ({ className, ...props }: React.ComponentProps<"code">) => {
    if (className?.includes("language-") || props["data-language" as keyof typeof props]) {
      return <code className={className} {...props} />;
    }
    return (
      <code
        className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-sm text-primary"
        {...props}
      />
    );
  },
  pre: (props: React.ComponentProps<"pre">) => <CodeBlock {...props} />,
  table: (props: React.ComponentProps<"table">) => (
    <div className="mb-4 overflow-x-auto rounded-lg border border-border/60">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th
      className="border-b border-border/60 bg-muted/50 px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td
      className="border-b border-border/60 px-4 py-2 text-muted-foreground even:bg-muted/30"
      {...props}
    />
  ),
  tr: (props: React.ComponentProps<"tr">) => (
    <tr className="even:bg-muted/30" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  a: ({ href, ...props }: React.ComponentProps<"a">) => {
    const safeHref = sanitizeHref(href);
    if (!safeHref) {
      return (
        <span
          className="font-medium text-primary underline underline-offset-4"
          {...props}
        />
      );
    }

    const externalProps = EXTERNAL_HTTP_PATTERN.test(safeHref)
      ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
      : {};

    return (
      <a
        className="font-medium text-primary underline underline-offset-4 hover:no-underline"
        href={safeHref}
        {...externalProps}
        {...props}
      />
    );
  },
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mb-4 border-l-4 border-l-transparent bg-gradient-to-b from-primary/40 to-primary/10 pl-4 italic text-muted-foreground [border-image:linear-gradient(to_bottom,hsl(var(--primary)),hsl(var(--primary)/0.3))_1]"
      {...props}
    />
  ),
  hr: (props: React.ComponentProps<"hr">) => (
    <hr className="my-8 border-border/60" {...props} />
  ),
};

export function MDXContent({ source }: { source: string }) {
  return (
    <article>
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: "github-dark",
                  keepBackground: true,
                },
              ],
            ],
          },
        }}
      />
    </article>
  );
}
