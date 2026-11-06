#!/usr/bin/env node
/**
 * Emit out/sitemap.xml from the pages rspress actually built, so a new page
 * under pages/ is listed without anyone editing the sitemap by hand.
 *
 * <lastmod> is the date of the last commit touching the page source or any
 * local component/directory it relies on. It needs full git history (the Pages
 * workflow checks out with fetch-depth: 0); in a shallow clone every page
 * would report the same date, so lastmod is omitted there instead of lying.
 *
 * Pages marked noindex (404, launch film) and static redirect shims without a
 * markdown source (public/docs.html) are skipped automatically.
 *
 * Usage: node scripts/build-sitemap.mjs
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE_URL = 'https://pushy.reactnative.cn';
const SITE_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(SITE_ROOT, 'out');
const PAGES_DIR = path.join(SITE_ROOT, 'pages');

// Custom pages whose content lives across component directories.
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

const shallow = git(['rev-parse', '--is-shallow-repository']) !== 'false';

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}

function sourceOf(route) {
  const base = path.join(PAGES_DIR, route === '/' ? 'index' : route);
  return ['.mdx', '.md'].map((ext) => base + ext).find(existsSync);
}

// Local modules a page imports in its MDX header (before the first code fence).
const RESOLVE_EXTS = ['', '.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts'];
function localImports(source) {
  const header = readFileSync(source, 'utf8').split(/^```/m)[0];
  return [...header.matchAll(/^import[^'"]*['"](\.[^'"]+)['"]/gm)]
    .map(([, spec]) => path.resolve(path.dirname(source), spec))
    .map((base) => RESOLVE_EXTS.map((ext) => base + ext).find(existsSync))
    .filter(Boolean);
}

const urls = [];
for (const file of htmlFiles(OUT_DIR)) {
  const rel = path.relative(OUT_DIR, file).split(path.sep).join('/');
  const route = rel === 'index.html' ? '/' : `/${rel.replace(/\.html$/, '')}`;
  const source = sourceOf(route);
  if (!source) continue;
  if (/<meta name="robots" content="[^"]*noindex/i.test(readFileSync(file, 'utf8'))) continue;

  const deps = [source, ...localImports(source), ...(EXTRA_SOURCES[route] ?? [])];
  const lastmod = shallow ? '' : git(['log', '-1', '--format=%cs', '--', ...deps]);
  urls.push({ loc: `${BASE_URL}${route}`, lastmod });
}

// Home first, then top-level landing/comparison pages, then /docs/*, each alphabetical.
const rank = (loc) => (loc === `${BASE_URL}/` ? 0 : loc.includes('/docs/') ? 2 : 1);
urls.sort((a, b) => rank(a.loc) - rank(b.loc) || a.loc.localeCompare(b.loc));

const body = urls
  .map(({ loc, lastmod }) =>
    lastmod
      ? `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
      : `  <url>\n    <loc>${loc}</loc>\n  </url>`,
  )
  .join('\n');

writeFileSync(
  path.join(OUT_DIR, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
);
console.log(`sitemap: ${urls.length} urls${shallow ? ' (shallow clone, no lastmod)' : ''}`);
