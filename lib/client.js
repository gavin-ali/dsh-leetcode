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

    const COMPLETIONS = [
  {
    "key": "getOrDefault",
    "group": "Map",
    "detail": "取不到时返回默认值",
    "insert": "getOrDefault(key, defaultValue)"
  },
  {
    "key": "putIfAbsent",
    "group": "Map",
    "detail": "不存在才放入",
    "insert": "putIfAbsent(key, value)"
  },
  {
    "key": "computeIfAbsent",
    "group": "Map",
    "detail": "不存在则计算并放入",
    "insert": "computeIfAbsent(key, k -> new ArrayList<>())"
  },
  {
    "key": "merge",
    "group": "Map",
    "detail": "按键合并计数",
    "insert": "merge(key, 1, Integer::sum)"
  },
  {
    "key": "entrySort",
    "group": "Map",
    "detail": "按值排序 Map 条目",
    "insert": "List<Map.Entry<K, V>> entries = new ArrayList<>(map.entrySet());\nentries.sort((a, b) -> a.getValue() - b.getValue());",
    "statement": true
  },
  {
    "key": "sort",
    "group": "数组",
    "detail": "Arrays.sort 升序",
    "insert": "Arrays.sort(nums);",
    "statement": true
  },
  {
    "key": "sortRange",
    "group": "数组",
    "detail": "Arrays.sort 区间 [left, right)",
    "insert": "Arrays.sort(nums, left, right);",
    "statement": true
  },
  {
    "key": "sortDesc",
    "group": "数组",
    "detail": "降序排序（Integer[]）",
    "insert": "Arrays.sort(nums, (a, b) -> b - a);",
    "statement": true
  },
  {
    "key": "sortPairs",
    "group": "数组",
    "detail": "二维数组按首项排序",
    "insert": "Arrays.sort(pairs, (a, b) -> a[0] - b[0]);",
    "statement": true
  },
  {
    "key": "fill",
    "group": "数组",
    "detail": "Arrays.fill 填充",
    "insert": "Arrays.fill(dp, -1);",
    "statement": true
  },
  {
    "key": "asList",
    "group": "数组",
    "detail": "Arrays.asList 建列表",
    "insert": "Arrays.asList(a, b, c)",
    "statement": true
  },
  {
    "key": "collectionsSort",
    "group": "集合",
    "detail": "列表升序排序",
    "insert": "Collections.sort(list);",
    "statement": true
  },
  {
    "key": "reverse",
    "group": "集合",
    "detail": "反转列表",
    "insert": "Collections.reverse(list);",
    "statement": true
  },
  {
    "key": "listToArray",
    "group": "集合",
    "detail": "List<Integer> 转 int[]",
    "insert": "list.stream().mapToInt(Integer::intValue).toArray()",
    "statement": true
  },
  {
    "key": "PriorityQueue",
    "group": "堆",
    "detail": "小顶堆",
    "insert": "PriorityQueue<Integer> pq = new PriorityQueue<>();",
    "statement": true
  },
  {
    "key": "maxHeap",
    "group": "堆",
    "detail": "大顶堆",
    "insert": "PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> b - a);",
    "statement": true
  },
  {
    "key": "heapArray",
    "group": "堆",
    "detail": "数组元素按首项比较",
    "insert": "PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);",
    "statement": true
  },
  {
    "key": "ArrayDeque",
    "group": "队列",
    "detail": "双端队列",
    "insert": "Deque<Integer> dq = new ArrayDeque<>();",
    "statement": true
  },
  {
    "key": "dequeOps",
    "group": "队列",
    "detail": "入队 / 出队 / 看队首",
    "insert": "dq.offerLast(x);\ndq.pollFirst();\ndq.peekFirst();",
    "statement": true
  },
  {
    "key": "StringBuilder",
    "group": "字符串",
    "detail": "可变字符串",
    "insert": "StringBuilder sb = new StringBuilder();",
    "statement": true
  },
  {
    "key": "toCharArray",
    "group": "字符串",
    "detail": "转字符数组",
    "insert": "s.toCharArray()"
  },
  {
    "key": "charAt",
    "group": "字符串",
    "detail": "取字符",
    "insert": "s.charAt(i)"
  },
  {
    "key": "substring",
    "group": "字符串",
    "detail": "取子串 [l, r)",
    "insert": "s.substring(l, r)"
  },
  {
    "key": "split",
    "group": "字符串",
    "detail": "按分隔符拆分",
    "insert": "s.split(\",\")"
  },
  {
    "key": "parseInt",
    "group": "字符串",
    "detail": "字符串转整数",
    "insert": "Integer.parseInt(s)"
  },
  {
    "key": "charOffset",
    "group": "字符串",
    "detail": "字母下标转字符",
    "insert": "char c = (char) ('a' + i);",
    "statement": true
  },
  {
    "key": "max",
    "group": "数学",
    "detail": "Math.max 取较大值",
    "insert": "Math.max(a, b)"
  },
  {
    "key": "min",
    "group": "数学",
    "detail": "Math.min 取较小值",
    "insert": "Math.min(a, b)"
  },
  {
    "key": "abs",
    "group": "数学",
    "detail": "Math.abs 取绝对值",
    "insert": "Math.abs(a)"
  },
  {
    "key": "gcd",
    "group": "数学",
    "detail": "最大公约数",
    "insert": "int gcd(int a, int b) {\n    return b == 0 ? a : gcd(b, a % b);\n}",
    "statement": true
  },
  {
    "key": "lowerBound",
    "group": "二分",
    "detail": "第一个 >= target 的下标",
    "insert": "int left = 0, right = nums.length; // [left, right)\nwhile (left < right) {\n    int mid = left + (right - left) / 2;\n    if (nums[mid] >= target) right = mid;\n    else left = mid + 1;\n}\nreturn left;",
    "statement": true
  },
  {
    "key": "upperBound",
    "group": "二分",
    "detail": "第一个 > target 的下标",
    "insert": "int left = 0, right = nums.length; // [left, right)\nwhile (left < right) {\n    int mid = left + (right - left) / 2;\n    if (nums[mid] > target) right = mid;\n    else left = mid + 1;\n}\nreturn left;",
    "statement": true
  },
  {
    "key": "binarySearch",
    "group": "二分",
    "detail": "闭区间二分查找",
    "insert": "int left = 0, right = nums.length - 1;\nwhile (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n}\nreturn -1;",
    "statement": true
  },
  {
    "key": "slidingWindow",
    "group": "模板",
    "detail": "滑动窗口骨架",
    "insert": "int left = 0, ans = 0;\nfor (int right = 0; right < n; right++) {\n    // 加入 nums[right]\n    while (/* 窗口不满足条件 */) {\n        // 移出 nums[left++]\n    }\n    ans = Math.max(ans, right - left + 1);\n}",
    "statement": true
  },
  {
    "key": "prefixSum",
    "group": "模板",
    "detail": "前缀和",
    "insert": "int[] pre = new int[n + 1];\nfor (int i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];\n// 区间和 [l, r] = pre[r + 1] - pre[l]",
    "statement": true
  },
  {
    "key": "twoPointers",
    "group": "模板",
    "detail": "相向双指针",
    "insert": "int left = 0, right = n - 1;\nwhile (left < right) {\n    // 根据条件移动 left 或 right\n    if (/* 条件 */) left++;\n    else right--;\n}",
    "statement": true
  },
  {
    "key": "backtrack",
    "group": "模板",
    "detail": "子集 / 组合回溯",
    "insert": "void dfs(int start, int[] nums) {\n    if (/* 终止条件 */) {\n        ans.add(new ArrayList<>(path));\n        return;\n    }\n    for (int i = start; i < nums.length; i++) {\n        path.add(nums[i]);\n        dfs(i + 1, nums);\n        path.remove(path.size() - 1);\n    }\n}",
    "statement": true
  },
  {
    "key": "dfsTree",
    "group": "模板",
    "detail": "二叉树递归",
    "insert": "void dfs(TreeNode node) {\n    if (node == null) return;\n    dfs(node.left);\n    dfs(node.right);\n}",
    "statement": true
  },
  {
    "key": "dpMemo",
    "group": "模板",
    "detail": "记忆化搜索",
    "insert": "int[] memo = new int[n + 1];\nArrays.fill(memo, -1);\n\nint dfs(int i) {\n    if (i == 0) return 1;\n    if (memo[i] != -1) return memo[i];\n    return memo[i] = /* 转移 */;\n}",
    "statement": true
  },
  {
    "key": "monotonicStack",
    "group": "模板",
    "detail": "单调栈",
    "insert": "Deque<Integer> stack = new ArrayDeque<>();\nfor (int i = 0; i < n; i++) {\n    while (!stack.isEmpty() && nums[stack.peek()] <= nums[i]) stack.pop();\n    // 此时栈顶是左侧第一个更大元素\n    stack.push(i);\n}",
    "statement": true
  },
  {
    "key": "monotonicQueue",
    "group": "模板",
    "detail": "单调队列（窗口最大值）",
    "insert": "Deque<Integer> dq = new ArrayDeque<>();\nfor (int i = 0; i < n; i++) {\n    while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) dq.pollLast();\n    dq.offerLast(i);\n    if (dq.peekFirst() <= i - k) dq.pollFirst();\n    if (i >= k - 1) ans[i - k + 1] = nums[dq.peekFirst()];\n}",
    "statement": true
  },
  {
    "key": "knapsack01",
    "group": "模板",
    "detail": "0-1 背包（倒序）",
    "insert": "int[] f = new int[target + 1];\nfor (int x : nums)\n    for (int j = target; j >= x; j--)\n        f[j] = Math.max(f[j], f[j - x] + 1);",
    "statement": true
  },
  {
    "key": "knapsackComplete",
    "group": "模板",
    "detail": "完全背包（正序）",
    "insert": "int[] f = new int[amount + 1];\nArrays.fill(f, amount + 1);\nf[0] = 0;\nfor (int x : coins)\n    for (int j = x; j <= amount; j++)\n        f[j] = Math.min(f[j], f[j - x] + 1);",
    "statement": true
  },
  {
    "key": "lcs",
    "group": "模板",
    "detail": "最长公共子序列",
    "insert": "int[][] f = new int[n + 1][m + 1];\nfor (int i = 0; i < n; i++)\n    for (int j = 0; j < m; j++)\n        f[i + 1][j + 1] = s.charAt(i) == t.charAt(j)\n            ? f[i][j] + 1\n            : Math.max(f[i][j + 1], f[i + 1][j]);",
    "statement": true
  },
  {
    "key": "lis",
    "group": "模板",
    "detail": "最长递增子序列 O(n^2)",
    "insert": "int[] f = new int[n];\nArrays.fill(f, 1);\nfor (int i = 0; i < n; i++)\n    for (int j = 0; j < i; j++)\n        if (nums[j] < nums[i]) f[i] = Math.max(f[i], f[j] + 1);",
    "statement": true
  },
  {
    "key": "intervalDP",
    "group": "模板",
    "detail": "区间 DP 骨架",
    "insert": "int[][] f = new int[n][n];\nfor (int len = 2; len <= n; len++)\n    for (int i = 0; i + len - 1 < n; i++) {\n        int j = i + len - 1;\n        for (int k = i; k < j; k++)\n            f[i][j] = Math.min(f[i][j], f[i][k] + f[k + 1][j] + /* 合并代价 */);\n    }",
    "statement": true
  },
  {
    "key": "length",
    "group": "字符串",
    "detail": "返回字符个数，不是字节数",
    "insert": "length()"
  },
  {
    "key": "indexOf",
    "group": "字符串",
    "detail": "找不到返回 -1，注意判空",
    "insert": "indexOf(ch)"
  },
  {
    "key": "lastIndexOf",
    "group": "字符串",
    "detail": "从后往前找，无则返回 -1",
    "insert": "lastIndexOf(ch)"
  },
  {
    "key": "trim",
    "group": "字符串",
    "detail": "只去首尾空白，全角不去",
    "insert": "trim()"
  },
  {
    "key": "strip",
    "group": "字符串",
    "detail": "去首尾空白，支持 Unicode",
    "insert": "strip()"
  },
  {
    "key": "replace",
    "group": "字符串",
    "detail": "替换所有字面量，非正则",
    "insert": "replace(old, new)"
  },
  {
    "key": "replaceAll",
    "group": "字符串",
    "detail": "参数是正则，元字符要转义",
    "insert": "replaceAll(regex, repl)"
  },
  {
    "key": "replaceFirst",
    "group": "字符串",
    "detail": "只替换第一个正则匹配",
    "insert": "replaceFirst(regex, repl)"
  },
  {
    "key": "contains",
    "group": "字符串",
    "detail": "判断子串，参数是字符序列",
    "insert": "contains(s)"
  },
  {
    "key": "startsWith",
    "group": "字符串",
    "detail": "判断前缀，可加起始偏移",
    "insert": "startsWith(prefix)"
  },
  {
    "key": "endsWith",
    "group": "字符串",
    "detail": "判断后缀，区分大小写",
    "insert": "endsWith(suffix)"
  },
  {
    "key": "equalsIgnoreCase",
    "group": "字符串",
    "detail": "忽略大小写比较，注意 null",
    "insert": "equalsIgnoreCase(s)"
  },
  {
    "key": "compareTo",
    "group": "字符串",
    "detail": "字典序比较，返回差值符号",
    "insert": "compareTo(s)"
  },
  {
    "key": "valueOf",
    "group": "字符串",
    "detail": "任意类型转串，null 安全",
    "insert": "String.valueOf(x)"
  },
  {
    "key": "repeat",
    "group": "字符串",
    "detail": "重复 n 次，n 不能为负",
    "insert": "repeat(n)"
  },
  {
    "key": "join",
    "group": "字符串",
    "detail": "用分隔符连接，元素可 null",
    "insert": "String.join(delim, parts)"
  },
  {
    "key": "format",
    "group": "字符串",
    "detail": "格式化字符串，注意占位符",
    "insert": "String.format(fmt, args)"
  },
  {
    "key": "toLowerCase",
    "group": "字符串",
    "detail": "转小写，注意 Locale 差异",
    "insert": "toLowerCase()"
  },
  {
    "key": "toUpperCase",
    "group": "字符串",
    "detail": "转大写，注意 Locale 差异",
    "insert": "toUpperCase()"
  },
  {
    "key": "isEmpty",
    "group": "字符串",
    "detail": "长度为 0 才真，不判 null",
    "insert": "isEmpty()"
  },
  {
    "key": "isBlank",
    "group": "字符串",
    "detail": "空白也算空，Java 11+",
    "insert": "isBlank()"
  },
  {
    "key": "matches",
    "group": "字符串",
    "detail": "整串匹配正则，不是包含",
    "insert": "matches(regex)"
  },
  {
    "key": "getBytes",
    "group": "字符串",
    "detail": "按 UTF-8 转字节数组",
    "insert": "getBytes(StandardCharsets.UTF_8)"
  },
  {
    "key": "concat",
    "group": "字符串",
    "detail": "拼接返回新串，循环别用",
    "insert": "concat(s)"
  },
  {
    "key": "intern",
    "group": "字符串",
    "detail": "入常量池，引用比较慎用",
    "insert": "intern()"
  },
  {
    "key": "codePointAt",
    "group": "字符串",
    "detail": "取码点，代理对别用 charAt",
    "insert": "codePointAt(i)"
  },
  {
    "key": "chars",
    "group": "字符串",
    "detail": "返回字符流，便于统计",
    "insert": "chars()"
  },
  {
    "key": "lines",
    "group": "字符串",
    "detail": "按行切分，返回 Stream",
    "insert": "lines()"
  },
  {
    "key": "equals",
    "group": "字符串",
    "detail": "内容比较，常量放前面防 NPE",
    "insert": "equals(s)"
  },
  {
    "key": "stripLeading",
    "group": "字符串",
    "detail": "只去开头空白，支持 Unicode",
    "insert": "stripLeading()"
  },
  {
    "key": "stripTrailing",
    "group": "字符串",
    "detail": "只去结尾空白，支持 Unicode",
    "insert": "stripTrailing()"
  },
  {
    "key": "append",
    "group": "StringBuilder",
    "detail": "追加并返回自身，可链式",
    "insert": "append(x)"
  },
  {
    "key": "insert",
    "group": "StringBuilder",
    "detail": "在下标 i 前插入，防越界",
    "insert": "insert(i, x)"
  },
  {
    "key": "deleteCharAt",
    "group": "StringBuilder",
    "detail": "删单个字符，索引要合法",
    "insert": "deleteCharAt(i)"
  },
  {
    "key": "delete",
    "group": "StringBuilder",
    "detail": "删左闭右开，右界不含",
    "insert": "delete(start, end)"
  },
  {
    "key": "setCharAt",
    "group": "StringBuilder",
    "detail": "改指定字符，长度不变",
    "insert": "setCharAt(i, ch)"
  },
  {
    "key": "setLength",
    "group": "StringBuilder",
    "detail": "截断或补 \\0，慎用",
    "insert": "setLength(n)"
  },
  {
    "key": "capacity",
    "group": "StringBuilder",
    "detail": "当前容量，不是字符长度",
    "insert": "capacity()"
  },
  {
    "key": "ensureCapacity",
    "group": "StringBuilder",
    "detail": "预扩容，减少多次拷贝",
    "insert": "ensureCapacity(n)"
  },
  {
    "key": "toString",
    "group": "StringBuilder",
    "detail": "转不可变 String，别再修改",
    "insert": "toString()"
  },
  {
    "key": "appendCodePoint",
    "group": "StringBuilder",
    "detail": "追加码点，注意代理对",
    "insert": "appendCodePoint(cp)"
  },
  {
    "key": "isDigit",
    "group": "Character",
    "detail": "判断数字，含 Unicode 数字",
    "insert": "isDigit(ch)"
  },
  {
    "key": "isLetter",
    "group": "Character",
    "detail": "判断字母，含 Unicode 字母",
    "insert": "isLetter(ch)"
  },
  {
    "key": "isLetterOrDigit",
    "group": "Character",
    "detail": "字母或数字，常用于校验",
    "insert": "isLetterOrDigit(ch)"
  },
  {
    "key": "isWhitespace",
    "group": "Character",
    "detail": "判断空白，不含全角空格",
    "insert": "isWhitespace(ch)"
  },
  {
    "key": "isUpperCase",
    "group": "Character",
    "detail": "判断大写字母，非字母 false",
    "insert": "isUpperCase(ch)"
  },
  {
    "key": "isLowerCase",
    "group": "Character",
    "detail": "判断小写字母，非字母 false",
    "insert": "isLowerCase(ch)"
  },
  {
    "key": "getNumericValue",
    "group": "Character",
    "detail": "字符转数值，非数字返 -1",
    "insert": "getNumericValue(ch)"
  },
  {
    "key": "digit",
    "group": "Character",
    "detail": "按进制取数值，非法返 -1",
    "insert": "digit(ch, radix)"
  },
  {
    "key": "forDigit",
    "group": "Character",
    "detail": "数值转字符，越界返回 \\0",
    "insert": "forDigit(d, radix)"
  },
  {
    "key": "isAlphabetic",
    "group": "Character",
    "detail": "判断字母，支持码点输入",
    "insert": "isAlphabetic(cp)"
  },
  {
    "key": "isSpaceChar",
    "group": "Character",
    "detail": "判断空格类，含全角空格",
    "insert": "isSpaceChar(ch)"
  },
  {
    "key": "compare",
    "group": "Character",
    "detail": "比较字符，返回差值符号",
    "insert": "compare(a, b)"
  },
  {
    "key": "sqrt",
    "group": "Math",
    "detail": "开方返回 double，注意精度",
    "insert": "sqrt(x)"
  },
  {
    "key": "pow",
    "group": "Math",
    "detail": "幂运算，结果是 double",
    "insert": "pow(a, b)"
  },
  {
    "key": "floor",
    "group": "Math",
    "detail": "向下取整，负数更小",
    "insert": "floor(x)"
  },
  {
    "key": "ceil",
    "group": "Math",
    "detail": "向上取整，返回 double",
    "insert": "ceil(x)"
  },
  {
    "key": "round",
    "group": "Math",
    "detail": "四舍五入，负数规则特殊",
    "insert": "round(x)"
  },
  {
    "key": "log",
    "group": "Math",
    "detail": "自然对数，换底用 log 比",
    "insert": "log(x)"
  },
  {
    "key": "log10",
    "group": "Math",
    "detail": "以 10 为底的对数",
    "insert": "log10(x)"
  },
  {
    "key": "floorDiv",
    "group": "Math",
    "detail": "向下取整除法，负数注意",
    "insert": "floorDiv(a, b)"
  },
  {
    "key": "floorMod",
    "group": "Math",
    "detail": "取模结果非负，环形常用",
    "insert": "floorMod(a, b)"
  },
  {
    "key": "random",
    "group": "Math",
    "detail": "随机 double，范围 [0,1)",
    "insert": "random()"
  },
  {
    "key": "addExact",
    "group": "Math",
    "detail": "加法溢出抛异常，防越界",
    "insert": "addExact(a, b)"
  },
  {
    "key": "multiplyExact",
    "group": "Math",
    "detail": "乘法溢出抛异常，防越界",
    "insert": "multiplyExact(a, b)"
  },
  {
    "key": "negateExact",
    "group": "Math",
    "detail": "取负溢出抛异常，注意边界",
    "insert": "negateExact(a)"
  },
  {
    "key": "toIntExact",
    "group": "Math",
    "detail": "long 转 int，溢出抛异常",
    "insert": "toIntExact(x)"
  },
  {
    "key": "hypot",
    "group": "Math",
    "detail": "求斜边，避免中间溢出",
    "insert": "hypot(a, b)"
  },
  {
    "key": "signum",
    "group": "Math",
    "detail": "返回符号 -1/0/1",
    "insert": "signum(x)"
  },
  {
    "key": "parseLong",
    "group": "数字",
    "detail": "字符串转 long，注意溢出",
    "insert": "Long.parseLong(s)"
  },
  {
    "key": "intValue",
    "group": "数字",
    "detail": "拆箱为 int，注意 null",
    "insert": "intValue()"
  },
  {
    "key": "longValue",
    "group": "数字",
    "detail": "包装类转 long，注意 null",
    "insert": "longValue()"
  },
  {
    "key": "doubleValue",
    "group": "数字",
    "detail": "转 double，大整数丢精度",
    "insert": "doubleValue()"
  },
  {
    "key": "toBinaryString",
    "group": "数字",
    "detail": "转二进制串，负数用补码",
    "insert": "Integer.toBinaryString(n)"
  },
  {
    "key": "toHexString",
    "group": "数字",
    "detail": "转十六进制串，小写输出",
    "insert": "Integer.toHexString(n)"
  },
  {
    "key": "toStringRadix",
    "group": "数字",
    "detail": "按进制转字符串，基 2-36",
    "insert": "Integer.toString(n, radix)"
  },
  {
    "key": "parseIntRadix",
    "group": "数字",
    "detail": "按进制解析，支持正负号",
    "insert": "Integer.parseInt(s, radix)"
  },
  {
    "key": "integerSum",
    "group": "数字",
    "detail": "两数相加，可能溢出",
    "insert": "Integer.sum(a, b)"
  },
  {
    "key": "maxValue",
    "group": "数字",
    "detail": "int 最大值，防加法溢出",
    "insert": "Integer.MAX_VALUE"
  },
  {
    "key": "minValue",
    "group": "数字",
    "detail": "int 最小值，取负会溢出",
    "insert": "Integer.MIN_VALUE"
  },
  {
    "key": "longMax",
    "group": "数字",
    "detail": "long 最大值，防溢出",
    "insert": "Long.MAX_VALUE"
  },
  {
    "key": "compareInt",
    "group": "数字",
    "detail": "比较两 int，返回符号",
    "insert": "Integer.compare(a, b)"
  },
  {
    "key": "toUnsignedString",
    "group": "数字",
    "detail": "按无符号解释，负数变正",
    "insert": "Integer.toUnsignedString(n)"
  },
  {
    "key": "arrLength",
    "group": "数组",
    "detail": "数组长度是字段，无括号",
    "insert": "length"
  },
  {
    "key": "arraySort",
    "group": "数组",
    "detail": "升序排序，原地修改数组",
    "insert": "Arrays.sort(nums);",
    "statement": true
  },
  {
    "key": "arraySortRange",
    "group": "数组",
    "detail": "排左闭右开，右界不含",
    "insert": "Arrays.sort(nums, left, right);",
    "statement": true
  },
  {
    "key": "arraySortDesc",
    "group": "数组",
    "detail": "仅对象数组可降序，int[] 不行",
    "insert": "Arrays.sort(boxed, Collections.reverseOrder());",
    "statement": true
  },
  {
    "key": "arrayEquals",
    "group": "数组",
    "detail": "逐元素比较，别用 ==",
    "insert": "Arrays.equals(a, b)"
  },
  {
    "key": "arrayFillRange",
    "group": "数组",
    "detail": "填左闭右开，右界不含",
    "insert": "Arrays.fill(nums, left, right, val);",
    "statement": true
  },
  {
    "key": "arrayCopyOf",
    "group": "数组",
    "detail": "复制指定长度，不足补零",
    "insert": "int[] b = Arrays.copyOf(nums, n);",
    "statement": true
  },
  {
    "key": "arrayCopyOfRange",
    "group": "数组",
    "detail": "复制区间，右界不含",
    "insert": "int[] b = Arrays.copyOfRange(nums, from, to);",
    "statement": true
  },
  {
    "key": "arrayToString",
    "group": "数组",
    "detail": "打印内容，别直接打印引用",
    "insert": "Arrays.toString(nums)"
  },
  {
    "key": "arrayDeepToString",
    "group": "数组",
    "detail": "打印二维数组，递归内容",
    "insert": "Arrays.deepToString(grid)"
  },
  {
    "key": "arrayStream",
    "group": "数组",
    "detail": "数组转流，支持聚合操作",
    "insert": "Arrays.stream(nums)"
  },
  {
    "key": "arraySetAll",
    "group": "数组",
    "detail": "按索引生成，可做初始化",
    "insert": "Arrays.setAll(nums, i -> 0);",
    "statement": true
  },
  {
    "key": "arrayCompare",
    "group": "数组",
    "detail": "字典序比较，返回差值符号",
    "insert": "Arrays.compare(a, b)"
  },
  {
    "key": "arrayMismatch",
    "group": "数组",
    "detail": "首个不同下标，全同返 -1",
    "insert": "Arrays.mismatch(a, b)"
  },
  {
    "key": "arrayHashCode",
    "group": "数组",
    "detail": "按内容哈希，别用引用哈希",
    "insert": "Arrays.hashCode(nums)"
  },
  {
    "key": "arrayStreamSum",
    "group": "数组",
    "detail": "数组求和，注意返回类型",
    "insert": "Arrays.stream(nums).sum()"
  },
  {
    "key": "arrayToList",
    "group": "数组",
    "detail": "int[] 转 List，必须装箱",
    "insert": "Arrays.stream(nums).boxed().toList()"
  },
  {
    "key": "add",
    "group": "List",
    "detail": "尾部添加，重复则返回 false",
    "insert": "add(x)"
  },
  {
    "key": "get",
    "group": "List",
    "detail": "按下标取，越界抛异常",
    "insert": "get(i)"
  },
  {
    "key": "set",
    "group": "List",
    "detail": "替换并返回旧值，不能越界",
    "insert": "set(i, x)"
  },
  {
    "key": "remove",
    "group": "List",
    "detail": "按索引删，注意重载歧义",
    "insert": "remove(i)"
  },
  {
    "key": "size",
    "group": "List",
    "detail": "元素个数，不是数组长度",
    "insert": "size()"
  },
  {
    "key": "addAll",
    "group": "List",
    "detail": "批量追加，返回是否变化",
    "insert": "addAll(c)"
  },
  {
    "key": "removeIf",
    "group": "List",
    "detail": "按条件删除，注意并发修改",
    "insert": "removeIf(x -> cond)"
  },
  {
    "key": "clear",
    "group": "List",
    "detail": "清空元素，容量通常保留",
    "insert": "clear()"
  },
  {
    "key": "subList",
    "group": "List",
    "detail": "视图左闭右开，改它改原表",
    "insert": "subList(from, to)"
  },
  {
    "key": "toArray",
    "group": "List",
    "detail": "转数组，基本类型需装箱",
    "insert": "toArray(new Integer[0])"
  },
  {
    "key": "listSort",
    "group": "List",
    "detail": "原地升序，null 用自然序",
    "insert": "list.sort(null);",
    "statement": true
  },
  {
    "key": "listSortComparator",
    "group": "List",
    "detail": "按 key 排序，稳定且原地",
    "insert": "list.sort(Comparator.comparingInt(x -> x));",
    "statement": true
  },
  {
    "key": "listReverse",
    "group": "List",
    "detail": "原地反转，返回 void",
    "insert": "Collections.reverse(list);",
    "statement": true
  },
  {
    "key": "listShuffle",
    "group": "List",
    "detail": "随机打乱，可传入 Random",
    "insert": "Collections.shuffle(list);",
    "statement": true
  },
  {
    "key": "listMax",
    "group": "List",
    "detail": "自然序最大，空表抛异常",
    "insert": "Collections.max(list)"
  },
  {
    "key": "listFrequency",
    "group": "List",
    "detail": "统计次数，复杂度 O(n)",
    "insert": "Collections.frequency(list, x)"
  },
  {
    "key": "listSwap",
    "group": "List",
    "detail": "交换两下标，原地操作",
    "insert": "Collections.swap(list, i, j);",
    "statement": true
  },
  {
    "key": "listNCopies",
    "group": "List",
    "detail": "不可变重复列表，别修改",
    "insert": "Collections.nCopies(n, val)"
  },
  {
    "key": "compute",
    "group": "Map",
    "detail": "原子更新，返回新值",
    "insert": "compute(k, (key, v) -> v == null ? 1 : v + 1)"
  },
  {
    "key": "computeIfPresent",
    "group": "Map",
    "detail": "仅键存在时更新，否则跳过",
    "insert": "computeIfPresent(k, (key, v) -> v + 1)"
  },
  {
    "key": "keySet",
    "group": "Map",
    "detail": "键视图，删它会删映射",
    "insert": "keySet()"
  },
  {
    "key": "values",
    "group": "Map",
    "detail": "值集合，可重复且无序",
    "insert": "values()"
  },
  {
    "key": "entrySet",
    "group": "Map",
    "detail": "键值对集合，遍历更高效",
    "insert": "entrySet()"
  },
  {
    "key": "containsKey",
    "group": "Map",
    "detail": "判断键，别用 get 判 null",
    "insert": "containsKey(k)"
  },
  {
    "key": "containsValue",
    "group": "Map",
    "detail": "判断值，需要遍历 O(n)",
    "insert": "containsValue(v)"
  },
  {
    "key": "put",
    "group": "Map",
    "detail": "写入并返回旧值，可能覆盖",
    "insert": "put(k, v)"
  },
  {
    "key": "putAll",
    "group": "Map",
    "detail": "批量写入，覆盖同名键",
    "insert": "putAll(m)"
  },
  {
    "key": "floorKey",
    "group": "Map",
    "detail": "TreeMap 小于等于的最大键",
    "insert": "floorKey(k)"
  },
  {
    "key": "ceilingKey",
    "group": "Map",
    "detail": "TreeMap 大于等于的最小键",
    "insert": "ceilingKey(k)"
  },
  {
    "key": "higherKey",
    "group": "Map",
    "detail": "TreeMap 严格更大的最小键",
    "insert": "higherKey(k)"
  },
  {
    "key": "lowerKey",
    "group": "Map",
    "detail": "TreeMap 严格更小的最大键",
    "insert": "lowerKey(k)"
  },
  {
    "key": "firstKey",
    "group": "Map",
    "detail": "TreeMap 最小键，空则抛",
    "insert": "firstKey()"
  },
  {
    "key": "lastKey",
    "group": "Map",
    "detail": "TreeMap 最大键，空则抛",
    "insert": "lastKey()"
  },
  {
    "key": "mapEntry",
    "group": "Map",
    "detail": "创建不可变键值对，禁 null",
    "insert": "Map.entry(k, v)"
  },
  {
    "key": "newHashMap",
    "group": "Map",
    "detail": "哈希表，O(1) 但无序",
    "insert": "new HashMap<>()"
  },
  {
    "key": "newTreeMap",
    "group": "Map",
    "detail": "有序映射，操作 O(log n)",
    "insert": "new TreeMap<>()"
  },
  {
    "key": "retainAll",
    "group": "Set",
    "detail": "仅保留交集，原地修改",
    "insert": "retainAll(c)"
  },
  {
    "key": "removeAll",
    "group": "Set",
    "detail": "删除交集元素，原地修改",
    "insert": "removeAll(c)"
  },
  {
    "key": "containsAll",
    "group": "Set",
    "detail": "是否包含全部，空集为真",
    "insert": "containsAll(c)"
  },
  {
    "key": "iterator",
    "group": "Set",
    "detail": "迭代器遍历，删除用它",
    "insert": "iterator()"
  },
  {
    "key": "setOf",
    "group": "Set",
    "detail": "不可变集合，不允许 null",
    "insert": "Set.of(a, b)"
  },
  {
    "key": "newHashSet",
    "group": "Set",
    "detail": "去重集合，无序均摊 O(1)",
    "insert": "new HashSet<>()"
  },
  {
    "key": "copyOf",
    "group": "Set",
    "detail": "复制为不可变集合，null 抛",
    "insert": "Set.copyOf(c)"
  },
  {
    "key": "newTreeSet",
    "group": "Set",
    "detail": "有序去重，操作 O(log n)",
    "insert": "new TreeSet<>()"
  },
  {
    "key": "first",
    "group": "Set",
    "detail": "TreeSet 最小元素，空则抛",
    "insert": "first()"
  },
  {
    "key": "last",
    "group": "Set",
    "detail": "TreeSet 最大元素，空则抛",
    "insert": "last()"
  },
  {
    "key": "higher",
    "group": "Set",
    "detail": "严格大于的最小元素",
    "insert": "higher(x)"
  },
  {
    "key": "lower",
    "group": "Set",
    "detail": "严格小于的最大元素",
    "insert": "lower(x)"
  },
  {
    "key": "ceiling",
    "group": "Set",
    "detail": "大于等于的最小元素",
    "insert": "ceiling(x)"
  },
  {
    "key": "offer",
    "group": "堆",
    "detail": "入堆，容量满返回 false",
    "insert": "offer(x)"
  },
  {
    "key": "poll",
    "group": "堆",
    "detail": "弹出堆顶，空堆返回 null",
    "insert": "poll()"
  },
  {
    "key": "peek",
    "group": "堆",
    "detail": "查看堆顶，空堆返回 null",
    "insert": "peek()"
  },
  {
    "key": "heapify",
    "group": "堆",
    "detail": "由集合建堆，复杂度 O(n)",
    "insert": "new PriorityQueue<>(list)"
  },
  {
    "key": "heapComparator",
    "group": "堆",
    "detail": "小根堆比较器，警惕减法溢出",
    "insert": "new PriorityQueue<>((a, b) -> a - b)"
  },
  {
    "key": "maxHeapComparator",
    "group": "堆",
    "detail": "大根堆，减法可能溢出",
    "insert": "new PriorityQueue<>((a, b) -> b - a)"
  },
  {
    "key": "heapPushPop",
    "group": "堆",
    "detail": "先入后出，保持堆序",
    "insert": "pq.offer(x); pq.poll();",
    "statement": true
  },
  {
    "key": "heapReplace",
    "group": "堆",
    "detail": "替换堆顶，先出后进",
    "insert": "pq.poll(); pq.offer(x);",
    "statement": true
  },
  {
    "key": "addFirst",
    "group": "队列",
    "detail": "队头插入，失败抛异常",
    "insert": "addFirst(x)"
  },
  {
    "key": "addLast",
    "group": "队列",
    "detail": "队尾插入，失败抛异常",
    "insert": "addLast(x)"
  },
  {
    "key": "offerFirst",
    "group": "队列",
    "detail": "队头插入，失败返 false",
    "insert": "offerFirst(x)"
  },
  {
    "key": "offerLast",
    "group": "队列",
    "detail": "队尾插入，失败返 false",
    "insert": "offerLast(x)"
  },
  {
    "key": "pollFirst",
    "group": "队列",
    "detail": "弹出队头，空返回 null",
    "insert": "pollFirst()"
  },
  {
    "key": "pollLast",
    "group": "队列",
    "detail": "弹出队尾，空返回 null",
    "insert": "pollLast()"
  },
  {
    "key": "peekFirst",
    "group": "队列",
    "detail": "查看队头，空返回 null",
    "insert": "peekFirst()"
  },
  {
    "key": "peekLast",
    "group": "队列",
    "detail": "查看队尾，空返回 null",
    "insert": "peekLast()"
  },
  {
    "key": "element",
    "group": "队列",
    "detail": "查看队头，空则抛异常",
    "insert": "element()"
  },
  {
    "key": "drainTo",
    "group": "队列",
    "detail": "批量导出并清空队列",
    "insert": "drainTo(list)"
  },
  {
    "key": "push",
    "group": "栈",
    "detail": "压栈，Deque 头当栈顶",
    "insert": "push(x)"
  },
  {
    "key": "pop",
    "group": "栈",
    "detail": "弹栈，空则抛异常",
    "insert": "pop()"
  },
  {
    "key": "empty",
    "group": "栈",
    "detail": "判断栈空，用 isEmpty()",
    "insert": "isEmpty()"
  },
  {
    "key": "stackOps",
    "group": "栈",
    "detail": "Deque 当栈，别用 Stack",
    "insert": "Deque<Integer> st = new ArrayDeque<>();",
    "statement": true
  },
  {
    "key": "stream",
    "group": "Stream",
    "detail": "集合转流，配合链式操作",
    "insert": "stream()"
  },
  {
    "key": "filter",
    "group": "Stream",
    "detail": "过滤保留为真的元素",
    "insert": "filter(x -> cond)"
  },
  {
    "key": "map",
    "group": "Stream",
    "detail": "一对一转换，注意装箱",
    "insert": "map(x -> f(x))"
  },
  {
    "key": "mapToInt",
    "group": "Stream",
    "detail": "转 IntStream，减少装箱",
    "insert": "mapToInt(x -> x)"
  },
  {
    "key": "mapToObj",
    "group": "Stream",
    "detail": "IntStream 转对象流",
    "insert": "mapToObj(x -> ...)"
  },
  {
    "key": "flatMap",
    "group": "Stream",
    "detail": "展平嵌套流，不是一对多",
    "insert": "flatMap(x -> ...)"
  },
  {
    "key": "collect",
    "group": "Stream",
    "detail": "收集为 List，注意可变性",
    "insert": "collect(Collectors.toList())"
  },
  {
    "key": "toList",
    "group": "Stream",
    "detail": "转不可变列表，Java 16+",
    "insert": "toList()"
  },
  {
    "key": "sorted",
    "group": "Stream",
    "detail": "自然序排序，返回新流",
    "insert": "sorted()"
  },
  {
    "key": "streamSorted",
    "group": "Stream",
    "detail": "按 key 排序，稳定排序",
    "insert": "sorted(Comparator.comparingInt(x -> x))"
  },
  {
    "key": "distinct",
    "group": "Stream",
    "detail": "按 equals 去重，保持顺序",
    "insert": "distinct()"
  },
  {
    "key": "limit",
    "group": "Stream",
    "detail": "截取前 n 个，n 不能负",
    "insert": "limit(n)"
  },
  {
    "key": "skip",
    "group": "Stream",
    "detail": "跳过前 n 个，n 不能负",
    "insert": "skip(n)"
  },
  {
    "key": "count",
    "group": "Stream",
    "detail": "统计元素数，返回 long",
    "insert": "count()"
  },
  {
    "key": "sum",
    "group": "Stream",
    "detail": "IntStream 求和，注意溢出",
    "insert": "sum()"
  },
  {
    "key": "anyMatch",
    "group": "Stream",
    "detail": "任一满足即真，短路返回",
    "insert": "anyMatch(x -> cond)"
  },
  {
    "key": "allMatch",
    "group": "Stream",
    "detail": "全部满足才真，空流为真",
    "insert": "allMatch(x -> cond)"
  },
  {
    "key": "noneMatch",
    "group": "Stream",
    "detail": "全不满足才真，空流为真",
    "insert": "noneMatch(x -> cond)"
  },
  {
    "key": "findFirst",
    "group": "Stream",
    "detail": "返回 Optional，空流为空",
    "insert": "findFirst()"
  },
  {
    "key": "reduce",
    "group": "Stream",
    "detail": "归约，注意初值与溢出",
    "insert": "reduce(0, (a, b) -> a + b)"
  },
  {
    "key": "forEach",
    "group": "Stream",
    "detail": "遍历消费，别改集合结构",
    "insert": "forEach(x -> ...)"
  },
  {
    "key": "range",
    "group": "Stream",
    "detail": "左闭右开，右界不含",
    "insert": "IntStream.range(0, n)"
  },
  {
    "key": "rangeClosed",
    "group": "Stream",
    "detail": "闭区间，包含右端点",
    "insert": "IntStream.rangeClosed(1, n)"
  },
  {
    "key": "joining",
    "group": "Stream",
    "detail": "连接字符串，可加前后缀",
    "insert": "Collectors.joining(\",\")"
  },
  {
    "key": "groupingBy",
    "group": "Stream",
    "detail": "分组，返回 Map",
    "insert": "Collectors.groupingBy(x -> key)"
  },
  {
    "key": "toMap",
    "group": "Stream",
    "detail": "转 Map，键冲突需合并",
    "insert": "Collectors.toMap(k, v)"
  },
  {
    "key": "comparingInt",
    "group": "比较器",
    "detail": "按 int 键升序，防溢出",
    "insert": "Comparator.comparingInt(x -> x)"
  },
  {
    "key": "comparingLong",
    "group": "比较器",
    "detail": "按 long 键升序",
    "insert": "Comparator.comparingLong(x -> x)"
  },
  {
    "key": "comparing",
    "group": "比较器",
    "detail": "按对象键，需 Comparable",
    "insert": "Comparator.comparing(x -> key)"
  },
  {
    "key": "reversed",
    "group": "比较器",
    "detail": "反转比较器，别改原序",
    "insert": "reversed()"
  },
  {
    "key": "thenComparing",
    "group": "比较器",
    "detail": "次级排序，前键相等才用",
    "insert": "thenComparing(...)"
  },
  {
    "key": "thenComparingInt",
    "group": "比较器",
    "detail": "次级按 int 键，链式调用",
    "insert": "thenComparingInt(x -> x)"
  },
  {
    "key": "naturalOrder",
    "group": "比较器",
    "detail": "自然升序，元素需可比较",
    "insert": "Comparator.naturalOrder()"
  },
  {
    "key": "reverseOrder",
    "group": "比较器",
    "detail": "自然降序，对象数组可用",
    "insert": "Comparator.reverseOrder()"
  },
  {
    "key": "nullsFirst",
    "group": "比较器",
    "detail": "null 排最前，防 NPE",
    "insert": "Comparator.nullsFirst(comp)"
  },
  {
    "key": "nullsLast",
    "group": "比较器",
    "detail": "null 排最后，防 NPE",
    "insert": "Comparator.nullsLast(comp)"
  },
  {
    "key": "comparatorChain",
    "group": "比较器",
    "detail": "链式排序，注意先主后次",
    "insert": "list.sort(Comparator.comparingInt(x -> x).reversed());",
    "statement": true
  },
  {
    "key": "pairComparator",
    "group": "比较器",
    "detail": "二维数组按首列排序",
    "insert": "Arrays.sort(pairs, Comparator.comparingInt(a -> a[0]));",
    "statement": true
  },
  {
    "key": "bitCount",
    "group": "位运算",
    "detail": "统计二进制 1 的个数",
    "insert": "Integer.bitCount(n)"
  },
  {
    "key": "lowbit",
    "group": "位运算",
    "detail": "取最低位 1，树状数组常用",
    "insert": "n & -n"
  },
  {
    "key": "isPowerOfTwo",
    "group": "位运算",
    "detail": "判断 2 的幂，需 n > 0",
    "insert": "(n & (n - 1)) == 0"
  },
  {
    "key": "xorSwap",
    "group": "位运算",
    "detail": "异或交换，同地址会清零",
    "insert": "a ^= b; b ^= a; a ^= b;",
    "statement": true
  },
  {
    "key": "leftShift",
    "group": "位运算",
    "detail": "左移一位，相当于乘 2",
    "insert": "<< 1"
  },
  {
    "key": "rightShift",
    "group": "位运算",
    "detail": "算术右移，负数补 1",
    "insert": ">> 1"
  },
  {
    "key": "unsignedRightShift",
    "group": "位运算",
    "detail": "无符号右移，高位补 0",
    "insert": ">>> 1"
  },
  {
    "key": "setBit",
    "group": "位运算",
    "detail": "把第 k 位置 1",
    "insert": "n | (1 << k)"
  },
  {
    "key": "clearBit",
    "group": "位运算",
    "detail": "把第 k 位清 0",
    "insert": "n & ~(1 << k)"
  },
  {
    "key": "toggleBit",
    "group": "位运算",
    "detail": "翻转第 k 位",
    "insert": "n ^ (1 << k)"
  },
  {
    "key": "checkBit",
    "group": "位运算",
    "detail": "判断第 k 位是否为 1",
    "insert": "((n >> k) & 1) == 1"
  },
  {
    "key": "subsetEnum",
    "group": "位运算",
    "detail": "枚举子集，别漏空集",
    "insert": "for (int s = mask; s > 0; s = (s - 1) & mask) {\n    // 处理子集 s\n}",
    "statement": true
  },
  {
    "key": "highestOneBit",
    "group": "位运算",
    "detail": "最高位 1 对应的值",
    "insert": "Integer.highestOneBit(n)"
  },
  {
    "key": "lowestOneBit",
    "group": "位运算",
    "detail": "最低位 1 对应的值",
    "insert": "Integer.lowestOneBit(n)"
  },
  {
    "key": "numberOfTrailingZeros",
    "group": "位运算",
    "detail": "末尾零个数，可求 lowbit 指数",
    "insert": "Integer.numberOfTrailingZeros(n)"
  },
  {
    "key": "bfsGrid",
    "group": "模板",
    "detail": "网格 BFS 四方向，起点先标记",
    "insert": "int m = grid.length, n = grid[0].length;\nboolean[][] vis = new boolean[m][n];\nDeque<int[]> q = new ArrayDeque<>();\nq.offer(new int[]{0, 0});\nvis[0][0] = true;\nint[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\nwhile (!q.isEmpty()) {\n    int[] cur = q.poll();\n    for (int[] d : dirs) {\n        int x = cur[0] + d[0], y = cur[1] + d[1];\n        if (x < 0 || x >= m || y < 0 || y >= n || vis[x][y]) continue;\n        vis[x][y] = true;\n        q.offer(new int[]{x, y});\n    }\n}",
    "statement": true
  },
  {
    "key": "dfsGrid",
    "group": "模板",
    "detail": "网格 DFS 迭代写法，防爆栈",
    "insert": "Deque<int[]> st = new ArrayDeque<>();\nst.push(new int[]{0, 0});\nboolean[][] vis = new boolean[m][n];\nvis[0][0] = true;\nint[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\nwhile (!st.isEmpty()) {\n    int[] cur = st.pop();\n    for (int[] d : dirs) {\n        int x = cur[0] + d[0], y = cur[1] + d[1];\n        if (x < 0 || x >= m || y < 0 || y >= n || vis[x][y]) continue;\n        vis[x][y] = true;\n        st.push(new int[]{x, y});\n    }\n}",
    "statement": true
  },
  {
    "key": "binarySearchTemplate",
    "group": "模板",
    "detail": "闭区间二分，mid 防溢出",
    "insert": "int lo = 0, hi = n - 1;\nwhile (lo <= hi) {\n    int mid = lo + (hi - lo) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n}\nreturn -1;",
    "statement": true
  },
  {
    "key": "slidingWindowTemplate",
    "group": "模板",
    "detail": "滑动窗口骨架，先扩后缩",
    "insert": "int left = 0, ans = 0;\nfor (int right = 0; right < n; right++) {\n    // 加入 nums[right]\n    while (left <= right && /* 窗口不合法 */ false) {\n        // 移除 nums[left]\n        left++;\n    }\n    ans = Math.max(ans, right - left + 1);\n}",
    "statement": true
  },
  {
    "key": "prefixSumTemplate",
    "group": "模板",
    "detail": "前缀和数组，区间和 O(1)",
    "insert": "int[] pre = new int[n + 1];\nfor (int i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];\n// [l, r] 的和：pre[r + 1] - pre[l]",
    "statement": true
  },
  {
    "key": "backtrackTemplate",
    "group": "模板",
    "detail": "子集回溯骨架，记得撤销选择",
    "insert": "void dfs(int start, List<Integer> path) {\n    res.add(new ArrayList<>(path));\n    for (int i = start; i < n; i++) {\n        path.add(nums[i]);\n        dfs(i + 1, path);\n        path.remove(path.size() - 1);\n    }\n}",
    "statement": true
  },
  {
    "key": "dp1dTemplate",
    "group": "模板",
    "detail": "线性 DP 骨架，注意初值",
    "insert": "int[] dp = new int[n + 1];\nArrays.fill(dp, Integer.MAX_VALUE);\ndp[0] = 0;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 0; j < i; j++) {\n        dp[i] = Math.min(dp[i], dp[j] + cost(i, j));\n    }\n}\nreturn dp[n];",
    "statement": true
  },
  {
    "key": "dp2dTemplate",
    "group": "模板",
    "detail": "二维 DP，注意边界与下标",
    "insert": "int[][] dp = new int[m + 1][n + 1];\nfor (int i = 1; i <= m; i++) {\n    for (int j = 1; j <= n; j++) {\n        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + grid[i - 1][j - 1];\n    }\n}\nreturn dp[m][n];",
    "statement": true
  },
  {
    "key": "unionFind",
    "group": "模板",
    "detail": "并查集，路径压缩写法",
    "insert": "int[] parent = new int[n];\nfor (int i = 0; i < n; i++) parent[i] = i;\nint find(int x) {\n    return parent[x] == x ? x : (parent[x] = find(parent[x]));\n}\nvoid union(int a, int b) {\n    parent[find(a)] = find(b);\n}",
    "statement": true
  },
  {
    "key": "trie",
    "group": "模板",
    "detail": "字典树，26 叉数组实现",
    "insert": "class Trie {\n    Trie[] next = new Trie[26];\n    boolean end;\n    void insert(String s) {\n        Trie node = this;\n        for (char c : s.toCharArray()) {\n            int i = c - 'a';\n            if (node.next[i] == null) node.next[i] = new Trie();\n            node = node.next[i];\n        }\n        node.end = true;\n    }\n}",
    "statement": true
  },
  {
    "key": "dijkstra",
    "group": "模板",
    "detail": "堆优化最短路，long 防溢出",
    "insert": "long[] dist = new long[n];\nArrays.fill(dist, Long.MAX_VALUE);\ndist[src] = 0;\nPriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));\npq.offer(new long[]{0, src});\nwhile (!pq.isEmpty()) {\n    long[] cur = pq.poll();\n    if (cur[0] > dist[(int) cur[1]]) continue;\n    for (int[] e : graph[(int) cur[1]]) {\n        long nd = cur[0] + e[1];\n        if (nd < dist[e[0]]) {\n            dist[e[0]] = nd;\n            pq.offer(new long[]{nd, e[0]});\n        }\n    }\n}",
    "statement": true
  },
  {
    "key": "topoSort",
    "group": "模板",
    "detail": "拓扑排序，判环看计数",
    "insert": "int[] indeg = new int[n];\nfor (int[] e : edges) indeg[e[1]]++;\nDeque<Integer> q = new ArrayDeque<>();\nfor (int i = 0; i < n; i++) if (indeg[i] == 0) q.offer(i);\nint cnt = 0;\nwhile (!q.isEmpty()) {\n    int u = q.poll();\n    cnt++;\n    for (int v : graph[u]) if (--indeg[v] == 0) q.offer(v);\n}\nreturn cnt == n;",
    "statement": true
  },
  {
    "key": "kmp",
    "group": "模板",
    "detail": "KMP 前缀表与匹配骨架",
    "insert": "int[] next = new int[m];\nfor (int i = 1, j = 0; i < m; i++) {\n    while (j > 0 && p[i] != p[j]) j = next[j - 1];\n    if (p[i] == p[j]) j++;\n    next[i] = j;\n}\nfor (int i = 0, j = 0; i < n; i++) {\n    while (j > 0 && s[i] != p[j]) j = next[j - 1];\n    if (s[i] == p[j]) j++;\n    if (j == m) {\n        // 匹配位置 i - m + 1\n        j = next[j - 1];\n    }\n}",
    "statement": true
  },
  {
    "key": "fastPower",
    "group": "模板",
    "detail": "快速幂，乘法防溢出",
    "insert": "long pow(long a, long b, long mod) {\n    long res = 1;\n    a %= mod;\n    while (b > 0) {\n        if ((b & 1) == 1) res = res * a % mod;\n        a = a * a % mod;\n        b >>= 1;\n    }\n    return res;\n}",
    "statement": true
  },
  {
    "key": "List",
    "group": "类型",
    "detail": "List 泛型声明",
    "insert": "List<Integer>"
  },
  {
    "key": "ArrayList",
    "group": "类型",
    "detail": "可变数组列表",
    "insert": "new ArrayList<>()"
  },
  {
    "key": "LinkedList",
    "group": "类型",
    "detail": "链表实现",
    "insert": "new LinkedList<>()"
  },
  {
    "key": "HashMap",
    "group": "类型",
    "detail": "哈希表",
    "insert": "new HashMap<>()"
  },
  {
    "key": "TreeMap",
    "group": "类型",
    "detail": "有序映射",
    "insert": "new TreeMap<>()"
  },
  {
    "key": "HashSet",
    "group": "类型",
    "detail": "哈希集合",
    "insert": "new HashSet<>()"
  },
  {
    "key": "TreeSet",
    "group": "类型",
    "detail": "有序集合",
    "insert": "new TreeSet<>()"
  },
  {
    "key": "Deque",
    "group": "类型",
    "detail": "Deque 泛型声明",
    "insert": "Deque<Integer>"
  },
  {
    "key": "Integer",
    "group": "类型",
    "detail": "int 装箱类型",
    "insert": "Integer"
  },
  {
    "key": "Long",
    "group": "类型",
    "detail": "long 装箱类型",
    "insert": "Long"
  },
  {
    "key": "Character",
    "group": "类型",
    "detail": "char 装箱类型",
    "insert": "Character"
  },
  {
    "key": "Boolean",
    "group": "类型",
    "detail": "布尔装箱类型",
    "insert": "Boolean"
  },
  {
    "key": "Double",
    "group": "类型",
    "detail": "双精度装箱类型",
    "insert": "Double"
  },
  {
    "key": "String",
    "group": "类型",
    "detail": "字符串类型",
    "insert": "String"
  },
  {
    "key": "intArray",
    "group": "类型",
    "detail": "定长一维数组",
    "insert": "new int[n]"
  },
  {
    "key": "longArray",
    "group": "类型",
    "detail": "long 数组",
    "insert": "new long[n]"
  },
  {
    "key": "int2D",
    "group": "类型",
    "detail": "二维数组",
    "insert": "new int[m][n]"
  },
  {
    "key": "charArray",
    "group": "类型",
    "detail": "字符数组",
    "insert": "new char[n]"
  },
  {
    "key": "pairArray",
    "group": "类型",
    "detail": "二元组数组",
    "insert": "new int[][]{{a, b}}"
  },
  {
    "key": "ListNode",
    "group": "类型",
    "detail": "链表节点（LeetCode 预定义）",
    "insert": "ListNode node = head;"
  },
  {
    "key": "TreeNode",
    "group": "类型",
    "detail": "树节点（LeetCode 预定义）",
    "insert": "TreeNode node = root;"
  },
  {
    "key": "Comparator",
    "group": "类型",
    "detail": "比较器类型",
    "insert": "Comparator<Integer>"
  },
  {
    "key": "BigInteger",
    "group": "类型",
    "detail": "大整数",
    "insert": "BigInteger.ZERO"
  },
  {
    "key": "ArraysType",
    "group": "类型",
    "detail": "数组工具类",
    "insert": "Arrays."
  }
];

    // ---------------------------------------------------------------------
    // Copy: every visible string goes through the slot's locale seat.
    // ---------------------------------------------------------------------

    const zh = {
      'panel.label': '刷题台B',
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

    function traceProbe(event) {
      try {
        fetch('/api/dsh-leetcode-bench/trace', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(event),
        }).catch(() => {});
      } catch (error) {
        /* diagnostics must never break the page */
      }
    }

    function apply(ctx) {
      const t = ctx.locale.bind(NS);
      try {
        fetch('/api/dsh-leetcode-bench/trace', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ event: 'client-apply', panel: PANEL_ID, href: typeof location === 'undefined' ? '' : location.href }),
        }).catch(() => {});
      } catch (error) {
        /* a missing trace route must not stop the page */
      }

      ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'algo-bench: dictionaries');
      let labelProbe = '';
      try {
        labelProbe = String(t('panel.label'));
      } catch (error) {
        labelProbe = `threw: ${String(error)}`;
      }
      traceProbe({ event: 'slots', hasSlots: typeof ctx.slots, label: labelProbe });
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
        traceProbe({ event: 'panellist-ok', id: PANEL_ID });
        return dispose;
      }, 'algo-bench: sidebar entry');
    }

    return { inject, apply };
  },
});
