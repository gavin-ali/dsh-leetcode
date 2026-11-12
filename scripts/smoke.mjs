/**
 * Local smoke check for this plugin (development only, not part of the bundle).
 *
 * Loads the built browser module in a VM, captures the slots it registers, and
 * mounts the main-area page in jsdom with React from a local checkout
 * (REACT_DIR). Nothing in the page comes from a bundled problem bank: the fetch
 * stub below stands in for the host routes `/problems`, `/statement`,
 * `/submit`, `/auth` and `/health`.
 *
 * It covers the sidebar-entry <-> main-panel pairing, the fetched list with
 * search / difficulty / paging, slug-keyed drafts and check-offs, the detail
 * pane, template insertion, submission, the login gate, the offline banner,
 * local completion, the editor indent and the copy-to-chat coach.
 */
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(join(root, 'lib/client.js'), 'utf8');

const ReactDir = process.env.REACT_DIR ?? '/Users/yao/Documents/ds/dsh-openui/node_modules';
const requireFromHost = createRequire(join(ReactDir, 'host.cjs'));
const React = requireFromHost('react');
const { createRoot } = requireFromHost('react-dom/client');
const { JSDOM } = requireFromHost('jsdom');

const PACKAGE = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).name;
const PANEL_ID = 'dsh-leetcode-bench';
const STORAGE_KEY = `${PACKAGE}/state/v1`;

const failures = [];
function check(condition, message) {
  if (!condition) failures.push(message);
}

const dom = new JSDOM('<!doctype html><html lang="zh"><body><div id="root"></div></body></html>', { url: 'http://127.0.0.1/' });
const { window } = dom;
globalThis.window = window;
globalThis.document = window.document;
Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true });
Object.defineProperty(globalThis, 'localStorage', { value: window.localStorage, configurable: true });
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
let clipboardText = '';
Object.defineProperty(window.navigator, 'clipboard', {
  value: { writeText: async (text) => { clipboardText = String(text); } },
  configurable: true,
});
// React 19's legacy input polyfill probes the IE attachEvent API; jsdom has none.
window.HTMLElement.prototype.attachEvent = () => {};
window.HTMLElement.prototype.detachEvent = () => {};

let captured;
window.__ModuleLoader__ = {
  load: (definition) => {
    captured = definition;
  },
};

// ---------------------------------------------------------------------------
// Fetch stub: a stand-in for the plugin Host half's same-origin routes.
// ---------------------------------------------------------------------------

const HELPER = '/api/dsh-leetcode-bench';
let helperOnline = true;
let healthUser = null;
const helperCalls = [];

/** The list the host would answer with; 120 rows so paging has something to do. */
const BASE_PROBLEMS = [
  { id: '1', title: '两数之和', slug: 'two-sum', difficulty: '简单', status: 'AC', paidOnly: false, tags: ['数组', '哈希表'] },
  { id: '15', title: '三数之和', slug: '3sum', difficulty: '中等', status: 'NOT_STARTED', paidOnly: false, tags: ['数组', '双指针', '排序'] },
  { id: '4', title: '寻找两个正序数组的中位数', slug: 'median-of-two-sorted-arrays', difficulty: '困难', status: 'NOT_STARTED', paidOnly: true, tags: ['数组', '二分查找'] },
];
for (let index = 4; index <= 120; index += 1) {
  BASE_PROBLEMS.push({
    id: String(100 + index),
    title: `题目 ${index}`,
    slug: `problem-${index}`,
    difficulty: index % 3 === 0 ? '困难' : index % 3 === 1 ? '简单' : '中等',
    status: 'NOT_STARTED',
    paidOnly: false,
    tags: [],
  });
}

const TWO_SUM_SNIPPET = 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}';

const STATEMENTS = {
  'two-sum': {
    ok: true,
    questionId: '1',
    frontendId: '1',
    title: '两数之和',
    titleEn: 'Two Sum',
    difficulty: '简单',
    content: '<p>给定一个整数数组 <code>nums</code> 和一个整数目标值 target。</p>',
    tags: ['数组', '哈希表'],
    javaSnippet: TWO_SUM_SNIPPET,
  },
  '3sum': {
    ok: true,
    questionId: '15',
    frontendId: '15',
    title: '三数之和',
    titleEn: '3Sum',
    difficulty: '中等',
    content: '<div class="content"><p>给你一个整数数组 <code>nums</code>，判断是否存在三元组满足条件。</p><script>window.__pwned = 1;</script><p onclick="alert(1)">注意：答案中不可以包含重复的三元组。</p><a href="javascript:alert(2)">危险链接</a><a href="/problems/two-sum/">两数之和</a><img src="//assets.leetcode-cn.com/a.png" onerror="alert(3)" alt="图"></div>',
    tags: ['数组', '双指针', '排序'],
    javaSnippet: null,
  },
  'median-of-two-sorted-arrays': {
    ok: true,
    questionId: '4',
    frontendId: '4',
    title: '寻找两个正序数组的中位数',
    titleEn: 'Median of Two Sorted Arrays',
    difficulty: '困难',
    content: '<p>给定两个大小分别为 m 和 n 的正序数组。</p>',
    tags: ['数组', '二分查找'],
    javaSnippet: null,
  },
};

function statementFor(slug) {
  if (STATEMENTS[slug] !== undefined) return STATEMENTS[slug];
  return {
    ok: true,
    questionId: '999',
    frontendId: '999',
    title: `题目说明 ${slug}`,
    titleEn: slug,
    difficulty: '简单',
    content: '<p>这是一段占位题面。</p>',
    tags: [],
    javaSnippet: null,
  };
}

