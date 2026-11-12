/**
 * LeetCode 接口调用，跑在 DSH 自己的 Node 进程里。
 *
 * 浏览器页面不能直连 leetcode.cn：跨域会被 CORS 拦掉，登录 cookie 也不会带过去。
 * 但插件的 Host 半区本来就在 DSH 主进程里跑（和 IDEA 插件里的 HTTP 客户端一样），
 * 所以这里直接发请求，再通过 `ctx.connection.fetch.register` 挂到同源的
 * `/api/leetcode-bench/*` 上，页面用相对路径调用即可——不需要额外的本机进程。
 *
 * @module leetcode-bench/host
 */

import { appendFileSync, chmodSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';

const SITE = 'https://leetcode.cn';

/** 页面调用的路由前缀；同源，且由 connection 服务负责登录态。 */
export const ROUTE_PREFIX = '/api/dsh-leetcode-bench';

const CONFIG_PATH = process.env.LEETCODE_BENCH_CONFIG ?? join(homedir(), '.dsh', 'dsh-leetcode-bench', 'cookie.json');
const POLL_LIMIT = 40;
const POLL_INTERVAL = 700;

const VERDICTS = {
  10: '通过',
  11: '解答错误',
  12: '内存超限',
  13: '输出超限',
  14: '超出时间限制',
  15: '运行时错误',
  16: '内部错误',
  20: '编译错误',
  21: '未知错误',
  30: '超时',
  31: '运行时错误',
};

const DIFFICULTY = { Easy: '简单', Medium: '中等', Hard: '困难' };

function loadCookie() {
  try {
    const parsed = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
    return {
      session: typeof parsed.session === 'string' ? parsed.session : '',
      csrf: typeof parsed.csrf === 'string' ? parsed.csrf : '',
    };
  } catch (error) {
    return { session: '', csrf: '' };
  }
}

function saveCookie(next) {
  mkdirSync(dirname(CONFIG_PATH), { recursive: true });
  writeFileSync(CONFIG_PATH, JSON.stringify({ ...next, updatedAt: new Date().toISOString() }, null, 2), {
    encoding: 'utf8',
    mode: 0o600,
  });
  try {
    chmodSync(CONFIG_PATH, 0o600);
  } catch (error) {
    /* 权限收紧失败不影响使用 */
  }
}

function cookieHeader(cookie) {
  const parts = [];
  if (cookie.csrf !== '') parts.push(`csrftoken=${cookie.csrf}`);
  if (cookie.session !== '') parts.push(`LEETCODE_SESSION=${cookie.session}`);
  return parts.join('; ');
}

function baseHeaders(cookie) {
  const headers = {
    'content-type': 'application/json',
    origin: SITE,
    referer: `${SITE}/`,
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  };
  const value = cookieHeader(cookie);
  if (value !== '') headers.cookie = value;
  return headers;
}

async function graphql(cookie, query, variables) {
  const response = await fetch(`${SITE}/graphql/`, {
    method: 'POST',
    headers: baseHeaders(cookie),
    body: JSON.stringify({ query, variables }),
  });
  const text = await response.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch (error) {
    throw new Error(`leetcode 返回了非 JSON（HTTP ${response.status}）：${text.slice(0, 120)}`);
  }
  if (Array.isArray(payload.errors) && payload.errors.length > 0) {
    throw new Error(payload.errors.map((item) => item.message).join('; '));
  }
  return payload.data ?? {};
}

const STATEMENT_QUERY = `
query questionData($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionId
    questionFrontendId
    title
    translatedTitle
    difficulty
    content
    translatedContent
    codeSnippets { lang langSlug code }
    topicTags { name translatedName }
  }
}`;

async function fetchStatement(cookie, slug) {
  const data = await graphql(cookie, STATEMENT_QUERY, { titleSlug: slug });
  const question = data.question;
  if (!question) throw new Error(`题目不存在：${slug}`);
  const snippets = Array.isArray(question.codeSnippets) ? question.codeSnippets : [];
  const java = snippets.find((item) => item.langSlug === 'java');
  const tags = Array.isArray(question.topicTags)
    ? question.topicTags.map((tag) => tag.translatedName || tag.name).filter(Boolean)
    : [];
  return {
    ok: true,
    questionId: question.questionId,
    frontendId: question.questionFrontendId,
    title: question.translatedTitle || question.title,
    titleEn: question.title,
    difficulty: DIFFICULTY[question.difficulty] ?? question.difficulty,
    content: question.translatedContent || question.content || '',
    tags,
    javaSnippet: java ? java.code : null,
  };
}

function describeFailure(error) {
  if (error === null || error === undefined) return '未知错误';
  if (typeof error === 'string') return error === '' ? '未知错误' : error;
  const message = typeof error.message === 'string' ? error.message.trim() : '';
  const code = typeof error.code === 'string' ? error.code : '';
  if (message !== '' && code !== '') return `${message}（${code}）`;
  if (message !== '') return message;
  if (code !== '') return code;
  if (error.name === 'AbortError') return '请求超时（90 秒）';
  return String(error);
}

async function signedIn(cookie) {
  if (cookieHeader(cookie) === '') return { signedIn: false, username: '' };
  try {
    const data = await graphql(cookie, 'query{userStatus{isSignedIn username}}', {});
    const status = data.userStatus ?? {};
    return { signedIn: status.isSignedIn === true, username: typeof status.username === 'string' ? status.username : '' };
  } catch (error) {
    return { signedIn: false, username: '', error: error.message };
  }
}

async function submitCode(cookie, slug, code, lang) {
  if (cookieHeader(cookie) === '') {
    throw new Error('还没保存登录信息：先在页面里粘贴 LEETCODE_SESSION 和 csrftoken');
  }
  const info = await fetchStatement(cookie, slug);
  const form = new URLSearchParams({
    question_id: String(info.questionId),
    lang,
    typed_code: code,
  });
  const response = await fetch(`${SITE}/problems/${slug}/submit/`, {
    method: 'POST',
    headers: {
      ...baseHeaders(cookie),
      'content-type': 'application/x-www-form-urlencoded',
      referer: `${SITE}/problems/${slug}/`,
      'x-csrftoken': cookie.csrf,
    },
    body: form.toString(),
  });
  const text = await response.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch (error) {
    throw new Error(`提交失败（HTTP ${response.status}）：${text.slice(0, 120)}`);
  }
  if (payload.error) throw new Error(payload.error);
  const submissionId = payload.submission_id;
  if (submissionId === undefined) throw new Error(`提交没有返回 submission_id：${text.slice(0, 120)}`);
  return pollSubmission(cookie, submissionId);
}

function formatMemory(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) return null;
  if (number > 1024 * 1024) return `${(number / (1024 * 1024)).toFixed(1)} MB`;
  return `${number} MB`;
}

