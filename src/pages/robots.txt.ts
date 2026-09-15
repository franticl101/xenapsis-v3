import type { APIRoute } from 'astro';
import { SITE, abs } from '../lib/site';

/**
 * Generated rather than hand-written so the sitemap reference can never drift
 * from the real origin. The reference audit found a robots.txt that named no
 * sitemap at all, beside a sitemap URL that returned 404.
 */
export const GET: APIRoute = () => {
  const body = [
    '# Every page here is meant to be indexed.',
    'User-agent: *',
    'Allow: /',
    '',
    '# Search result pages carry no unique content.',
    'Disallow: /search/?q=',
    '',
    `Sitemap: ${abs('/sitemap-index.xml')}`,
    `Host: ${SITE.url.replace(/^https?:\/\//, '')}`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