function jsonResponse(payload, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => payload,
  };
}

async function fetchStub(url, options = {}) {
  const target = new URL(String(url), 'http://app.local');
  if (!helperOnline) throw new Error('Failed to fetch');
  if (!target.pathname.startsWith(`${HELPER}/`)) throw new Error(`unexpected route: ${target.pathname}`);
  const route = target.pathname.slice(HELPER.length);
  helperCalls.push({ url: route + target.search, options });
  if (route === '/health') {
    return jsonResponse(healthUser === null
      ? { ok: true, signedIn: false, username: '' }
      : { ok: true, signedIn: true, username: healthUser });
  }
  if (route === '/problems') {
    const skip = Math.max(Number(target.searchParams.get('skip') ?? 0), 0);
    const limit = Math.min(Math.max(Number(target.searchParams.get('limit') ?? 50), 1), 100);
    const search = target.searchParams.get('search') ?? '';
    const difficulty = target.searchParams.get('difficulty') ?? '';
    let rows = BASE_PROBLEMS;
    if (search !== '') rows = rows.filter((item) => item.title.includes(search) || item.tags.includes(search));
    if (difficulty !== '') {
      const label = { EASY: '简单', MEDIUM: '中等', HARD: '困难' }[difficulty];
      rows = rows.filter((item) => item.difficulty === label);
    }
    return jsonResponse({ ok: true, total: rows.length, skip, limit, questions: rows.slice(skip, skip + limit) });
  }
  if (route === '/statement') {
    return jsonResponse(statementFor(target.searchParams.get('slug') ?? ''));
  }
  if (options.headers?.['x-dsh-helper'] !== '1') {
    return jsonResponse({ ok: false, error: '缺少 x-dsh-helper 请求头' });
  }
  if (route === '/auth') {
    const body = JSON.parse(String(options.body ?? '{}'));
    if (body.session === '' || body.csrf === '') return jsonResponse({ ok: false, error: 'cookie 是空的' });
    healthUser = 'helper-user';
    return jsonResponse({ ok: true, signedIn: true, username: 'helper-user' });
  }
  if (route === '/submit') {
    const body = JSON.parse(String(options.body ?? '{}'));
    if (typeof body.code !== 'string' || body.code.trim() === '') return jsonResponse({ ok: false, error: '代码是空的' });
    return jsonResponse({
      ok: true,
      submissionId: '123',
      state: 'SUCCESS',
      statusCode: 10,
      statusMsg: '通过',
      passed: true,
      totalCorrect: 57,
      totalTestcases: 57,
      runtime: '3 ms',
      memory: '42.1 MB',
      compileError: null,
    });
  }
  return jsonResponse({ ok: false, error: `未知接口：${target.pathname}` });
}

const sandbox = {
  window,
  document: window.document,
  navigator: window.navigator,
  localStorage: window.localStorage,
  console,
  setTimeout,
  clearTimeout,
  queueMicrotask,
  Promise,
  fetch: fetchStub,
};

// A foreign state key proves the page only ever reads its own slot.
const FOREIGN_KEY = 'some-other-plugin/state/v1';
window.localStorage.setItem(FOREIGN_KEY, JSON.stringify({ untouched: true }));
// v2 payload under the v1 key name; slugs are the identity.
window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
  version: 2,
  drafts: { 'two-sum': 'class Solution {\n    int x;\n}' },
  checked: { 'two-sum': true },
  selected: null,
  bankHidden: false,
  filters: { search: '', difficulty: '' },
}));

vm.runInNewContext(source, sandbox, { filename: 'lib/client.js' });

check(captured !== undefined, 'client module registered with the module loader');
check(captured?.id === PACKAGE, `module id must be ${PACKAGE}`);
check(!source.includes('%%COMPLETIONS%%') && !source.includes('%%EPISODES%%') && !source.includes('%%SIGNATURES%%'), 'the built module has no unresolved data markers');
check(!/bilibili|bvid/i.test(source), 'no bundled video index survives in the client');

const zh = new Map();
const enKeys = new Set();
const slotRegistrations = [];
const effects = [];

function translate(key, params) {
  const template = zh.get(key) ?? key;
  if (params === undefined) return template;
  return template.replace(/\{(\w+)\}/g, (match, name) => (name in params ? String(params[name]) : match));
}

const ctx = {
  locale: {
    register: (ns, dicts) => {
      for (const [key, value] of Object.entries(dicts.zh ?? {})) zh.set(key, value);
      for (const key of Object.keys(dicts.en ?? {})) enKeys.add(key);
      return () => {};
    },
    bind: () => translate,
  },
  slots: {
    inject: (name, callback) => {
      const value = callback();
      return typeof value === 'function' ? value : () => {};
    },
    register: (options, component) => {
      slotRegistrations.push({ options, component });
      return () => {};
    },
  },
  effect: (fn) => {
    const dispose = fn();
    if (typeof dispose === 'function') effects.push(dispose);
    return dispose;
  },
};

const module = captured.factory((name) => {
  if (name === 'react') return React;
  throw new Error(`unexpected require: ${name}`);
});
check(Array.isArray(module.inject) && module.inject.includes('slots') && module.inject.includes('locale'), 'plugin injects the slots and locale services');
check(!module.inject.includes('sidebarRightTabs') && !module.inject.includes('sidebarRight'), 'plugin no longer depends on the right sidebar');
check(typeof module.apply === 'function', 'plugin exposes apply');
module.apply(ctx);
await new Promise((resolve) => setTimeout(resolve, 40));

