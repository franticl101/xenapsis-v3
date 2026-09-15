import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  scoreScale, scoreAll, typeCode, strengthLabel, rankByStrength, isComplete,
  type ScorableItem,
} from '../src/lib/scoring.ts';

/** Four items on one scale, keying-balanced: two forward, two reverse. */
const BALANCED: ScorableItem[] = [
  { scale: 'EI', keyed: 1 },
  { scale: 'EI', keyed: 1 },
  { scale: 'EI', keyed: -1 },
  { scale: 'EI', keyed: -1 },
];

test('an all-neutral response set scores an exact tie', () => {
  const result = scoreScale('EI', BALANCED, [2, 2, 2, 2]);
  assert.equal(result.percentB, 50);
  assert.equal(result.strength, 0);
});

test('agreeing with everything scores a tie, not an extreme (acquiescence control)', () => {
  const result = scoreScale('EI', BALANCED, [4, 4, 4, 4]);
  assert.equal(result.percentB, 50, 'balanced keying must cancel a straight-line response');
  assert.equal(result.strength, 0);
});

test('disagreeing with everything also scores a tie', () => {
  assert.equal(scoreScale('EI', BALANCED, [0, 0, 0, 0]).percentB, 50);
});

test('maximally consistent answers reach the poles', () => {
  // Agree hard with forward items, disagree hard with reverse items.
  const towardB = scoreScale('EI', BALANCED, [4, 4, 0, 0]);
  assert.equal(towardB.percentB, 100);
  assert.equal(towardB.strength, 100);
  assert.equal(towardB.side, 'B');

  const towardA = scoreScale('EI', BALANCED, [0, 0, 4, 4]);
  assert.equal(towardA.percentB, 0);
  assert.equal(towardA.strength, 100);
  assert.equal(towardA.side, 'A');
});

test('strength is symmetric around the midpoint', () => {
  const high = scoreScale('EI', BALANCED, [4, 3, 1, 0]);
  const low = scoreScale('EI', BALANCED, [0, 1, 3, 4]);
  assert.equal(high.strength, low.strength);
  assert.equal(high.percentB + low.percentB, 100);
});

test('items belonging to other scales are ignored', () => {
  const mixed: ScorableItem[] = [...BALANCED, { scale: 'SN', keyed: 1 }];
  const withNoise = scoreScale('EI', mixed, [2, 2, 2, 2, 4]);
  assert.equal(withNoise.percentB, 50);
});

test('unanswered items are skipped rather than counted as neutral', () => {
  const partial = scoreScale('EI', BALANCED, [4, null, 0, null]);
  assert.equal(partial.percentB, 100, 'two consistent answers should still read as a full lean');
});

test('a scale with no answers falls back to a tie instead of dividing by zero', () => {
  const empty = scoreScale('EI', BALANCED, [null, null, null, null]);
  assert.equal(empty.percentB, 50);
  assert.equal(empty.strength, 0);
});

test('percentages are always within 0-100', () => {
  const combos = [0, 1, 2, 3, 4];
  for (const a of combos) for (const b of combos) for (const c of combos) for (const d of combos) {
    const { percentB, strength } = scoreScale('EI', BALANCED, [a, b, c, d]);
    assert.ok(percentB >= 0 && percentB <= 100, `percentB out of range: ${percentB}`);
    assert.ok(strength >= 0 && strength <= 100, `strength out of range: ${strength}`);
  }
});

test('typeCode assembles four letters from four scale results', () => {
  const items: ScorableItem[] = [
    { scale: 'EI', keyed: 1 }, { scale: 'SN', keyed: 1 },
    { scale: 'TF', keyed: 1 }, { scale: 'JP', keyed: 1 },
  ];
  const poles = {
    EI: { poleA: 'E', poleB: 'I' }, SN: { poleA: 'S', poleB: 'N' },
    TF: { poleA: 'T', poleB: 'F' }, JP: { poleA: 'J', poleB: 'P' },
  };
  const all = scoreAll(['EI', 'SN', 'TF', 'JP'], items, [4, 4, 4, 4]);
  assert.equal(typeCode(all, poles), 'INFP');

  const opposite = scoreAll(['EI', 'SN', 'TF', 'JP'], items, [0, 0, 0, 0]);
  assert.equal(typeCode(opposite, poles), 'ESTJ');
});

test('a near tie is described as a near tie', () => {
  assert.match(strengthLabel(4), /near tie/);
  assert.match(strengthLabel(95), /very strong/);
});

test('rankByStrength orders descending without mutating the input', () => {
  const input = scoreAll(['EI', 'SN'], [{ scale: 'EI', keyed: 1 }, { scale: 'SN', keyed: 1 }], [0, 4]);
  const ranked = rankByStrength(input);
  assert.equal(ranked[0].id, 'SN');
  assert.equal(input[0].id, 'EI', 'input array must not be reordered');
});

test('isComplete requires every item to be answered', () => {
  assert.equal(isComplete([0, 1, 2, 3], 4), true);
  assert.equal(isComplete([0, null, 2, 3], 4), false);
  assert.equal(isComplete([0, 1, 2], 4), false);
});
