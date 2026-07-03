/**
 * Convert a tag name to a URL-safe slug.
 * Replaces '/' with '-' to handle tags like 'CI/CD'.
 */
export function tagToSlug(tag: string): string {
  return tag.replace(/\//g, '-');
}

/**
 * Generate a tag page URL from a tag name.
 */
export function getTagUrl(tag: string): string {
  return `/tags/${encodeURIComponent(tagToSlug(tag))}`;
}