// The sidebar icon must pair with exactly one main panel: same id / key.
const mainSlot = slotRegistrations.find((entry) => entry.options.name === 'main');
const entrySlot = slotRegistrations.find((entry) => entry.options.name === 'sidebar.panellist');
check(mainSlot !== undefined, 'main slot is registered');
check(entrySlot !== undefined, 'sidebar.panellist slot is registered');
check(mainSlot?.options.key === PANEL_ID, `main registers under the ${PANEL_ID} key`);
check(entrySlot?.options.id === mainSlot?.options.key, 'the sidebar entry id equals the main key');
check(typeof entrySlot?.options.order === 'number', 'the sidebar entry declares a numeric order');
check(typeof entrySlot?.options.label === 'function', 'the sidebar entry carries a label thunk');
check(typeof entrySlot?.options.label?.() === 'string' && entrySlot.options.label().trim() !== '', 'the sidebar entry is labelled in the active locale');
check(slotRegistrations.every((entry) => String(entry.options.name).indexOf('sidebar.right') !== 0), 'no right sidebar tab slot remains');
check(slotRegistrations.length === 2, 'the plugin registers exactly the icon and the page');

const act = React.act;
async function flush() {
  await act(async () => {
    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

async function wait(ms) {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, ms));
  });
  await flush();
}

function click(node) {
  node.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
}

function nativeValue(node, value) {
  const proto = node.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, 'value').set.call(node, value);
  node.dispatchEvent(new window.Event('input', { bubbles: true }));
}

async function typeInto(node, value) {
  await act(async () => {
    node.dispatchEvent(new window.FocusEvent('focusin', { bubbles: true }));
    nativeValue(node, value);
    node.dispatchEvent(new window.KeyboardEvent('keyup', { key: 'x', bubbles: true }));
  });
}

// The icon is a 20px, theme-colored, decorative svg.
const iconContainer = window.document.createElement('div');
window.document.body.appendChild(iconContainer);
const iconRoot = createRoot(iconContainer);
await act(async () => {
  iconRoot.render(React.createElement(entrySlot.component, { size: 20, active: true }));
});
const icon = iconContainer.querySelector('svg');
check(icon !== null, 'the sidebar icon renders an svg');
check(icon?.getAttribute('width') === '20' && icon?.getAttribute('height') === '20', 'the sidebar icon is 20px square');
check(icon?.getAttribute('viewBox') === '0 0 20 20', 'the sidebar icon uses a 20px viewBox');
check(icon?.getAttribute('aria-hidden') === 'true', 'the sidebar icon is decorative for assistive tech');
check(icon?.querySelectorAll('[stroke="currentColor"]').length > 0, 'the icon paints with currentColor');
await act(async () => {
  iconRoot.unmount();
});
iconContainer.remove();

const container = window.document.getElementById('root');
const reactRoot = createRoot(container);
const BenchPage = mainSlot.component;

await act(async () => {
  reactRoot.render(React.createElement(BenchPage, { translate }));
});
await flush();

const text = () => container.textContent;
const problemCalls = () => helperCalls.filter((call) => call.url.startsWith('/problems?'));
const lastProblemCall = () => problemCalls()[problemCalls().length - 1];
function paramsOf(call) {
  const url = new URL(String(call?.url ?? ''), 'http://app.local');
  return Object.fromEntries(url.searchParams.entries());
}
const rowFor = (title) => [...container.querySelectorAll('li.ab-row')]
  .find((row) => row.querySelector('button.ab-problemTitle')?.textContent === title);
const detailTitle = () => container.querySelector('.ab-detailTitle')?.textContent ?? '';
const editor = () => container.querySelector('textarea.ab-textarea');

check(helperCalls.some((call) => call.url === '/health'), 'page probes /health once on mount');
check(container.querySelector('.ab-banner') === null, 'no offline banner while /health answers');

// ---------------------------------------------------------------------------
// The fetched bank: first page, then search, difficulty and load-more.
// ---------------------------------------------------------------------------

const firstProblems = problemCalls()[0];
check(firstProblems !== undefined, 'mounting the page requests /problems');
check(paramsOf(firstProblems).skip === '0', 'the first page asks for skip=0');
check(paramsOf(firstProblems).limit === '50', 'the first page asks for limit=50');
check(paramsOf(firstProblems).search === '', 'the first page sends an empty search');
check(paramsOf(firstProblems).difficulty === '', 'the first page sends no difficulty filter');
check(container.querySelectorAll('li.ab-row').length === 50, 'the first page renders its 50 rows');
check(text().includes('已通过 1（本机勾选）· 全站 120 题'), 'the header counts local check-offs against the fetched total');
check(text().includes('已加载 50 / 120 题'), 'the bank reports loaded / total');
check(text().includes('搜索题目 / 关键词') === false, 'the search placeholder is not body text');

const twoSumRow = rowFor('两数之和');
const threeSumRow = rowFor('三数之和');
const medianRow = rowFor('寻找两个正序数组的中位数');
check(twoSumRow !== undefined && threeSumRow !== undefined && medianRow !== undefined, 'the first rows render by title');
check(twoSumRow?.querySelector('a.ab-num')?.textContent === '1', 'rows show the frontend id');
check(twoSumRow?.querySelector('.ab-badge[data-level="EASY"]')?.textContent === '简单', 'rows show a Chinese difficulty badge');
check(threeSumRow?.querySelector('.ab-badge[data-level="MEDIUM"]')?.textContent === '中等', 'medium difficulty is labelled');
check(medianRow?.querySelector('.ab-badge[data-level="HARD"]')?.textContent === '困难', 'hard difficulty is labelled');
check(medianRow?.querySelector('.ab-badge[data-vip="true"]')?.textContent === '会员', 'paidOnly rows carry the member badge');
check(twoSumRow?.querySelector('.ab-ac') !== null, 'status AC marks the row as accepted');
check(threeSumRow?.querySelector('.ab-ac') === null, 'an unsolved row has no check mark');
check(twoSumRow?.querySelector('input.ab-check')?.checked === true, 'the stored check-off wins on first paint');

