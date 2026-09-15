/**
 * JSON-LD builders.
 *
 * The reference audit found zero structured data across the entire audited
 * site — no Organization, no FAQPage, nothing — which forfeits every rich
 * result the content already qualified for. Here, schema is assembled
 * centrally and every page emits at least Organization + WebSite.
 */
import { SITE, abs, ORG_ID, SITE_ID } from './site';

export type Json = Record<string, unknown>;

export function organization(): Json {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: abs('/'),
    description: SITE.description,
    foundingDate: SITE.founded,
    logo: { '@type': 'ImageObject', url: abs('/brand/xenapsis-logo.svg'), width: 512, height: 512 },
    sameAs: [] as string[],
  };
}

export function website(): Json {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: abs('/'),
    name: SITE.name,
    description: SITE.description,
    inLanguage: 'en-US',
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${abs('/search/')}?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbs(trail: { name: string; path: string }[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

export function faqPage(faqs: { question: string; answer: string }[], path: string): Json {
  return {
    '@type': 'FAQPage',
    '@id': `${abs(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function quiz(opts: {
  name: string;
  description: string;
  path: string;
  questionCount: number;
  minutes: number;
  about: string;
}): Json {
  return {
    '@type': 'Quiz',
    '@id': `${abs(opts.path)}#quiz`,
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    educationalLevel: 'Beginner',
    assesses: opts.about,
    typicalAgeRange: '16-',
    timeRequired: `PT${opts.minutes}M`,
    numberOfQuestions: opts.questionCount,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
    provider: { '@id': ORG_ID },
    about: { '@type': 'Thing', name: opts.about },
  };
}

export function article(opts: {
  headline: string;
  description: string;
  path: string;
  published: string;
  modified: string;
  section?: string;
  wordCount?: number;
}): Json {
  return {
    '@type': 'Article',
    '@id': `${abs(opts.path)}#article`,
    headline: opts.headline,
    description: opts.description,
    url: abs(opts.path),
    datePublished: opts.published,
    dateModified: opts.modified,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    ...(opts.section ? { articleSection: opts.section } : {}),
    ...(opts.wordCount ? { wordCount: opts.wordCount } : {}),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(opts.path) },
  };
}

export function itemList(name: string, items: { name: string; path: string }[]): Json {
  return {
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: abs(it.path),
    })),
  };
}

/** Wrap page-specific nodes into one @graph so entities cross-reference cleanly. */
export function graph(nodes: Json[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [organization(), website(), ...nodes] });
}
