import path from "path";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isSafeSlug(slug: string): boolean {
  return slug.length > 0 && slug.length <= 200 && SLUG_PATTERN.test(slug);
}

export function resolvePathWithinRoot(rootDir: string, parts: string[]): string | null {
  const root = path.resolve(rootDir);
  const resolved = path.resolve(root, ...parts);
  const relative = path.relative(root, resolved);

  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;
  return resolved;
}
