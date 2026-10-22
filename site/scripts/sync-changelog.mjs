#!/usr/bin/env node
/**
 * Write pages/docs/changelog.md from the react-native-update GitHub releases.
 *
 * Release notes are bilingual ("## English" then "## 中文"); only the Chinese
 * half is kept, so releases without one (before v10.52.2) are left to the
 * GitHub releases page the changelog links to. A release's own "###" headings
 * already sit one level under the per-release "## vX.Y.Z" heading.
 *
 * The Pages workflow runs this before the build so the page tracks new
 * releases on every deploy; the generated file is also committed so local
 * builds have it. A failed fetch leaves the existing file untouched.
 *
 * Usage: node scripts/sync-changelog.mjs   (GITHUB_TOKEN optional, raises the rate limit)
 */
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = 'reactnativecn/react-native-update';
const SITE_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(SITE_ROOT, 'pages', 'docs', 'changelog.md');
const MAX_RELEASES = 40;

async function releases() {
  const headers = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100`, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  return (await res.json()).filter((release) => !release.draft && !release.prerelease);
}

/** The "## 中文" half of a release body. */
function chineseNotes(body) {
  const match = (body ?? '').replace(/\r\n/g, '\n').match(/^## 中文\s*\n([\s\S]*)$/m);
  if (!match) return undefined;
  return match[1].split(/^## /m)[0].trim();
}

let list;
try {
  list = await releases();
} catch (error) {
  console.warn(`changelog: ${error.message}; keeping the existing ${path.relative(SITE_ROOT, OUT)}`);
  process.exit(0);
}

const entries = list
  .map((release) => ({ release, notes: chineseNotes(release.body) }))
  .filter(({ notes }) => notes)
  .slice(0, MAX_RELEASES);

const sections = entries.map(({ release, notes }) =>
  [`## ${release.tag_name}`, '', `发布于 ${release.published_at.slice(0, 10)}`, '', notes].join('\n'),
);

writeFileSync(
  OUT,
  `---
title: 更新日志
description: react-native-update（Pushy 热更新 React Native SDK）版本更新日志：新功能、行为变更、问题修复与升级注意事项，最新版本 ${entries[0]?.release.tag_name ?? ''}。
type: 其他
---

# 更新日志

本页由 [GitHub Releases](https://github.com/${REPO}/releases) 自动生成，列出最近的 ${entries.length} 个版本。更早的版本请查看 GitHub Releases。

升级原生依赖后需要重新打包并上传原生包，参见[发布热更新](/docs/publish)。

${sections.join('\n\n')}
`,
);
console.log(`changelog: ${entries.length} releases, latest ${entries[0]?.release.tag_name}`);
