import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE, abs } from '../lib/site';

/**
 * Feed for the guides collection. Sorted newest-first by publication date so
 * readers and aggregators see genuinely recent work at the top.
 */
export async function GET(context: APIContext) {
  const guides = (await getCollection('guides')).sort(
    (a, b) => Date.parse(b.data.published) - Date.parse(a.data.published),
  );

  return rss({
    title: `${SITE.name} guides`,
    description: 'Plain guides to personality testing: what the research supports, how to read a result, and what these instruments cannot do.',
    site: context.site ?? SITE.url,
    trailingSlash: true,
    items: guides.map((guide) => ({
      title: guide.data.title,
      description: guide.data.summary,
      pubDate: new Date(`${guide.data.published}T00:00:00Z`),
      link: abs(`/guides/${guide.id}/`),
    })),
    customData: `<language>en-us</language>`,
  });
}
