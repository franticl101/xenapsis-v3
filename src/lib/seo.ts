/**
 * Build-time SEO guards.
 *
 * The reference audit's single most damaging finding was a homepage whose
 * <title> was the word "Home", plus pages shipping with no meta description
 * at all. Those are not mistakes anyone makes on purpose — they happen when
 * nothing in the pipeline objects.
 *
 * These validators run during `astro build` and throw, so a page missing or
 * fumbling its metadata fails the build instead of quietly ranking badly.
 */

/** Titles that describe the CMS, not the page. Straight from the audit. */
const GENERIC_TITLES = new Set([
  'home', 'homepage', 'index', 'tests', 'test', 'faq', 'faqs', 'blog', 'page',
  'untitled', 'welcome', 'main', 'default', 'guides', 'types', 'compare', 'new page',
]);

export const TITLE_MIN = 15;
export const TITLE_MAX = 65;
export const DESC_MIN = 70;
export const DESC_MAX = 165;

function fail(page: string, problem: string, fix: string): never {
  throw new Error(
    `\n\n  SEO build guard failed for: ${page}\n` +
      `  Problem: ${problem}\n` +
      `  Fix:     ${fix}\n`,
  );
}

export function assertTitle(raw: unknown, page: string, composed?: string): string {
  if (typeof raw !== 'string' || raw.trim() === '') {
    fail(page, 'No <title> was supplied.', 'Pass a descriptive `title` prop to BaseLayout.');
  }
  const t = raw.trim();
  const rendered = (composed ?? t).trim();
  if (GENERIC_TITLES.has(t.toLowerCase())) {
    fail(
      page,
      `Title "${t}" is generic — it describes the template, not the page.`,
      'Describe what the visitor gets, and include the term they searched for.',
    );
  }
  if (t.length < TITLE_MIN) {
    fail(page, `Title "${t}" is ${t.length} chars; too short to carry a keyword.`, `Use at least ${TITLE_MIN} characters.`);
  }
  if (rendered.length > TITLE_MAX) {
    fail(
      page,
      `Rendered title is ${rendered.length} chars ("${rendered}") and will be truncated in results.`,
      `Trim so the title plus the brand suffix stays within ${TITLE_MAX} characters.`,
    );
  }
  return t;
}

export function assertDescription(description: unknown, page: string): string {
  if (typeof description !== 'string' || description.trim() === '') {
    fail(page, 'No meta description was supplied.', 'Pass a `description` prop to BaseLayout.');
  }
  const d = description.trim();
  if (d.length < DESC_MIN) {
    fail(page, `Meta description is ${d.length} chars; too thin to earn a click.`, `Write at least ${DESC_MIN} characters.`);
  }
  if (d.length > DESC_MAX) {
    fail(page, `Meta description is ${d.length} chars and will be truncated.`, `Trim to ${DESC_MAX} characters or fewer.`);
  }
  return d;
}
