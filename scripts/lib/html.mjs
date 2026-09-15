/**
 * Minimal HTML readers used by the SEO audit.
 *
 * Extracted from the audit script so they can be unit-tested directly: an
 * attribute parser that silently truncates is worse than no audit at all,
 * because it reports confident failures about pages that are fine.
 */

/** All opening tags of a given name, as raw strings. */
export function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) ?? [];
}

/**
 * Read an attribute value, matching the closing quote to the opening one.
 * A naive `[^"']*` character class stops at the first quote of either kind,
 * so it truncates any value containing an apostrophe.
 * Returns undefined when the attribute is absent, and '' when it is empty —
 * callers rely on that distinction (a missing alt is a fault, an empty one is
 * a valid decorative image).
 */
export function attr(tag, name) {
  // Lookbehind on whitespace rather than \b: a word boundary also matches
  // inside a hyphenated attribute, so \bcontent= would read data-content.
  return tag.match(new RegExp(`(?<=\\s)${name}=(["'])([\\s\\S]*?)\\1`, 'i'))?.[2];
}

/** Content of the first <meta> whose `key` attribute equals `value`. */
export function metaContent(html, key, value) {
  for (const tag of tags(html, 'meta')) {
    if (attr(tag, key)?.toLowerCase() === value) return attr(tag, 'content');
  }
  return undefined;
}

/** Text of every element of a given name, with inner markup stripped. */
export function textOf(html, name) {
  const found = html.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, 'gi')) ?? [];
  return found.map((el) => el.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
}

/** Approximate indexable word count: body text with script and style removed. */
export function wordCount(html) {
  const bodyAt = html.indexOf('<body');
  const body = bodyAt === -1 ? html : html.slice(bodyAt);
  return body
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}