// Check-off toggles update the header and the local state, keyed by slug.
await act(async () => {
  click(twoSumRow.querySelector('input.ab-check'));
});
check(text().includes('已通过 0（本机勾选）'), 'clearing a check-off updates the header');
let stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
check(stored?.checked?.['two-sum'] === undefined, 'the check-off is removed from local state');
await act(async () => {
  click(threeSumRow.querySelector('input.ab-check'));
});
check(text().includes('已通过 1（本机勾选）'), 'checking another row counts it');
stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
check(stored?.checked?.['3sum'] === true && stored?.version === 2, 'check-offs persist under v2, keyed by slug');
check(threeSumRow.querySelector('.ab-ac') !== null, 'a local check-off shows the accepted mark');

// Search debounces into a request that carries the keyword and resets paging.
const searchInput = container.querySelector('input.ab-search');
check(searchInput !== null, 'the bank has a search box');
await typeInto(searchInput, '数组');
check(problemCalls().length >= 1, 'typing keeps the previous list until the debounce fires');
await wait(360);
check(paramsOf(lastProblemCall()).search === '数组', 'the debounced search request carries the keyword');
check(paramsOf(lastProblemCall()).skip === '0', 'a new search resets skip to 0');
check(container.querySelectorAll('li.ab-row').length === 3, 'the search result replaces the list');

// Clearing the box restores the unfiltered first page.
await typeInto(searchInput, '');
await wait(360);
check(paramsOf(lastProblemCall()).search === '', 'clearing the box asks for the unfiltered list again');
check(container.querySelectorAll('li.ab-row').length === 50, 'the first page comes back');

// Difficulty is a segmented filter, also persisted.
const easyButton = container.querySelector('.ab-seg[data-level="EASY"]');
check(easyButton !== null && easyButton.getAttribute('aria-pressed') === 'false', 'the difficulty segments render unpressed');
await act(async () => {
  click(easyButton);
});
await flush();
check(paramsOf(lastProblemCall()).difficulty === 'EASY', 'the difficulty segment sends difficulty=EASY');
check(paramsOf(lastProblemCall()).skip === '0', 'changing difficulty resets skip to 0');
check(container.querySelectorAll('li.ab-row').length > 0, 'the filtered list renders');
check([...container.querySelectorAll('li.ab-row .ab-badge[data-level]')].every((node) => node.getAttribute('data-level') === 'EASY'), 'every filtered row is easy');
const allButton = container.querySelector('.ab-seg[data-level="ALL"]');
await act(async () => {
  click(allButton);
});
await flush();
check(paramsOf(lastProblemCall()).difficulty === '', 'the all segment clears the difficulty filter');
check(container.querySelectorAll('li.ab-row').length === 50, 'the unfiltered first page returns');
check(JSON.parse(window.localStorage.getItem(STORAGE_KEY))?.filters?.difficulty === '', 'the filter is persisted in local state');

// Load more walks skip forward until the loaded rows reach the total.
let loadMoreButton = container.querySelector('button[data-load-more]');
check(loadMoreButton !== null && loadMoreButton.disabled === false, 'load more is enabled while rows remain');
await act(async () => {
  click(loadMoreButton);
});
await flush();
check(paramsOf(lastProblemCall()).skip === '50', 'load more asks for skip=50');
check(container.querySelectorAll('li.ab-row').length === 100, 'load more appends the next page');
loadMoreButton = container.querySelector('button[data-load-more]');
await act(async () => {
  click(loadMoreButton);
});
await flush();
check(paramsOf(lastProblemCall()).skip === '100', 'the second load more asks for skip=100');
check(container.querySelectorAll('li.ab-row').length === 120, 'the whole fetched list is on screen');
check(container.querySelector('button[data-load-more]')?.disabled === true, 'load more is disabled once questions.length >= total');
check(text().includes('已加载 120 / 120 题'), 'the bank reports the complete page');

// One button folds the whole bank away so the answer area gets the width.
const bankToggle = [...container.querySelectorAll('button.ab-mini')].find((node) => node.textContent === '隐藏题库');
check(bankToggle !== undefined, 'the bank toggle renders');
await act(async () => {
  click(bankToggle);
});
check(container.querySelector('.ab-aside') === null, 'hiding the bank removes the whole column');
check(container.querySelector('.ab-grid')?.getAttribute('data-bank') === 'hidden', 'the grid collapses to one column');
check(JSON.parse(window.localStorage.getItem(STORAGE_KEY))?.bankHidden === true, 'the folded bank is remembered locally');
const showToggle = [...container.querySelectorAll('button.ab-mini')].find((node) => node.textContent === '显示题库');
check(showToggle !== undefined, 'the toggle offers to bring the bank back');
await act(async () => {
  click(showToggle);
});
check(container.querySelector('.ab-aside') !== null, 'showing the bank restores the column');

// ---------------------------------------------------------------------------
// Selection: detail from the slug, statement in the reading pane.
// ---------------------------------------------------------------------------

