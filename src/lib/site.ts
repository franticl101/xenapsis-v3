/**
 * Single source of truth for site identity.
 *
 * The reference audit found protocol-relative canonicals ("//example.com/page")
 * and a site with no consistent origin. Every URL helper here returns an
 * absolute https:// URL derived from one constant, so that class of bug
 * cannot reappear.
 */
export const SITE = {
  url: (import.meta.env.PUBLIC_SITE_URL ?? 'https://xenapsis.com').replace(/\/$/, ''),
  name: 'Xenapsis',
  legalName: 'Xenapsis',
  tagline: 'Free personality tests. No email, no account, no paywall.',
  description:
    'Free personality and psychometric tests with instant percentage-strength results. No email address, no account, and no paywall — your results appear the moment you finish.',
  locale: 'en_US',
  lang: 'en',
  twitter: '@xenapsis',
  founded: '2026',
} as const;

/** Absolute URL for any internal path. Always https://, always trailing slash. */
export function abs(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = `/${String(path).replace(/^\/+/, '')}`;
  const withSlash = clean.endsWith('/') || /\.[a-z0-9]+$/i.test(clean) ? clean : `${clean}/`;
  return `${SITE.url}${withSlash}`;
}

/** Stable @id for JSON-LD nodes so entities can reference each other. */
export function nodeId(path: string, fragment: string): string {
  return `${abs(path)}#${fragment}`;
}

export const ORG_ID = `${SITE.url}/#organization`;
export const SITE_ID = `${SITE.url}/#website`;
