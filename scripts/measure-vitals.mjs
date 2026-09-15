/**
 * Core Web Vitals measurement against the built output.
 *
 * The reference audit had to leave its Core Web Vitals row as "not measured".
 * This makes the numbers a build artefact instead: LCP, CLS and total transfer
 * are measured on representative pages and checked against budgets, so a
 * regression is visible in CI rather than in a ranking drop months later.
 *
 * Run with: npm run vitals   (requires `npm run build` first)
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { chromium } from 'playwright';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const PORT = Number(process.env.VITALS_PORT ?? 4400);
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain' };

/** Google's "good" thresholds, with transfer budgets of our own. */
const BUDGETS = { lcpMs: 2500, cls: 0.1, transferKb: 120, requests: 12 };

const PAGES = [
  { path: '/', label: 'Homepage' },
  { path: '/tests/personality-type/', label: '48-question test' },
  { path: '/types/infj/', label: 'Type profile' },
  { path: '/guides/are-personality-tests-accurate/', label: 'Guide article' },
];

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    let path = join(DIST, decodeURIComponent(url.pathname));
    if (url.pathname.endsWith('/')) path = join(path, 'index.html');
    const body = await readFile(path);
    const type = MIME[extname(path)] ?? 'application/octet-stream';
    // Compress text responses the way any real host would, so the transfer
    // figures below reflect what a visitor actually downloads.
    const compressible = /^(text\/|application\/(javascript|xml|json))/.test(type);
    if (compressible && /\bgzip\b/.test(req.headers['accept-encoding'] ?? '')) {
      const gz = gzipSync(body, { level: 9 });
      res.writeHead(200, { 'content-type': type, 'content-encoding': 'gzip', 'content-length': gz.length });
      res.end(gz);
    } else {
      res.writeHead(200, { 'content-type': type });
      res.end(body);
    }
  } catch {
    res.writeHead(404).end('not found');
  }
});
await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const results = [];

for (const { path, label } of PAGES) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  let transfer = 0;
  let requests = 0;
  page.on('response', async (response) => {
    requests += 1;
    try {
      // content-length is the encoded (compressed) size; response.body() would
      // be decoded and would overstate what crossed the wire.
      const encoded = Number(response.headers()['content-length']);
      transfer += Number.isFinite(encoded) ? encoded : (await response.body()).length;
    } catch { /* redirects and aborted bodies are not counted */ }
  });

  // Register observers before navigation so no entry is missed.
  await page.addInitScript(() => {
    window.__vitals = { lcp: 0, cls: 0 };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) window.__vitals.lcp = entry.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__vitals.cls += entry.value;
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });

  await page.goto(`http://127.0.0.1:${PORT}${path}`, { waitUntil: 'networkidle' });
  // Settle: give late shifts (fonts, images, script-driven layout) a chance to register.
  await page.evaluate(() => new Promise((r) => setTimeout(r, 600)));

  const vitals = await page.evaluate(() => window.__vitals);
  const domNodes = await page.evaluate(() => document.getElementsByTagName('*').length);

  results.push({
    label,
    path,
    lcp: Math.round(vitals.lcp),
    cls: Number(vitals.cls.toFixed(4)),
    transferKb: Number((transfer / 1024).toFixed(1)),
    requests,
    domNodes,
  });
  await context.close();
}

await browser.close();
server.close();

const pad = (value, width) => String(value).padEnd(width);
console.log('\nCore Web Vitals (local, unthrottled, gzipped — treat as a floor, not field data)\n');
console.log(`  ${pad('Page', 26)}${pad('LCP', 9)}${pad('CLS', 9)}${pad('Transfer', 11)}${pad('Reqs', 6)}DOM`);
console.log(`  ${'-'.repeat(69)}`);

let failed = 0;
for (const r of results) {
  const bad = [];
  if (r.lcp > BUDGETS.lcpMs) bad.push('LCP');
  if (r.cls > BUDGETS.cls) bad.push('CLS');
  if (r.transferKb > BUDGETS.transferKb) bad.push('transfer');
  if (r.requests > BUDGETS.requests) bad.push('requests');
  if (bad.length) failed += 1;
  console.log(
    `  ${pad(r.label, 26)}${pad(`${r.lcp}ms`, 9)}${pad(r.cls, 9)}${pad(`${r.transferKb}KB`, 11)}${pad(r.requests, 6)}${r.domNodes}` +
    (bad.length ? `   OVER BUDGET: ${bad.join(', ')}` : ''),
  );
}

console.log(`\n  Budgets: LCP < ${BUDGETS.lcpMs}ms · CLS < ${BUDGETS.cls} · transfer < ${BUDGETS.transferKb}KB · requests <= ${BUDGETS.requests}\n`);
if (failed > 0) {
  console.error(`${failed} page(s) over budget.\n`);
  process.exit(1);
}
console.log('All pages within budget.\n');
