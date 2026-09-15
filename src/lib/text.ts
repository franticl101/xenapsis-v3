/** Words per minute used for reading-time estimates. */
const WORDS_PER_MINUTE = 220;

/**
 * Word count from raw Markdown, with syntax stripped so the figure reflects
 * prose rather than punctuation. Used for Article.wordCount in JSON-LD and
 * for the reading-time label.
 */
export function wordCount(markdown: string): number {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|~-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

export function readingTime(markdown: string): number {
  return Math.max(1, Math.round(wordCount(markdown) / WORDS_PER_MINUTE));
}