await act(async () => {
  click(rowFor('两数之和').querySelector('button.ab-problemTitle'));
});
await flush();
check(detailTitle() === '#1 两数之和', 'the detail header renders #id and title');
check(container.querySelector('.ab-detail .ab-badge[data-level="EASY"]')?.textContent === '简单', 'the detail header shows the difficulty');
check([...container.querySelectorAll('.ab-detail .ab-tag')].map((node) => node.textContent).includes('哈希表'), 'the detail header shows the tags');
check(container.querySelector('.ab-detail a[href="https://leetcode.cn/problems/two-sum/"]')?.getAttribute('target') === '_blank', 'the detail header links to leetcode.cn');
check(container.querySelector('.ab-paneRead .ab-statement') !== null, 'the statement lives in the left reading pane');
check(container.querySelector('.ab-paneWrite textarea.ab-textarea') !== null, 'the editor lives in the right writing pane');
check(helperCalls.some((call) => call.url === '/statement?slug=two-sum'), 'the statement request carries the selected slug');
check(JSON.parse(window.localStorage.getItem(STORAGE_KEY))?.selected === 'two-sum', 'the selected slug is persisted');
check(editor().value === 'class Solution {\n    int x;\n}', 'the seeded draft renders in the editor');

const navButtons = () => [...container.querySelectorAll('button.ab-nav')];
check(navButtons().length === 2, 'the detail offers prev and next');
check(navButtons()[0].disabled === true, 'prev is disabled on the first loaded row');
check(navButtons()[1].disabled === false, 'next is enabled inside the loaded list');
await act(async () => {
  click(navButtons()[1]);
});
await flush();
check(detailTitle() === '#15 三数之和', 'next moves to the following loaded row');
await act(async () => {
  click(navButtons()[0]);
});
await flush();
check(detailTitle() === '#1 两数之和', 'prev comes back');

// Each slug keeps its own draft: switching away and back restores it.
await act(async () => {
  click(rowFor('三数之和').querySelector('button.ab-problemTitle'));
});
await flush();
check(editor().value === '', 'a problem without a draft opens an empty editor');
await typeInto(editor(), 'class Solution { int y; }');
check(JSON.parse(window.localStorage.getItem(STORAGE_KEY))?.drafts?.['3sum'] === 'class Solution { int y; }', 'typing stores the draft under its slug');
await act(async () => {
  click(rowFor('两数之和').querySelector('button.ab-problemTitle'));
});
check(editor().value === 'class Solution {\n    int x;\n}', 'coming back restores that draft');
stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
check(stored?.drafts?.['two-sum'] === 'class Solution {\n    int x;\n}' && stored?.drafts?.['3sum'] === 'class Solution { int y; }', 'both drafts stay separate');

// Statement sanitising runs on whatever HTML the statement route returns.
await act(async () => {
  click(rowFor('三数之和').querySelector('button.ab-problemTitle'));
});
await flush();
const statementPane = container.querySelector('.ab-statement');
check(statementPane !== null, 'the statement section renders for a selected problem');
check(statementPane?.textContent.includes('给你一个整数数组'), 'the statement renders the Chinese content');
check(statementPane?.textContent.includes('答案中不可以包含重复的三元组'), 'sanitising keeps normal paragraphs');
check(statementPane?.querySelector('code') !== null, 'sanitising keeps inline code');
check(statementPane?.querySelector('script') === null, 'sanitising drops script tags');
check(statementPane?.textContent.includes('__pwned') === false, 'sanitising drops the script body too');
check(statementPane?.querySelector('[onclick]') === null, 'sanitising drops inline handlers');
check(statementPane?.querySelector('a[href^="javascript:"]') === null, 'sanitising drops javascript: links');
check(statementPane?.querySelector('a[href="https://leetcode.cn/problems/two-sum/"]')?.getAttribute('target') === '_blank', 'safe links stay, opened in a new tab');
check(statementPane?.querySelector('img')?.getAttribute('onerror') === null, 'sanitising drops image event handlers');
check(statementPane?.querySelector('img')?.getAttribute('src') === 'https://assets.leetcode-cn.com/a.png', 'protocol-relative image URLs are completed');

// The Java template button copies the official snippet into the editor.
await act(async () => {
  click(rowFor('两数之和').querySelector('button.ab-problemTitle'));
});
await flush();
const templateButton = container.querySelector('.ab-detail [data-insert-template]');
check(templateButton !== null && templateButton.disabled === false, 'the template button is enabled when a snippet exists');
await act(async () => {
  click(templateButton);
});
check(editor().value === TWO_SUM_SNIPPET, 'the template button inserts the Java snippet');
check(JSON.parse(window.localStorage.getItem(STORAGE_KEY))?.drafts?.['two-sum'] === TWO_SUM_SNIPPET, 'the inserted template becomes the draft');
await act(async () => {
  click(rowFor('寻找两个正序数组的中位数').querySelector('button.ab-problemTitle'));
});
await flush();
check(container.querySelector('.ab-detail [data-insert-template]')?.disabled === true, 'the template button is disabled without a snippet');
await act(async () => {
  click(rowFor('两数之和').querySelector('button.ab-problemTitle'));
});
await flush();