async function pollSubmission(cookie, submissionId) {
  for (let attempt = 0; attempt < POLL_LIMIT; attempt += 1) {
    const response = await fetch(`${SITE}/submissions/detail/${submissionId}/check/`, { headers: baseHeaders(cookie) });
    const payload = await response.json().catch(() => ({}));
    const state = payload.state ?? 'UNKNOWN';
    if (state === 'SUCCESS') {
      const statusCode = Number(payload.status_code ?? 0);
      return {
        ok: true,
        submissionId: String(submissionId),
        state,
        statusCode,
        statusMsg: VERDICTS[statusCode] ?? payload.status_msg ?? '未知结果',
        passed: statusCode === 10,
        totalCorrect: payload.total_correct ?? null,
        totalTestcases: payload.total_testcases ?? null,
        runtime: payload.status_runtime ?? payload.runtime ?? null,
        memory: formatMemory(payload.status_memory ?? payload.memory),
        compileError: payload.compile_error ?? payload.full_compile_error ?? null,
      };
    }
    if (state !== 'PENDING' && state !== 'STARTED') {
      return {
        ok: true,
        submissionId: String(submissionId),
        state,
        statusCode: Number(payload.status_code ?? 0) || null,
        statusMsg: payload.status_msg ?? state,
        passed: false,
        totalCorrect: payload.total_correct ?? null,
        totalTestcases: payload.total_testcases ?? null,
        runtime: null,
        memory: null,
        compileError: payload.compile_error ?? null,
      };
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
  }
  return {
    ok: false,
    error: '判题结果还没出来，稍后重试（或去 leetcode.cn 看提交记录）',
    submissionId: String(submissionId),
  };
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' },
  });
}

function fail(error, status = 200) {
  return json({ ok: false, error: describeFailure(error) }, status);
}

function validSlug(slug) {
  return typeof slug === 'string' && /^[a-z0-9-]+$/.test(slug);
}


const LIST_QUERY = `
query problems($categorySlug: String, $skip: Int, $limit: Int, $filters: QuestionListFilterInput) {
  problemsetQuestionList(categorySlug: $categorySlug, skip: $skip, limit: $limit, filters: $filters) {
    total
    questions {
      frontendQuestionId
      title
      titleCn
      titleSlug
      difficulty
      status
      paidOnly
      topicTags { name nameTranslated slug }
    }
  }
}`;

const DIFFICULTY_ZH = { EASY: '简单', MEDIUM: '中等', HARD: '困难' };

/**
 * One page of the public problem list. Nothing is bundled: the page asks for a
 * page, a search term and a difficulty, and LeetCode answers.
 */
