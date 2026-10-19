#!/usr/bin/env node
/**
 * Publish the react-native-update Agent Skill for discovery at
 * /.well-known/agent-skills/ (Agent Skills Discovery RFC v0.2.0).
 *
 * The skill has references/ and scripts/ next to SKILL.md, so it ships as a
 * `type: "archive"` entry: a .zip whose root is the skill directory itself
 * (the RFC forbids a wrapper directory, which the skill repo's own .skill ZIP
 * has). The archive is byte-reproducible (fixed timestamps, sorted entries),
 * so re-running on the same tag changes nothing.
 *
 * ZIP rather than .tar.gz: clients pick the format from Content-Type first,
 * and Alibaba ESA (pushy.reactnative.cn) serves .tar.gz as application/x-tar
 * with no way to override it from the repository; .zip comes back as a zip
 * type from both (application/zip on ESA, application/x-zip-compressed on
 * GitHub Pages). The RFC requires clients to support both formats.
 *
 * Reads the files from a tag of a local react-native-update-skill checkout,
 * writes public/.well-known/agent-skills/react-native-update.zip and points
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
import { crc32, deflateRawSync } from 'node:zlib';

const SKILL = 'react-native-update';
const SOURCE_DIR = `skill/${SKILL}`;
const SITE_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(SITE_ROOT, 'pages/public/.well-known/agent-skills');
const ARCHIVE = `${SKILL}.zip`;
const LEGACY_ARCHIVES = [`${SKILL}.tar.gz`];
// MS-DOS date 1980-01-01 00:00: any fixed value keeps the archive reproducible.
const DOS_DATE = (0 << 9) | (1 << 5) | 1;
const DOS_TIME = 0;

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

// Local file headers and data, then the central directory and its end record.
// Unix modes go in the external attributes so the doctor scripts stay
// executable when extracted.
const local = [];
const central = [];
let offset = 0;
for (const file of files) {
  const data = git(['cat-file', 'blob', file.sha], 'buffer');
  const compressed = deflateRawSync(data, { level: 9 });
  const name = Buffer.from(file.name);
  const crc = crc32(data);
  const mode = file.mode === '100755' ? 0o100755 : 0o100644;

  const head = Buffer.alloc(30);
  head.writeUInt32LE(0x04034b50, 0);
  head.writeUInt16LE(20, 4);
  head.writeUInt16LE(0x0800, 6); // UTF-8 names
  head.writeUInt16LE(8, 8); // deflate
  head.writeUInt16LE(DOS_TIME, 10);
  head.writeUInt16LE(DOS_DATE, 12);
  head.writeUInt32LE(crc, 14);
  head.writeUInt32LE(compressed.length, 18);
  head.writeUInt32LE(data.length, 22);
  head.writeUInt16LE(name.length, 26);
  local.push(head, name, compressed);

  const entry = Buffer.alloc(46);
  entry.writeUInt32LE(0x02014b50, 0);
  entry.writeUInt16LE((3 << 8) | 20, 4); // made by Unix
  entry.writeUInt16LE(20, 6);
  entry.writeUInt16LE(0x0800, 8);
  entry.writeUInt16LE(8, 10);
  entry.writeUInt16LE(DOS_TIME, 12);
  entry.writeUInt16LE(DOS_DATE, 14);
  entry.writeUInt32LE(crc, 16);
  entry.writeUInt32LE(compressed.length, 20);
  entry.writeUInt32LE(data.length, 24);
  entry.writeUInt16LE(name.length, 28);
  entry.writeUInt32LE((mode << 16) >>> 0, 38);
  entry.writeUInt32LE(offset, 42);
  central.push(entry, name);

  offset += head.length + name.length + compressed.length;
}
const directory = Buffer.concat(central);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(files.length, 8);
end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(directory.length, 12);
end.writeUInt32LE(offset, 16);
const archive = Buffer.concat([...local, directory, end]);
const digest = `sha256:${createHash('sha256').update(archive).digest('hex')}`;

const skillMd = git(['show', `${tag}:${SOURCE_DIR}/SKILL.md`]);
const description = skillMd.match(/^description:\s*(.+)$/m)?.[1]?.trim();
if (!description) throw new Error('SKILL.md has no description');

mkdirSync(OUT_DIR, { recursive: true });
// The old single-file copy is superseded by the archive.
rmSync(path.join(OUT_DIR, SKILL), { recursive: true, force: true });
for (const legacy of LEGACY_ARCHIVES) rmSync(path.join(OUT_DIR, legacy), { force: true });
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