// Submit uses the current slug's draft and shows the verdict inline.
const textarea = editor();
const submitButton = container.querySelector('button.ab-submitBtn');
check(submitButton !== null && submitButton.disabled === false, 'submit is enabled with a problem and code');
await act(async () => {
  click(submitButton);
});
await flush();
const verdict = container.querySelector('.ab-verdict');
check(verdict !== null && verdict.textContent.includes('通过'), 'submit shows the accepted verdict');
const submitResult = container.querySelector('.ab-result');
check(submitResult?.textContent.includes('57 / 57'), 'submit shows the passed / total test case count');
check(submitResult?.textContent.includes('运行时间 3 ms'), 'submit shows the runtime');
check(submitResult?.textContent.includes('42.1 MB'), 'submit shows the memory');
const submitCall = helperCalls.find((call) => call.url === '/submit');
check(submitCall !== undefined, 'submit calls the helper');
check(submitCall?.options.method === 'POST', 'submit uses POST');
check(submitCall?.options.headers?.['x-dsh-helper'] === '1', 'submit carries x-dsh-helper: 1');
check(submitCall?.options.headers?.['content-type'] === 'application/json', 'submit sends JSON');
const submittedBody = JSON.parse(String(submitCall?.options.body ?? '{}'));
check(submittedBody.slug === 'two-sum', 'submit sends the selected problem slug');
check(typeof submittedBody.code === 'string' && submittedBody.code.includes('public int[] twoSum'), 'submit sends the current draft');
check(submittedBody.lang === 'java', 'submit sends the java language');
check(JSON.parse(window.localStorage.getItem(STORAGE_KEY))?.drafts?.['3sum'] === 'class Solution { int y; }', 'submitting does not disturb another draft');

// Anonymous: the cookie form is on screen. Signing in removes it entirely.
const loginInputs = [...container.querySelectorAll('input.ab-input')];
check(loginInputs.length === 2, 'the login panel has a session and a csrf field');
const setInput = (node, value) => nativeValue(node, value);
await act(async () => {
  loginInputs[0].dispatchEvent(new window.FocusEvent('focusin', { bubbles: true }));
  setInput(loginInputs[0], 'session-value');
  loginInputs[0].dispatchEvent(new window.KeyboardEvent('keyup', { key: 'e', bubbles: true }));
  loginInputs[1].dispatchEvent(new window.FocusEvent('focusin', { bubbles: true }));
  setInput(loginInputs[1], 'csrf-value');
  loginInputs[1].dispatchEvent(new window.KeyboardEvent('keyup', { key: 'n', bubbles: true }));
});
const loginButton = [...container.querySelectorAll('button.ab-btn')].find((node) => node.textContent === '保存并验证');
check(loginButton !== undefined, 'the login panel has a save button');
await act(async () => {
  click(loginButton);
});
await flush();
const authCall = helperCalls.find((call) => call.url === '/auth');
check(authCall?.options.headers?.['x-dsh-helper'] === '1', 'auth carries x-dsh-helper: 1');
check(JSON.parse(String(authCall?.options.body ?? '{}')).session === 'session-value', 'auth sends the session cookie');
check(container.textContent.includes('helper-user'), 'a verified login shows the username');
check(container.querySelector('.ab-account')?.textContent === 'helper-user', 'the signed-in account is a quiet chip in the page header');
check(container.querySelector('.ab-login') === null, 'the whole login section disappears once signed in');
check(container.querySelectorAll('input.ab-input').length === 0, 'signed-in users never see empty cookie inputs');
check(!window.localStorage.getItem(STORAGE_KEY).includes('session-value'), 'credentials never reach localStorage');
healthUser = null;

// ---------------------------------------------------------------------------
// Editor: local completion, Tab indent, Enter ownership.
// ---------------------------------------------------------------------------

await act(async () => {
  textarea.focus();
  textarea.dispatchEvent(new window.FocusEvent('focusin', { bubbles: true }));
  nativeValue(textarea, 'int x = map.getOr');
  textarea.dispatchEvent(new window.KeyboardEvent('keyup', { key: 'e', bubbles: true }));
});
check(container.querySelector('.ab-complete') !== null, 'completion popup opens on a prefix');
check(container.textContent.includes('getOrDefault'), 'completion lists getOrDefault for "getOr"');
await act(async () => {
  textarea.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
});
check(textarea.value === 'int x = map.getOrDefault(key, defaultValue)', 'Tab accepts the completion');

await act(async () => {
  nativeValue(textarea, 'Arrays.so');
  textarea.setSelectionRange(10, 10);
  textarea.dispatchEvent(new window.KeyboardEvent('keyup', { key: 'o', bubbles: true }));
});
check(container.textContent.includes('Arrays.sort'), 'static API completes after its receiver');
await act(async () => {
  textarea.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
});
check(textarea.value === 'Arrays.sort(nums);', 'receiver-aware insertion replaces the whole typed call');

await act(async () => {
  nativeValue(textarea, 'char c = ch.isDig');
  textarea.setSelectionRange(19, 19);
  textarea.dispatchEvent(new window.KeyboardEvent('keyup', { key: 'g', bubbles: true }));
});
check(container.textContent.includes('isDigit') && container.textContent.includes('Character'), 'character helpers complete from the API dictionary');
await act(async () => {
  textarea.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
});
check(textarea.value.includes('isDigit('), 'Tab inserts the API call');

// Names already declared in the buffer complete ahead of the static dictionary.
await act(async () => {
  nativeValue(textarea, 'public int[] twoSum(int[] nums, int target) {\n    int left = 0;\n    int right = nums.length - 1;\n    return lef');
  const end = textarea.value.length;
  textarea.setSelectionRange(end, end);
  textarea.dispatchEvent(new window.KeyboardEvent('keyup', { key: 'f', bubbles: true }));
});
check(container.textContent.includes('left'), 'a variable declared in the buffer is offered');
check(container.textContent.includes('Var'), 'buffer names are tagged as variables');
await act(async () => {
  textarea.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
});
check(textarea.value.endsWith('return left'), 'Tab inserts the buffer variable');

