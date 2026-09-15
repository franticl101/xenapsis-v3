import { test } from 'node:test';
import assert from 'node:assert/strict';
import { attr, tags, metaContent, textOf, wordCount } from '../scripts/lib/html.mjs';

test('attr reads a value containing an apostrophe', () => {
  const tag = `<meta name="description" content="Answers about Upfront's tests, in full">`;
  assert.equal(attr(tag, 'content'), "Answers about Upfront's tests, in full");
});

test('attr reads single-quoted attributes', () => {
  assert.equal(attr(`<link rel='canonical' href='https://x.test/a/'>`, 'href'), 'https://x.test/a/');
});

test('attr distinguishes a missing attribute from an empty one', () => {
  assert.equal(attr('<img src="a.png">', 'alt'), undefined, 'missing alt must be undefined');
  assert.equal(attr('<img alt="" src="a.png">', 'alt'), '', 'empty alt must be an empty string');
});

test('attr does not match an attribute that merely ends with the name', () => {
  assert.equal(attr('<meta data-content="x" content="y">', 'content'), 'y');
});

test('attr handles a value containing the other quote character', () => {
  assert.equal(attr(`<meta content='He said "no" firmly'>`, 'content'), 'He said "no" firmly');
});

test('tags collects every matching opening tag', () => {
  const html = '<img src="a"><p>x</p><img src="b">';
  assert.equal(tags(html, 'img').length, 2);
  assert.equal(tags(html, 'video').length, 0);
});

test('metaContent matches on the requested key', () => {
  const html = `<meta name="description" content="by name"><meta property="og:title" content="by property">`;
  assert.equal(metaContent(html, 'name', 'description'), 'by name');
  assert.equal(metaContent(html, 'property', 'og:title'), 'by property');
  assert.equal(metaContent(html, 'name', 'absent'), undefined);
});

test('textOf strips inner markup and collapses whitespace', () => {
  assert.deepEqual(textOf('<h1>Free <span>tests</span>\n  now</h1>', 'h1'), ['Free tests now']);
  assert.deepEqual(textOf('<h1>a</h1><h1>b</h1>', 'h1'), ['a', 'b']);
});

test('wordCount ignores script and style content', () => {
  const html = '<body><script>const a = 1; const b = 2;</script><style>.x{color:red}</style><p>one two three</p></body>';
  assert.equal(wordCount(html), 3);
});

test('wordCount falls back to the whole document when there is no body tag', () => {
  assert.equal(wordCount('<p>one two</p>'), 2);
});
