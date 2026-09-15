/**
 * Post-build SEO audit.
 *
 * Every check here corresponds to a finding in the reference audit that
 * prompted this build. The BaseLayout guards catch metadata problems at
 * render time; this catches the ones that only exist once the whole site is
 * on disk — duplicate titles across pages, broken internal links, a missing
 * sitemap, images without dimensions.
 *
 * Exits non-zero on any error, so a regression fails CI rather than waiting
 * for someone to commission another audit.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const DIST = join(ROOT, 'dist');

const LIMITS = {
  titleMin: 15,
  titleMax: 65,
  descMin: 70,
  descMax: 165,
  htmlGzipKb: 60,
  cssGzipKb: 30,
  jsGzipKb: 30,
};

const GENERIC_TITLES = new Set(['home', 'tests', 'faq', 'blog', 'index', 'page', 'guides', 'types', 'compare', 'careers']);

const errors = [];
const warnings = [];
const fail = (page, message) => errors.push({ page, message });
const warn = (page, message) => warnings.push({ page, message });

/* ------------------------------ helpers ------------------------------ */

async function walk(dir, predicate, found = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, predicate, found);
    else if (predicate(full)) found.push(full);
  }
  return found;
}

const attr = (tag, name) => tag.match(new RegExp(`${name}=["']([^"']*)["']`, 'i'))?.[1];
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) ?? [];

function metaContent(html, key, value) {
  for (const tag of tags(html, 'meta')) {
    if (attr(tag, key)?.toLowerCase() === value) return attr(tag, 'content');
  }
  return undefined;
}

