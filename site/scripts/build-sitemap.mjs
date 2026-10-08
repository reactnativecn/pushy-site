#!/usr/bin/env node
/**
 * Emit out/sitemap.xml from the page sources, so a new page under pages/ is
 * listed without anyone editing the sitemap by hand.
 *
 * <lastmod> is the date of the last commit touching each page source. It needs
 * full git history (the Pages workflow checks out with fetch-depth: 0); in a
 * shallow clone every page would report the same date, so lastmod is omitted
 * there instead of lying.
 *
 * Usage: node scripts/build-sitemap.mjs
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE_URL = 'https://pushy.reactnative.cn';
const SITE_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = path.join(SITE_ROOT, 'pages');
const OUT = path.join(SITE_ROOT, 'out', 'sitemap.xml');

// Custom pages whose content lives in components/, not in the .mdx shell.
const EXTRA_SOURCES = {
  '/': ['components/home'],
  '/pricing': ['components/pricing'],
};

function git(args) {
  try {
    return execFileSync('git', args, { cwd: SITE_ROOT, encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

/** Page sources as [routePath, relativeFile], skipping public/ and assets/. */
function pages(dir = PAGES, prefix = '') {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      return entry.name === 'public' || entry.name === 'assets'
        ? []
        : pages(path.join(dir, entry.name), rel);
    }
    if (!/\.mdx?$/.test(entry.name)) return [];
    const route = `/${rel.replace(/\.mdx?$/, '')}`.replace(/\/index$/, '/');
    return [[route, `pages/${rel}`]];
  });
}

const shallow = git(['rev-parse', '--is-shallow-repository']) !== 'false';

const urls = pages()
  .sort(([a], [b]) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))
  .map(([route, file]) => {
    const lastmod = shallow ? '' : git(['log', '-1', '--format=%cs', '--', file, ...(EXTRA_SOURCES[route] ?? [])]);
    return [
      '  <url>',
      `    <loc>${BASE_URL}${route}</loc>`,
      ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
      '  </url>',
    ].join('\n');
  });

writeFileSync(
  OUT,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`,
);
console.log(`sitemap: ${urls.length} urls${shallow ? ' (shallow clone, no lastmod)' : ''}`);
