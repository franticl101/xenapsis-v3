/**
 * Scoring. Pure functions over (responses, items) — no DOM, no globals, no I/O.
 *
 * Keeping this free of side effects means the same code runs in the browser
 * and under `node --test`, so the maths is actually verified rather than
 * assumed.
 */

/** A response is an index into the five-point scale: 0 = strongly disagree. */
export const RESPONSE_MIN = 0;
export const RESPONSE_MAX = 4;
const CENTRE = (RESPONSE_MIN + RESPONSE_MAX) / 2;
/** Maximum absolute contribution of a single item. */
const ITEM_WEIGHT = RESPONSE_MAX - CENTRE;

export interface ScorableItem {
  readonly scale: string;
  readonly keyed: 1 | -1;
}

export interface ScaleResult {
  readonly id: string;
  /** 0-100. Above 50 leans toward poleB, below 50 toward poleA. */
  readonly percentB: number;
  /** Distance from an exact tie, 0-100. This is the number that means something. */
  readonly strength: number;
  /** Which side the respondent landed on. */
  readonly side: 'A' | 'B';
}

/** Signed contribution of one response, in the range [-ITEM_WEIGHT, +ITEM_WEIGHT]. */
function contribution(response: number, keyed: 1 | -1): number {
  return (response - CENTRE) * keyed;
}

export function isComplete(responses: readonly (number | null)[], itemCount: number): boolean {
  return responses.length === itemCount && responses.every((r) => typeof r === 'number');
}

/**
 * Score one scale.
 *
 * Because every scale is keying-balanced, a respondent who selects the same
 * option for every item scores exactly 50 — an honest "no preference detected"
 * rather than a spurious extreme.
 */
export function scoreScale(
  scaleId: string,
  items: readonly ScorableItem[],
  responses: readonly (number | null)[],
): ScaleResult {
  let sum = 0;
  let counted = 0;

  for (let i = 0; i < items.length; i += 1) {
    if (items[i].scale !== scaleId) continue;
    const response = responses[i];
    if (typeof response !== 'number') continue;
    sum += contribution(response, items[i].keyed);
    counted += 1;
  }

  if (counted === 0) return { id: scaleId, percentB: 50, strength: 0, side: 'A' };

  const range = ITEM_WEIGHT * counted;
  const percentB = ((sum + range) / (2 * range)) * 100;

  return {
    id: scaleId,
    percentB: round1(percentB),
    strength: round1(Math.abs(percentB - 50) * 2),
    side: percentB >= 50 ? 'B' : 'A',
  };
}

export function scoreAll(
  scaleIds: readonly string[],
  items: readonly ScorableItem[],
  responses: readonly (number | null)[],
): ScaleResult[] {
  return scaleIds.map((id) => scoreScale(id, items, responses));
}

/** Four-letter code, e.g. "INFJ", from four bipolar scale results. */
export function typeCode(
  results: readonly ScaleResult[],
  poles: Readonly<Record<string, { poleA: string; poleB: string }>>,
): string {
  return results.map((r) => (r.side === 'B' ? poles[r.id].poleB : poles[r.id].poleA)).join('');
}

/**
 * Plain-language reading of a preference strength.
 * The reference site reported a bare letter; the distinction below is the
 * single most useful thing a type result can tell someone.
 */
export function strengthLabel(strength: number): string {
  if (strength < 12) return 'a near tie — you use both sides about equally';
  if (strength < 35) return 'a slight preference';
  if (strength < 60) return 'a moderate preference';
  if (strength < 85) return 'a clear preference';
  return 'a very strong preference';
}

/** Descending sort by percentB, for profile-style results. */
export function rankByStrength(results: readonly ScaleResult[]): ScaleResult[] {
  return [...results].sort((a, b) => b.percentB - a.percentB);
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}
