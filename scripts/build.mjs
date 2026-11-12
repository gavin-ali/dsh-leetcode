/**
 * Build and validate the algorithm practice bench bundle.
 *
 * The package is plain JavaScript. This step inlines the brief's problem table,
 * the Java signature map and the local completion dictionary from `src/data.mjs`
 * into `lib/client.js`, then validates the manifest, the patch, the exported
 * runtime entries, the locale resources, the icon, and the syntax of every
 * runtime file. It writes only `lib/client.js`.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, realpathSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];

function fail(message) {
  failures.push(message);
}

function readText(relativePath) {
  const absolute = join(root, relativePath);
  if (!existsSync(absolute)) {
    fail(`missing file: ${relativePath}`);
    return '';
  }
  return readFileSync(absolute, 'utf8');
}

const manifest = JSON.parse(readText('package.json') || '{}');
const expectedName = manifest.name;
if (manifest.private === true) fail('published packages must not be private');
if (expectedName !== 'dsh-leetcode-bench') fail(`unexpected package name: ${expectedName}`);

// ---------------------------------------------------------------------------
// 1. Inline the authored data into the browser module.
// ---------------------------------------------------------------------------

const data = await import('../src/data.mjs');

// The dictionary is the only bundled data: the problem bank comes from leetcode.cn.
if (!Array.isArray(data.COMPLETIONS) || data.COMPLETIONS.length === 0) fail('COMPLETIONS is missing or empty');
if (new Set(data.COMPLETIONS.map((entry) => entry.key)).size !== data.COMPLETIONS.length) fail('completion keys must be unique');
for (const entry of data.COMPLETIONS) {
  if (typeof entry.key !== 'string' || entry.key.trim() === '') fail('a completion entry has no key');
  if (typeof entry.group !== 'string' || entry.group.trim() === '') fail(`completion ${entry.key} has no group`);
  if (typeof entry.detail !== 'string' || entry.detail.trim() === '') fail(`completion ${entry.key} has no detail`);
  if (typeof entry.insert !== 'string' || entry.insert.trim() === '') fail(`completion ${entry.key} has no insert text`);
  if (entry.insert.includes('$0')) fail(`completion ${entry.key} still contains a caret marker`);
}

const template = readText('src/client.mjs');
if (!template.includes('%%COMPLETIONS%%')) fail('src/client.mjs is missing the %%COMPLETIONS%% marker');
if (template.includes('%%EPISODES%%') || template.includes('%%SIGNATURES%%')) fail('src/client.mjs still asks for bundled problem data');
const clientSource = template.replace('%%COMPLETIONS%%', () => JSON.stringify(data.COMPLETIONS, null, 2));
if (/%%[A-Z_]+%%/.test(clientSource)) fail('src/client.mjs still contains an unresolved data marker');
mkdirSync(join(root, 'lib'), { recursive: true });
writeFileSync(join(root, 'lib/client.js'), clientSource);

// ---------------------------------------------------------------------------
// 2. Manifest, exports, and files.
// ---------------------------------------------------------------------------

if (manifest.name !== expectedName) fail(`package name must be ${expectedName}`);
if (typeof manifest.version !== 'string' || !/^\d+\.\d+\.\d+/.test(manifest.version)) fail('package version must be semver');
if (manifest.dsh?.bundle?.patch !== './cordis.patch.yml') fail('dsh.bundle.patch must be ./cordis.patch.yml');
if (manifest.dsh?.client?.platform !== 'web') fail('dsh.client.platform must be web');
if (!Array.isArray(manifest.dsh?.client?.inject)) fail('dsh.client.inject must be an array');
if (manifest.dsh?.client?.immediately !== true) fail('dsh.client.immediately must be true');

for (const [key, target] of Object.entries(manifest.exports ?? {})) {
  if (typeof target !== 'string') {
    fail(`export ${key} must be a string path`);
    continue;
  }
  if (key.includes('*')) continue;
  if (!existsSync(join(root, target))) fail(`export ${key} points at missing ${target}`);
}

for (const entry of manifest.files ?? []) {
  if (entry.includes('*')) continue;
  if (!existsSync(join(root, entry))) fail(`files entry is missing: ${entry}`);
}

// ---------------------------------------------------------------------------
// 3. Runtime entries parse, and the client module registers itself.
// ---------------------------------------------------------------------------

for (const relativePath of ['index.js', 'lib/client.js']) {
  const absolute = join(root, relativePath);
  if (!existsSync(absolute)) {
    fail(`missing runtime entry: ${relativePath}`);
    continue;
  }
  const checked = spawnSync(process.execPath, ['--check', absolute], { encoding: 'utf8' });
  if (checked.status !== 0) fail(`${relativePath} does not parse: ${checked.stderr.trim()}`);
}

if (!clientSource.includes('window.__ModuleLoader__.load')) fail('client entry must register with window.__ModuleLoader__.load');
if (!clientSource.includes(`id: '${expectedName}'`)) fail('client module id must equal the package name');

// ---------------------------------------------------------------------------
// 4. The patch is a plain array of insert operations only.
// ---------------------------------------------------------------------------

const patchLines = readText('cordis.patch.yml').split(/\r?\n/);
if (!patchLines.some((line) => /^-\s+insert:\s*$/.test(line))) fail('patch must start an insert operation');
if (patchLines.some((line) => /^\s*-\s*(override|group|isolate|!!js|include):/.test(line))) fail('patch may only use insert operations');

const idPattern = /^\s*-?\s*id:\s*'?([^'\s]+)'?\s*$/;
const namePattern = /^\s*-?\s*name:\s*'?([^'\s]+)'?\s*$/;
const insertedIds = [];
let insertedNames = 0;
for (const line of patchLines) {
  const idMatch = idPattern.exec(line);
  if (idMatch !== null) {
    insertedIds.push(idMatch[1]);
    if (!idMatch[1].startsWith(`${expectedName}:`)) fail(`inserted id ${idMatch[1]} must start with ${expectedName}:`);
  }
  const nameMatch = namePattern.exec(line);
  if (nameMatch !== null) {
    insertedNames += 1;
    if (nameMatch[1] !== expectedName) fail(`inserted module ${nameMatch[1]} must be this package`);
  }
}
if (insertedIds.length !== 1) fail('patch must insert exactly one plugin row');
if (insertedNames !== 1) fail('patch must name exactly one module');

// ---------------------------------------------------------------------------
// 5. Display metadata, icon, and no escaping symlink.
// ---------------------------------------------------------------------------

if (typeof manifest.description !== 'string' || manifest.description.trim() === '') fail('package.json needs a description');

for (const locale of ['en', 'zh']) {
  const raw = readText(`locale/${locale}.json`);
  if (raw === '') continue;
  try {
    const document = JSON.parse(raw);
    if (typeof document.meta?.title !== 'string' || document.meta.title === '') fail(`locale/${locale}.json needs meta.title`);
    if (typeof document.meta?.description !== 'string' || document.meta.description === '') fail(`locale/${locale}.json needs meta.description`);
  } catch (error) {
    fail(`locale/${locale}.json is not valid JSON: ${error.message}`);
  }
}

const iconPath = join(root, 'icon.svg');
if (!existsSync(iconPath)) fail('missing icon.svg');
else {
  const icon = readFileSync(iconPath, 'utf8');
  if (!icon.trimStart().startsWith('<svg')) fail('icon.svg must be an SVG document');
  if (!icon.includes('</svg>')) fail('icon.svg must be a complete SVG document');
  if (statSync(iconPath).size > 256 * 1024) fail('icon.svg exceeds 256 KiB');
}

function walk(directory) {
  for (const item of readdirSync(directory, { withFileTypes: true })) {
    if (item.name === 'node_modules' || item.name === '.git') continue;
    const absolute = join(directory, item.name);
    if (item.isSymbolicLink()) {
      let real;
      try {
        real = realpathSync(absolute);
      } catch {
        fail(`broken symlink: ${relative(root, absolute)}`);
        continue;
      }
      const inside = real === root || real.startsWith(root + sep);
      if (!inside) fail(`symlink leaves the package: ${relative(root, absolute)} -> ${real}`);
    } else if (item.isDirectory()) {
      walk(absolute);
    }
  }
}
walk(root);

if (failures.length > 0) {
  console.error('build failed:');
  for (const message of failures) console.error(` - ${message}`);
  process.exit(1);
}

console.log(`build ok: ${manifest.name}@${manifest.version}`);
console.log(`entries: ${Object.keys(manifest.exports).join(', ')}`);
console.log(`data: ${data.COMPLETIONS.length} completions (problem bank is fetched at runtime)`);
console.log(`client: ${statSync(join(root, 'lib/client.js')).size} bytes`);
console.log(`patch ids: ${insertedIds.join(', ')}`);
