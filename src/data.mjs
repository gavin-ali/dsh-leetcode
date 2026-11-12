/**
 * The Java completion dictionary. Nothing here is problem-specific: it is a local
 * list of common APIs, type declarations and algorithm skeletons. The problem
 * bank itself is fetched from leetcode.cn at runtime.
 */

export const COMPLETIONS = [
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
