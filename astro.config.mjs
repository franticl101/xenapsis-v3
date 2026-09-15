import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical origin. Every absolute URL, canonical tag, sitemap entry and
// JSON-LD @id on the site derives from this one value.
const SITE = process.env.PUBLIC_SITE_URL ?? 'https://xenapsis.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thanks/'),
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        if (item.url === `${SITE}/`) item.priority = 1.0;
        else if (/\/(tests|types|compare|guides)\/$/.test(item.url)) item.priority = 0.9;
        else item.priority = 0.7;
        return item;
      },
    }),
  ],
});