/** Strip tags, scripts and styles to approximate indexable word count. */
function wordCount(html) {
  const body = html.slice(html.indexOf('<body'));
  return body
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

/** "/dist/tests/index.html" -> "/tests/" */
function routeOf(file) {
  const rel = relative(DIST, file).replace(/\\/g, '/');
  return `/${rel.replace(/index\.html$/, '')}`;
}

/* ------------------------------ run ------------------------------ */

const htmlFiles = await walk(DIST, (f) => f.endsWith('.html'));
if (htmlFiles.length === 0) {
  console.error('No HTML found in dist/. Run `astro build` first.');
  process.exit(1);
}

const seenTitles = new Map();
const seenDescriptions = new Map();
const routes = new Set();
const linksToCheck = [];

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const page = routeOf(file);
  routes.add(page);
  const head = html.slice(0, html.indexOf('</head>') + 7);
  const isNoindex = (metaContent(html, 'name', 'robots') ?? '').includes('noindex');

  /* -- title: the reference audit's headline finding was a page titled "Home" -- */
  const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if (!title) fail(page, 'missing <title>');
  else {
    const bare = title.split('|')[0].trim().toLowerCase();
    if (GENERIC_TITLES.has(bare)) fail(page, `generic title: "${title}"`);
    if (title.length < LIMITS.titleMin) fail(page, `title too short (${title.length}): "${title}"`);
    if (title.length > LIMITS.titleMax) fail(page, `title too long (${title.length}): "${title}"`);
    if (!isNoindex) {
      const clash = seenTitles.get(title);
      if (clash) fail(page, `duplicate title, also used by ${clash}`);
      else seenTitles.set(title, page);
    }
  }

  /* -- meta description -- */
  const description = metaContent(html, 'name', 'description');
  if (!description) fail(page, 'missing meta description');
  else {
    if (description.length < LIMITS.descMin) fail(page, `description too short (${description.length})`);
    if (description.length > LIMITS.descMax) fail(page, `description too long (${description.length})`);
    if (!isNoindex) {
      const clash = seenDescriptions.get(description);
      if (clash) fail(page, `duplicate description, also used by ${clash}`);
      else seenDescriptions.set(description, page);
    }
  }

  /* -- canonical: must be absolute https, never protocol-relative -- */
  const canonical = tags(head, 'link').find((t) => attr(t, 'rel') === 'canonical');
  const href = canonical && attr(canonical, 'href');
  if (!href) fail(page, 'missing canonical link');
  else if (href.startsWith('//')) fail(page, `protocol-relative canonical: ${href}`);
  else if (!href.startsWith('https://')) fail(page, `canonical is not absolute https: ${href}`);
  // A noindex page's canonical is not a ranking signal, and error documents are
  // served from every missing path rather than from one route, so self-reference
  // is only meaningful for indexable pages.
  else if (!isNoindex && !href.endsWith(page)) fail(page, `canonical does not self-reference: ${href}`);

  /* -- hreflang -- */
  const hreflangs = tags(head, 'link').filter((t) => attr(t, 'hreflang'));
  if (hreflangs.length === 0) warn(page, 'no hreflang annotations');
  else if (!hreflangs.some((t) => attr(t, 'hreflang') === 'x-default')) warn(page, 'no x-default hreflang');

  /* -- headings -- */
  const h1s = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi) ?? [];
  if (h1s.length === 0) fail(page, 'no <h1>');
  if (h1s.length > 1) fail(page, `${h1s.length} <h1> elements; expected exactly 1`);
  const h1Text = h1s[0]?.replace(/<[^>]+>/g, '').trim();
  if (h1Text && /try your traits|®|™/i.test(h1Text)) {
    fail(page, `<h1> looks like a site tagline rather than a page heading: "${h1Text}"`);
  }
  for (const heading of html.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi) ?? []) {
    const text = heading.replace(/<[^>]+>/g, '').trim().toLowerCase();
    if (['welcome', 'reset password', 'create account', 'log in', 'sign in'].includes(text)) {
      fail(page, `<h2> is interface chrome, not content: "${text}"`);
    }
  }

  /* -- images: alt text plus explicit dimensions so nothing shifts on load -- */
  for (const img of tags(html, 'img')) {
    if (attr(img, 'alt') === undefined) fail(page, `<img> without alt: ${img.slice(0, 80)}`);
    if (!attr(img, 'width') || !attr(img, 'height')) fail(page, `<img> without width/height (CLS risk): ${img.slice(0, 80)}`);
    if (!/loading=/.test(img)) warn(page, `<img> without loading attribute: ${img.slice(0, 60)}`);
  }

  /* -- structured data -- */
  const ld = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];
  if (ld.length === 0) fail(page, 'no JSON-LD structured data');
  for (const [, raw] of ld) {
    try {
      const parsed = JSON.parse(raw);
      const nodes = parsed['@graph'] ?? [parsed];
      if (!parsed['@context']) fail(page, 'JSON-LD missing @context');
      const types = nodes.map((n) => n['@type']);
      for (const required of ['Organization', 'WebSite']) {
        if (!types.includes(required)) fail(page, `JSON-LD missing ${required}`);
      }
    } catch (error) {
      fail(page, `invalid JSON-LD: ${error.message}`);
    }
  }

  /* -- social -- */
  for (const property of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type']) {
    if (!metaContent(html, 'property', property)) fail(page, `missing ${property}`);
  }
  if (!metaContent(html, 'name', 'twitter:card')) warn(page, 'missing twitter:card');

  /* -- viewport -- */
  if (!metaContent(html, 'name', 'viewport')) fail(page, 'missing viewport meta');

  /* -- thin content -- */
  const words = wordCount(html);
  if (!isNoindex && words < 300) warn(page, `thin content: ~${words} words`);

  /* -- weight budget -- */
  const gzipKb = gzipSync(Buffer.from(html)).length / 1024;
  if (gzipKb > LIMITS.htmlGzipKb) warn(page, `${gzipKb.toFixed(1)}KB gzipped exceeds ${LIMITS.htmlGzipKb}KB budget`);

  /* -- collect internal links for resolution -- */
  for (const anchor of tags(html, 'a')) {
    const target = attr(anchor, 'href');
    if (!target || /^(https?:|mailto:|tel:|#)/i.test(target)) continue;
    linksToCheck.push({ page, target: target.split('#')[0] });
  }
}

/* -- internal links must resolve to a built route or a real file -- */
for (const { page, target } of linksToCheck) {
  if (!target) continue;
  if (routes.has(target)) continue;
  const candidate = join(DIST, target);
  try {
    const info = await stat(candidate);
    if (info.isFile()) continue;
  } catch { /* falls through to failure */ }
  fail(page, `broken internal link: ${target}`);
}

/* -- sitemap and robots: both 404'd on the audited site -- */
const sitemapIndex = join(DIST, 'sitemap-index.xml');
let sitemapUrls = 0;
try {
  const index = await readFile(sitemapIndex, 'utf8');
  for (const [, loc] of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const name = loc.split('/').pop();
    const body = await readFile(join(DIST, name), 'utf8');
    sitemapUrls += [...body.matchAll(/<loc>/g)].length;
  }
} catch (error) {
  fail('/sitemap-index.xml', `sitemap missing or unreadable: ${error.message}`);
}
const indexable = [...routes].length;
if (sitemapUrls && sitemapUrls < indexable - 2) {
  warn('/sitemap-index.xml', `sitemap lists ${sitemapUrls} URLs for ${indexable} routes`);
}

try {
  const robots = await readFile(join(DIST, 'robots.txt'), 'utf8');
  if (!/^Sitemap:\s*https:\/\//mi.test(robots)) fail('/robots.txt', 'does not reference an absolute sitemap URL');
} catch {
  fail('/robots.txt', 'missing');
}

/* -- the Open Graph image the meta tags promise must actually exist -- */
try {
  await stat(join(DIST, 'og', 'xenapsis-default.png'));
} catch {
  fail('/og/xenapsis-default.png', 'referenced by og:image but not present in the build');
}

/* -- asset budgets -- */
for (const asset of await walk(DIST, (f) => ['.css', '.js'].includes(extname(f)))) {
  const gzipKb = gzipSync(await readFile(asset)).length / 1024;
  const budget = extname(asset) === '.css' ? LIMITS.cssGzipKb : LIMITS.jsGzipKb;
  if (gzipKb > budget) warn(relative(DIST, asset), `${gzipKb.toFixed(1)}KB gzipped exceeds ${budget}KB budget`);
}

/* ------------------------------ report ------------------------------ */

const group = (list) => {
  const byPage = new Map();
  for (const { page, message } of list) {
    if (!byPage.has(page)) byPage.set(page, []);
    byPage.get(page).push(message);
  }
  return byPage;
};

console.log(`\nSEO audit — ${htmlFiles.length} pages, ${sitemapUrls} sitemap URLs, ${linksToCheck.length} internal links\n`);

if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const [page, messages] of group(warnings)) {
    console.log(`  ${page}`);
    for (const message of messages) console.log(`    - ${message}`);
  }
  console.log('');
}

if (errors.length) {
  console.error(`Errors (${errors.length}):`);
  for (const [page, messages] of group(errors)) {
    console.error(`  ${page}`);
    for (const message of messages) console.error(`    - ${message}`);
  }
  console.error(`\nFAILED — ${errors.length} SEO error(s).\n`);
  process.exit(1);
}

console.log(`PASSED — no SEO errors across ${htmlFiles.length} pages.\n`);