// Tab indents and Shift+Tab outdents, keeping the focus inside the editor.
const templateCode = 'class Solution {\n    int x;\n}';
await act(async () => {
  textarea.dispatchEvent(new window.FocusEvent('focusin', { bubbles: true }));
  nativeValue(textarea, templateCode);
  textarea.dispatchEvent(new window.KeyboardEvent('keyup', { key: '}', bubbles: true }));
});
await flush();
const secondLine = templateCode.indexOf('\n') + 1;
await act(async () => {
  textarea.focus();
  textarea.setSelectionRange(secondLine + 1, secondLine + 8);
  textarea.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Tab', bubbles: true, shiftKey: true }));
});
check(textarea.value === templateCode.slice(0, secondLine) + templateCode.slice(secondLine + 4), `Shift+Tab outdents the selected line (got ${JSON.stringify(textarea.value)})`);
check(document.activeElement === textarea, 'Shift+Tab keeps the focus inside the editor');
await act(async () => {
  textarea.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
});
check(textarea.value === templateCode, `Tab indents the selected line back (got ${JSON.stringify(textarea.value)})`);
check(document.activeElement === textarea, 'Tab keeps the focus inside the editor');
check(container.querySelector('.ab-complete') === null, 'Tab does not open the completion list');

await act(async () => {
  textarea.dispatchEvent(new window.FocusEvent('focusin', { bubbles: true }));
  nativeValue(textarea, 'class A {');
  textarea.setSelectionRange(9, 9);
  textarea.dispatchEvent(new window.KeyboardEvent('keyup', { key: '{', bubbles: true }));
});
const enterEvent = new window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
await act(async () => {
  textarea.dispatchEvent(enterEvent);
});
check(enterEvent.defaultPrevented === true, 'Enter is handled by the editor, not the browser');

// ---------------------------------------------------------------------------
// AI coach: the page composes the message and copies it, the chat answers.
// ---------------------------------------------------------------------------

const coachCode = 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        return null;\n    }\n}';
await act(async () => {
  textarea.dispatchEvent(new window.FocusEvent('focusin', { bubbles: true }));
  textarea.focus();
  nativeValue(textarea, coachCode);
  textarea.setSelectionRange(coachCode.length, coachCode.length);
});
await flush();

const coachCard = container.querySelector('.ab-paneWrite > .ab-coach');
check(coachCard !== null, 'the coach card renders inside the writing pane');
const copyButton = (kind) => coachCard?.querySelector(`[data-coach-copy="${kind}"]`);
for (const kind of ['explain', 'review']) {
  check(copyButton(kind) !== null, `the coach offers the ${kind} copy action`);
}
check(container.querySelectorAll('.ab-coach [data-coach-copy]').length === 2, 'the coach keeps only the two intent buttons');
check(coachCard?.querySelector('textarea') === null, 'the coach has no input box of its own');

clipboardText = '';
await act(async () => {
  click(copyButton('explain'));
});
await flush();
check(clipboardText.includes('题目：#1 两数之和'), 'the copied prompt carries the problem');
check(clipboardText.includes('题面：'), 'the copied prompt carries the statement text');
check(clipboardText.includes('我的 Java 代码'), 'the copied prompt carries the draft heading');
const fenced = /```java\n([\s\S]*?)\n```/.exec(clipboardText);
check(fenced !== null && fenced[1].trim() !== '', 'the copied prompt carries the draft inside a java fence');
check(clipboardText.includes('请先给直觉'), 'the copied prompt carries the explain intent');
check(helperCalls.filter((call) => call.url === '/coach').length === 0, 'nothing is sent to an in-page chat route');

await act(async () => {
  click(copyButton('review'));
});
await flush();
check(clipboardText.includes('指出它为什么没做对'), 'the review action asks why the code fails');
check(clipboardText.includes('openui'), 'the copied prompt asks for an openui demonstration');

// Without a problem the actions are inert and the editor is read-only.
await act(async () => {
  click(container.querySelector('.ab-detail .ab-iconBtn'));
});
check(detailTitle() === '', 'closing the detail clears the selection');
check(editor()?.readOnly === true, 'the editor is read-only while no problem is selected');
check(container.querySelector('.ab-paneWrite > .ab-coach [data-coach-copy="explain"]')?.disabled === true, 'the copy actions are disabled without a problem');
check(!window.localStorage.getItem(STORAGE_KEY).includes('请先给直觉'), 'the composed prompt never reaches localStorage');

// ---------------------------------------------------------------------------
// Offline helper: a banner, a failed list, but the page still mounts.
// ---------------------------------------------------------------------------

helperOnline = false;
const offlineContainer = window.document.createElement('div');
window.document.body.appendChild(offlineContainer);
const offlineRoot = createRoot(offlineContainer);
await act(async () => {
  offlineRoot.render(React.createElement(BenchPage, { translate }));
});
await flush();
const banner = offlineContainer.querySelector('.ab-banner');
check(banner !== null, 'an offline helper shows a banner');
check(banner?.textContent.includes('本地提交服务未就绪'), 'the banner says the submission service is not ready');
check(banner?.textContent.includes('重启一次 DSH'), 'the banner says to restart DSH');
check(offlineContainer.querySelector('.ab-bank .ab-bankNote')?.textContent.includes('题目列表没取到'), 'the bank reports the failed list');
check(offlineContainer.querySelector('.ab-bank .ab-bankNote')?.textContent.includes('本地提交服务未就绪'), 'the bank failure points at the offline helper');
check(offlineContainer.querySelector('textarea.ab-textarea')?.readOnly === true, 'no selection means a read-only editor');
const offlineWriteChildren = [...(offlineContainer.querySelector('.ab-paneWrite')?.children ?? [])].map((node) => node.className);
check(offlineWriteChildren.includes('ab-login') && offlineWriteChildren.indexOf('ab-coach') < offlineWriteChildren.indexOf('ab-login'), 'the coach card sits between submit and the login panel');
await act(async () => {
  offlineRoot.unmount();
});
offlineContainer.remove();
helperOnline = true;

