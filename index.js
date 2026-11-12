/**
 * Host half of the algorithm practice bench bundle.
 *
 * The page lives in the browser module (`./client`): the right sidebar tab, the
 * 27-episode problem bank, the check-off progress and the Java editor.
 *
 * This half carries the LeetCode calls. A browser page cannot reach
 * leetcode.cn (CORS, and the login cookie would not travel), so — exactly like
 * an IDE plugin — the requests run here in DSH's own Node process and are
 * published as same-origin `/api/leetcode-bench/*` routes. No separate helper
 * process, no extra port.
 */
import { registerLeetcodeRoutes } from './host/leetcode.mjs';

/** `connection` authenticates the routes and fences them behind the app. */
export const inject = ['connection'];

export function apply(ctx) {
  ctx.effect(() => registerLeetcodeRoutes(ctx), 'leetcode-bench: /api/leetcode-bench routes');
}
