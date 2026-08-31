#!/usr/bin/env node
/**
 * Emit out/mcp-docs-index.json — the corpus the Pushy MCP documentation tools
 * search and serve.
 *
 * The index ships as a static asset of this site
 * (https://pushy.react-native.cn/mcp-docs-index.json) and is fetched by the
 * update server at runtime, so publishing documentation is a deploy of this
 * site alone. The server keeps a compiled-in copy as its fallback, which is
 * what a self-hosted or offline deployment runs on.
 *
 * Content is the rspress "llms" Markdown export of each page — the same text
 * /docs/<slug>.md serves — so this runs after `rspress build` and never parses
 * MDX itself. Offsets are UTF-16 code units, which is how the server slices a
 * section out of a document.
 *
 * Plain ESM on purpose: the Pages workflow builds with node, not bun.
 *
 * Usage: node scripts/build-mcp-docs-index.mjs [--out <path>] [--check]
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCHEMA_VERSION = 1;
const BASE_URL = 'https://pushy.react-native.cn';
const RESOURCE_SCHEME = 'pushy-docs';
const SITE_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS_PAGES = path.join(SITE_ROOT, 'pages', 'docs');
const EXPORT_DIR = path.join(SITE_ROOT, 'out', 'docs');

/** Every page under pages/docs, in stable slug order. */
function documentPages() {
  return readdirSync(DOCS_PAGES)
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .map((name) => ({
      slug: name.replace(/\.mdx?$/, ''),
      path: `pages/docs/${name}`,
    }))
    .sort((a, b) => (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
}

/** Drop the "> For AI agents" banner rspress prepends, and normalise edges. */
function normaliseExport(text) {
  const lines = text.split('\n');
  if (lines[0]?.startsWith('> For AI agents:')) {
    lines.shift();
  }
  return `${lines.join('\n').replace(/^\n+/, '').replace(/\n+$/, '')}\n`;
}

function pageTitle(content, slug) {
  return /^# (.+)$/m.exec(content)?.[1].trim() ?? slug;
}

/** GitHub-style anchor: NFKC, drop punctuation, spaces to dashes. */
function anchor(heading) {
  return heading
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}_\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Heading sections with UTF-16 offsets. Headings inside fenced code blocks are
 * prose, not structure (`# comment` in a shell snippet is not a section).
 * Duplicate anchors get GitHub's -1, -2 suffixes so a URL fragment addresses
 * exactly one section.
 */
function sections(content) {
  const positions = [];
  let offset = 0;
  let inFence = false;
  for (const line of content.split('\n')) {
    if (line.startsWith('```')) {
      inFence = !inFence;
    }
    const match = inFence ? null : /^(#{1,6}) (.+?)\s*#*\s*$/.exec(line);
    if (match) {
      positions.push({ offset, level: match[1].length, heading: match[2].trim() });
    }
    offset += line.length + 1;
  }
  const seen = new Map();
  return positions.map((position, index) => {
    const end = positions[index + 1]?.offset ?? content.length;
    const base = anchor(position.heading);
    const taken = seen.get(base) ?? 0;
    seen.set(base, taken + 1);
    return {
      heading: position.heading,
      level: position.level,
      anchor: taken === 0 ? base : `${base}-${taken}`,
      offset: position.offset,
      length: end - position.offset,
    };
  });
}

function git(...args) {
  return execFileSync('git', ['-C', SITE_ROOT, ...args], {
    encoding: 'utf8',
  }).trim();
}

/**
 * The commit this index describes; the server echoes it back with every search
 * result. CI knows it directly. A local build asks git and marks the result
 * dirty rather than claiming a commit that does not contain the pages it just
 * indexed — the published index always comes from CI.
 */
function sourceCommit() {
  const fromCI = process.env.GITHUB_SHA?.trim();
  if (fromCI) {
    return fromCI;
  }
  try {
    const commit = git('rev-parse', 'HEAD');
    if (!git('status', '--porcelain', '--', DOCS_PAGES)) {
      return commit;
    }
    console.warn(
      `warning: pages/docs has uncommitted changes; ${commit} does not contain them`,
    );
    return `${commit}-dirty`;
  } catch {
    return 'unknown';
  }
}

function build() {
  const documents = documentPages().map((page) => {
    const exported = path.join(EXPORT_DIR, `${page.slug}.md`);
    let raw;
    try {
      raw = readFileSync(exported, 'utf8');
    } catch {
      throw new Error(`${exported} missing: run \`rspress build\` first`);
    }
    const content = normaliseExport(raw);
    return {
      slug: page.slug,
      title: pageTitle(content, page.slug),
      path: page.path,
      url: `${BASE_URL}/docs/${page.slug}`,
      resourceUri: `${RESOURCE_SCHEME}://docs/${page.slug}`,
      content,
      sections: sections(content),
    };
  });
  return {
    schemaVersion: SCHEMA_VERSION,
    product: 'Pushy',
    baseUrl: BASE_URL,
    resourceScheme: RESOURCE_SCHEME,
    sourceCommit: sourceCommit(),
    documents,
  };
}

/**
 * Refuse to publish an index the server cannot use: every section must slice
 * back to its own heading. This is the check that catches offsets counted in
 * code points instead of UTF-16 units — a page with emoji drifts by one unit
 * per astral character, and every section after it reads from the wrong place.
 */
function verify(index) {
  for (const document of index.documents) {
    if (document.sections.length === 0) {
      throw new Error(`${document.slug}: no headings found`);
    }
    for (const section of document.sections) {
      const sliced = document.content.slice(
        section.offset,
        section.offset + section.length,
      );
      if (!sliced.startsWith(`${'#'.repeat(section.level)} `)) {
        throw new Error(
          `${document.slug}: section ${JSON.stringify(section.heading)} does not ` +
            `slice back to its heading (offset ${section.offset})`,
        );
      }
    }
  }
}

const outFlag = process.argv.indexOf('--out');
const outPath =
  outFlag >= 0
    ? process.argv[outFlag + 1]
    : path.join(SITE_ROOT, 'out', 'mcp-docs-index.json');

const index = build();
verify(index);
const rendered = `${JSON.stringify(index, null, 2)}\n`;

if (process.argv.includes('--check')) {
  if (readFileSync(outPath, 'utf8') !== rendered) {
    console.error(`docs index drifts from the site at ${index.sourceCommit}`);
    process.exit(1);
  }
  console.log('docs index up to date');
} else {
  writeFileSync(outPath, rendered);
  console.log(
    `wrote ${path.relative(SITE_ROOT, outPath)} @ ${index.sourceCommit} ` +
      `(${index.documents.length} documents, ${Math.round(rendered.length / 1024)}KB)`,
  );
}
