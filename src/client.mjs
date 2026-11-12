window.__ModuleLoader__.load({
  id: 'dsh-leetcode-bench',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const PACKAGE = 'dsh-leetcode-bench';
    const NS = 'dshLeetcodeBench';
    // One id pairs the sidebar entry with its main panel: the host resolves the
    // sidebar list id into the main slot key, so both must stay identical.
    const PANEL_ID = 'dsh-leetcode-bench';
    // The key keeps its v1 name on purpose: the payload version moved to 2, but
    // the slot stays the same so an upgrade never has to scan for foreign keys.
    const STORAGE_KEY = `${PACKAGE}/state/v1`;
    const STATE_VERSION = 2;
    const LEETCODE = 'https://leetcode.cn/problems/';
    // 同源路由，由插件的 Host 半区提供；浏览器不会跨域，也不需要额外进程。
    // Namespaced by package so another bench build can run in the same app.
    const HELPER = '/api/dsh-leetcode-bench';
    // One page of the public list. The host clamps limit to 1..100.
    const PAGE_SIZE = 50;
    const DIFFICULTIES = ['', 'EASY', 'MEDIUM', 'HARD'];

    const COMPLETIONS = %%COMPLETIONS%%;

    // ---------------------------------------------------------------------
    // Copy: every visible string goes through the slot's locale seat.
    // ---------------------------------------------------------------------

    const zh = {
      'panel.label': '刷题台',
      'page.title': 'LeetCode 刷题台',
      'page.summary': '已通过 {done}（本机勾选）· 全站 {total} 题',
      'page.summaryUnknown': '已通过 {done}（本机勾选）',
      'bank.title': '题库',
      'bank.hide': '隐藏题库',
      'bank.show': '显示题库',
      'bank.search': '搜索题目 / 关键词',
      'bank.difficulty': '难度筛选',
      'difficulty.all': '全部',
      'difficulty.EASY': '简单',
      'difficulty.MEDIUM': '中等',
      'difficulty.HARD': '困难',
      'bank.loaded': '已加载 {loaded} / {total} 题',
      'bank.loading': '正在从 leetcode.cn 取题目…',
      'bank.empty': '没有匹配的题目',
      'bank.failed': '题目列表没取到：{error}',
      'bank.retry': '重新加载',
      'bank.loadMore': '加载更多',
      'bank.loadingMore': '加载中…',
      'bank.loadMoreFailed': '加载更多失败：{error}',
      'bank.ac': '已通过',
      'bank.paid': '会员',
      'mark.done': '标记 {title} 已完成',
      'mark.undone': '取消 {title} 的完成标记',
      'problem.open': '在 leetcode.cn 打开 {id}',
      'detail.title': '当前题目',
      'detail.open': '去提交',
      'detail.close': '关闭题目详情',
      'detail.prev': '上一题',
      'detail.next': '下一题',
      'detail.insertTemplate': '插入 Java 模板',
      'detail.noTemplate': '这道题没有 Java 模板',
      'detail.hint': '左边选题，右边写代码；提交后直接出判题结果。',
      'editor.title': 'Java 编辑器',
      'editor.hint': 'Tab 缩进 · 输 2 字符弹补全',
      'editor.placeholder': '直接写 Java。输入 ge、sort、lower、window… 弹出本地补全。',
      'editor.copy': '复制代码',
      'editor.copied': '已复制',
      'editor.copyFailed': '复制失败',
      'editor.clear': '清空',
      'editor.confirmClear': '再点一次清空',
      'editor.chars': '{count} 字符',
      'completion.aria': '补全建议',
      'completion.option': '补全为 {key}，{detail}',
      'completion.hint': '{count} 条匹配 · ↑↓ 选择 · Tab / Enter 补全 · Esc 关闭',
      'helper.checking': '正在检测本机助手…',
      'helper.online': '本机助手在线',
      'helper.offline': '本地提交服务未就绪',
      'helper.offlineHint': '插件后端还没加载：重启一次 DSH 即可（不需要单独跑进程）。',
      'helper.retry': '重试',
      'helper.unknownError': '未知错误',
      'helper.badResponse': '接口返回不合法',
      'helper.staleBackend': '页面里的插件后端是旧版（缺少接口）：重启一次 DSH 再试',
      'helper.signedIn': '已登录：{username}',
      'helper.anonymous': '未登录 leetcode.cn',
      'statement.title': '题目说明',
      'statement.loading': '正在从 leetcode.cn 取题目说明…',
      'statement.failed': '题目说明没取到：{error}',
      'statement.empty': '这道题暂时没有中文说明。',
      'statement.retry': '重新加载',
      'submit.title': '提交到 leetcode.cn',
      'submit.button': '提交',
      'submit.submitting': '提交中…',
      'submit.noProblem': '先在题库里选一道题。',
      'submit.noCode': '编辑器里还没有代码。',
      'submit.needsLogin': '还没有登录 leetcode.cn，先在下面填 cookie。',
      'submit.failed': '提交失败：{error}',
      'submit.verdict.accepted': '通过',
      'submit.verdict.wrong': '答案错误',
      'submit.verdict.compile': '编译错误',
      'submit.verdict.timeout': '超时',
      'submit.verdict.runtime': '运行错误',
      'submit.verdict.unknown': '未通过',
      'submit.cases': '通过 {passed} / {total} 个用例',
      'submit.runtime': '运行时间 {runtime}',
      'submit.memory': '内存 {memory}',
      'submit.compileError': '编译错误信息',
      'login.title': '登录 leetcode.cn',
      'login.hint': 'cookie 只发给本机助手，页面不保存。',
      'login.session': 'LEETCODE_SESSION',
      'login.csrf': 'csrftoken',
      'login.save': '保存并验证',
      'login.saving': '验证中…',
      'login.failed': '登录失败：{error}',
      'login.missing': '两个输入框都要填。',
      'coach.title': 'AI 讲解',
      'coach.quick.explain': '讲思路',
      'coach.quick.review': '查代码',
      'coach.copyHint': '复制会带上题目、你的代码和这条要求；粘到对话里发出去，由真正的智能体回答（能画图、用 openui）',
      'coach.copied': '已复制，粘到对话',
      'coach.copyFailed': '复制失败',
      'coach.aria': 'AI 讲解：复制提问到对话',
      'coach.hint': '复制后粘到对话里发出去',
      'coach.ask.explain': '请先给直觉和关键观察，再推导做法与复杂度，别只堆结论。',
      'coach.ask.review': '先看我贴的代码，指出它为什么没做对：具体错在哪一步、漏了哪些边界，再给修正方向。',
      'coach.ask.visual': '讲解时请用 openui（或 archify 这类可视化技能）把关键过程画成可交互的演示，比如数组/指针的移动、状态变化，别只写文字。',
    };

    const en = {
      'panel.label': 'Practice bench',
      'page.title': 'LeetCode practice bench',
      'page.summary': '{done} solved (checked on this machine) · {total} problems on leetcode.cn',
      'page.summaryUnknown': '{done} solved (checked on this machine)',
      'bank.title': 'Problem bank',
      'bank.hide': 'Hide bank',
      'bank.show': 'Show bank',
      'bank.search': 'Search problems / keywords',
      'bank.difficulty': 'Difficulty filter',
      'difficulty.all': 'All',
      'difficulty.EASY': 'Easy',
      'difficulty.MEDIUM': 'Medium',
      'difficulty.HARD': 'Hard',
      'bank.loaded': 'Loaded {loaded} / {total}',
      'bank.loading': 'Fetching problems from leetcode.cn…',
      'bank.empty': 'No matching problems.',
      'bank.failed': 'Could not load the problem list: {error}',
      'bank.retry': 'Reload',
      'bank.loadMore': 'Load more',
      'bank.loadingMore': 'Loading…',
      'bank.loadMoreFailed': 'Could not load more: {error}',
      'bank.ac': 'Accepted',
      'bank.paid': 'Premium',
      'mark.done': 'Mark {title} as solved',
      'mark.undone': 'Clear the solved mark on {title}',
      'problem.open': 'Open {id} on leetcode.cn',
      'detail.title': 'Selected problem',
      'detail.open': 'Submit',
      'detail.close': 'Close problem details',
      'detail.prev': 'Prev',
      'detail.next': 'Next',
      'detail.insertTemplate': 'Insert Java template',
      'detail.noTemplate': 'This problem has no Java template',
      'detail.hint': 'Pick a problem on the left, write your code on the right, then submit.',
      'editor.title': 'Java editor',
      'editor.hint': 'Tab indents · type 2 characters to complete',
      'editor.placeholder': 'Write Java here. Type ge, sort, lower, window… for local completions.',
      'editor.copy': 'Copy code',
      'editor.copied': 'Copied',
      'editor.copyFailed': 'Copy failed',
      'editor.clear': 'Clear',
      'editor.confirmClear': 'Click again to clear',
      'editor.chars': '{count} chars',
      'completion.aria': 'Completion suggestions',
      'completion.option': 'Complete to {key}, {detail}',
      'completion.hint': '{count} matches · ↑↓ select · Tab / Enter accept · Esc close',
      'helper.checking': 'Checking the local helper…',
      'helper.online': 'Local helper is online',
      'helper.offline': 'Local submission service is not ready',
      'helper.offlineHint': 'The plugin backend is not loaded yet: restart DSH once. No separate process is needed.',
      'helper.retry': 'Retry',
      'helper.unknownError': 'Unknown error',
      'helper.badResponse': 'The endpoint returned an invalid payload',
      'helper.staleBackend': 'This window still runs an older plugin backend: restart DSH and retry',
      'helper.signedIn': 'Signed in as {username}',
      'helper.anonymous': 'Not signed in to leetcode.cn',
      'statement.title': 'Problem statement',
      'statement.loading': 'Fetching the statement from leetcode.cn…',
      'statement.failed': 'Could not load the statement: {error}',
      'statement.empty': 'This problem has no Chinese statement yet.',
      'statement.retry': 'Reload',
      'submit.title': 'Submit to leetcode.cn',
      'submit.button': 'Submit',
      'submit.submitting': 'Submitting…',
      'submit.noProblem': 'Pick a problem from the bank first.',
      'submit.noCode': 'The editor is still empty.',
      'submit.needsLogin': 'Not signed in to leetcode.cn yet; fill the cookie fields below.',
      'submit.failed': 'Submit failed: {error}',
      'submit.verdict.accepted': 'Accepted',
      'submit.verdict.wrong': 'Wrong answer',
      'submit.verdict.compile': 'Compile error',
      'submit.verdict.timeout': 'Time limit exceeded',
      'submit.verdict.runtime': 'Runtime error',
      'submit.verdict.unknown': 'Not accepted',
      'submit.cases': 'Passed {passed} / {total} test cases',
      'submit.runtime': 'Runtime {runtime}',
      'submit.memory': 'Memory {memory}',
      'submit.compileError': 'Compile error output',
      'login.title': 'Sign in to leetcode.cn',
      'login.hint': 'The cookies go to the local helper only; this page stores nothing.',
      'login.session': 'LEETCODE_SESSION',
      'login.csrf': 'csrftoken',
      'login.save': 'Save and verify',
      'login.saving': 'Verifying…',
      'login.failed': 'Sign-in failed: {error}',
      'login.missing': 'Both fields are required.',
      'coach.title': 'AI coach',
      'coach.quick.explain': 'Explain the idea',
      'coach.quick.review': 'Review my code',
      'coach.copyHint': 'Copies the problem, your code and this request; paste it into the conversation for the full agent (diagrams, openui)',
      'coach.copied': 'Copied — paste in chat',
      'coach.copyFailed': 'Copy failed',
      'coach.aria': 'AI coach: copy the question into the chat',
      'coach.hint': 'Paste it into the conversation to send',
      'coach.ask.explain': 'Start with the intuition and the key observation, then the approach and complexity; do not just list conclusions.',
      'coach.ask.review': 'Read the code I pasted and say why it is wrong: which step breaks, which edge cases are missing, then how to fix it.',
      'coach.ask.visual': 'When you explain, use openui (or a diagram skill such as archify) to demonstrate the key process interactively — pointer movement, state changes — not only prose.',
    };

    function localTranslate(key, params) {
      const english = typeof document !== 'undefined'
        && typeof document.documentElement !== 'undefined'
        && typeof document.documentElement.lang === 'string'
        && document.documentElement.lang.toLowerCase().startsWith('en');
      const template = (english ? en : zh)[key] ?? zh[key] ?? key;
      if (params === undefined) return template;
      return template.replace(/\{(\w+)\}/g, (match, name) => (name in params ? String(params[name]) : match));
    }

    // ---------------------------------------------------------------------
    // Local state v2: drafts, check-offs and filters are keyed by slug.
    // A v1 payload is ignored outright — no migration, and no other
    // localStorage key is ever read.
    // ---------------------------------------------------------------------

    const SLUG_PATTERN = /^[a-z0-9-]+$/;

    let currentState = null;
    const stateListeners = new Set();

    function defaultState() {
      return {
        version: STATE_VERSION,
        drafts: {},
        checked: {},
        selected: null,
        bankHidden: false,
        filters: { search: '', difficulty: '' },
      };
    }

    function normalizeFilters(raw) {
      const search = raw !== null && typeof raw === 'object' && typeof raw.search === 'string'
        ? raw.search.slice(0, 80)
        : '';
      const difficulty = raw !== null && typeof raw === 'object' && DIFFICULTIES.includes(raw.difficulty)
        ? raw.difficulty
        : '';
      return { search, difficulty };
    }

    function normalizeState(raw) {
      if (raw === null || typeof raw !== 'object' || raw.version !== STATE_VERSION) return defaultState();
      const drafts = {};
      if (raw.drafts !== null && typeof raw.drafts === 'object') {
        for (const [key, value] of Object.entries(raw.drafts)) {
          if (SLUG_PATTERN.test(key) && typeof value === 'string' && value !== '') drafts[key] = value.slice(0, 20000);
        }
      }
      const checked = {};
      if (raw.checked !== null && typeof raw.checked === 'object') {
        for (const [key, value] of Object.entries(raw.checked)) {
          if (value === true && SLUG_PATTERN.test(key)) checked[key] = true;
        }
      }
      const selected = typeof raw.selected === 'string' && SLUG_PATTERN.test(raw.selected) ? raw.selected : null;
      return {
        version: STATE_VERSION,
        drafts,
        checked,
        selected,
        bankHidden: raw.bankHidden === true,
        filters: normalizeFilters(raw.filters),
      };
    }

    function readState() {
      try {
        if (typeof localStorage === 'undefined') return defaultState();
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw === null) return defaultState();
        return normalizeState(JSON.parse(raw));
      } catch (error) {
        console.warn('[algo-bench] could not read local state:', error);
        return defaultState();
      }
    }

    function writeState(next) {
      try {
        if (typeof localStorage === 'undefined') return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (error) {
        console.warn('[algo-bench] could not save local state:', error);
      }
    }

    function getState() {
      if (currentState === null) currentState = readState();
      return currentState;
    }

    function subscribeState(listener) {
      stateListeners.add(listener);
      return () => {
        stateListeners.delete(listener);
      };
    }

    function setState(next) {
      currentState = next;
      writeState(next);
      for (const listener of [...stateListeners]) {
        try {
          listener();
        } catch (error) {
          console.error('[algo-bench] state listener failed:', error);
        }
      }
    }

    function patchState(patch) {
      setState({ ...getState(), ...patch });
    }

    // ---------------------------------------------------------------------
    // /problems payloads: keep only the fields the page actually shows.
    // ---------------------------------------------------------------------

    function difficultyLevel(value) {
      const text = String(value ?? '').trim().toLowerCase();
      if (text === '简单' || text === 'easy') return 'EASY';
      if (text === '中等' || text === 'medium') return 'MEDIUM';
      if (text === '困难' || text === 'hard') return 'HARD';
      return '';
    }

    function normalizeQuestion(item) {
      if (item === null || typeof item !== 'object') return null;
      const slug = typeof item.slug === 'string' ? item.slug : '';
      if (!SLUG_PATTERN.test(slug)) return null;
      return {
        id: typeof item.id === 'string' || typeof item.id === 'number' ? String(item.id) : '',
        title: typeof item.title === 'string' ? item.title : slug,
        slug,
        difficulty: typeof item.difficulty === 'string' ? item.difficulty : '',
        status: typeof item.status === 'string' ? item.status : '',
        paidOnly: item.paidOnly === true,
        tags: Array.isArray(item.tags) ? item.tags.filter((tag) => typeof tag === 'string' && tag !== '') : [],
      };
    }

    function normalizePage(payload) {
      const questions = Array.isArray(payload?.questions)
        ? payload.questions.map(normalizeQuestion).filter((question) => question !== null)
        : [];
      const total = Number(payload?.total);
      return {
        questions,
        total: Number.isFinite(total) && total >= 0 ? total : questions.length,
      };
    }

    // ---------------------------------------------------------------------
    // Artwork: one 20px terminal glyph for the sidebar entry and the header.
    // ---------------------------------------------------------------------

    function BenchIcon({ size = 20, className, active }) {
      return h('svg', {
        width: size,
        height: size,
        viewBox: '0 0 20 20',
        fill: 'none',
        className,
        'aria-hidden': 'true',
        focusable: 'false',
        'data-active': active === true ? 'true' : undefined,
      },
      h('rect', {
        x: 2,
        y: 3.2,
        width: 16,
        height: 13.6,
        rx: 3.4,
        stroke: 'currentColor',
        strokeWidth: 1.3,
      }),
      h('path', {
        d: 'M6.4 8.1L4.7 9.9l1.7 1.8',
        stroke: 'currentColor',
        strokeWidth: 1.4,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }),
      h('path', {
        d: 'M10.6 11.7h4',
        stroke: 'currentColor',
        strokeWidth: 1.4,
        strokeLinecap: 'round',
      }),
      );
    }

    // ---------------------------------------------------------------------
    // Styles: host theme tokens only, so light and dark follow the app.
    // ---------------------------------------------------------------------

    const MONO = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

    const STYLE = `
      .ab-root{display:flex;flex-direction:column;flex:1 1 auto;height:100%;min-height:0;box-sizing:border-box;font-size:13px;line-height:1.5;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base)}
      .ab-scroll{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain}
      .ab-shell{width:100%;max-width:1560px;margin:0 auto;padding:24px 32px 40px;box-sizing:border-box;display:flex;flex-direction:column;gap:16px}
      .ab-head{flex:none;display:flex;flex-direction:column;gap:8px;padding-bottom:14px;border-bottom:.5px solid var(--dsw-alias-border-l2)}
      .ab-titleRow{display:flex;align-items:center;gap:10px;min-width:0;flex-wrap:wrap}
      .ab-glyph{flex:none;color:var(--dsw-alias-label-primary)}
      .ab-title{flex:1 1 auto;min-width:0;font-size:18px;font-weight:600;letter-spacing:.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .ab-headStatus{flex:none;display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-left:auto}
      .ab-status{display:inline-flex;align-items:center;max-width:320px;font-size:11.5px;line-height:1.5;color:var(--dsw-alias-label-tertiary);padding:2px 9px;border:.5px solid var(--dsw-alias-border-l3);border-radius:999px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .ab-status[data-state="online"]{color:var(--dsw-alias-state-success-primary);border-color:var(--dsw-alias-state-success-primary)}
      .ab-status[data-signed="true"]{color:var(--dsw-alias-state-success-primary);border-color:var(--dsw-alias-state-success-primary);font-weight:600}
      .ab-progressText{flex:none;font-size:12.5px;font-weight:600;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
      .ab-bar{height:5px;border-radius:3px;background:var(--dsw-alias-bg-layer-2);overflow:hidden}
      .ab-barFill{height:100%;border-radius:3px;background:var(--dsw-alias-state-success-primary);transition:width .2s ease}
      .ab-meta{font-size:11.5px;color:var(--dsw-alias-label-tertiary)}
      .ab-grid{display:grid;grid-template-columns:300px minmax(0,1fr);gap:22px;align-items:start}
      .ab-grid[data-bank="hidden"]{grid-template-columns:minmax(0,1fr)}
      .ab-meta{display:flex;align-items:center;justify-content:space-between;gap:12px}
      .ab-aside{position:sticky;top:16px;display:flex;flex-direction:column;gap:6px;min-width:0;box-sizing:border-box;padding:12px 10px 10px;border:.5px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-layer-1)}
      .ab-bankHead{flex:none;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 4px 4px}
      .ab-section{font-size:12px;font-weight:600;letter-spacing:.03em;color:var(--dsw-alias-label-tertiary)}
      .ab-mini{font:inherit;font-size:11.5px;color:var(--dsw-alias-label-tertiary);background:transparent;border:0;padding:2px 0;cursor:pointer}
      .ab-mini:hover{color:var(--dsw-alias-label-primary)}
      .ab-mini:focus-visible{outline:2px solid var(--dsw-alias-label-tertiary);outline-offset:2px;border-radius:3px}
      .ab-bank{flex:1 1 auto;min-height:140px;max-height:calc(100vh - 250px);overflow-y:auto;overscroll-behavior:contain;padding:0 2px 2px}
      .ab-search{width:100%;box-sizing:border-box;font:inherit;font-size:12px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);border:.5px solid var(--dsw-alias-border-l3);border-radius:7px;padding:6px 9px;outline:none}
      .ab-search:focus{border-color:var(--dsw-alias-label-tertiary)}
      .ab-search::placeholder{color:var(--dsw-alias-markdown-placeholder)}
      .ab-segs{display:flex;flex-wrap:wrap;gap:4px;padding:2px 2px 4px}
      .ab-seg{flex:1 1 auto;font:inherit;font-size:11.5px;line-height:1.5;color:var(--dsw-alias-label-secondary);background:transparent;border:.5px solid var(--dsw-alias-border-l3);border-radius:6px;padding:2px 6px;cursor:pointer;white-space:nowrap}
      .ab-seg:hover{background:var(--dsw-alias-interactive-bg-hover)}
      .ab-seg[aria-pressed="true"]{color:var(--dsw-alias-label-primary);font-weight:600;background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-label-tertiary)}
      .ab-seg:focus-visible{outline:2px solid var(--dsw-alias-label-tertiary);outline-offset:1px}
      .ab-bankFoot{flex:none;display:flex;flex-direction:column;gap:4px;padding:4px 2px 0}
      .ab-bankFoot .ab-mini{align-self:center}
      .ab-bankNote{font-size:11px;color:var(--dsw-alias-label-tertiary);text-align:center}
      .ab-chevron{flex:none;color:var(--dsw-alias-label-tertiary);transition:transform .15s ease}
      .ab-chevron[data-open="true"]{transform:rotate(90deg)}
      .ab-problems{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:1px}
      .ab-row{display:flex;align-items:center;gap:6px;min-width:0;border-radius:6px;padding:4px 6px}
      .ab-row:hover{background:var(--dsw-alias-interactive-bg-hover)}
      .ab-row[data-selected="true"]{background:var(--dsw-alias-interactive-bg-active)}
      .ab-check{flex:none;width:13px;height:13px;margin:0;accent-color:var(--dsw-alias-label-primary);cursor:pointer}
      .ab-num{flex:none;font-size:11.5px;font-variant-numeric:tabular-nums;color:var(--dsw-alias-link);text-decoration:none;padding:1px 3px;border-radius:4px}
      .ab-num:hover{text-decoration:underline}
      .ab-num:focus-visible{outline:2px solid var(--dsw-alias-label-tertiary);outline-offset:1px}
      .ab-problemTitle{flex:1;min-width:0;text-align:left;font:inherit;font-size:12.5px;color:var(--dsw-alias-label-primary);background:transparent;border:0;padding:0;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .ab-problemTitle:hover{color:var(--dsw-alias-link)}
      .ab-problemTitle:focus-visible{outline:2px solid var(--dsw-alias-label-tertiary);outline-offset:2px;border-radius:3px}
      .ab-row[data-checked="true"] .ab-problemTitle{color:var(--dsw-alias-label-tertiary)}
      .ab-badge{flex:none;font-size:10px;line-height:1.5;padding:0 5px;border-radius:4px;border:.5px solid var(--dsw-alias-border-l3);color:var(--dsw-alias-label-tertiary);white-space:nowrap}
      .ab-badge[data-level="EASY"]{color:var(--dsw-alias-state-success-primary);border-color:var(--dsw-alias-state-success-primary)}
      .ab-badge[data-level="MEDIUM"]{color:var(--dsw-alias-state-warning-primary);border-color:var(--dsw-alias-state-warning-primary)}
      .ab-badge[data-level="HARD"]{color:var(--dsw-alias-state-error-primary,var(--dsw-alias-label-primary));border-color:var(--dsw-alias-state-error-primary,var(--dsw-alias-border-l3))}
      .ab-badge[data-vip="true"]{color:var(--dsw-alias-state-business-primary);border-color:var(--dsw-alias-state-business-tertiary,var(--dsw-alias-border-l3))}
      .ab-ac{flex:none;font-size:11px;font-weight:700;color:var(--dsw-alias-state-success-primary)}
      .ab-nav{flex:none;font-size:11.5px;line-height:1.6;padding:2px 8px;border-radius:6px;border:.5px solid var(--dsw-alias-border-l3);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}
      .ab-nav:hover:not(:disabled){color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2)}
      .ab-nav:disabled{opacity:.45;cursor:default}
      .ab-account{flex:none;font-size:11px;line-height:1.6;padding:0 7px;border-radius:999px;border:.5px solid var(--dsw-alias-border-l3);color:var(--dsw-alias-label-tertiary);white-space:nowrap}
      .ab-work{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:20px;min-width:0;align-items:start;padding-bottom:8px}
      .ab-pane{display:flex;flex-direction:column;gap:14px;min-width:0}
      .ab-paneRead{position:sticky;top:0;max-height:calc(100vh - 190px);overflow:auto;padding-right:4px}
      .ab-paneWrite{min-width:0}
      @media (max-width:1180px){.ab-work{grid-template-columns:minmax(0,1fr)}.ab-paneRead{position:static;max-height:none;overflow:visible}}
      .ab-hint{font-size:12.5px;line-height:1.7;color:var(--dsw-alias-label-tertiary);padding:12px 2px 0}
      .ab-detail{display:flex;flex-direction:column;gap:10px;padding:16px 18px;border:.5px solid var(--dsw-alias-border-l3);border-radius:12px;background:var(--dsw-alias-bg-layer-1)}
      .ab-detailHead{display:flex;align-items:flex-start;gap:10px;min-width:0}
      .ab-detailText{flex:1;min-width:0}
      .ab-detailTitle{font-size:16px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .ab-detailSub{margin-top:3px;font-size:11.5px;color:var(--dsw-alias-label-tertiary)}
      .ab-iconBtn{flex:none;display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;padding:0;font:inherit;font-size:17px;line-height:1;color:var(--dsw-alias-label-tertiary);background:transparent;border:0;border-radius:6px;cursor:pointer}
      .ab-iconBtn:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}
      .ab-codeLabel{font-size:11px;font-weight:600;letter-spacing:.02em;color:var(--dsw-alias-label-tertiary)}
      .ab-code{margin:0;padding:12px 14px;border-radius:9px;background:var(--dsw-alias-markdown-code-block);border:.5px solid var(--dsw-alias-border-l2);font-family:${MONO};font-size:12.5px;line-height:1.6;white-space:pre;overflow-x:auto;color:var(--dsw-alias-label-primary);tab-size:4}
      .ab-note{font-size:11.5px;color:var(--dsw-alias-label-tertiary)}
      .ab-actions{display:flex;flex-wrap:wrap;gap:8px}
      .ab-btn{font:inherit;font-size:12.5px;line-height:1.2;color:var(--dsw-alias-label-primary);background:transparent;border:.5px solid var(--dsw-alias-border-l3);border-radius:8px;padding:6px 11px;cursor:pointer;white-space:nowrap;text-decoration:none;display:inline-flex;align-items:center}
      .ab-btn:hover{background:var(--dsw-alias-interactive-bg-hover)}
      .ab-btn:focus-visible{outline:2px solid var(--dsw-alias-label-tertiary);outline-offset:1px}
      .ab-btn[data-primary="true"]{font-weight:600;background:var(--dsw-alias-bg-layer-2)}
      .ab-btn:disabled{opacity:.55;cursor:default}
      .ab-btn:disabled:hover{background:transparent}
      .ab-editor{display:flex;flex-direction:column;gap:8px;padding:14px 16px;border:.5px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-layer-1)}
      .ab-editorHead{display:flex;align-items:baseline;justify-content:space-between;gap:8px}
      .ab-editorTitle{font-size:12.5px;font-weight:600;color:var(--dsw-alias-label-secondary)}
      .ab-editorHint{font-size:11px;color:var(--dsw-alias-label-tertiary);text-align:right}
      .ab-editorWrap{position:relative}
      .ab-textarea{width:100%;box-sizing:border-box;min-height:320px;max-height:70vh;resize:vertical;font-family:${MONO};font-size:12.5px;line-height:1.65;tab-size:4;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);border:.5px solid var(--dsw-alias-border-l3);border-radius:9px;padding:12px 14px;outline:none;white-space:pre;overflow:auto}
      .ab-textarea:focus{border-color:var(--dsw-alias-label-tertiary)}
      .ab-textarea::placeholder{color:var(--dsw-alias-markdown-placeholder)}
      .ab-complete{position:absolute;left:0;right:0;bottom:calc(100% + 6px);z-index:20;overflow-y:auto;background:var(--dsw-alias-bg-layer-3,var(--dsw-alias-bg-layer-2));border:.5px solid var(--dsw-alias-border-l3);border-radius:9px;box-shadow:0 10px 28px var(--dsw-alias-bg-mask-1);padding:4px}
      .ab-option{display:flex;align-items:baseline;gap:7px;width:100%;box-sizing:border-box;text-align:left;font:inherit;color:var(--dsw-alias-label-primary);background:transparent;border:0;border-radius:6px;padding:5px 7px;cursor:pointer}
      .ab-option[data-active="true"]{background:var(--dsw-alias-interactive-bg-hover-accent,var(--dsw-alias-interactive-bg-hover))}
      .ab-optionKey{flex:none;max-width:46%;font-family:${MONO};font-size:11.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .ab-optionTag{flex:none;font-size:9.5px;line-height:1.5;padding:0 4px;border-radius:3px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-tertiary)}
      .ab-optionDetail{flex:1;min-width:0;font-size:10.5px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .ab-completeFoot{padding:3px 7px 2px;font-size:10px;color:var(--dsw-alias-label-tertiary)}
      .ab-editorBar{display:flex;align-items:center;justify-content:space-between;gap:6px}
      .ab-count{font-size:10.5px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}
      .ab-banner{flex:none;display:flex;flex-direction:column;gap:3px;padding:10px 12px;border:.5px solid var(--dsw-alias-state-warning-primary);border-radius:9px;background:var(--dsw-alias-bg-layer-2)}
      .ab-bannerText{font-size:12.5px;font-weight:600;color:var(--dsw-alias-label-primary)}
      .ab-bannerHint{font-family:${MONO};font-size:11px;color:var(--dsw-alias-label-tertiary);word-break:break-all}
      .ab-banner .ab-mini{align-self:flex-start;color:var(--dsw-alias-link)}
      .ab-difficulty{flex:none;font-size:10.5px;padding:0 7px;border-radius:4px;border:.5px solid var(--dsw-alias-border-l3);color:var(--dsw-alias-label-secondary);white-space:nowrap}
      .ab-statement{display:flex;flex-direction:column;gap:8px;padding-top:10px}
      .ab-statementHead{display:flex;align-items:center;justify-content:space-between;gap:6px}
      .ab-statementTitle{font-size:14px;font-weight:600;line-height:1.45}
      .ab-statementBody{display:flex;flex-direction:column;gap:6px}
      .ab-tags{display:flex;flex-wrap:wrap;gap:4px}
      .ab-tag{font-size:10px;line-height:1.5;padding:0 5px;border-radius:4px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-tertiary)}
      .ab-content{font-size:13px;line-height:1.75;color:var(--dsw-alias-label-secondary);word-break:break-word}
      .ab-content p{margin:0 0 8px}
      .ab-content p:last-child{margin-bottom:0}
      .ab-content code{padding:1px 4px;border-radius:4px;background:var(--dsw-alias-bg-layer-2);font-family:${MONO};font-size:12px}
      .ab-content pre{margin:0 0 8px;padding:10px 12px;border-radius:8px;background:var(--dsw-alias-markdown-code-block);font-family:${MONO};font-size:11.5px;line-height:1.6;white-space:pre-wrap;overflow-x:auto}
      .ab-content pre code{padding:0;background:transparent;font-size:inherit}
      .ab-content ul,.ab-content ol{margin:0 0 8px;padding-left:20px}
      .ab-content blockquote{margin:0 0 8px;padding-left:9px;border-left:2px solid var(--dsw-alias-border-l3);color:var(--dsw-alias-label-tertiary)}
      .ab-content img{max-width:100%;height:auto;border-radius:6px}
      .ab-content a{color:var(--dsw-alias-link)}
      .ab-content table{border-collapse:collapse;margin:0 0 8px;font-size:11.5px}
      .ab-content td,.ab-content th{border:.5px solid var(--dsw-alias-border-l3);padding:4px 7px;text-align:left}
      .ab-submit{display:flex;flex-direction:column;gap:8px;padding:14px 16px;border:.5px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-layer-1)}
      .ab-submitBar{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
      .ab-result{display:flex;flex-direction:column;gap:4px;padding:10px 12px;border:.5px solid var(--dsw-alias-border-l3);border-radius:8px;background:var(--dsw-alias-bg-base)}
      .ab-result[data-passed="true"]{border-color:var(--dsw-alias-state-success-primary)}
      .ab-verdict{font-size:13px;font-weight:600}
      .ab-result[data-passed="true"] .ab-verdict{color:var(--dsw-alias-state-success-primary)}
      .ab-resultNote{font-size:11px;color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums}
      .ab-verdictError{margin:0;padding:8px 10px;border-radius:6px;background:var(--dsw-alias-markdown-code-block);font-family:${MONO};font-size:11px;line-height:1.5;white-space:pre-wrap;overflow-x:auto;max-height:180px;overflow-y:auto}
      .ab-login{display:flex;flex-direction:column;gap:8px;padding:14px 16px;border:.5px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-layer-1)}
      .ab-loginHead{display:flex;align-items:baseline;justify-content:space-between;gap:6px}
      .ab-fields{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px}
      .ab-input{width:100%;box-sizing:border-box;font:inherit;font-family:${MONO};font-size:12px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);border:.5px solid var(--dsw-alias-border-l3);border-radius:7px;padding:7px 9px;outline:none}
      .ab-input:focus{border-color:var(--dsw-alias-label-tertiary)}
      .ab-input::placeholder{color:var(--dsw-alias-markdown-placeholder)}
      .ab-fieldError{font-size:11.5px;color:var(--dsw-alias-state-error-primary,var(--dsw-alias-label-secondary))}
      .ab-coach{display:flex;flex-direction:column;gap:10px;padding:14px 16px;border:.5px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-layer-1)}
      .ab-coachHead{display:flex;align-items:baseline;justify-content:space-between;gap:8px}
      .ab-coachTitle{font-size:12.5px;font-weight:600;color:var(--dsw-alias-label-secondary)}
      .ab-coachQuick{display:flex;flex-wrap:wrap;gap:6px}
      @media (max-width: 980px){
        .ab-shell{padding:20px 24px 32px}
        .ab-grid{grid-template-columns:minmax(0,1fr);gap:16px}
        .ab-aside{position:static;top:auto}
        .ab-bank{max-height:44vh}
        .ab-fields{grid-template-columns:minmax(0,1fr)}
        .ab-title{font-size:16px}
      }
    `;

    // ---------------------------------------------------------------------
    // Local completion: prefix lookup over the bundled Java dictionary.
    // ---------------------------------------------------------------------

    const WORD_CHAR = /[A-Za-z0-9_$.]/;

    function detectPrefix(value, caret) {
      let start = caret;
      while (start > 0 && WORD_CHAR.test(value[start - 1])) start -= 1;
      const raw = value.slice(start, caret);
      if (raw === '' || !/^[A-Za-z_$][A-Za-z0-9_$.]*$/.test(raw)) return null;
      const segment = raw.slice(raw.lastIndexOf('.') + 1);
      if (segment.length < 2) return null;
      return { raw, segment, start, caret };
    }

    function samePrefix(a, b) {
      if (a === null || b === null) return a === b;
      return a.raw === b.raw && a.start === b.start && a.caret === b.caret;
    }

    const JAVA_KEYWORDS = new Set([
      'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue',
      'default', 'do', 'double', 'else', 'enum', 'extends', 'final', 'finally', 'float', 'for', 'goto', 'if',
      'implements', 'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new', 'package', 'private',
      'protected', 'public', 'return', 'short', 'static', 'strictfp', 'super', 'switch', 'synchronized', 'this',
      'throw', 'throws', 'transient', 'try', 'void', 'volatile', 'while', 'var', 'record', 'yield', 'true', 'false', 'null',
    ]);

    const TYPE_TOKEN = '(?:int|long|short|byte|char|boolean|double|float|var|void|Integer|Long|Short|Byte|Character|Boolean|Double|Float|String|Object|StringBuilder|ListNode|TreeNode|Node|int\\[\\]|long\\[\\]|char\\[\\]|double\\[\\]|boolean\\[\\]|String\\[\\]|int\\[\\]\\[\\]|long\\[\\]\\[\\]|List<[^;=(){}]*>|Map<[^;=(){}]*>|Set<[^;=(){}]*>|Deque<[^;=(){}]*>|Queue<[^;=(){}]*>|PriorityQueue<[^;=(){}]*>|ArrayDeque<[^;=(){}]*>|HashMap<[^;=(){}]*>|ArrayList<[^;=(){}]*>|[A-Z][A-Za-z0-9_$]*<[^;=(){}]*>|[A-Z][A-Za-z0-9_$]*)';
    const DECLARATION = new RegExp(`\\b${TYPE_TOKEN}\\s+([a-z_$][A-Za-z0-9_$]*)\\s*(?=[=;,)])`, 'g');

    /**
     * Names that already exist in the buffer: locals, parameters, fields and the
     * method's own arguments. They complete ahead of the static dictionary.
     */
    function collectIdentifiers(code) {
      if (typeof code !== 'string' || code === '') return [];
      const seen = new Set();
      const entries = [];
      let match;
      DECLARATION.lastIndex = 0;
      while ((match = DECLARATION.exec(code)) !== null) {
        const name = match[1];
        if (JAVA_KEYWORDS.has(name) || seen.has(name)) continue;
        seen.add(name);
        entries.push({ key: name, group: 'Var', detail: '', insert: name, variable: true });
        if (entries.length >= 80) break;
      }
      return entries;
    }

    function searchCompletions(prefix, variables) {
      const segment = prefix.segment.toLowerCase();
      const raw = prefix.raw.toLowerCase();
      const ranked = [];
      const afterDot = prefix.raw.includes('.');
      const receiver = afterDot ? prefix.raw.slice(0, prefix.raw.lastIndexOf('.') + 1).toLowerCase() : '';
      const pool = Array.isArray(variables) && !afterDot ? [...variables, ...COMPLETIONS] : COMPLETIONS;
      for (let i = 0; i < pool.length; i++) {
        const entry = pool[i];
        if (afterDot && entry.statement === true && !entry.insert.toLowerCase().startsWith(receiver)) continue;
        const key = entry.key.toLowerCase();
        if (!key.startsWith(segment) && !key.startsWith(raw)) continue;
        // Typed casing wins: "Lis" should reach List before the lowercase lis template.
        const casing = entry.key.startsWith(prefix.segment) ? 0 : 1;
        const local = entry.variable === true ? 0 : 1;
        ranked.push({ entry, casing, local, exact: key === segment ? 0 : 1, order: i });
      }
      ranked.sort((a, b) => a.casing - b.casing || a.local - b.local || a.exact - b.exact || a.entry.key.length - b.entry.key.length || a.order - b.order);
      return ranked.slice(0, 8).map((item) => item.entry);
    }

    function copyText(text) {
      try {
        if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          return navigator.clipboard.writeText(text).then(() => true, () => legacyCopy(text));
        }
      } catch (error) {
        /* fall through to the legacy path */
      }
      return Promise.resolve(legacyCopy(text));
    }

    function legacyCopy(text) {
      try {
        if (typeof document === 'undefined' || typeof document.execCommand !== 'function') return false;
        const node = document.createElement('textarea');
        node.value = text;
        node.setAttribute('readonly', 'readonly');
        node.style.position = 'fixed';
        node.style.top = '-1000px';
        node.style.opacity = '0';
        document.body.appendChild(node);
        node.select();
        const copied = document.execCommand('copy');
        node.remove();
        return copied;
      } catch (error) {
        return false;
      }
    }

    // ---------------------------------------------------------------------
    // Local helper: statements and submissions go through 127.0.0.1 only.
    // Every call degrades to { offline: true } instead of throwing, because the
    // helper is optional and the VM used by the smoke test has no fetch at all.
    // ---------------------------------------------------------------------

    /** The page's translate seat, picked up when BenchPage renders. */
    let localeSeat = (key) => key;

    function helperRequest(path, options) {
      if (typeof fetch !== 'function') return Promise.resolve({ ok: false, offline: true, error: '' });
      const config = options ?? {};
      const request = { method: config.method ?? 'GET', headers: {} };
      if (config.body !== undefined) {
        request.headers['content-type'] = 'application/json';
        request.headers['x-dsh-helper'] = '1';
        request.body = JSON.stringify(config.body);
      }
      let pending;
      try {
        pending = fetch(`${HELPER}${path}`, request);
      } catch (error) {
        return Promise.resolve({ ok: false, offline: true, error: '', detail: describeError(error) });
      }
      return Promise.resolve(pending).then((response) => {
        if (response === null || typeof response !== 'object' || typeof response.json !== 'function') {
          return { ok: false, offline: false, error: localeSeat('helper.badResponse') };
        }
        // A 404 means the plugin backend in this window predates the route.
        if (response.status === 404) return { ok: false, offline: false, error: localeSeat('helper.staleBackend') };
        return Promise.resolve(response.json()).then((payload) => {
          if (payload === null || typeof payload !== 'object') {
            return { ok: false, offline: false, error: localeSeat('helper.badResponse') };
          }
          if (payload.ok === false) {
            const detail = typeof payload.error === 'string' && payload.error.trim() !== ''
              ? payload.error
              : localeSeat('helper.badResponse');
            return { ok: false, offline: false, error: detail };
          }
          return { ok: true, data: payload };
        }, () => ({ ok: false, offline: false, error: `${localeSeat('helper.badResponse')}（HTTP ${response.status}）` }));
      }, (error) => ({ ok: false, offline: true, error: '', detail: describeError(error) }));
    }

    function describeError(error) {
      if (error === null || error === undefined) return '';
      if (typeof error === 'string') return error;
      const message = typeof error.message === 'string' ? error.message : String(error);
      return message.slice(0, 160);
    }

    function failureText(t, failure) {
      if (failure === null || failure === undefined) return t('helper.unknownError');
      if (failure.offline === true || String(failure.error ?? '').indexOf('本地助手未启动') >= 0) {
        const detail = typeof failure.detail === 'string' && failure.detail !== '' ? `（${failure.detail}）` : '';
        return `${t('helper.offline')}${detail}`;
      }
      const error = typeof failure.error === 'string' ? failure.error : '';
      return error === '' ? t('helper.unknownError') : error;
    }

    function failureNeedsHelper(failure) {
      return failure !== null && failure !== undefined
        && (failure.offline === true || String(failure.error ?? '').indexOf('本地助手未启动') >= 0);
    }

    // ---------------------------------------------------------------------
    // Statement HTML: whitelist tags and drop every attribute that can run code.
    // DOMParser exists in the browser and in jsdom; the regex path is a last
    // resort, so the pane never injects raw markup.
    // ---------------------------------------------------------------------

    const ALLOWED_TAGS = new Set([
      'P', 'STRONG', 'EM', 'CODE', 'PRE', 'UL', 'OL', 'LI', 'BLOCKQUOTE',
      'TABLE', 'TR', 'TD', 'TH', 'IMG', 'A', 'H3', 'H4', 'BR', 'SPAN', 'SUP', 'SUB',
    ]);
    const DROP_TAGS = new Set([
      'SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'LINK', 'META', 'SVG',
      'MATH', 'FORM', 'INPUT', 'BUTTON', 'TEXTAREA', 'SELECT', 'BASE',
    ]);
    const ALLOWED_ATTRS = new Set(['href', 'src', 'alt', 'title', 'colspan', 'rowspan']);

    function safeUrl(raw, allowDataImage) {
      const value = String(raw ?? '').trim();
      if (value === '') return null;
      const compact = value.replace(/[\u0000-\u0020]/g, '').toLowerCase();
      if (compact.indexOf('javascript:') === 0) return null;
      if (compact.indexOf('vbscript:') === 0) return null;
      if (compact.indexOf('data:') === 0) {
        if (allowDataImage !== true || compact.indexOf('data:image/') !== 0) return null;
      }
      if (value.indexOf('//') === 0) return `https:${value}`;
      if (value.indexOf('/') === 0) return `https://leetcode.cn${value}`;
      return value;
    }

    function unwrapElement(element) {
      const parent = element.parentNode;
      if (parent === null) return;
      while (element.firstChild !== null) parent.insertBefore(element.firstChild, element);
      parent.removeChild(element);
    }

    const DROP_TAGS_PATTERN = [...DROP_TAGS].join('|').toLowerCase();

    function sanitizeFallback(html) {
      const keep = 'p|strong|em|code|pre|ul|ol|li|blockquote|table|tr|td|th|img|a|h3|h4|br|span|sup|sub';
      return String(html)
        .replace(new RegExp(`<\\s*(?:${DROP_TAGS_PATTERN})\\b[^>]*>[\\s\\S]*?<\\s*\\/\\s*(?:${DROP_TAGS_PATTERN})\\s*>`, 'gi'), '')
        .replace(new RegExp(`<\\s*(?:${DROP_TAGS_PATTERN})\\b[^>]*\\/?>`, 'gi'), '')
        .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
        .replace(/\s(href|src)\s*=\s*("|')\s*(?:javascript|vbscript|data):[^"']*\2/gi, '')
        .replace(new RegExp(`<\\/?(?!(?:${keep})\\b)[a-zA-Z][^>]*>`, 'gi'), '');
    }

    function sanitizeHtml(html) {
      if (typeof html !== 'string' || html.trim() === '') return '';
      const hasDom = typeof window !== 'undefined' && typeof window.DOMParser === 'function';
      if (!hasDom) return sanitizeFallback(html);
      let parsed;
      try {
        parsed = new window.DOMParser().parseFromString(html, 'text/html');
      } catch (error) {
        return sanitizeFallback(html);
      }
      if (parsed === null || parsed.body === null) return sanitizeFallback(html);
      for (const element of [...parsed.body.querySelectorAll('*')]) {
        const tag = element.tagName.toUpperCase();
        if (DROP_TAGS.has(tag)) {
          element.remove();
          continue;
        }
        if (!ALLOWED_TAGS.has(tag)) {
          unwrapElement(element);
          continue;
        }
        for (const attribute of [...element.attributes]) {
          const name = attribute.name.toLowerCase();
          if (name.indexOf('on') === 0 || !ALLOWED_ATTRS.has(name)) {
            element.removeAttribute(attribute.name);
            continue;
          }
          if (name === 'href' || name === 'src') {
            const safe = safeUrl(attribute.value, tag === 'IMG' && name === 'src');
            if (safe === null) element.removeAttribute(attribute.name);
            else element.setAttribute(name, safe);
          }
        }
        if (tag === 'A' && element.getAttribute('href') !== null) {
          element.setAttribute('target', '_blank');
          element.setAttribute('rel', 'noopener noreferrer');
        }
      }
      return parsed.body.innerHTML;
    }

    /** Tag-free text of a statement, used only as coach context. */
    function statementText(html) {
      const raw = typeof html === 'string' ? html : '';
      if (raw === '') return '';
      const safe = sanitizeHtml(raw);
      if (safe === '') return '';
      let text = '';
      const hasDom = typeof window !== 'undefined' && typeof window.DOMParser === 'function';
      if (hasDom) {
        try {
          const parsed = new window.DOMParser().parseFromString(safe, 'text/html');
          if (parsed !== null && parsed.body !== null) text = String(parsed.body.textContent ?? '');
        } catch (error) {
          text = '';
        }
      }
      if (text === '') text = safe.replace(/<[^>]*>/g, ' ');
      return text.replace(/\s+/g, ' ').trim().slice(0, 2000);
    }

    // ---------------------------------------------------------------------
    // Coach answers: escape first, then a tiny whitelist of Markdown. The
    // model output never reaches innerHTML as-is; only the tags below are
    // added, and every one of them is tag/attribute free after escaping.
    // ---------------------------------------------------------------------

    const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

    // ---------------------------------------------------------------------
    // Components
    // ---------------------------------------------------------------------

    function useBenchState() {
      return React.useSyncExternalStore(subscribeState, getState, getState);
    }

    function JavaEditor({ t, code, onChange, readOnly }) {
      const textareaRef = React.useRef(null);
      const wrapRef = React.useRef(null);
      const listId = React.useId();
      const pendingCaret = React.useRef(null);
      const [prefix, setPrefix] = React.useState(null);
      const [index, setIndex] = React.useState(0);
      const [focused, setFocused] = React.useState(false);
      const [popupMax, setPopupMax] = React.useState(216);
      const [copy, setCopy] = React.useState({ field: null, ok: true });
      const [clearing, setClearing] = React.useState(false);
      const timers = React.useRef([]);
      const INDENT = '    ';

      const later = (fn, delay) => {
        const timer = setTimeout(fn, delay);
        timers.current.push(timer);
        return timer;
      };

      React.useEffect(() => () => {
        for (const timer of timers.current) clearTimeout(timer);
        timers.current = [];
      }, []);

      React.useLayoutEffect(() => {
        if (pendingCaret.current === null) return;
        const node = textareaRef.current;
        if (node !== null) {
          node.focus();
          const caret = pendingCaret.current;
          if (Array.isArray(caret)) node.setSelectionRange(caret[0], caret[1]);
          else node.setSelectionRange(caret, caret);
        }
        pendingCaret.current = null;
      }, [code]);

      const variables = React.useMemo(() => collectIdentifiers(code), [code]);
      const matches = React.useMemo(() => (prefix === null ? [] : searchCompletions(prefix, variables)), [prefix, variables]);
      React.useEffect(() => {
        setIndex(0);
      }, [prefix === null ? '' : prefix.raw]);

      const active = matches.length === 0 ? 0 : Math.min(index, matches.length - 1);
      const open = focused && prefix !== null && matches.length > 0;

      // Keep the floating list inside the pane: measure the room above the editor
      // and cap the list to it, so a short panel never clips the suggestions.
      React.useEffect(() => {
        if (!open || typeof window === 'undefined') return undefined;
        const measure = () => {
          const wrap = wrapRef.current;
          if (wrap === null) return;
          const work = wrap.closest('.ab-work');
          const top = wrap.getBoundingClientRect().top;
          const boundary = work === null ? 0 : work.getBoundingClientRect().top;
          const available = Math.floor(top - boundary - 10);
          setPopupMax(Math.max(48, Math.min(216, available)));
        };
        measure();
        const dismiss = () => setPrefix(null);
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', dismiss, true);
        return () => {
          window.removeEventListener('resize', measure);
          window.removeEventListener('scroll', dismiss, true);
        };
      }, [open]);

      const refresh = () => {
        const node = textareaRef.current;
        if (node === null) return;
        const next = detectPrefix(node.value, node.selectionStart);
        setPrefix((previous) => (samePrefix(previous, next) ? previous : next));
      };

      const accept = (entry) => {
        const node = textareaRef.current;
        if (node === null || prefix === null) return;
        const receiver = prefix.raw.includes('.') ? prefix.raw.slice(0, prefix.raw.lastIndexOf('.') + 1) : '';
        let start = prefix.start;
        let insert = entry.insert;
        if (receiver !== '' && !insert.toLowerCase().startsWith(receiver.toLowerCase())) {
          start = prefix.caret - prefix.segment.length;
          const dot = insert.indexOf('.');
          if (dot > 0 && /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(insert.slice(0, dot))) insert = insert.slice(dot + 1);
        }
        const next = node.value.slice(0, start) + insert + node.value.slice(prefix.caret);
        pendingCaret.current = start + insert.length;
        setPrefix(null);
        setIndex(0);
        onChange(next);
      };

      // Tab must stay inside the editor. With the completion list open it accepts
      // the highlighted entry; otherwise it indents, and Shift+Tab outdents. If the
      // browser handled Tab instead, focus would move to the copy button and the
      // next key press would copy the code instead of typing.
      const insertIndent = (outdent) => {
        const node = textareaRef.current;
        if (node === null) return;
        const value = node.value;
        const start = node.selectionStart;
        const end = node.selectionEnd;
        const lineStart = value.lastIndexOf('\n', start - 1) + 1;
        if (start === end) {
          if (!outdent) {
            pendingCaret.current = start + INDENT.length;
            onChange(value.slice(0, start) + INDENT + value.slice(start));
            return;
          }
          let spaces = 0;
          while (spaces < INDENT.length && lineStart + spaces < start && value[lineStart + spaces] === ' ') spaces += 1;
          if (spaces === 0) return;
          pendingCaret.current = start - spaces;
          onChange(value.slice(0, lineStart) + value.slice(lineStart + spaces));
          return;
        }
        const lines = value.slice(lineStart, end).split('\n');
        let firstShift = 0;
        let totalShift = 0;
        const shifted = lines.map((line, position) => {
          if (!outdent) {
            if (position === 0) firstShift = INDENT.length;
            totalShift += INDENT.length;
            return INDENT + line;
          }
          let spaces = 0;
          while (spaces < INDENT.length && line[spaces] === ' ') spaces += 1;
          if (position === 0) firstShift = -spaces;
          totalShift -= spaces;
          return line.slice(spaces);
        });
        pendingCaret.current = [
          Math.max(lineStart, start + firstShift),
          Math.max(lineStart, end + totalShift),
        ];
        onChange(value.slice(0, lineStart) + shifted.join('\n') + value.slice(end));
      };

      // Enter keeps the current indentation, opens a level after "{" or "(", and
      // leaves the caret between the braces when the next character closes one.
      const insertNewline = () => {
        const node = textareaRef.current;
        if (node === null) return;
        const value = node.value;
        const start = node.selectionStart;
        const end = node.selectionEnd;
        const lineStart = value.lastIndexOf('\n', start - 1) + 1;
        const line = value.slice(lineStart, start);
        const base = /^[ \t]*/.exec(line)[0];
        const body = line.replace(/[ \t]+$/, '');
        const deeper = /[{(]$/.test(body) ? INDENT : '';
        const closing = value[start] === '}';
        const insert = closing && deeper !== ''
          ? `\n${base}${deeper}\n${base}`
          : `\n${base}${deeper}`;
        const caret = closing && deeper !== '' ? start + 1 + base.length + deeper.length : start + insert.length;
        pendingCaret.current = caret;
        setPrefix(null);
        setIndex(0);
        onChange(value.slice(0, start) + insert + value.slice(end));
      };

      const onKeyDown = (event) => {
        if (event.nativeEvent !== undefined && event.nativeEvent.isComposing) return;
        if (event.key === 'Tab') {
          event.preventDefault();
          if (open && !event.shiftKey) {
            accept(matches[active]);
            return;
          }
          setPrefix(null);
          setIndex(0);
          insertIndent(event.shiftKey);
          return;
        }
        if (event.key === 'Enter') {
          if (open) {
            event.preventDefault();
            accept(matches[active]);
            return;
          }
          if (event.shiftKey) return;
          event.preventDefault();
          insertNewline();
          return;
        }
        if (!open) return;
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          setIndex((active + 1) % matches.length);
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          setIndex((active - 1 + matches.length) % matches.length);
        } else if (event.key === 'Enter') {
          event.preventDefault();
          accept(matches[active]);
        } else if (event.key === 'Escape') {
          event.preventDefault();
          setPrefix(null);
        }
      };

      const copyCode = () => {
        copyText(code).then((ok) => {
          setCopy({ field: 'code', ok });
          later(() => setCopy({ field: null, ok: true }), 1600);
        });
      };

      const clear = () => {
        if (!clearing) {
          setClearing(true);
          later(() => setClearing(false), 2400);
          return;
        }
        setClearing(false);
        onChange('');
      };

      return h('section', { className: 'ab-editor', 'aria-label': t('editor.title') },
        h('div', { className: 'ab-editorHead' },
          h('span', { className: 'ab-editorTitle' }, t('editor.title')),
          h('span', { className: 'ab-editorHint' }, t('editor.hint')),
        ),
        h('div', { className: 'ab-editorWrap', ref: wrapRef },
          h('textarea', {
            ref: textareaRef,
            className: 'ab-textarea',
            value: code,
            readOnly: readOnly === true,
            spellCheck: false,
            autoCapitalize: 'off',
            autoCorrect: 'off',
            wrap: 'off',
            placeholder: t('editor.placeholder'),
            'aria-label': t('editor.title'),
            role: 'combobox',
            'aria-autocomplete': 'list',
            'aria-expanded': open,
            'aria-controls': open ? listId : undefined,
            'aria-activedescendant': open ? `${listId}-option-${active}` : undefined,
            onChange: (event) => {
              onChange(event.target.value);
              const node = event.currentTarget;
              setPrefix(detectPrefix(node.value, node.selectionStart));
            },
            onKeyDown,
            onKeyUp: refresh,
            onClick: refresh,
            onSelect: refresh,
            onFocus: () => setFocused(true),
            onBlur: () => {
              setFocused(false);
              setPrefix(null);
            },
          }),
          open
            ? h('div', {
              className: 'ab-complete',
              id: listId,
              role: 'listbox',
              'aria-label': t('completion.aria'),
              style: { maxHeight: `${popupMax}px` },
            },
            matches.map((entry, position) => h('button', {
              key: entry.key,
              type: 'button',
              id: `${listId}-option-${position}`,
              role: 'option',
              className: 'ab-option',
              'data-active': position === active ? 'true' : 'false',
              'aria-selected': position === active,
              'aria-label': t('completion.option', { key: entry.key, detail: entry.detail }),
              onMouseDown: (event) => event.preventDefault(),
              onClick: () => accept(entry),
            },
            h('span', { className: 'ab-optionKey' }, entry.key),
            h('span', { className: 'ab-optionTag' }, entry.group),
            h('span', { className: 'ab-optionDetail' }, entry.detail),
            )),
            h('div', { className: 'ab-completeFoot' }, t('completion.hint', { count: matches.length })),
            )
            : null,
        ),
        h('div', { className: 'ab-editorBar' },
          h('span', { className: 'ab-count' }, t('editor.chars', { count: code.length })),
          h('div', { className: 'ab-actions' },
            h('button', {
              type: 'button',
              className: 'ab-btn',
              disabled: code === '',
              onClick: copyCode,
            }, copy.field === 'code' ? (copy.ok ? t('editor.copied') : t('editor.copyFailed')) : t('editor.copy')),
            h('button', {
              type: 'button',
              className: 'ab-btn',
              disabled: code === '',
              onClick: clear,
            }, clearing ? t('editor.confirmClear') : t('editor.clear')),
          ),
        ),
      );
    }

    function HelperBanner({ t, helper, onRetry }) {
      if (helper.status !== 'offline') return null;
      return h('div', { className: 'ab-banner', role: 'status' },
        h('div', { className: 'ab-bannerText' }, t('helper.offline')),
        h('div', { className: 'ab-bannerHint' }, t('helper.offlineHint')),
        h('button', { type: 'button', className: 'ab-mini', onClick: onRetry }, t('helper.retry')),
      );
    }

    /** The Chinese statement, sanitised before it reaches the DOM. */
    /** The Chinese statement body, sanitised before it reaches the DOM. */
    function Statement({ t, statement, onRetry }) {
      const data = statement.data;
      const ready = statement.status === 'ready' && data !== null && typeof data === 'object';
      let body = null;
      if (statement.status === 'loading') {
        body = h('div', { className: 'ab-note', role: 'status' }, t('statement.loading'));
      } else if (statement.status === 'error') {
        body = h('div', { className: 'ab-note', role: 'status' },
          t('statement.failed', { error: failureText(t, statement) }),
          failureNeedsHelper(statement) ? h('div', { className: 'ab-bannerHint' }, t('helper.offlineHint')) : null,
          h('button', { type: 'button', className: 'ab-mini', onClick: onRetry }, t('statement.retry')),
        );
      } else if (ready) {
        const html = sanitizeHtml(typeof data.content === 'string' ? data.content : '');
        body = h('div', { className: 'ab-statementBody' },
          html === ''
            ? h('div', { className: 'ab-note' }, t('statement.empty'))
            : h('div', { className: 'ab-content', dangerouslySetInnerHTML: { __html: html } }),
        );
      } else {
        return null;
      }
      return h('section', { className: 'ab-statement', 'aria-label': t('statement.title') }, body);
    }

    function verdictKey(result) {
      const statusCode = Number(result.statusCode);
      if (result.passed === true || statusCode === 10) return 'submit.verdict.accepted';
      if (statusCode === 11) return 'submit.verdict.wrong';
      if (statusCode === 20) return 'submit.verdict.compile';
      if (statusCode === 14 || statusCode === 30) return 'submit.verdict.timeout';
      if (statusCode === 15 || statusCode === 31) return 'submit.verdict.runtime';
      return 'submit.verdict.unknown';
    }

    function SubmitResult({ t, result }) {
      const passed = result.passed === true;
      const total = Number(result.totalTestcases);
      const correct = Number(result.totalCorrect);
      const runtime = typeof result.runtime === 'string' && result.runtime !== '' ? result.runtime : '';
      const memory = typeof result.memory === 'string' && result.memory !== '' ? result.memory : '';
      const compileError = typeof result.compileError === 'string' && result.compileError.trim() !== '' ? result.compileError : '';
      const extra = verdictKey(result) === 'submit.verdict.unknown' && typeof result.statusMsg === 'string' && result.statusMsg !== ''
        ? result.statusMsg
        : '';
      const metrics = [runtime === '' ? '' : t('submit.runtime', { runtime }), memory === '' ? '' : t('submit.memory', { memory })]
        .filter((item) => item !== '')
        .join(' · ');
      return h('div', { className: 'ab-result', 'data-passed': passed ? 'true' : 'false' },
        h('div', { className: 'ab-verdict' }, t(verdictKey(result))),
        Number.isFinite(total) && total > 0
          ? h('div', { className: 'ab-resultNote' }, t('submit.cases', { passed: Number.isFinite(correct) ? correct : 0, total }))
          : null,
        metrics === '' ? null : h('div', { className: 'ab-resultNote' }, metrics),
        extra === '' ? null : h('div', { className: 'ab-resultNote' }, extra),
        compileError === '' ? null : h('pre', { className: 'ab-verdictError' }, compileError),
      );
    }

    function SubmitSection({ t, problem, code, helper, submission, onSubmit }) {
      const busy = submission.status === 'submitting';
      const disabled = busy || problem === null || code.trim() === '';
      let hint = null;
      if (problem === null) hint = t('submit.noProblem');
      else if (code.trim() === '') hint = t('submit.noCode');
      else if (helper.status === 'online' && helper.signedIn !== true) hint = t('submit.needsLogin');
      return h('section', { className: 'ab-submit', 'aria-label': t('submit.title') },
        h('div', { className: 'ab-submitBar' },
          h('button', {
            type: 'button',
            className: 'ab-btn ab-submitBtn',
            'data-primary': 'true',
            disabled,
            title: hint ?? t('submit.title'),
            onClick: onSubmit,
          }, busy ? t('submit.submitting') : t('submit.button')),
        ),
        hint === null ? null : h('div', { className: 'ab-note' }, hint),
        submission.status === 'error'
          ? h('div', { className: 'ab-note', role: 'status' },
            t('submit.failed', { error: failureText(t, submission) }),
            failureNeedsHelper(submission) ? h('div', { className: 'ab-bannerHint' }, t('helper.offlineHint')) : null)
          : null,
        submission.status === 'done' && submission.result !== null
          ? h(SubmitResult, { t, result: submission.result })
          : null,
      );
    }

    const COACH_KINDS = ['explain', 'review'];

    /**
     * The page does not keep its own chat: rich answers (diagrams, openui, tools)
     * only exist in the conversation. This card composes one ready-to-send message
     * — problem, the draft, and the intent — and copies it.
     */
    function CoachActions({ t, problem, code, statement }) {
      const [copied, setCopied] = React.useState('idle');
      const alive = React.useRef(true);
      const timer = React.useRef(null);

      React.useEffect(() => () => {
        alive.current = false;
        if (timer.current !== null) clearTimeout(timer.current);
      }, []);

      const data = statement !== null && typeof statement === 'object' && statement.status === 'ready'
        && statement.data !== null && typeof statement.data === 'object'
        ? statement.data
        : null;
      const body = data !== null && typeof data.content === 'string' ? statementText(data.content) : '';
      const title = (data !== null && typeof data.title === 'string' && data.title !== '' ? data.title : '')
        || (problem === null ? '' : problem.title);
      const id = (data !== null && (typeof data.frontendId === 'string' || typeof data.frontendId === 'number')
        ? String(data.frontendId)
        : '') || (problem === null ? '' : problem.id);

      const promptFor = (kind) => {
        const lines = [`题目：${id === '' ? '' : `#${id} `}${title}`];
        if (body !== '') lines.push(`题面：${body.slice(0, 1500)}`);
        if (typeof code === 'string' && code.trim() !== '') lines.push(`我的 Java 代码：\n\`\`\`java\n${code}\n\`\`\``);
        lines.push(`${t(`coach.quick.${kind}`)}：${t(`coach.ask.${kind}`)}`);
        lines.push(t('coach.ask.visual'));
        return lines.join('\n\n');
      };

      const copy = (kind) => {
        if (problem === null) return;
        copyText(promptFor(kind)).then((ok) => {
          if (!alive.current) return;
          setCopied(ok ? 'ok' : 'failed');
          if (timer.current !== null) clearTimeout(timer.current);
          timer.current = setTimeout(() => {
            if (alive.current) setCopied('idle');
          }, 1800);
        });
      };

      const button = (kind, label) => h('button', {
        key: kind,
        type: 'button',
        className: 'ab-btn',
        'data-coach-copy': kind,
        disabled: problem === null,
        title: t('coach.copyHint'),
        onClick: () => copy(kind),
      }, label);

      return h('section', { className: 'ab-coach', 'aria-label': t('coach.aria') },
        h('div', { className: 'ab-coachHead' },
          h('span', { className: 'ab-coachTitle' }, t('coach.title')),
          h('span', { className: 'ab-note' },
            copied === 'ok' ? t('coach.copied') : copied === 'failed' ? t('coach.copyFailed') : t('coach.hint')),
        ),
        h('div', { className: 'ab-coachQuick' },
          COACH_KINDS.map((kind) => button(kind, t(`coach.quick.${kind}`))),
        ),
      );
    }


    function LoginPanel({ t, login, onField, onSubmit }) {
      const busy = login.status === 'saving';
      const field = (name, label) => h('input', {
        className: 'ab-input',
        type: 'password',
        value: login[name],
        placeholder: label,
        'aria-label': label,
        autoComplete: 'off',
        spellCheck: false,
        disabled: busy,
        onChange: (event) => onField(name, event.target.value),
      });
      return h('section', { className: 'ab-login', 'aria-label': t('login.title') },
        h('div', { className: 'ab-loginHead' },
          h('span', { className: 'ab-codeLabel' }, t('login.title')),
          h('span', { className: 'ab-note' }, t('helper.anonymous')),
        ),
        h('div', { className: 'ab-fields' },
          field('session', t('login.session')),
          field('csrf', t('login.csrf')),
        ),
        h('div', { className: 'ab-actions' },
          h('button', { type: 'button', className: 'ab-btn', disabled: busy, onClick: onSubmit },
            busy ? t('login.saving') : t('login.save')),
          h('span', { className: 'ab-note' }, t('login.hint')),
        ),
        login.status === 'error'
          ? h('div', { className: 'ab-fieldError', role: 'status' },
            login.missing === true
              ? t('login.missing')
              : t('login.failed', { error: login.error === null || login.error === undefined ? t('helper.unknownError') : login.error }))
          : null,
      );
    }

    function ProblemDetail({ t, problem, statement, onPrev, onNext, onClose, onRetryStatement, onInsertTemplate }) {
      const ready = statement.status === 'ready' && statement.data !== null && typeof statement.data === 'object';
      const data = ready ? statement.data : null;
      const title = (data !== null && typeof data.title === 'string' && data.title !== '' ? data.title : '')
        || problem.title || problem.slug;
      const id = (data !== null && (typeof data.frontendId === 'string' || typeof data.frontendId === 'number')
        ? String(data.frontendId)
        : '') || problem.id;
      const difficulty = (data !== null && typeof data.difficulty === 'string' && data.difficulty !== '' ? data.difficulty : '')
        || problem.difficulty || '';
      const tags = data !== null && Array.isArray(data.tags)
        ? data.tags.filter((tag) => typeof tag === 'string' && tag !== '')
        : (Array.isArray(problem.tags) ? problem.tags : []);
      const snippet = data !== null && typeof data.javaSnippet === 'string' ? data.javaSnippet : '';
      return h('section', { className: 'ab-detail', 'aria-label': t('detail.title') },
        h('div', { className: 'ab-detailHead' },
          h('div', { className: 'ab-detailText' },
            h('div', { className: 'ab-detailTitle', title }, id === '' ? title : `#${id} ${title}`),
            tags.length > 0
              ? h('div', { className: 'ab-tags ab-detailTags' }, tags.map((tag) => h('span', { key: tag, className: 'ab-tag' }, tag)))
              : null,
          ),
          difficulty === ''
            ? null
            : h('span', { className: 'ab-badge', 'data-level': difficultyLevel(difficulty) }, difficulty),
          h('button', {
            type: 'button',
            className: 'ab-nav',
            disabled: typeof onPrev !== 'function',
            title: t('detail.prev'),
            'aria-label': t('detail.prev'),
            onClick: () => { if (typeof onPrev === 'function') onPrev(); },
          }, t('detail.prev')),
          h('button', {
            type: 'button',
            className: 'ab-nav',
            disabled: typeof onNext !== 'function',
            title: t('detail.next'),
            'aria-label': t('detail.next'),
            onClick: () => { if (typeof onNext === 'function') onNext(); },
          }, t('detail.next')),
          h('button', {
            type: 'button',
            className: 'ab-btn',
            'data-insert-template': 'true',
            disabled: snippet.trim() === '',
            title: snippet.trim() === '' ? t('detail.noTemplate') : t('detail.insertTemplate'),
            onClick: () => { if (snippet.trim() !== '') onInsertTemplate(snippet); },
          }, t('detail.insertTemplate')),
          h('a', {
            className: 'ab-btn',
            href: `${LEETCODE}${problem.slug}/`,
            target: '_blank',
            rel: 'noopener noreferrer',
          }, t('detail.open')),
          h('button', {
            type: 'button',
            className: 'ab-iconBtn',
            'aria-label': t('detail.close'),
            title: t('detail.close'),
            onClick: onClose,
          }, '×'),
        ),
        h(Statement, { t, statement, onRetry: onRetryStatement }),
      );
    }

    /** One row of the fetched problem list. Check-offs are keyed by slug. */
    function BankRow({ t, question, checked, selected, onSelect, onCheck }) {
      const level = difficultyLevel(question.difficulty);
      const accepted = question.status === 'AC' || checked;
      return h('li', {
        className: 'ab-row',
        'data-checked': checked ? 'true' : 'false',
        'data-selected': selected ? 'true' : 'false',
        role: 'button',
        tabIndex: 0,
        onClick: () => onSelect(question.slug),
        onKeyDown: (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect(question.slug);
          }
        },
      },
      h('input', {
        type: 'checkbox',
        className: 'ab-check',
        checked,
        'aria-label': t(checked ? 'mark.undone' : 'mark.done', { title: question.title }),
        onClick: (event) => event.stopPropagation(),
        onChange: () => onCheck(question.slug),
      }),
      h('a', {
        className: 'ab-num',
        href: `${LEETCODE}${question.slug}/`,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': t('problem.open', { id: question.id }),
        title: t('problem.open', { id: question.id }),
        onClick: (event) => event.stopPropagation(),
      }, question.id),
      h('button', {
        type: 'button',
        className: 'ab-problemTitle',
        title: question.title,
        'aria-current': selected ? 'true' : undefined,
        onClick: (event) => {
          event.stopPropagation();
          onSelect(question.slug);
        },
      }, question.title),
      level === ''
        ? null
        : h('span', { className: 'ab-badge', 'data-level': level }, question.difficulty),
      question.paidOnly ? h('span', { className: 'ab-badge', 'data-vip': 'true' }, t('bank.paid')) : null,
      accepted ? h('span', { className: 'ab-ac', 'data-ac': 'true', title: t('bank.ac') }, '✓') : null,
      );
    }

    function BenchPage(props) {
      const t = typeof props.translate === 'function'
        ? props.translate
        : typeof props.t === 'function'
          ? props.t
          : localTranslate;
      const state = useBenchState();
      localeSeat = t;
      const [helper, setHelper] = React.useState({ status: 'checking', signedIn: false, username: '', model: '' });
      const [healthTick, setHealthTick] = React.useState(0);
      const [statement, setStatement] = React.useState({ slug: null, status: 'idle', data: null, error: null, offline: false });
      const [statementTick, setStatementTick] = React.useState(0);
      const [submission, setSubmission] = React.useState({ status: 'idle', result: null, error: null, offline: false });
      const [login, setLogin] = React.useState({ session: '', csrf: '', status: 'idle', error: null, missing: false });
      // The list lives only in React state: it is fetched, never bundled.
      const [bank, setBank] = React.useState({
        status: 'loading',
        questions: [],
        total: 0,
        nextSkip: 0,
        loadingMore: false,
        error: null,
        offline: false,
        moreError: null,
        moreOffline: false,
      });
      const [bankTick, setBankTick] = React.useState(0);
      const [searchInput, setSearchInput] = React.useState(state.filters.search);
      const bankRequest = React.useRef(0);
      const loadingMore = React.useRef(false);
      const alive = React.useRef(true);

      React.useEffect(() => () => {
        alive.current = false;
      }, []);

      // One health probe on mount: the bank must render whether or not the helper runs.
      React.useEffect(() => {
        let cancelled = false;
        helperRequest('/health').then((result) => {
          if (cancelled) return;
          if (result.ok !== true) {
            setHelper({ status: 'offline', signedIn: false, username: '', model: '' });
            return;
          }
          setHelper({
            status: 'online',
            signedIn: result.data.signedIn === true,
            username: typeof result.data.username === 'string' ? result.data.username : '',
          });
        });
        return () => {
          cancelled = true;
        };
      }, [healthTick]);

      const filters = state.filters;
      const filterQuery = `search=${encodeURIComponent(filters.search)}&difficulty=${encodeURIComponent(filters.difficulty)}`;

      // The search box edits locally, then lands in the persisted state 300ms
      // after the last keystroke; the filters themselves are the fetch trigger.
      React.useEffect(() => {
        setSearchInput((previous) => (previous === filters.search ? previous : filters.search));
      }, [filters.search]);

      React.useEffect(() => {
        if (searchInput === filters.search) return undefined;
        const timer = setTimeout(() => {
          const current = getState().filters;
          if (current.search === searchInput) return;
          patchState({ filters: { ...current, search: searchInput.slice(0, 80) } });
        }, 300);
        return () => clearTimeout(timer);
      }, [searchInput, filters.search]);

      // First page (or a replacement page): reset the list whenever a filter moves.
      React.useEffect(() => {
        bankRequest.current += 1;
        const request = bankRequest.current;
        loadingMore.current = false;
        setBank({
          status: 'loading',
          questions: [],
          total: 0,
          nextSkip: 0,
          loadingMore: false,
          error: null,
          offline: false,
          moreError: null,
          moreOffline: false,
        });
        helperRequest(`/problems?skip=0&limit=${PAGE_SIZE}&${filterQuery}`).then((result) => {
          if (request !== bankRequest.current) return;
          if (result.ok === true) {
            const page = normalizePage(result.data);
            setBank({
              status: 'ready',
              questions: page.questions,
              total: page.total,
              nextSkip: page.questions.length,
              loadingMore: false,
              error: null,
              offline: false,
              moreError: null,
              moreOffline: false,
            });
          } else {
            setBank({
              status: 'error',
              questions: [],
              total: 0,
              nextSkip: 0,
              loadingMore: false,
              error: result.error,
              offline: result.offline === true,
              moreError: null,
              moreOffline: false,
            });
          }
        });
      }, [filterQuery, filters.search, filters.difficulty, bankTick]);

      const loadMore = () => {
        if (bank.status !== 'ready' || loadingMore.current || bank.questions.length >= bank.total) return;
        const request = bankRequest.current;
        const skip = bank.nextSkip;
        loadingMore.current = true;
        setBank((previous) => ({ ...previous, loadingMore: true, moreError: null, moreOffline: false }));
        helperRequest(`/problems?skip=${skip}&limit=${PAGE_SIZE}&${filterQuery}`).then((result) => {
          if (request !== bankRequest.current) return;
          loadingMore.current = false;
          if (result.ok === true) {
            const page = normalizePage(result.data);
            setBank((previous) => {
              const seen = new Set(previous.questions.map((question) => question.slug));
              const added = page.questions.filter((question) => !seen.has(question.slug));
              return {
                ...previous,
                status: 'ready',
                questions: previous.questions.concat(added),
                total: page.total,
                nextSkip: skip + page.questions.length,
                loadingMore: false,
                moreError: null,
                moreOffline: false,
              };
            });
          } else {
            setBank((previous) => ({
              ...previous,
              loadingMore: false,
              moreError: result.error,
              moreOffline: result.offline === true,
            }));
          }
        });
      };

      const done = Object.values(state.checked).filter((value) => value === true).length;
      const total = bank.status === 'ready' ? bank.total : 0;
      const percent = total === 0 ? 0 : Math.min(100, Math.round((done / total) * 100));
      const bankHidden = state.bankHidden === true;
      const selectedSlug = state.selected;
      const selectedQuestion = selectedSlug === null
        ? null
        : bank.questions.find((question) => question.slug === selectedSlug) ?? null;
      const selected = selectedSlug === null
        ? null
        : {
          slug: selectedSlug,
          id: selectedQuestion === null ? '' : selectedQuestion.id,
          title: selectedQuestion === null ? '' : selectedQuestion.title,
          difficulty: selectedQuestion === null ? '' : selectedQuestion.difficulty,
          tags: selectedQuestion === null ? [] : selectedQuestion.tags,
        };
      const selectedIndex = selectedSlug === null
        ? -1
        : bank.questions.findIndex((question) => question.slug === selectedSlug);
      const draft = selectedSlug === null ? '' : state.drafts[selectedSlug] ?? '';
      const setDraft = (next) => {
        if (selectedSlug === null) return;
        const drafts = { ...getState().drafts };
        if (typeof next === 'string' && next !== '') drafts[selectedSlug] = next.slice(0, 20000);
        else delete drafts[selectedSlug];
        patchState({ drafts });
      };

      // Selecting a problem fetches its Chinese statement in parallel with the rest.
      React.useEffect(() => {
        if (selectedSlug === null) {
          setStatement({ slug: null, status: 'idle', data: null, error: null, offline: false });
          return undefined;
        }
        const slug = selectedSlug;
        let cancelled = false;
        setStatement({ slug, status: 'loading', data: null, error: null, offline: false });
        helperRequest(`/statement?slug=${encodeURIComponent(slug)}`).then((result) => {
          if (cancelled) return;
          if (result.ok === true) {
            setStatement({ slug, status: 'ready', data: result.data, error: null, offline: false });
          } else {
            setStatement({ slug, status: 'error', data: null, error: result.error, offline: result.offline === true });
          }
        });
        return () => {
          cancelled = true;
        };
      }, [selectedSlug, statementTick]);

      // Jumping with prev/next should reveal the row it landed on.
      React.useEffect(() => {
        if (selectedSlug === null || typeof document === 'undefined') return;
        const row = document.querySelector('.ab-row[data-selected="true"]');
        if (row !== null && typeof row.scrollIntoView === 'function') row.scrollIntoView({ block: 'nearest' });
      }, [selectedSlug]);

      // A fresh problem starts with a clean verdict, never the previous one.
      React.useEffect(() => {
        setSubmission({ status: 'idle', result: null, error: null, offline: false });
      }, [selectedSlug]);

      const selectProblem = (slug) => {
        if (typeof slug !== 'string' || !SLUG_PATTERN.test(slug)) return;
        patchState({ selected: slug });
      };

      const setDifficulty = (level) => {
        if (!DIFFICULTIES.includes(level)) return;
        const current = getState().filters;
        if (current.difficulty === level) return;
        patchState({ filters: { ...current, difficulty: level } });
      };

      const checkProblem = (slug) => {
        if (typeof slug !== 'string' || !SLUG_PATTERN.test(slug)) return;
        const checked = { ...getState().checked };
        if (checked[slug] === true) delete checked[slug];
        else checked[slug] = true;
        patchState({ checked });
      };

      const submitCode = () => {
        if (selected === null || submission.status === 'submitting') return;
        if (draft.trim() === '') return;
        setSubmission({ status: 'submitting', result: null, error: null, offline: false });
        helperRequest('/submit', {
          method: 'POST',
          body: { slug: selected.slug, code: draft, lang: 'java' },
        }).then((result) => {
          if (!alive.current) return;
          if (result.ok === true) setSubmission({ status: 'done', result: result.data, error: null, offline: false });
          else setSubmission({ status: 'error', result: null, error: result.error, offline: result.offline === true });
        });
      };

      const authField = (name, value) => {
        setLogin((previous) => ({
          ...previous,
          [name]: value,
          status: previous.status === 'saving' ? 'saving' : 'idle',
          error: null,
          missing: false,
        }));
      };

      const saveLogin = () => {
        if (login.status === 'saving') return;
        if (login.session.trim() === '' || login.csrf.trim() === '') {
          setLogin({ ...login, status: 'error', missing: true, error: null });
          return;
        }
        setLogin((previous) => ({ ...previous, status: 'saving', missing: false, error: null }));
        helperRequest('/auth', {
          method: 'POST',
          body: { session: login.session.trim(), csrf: login.csrf.trim() },
        }).then((result) => {
          if (!alive.current) return;
          if (result.ok === true && result.data.signedIn === true) {
            const username = typeof result.data.username === 'string' ? result.data.username : '';
            setLogin((previous) => ({ ...previous, status: 'idle', error: null, missing: false }));
            setHelper({ status: 'online', signedIn: true, username });
            return;
          }
          const error = result.offline === true ? t('helper.offline') : failureText(t, result);
          setLogin((previous) => ({ ...previous, status: 'error', missing: false, error }));
        });
      };

      const signedIn = helper.signedIn === true;
      const helperLabel = helper.status === 'checking'
        ? t('helper.checking')
        : helper.status === 'offline'
          ? t('helper.offline')
          : t('helper.online');

      return h('section', { className: 'ab-root', 'aria-label': t('page.title') },
        h('style', null, STYLE),
        h('div', { className: 'ab-scroll' },
          h('div', { className: 'ab-shell' },
            h('header', { className: 'ab-head' },
              h('div', { className: 'ab-titleRow' },
                h(BenchIcon, { size: 20, className: 'ab-glyph' }),
                h('div', { className: 'ab-title' }, t('page.title')),
                h('div', { className: 'ab-headStatus' },
                  h('span', {
                    className: 'ab-status',
                    'data-state': helper.status,
                    'data-signed': signedIn ? 'true' : 'false',
                    role: 'status',
                    title: helperLabel,
                  }, helperLabel),
                  h('span', { className: 'ab-progressText', 'aria-live': 'polite' },
                    bank.status === 'ready'
                      ? t('page.summary', { done, total })
                      : t('page.summaryUnknown', { done })),
                  signedIn && helper.username !== ''
                    ? h('span', { className: 'ab-account', title: t('helper.signedIn', { username: helper.username }) }, helper.username)
                    : null,
                ),
              ),
              h('div', {
                className: 'ab-bar',
                role: 'progressbar',
                'aria-valuemin': 0,
                'aria-valuemax': total === 0 ? 1 : total,
                'aria-valuenow': done,
                'aria-valuetext': bank.status === 'ready'
                  ? t('page.summary', { done, total })
                  : t('page.summaryUnknown', { done }),
              }, h('div', { className: 'ab-barFill', style: { width: `${percent}%` } })),
              h('div', { className: 'ab-meta' },
                h('span', null, bank.status === 'ready'
                  ? t('bank.loaded', { loaded: bank.questions.length, total: bank.total })
                  : ''),
                h('button', {
                  type: 'button',
                  className: 'ab-mini',
                  'aria-pressed': bankHidden,
                  title: bankHidden ? t('bank.show') : t('bank.hide'),
                  onClick: () => patchState({ bankHidden: !bankHidden }),
                }, bankHidden ? t('bank.show') : t('bank.hide')),
              ),
              h(HelperBanner, { t, helper, onRetry: () => setHealthTick((value) => value + 1) }),
            ),
            h('div', { className: 'ab-grid', 'data-bank': bankHidden ? 'hidden' : 'shown' },
              bankHidden ? null : h('aside', { className: 'ab-aside', 'aria-label': t('bank.title') },
                h('div', { className: 'ab-bankHead' },
                  h('span', { className: 'ab-section' }, t('bank.title')),
                  h('span', { className: 'ab-bankNote' }, bank.status === 'ready' ? String(bank.total) : ''),
                ),
                h('input', {
                  type: 'search',
                  className: 'ab-search',
                  value: searchInput,
                  placeholder: t('bank.search'),
                  'aria-label': t('bank.search'),
                  spellCheck: false,
                  autoComplete: 'off',
                  onChange: (event) => setSearchInput(event.target.value),
                }),
                h('div', { className: 'ab-segs', role: 'group', 'aria-label': t('bank.difficulty') },
                  DIFFICULTIES.map((level) => h('button', {
                    key: level === '' ? 'all' : level,
                    type: 'button',
                    className: 'ab-seg',
                    'data-level': level === '' ? 'ALL' : level,
                    'aria-pressed': filters.difficulty === level,
                    onClick: () => setDifficulty(level),
                  }, t(`difficulty.${level === '' ? 'all' : level}`))),
                ),
                h('div', { className: 'ab-bank' },
                  bank.status === 'loading'
                    ? h('div', { className: 'ab-bankNote', role: 'status' }, t('bank.loading'))
                    : bank.status === 'error'
                      ? h('div', { className: 'ab-bankNote', role: 'status' },
                        t('bank.failed', { error: failureText(t, bank) }),
                        h('button', {
                          type: 'button',
                          className: 'ab-mini',
                          onClick: () => setBankTick((value) => value + 1),
                        }, t('bank.retry')))
                      : bank.questions.length === 0
                        ? h('div', { className: 'ab-bankNote' }, t('bank.empty'))
                        : h('ul', { className: 'ab-problems' },
                          bank.questions.map((question) => h(BankRow, {
                            key: question.slug,
                            t,
                            question,
                            checked: state.checked[question.slug] === true,
                            selected: selectedSlug === question.slug,
                            onSelect: selectProblem,
                            onCheck: checkProblem,
                          })),
                        ),
                ),
                h('div', { className: 'ab-bankFoot' },
                  bank.status === 'ready' && bank.questions.length > 0
                    ? h('div', { className: 'ab-bankNote' },
                      t('bank.loaded', { loaded: bank.questions.length, total: bank.total }))
                    : null,
                  bank.moreError !== null
                    ? h('div', { className: 'ab-bankNote', role: 'status' },
                      t('bank.loadMoreFailed', { error: failureText(t, { error: bank.moreError, offline: bank.moreOffline }) }))
                    : null,
                  h('button', {
                    type: 'button',
                    className: 'ab-mini',
                    'data-load-more': 'true',
                    disabled: bank.status !== 'ready' || bank.loadingMore || bank.questions.length >= bank.total,
                    onClick: loadMore,
                  }, bank.loadingMore ? t('bank.loadingMore') : t('bank.loadMore')),
                ),
              ),
              h('div', { className: 'ab-work' },
                h('div', { className: 'ab-pane ab-paneRead' },
                  selected === null
                    ? h('div', { className: 'ab-hint' }, t('detail.hint'))
                    : h(ProblemDetail, {
                      key: selectedSlug,
                      t,
                      problem: selected,
                      statement: statement.slug === selectedSlug
                        ? statement
                        : { slug: selectedSlug, status: 'loading', data: null, error: null, offline: false },
                      onPrev: selectedIndex > 0
                        ? () => selectProblem(bank.questions[selectedIndex - 1].slug)
                        : null,
                      onNext: selectedIndex >= 0 && selectedIndex < bank.questions.length - 1
                        ? () => selectProblem(bank.questions[selectedIndex + 1].slug)
                        : null,
                      onClose: () => patchState({ selected: null }),
                      onRetryStatement: () => setStatementTick((value) => value + 1),
                      onInsertTemplate: setDraft,
                    }),
                ),
                h('div', { className: 'ab-pane ab-paneWrite' },
                  h(JavaEditor, {
                    t,
                    code: draft,
                    readOnly: selected === null,
                    onChange: setDraft,
                  }),
                  h(SubmitSection, {
                    t,
                    problem: selected,
                    code: draft,
                    helper,
                    submission,
                    onSubmit: submitCode,
                  }),
                  h(CoachActions, {
                    key: selectedSlug === null ? 'none' : selectedSlug,
                    t,
                    problem: selected,
                    code: draft,
                    statement: selectedSlug !== null && statement.slug === selectedSlug
                      ? statement
                      : { slug: null, status: 'idle', data: null, error: null, offline: false },
                  }),
                  // Signed in: the whole cookie form disappears; the header chip
                  // carries the username. Anonymous users still get the form.
                  signedIn ? null : h(LoginPanel, {
                    t,
                    login,
                    onField: authField,
                    onSubmit: saveLogin,
                  }),
                ),
              ),
            ),
          ),
        ),
      );
    }

    // ---------------------------------------------------------------------
    // Entry: one sidebar icon paired with the full main-area page.
    // ---------------------------------------------------------------------

    const inject = ['slots', 'locale'];

    function apply(ctx) {
      const t = ctx.locale.bind(NS);

      ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'algo-bench: dictionaries');
      ctx.effect(() => ctx.slots.inject('main', () => ctx.slots.register({
        name: 'main',
        key: PANEL_ID,
        locale: NS,
        inject: () => ({ translate: t }),
      }, BenchPage)), 'algo-bench: main page');
      ctx.effect(() => {
        const dispose = ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist',
          id: PANEL_ID,
          order: 26,
          locale: NS,
          label: () => t('panel.label'),
        }, BenchIcon));
        return dispose;
      }, 'algo-bench: sidebar entry');
    }

    return { inject, apply };
  },
});
