#!/usr/bin/env node
/**
 * Publish the react-native-update Agent Skill for discovery at
 * /.well-known/agent-skills/ (Agent Skills Discovery RFC v0.2.0).
 *
 * The skill has references/ and scripts/ next to SKILL.md, so it ships as a
 * `type: "archive"` entry: a .tar.gz whose root is the skill directory itself
 * (the RFC forbids a wrapper directory, which the skill repo's own .skill ZIP
 * has). The archive is byte-reproducible (fixed mtime/owner, sorted entries,
 * gzip without a timestamp), so re-running on the same tag changes nothing.
 *
 * Reads the files from a tag of a local react-native-update-skill checkout,
 * writes public/.well-known/agent-skills/react-native-update.tar.gz and points
 * index.json at it with its sha256 digest. Run it after each skill release and
 * commit the result; the site build only copies public/.
 *
 * Usage: node scripts/sync-agent-skill.mjs <tag> [skill-repo]
 *   skill-repo defaults to ../../react-native-update-skill (sibling checkout)
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const SKILL = 'react-native-update';
const SOURCE_DIR = `skill/${SKILL}`;
const SITE_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(SITE_ROOT, 'pages/public/.well-known/agent-skills');
const ARCHIVE = `${SKILL}.tar.gz`;
// 2020-01-01T00:00:00Z: any fixed value keeps the archive reproducible.
const MTIME = 1577836800;

const [tag, repoArg] = process.argv.slice(2);
if (!tag) {
  console.error('Usage: node scripts/sync-agent-skill.mjs <tag> [skill-repo]');
  process.exit(1);
}
const repo = path.resolve(repoArg ?? path.join(SITE_ROOT, '../../react-native-update-skill'));

function git(args, encoding = 'utf8') {
  return execFileSync('git', ['-C', repo, ...args], { encoding, maxBuffer: 64 << 20 });
}

// "<mode> blob <sha>\t<path>" for every file under the skill directory.
const files = git(['ls-tree', '-r', '--full-tree', tag, '--', SOURCE_DIR])
  .trim()
  .split('\n')
  .map((line) => {
    const [meta, file] = line.split('\t');
    const [mode, type, sha] = meta.split(' ');
    if (type !== 'blob' || mode === '120000') throw new Error(`Unsupported entry: ${file}`);
    return { name: path.posix.relative(SOURCE_DIR, file), mode, sha };
  })
  .sort((a, b) => (a.name < b.name ? -1 : 1));
if (!files.some((file) => file.name === 'SKILL.md')) throw new Error(`No SKILL.md in ${tag}:${SOURCE_DIR}`);

function octal(value, width) {
  return `${value.toString(8).padStart(width - 1, '0')}\0`;
}

// ustar header; entry names here are short, so the 100-byte name field is enough.
function header(name, size, mode) {
  if (Buffer.byteLength(name) > 100) throw new Error(`Name too long for ustar: ${name}`);
  const block = Buffer.alloc(512);
  block.write(name, 0);
  block.write(octal(mode, 8), 100);
  block.write(octal(0, 8), 108);
  block.write(octal(0, 8), 116);
  block.write(octal(size, 12), 124);
  block.write(octal(MTIME, 12), 136);
  block.fill(' ', 148, 156);
  block.write('0', 156);
  block.write('ustar\0', 257);
  block.write('00', 263);
  let sum = 0;
  for (const byte of block) sum += byte;
  block.write(`${sum.toString(8).padStart(6, '0')}\0 `, 148);
  return block;
}

const blocks = [];
for (const file of files) {
  const data = git(['cat-file', 'blob', file.sha], 'buffer');
  blocks.push(header(file.name, data.length, file.mode === '100755' ? 0o755 : 0o644), data);
  blocks.push(Buffer.alloc((512 - (data.length % 512)) % 512));
}
blocks.push(Buffer.alloc(1024));
// Node writes a zero MTIME into the gzip header, so this is deterministic too.
const archive = gzipSync(Buffer.concat(blocks), { level: 9 });
const digest = `sha256:${createHash('sha256').update(archive).digest('hex')}`;

const skillMd = git(['show', `${tag}:${SOURCE_DIR}/SKILL.md`]);
const description = skillMd.match(/^description:\s*(.+)$/m)?.[1]?.trim();
if (!description) throw new Error('SKILL.md has no description');

mkdirSync(OUT_DIR, { recursive: true });
// The old single-file copy is superseded by the archive.
rmSync(path.join(OUT_DIR, SKILL), { recursive: true, force: true });
writeFileSync(path.join(OUT_DIR, ARCHIVE), archive);
const index = {
  $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
  skills: [
    {
      name: SKILL,
      type: 'archive',
      description,
      url: `/.well-known/agent-skills/${ARCHIVE}`,
      digest,
    },
  ],
};
writeFileSync(path.join(OUT_DIR, 'index.json'), `${JSON.stringify(index, null, 2)}\n`);
console.log(`${SKILL} ${tag}: ${files.length} files, ${archive.length} bytes, ${digest}`);
