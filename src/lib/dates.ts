/**
 * Freshness signals.
 *
 * The reference audit flagged a blog whose last post was eight months old.
 * Content dates here come from explicit per-article values where they exist,
 * falling back to the build date for pages that are genuinely regenerated on
 * every deploy (type profiles, hubs), so `dateModified` stays honest rather
 * than being frozen at whenever the file was first written.
 */
export const SITE_BUILD_DATE = new Date().toISOString().slice(0, 10);

/** Human-readable date for display, e.g. "15 September 2026". */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
}
