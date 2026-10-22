#!/usr/bin/env node
/**
 * Tell search engines which pages a deploy changed: Baidu's 普通收录 API and
 * IndexNow (Bing, Yandex, Seznam…). Run after the build, from the Pages
 * workflow, with the commit the push started from.
 *
 * Only pages whose sources changed since <base-sha> are submitted (Baidu's
 * daily quota is small); a page counts as changed the same way the sitemap
 * dates it: its pages/ file, plus components/home for / and components/pricing
 * for /pricing. URLs are taken from out/sitemap.xml, so a deleted page is not
 * submitted.
 *
 * The deploy only pushes to the gh-pages branch; the site behind
 * pushy.reactnative.cn picks it up a minute or so later. Engines fetch what
 * they are sent right away, so this first waits until the live
 * /mcp-docs-index.json reports this commit as its sourceCommit (up to
 * WAIT_MINUTES) and submits nothing if it never does.
 *
 * Baidu needs BAIDU_PUSH_TOKEN (站长平台 → 普通收录 → API 提交); without it that
 * engine is skipped. The IndexNow key is public by design and is served from
 * pages/public/<key>.txt. Failures are reported but never fail the deploy.
 *
 * Usage: node scripts/submit-urls.mjs <base-sha>
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE_URL = 'https://pushy.reactnative.cn';
const INDEXNOW_KEY = '75a8aa17ce0049fbb279d1d19f3f4daf';
const SITE_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const WAIT_MINUTES = 6;

const base = process.argv[2];
if (!base || /^0+$/.test(base)) {
  console.log('submit-urls: no base commit (new branch or manual run), nothing to submit');
  process.exit(0);
}

let changed;
try {
  changed = execFileSync(
    'git',
    ['diff', '--name-only', base, 'HEAD', '--', 'pages', 'components/home', 'components/pricing'],
    { cwd: SITE_ROOT, encoding: 'utf8' },
  )
    .split('\n')
    .filter(Boolean);
} catch (error) {
  console.warn(`submit-urls: git diff against ${base} failed, nothing submitted: ${error.message}`);
  process.exit(0);
}

const routes = new Set(
  changed.flatMap((file) => {
    if (file.startsWith('site/components/home/')) return ['/'];
    if (file.startsWith('site/components/pricing/')) return ['/pricing'];
    const page = file.match(/^site\/pages\/(?!public\/)(.+)\.mdx?$/);
    return page ? [`/${page[1]}`.replace(/\/index$/, '/')] : [];
  }),
);
const listed = new Set(
  [...readFileSync(path.join(SITE_ROOT, 'out', 'sitemap.xml'), 'utf8').matchAll(/<loc>(.+?)<\/loc>/g)].map((m) => m[1]),
);
const urls = [...routes].map((route) => `${BASE_URL}${route}`).filter((url) => listed.has(url));

if (urls.length === 0) {
  console.log('submit-urls: no page changed');
  process.exit(0);
}

const head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: SITE_ROOT, encoding: 'utf8' }).trim();
async function liveCommit() {
  try {
    const res = await fetch(`${BASE_URL}/mcp-docs-index.json`, { cache: 'no-store' });
    return res.ok ? (await res.json()).sourceCommit : undefined;
  } catch {
    return undefined;
  }
}
const deadline = Date.now() + WAIT_MINUTES * 60_000;
let live = await liveCommit();
while (live !== head && Date.now() < deadline) {
  await new Promise((resolve) => setTimeout(resolve, 15_000));
  live = await liveCommit();
}
if (live !== head) {
  console.warn(`submit-urls: ${BASE_URL} still serves ${live ?? 'nothing'} after ${WAIT_MINUTES} minutes, not ${head}; nothing submitted`);
  process.exit(0);
}

console.log(`submit-urls: ${urls.join(' ')}`);

async function submit(name, request) {
  try {
    const res = await request();
    console.log(`submit-urls: ${name} ${res.status} ${(await res.text()).slice(0, 300)}`);
  } catch (error) {
    console.warn(`submit-urls: ${name} failed: ${error.message}`);
  }
}

if (process.env.BAIDU_PUSH_TOKEN) {
  await submit('baidu', () =>
    fetch(
      `http://data.zz.baidu.com/urls?site=${encodeURIComponent(BASE_URL)}&token=${process.env.BAIDU_PUSH_TOKEN}`,
      { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: urls.join('\n') },
    ),
  );
} else {
  console.log('submit-urls: BAIDU_PUSH_TOKEN not set, skipping Baidu');
}

await submit('indexnow', () =>
  fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(BASE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  }),
);
