/**
 * End-to-end check of the assessment runtime against the real built output.
 *
 * Serves `dist/` and drives Chromium through each test, asserting the
 * behaviour that unit tests cannot reach: that the delegated listener wires
 * every input, that the submit gate opens only on completion, that results
 * render, and that restarting genuinely clears state.
 *
 * Run with: npm run test:e2e   (requires `npm run build` first)
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const DIST = new URL('../../dist/', import.meta.url).pathname;
const PORT = Number(process.env.E2E_PORT ?? 4399);
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.json': 'application/json', '.txt': 'text/plain', '.png': 'image/png' };

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    let path = join(DIST, decodeURIComponent(url.pathname));
    if (url.pathname.endsWith('/')) path = join(path, 'index.html');
    const body = await readFile(path);
    res.writeHead(200, { 'content-type': MIME[extname(path)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
  }
});

await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
const BASE = `http://127.0.0.1:${PORT}`;

/**
 * Honour a pre-installed browser when one is provided (CI images commonly ship
 * Chromium at a fixed path), otherwise fall back to Playwright's own download.
 */
const executablePath = process.env.CHROMIUM_PATH || undefined;
const browser = await chromium.launch(executablePath ? { executablePath } : {});
const page = await browser.newPage();
const consoleErrors = [];
page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e}`));
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(`console: ${m.text()}`); });

const checks = [];
const check = (name, fn) => checks.push({ name, fn });

/** Answer every question with `pick(index)` and submit. */
async function complete(path, pick) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'load' });
  const count = await page.locator('.q[role=radiogroup]').count();
  for (let i = 0; i < count; i += 1) {
    await page.locator(`#q${i}-${pick(i)}`).check({ force: true });
  }
  await page.locator('[data-submit]').click();
  await page.locator('[data-results] h2').waitFor({ state: 'visible' });
  return count;
}

check('submit is gated until every question is answered', async () => {
  await page.goto(`${BASE}/tests/personality-type/`, { waitUntil: 'load' });
  assert.equal(await page.locator('[data-submit]').isDisabled(), true, 'submit should start disabled');

  const count = await page.locator('.q[role=radiogroup]').count();
  for (let i = 0; i < count - 1; i += 1) await page.locator(`#q${i}-2`).check({ force: true });
  assert.equal(await page.locator('[data-submit]').isDisabled(), true, 'still disabled with one unanswered');

  await page.locator(`#q${count - 1}-2`).check({ force: true });
  assert.equal(await page.locator('[data-submit]').isDisabled(), false, 'enabled once complete');
  assert.match(await page.locator('[data-progress-label]').textContent(), /48 of 48 answered/);
});

check('straight-line agreement returns a neutral profile, not an extreme', async () => {
  await complete('/tests/personality-type/', () => 4);
  const rows = await page.locator('[data-results] .result-row-head strong').allTextContents();
  assert.equal(rows.length, 4, 'four dichotomies reported');
  for (const row of rows) {
    const strength = Number(row.match(/(\d+)%/)[1]);
    assert.equal(strength, 0, `balanced keying should cancel out, got "${row}"`);
  }
  const notes = await page.locator('[data-results] .result-row-note').allTextContents();
  assert.ok(notes.every((n) => /near tie/.test(n)), 'each row should be described as a near tie');
});

check('a varied response pattern yields a valid four-letter type and links', async () => {
  await complete('/tests/personality-type/', (i) => [0, 4, 1, 3, 4, 0][i % 6]);
  const heading = await page.locator('[data-results] h2').textContent();
  const code = heading.match(/\b([EI][SN][TF][JP])\b/);
  assert.ok(code, `expected a four-letter type in "${heading}"`);
  const href = await page.locator('[data-results] a.btn-primary').getAttribute('href');
  assert.equal(href, `/types/${code[1].toLowerCase()}/`, 'result links to the matching type page');
  assert.equal(await page.locator('[data-results] .bar').count(), 4);
});

check('profile-mode tests rank their scales', async () => {
  await complete('/tests/career-fit/', (i) => (i % 3 === 0 ? 4 : 1));
  const rows = await page.locator('[data-results] .result-row-head strong').allTextContents();
  assert.equal(rows.length, 6, 'six Holland themes reported');
  const percents = rows.map((r) => Number(r.match(/(\d+)%/)[1]));
  const sorted = [...percents].sort((a, b) => b - a);
  assert.deepEqual(percents, sorted, 'scales must be ranked descending');
  assert.ok(percents.every((p) => p >= 0 && p <= 100), 'percentages within range');
});

check('all four assessments score without error', async () => {
  for (const path of ['/tests/personality-type/', '/tests/career-fit/', '/tests/risk-tolerance/', '/tests/assertiveness/']) {
    const count = await complete(path, (i) => i % 5);
    assert.ok(count > 0, `${path} rendered questions`);
    assert.equal(await page.locator('[data-test-form]').isHidden(), true, `${path} hides the form on results`);
  }
});

check('restarting clears every answer and restores the form', async () => {
  await complete('/tests/assertiveness/', () => 0);
  await page.locator('[data-restart]').click();
  assert.equal(await page.locator('[data-test-form]').isVisible(), true, 'form returns');
  assert.equal(await page.locator('input[type=radio]:checked').count(), 0, 'no answer survives a restart');
  assert.match(await page.locator('[data-progress-label]').textContent(), /^0 of \d+ answered$/);
  assert.equal(await page.locator('[data-submit]').isDisabled(), true, 'submit is gated again');
});

check('the runner ships no uncaught errors', async () => {
  assert.deepEqual(consoleErrors, [], `browser reported errors:\n${consoleErrors.join('\n')}`);
});

let failed = 0;
for (const { name, fn } of checks) {
  try {
    await fn();
    console.log(`  ok   ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`  FAIL ${name}\n${error.message.split('\n').map((l) => `       ${l}`).join('\n')}`);
  }
}

await browser.close();
server.close();
console.log(`\n${checks.length - failed}/${checks.length} e2e checks passed`);
process.exit(failed === 0 ? 0 : 1);
