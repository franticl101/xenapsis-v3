/** Navigation is declared once and consumed by header, footer and sitemap prose. */
export interface NavItem {
  readonly label: string;
  readonly path: string;
  readonly blurb?: string;
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { label: 'Tests', path: '/tests/', blurb: 'Every assessment, free and unlocked.' },
  { label: 'Personality types', path: '/types/', blurb: 'All 16 types explained in depth.' },
  { label: 'Careers', path: '/careers/', blurb: 'Which work fits which type.' },
  { label: 'Guides', path: '/guides/', blurb: 'How the science actually works.' },
  { label: 'Compare', path: '/compare/', blurb: 'Honest comparisons with other tests.' },
] as const;

export const FOOTER_NAV: readonly { readonly heading: string; readonly items: readonly NavItem[] }[] = [
  {
    heading: 'Assessments',
    items: [
      { label: 'Personality type test', path: '/tests/personality-type/' },
      { label: 'Career fit test', path: '/tests/career-fit/' },
      { label: 'Risk tolerance test', path: '/tests/risk-tolerance/' },
      { label: 'Assertiveness test', path: '/tests/assertiveness/' },
    ],
  },
  {
    heading: 'Learn',
    items: [
      { label: 'All 16 types', path: '/types/' },
      { label: 'Careers by type', path: '/careers/' },
      { label: 'Guides', path: '/guides/' },
      { label: 'Is this test accurate?', path: '/guides/are-personality-tests-accurate/' },
    ],
  },
  {
    heading: 'Compare',
    items: [
      { label: 'Test comparisons', path: '/compare/' },
      { label: 'Tests with no signup', path: '/compare/personality-tests-without-signup/' },
      { label: 'Free vs paid tests', path: '/compare/free-vs-paid-personality-tests/' },
    ],
  },
  {
    heading: 'About',
    items: [
      { label: 'How we score', path: '/methodology/' },
      { label: 'Frequently asked questions', path: '/faq/' },
      { label: 'Privacy', path: '/privacy/' },
    ],
  },
] as const;

/** True when `current` is the item's page or a descendant of it. */
export function isActive(current: string, path: string): boolean {
  return current === path || (path !== '/' && current.startsWith(path));
}