// The page also renders with the framework locale seat absent, following the document language.
window.document.documentElement.lang = 'en';
const enContainer = window.document.createElement('div');
window.document.body.appendChild(enContainer);
const enRoot = createRoot(enContainer);
await act(async () => {
  enRoot.render(React.createElement(BenchPage, {}));
});
await flush();
check(enContainer.textContent.includes('Problem bank') && enContainer.textContent.includes('Hide bank'), 'English fallback copy renders without the locale seat');
check(enContainer.querySelector('input.ab-search')?.getAttribute('placeholder') === 'Search problems / keywords', 'the English search box follows the document language');
check(enContainer.textContent.includes('Loaded 50 / 120'), 'English fallback keeps the fetched counts');
await act(async () => {
  enRoot.unmount();
});
enContainer.remove();
window.document.documentElement.lang = 'zh';

// ---------------------------------------------------------------------------
// A v1 payload is ignored outright: no migration, no other key read.
// ---------------------------------------------------------------------------

window.localStorage.setItem(FOREIGN_KEY, JSON.stringify({ untouched: true }));
window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
  version: 1,
  checked: { 15: true },
  expanded: { 1: true },
  selected: 2080,
  codes: { 15: 'class Solution { /* legacy */ }' },
}));
let v1Captured;
window.__ModuleLoader__ = { load: (definition) => { v1Captured = definition; } };
vm.runInNewContext(source, sandbox, { filename: 'lib/client.v1.js' });
const v1module = v1Captured.factory((name) => {
  if (name === 'react') return React;
  throw new Error(`unexpected require: ${name}`);
});
const v1zh = new Map();
const v1slots = [];
function v1translate(key, params) {
  const template = v1zh.get(key) ?? key;
  if (params === undefined) return template;
  return template.replace(/\{(\w+)\}/g, (match, name) => (name in params ? String(params[name]) : match));
}
v1module.apply({
  locale: {
    register: (ns, dicts) => {
      for (const [key, value] of Object.entries(dicts.zh ?? {})) v1zh.set(key, value);
      return () => {};
    },
    bind: () => v1translate,
  },
  slots: {
    inject: (name, callback) => {
      const value = callback();
      return typeof value === 'function' ? value : () => {};
    },
    register: (options, component) => {
      v1slots.push({ options, component });
      return () => {};
    },
  },
  effect: (fn) => {
    const dispose = fn();
    return typeof dispose === 'function' ? dispose : () => {};
  },
});
const v1Container = window.document.createElement('div');
window.document.body.appendChild(v1Container);
const v1Root = createRoot(v1Container);
const v1Page = v1slots.find((entry) => entry.options.name === 'main').component;
await act(async () => {
  v1Root.render(React.createElement(v1Page, { translate: v1translate }));
});
await flush();
check(v1Container.textContent.includes('已通过 0（本机勾选）'), 'a v1 payload is ignored, not migrated');
check(v1Container.querySelectorAll('li.ab-row').length === 50, 'the v1 payload does not block the fetched bank');
await act(async () => {
  click(v1Container.querySelector('li.ab-row button.ab-problemTitle'));
});
await flush();
check(v1Container.querySelector('textarea.ab-textarea')?.value === '', 'v1 drafts are not carried into the editor');
const v1Stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
check(v1Stored?.version === 2, 'the first interaction rewrites local state as v2');
check(v1Stored?.drafts?.['two-sum'] === undefined && v1Stored?.checked?.['3sum'] === undefined, 'no v1 draft or check-off survives');
check(JSON.parse(window.localStorage.getItem(FOREIGN_KEY))?.untouched === true, 'foreign localStorage keys are never rewritten');
await act(async () => {
  v1Root.unmount();
});
v1Container.remove();

// Teardown releases every registration and keeps both dictionaries in step.
await act(async () => {
  reactRoot.unmount();
});
for (const dispose of effects.reverse()) dispose();
check(zh.size > 0 && [...zh.keys()].every((key) => enKeys.has(key)), 'zh and en dictionaries cover the same keys');
for (const removed of ['bank.expandAll', 'bank.collapseAll', 'bank.video', 'bank.videoTitle', 'bank.videoProblem', 'kind.lecture', 'kind.homework', 'problem.episode', 'detail.meta', 'page.meta', 'statement.difficulty', 'statement.tags']) {
  check(!zh.has(removed), `the ${removed} key is gone`);
}
for (const added of ['bank.search', 'bank.difficulty', 'difficulty.EASY', 'difficulty.MEDIUM', 'difficulty.HARD', 'bank.loadMore', 'bank.loaded', 'bank.ac', 'bank.paid', 'detail.insertTemplate']) {
  check(zh.has(added), `the ${added} key exists`);
}
check(slotRegistrations.length === 2, 'teardown leaves only the two slot registrations');

if (failures.length > 0) {
  console.error('smoke failed:');
  for (const message of failures) console.error(` - ${message}`);
  process.exit(1);
}
console.log('smoke ok: fetched list + search/difficulty/load-more, slug drafts, statement, template insert, submit, login gate, offline banner, completion, indent, coach, v1 ignored');
