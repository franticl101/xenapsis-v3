/**
 * Renders the Open Graph share image to public/og/.
 *
 * Generated at build time from the same brand tokens as the site, so the
 * social card cannot drift from the design, and the 1200x630 dimensions
 * always match what the meta tags advertise.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const OUT_DIR = fileURLToPath(new URL('../public/og/', import.meta.url));
const WIDTH = 1200;
const HEIGHT = 630;

const BRAND = '#3b4ee0';
const INK = '#12161f';
const INK_SOFT = '#4a5265';
const BG = '#ffffff';

const card = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}"/>
  <rect width="${WIDTH}" height="14" fill="${BRAND}"/>

  <g transform="translate(88, 104)">
    <rect width="72" height="72" rx="18" fill="${BRAND}"/>
    <path d="M36 52V22M23.4 34.6 36 22l12.6 12.6" fill="none" stroke="#fff" stroke-width="6.3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="180" y="156" font-family="DejaVu Sans" font-size="44" font-weight="bold" fill="${INK}">Upfront</text>

  <text x="88" y="300" font-family="DejaVu Sans" font-size="66" font-weight="bold" fill="${INK}">Free personality tests</text>
  <text x="88" y="382" font-family="DejaVu Sans" font-size="66" font-weight="bold" fill="${BRAND}">that just give you</text>
  <text x="88" y="464" font-family="DejaVu Sans" font-size="66" font-weight="bold" fill="${BRAND}">the results</text>

  <text x="88" y="546" font-family="DejaVu Sans" font-size="30" fill="${INK_SOFT}">No email  ·  No account  ·  No paywall</text>
</svg>`;

await mkdir(OUT_DIR, { recursive: true });
const png = await sharp(Buffer.from(card)).png({ compressionLevel: 9 }).toBuffer();
await writeFile(new URL('upfront-default.png', `file://${OUT_DIR}`), png);

const { width, height } = await sharp(png).metadata();
console.log(`[og] upfront-default.png  ${width}x${height}  ${(png.length / 1024).toFixed(1)} KB`);
if (width !== WIDTH || height !== HEIGHT) {
  console.error(`[og] dimensions do not match the meta tags (${WIDTH}x${HEIGHT})`);
  process.exit(1);
}
