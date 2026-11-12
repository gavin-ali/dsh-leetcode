/**
 * Focused check for the editor's Enter handling (auto-indent).
 *
 * jsdom cannot replay a real keystroke through React's value tracking, so this
 * pulls the shipped `insertNewline` implementation out of `src/client.mjs` and
 * runs it against a textarea stand-in. Run with `node scripts/enter-indent-test.mjs`.
 */
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(join(root, 'src/client.mjs'), 'utf8');

const start = source.indexOf('      const insertNewline = () => {');
const end = source.indexOf('\n      const onKeyDown = (event) => {', start);
if (start < 0 || end < 0) {
  console.error('insertNewline not found in src/client.mjs');
  process.exit(1);
}
const body = source.slice(start, end);

const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

function run(value, start, end) {
  const state = { code: value, caret: null };
  const node = { value, selectionStart: start, selectionEnd: end };
  const pendingCaret = { current: null };
  const factory = new Function('textareaRef', 'pendingCaret', 'setPrefix', 'setIndex', 'onChange', 'INDENT', `
${body}
    return insertNewline;
  `);
  const insertNewline = factory(
    { current: node },
    pendingCaret,
    () => {},
    () => {},
    (next) => { state.code = next; },
    '    ',
  );
  insertNewline();
  state.caret = pendingCaret.current;
  return state;
}

const cases = [
  {
    name: 'opens a level after {',
    input: ['class A {', 9, 9],
    expect: ['class A {\n    ', 14],
  },
  {
    name: 'keeps the current indentation',
    input: ['    int x = 1;', 15, 15],
    expect: ['    int x = 1;\n    ', 20],
  },
  {
    name: 'splits a same-line closing brace onto its own line',
    input: ['void f() {}', 10, 10],
    expect: ['void f() {\n    \n}', 15],
  },
  {
    name: 'indents under a brace that already ends the line',
    input: ['void f() {\n}', 10, 10],
    expect: ['void f() {\n    \n}', 15],
  },
  {
    name: 'opens a level after (',
    input: ['if (ok) {', 9, 9],
    expect: ['if (ok) {\n    ', 14],
  },
  {
    name: 'replaces a selection',
    input: ['abc', 0, 3],
    expect: ['\n', 1],
  },
];

for (const item of cases) {
  const [value, start, end] = item.input;
  const [wantValue, wantCaret] = item.expect;
  const got = run(value, start, end);
  check(got.code === wantValue, `${item.name}: value ${JSON.stringify(got.code)} !== ${JSON.stringify(wantValue)}`);
  check(got.caret === wantCaret, `${item.name}: caret ${got.caret} !== ${wantCaret}`);
}

if (failures.length > 0) {
  console.error('enter-indent test failed:');
  for (const message of failures) console.error(` - ${message}`);
  process.exit(1);
}
console.log(`enter-indent ok: ${cases.length} cases`);
