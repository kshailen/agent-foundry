const SCHEME_PATTERN = /^[a-zA-Z][a-zA-Z\d+.-]*:/;
const NOTEBOOK_ALLOWED_HOSTS = new Set(["colab.research.google.com", "github.com"]);
const SAFE_PROTOCOLS = new Set(["http:", "https:"]);

function normalizeHost(hostname: string): string {
  return hostname.toLowerCase().startsWith("www.") ? hostname.slice(4).toLowerCase() : hostname.toLowerCase();
}

function parseAbsoluteUrl(value: string): URL | null {
  const canParse = (URL as typeof URL & { canParse?: (url: string, base?: string) => boolean }).canParse;
  if (typeof canParse === "function" && !canParse(value)) return null;
  return new URL(value);
}

export function sanitizeHref(href: string | null | undefined): string | null {
  if (!href) return null;

  const value = href.trim();
  if (!value || value.startsWith("//")) return null;

  if (value.startsWith("#") || value.startsWith("/")) return value;
  if (!SCHEME_PATTERN.test(value)) return value;

  const parsed = parseAbsoluteUrl(value);
  if (!parsed) return null;
  if (!SAFE_PROTOCOLS.has(parsed.protocol)) return null;
  if (parsed.username || parsed.password) return null;

  return parsed.toString();
}

export function sanitizeNotebookUrl(href: string | null | undefined): string | null {
  const safeHref = sanitizeHref(href);
  if (!safeHref || !SCHEME_PATTERN.test(safeHref)) return null;

  const parsed = parseAbsoluteUrl(safeHref);
  if (!parsed) return null;
  if (parsed.protocol !== "https:") return null;

  const host = normalizeHost(parsed.hostname);
  if (!NOTEBOOK_ALLOWED_HOSTS.has(host)) return null;
  if (host === "github.com" && !parsed.pathname.toLowerCase().endsWith(".ipynb")) return null;

  return parsed.toString();
}
