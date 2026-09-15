/**
 * Build a relocatable copy of dist/ for preview hosting.
 *
 * The real site links root-absolutely (`/tests/`), which only resolves when the
 * site owns the domain root. A preview host serves it from a base path instead,
 * so every internal link is rewritten relative to the page holding it, and
 * pointed at an explicit index.html rather than relying on the host resolving
 * directory URLs.
 *
 * dist/ is left untouched — this writes to preview/ so the deployable build and
 * the preview never diverge.
 */
import { mkdir, readdir, readFile, writeFile, copyFile, rm } from 'node:fs/promises';
import { join, dirname, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const DIST = join(ROOT, 'dist');
const OUT = join(ROOT, 'preview');

/**
 * Astro emits hashed assets to _astro/, but some static hosts reserve paths
 * beginning with an underscore for their own use. Renaming is confined to the
 * preview so the deployable build keeps Astro's conventional layout.
 */
const ASSET_DIR_FROM = '_astro/';
const ASSET_DIR_TO = 'assets/';

/** Strip a leading underscore from a file name for the same reason. */
const safeName = (name) => name.replace(/^_+/, '');

/** dist-relative path -> preview-relative path. */
function previewPath(rel) {
  const moved = rel.startsWith(ASSET_DIR_FROM) ? ASSET_DIR_TO + rel.slice(ASSET_DIR_FROM.length) : rel;
  const cut = moved.lastIndexOf('/');
  return cut === -1 ? safeName(moved) : `${moved.slice(0, cut + 1)}${safeName(moved.slice(cut + 1))}`;
}

async function walk(dir, found = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, found);
    else found.push(full);
  }
  return found;
}

/** Root-absolute "/a/b/" -> "../../a/b/index.html" for a page at the given depth. */
function relocate(target, depth) {
  const prefix = '../'.repeat(depth);
  if (target === '') return `${prefix}index.html`;
  if (target.endsWith('/')) return `${prefix}${target}index.html`;
  return `${prefix}${target}`;
}

function rewriteLinks(html, depth, renames) {
  let out = html.replace(/\b(href|src)="\/([^"]*)"/g, (_, attr, target) => `${attr}="${relocate(target, depth)}"`);
  for (const [from, to] of renames) out = out.split(from).join(to);
  return out;
}

/**
 * Preview-only glue for links the page creates at runtime.
 *
 * The assessment runtime builds its result links in the browser, so they are
 * still root-absolute when this script runs over the HTML. One shared JS bundle
 * serves pages at several depths, so it cannot carry a fixed prefix either.
 * This delegated handler resolves those links using the depth of the page it is
 * injected into, and is confined to the preview — the app keeps emitting the
 * canonical root-absolute paths a real deployment needs.
 */
function previewLinkShim(depth) {
  const prefix = '../'.repeat(depth);
  return `<script>(function(){var P=${JSON.stringify(prefix)};` +
    `document.addEventListener("click",function(e){` +
    `var a=e.target&&e.target.closest?e.target.closest('a[href^="/"]'):null;if(!a)return;` +
    `var t=a.getAttribute("href");if(t.indexOf("//")===0)return;e.preventDefault();` +
    `location.href=P+(t==="/"?"index.html":t.slice(1)+(t.slice(-1)==="/"?"index.html":""));` +
    `},true);})();<\/script>`;
}

/**
 * The artifact host wraps the entry page in its own document skeleton, so the
 * entry page ships as a fragment: title, stylesheets, then body content.
 * Every other page is served as the complete document it already is.
 */
/** The gallery wants a short product name, not the page's SEO title. */
const PREVIEW_TITLE = 'Upfront Personality Tests';

function toFragment(html) {
  const title = PREVIEW_TITLE;
  const styles = (html.match(/<link\b[^>]*rel="stylesheet"[^>]*>/gi) ?? []).join('\n');
  const bodyOpen = html.match(/<body[^>]*>/i);
  const body = bodyOpen
    ? html.slice(html.indexOf(bodyOpen[0]) + bodyOpen[0].length, html.lastIndexOf('</body>'))
    : html;
  return `<title>${title}</title>\n${styles}\n${body.trim()}\n`;
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const files = await walk(DIST);

/**
 * Path substitutions to apply inside every page, longest first so a directory
 * rename cannot partially shadow a file rename nested under it.
 */
const renames = [...new Set(files.map((f) => {
  const rel = relative(DIST, f).replace(/\\/g, '/');
  return rel === previewPath(rel) ? null : JSON.stringify([rel, previewPath(rel)]);
}).filter(Boolean))].map((entry) => JSON.parse(entry)).sort((a, b) => b[0].length - a[0].length);

let pages = 0;
let assets = 0;

for (const file of files) {
  const rel = relative(DIST, file).replace(/\\/g, '/');
  const dest = join(OUT, previewPath(rel));
  await mkdir(dirname(dest), { recursive: true });

  if (extname(file) !== '.html') {
    await copyFile(file, dest);
    assets += 1;
    continue;
  }

  const depth = rel.split('/').length - 1;
  const rewritten = rewriteLinks(await readFile(file, 'utf8'), depth, renames);
  const shim = previewLinkShim(depth);
  const withShim = rewritten.includes('</body>')
    ? rewritten.replace('</body>', `${shim}</body>`)
    : rewritten + shim;
  // toFragment keeps body content, so the shim inserted above survives the slice.
  await writeFile(dest, rel === 'index.html' ? toFragment(withShim) : withShim);
  pages += 1;
}

const remaining = (await Promise.all(
  (await walk(OUT)).filter((f) => f.endsWith('.html')).map(async (f) => {
    const hits = (await readFile(f, 'utf8')).match(/\b(?:href|src)="\/[^"]*"/g) ?? [];
    return hits.length;
  }),
)).reduce((a, b) => a + b, 0);

console.log(`[preview] ${pages} pages, ${assets} assets -> preview/`);
console.log(`[preview] unrewritten root-absolute links: ${remaining}`);
if (remaining > 0) process.exit(1);
