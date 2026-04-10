import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const css = readFileSync(new URL('../src/css/custom.css', import.meta.url), 'utf8');

function getRuleBody(selector) {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) {
    return '';
  }

  const bodyStart = start + selector.length + 2;
  const bodyEnd = css.indexOf('\n}', bodyStart);
  if (bodyEnd === -1) {
    return '';
  }

  return css.slice(bodyStart, bodyEnd);
}

test('navbar host element does not create a containing block for mobile sidebar', () => {
  const docsNavbarRule = getRuleBody(':is(html.docs-wrapper, html.blog-wrapper) .navbar');
  const defaultNavbarRule = getRuleBody('html:not(.docs-wrapper):not(.blog-wrapper) .navbar');

  assert.doesNotMatch(
    docsNavbarRule,
    /backdrop-filter\s*:/,
    'docs/blog navbar should not apply backdrop-filter directly',
  );
  assert.doesNotMatch(
    defaultNavbarRule,
    /backdrop-filter\s*:/,
    'default navbar should not apply backdrop-filter directly',
  );
});

test('custom mobile sidebar layers stay above navbar inner content', () => {
  const docsNavbarInnerRule = getRuleBody(':is(html.docs-wrapper, html.blog-wrapper) .navbar__inner');
  const defaultNavbarInnerRule = getRuleBody('html:not(.docs-wrapper):not(.blog-wrapper) .navbar__inner');

  assert.match(
    css,
    /@media\s*\(max-width:\s*996px\)\s*\{[\s\S]*?\.navbar-sidebar__backdrop\s*\{[\s\S]*?z-index\s*:\s*211\s*;/,
    'mobile sidebar backdrop should sit below the drawer and above page chrome',
  );
  assert.match(
    css,
    /@media\s*\(max-width:\s*996px\)\s*\{[\s\S]*?\.navbar-sidebar\s*\{[\s\S]*?z-index\s*:\s*212\s*;/,
    'mobile sidebar should sit above fixed navbar layers',
  );
  assert.doesNotMatch(
    docsNavbarInnerRule,
    /z-index\s*:/,
    'docs/blog navbar inner should not out-rank the mobile drawer',
  );
  assert.doesNotMatch(
    defaultNavbarInnerRule,
    /z-index\s*:/,
    'default navbar inner should not out-rank the mobile drawer',
  );
});