async function listProblems(cookie, query) {
  const limit = Math.min(Math.max(Number(query.limit) || 50, 1), 100);
  const skip = Math.max(Number(query.skip) || 0, 0);
  const search = typeof query.search === 'string' ? query.search.trim().slice(0, 80) : '';
  const difficultyRaw = typeof query.difficulty === 'string' ? query.difficulty.toUpperCase() : '';
  const difficulty = ['EASY', 'MEDIUM', 'HARD'].includes(difficultyRaw) ? difficultyRaw : '';
  const filters = {};
  if (search !== '') filters.searchKeywords = search;
  if (difficulty !== '') filters.difficulty = difficulty;
  const data = await graphql(cookie, LIST_QUERY, {
    categorySlug: '',
    skip,
    limit,
    filters,
  });
  const node = data.problemsetQuestionList ?? {};
  const questions = Array.isArray(node.questions) ? node.questions : [];
  return {
    ok: true,
    total: Number(node.total ?? questions.length),
    skip,
    limit,
    questions: questions.map((item) => ({
      id: String(item.frontendQuestionId ?? ''),
      title: item.titleCn || item.title || '',
      slug: item.titleSlug,
      difficulty: DIFFICULTY_ZH[item.difficulty] ?? item.difficulty ?? '',
      status: item.status ?? 'NOT_STARTED',
      paidOnly: item.paidOnly === true,
      tags: Array.isArray(item.topicTags)
        ? item.topicTags.map((tag) => tag.nameTranslated || tag.name).filter(Boolean).slice(0, 4)
        : [],
    })),
  };
}


/** Diagnostic: the browser half reports that it loaded and what it registered. */
function trace(event) {
  try {
    const file = join(homedir(), '.dsh', 'dsh-leetcode-bench', 'client-trace.log');
    mkdirSync(dirname(file), { recursive: true });
    appendFileSync(file, `${new Date().toISOString()} ${JSON.stringify(event)}\n`, 'utf8');
  } catch (error) {
    /* diagnostics never break the page */
  }
}

/**
 * Register every route the bench page calls, for the plugin lifetime.
 * @param ctx - Host context carrying `connection`.
 * @returns the disposer that removes all routes.
 */
export function registerLeetcodeRoutes(ctx) {
  const disposers = [];
  const register = (path, methods, fetch) => {
    disposers.push(ctx.connection.fetch.register({
      path: `${ROUTE_PREFIX}${path}`,
      methods,
      requestBody: 'buffered',
      fetch,
    }));
  };

  register('/health', ['GET'], async () => {
    const status = await signedIn(loadCookie());
    return json({ ok: true, signedIn: status.signedIn, username: status.username, site: SITE });
  });

  register('/auth', ['POST'], async (request) => {
    try {
      const body = await request.json();
      const session = typeof body.session === 'string' ? body.session.trim() : '';
      const csrf = typeof body.csrf === 'string' ? body.csrf.trim() : '';
      if (session === '' || csrf === '') return fail('LEETCODE_SESSION 和 csrftoken 都要填', 400);
      saveCookie({ session, csrf });
      const status = await signedIn({ session, csrf });
      if (!status.signedIn) return json({ ok: false, signedIn: false, error: 'cookie 无效或已过期，登录态显示未登录' });
      return json({ ok: true, signedIn: true, username: status.username });
    } catch (error) {
      return fail(error, 500);
    }
  });

  register('/trace', ['POST'], async (request) => {
    try {
      const body = await request.json();
      trace(body);
    } catch (error) {
      trace({ error: String(error) });
    }
    return json({ ok: true });
  });

  register('/problems', ['GET'], async (request) => {
    const url = new URL(request.url);
    try {
      return json(await listProblems(loadCookie(), {
        skip: url.searchParams.get('skip'),
        limit: url.searchParams.get('limit'),
        search: url.searchParams.get('search'),
        difficulty: url.searchParams.get('difficulty'),
      }));
    } catch (error) {
      return fail(error);
    }
  });

  register('/statement', ['GET'], async (request) => {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug') ?? '';
    if (!validSlug(slug)) return fail('slug 不合法', 400);
    try {
      return json(await fetchStatement(loadCookie(), slug));
    } catch (error) {
      return fail(error);
    }
  });

  register('/submit', ['POST'], async (request) => {
    try {
      const body = await request.json();
      const slug = typeof body.slug === 'string' ? body.slug : '';
      const code = typeof body.code === 'string' ? body.code : '';
      const lang = typeof body.lang === 'string' && body.lang !== '' ? body.lang : 'java';
      if (!validSlug(slug)) return fail('slug 不合法', 400);
      if (code.trim() === '') return fail('代码是空的', 400);
      return json(await submitCode(loadCookie(), slug, code, lang));
    } catch (error) {
      return fail(error);
    }
  });

  return () => {
    for (const dispose of disposers) {
      try {
        dispose();
      } catch (error) {
        /* 路由已随插件 fiber 卸载 */
      }
    }
  };
}
