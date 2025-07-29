const problems = [
  {
    "title": "Diameter of Binary Tree",
    "description": "Given the root of a binary tree, return the length of the diameter of the tree. The diameter is defined as the number of edges on the longest path between any two nodes in the tree.",
    "difficulty": "HARD",
    "tags": [
      "Binary Tree",
      "DFS ",
      "Recursion"
    ],
    "examples": {
      "JAVA": {
        "input": "1 2 3 4 5 null null",
        "output": "3",
        "explanation": "Longest path is 4 -> 2 -> 1 -> 3 or 5 -> 2 -> 1 -> 3."
      },
      "PYTHON": {
        "input": "1 2 null 3 null 4 null 5",
        "output": "4",
        "explanation": "The path 5 -> 4 -> 3 -> 2 -> 1 has 4 edges."
      },
      "JAVASCRIPT": {
        "input": "1 2 3",
        "output": "2",
        "explanation": "The longest path is 2 -> 1 -> 3."
      }
    },
    "constraints": "The number of nodes in the tree is in the range [1, 10^4].\n-100 <= Node.val <= 100",
    "hints": "Think about the depth of each node. The diameter of a node is the sum of the heights of its left and right subtrees. Use postorder traversal to calculate heights and diameter simultaneously.",
    "editorial": "",
    "testcases": [
      {
        "input": "1 2 3 4 5 null null",
        "output": "3"
      },
      {
        "input": "1 2 null 3 null 4 null 5",
        "output": "4"
      },
      {
        "input": "1 2 3",
        "output": "2"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.*;\n\nclass Solution {\n    static class TreeNode {\n        int val;\n        TreeNode left, right;\n        TreeNode(int x) { val = x; }\n    }\n\n    static int maxDiameter = 0;\n\n    public static int diameterOfBinaryTree(TreeNode root) {\n        maxDiameter = 0;\n        depth(root);\n        return maxDiameter;\n    }\n\n    private static int depth(TreeNode node) {\n        if (node == null) return 0;\n        int left = depth(node.left);\n        int right = depth(node.right);\n        maxDiameter = Math.max(maxDiameter, left + right);\n        return Math.max(left, right) + 1;\n    }\n\n    public static TreeNode buildTree(String[] nodes) {\n        if (nodes.length == 0 || nodes[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(nodes[0]));\n        java.util.Queue<TreeNode> queue = new java.util.LinkedList<>();\n        queue.offer(root);\n        int i = 1;\n        while (!queue.isEmpty() && i < nodes.length) {\n            TreeNode curr = queue.poll();\n            if (!nodes[i].equals(\"null\")) {\n                curr.left = new TreeNode(Integer.parseInt(nodes[i]));\n                queue.offer(curr.left);\n            }\n            i++;\n            if (i < nodes.length && !nodes[i].equals(\"null\")) {\n                curr.right = new TreeNode(Integer.parseInt(nodes[i]));\n                queue.offer(curr.right);\n            }\n            i++;\n        }\n        return root;\n    }\n}\n\npublic class Main {\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] input = sc.nextLine().trim().split(\" \");\n        Solution.TreeNode root = Solution.buildTree(input);  // FIXED HERE\n        System.out.println(Solution.diameterOfBinaryTree(root));\n    }\n}\n",
      "PYTHON": "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef diameterOfBinaryTree(root):\n    max_diameter = [0]\n    def depth(node):\n        if not node: return 0\n        left = depth(node.left)\n        right = depth(node.right)\n        max_diameter[0] = max(max_diameter[0], left + right)\n        return max(left, right) + 1\n    depth(root)\n    return max_diameter[0]\n\ndef build_tree(values):\n    if not values or values[0] == 'null': return None\n    root = TreeNode(int(values[0]))\n    queue = [root]\n    i = 1\n    while i < len(values):\n        node = queue.pop(0)\n        if values[i] != 'null':\n            node.left = TreeNode(int(values[i]))\n            queue.append(node.left)\n        i += 1\n        if i < len(values) and values[i] != 'null':\n            node.right = TreeNode(int(values[i]))\n            queue.append(node.right)\n        i += 1\n    return root\n\n\nif __name__ == '__main__':\n    import sys\n    values = sys.stdin.read().strip().split()\n    root = build_tree(values)\n    print(diameterOfBinaryTree(root))",
      "JAVASCRIPT": "class TreeNode {\n    constructor(val = 0, left = null, right = null) {\n        this.val = val;\n        this.left = left;\n        this.right = right;\n    }\n}\n\nfunction diameterOfBinaryTree(root) {\n    let max = 0;\n    function depth(node) {\n        if (!node) return 0;\n        const left = depth(node.left);\n        const right = depth(node.right);\n        max = Math.max(max, left + right);\n        return Math.max(left, right) + 1;\n    }\n    depth(root);\n    return max;\n}\n\nfunction buildTree(values) {\n    if (!values.length || values[0] === 'null') return null;\n    const root = new TreeNode(parseInt(values[0]));\n    const queue = [root];\n    let i = 1;\n    while (i < values.length) {\n        const node = queue.shift();\n        if (values[i] !== 'null') {\n            node.left = new TreeNode(parseInt(values[i]));\n            queue.push(node.left);\n        }\n        i++;\n        if (i < values.length && values[i] !== 'null') {\n            node.right = new TreeNode(parseInt(values[i]));\n            queue.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\n\n\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nlet input = [];\nrl.on('line', line => input.push(...line.trim().split(' ')));\nrl.on('close', () => {\n    const root = buildTree(input);\n    console.log(diameterOfBinaryTree(root));\n});"
    },
    "codeSnippets": {
      "JAVA": "import java.util.*;\n\nclass Solution {\n    static class TreeNode {\n        int val;\n        TreeNode left, right;\n        TreeNode(int x) { val = x; }\n    }\n    public static void main(String[] args) {\n        // Build tree from input and call diameterOfBinaryTree(root)\n    }\n    \n    public static int diameterOfBinaryTree(TreeNode root) {\n        // Implement\n        return 0;\n    }\n}\n\npublic class Main {\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] input = sc.nextLine().trim().split(\" \");\n        Solution.TreeNode root = Solution.buildTree(input);  // FIXED HERE\n        System.out.println(Solution.diameterOfBinaryTree(root));\n    }\n}\n",
      "PYTHON": "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef diameterOfBinaryTree(root):\n    # Implement here\n    return 0\n\n\nif __name__ == '__main__':\n    import sys\n    values = sys.stdin.read().strip().split()\n    root = build_tree(values)\n    print(diameterOfBinaryTree(root))",
      "JAVASCRIPT": "class TreeNode {\n    constructor(val = 0, left = null, right = null) {\n        this.val = val;\n        this.left = left;\n        this.right = right;\n    }\n}\n\nfunction diameterOfBinaryTree(root) {\n    // Implement here\n    return 0;\n}\n\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nlet input = [];\nrl.on('line', line => input.push(...line.trim().split(' ')));\nrl.on('close', () => {\n    const root = buildTree(input);\n    console.log(diameterOfBinaryTree(root));\n});"
    }
  },
  {
    "title": "Find the Missing Number",
    "description": "Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.",
    "difficulty": "EASY",
    "tags": [
      "math",
      "array",
      "missing value"
    ],
    "examples": {
      "JAVA": {
        "input": "[0,1]",
        "output": "2",
        "explanation": "Sum from 0 to 2 is 3. Array sum is 1. So missing number is 2."
      },
      "PYTHON": {
        "input": "[3,0,1]",
        "output": "2",
        "explanation": "Sum from 0 to 3 is 6. Array sum is 4. So missing number is 2."
      },
      "JAVASCRIPT": {
        "input": "[0,1]",
        "output": "2",
        "explanation": "Sum from 0 to 2 is 3. Array sum is 1. So missing number is 2."
      }
    },
    "constraints": "1 ≤ nums.length ≤ 10^4\n0 ≤ nums[i] ≤ 10^4\nAll numbers are distinct and exactly one number is missing.",
    "hints": "Use mathematical sum formula Sum from 0 to n is n*(n+1)/2",
    "editorial": "The total sum from 0 to n is n*(n+1)/2. Subtracting the sum of the array gives the missing number.",
    "testcases": [
      {
        "input": "[3,0,1]",
        "output": "2"
      },
      {
        "input": "[0,1]",
        "output": "2"
      },
      {
        "input": "[9,6,4,2,3,5,7,0,1]",
        "output": "8"
      },
      {
        "input": "[0]",
        "output": "1"
      },
      {
        "input": "[1]",
        "output": "0"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.*;\n\nclass Solution {\n    public static int missingNumber(int[] nums) {\n        int n = nums.length;\n        int total = n * (n + 1) / 2;\n        int sum = 0;\n        for (int num : nums) {\n            sum += num;\n        }\n        return total - sum;\n    }\n}\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String line = sc.nextLine().trim();\n        line = line.replaceAll(\"\\\\[|\\\\]\", \"\").trim();\n\n        if (line.isEmpty()) {\n            System.out.println(0);\n            return;\n        }\n\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) {\n            nums[i] = Integer.parseInt(parts[i].trim());\n        }\n\n        System.out.println(Solution.missingNumber(nums));\n    }\n}\n",
      "PYTHON": "def missing_number(nums):\n    n = len(nums)\n    expected = n * (n + 1) // 2\n    return expected - sum(nums)\n\n\nimport sys, json\n\nnums = json.loads(sys.stdin.read().strip())\nprint(missing_number(nums))",
      "JAVASCRIPT": "function missingNumber(nums) {\n  const n = nums.length;\n  const expected = (n * (n + 1)) / 2;\n  const actual = nums.reduce((a, b) => a + b, 0);\n  return expected - actual;\n}\n\n\nconst fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst nums = JSON.parse(input);\nconsole.log(missingNumber(nums));"
    },
    "codeSnippets": {
      "JAVA": "import java.util.*;\n\nclass Solution {\n    public static int missingNumber(int[] nums) {\n        int n = nums.length;\n        int total = n * (n + 1) / 2;\n        int sum = 0;\n        for (int num : nums) {\n            sum += num;\n        }\n        return total - sum;\n    }\n}\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String line = sc.nextLine().trim();\n        line = line.replaceAll(\"\\\\[|\\\\]\", \"\").trim();\n\n        if (line.isEmpty()) {\n            System.out.println(0);\n            return;\n        }\n\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) {\n            nums[i] = Integer.parseInt(parts[i].trim());\n        }\n\n        System.out.println(Solution.missingNumber(nums));\n    }\n}\n",
      "PYTHON": "def missing_number(nums):\n    n = len(nums)\n    expected = n * (n + 1) // 2\n    return expected - sum(nums)\n\n\nimport sys, json\n\nnums = json.loads(sys.stdin.read().strip())\nprint(missing_number(nums))",
      "JAVASCRIPT": "function missingNumber(nums) {\n  const n = nums.length;\n  const expected = (n * (n + 1)) / 2;\n  const actual = nums.reduce((a, b) => a + b, 0);\n  return expected - actual;\n}\n\n\nconst fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst nums = JSON.parse(input);\nconsole.log(missingNumber(nums));"
    }
  },
  {
    "title": "Valid Palindrome",
    "description": "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
    "difficulty": "EASY",
    "tags": [
      "String",
      "Two Pointers"
    ],
    "examples": {
      "JAVA": {
        "input": " ",
        "output": "true"
      },
      "PYTHON": {
        "input": "race a car",
        "output": "false"
      },
      "JAVASCRIPT": {
        "input": "A man, a plan, a canal: Panama",
        "output": "true",
        "explanation": "\"amanaplanacanalpanama\" is a palindrome."
      }
    },
    "constraints": "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
    "hints": "Consider only alphanumeric characters.",
    "editorial": "Use two pointers, one at the beginning and one at the end of the string. Move the pointers towards each other, skipping non-alphanumeric characters. Compare the characters at the pointers, ignoring case. If they are not equal, the string is not a palindrome.",
    "testcases": [
      {
        "input": "A man, a plan, a canal: Panama",
        "output": "true"
      },
      {
        "input": "race a car",
        "output": "false"
      },
      {
        "input": " ",
        "output": "true"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    public boolean isPalindrome(String s) {\n        s = s.toLowerCase().replaceAll(\"[^a-zA-Z0-9]\", \"\");\n        int left = 0;\n        int right = s.length() - 1;\n\n        while (left < right) {\n            if (s.charAt(left) != s.charAt(right)) {\n                return false;\n            }\n            left++;\n            right--;\n        }\n\n        return true;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String s = scanner.nextLine();\n        Solution solution = new Solution();\n        System.out.println(solution.isPalindrome(s));\n    }\n}",
      "PYTHON": "class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        s = ''.join(ch for ch in s if ch.isalnum()).lower()\n        l, r = 0, len(s) - 1\n        while l < r:\n            if s[l] != s[r]:\n                return False\n            l += 1\n            r -= 1\n        return True\n\nimport sys\n\ndef main():\n    s = sys.stdin.readline().strip()\n    result = Solution().isPalindrome(s)\n    print(result)\n\nif __name__ == \"__main__\":\n    main()",
      "JAVASCRIPT": "/**\n * @param {string} s\n * @return {boolean}\n */\nvar isPalindrome = function(s) {\n    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n    let left = 0;\n    let right = s.length - 1;\n    while (left < right) {\n        if (s[left] !== s[right]) {\n            return false;\n        }\n        left++;\n        right--;\n    }\n    return true;\n};\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nrl.on('line', (input) => {\n  console.log(isPalindrome(input));\n  rl.close();\n});"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    public boolean isPalindrome(String s) {\n        s = s.toLowerCase().replaceAll(\"[^a-zA-Z0-9]\", \"\");\n        int left = 0;\n        int right = s.length() - 1;\n\n        while (left < right) {\n            if (s.charAt(left) != s.charAt(right)) {\n                return false;\n            }\n            left++;\n            right--;\n        }\n\n        return true;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String s = scanner.nextLine();\n        Solution solution = new Solution();\n        System.out.println(solution.isPalindrome(s));\n    }\n}",
      "PYTHON": "class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        s = ''.join(ch for ch in s if ch.isalnum()).lower()\n        l, r = 0, len(s) - 1\n        while l < r:\n            if s[l] != s[r]:\n                return False\n            l += 1\n            r -= 1\n        return True\n\nimport sys\n\ndef main():\n    s = sys.stdin.readline().strip()\n    result = Solution().isPalindrome(s)\n    print(result)\n\nif __name__ == \"__main__\":\n    main()",
      "JAVASCRIPT": "/**\n * @param {string} s\n * @return {boolean}\n */\nvar isPalindrome = function(s) {\n    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n    let left = 0;\n    let right = s.length - 1;\n    while (left < right) {\n        if (s[left] !== s[right]) {\n            return false;\n        }\n        left++;\n        right--;\n    }\n    return true;\n};\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nrl.on('line', (input) => {\n  console.log(isPalindrome(input));\n  rl.close();\n});"
    }
  },
  {
    "title": "Power of a Number",
    "description": "Given two integers x and n, calculate x^n (x raised to the power n) using recursion.\nYou must not use any built-in power function.",
    "difficulty": "EASY",
    "tags": [
      "recursion",
      "power number"
    ],
    "examples": {
      "JAVA": {
        "input": "3 4",
        "output": "81",
        "explanation": "3^4 = 3 * 3 * 3 * 3 = 81"
      },
      "PYTHON": {
        "input": "5 0",
        "output": "1",
        "explanation": "Any number raised to power 0 is 1."
      },
      "JAVASCRIPT": {
        "input": "2 3",
        "output": "8",
        "explanation": "2^3 = 2 * 2 * 2 = 8"
      }
    },
    "constraints": "1 <= x <= 10\n0 <= n <= 9",
    "hints": "No hint for this question",
    "editorial": "",
    "testcases": [
      {
        "input": "2 3",
        "output": "8"
      },
      {
        "input": "5 0",
        "output": "1"
      },
      {
        "input": "3 4",
        "output": "81"
      }
    ],
    "referenceSolutions": {
      "JAVA": "// Add your reference solution here\r\nimport java.util.Scanner;\r\n\r\nclass Solution {\r\n    public static int power(int x, int n) {\r\n        if (n == 0) return 1;\r\n        return x * power(x, n - 1);\r\n    }\r\n}\r\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int x = sc.nextInt();\n        int n = sc.nextInt();\n        System.out.println(Solution.power(x, n));\n    }\n}",
      "PYTHON": "# Add your reference solution here\r\nclass Solution:\r\n    def power(self, x: int, n: int) -> int:\r\n        if n == 0:\r\n            return 1\r\n        return x * self.power(x, n - 1)\r\n\r\n\r\n\n\nif __name__ == \"__main__\":\n    import sys\n    x, n = map(int, sys.stdin.readline().split())\n    sol = Solution()\n    print(sol.power(x, n))",
      "JAVASCRIPT": "// Add your reference solution here\nfunction power(x, n) {\n  if (n === 0) return 1;\n  return x * power(x, n - 1);\n}\n\n\n\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nlet input = [];\n\nrl.on('line', line => input.push(...line.trim().split(' ').map(Number)));\nrl.on('close', () => {\n  const [x, n] = input;\n  const result = power(x, n);\n  console.log(result);\n});"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Scanner;\n\npublic class Solution {\n    public static int power(int x, int n) {\n        // TODO: Write a recursive function to compute x raised to the power n\n        return 0;\n    }\n}\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int x = sc.nextInt();\n        int n = sc.nextInt();\n        System.out.println(Solution.power(x, n));\n    }\n}",
      "PYTHON": "class Solution:\n    def power(self, x: int, n: int) -> int:\n        # Write your code here\n        pass\n\n\n\nif __name__ == \"__main__\":\n    import sys\n    x, n = map(int, sys.stdin.readline().split())\n    sol = Solution()\n    print(sol.power(x, n))",
      "JAVASCRIPT": "function power(x, n) {\n  // Write your code here\n}\n\n\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nlet input = [];\n\nrl.on('line', line => input.push(...line.trim().split(' ').map(Number)));\nrl.on('close', () => {\n  const [x, n] = input;\n  const result = power(x, n);\n  console.log(result);\n});"
    }
  },
  {
    "title": "Sum of Array Elements",
    "description": "Given an array of integers, return the sum of all elements in the array.",
    "difficulty": "MEDIUM",
    "tags": [
      "array",
      "iteration",
      "sum "
    ],
    "examples": {
      "JAVA": {
        "input": "3\n-1 0 1",
        "output": "0",
        "explanation": "The sum of [-1, 0, 1] is -1+0+1 = 0."
      },
      "PYTHON": {
        "input": "5\n1 2 3 4 5",
        "output": "15",
        "explanation": "The sum of [1, 2, 3, 4, 5] is 1+2+3+4+5 = 15."
      },
      "JAVASCRIPT": {
        "input": "3\n-1 0 1",
        "output": "0",
        "explanation": "The sum of [-1, 0, 1] is -1+0+1 = 0."
      }
    },
    "constraints": "1 ≤ n ≤ 10^5, -10^6 ≤ arr[i] ≤ 10^6",
    "hints": "Iterate through the array and add each element to a sum variable. Handle empty arrays by returning 0. Be careful with integer overflow for large sums",
    "editorial": "This is a straightforward problem that requires iterating through the array once and accumulating the sum. The time complexity is O(n) and space complexity is O(1).",
    "testcases": [
      {
        "input": "5\n1 2 3 4 5",
        "output": "15"
      },
      {
        "input": "3\n-1 0 1",
        "output": "0"
      },
      {
        "input": "1\n42",
        "output": "42"
      },
      {
        "input": "4\n-5 -10 -15 -20",
        "output": "-50"
      },
      {
        "input": "6\n100 200 300 400 500 600",
        "output": "2100"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    public static int sumArray(int[] arr) {\n        int sum = 0;\n        for (int i = 0; i < arr.length; i++) {\n            sum += arr[i];\n        }\n        return sum;\n    }\n}\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) {\n            arr[i] = sc.nextInt();\n        }\n        System.out.println(Solution.sumArray(arr));\n    }\n}",
      "PYTHON": "def sum_array(arr):\n    return sum(arr)\n\n\nimport sys\ninput_lines = sys.stdin.read().strip().split('\\n')\nn = int(input_lines[0])\narr = list(map(int, input_lines[1].split()))\nprint(sum_array(arr))",
      "JAVASCRIPT": "function sumArray(arr) {\n    let sum = 0;\n    for (let i = 0; i < arr.length; i++) {\n        sum += arr[i];\n    }\n    return sum;\n}\n\n\n\nconst fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst n = parseInt(input[0]);\nconst arr = input[1].split(' ').map(Number);\nconsole.log(sumArray(arr));"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    public static int sumArray(int[] arr) {\n        // TODO: Implement logic to return the sum of all elements in the array\n        return 0;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for (int i = 0; i < n; i++) {\n            arr[i] = sc.nextInt();\n        }\n        System.out.println(Solution.sumArray(arr));\n    }\n}",
      "PYTHON": "def sum_array(arr):\n    # Write your code here\n    return 0\n\n\nimport sys\ninput_lines = sys.stdin.read().strip().split('\\n')\nn = int(input_lines[0])\narr = list(map(int, input_lines[1].split()))\nprint(sum_array(arr))",
      "JAVASCRIPT": "function sumArray(arr) {\n    // Write your code here\n    return 0;\n}\n\n\nconst fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst n = parseInt(input[0]);\nconst arr = input[1].split(' ').map(Number);\nconsole.log(sumArray(arr));"
    }
  },
  {
    "title": "Reverse Linked List",
    "description": "Given the head of a singly linked list, reverse the list and return the reversed list.\n\nYou should print the reversed list by traversing from the new head node. Each node’s value should be separated by \" -> \" and end with a newline.",
    "difficulty": "MEDIUM",
    "tags": [
      "Linked List"
    ],
    "examples": {
      "JAVA": {
        "input": "1 2 3 4 5",
        "output": "5 -> 4 -> 3 -> 2 -> 1",
        "explanation": "The input list is 1 -> 2 -> 3 -> 4 -> 5. After reversing, the order of the nodes becomes 5 -> 4 -> 3 -> 2 -> 1."
      },
      "PYTHON": {
        "input": "1 2",
        "output": "2 -> 1",
        "explanation": "The original list is 1 -> 2. Reversing it results in 2 -> 1."
      },
      "JAVASCRIPT": {
        "input": "1 2 3 4 5",
        "output": "5 -> 4 -> 3 -> 2 -> 1",
        "explanation": "Starting from the head (1), each node is reversed. The final list points from 5 back to 1."
      }
    },
    "constraints": "The number of nodes in the list is in the range [0, 5000].\n-5000 <= Node.val <= 5000",
    "hints": "Use a while loop and maintain a prev pointer. Iteratively reverse the links between nodes.",
    "editorial": "The Reverse Linked List problem is a classic linked list task where we reverse the direction of all node links. To solve this iteratively, we maintain three pointers: prev, head, and nextNode. We traverse the list and at each step, redirect the current node’s next pointer to the previous node, effectively reversing the link. We update prev and head as we move through the list. Once traversal is complete, prev will point to the new head of the reversed list. This algorithm runs in O(n) time and O(1) space, making it both efficient and elegant.",
    "testcases": [
      {
        "input": "1 2",
        "output": "2 -> 1"
      },
      {
        "input": "1 2 3 4 5",
        "output": "5 -> 4 -> 3 -> 2 -> 1"
      }
    ],
    "referenceSolutions": {
      "JAVA": "// Add your reference solution here\r\nimport java.util.*;\r\nimport java.util.Scanner;\r\n\r\nclass ListNode {\r\n    int val;\r\n    ListNode next;\r\n    ListNode(int x) { val = x; }\r\n}\r\n\r\nclass Solution {\r\n\r\n     public static ListNode buildList(String[] arr) {\r\n        ListNode dummy = new ListNode(0);\r\n        ListNode curr = dummy;\r\n        for (String s : arr) {\r\n            curr.next = new ListNode(Integer.parseInt(s));\r\n            curr = curr.next;\r\n        }\r\n        return dummy.next;\r\n    }\r\n\r\n    public static void printList(ListNode head) {\r\n        List<String> result = new ArrayList<>();\r\n        while (head != null) {\r\n            result.add(String.valueOf(head.val));\r\n            head = head.next;\r\n        }\r\n        System.out.println(String.join(\" -> \", result));\r\n    }\r\n\r\n    public static ListNode reverseList(ListNode head) {\r\n        ListNode prev = null;\r\n        while (head != null) {\r\n            ListNode nextNode = head.next;\r\n            head.next = prev;\r\n            prev = head;\r\n            head = nextNode;\r\n        }\r\n        return prev;\r\n    }\r\n}\r\n\r\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String[] input = scanner.nextLine().trim().split(\"\\\\s+\");\n        ListNode head = Solution.buildList(input); // FIXED\n        ListNode newHead = Solution.reverseList(head);\n        Solution.printList(newHead); // FIXED\n    }\n}",
      "PYTHON": "# Add your reference solution here\r\nclass ListNode:\r\n    def __init__(self, val=0, next=None):\r\n        self.val = val\r\n        self.next = next\r\n\r\ndef build_list(arr):\r\n    dummy = ListNode(0)\r\n    current = dummy\r\n    for val in arr:\r\n        current.next = ListNode(int(val))\r\n        current = current.next\r\n    return dummy.next\r\n\r\ndef print_list(head):\r\n    result = []\r\n    while head:\r\n        result.append(str(head.val))\r\n        head = head.next\r\n    print(\" -> \".join(result))\r\n\r\ndef reverse_list(head):\r\n    prev = None\r\n    while head:\r\n        next_node = head.next\r\n        head.next = prev\r\n        prev = head\r\n        head = next_node\r\n    return prev\r\n\r\n\n\n# Judge0-compatible stdin\nif __name__ == \"__main__\":\n    import sys\n    input_vals = sys.stdin.read().strip().split()\n    head = build_list(input_vals)\n    new_head = reverse_list(head)\n    print_list(new_head)\n\n",
      "JAVASCRIPT": "// Add your reference solution here\nclass ListNode {\n  constructor(val, next = null) {\n    this.val = val;\n    this.next = next;\n  }\n}\n\nfunction buildList(arr) {\n  let dummy = new ListNode(0);\n  let current = dummy;\n  for (let val of arr) {\n    current.next = new ListNode(parseInt(val));\n    current = current.next;\n  }\n  return dummy.next;\n}\n\nfunction printList(head) {\n  const result = [];\n  while (head) {\n    result.push(head.val);\n    head = head.next;\n  }\n  console.log(result.join(\" -> \"));\n}\n\nfunction reverseList(head) {\n  let prev = null;\n  while (head) {\n    let next = head.next;\n    head.next = prev;\n    prev = head;\n    head = next;\n  }\n  return prev;\n}\n\n\n\n\n// Judge0-compatible input/output\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nlet input = [];\n\nrl.on('line', line => input.push(...line.trim().split(' ')));\nrl.on('close', () => {\n  const head = buildList(input);\n  const newHead = reverseList(head);\n  printList(newHead);\n});\n"
    },
    "codeSnippets": {
      "JAVA": "// Add your reference solution here\nimport java.util.*;\nimport java.util.Scanner;\n\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode(int x) { val = x; }\n}\n\nclass Solution {\n\n     public static ListNode buildList(String[] arr) {\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        for (String s : arr) {\n            curr.next = new ListNode(Integer.parseInt(s));\n            curr = curr.next;\n        }\n        return dummy.next;\n    }\n\n    public static void printList(ListNode head) {\n        List<String> result = new ArrayList<>();\n        while (head != null) {\n            result.add(String.valueOf(head.val));\n            head = head.next;\n        }\n        System.out.println(String.join(\" -> \", result));\n    }\n\n    public static ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        while (head != null) {\n            ListNode nextNode = head.next;\n            head.next = prev;\n            prev = head;\n            head = nextNode;\n        }\n        return prev;\n    }\n}\n\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String[] input = scanner.nextLine().trim().split(\"\\\\s+\");\n        ListNode head = Solution.buildList(input); // FIXED\n        ListNode newHead = Solution.reverseList(head);\n        Solution.printList(newHead); // FIXED\n    }\n}",
      "PYTHON": "# Add your reference solution here\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef build_list(arr):\n    dummy = ListNode(0)\n    current = dummy\n    for val in arr:\n        current.next = ListNode(int(val))\n        current = current.next\n    return dummy.next\n\ndef print_list(head):\n    result = []\n    while head:\n        result.append(str(head.val))\n        head = head.next\n    print(\" -> \".join(result))\n\ndef reverse_list(head):\n    prev = None\n    while head:\n        next_node = head.next\n        head.next = prev\n        prev = head\n        head = next_node\n    return prev\n\n\n\n# Judge0-compatible stdin\nif __name__ == \"__main__\":\n    import sys\n    input_vals = sys.stdin.read().strip().split()\n    head = build_list(input_vals)\n    new_head = reverse_list(head)\n    print_list(new_head)\n\n",
      "JAVASCRIPT": "// Add your reference solution here\nclass ListNode {\n  constructor(val, next = null) {\n    this.val = val;\n    this.next = next;\n  }\n}\n\nfunction buildList(arr) {\n  let dummy = new ListNode(0);\n  let current = dummy;\n  for (let val of arr) {\n    current.next = new ListNode(parseInt(val));\n    current = current.next;\n  }\n  return dummy.next;\n}\n\nfunction printList(head) {\n  const result = [];\n  while (head) {\n    result.push(head.val);\n    head = head.next;\n  }\n  console.log(result.join(\" -> \"));\n}\n\nfunction reverseList(head) {\n  let prev = null;\n  while (head) {\n    let next = head.next;\n    head.next = prev;\n    prev = head;\n    head = next;\n  }\n  return prev;\n}\n\n\n\n\n// Judge0-compatible input/output\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nlet input = [];\n\nrl.on('line', line => input.push(...line.trim().split(' ')));\nrl.on('close', () => {\n  const head = buildList(input);\n  const newHead = reverseList(head);\n  printList(newHead);\n});\n"
    }
  },
  {
    "title": "Container With Most Water",
    "description": "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container that can hold the most water.",
    "difficulty": "MEDIUM",
    "tags": [
      "two-pointers",
      "array",
      "greedy"
    ],
    "examples": {
      "JAVA": {
        "input": "2\n11",
        "output": "1",
        "explanation": "The max area is between the two lines with height 1, area = 1 * 1 = 1."
      },
      "PYTHON": {
        "input": "9\n1 8 6 2 5 4 8 3 7",
        "output": "49",
        "explanation": "The max area is between height[1]=8 and height[8]=7, area = min(8,7) * (8-1) = 7 * 7 = 49."
      },
      "JAVASCRIPT": {
        "input": "2\n1 1",
        "output": "1",
        "explanation": "The max area is between the two lines with height 1, area = 1 * 1 = 1."
      }
    },
    "constraints": "n == height.length, 2 ≤ n ≤ 10^5, 0 ≤ height[i] ≤ 10^4",
    "hints": "Use two pointers approach from both ends. The area is determined by the shorter line. Move the pointer with smaller height to potentially find a larger area",
    "editorial": "This problem can be solved optimally using two pointers. Start with pointers at both ends and calculate the area. Always move the pointer with the smaller height because moving the taller one cannot increase the area (width decreases and height is still limited by the shorter line).",
    "testcases": [
      {
        "input": "9\n1 8 6 2 5 4 8 3 7",
        "output": "49"
      },
      {
        "input": "2\n1 1",
        "output": "1"
      },
      {
        "input": "6\n1 2 4 3 2 1",
        "output": "6"
      },
      {
        "input": "3\n2 1 3",
        "output": "4"
      },
      {
        "input": "4\n1 3 2 5",
        "output": "6"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    public static int maxArea(int[] height) {\n        int left = 0, right = height.length - 1;\n        int maxWater = 0;\n\n        while (left < right) {\n            int width = right - left;\n            int currentArea = Math.min(height[left], height[right]) * width;\n            maxWater = Math.max(maxWater, currentArea);\n\n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n\n        return maxWater;\n    }\n}\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] height = new int[n];\n        for (int i = 0; i < n; i++) {\n            height[i] = sc.nextInt();\n        }\n\n        System.out.println(Solution.maxArea(height));\n    }\n}",
      "PYTHON": "def max_area(height):\n    left, right = 0, len(height) - 1\n    max_water = 0\n    \n    while left < right:\n        width = right - left\n        current_area = min(height[left], height[right]) * width\n        max_water = max(max_water, current_area)\n        \n        if height[left] < height[right]:\n            left += 1\n        else:\n            right -= 1\n    \n    return max_water\n\n\nimport sys\ninput_lines = sys.stdin.read().strip().split('\\n')\nn = int(input_lines[0])\nheight = list(map(int, input_lines[1].split()))\nprint(max_area(height))",
      "JAVASCRIPT": "function maxArea(height) {\n    let left = 0, right = height.length - 1;\n    let maxWater = 0;\n    \n    while (left < right) {\n        const width = right - left;\n        const currentArea = Math.min(height[left], height[right]) * width;\n        maxWater = Math.max(maxWater, currentArea);\n        \n        if (height[left] < height[right]) {\n            left++;\n        } else {\n            right--;\n        }\n    }\n    \n    return maxWater;\n}\n\n\nconst fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst n = parseInt(input[0]);\nconst height = input[1].split(' ').map(Number);\nconsole.log(maxArea(height));"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    public static int maxArea(int[] height) {\n        int left = 0, right = height.length - 1;\n        int maxWater = 0;\n\n        while (left < right) {\n            int width = right - left;\n            int currentArea = Math.min(height[left], height[right]) * width;\n            maxWater = Math.max(maxWater, currentArea);\n\n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n\n        return maxWater;\n    }\n}\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] height = new int[n];\n        for (int i = 0; i < n; i++) {\n            height[i] = sc.nextInt();\n        }\n\n        System.out.println(Solution.maxArea(height));\n    }\n}",
      "PYTHON": "def max_area(height):\n    left, right = 0, len(height) - 1\n    max_water = 0\n    \n    while left < right:\n        width = right - left\n        current_area = min(height[left], height[right]) * width\n        max_water = max(max_water, current_area)\n        \n        if height[left] < height[right]:\n            left += 1\n        else:\n            right -= 1\n    \n    return max_water\n\n\nimport sys\ninput_lines = sys.stdin.read().strip().split('\\n')\nn = int(input_lines[0])\nheight = list(map(int, input_lines[1].split()))\nprint(max_area(height))",
      "JAVASCRIPT": "function maxArea(height) {\n    let left = 0, right = height.length - 1;\n    let maxWater = 0;\n    \n    while (left < right) {\n        const width = right - left;\n        const currentArea = Math.min(height[left], height[right]) * width;\n        maxWater = Math.max(maxWater, currentArea);\n        \n        if (height[left] < height[right]) {\n            left++;\n        } else {\n            right--;\n        }\n    }\n    \n    return maxWater;\n}\n\n\nconst fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst n = parseInt(input[0]);\nconst height = input[1].split(' ').map(Number);\nconsole.log(maxArea(height));"
    }
  },
  {
    "title": "Valid Parentheses",
    "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n\nOpen brackets must be closed by the same type of brackets.\nOpen brackets must be closed in the correct order.\nEvery close bracket has a corresponding open bracket of the same type.\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
    "difficulty": "EASY",
    "tags": [
      "Stack",
      "String",
      "Data Structures"
    ],
    "examples": {
      "JAVA": {
        "input": "(]",
        "output": "false",
        "explanation": "The closing bracket ']' does not match the opening bracket '(', so the string is invalid."
      },
      "PYTHON": {
        "input": "()[]{}",
        "output": "true",
        "explanation": "All brackets are correctly paired and ordered."
      },
      "JAVASCRIPT": {
        "input": "()",
        "output": "true",
        "explanation": "The input string '()' contains a matching pair of parentheses in the correct order, so it is valid."
      }
    },
    "constraints": "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'.",
    "hints": "Use a stack to keep track of open brackets. Iterate through the string, pushing open brackets onto the stack and popping when a matching closing bracket is found.",
    "editorial": "The problem can be solved using a stack. When an open bracket is encountered, push it onto the stack. When a closing bracket is encountered, check if the stack is empty or if the top of the stack does not match the closing bracket. If either of these conditions is true, the string is invalid. Otherwise, pop the top element from the stack. After iterating through the string, the string is valid if and only if the stack is empty.",
    "testcases": [
      {
        "input": "()",
        "output": "true"
      },
      {
        "input": "()[]{}",
        "output": "true"
      },
      {
        "input": "(]",
        "output": "false"
      },
      {
        "input": "([)]",
        "output": "false"
      },
      {
        "input": "{[]}",
        "output": "true"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.Stack;\nimport java.util.Scanner;\n\nclass Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(' || c == '[' || c == '{') {\n                stack.push(c);\n            } else if (c == ')' && !stack.isEmpty() && stack.peek() == '(') {\n                stack.pop();\n            } else if (c == ']' && !stack.isEmpty() && stack.peek() == '[') {\n                stack.pop();\n            } else if (c == '}' && !stack.isEmpty() && stack.peek() == '{') {\n                stack.pop();\n            } else {\n                return false;\n            }\n        }\n        return stack.isEmpty();\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        Solution sol = new Solution();\n        System.out.println(sol.isValid(s));\n    }\n}",
      "PYTHON": "def isValid(s):\n    stack = []\n    mapping = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\n\n    for char in s:\n        if char in mapping:\n            top_element = stack.pop() if stack else '#'\n            if mapping[char] != top_element:\n                return False\n        else:\n            stack.append(char)\n\n    return not stack\n\ns = input().strip()\nprint(isValid(s))",
      "JAVASCRIPT": "function isValid(s) {\n    const stack = [];\n    const map = {\n        ')': '(',\n        ']': '[',\n        '}': '{'\n    };\n\n    for (let i = 0; i < s.length; i++) {\n        const char = s[i];\n\n        if (char === '(' || char === '[' || char === '{') {\n            stack.push(char);\n        } else if (char === ')' || char === ']' || char === '}') {\n            if (stack.length === 0 || stack[stack.length - 1] !== map[char]) {\n                return false;\n            }\n            stack.pop();\n        }\n    }\n\n    return stack.length === 0;\n}\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on('line', function (line) {\n    const result = isValid(line.trim());\n    console.log(result);\n    rl.close();\n});"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Stack;\nimport java.util.Scanner;\n\nclass Solution {\n    public boolean isValid(String s) {\n        // code\n        return false;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        Solution sol = new Solution();\n        System.out.println(sol.isValid(s));\n    }\n}",
      "PYTHON": "def isValid(s):\n    # code\n    return False\n\ns = input().strip()\nprint(isValid(s))",
      "JAVASCRIPT": "function isValid(s) {\n  // code\n}\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on('line', function (line) {\n    const result = isValid(line.trim());\n    console.log(result);\n    rl.close();\n});"
    }
  },
  {
    "title": "Longest Substring Without Repeating Characters",
    "description": "Given a string s, find the length of the longest substring without duplicate characters.\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
    "difficulty": "MEDIUM",
    "tags": [
      "String",
      "Hash Table",
      "Sliding Window"
    ],
    "examples": {
      "JAVA": {
        "input": "pwwkew",
        "output": "3",
        "explanation": "The answer is 'wke', with the length of 3. Notice that the answer must be a substring, 'pwke' is a subsequence and not a substring."
      },
      "PYTHON": {
        "input": "bbbbb",
        "output": "1",
        "explanation": "The answer is 'b', with the length of 1."
      },
      "JAVASCRIPT": {
        "input": "abcabcbb",
        "output": "3",
        "explanation": "The answer is 'abc', with the length of 3."
      }
    },
    "constraints": "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
    "hints": "Use a sliding window and a hash table to keep track of the characters in the current window.",
    "editorial": "The sliding window technique is used to efficiently find the longest substring without repeating characters. A hash table stores the characters within the current window. The window expands by adding characters from the right. If a duplicate is found, the window shrinks from the left until the duplicate is removed. The maximum length of the window encountered is the result.",
    "testcases": [
      {
        "input": "abcabcbb",
        "output": "3"
      },
      {
        "input": "bbbbb",
        "output": "1"
      },
      {
        "input": "pwwkew",
        "output": "3"
      },
      {
        "input": "dvdf",
        "output": "3"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Scanner;\n\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        int maxLength = 0;\n        int start = 0;\n        Map<Character, Integer> charMap = new HashMap<>();\n\n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n\n            if (charMap.containsKey(c) && charMap.get(c) >= start) {\n                start = charMap.get(c) + 1;\n            }\n\n            charMap.put(c, i);\n            maxLength = Math.max(maxLength, i - start + 1);\n        }\n\n        return maxLength;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String s = scanner.nextLine();\n        Solution solution = new Solution();\n        System.out.println(solution.lengthOfLongestSubstring(s));\n    }\n}",
      "PYTHON": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        char_index_map = {}\n        start = 0\n        max_length = 0\n\n        for i, char in enumerate(s):\n            if char in char_index_map and start <= char_index_map[char]:\n                start = char_index_map[char] + 1\n\n            char_index_map[char] = i\n            max_length = max(max_length, i - start + 1)\n\n        return max_length\n\ns = input()\nprint(Solution().lengthOfLongestSubstring(s))",
      "JAVASCRIPT": "/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLongestSubstring = function(s) {\n    let maxLength = 0;\n    let start = 0;\n    let charMap = {};\n\n    for (let i = 0; i < s.length; i++) {\n        let char = s[i];\n\n        if (charMap[char] !== undefined && charMap[char] >= start) {\n            start = charMap[char] + 1;\n        }\n\n        charMap[char] = i;\n        maxLength = Math.max(maxLength, i - start + 1);\n    }\n\n    return maxLength;\n};\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on('line', (line) => {\n    const result = lengthOfLongestSubstring(line);\n    console.log(result);\n    rl.close();\n});"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String s = scanner.nextLine();\n        Solution solution = new Solution();\n        System.out.println(solution.lengthOfLongestSubstring(s));\n    }\n}",
      "PYTHON": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        \n\ns = input()\nprint(Solution().lengthOfLongestSubstring(s))",
      "JAVASCRIPT": "/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLongestSubstring = function(s) {\n    \n};\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on('line', (line) => {\n    const result = lengthOfLongestSubstring(line);\n    console.log(result);\n    rl.close();\n});"
    }
  },
  {
    "title": "Fibonacci Number",
    "description": "Calculate the nth Fibonacci number where F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2)\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
    "difficulty": "MEDIUM",
    "tags": [
      "Math",
      "Dynamic Programming",
      "Recursion"
    ],
    "examples": {
      "JAVA": {
        "input": "7",
        "output": "13"
      },
      "PYTHON": {
        "input": "10",
        "output": "55"
      },
      "JAVASCRIPT": {
        "input": "5",
        "output": "5",
        "explanation": "The 5th Fibonacci number is 5."
      }
    },
    "constraints": "0 <= n <= 50",
    "hints": "Since 64 bit integers are not allowed, consider using modulo arithmetic with a large prime number or dynamic programming using smaller data types to prevent overflow.",
    "editorial": "The Fibonacci sequence can be computed using dynamic programming with modulo arithmetic to avoid overflow. Store the previous two Fibonacci numbers in an array and iteratively compute the next one using F(n) = F(n-1) + F(n-2).",
    "testcases": [
      {
        "input": "0",
        "output": "0"
      },
      {
        "input": "1",
        "output": "1"
      },
      {
        "input": "2",
        "output": "1"
      },
      {
        "input": "5",
        "output": "5"
      },
      {
        "input": "10",
        "output": "55"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n  public int fibonacci(int n) {\n    if (n <= 1) {\n      return n;\n    }\n    int a = 0;\n    int b = 1;\n    for (int i = 2; i <= n; i++) {\n      int temp = (a + b) % 1000000007; // Use modulo to prevent overflow\n      a = b;\n      b = temp;\n    }\n    return b;\n  }\n}\n\nclass Main {\n  public static void main(String[] args) {\n    Scanner scanner = new Scanner(System.in);\n    int n = scanner.nextInt();\n    Solution solution = new Solution();\n    int result = solution.fibonacci(n);\n    System.out.println(result);\n    scanner.close();\n  }\n}",
      "PYTHON": "def fibonacci(n):\n    if n <= 1:\n        return n\n    a = 0\n    b = 1\n    for i in range(2, n + 1):\n        temp = (a + b) % 1000000007  # Use modulo to prevent overflow\n        a = b\n        b = temp\n    return b\n\nn = int(input())\nprint(fibonacci(n))",
      "JAVASCRIPT": "function fibonacci(n) {\n  if (n <= 1) {\n    return n;\n  }\n  let a = 0;\n  let b = 1;\n  for (let i = 2; i <= n; i++) {\n    let temp = (a + b) % 1000000007; // Use modulo to prevent overflow\n    a = b;\n    b = temp;\n  }\n  return b;\n}\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout,\n});\n\nrl.on('line', (line) => {\n  const n = parseInt(line);\n  const result = fibonacci(n);\n  console.log(result);\n  rl.close();\n});"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n  public int fibonacci(int n) {\n    // Calculate the nth Fibonacci number\n    return 0;\n  }\n}\n\nclass Main {\n  public static void main(String[] args) {\n    Scanner scanner = new Scanner(System.in);\n    int n = scanner.nextInt();\n    Solution solution = new Solution();\n    int result = solution.fibonacci(n);\n    System.out.println(result);\n    scanner.close();\n  }\n}",
      "PYTHON": "def fibonacci(n):\n  # Calculate the nth Fibonacci number\n  return 0\n\nn = int(input())\nprint(fibonacci(n))",
      "JAVASCRIPT": "function fibonacci(n) {\n  // Calculate the nth Fibonacci number\n}\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout,\n});\n\nrl.on('line', (line) => {\n  const n = parseInt(line);\n  const result = fibonacci(n);\n  console.log(result);\n  rl.close();\n});"
    }
  },
  {
    "title": "Binary Tree Inorder Traversal",
    "description": "Given the root of a binary tree, return the inorder traversal of its nodes' values. Inorder traversal visits nodes in the order: left subtree, root, right subtree.",
    "difficulty": "EASY",
    "tags": [
      "tree",
      "depth-first-search",
      "binary-tree"
    ],
    "examples": {
      "JAVA": {
        "input": "1\n1 -1 -1",
        "output": "1",
        "explanation": "Single node tree has inorder traversal [1]."
      },
      "PYTHON": {
        "input": "7\n1 -1 2 3 -1 -1 -1",
        "output": "1 3 2",
        "explanation": "Inorder traversal of the tree gives [1,3,2]."
      },
      "JAVASCRIPT": {
        "input": "1\n1 -1 -1",
        "output": "1",
        "explanation": "Single node tree has inorder traversal [1]."
      }
    },
    "constraints": "The number of nodes in the tree is in the range [0, 100], -100 ≤ Node.val ≤ 100",
    "hints": "Use recursion or stack for iterative approach and Inorder: Left -> Root -> Right",
    "editorial": "Inorder traversal can be implemented recursively or iteratively. The recursive approach is straightforward: traverse left subtree, visit root, traverse right subtree.",
    "testcases": [
      {
        "input": "7\n1 -1 2 3 -1 -1 -1",
        "output": "1 3 2"
      },
      {
        "input": "1\n1 -1 -1",
        "output": "1"
      },
      {
        "input": "0\n",
        "output": ""
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.*;\n\nclass TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode() {}\n    TreeNode(int val) { this.val = val; }\n    TreeNode(int val, TreeNode left, TreeNode right) {\n        this.val = val;\n        this.left = left;\n        this.right = right;\n    }\n}\n\nclass Solution {\n    public static List<Integer> inorderTraversal(TreeNode root) {\n        List<Integer> result = new ArrayList<>();\n        inorderHelper(root, result);\n        return result;\n    }\n\n    private static void inorderHelper(TreeNode root, List<Integer> result) {\n        if (root != null) {\n            inorderHelper(root.left, result);\n            result.add(root.val);\n            inorderHelper(root.right, result);\n        }\n    }\n\n    public static TreeNode buildTree(int[] arr) {\n        if (arr.length == 0 || arr[0] == -1) return null;\n\n        TreeNode root = new TreeNode(arr[0]);\n        Queue<TreeNode> queue = new LinkedList<>();\n        queue.offer(root);\n        int i = 1;\n\n        while (!queue.isEmpty() && i < arr.length) {\n            TreeNode node = queue.poll();\n\n            if (i < arr.length && arr[i] != -1) {\n                node.left = new TreeNode(arr[i]);\n                queue.offer(node.left);\n            }\n            i++;\n\n            if (i < arr.length && arr[i] != -1) {\n                node.right = new TreeNode(arr[i]);\n                queue.offer(node.right);\n            }\n            i++;\n        }\n\n        return root;\n    }\n}\n\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        if (n == 0) {\n            System.out.println(\"\");\n        } else {\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n\n            TreeNode root = Solution.buildTree(arr);\n            List<Integer> result = Solution.inorderTraversal(root);\n\n            for (int i = 0; i < result.size(); i++) {\n                if (i > 0) System.out.print(\" \");\n                System.out.print(result.get(i));\n            }\n            System.out.println();\n        }\n    }\n}",
      "PYTHON": "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef inorder_traversal(root):\n    result = []\n    \n    def inorder(node):\n        if node:\n            inorder(node.left)\n            result.append(node.val)\n            inorder(node.right)\n    \n    inorder(root)\n    return result\n\ndef build_tree(arr):\n    if not arr or arr[0] == -1:\n        return None\n    \n    root = TreeNode(arr[0])\n    queue = [root]\n    i = 1\n    \n    while queue and i < len(arr):\n        node = queue.pop(0)\n        \n        if i < len(arr) and arr[i] != -1:\n            node.left = TreeNode(arr[i])\n            queue.append(node.left)\n        i += 1\n        \n        if i < len(arr) and arr[i] != -1:\n            node.right = TreeNode(arr[i])\n            queue.append(node.right)\n        i += 1\n    \n    return root\n\n\nimport sys\ninput_lines = sys.stdin.read().strip().split('\\n')\nn = int(input_lines[0])\nif n == 0:\n    print('')\nelse:\n    arr = list(map(int, input_lines[1].split()))\n    root = build_tree(arr)\n    result = inorder_traversal(root)\n    print(' '.join(map(str, result)))",
      "JAVASCRIPT": "class TreeNode {\n    constructor(val, left, right) {\n        this.val = (val === undefined ? 0 : val);\n        this.left = (left === undefined ? null : left);\n        this.right = (right === undefined ? null : right);\n    }\n}\n\nfunction inorderTraversal(root) {\n    const result = [];\n    \n    function inorder(node) {\n        if (node) {\n            inorder(node.left);\n            result.push(node.val);\n            inorder(node.right);\n        }\n    }\n    \n    inorder(root);\n    return result;\n}\n\nfunction buildTree(arr) {\n    if (arr.length === 0 || arr[0] === -1) return null;\n    \n    let root = new TreeNode(arr[0]);\n    let queue = [root];\n    let i = 1;\n    \n    while (queue.length > 0 && i < arr.length) {\n        let node = queue.shift();\n        \n        if (i < arr.length && arr[i] !== -1) {\n            node.left = new TreeNode(arr[i]);\n            queue.push(node.left);\n        }\n        i++;\n        \n        if (i < arr.length && arr[i] !== -1) {\n            node.right = new TreeNode(arr[i]);\n            queue.push(node.right);\n        }\n        i++;\n    }\n    \n    return root;\n}\n\n\nconst fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst n = parseInt(input[0]);\nif (n === 0) {\n    console.log('');\n} else {\n    const arr = input[1].split(' ').map(Number);\n    const root = buildTree(arr);\n    const result = inorderTraversal(root);\n    console.log(result.join(' '));\n}\n"
    },
    "codeSnippets": {
      "JAVA": "import java.util.*;\n\nclass TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode(int val) { this.val = val; }\n}\n\npublic class Solution {\n    // TODO: Implement your logic here\n    public static List<Integer> inorderTraversal(TreeNode root) {\n        return new ArrayList<>();\n    }\n    \n    public static TreeNode buildTree(int[] arr) {\n        return null;\n    }\n}\n\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        if (n == 0) {\n            System.out.println(\"\");\n        } else {\n            int[] arr = new int[n];\n            for (int i = 0; i < n; i++) {\n                arr[i] = sc.nextInt();\n            }\n\n            TreeNode root = Solution.buildTree(arr);\n            List<Integer> result = Solution.inorderTraversal(root);\n\n            for (int i = 0; i < result.size(); i++) {\n                if (i > 0) System.out.print(\" \");\n                System.out.print(result.get(i));\n            }\n            System.out.println();\n        }\n    }\n}",
      "PYTHON": "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef inorderTraversal(root):\n    # TODO: Implement your logic here\n    return []\n\ndef buildTree(arr):\n    # TODO: Implement build tree logic from level-order array\n    return None\n\n\nimport sys\ninput_lines = sys.stdin.read().strip().split('\\n')\nn = int(input_lines[0])\nif n == 0:\n    print('')\nelse:\n    arr = list(map(int, input_lines[1].split()))\n    root = build_tree(arr)\n    result = inorder_traversal(root)\n    print(' '.join(map(str, result)))",
      "JAVASCRIPT": "class TreeNode {\n    constructor(val, left = null, right = null) {\n        this.val = val;\n        this.left = left;\n        this.right = right;\n    }\n}\n\nfunction inorderTraversal(root) {\n    // TODO: Implement your logic here\n    return [];\n}\n\nfunction buildTree(arr) {\n    // TODO: Implement build tree from level-order array\n    return null;\n}\n\n\nconst fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst n = parseInt(input[0]);\nif (n === 0) {\n    console.log('');\n} else {\n    const arr = input[1].split(' ').map(Number);\n    const root = buildTree(arr);\n    const result = inorderTraversal(root);\n    console.log(result.join(' '));\n}\n"
    }
  },
  {
    "title": "Valid Anagram",
    "description": "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    "difficulty": "MEDIUM",
    "tags": [
      "string",
      "hashmap",
      "sorting"
    ],
    "examples": {
      "JAVA": {
        "input": "rat car",
        "output": "false",
        "explanation": "'car' is not an anagram of 'rat'."
      },
      "PYTHON": {
        "input": "anagram nagaram",
        "output": "true",
        "explanation": "'nagaram' is a rearrangement of 'anagram'."
      },
      "JAVASCRIPT": {
        "input": "rat car",
        "output": "false",
        "explanation": "'car' is not an anagram of 'rat'."
      }
    },
    "constraints": "1 ≤ |s|, |t| ≤ 10^5\ns and t consist of lowercase English letters.",
    "hints": "Use character frequency count. Sorting can also help",
    "editorial": "Count character frequencies in both strings and compare them.",
    "testcases": [
      {
        "input": "listen silent",
        "output": "true"
      },
      {
        "input": "hello world",
        "output": "false"
      },
      {
        "input": "aacc ccac",
        "output": "false"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    public static boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n\n        int[] count = new int[26];\n        for (char c : s.toCharArray()) {\n            count[c - 'a']++;\n        }\n        for (char c : t.toCharArray()) {\n            if (--count[c - 'a'] < 0) {\n                return false;\n            }\n        }\n\n        return true;\n    }\n}\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        String s = sc.next();\n        String t = sc.next();\n\n        System.out.println(Solution.isAnagram(s, t));\n    }\n}\n",
      "PYTHON": "from collections import Counter\n\ndef is_anagram(s: str, t: str) -> bool:\n    return Counter(s) == Counter(t)\n\n\nimport sys\n\ns, t = sys.stdin.read().strip().split()\nprint(str(is_anagram(s, t)))\n\n",
      "JAVASCRIPT": "\nfunction isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (let char of s) count[char] = (count[char] || 0) + 1;\n  for (let char of t) {\n    if (!count[char]) return false;\n    count[char]--;\n  }\n  return true;\n}\n\n\nconst fs = require('fs');\nconst [s, t] = fs.readFileSync(0, 'utf-8').trim().split(' ');\nconsole.log(isAnagram(s, t));"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    public static boolean isAnagram(String s, String t) {\n        // TODO: Implement the anagram check logic\n        return false;\n    }\n}\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        String s = sc.next();\n        String t = sc.next();\n\n        System.out.println(Solution.isAnagram(s, t));\n    }\n}\n",
      "PYTHON": "def is_anagram(s, t):\n    # Write your code here\n    pass\n\n\n\nimport sys\n\ns, t = sys.stdin.read().strip().split()\nprint(str(is_anagram(s, t)))\n\n",
      "JAVASCRIPT": "function isAnagram(s, t) {\n  // Write your code here\n}\n\n\nconst fs = require('fs');\nconst [s, t] = fs.readFileSync(0, 'utf-8').trim().split(' ');\nconsole.log(isAnagram(s, t));"
    }
  },
  {
    "title": "Subarray Sum Equals K",
    "description": "Given an integer array nums and an integer k, return the total number of continuous subarrays whose sum equals to k.",
    "difficulty": "HARD",
    "tags": [
      "Prefix Sum",
      "Hash Map"
    ],
    "examples": {
      "JAVA": {
        "input": "nums = [1, 1, 1]\nk = 2",
        "output": "2",
        "explanation": "Subarrays [1,1] at indices (0,1) and (1,2) sum to 2."
      },
      "PYTHON": {
        "input": "nums: 1 2 3\nk: 3",
        "output": "2",
        "explanation": "Subarrays [1,2] and [3] both sum to 3."
      },
      "JAVASCRIPT": {
        "input": "nums = [3,4,7,2,-3,1,4,2]\nk = 7",
        "output": "4",
        "explanation": "Subarrays that sum to 7: [3,4], [7], [7,2,-3,1], and [1,4,2]."
      }
    },
    "constraints": "1 <= nums.length <= 20,000\n-1000 <= nums[i] <= 1000\n-10⁷ <= k <= 10⁷",
    "hints": "Use prefix sum and a hash map to track counts of seen sums.",
    "editorial": "",
    "testcases": [
      {
        "input": "1 1 1\n2",
        "output": "2"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.*;\r\n\r\nclass Solution {\r\n    public static int subarraySum(int[] nums, int k) {\r\n        Map<Integer, Integer> map = new HashMap<>();\r\n        map.put(0, 1);\r\n        int count = 0, sum = 0;\r\n\r\n        for (int num : nums) {\r\n            sum += num;\r\n            count += map.getOrDefault(sum - k, 0);\r\n            map.put(sum, map.getOrDefault(sum, 0) + 1);\r\n        }\r\n\r\n        return count;\r\n    }\r\n}\r\n\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int k = sc.nextInt();\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) {\n            list.add(sc.nextInt());\n        }\n        int[] nums = list.stream().mapToInt(i -> i).toArray();\n        System.out.println(Solution.subarraySum(nums, k));\n    }\n}\n",
      "PYTHON": "# Add your reference solution here\r\ndef subarraySum(nums, k):\r\n    from collections import defaultdict\r\n    count = 0\r\n    prefix_sum = 0\r\n    prefix_map = defaultdict(int)\r\n    prefix_map[0] = 1\r\n\r\n    for num in nums:\r\n        prefix_sum += num\r\n        count += prefix_map.get(prefix_sum - k, 0)\r\n        prefix_map[prefix_sum] += 1\r\n    return count\r\n\r\n\n\nif __name__ == \"__main__\":\n    import sys\n    input = sys.stdin.read().strip().split()\n    k = int(input[0])\n    nums = list(map(int, input[1:]))\n    print(subarraySum(nums, k))\n",
      "JAVASCRIPT": "// Add your reference solution here\nfunction subarraySum(nums, k) {\n    let map = new Map();\n    map.set(0, 1);\n    let count = 0;\n    let sum = 0;\n\n    for (let num of nums) {\n        sum += num;\n        if (map.has(sum - k)) {\n            count += map.get(sum - k);\n        }\n        map.set(sum, (map.get(sum) || 0) + 1);\n    }\n\n    return count;\n}\n\n\n\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nlet input = [];\n\nrl.on('line', line => input.push(...line.trim().split(' ')));\nrl.on('close', () => {\n    const k = parseInt(input[0]);\n    const nums = input.slice(1).map(Number);\n    console.log(subarraySum(nums, k));\n});"
    },
    "codeSnippets": {
      "JAVA": "class Solution {\n    public static int subarraySum(int[] nums, int k) {\n        // TODO: Implement this method to return the number of subarrays that sum to k\n        return 0;\n    }\n}\n\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int k = sc.nextInt();\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) {\n            list.add(sc.nextInt());\n        }\n        int[] nums = list.stream().mapToInt(i -> i).toArray();\n        System.out.println(Solution.subarraySum(nums, k));\n    }\n}\n",
      "PYTHON": "def subarraySum(nums, k):\n    # Write your code here\n    pass\n\n\n\nif __name__ == \"__main__\":\n    import sys\n    input = sys.stdin.read().strip().split()\n    k = int(input[0])\n    nums = list(map(int, input[1:]))\n    print(subarraySum(nums, k))\n",
      "JAVASCRIPT": "function subarraySum(nums, k) {\n    // Write your code here\n}\n\n\n\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nlet input = [];\n\nrl.on('line', line => input.push(...line.trim().split(' ')));\nrl.on('close', () => {\n    const k = parseInt(input[0]);\n    const nums = input.slice(1).map(Number);\n    console.log(subarraySum(nums, k));\n});"
    }
  },
  {
    "title": "Reverse Integer",
    "description": "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
    "difficulty": "EASY",
    "tags": [
      "Math",
      "Integer",
      "Algorithm"
    ],
    "examples": {
      "JAVA": {
        "input": "120",
        "output": "21",
        "explanation": "Reversing 120 yields 021, which is 21."
      },
      "PYTHON": {
        "input": "-123",
        "output": "-321",
        "explanation": "Reversing -123 yields -321."
      },
      "JAVASCRIPT": {
        "input": "123",
        "output": "321",
        "explanation": "Reversing 123 yields 321."
      }
    },
    "constraints": "-231 <= x <= 231 - 1",
    "hints": "How to handle the sign of the number? How to detect overflow?",
    "editorial": "Iteratively build the reversed number, checking for potential overflow/underflow before each multiplication.",
    "testcases": [
      {
        "input": "123",
        "output": "321"
      },
      {
        "input": "-123",
        "output": "-321"
      },
      {
        "input": "120",
        "output": "21"
      },
      {
        "input": "1534236469",
        "output": "0"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    public int reverse(int x) {\n        int reversed = 0;\n        while (x != 0) {\n            int digit = x % 10;\n            x /= 10;\n            if (reversed > Integer.MAX_VALUE/10 || (reversed == Integer.MAX_VALUE / 10 && digit > 7)) return 0;\n            if (reversed < Integer.MIN_VALUE/10 || (reversed == Integer.MIN_VALUE / 10 && digit < -8)) return 0;\n            reversed = reversed * 10 + digit;\n        }\n        return reversed;\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int x = scanner.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.reverse(x));\n        scanner.close();\n    }\n}",
      "PYTHON": "def reverse(x):\n    sign = -1 if x < 0 else 1\n    x = abs(x)\n    reversed_num = 0\n    while x > 0:\n        digit = x % 10\n        x //= 10\n        if reversed_num > 214748364 or (reversed_num == 214748364 and digit > 7):\n            return 0\n        if reversed_num < -214748364 or (reversed_num == -214748364 and digit < -8):\n            return 0\n        reversed_num = reversed_num * 10 + digit\n\n    return sign * reversed_num\n\nx = int(input())\nprint(reverse(x))",
      "JAVASCRIPT": "function reverse(x) {\n    let reversed = 0;\n    const sign = x < 0 ? -1 : 1;\n    x = Math.abs(x);\n\n    while (x > 0) {\n        const digit = x % 10;\n        x = Math.floor(x / 10);\n\n        if (reversed > Math.floor(2147483647 / 10) || (reversed === Math.floor(2147483647 / 10) && digit > 7)) {\n            return 0;\n        }\n        if (reversed < Math.floor(-2147483648 / 10) || (reversed === Math.floor(-2147483648 / 10) && digit < -8)) {\n            return 0;\n        }\n\n        reversed = reversed * 10 + digit;\n    }\n\n    return sign * reversed;\n}\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on('line', (line) => {\n    const x = parseInt(line);\n    console.log(reverse(x));\n    rl.close();\n});"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    public int reverse(int x) {\n        // Code here\n        return 0;\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int x = scanner.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.reverse(x));\n        scanner.close();\n    }\n}",
      "PYTHON": "def reverse(x):\n    # Code here\n    return 0\n\nx = int(input())\nprint(reverse(x))",
      "JAVASCRIPT": "function reverse(x) {\n    // Code here\n}\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on('line', (line) => {\n    const x = parseInt(line);\n    console.log(reverse(x));\n    rl.close();\n});"
    }
  },
  {
    "title": "3Sum",
    "description": "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
    "difficulty": "MEDIUM",
    "tags": [
      "Arrays",
      "Two Pointers",
      "Sorting"
    ],
    "examples": {
      "JAVA": {
        "input": "[-1,0,1,2,-1,-4]",
        "output": "[[-1,-1,2],[-1,0,1]]"
      },
      "PYTHON": {
        "input": "[-1,0,1,2,-1,-4]",
        "output": "[[-1,-1,2],[-1,0,1]]"
      },
      "JAVASCRIPT": {
        "input": "[-1,0,1,2,-1,-4]",
        "output": "[[-1,-1,2],[-1,0,1]]",
        "explanation": "The triplets that sum to 0 are [-1, -1, 2] and [-1, 0, 1]."
      }
    },
    "constraints": "-10^5 <= nums[i] <= 10^5\n- -10^5 <= target <= 10^5",
    "hints": "Sort the array first.\nUse two pointers to find the remaining two elements.",
    "editorial": "The optimal solution involves sorting the array and then using two pointers to find the remaining two elements that sum up to the negative of the current element. This avoids duplicate triplets and achieves a time complexity of O(n^2).",
    "testcases": [
      {
        "input": "[-1,0,1,2,-1,-4]",
        "output": "[[-1,-1,2],[-1,0,1]]"
      },
      {
        "input": "[0,1,1]",
        "output": "[]"
      },
      {
        "input": "[0,0,0]",
        "output": "[[0,0,0]]"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.Arrays;\nimport java.util.List;\nimport java.util.ArrayList;\nimport java.util.*;\nimport java.io.*;\n\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> result = new ArrayList<>();\n        for (int i = 0; i < nums.length - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int left = i + 1;\n            int right = nums.length - 1;\n            while (left < right) {\n                int sum = nums[i] + nums[left] + nums[right];\n                if (sum == 0) {\n                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));\n                    while (left < right && nums[left] == nums[left + 1]) left++;\n                    while (left < right && nums[right] == nums[right - 1]) right--;\n                    left++;\n                    right--;\n                } else if (sum < 0) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n        return result;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        int[] nums = Arrays.stream(line.substring(1, line.length() - 1).split(\",\")).map(String::trim).mapToInt(Integer::parseInt).toArray();\n\n        Solution sol = new Solution();\n        List<List<Integer>> result = sol.threeSum(nums);\n        System.out.println(format(result));\n    }\n\n    private static String format(List<List<Integer>> list) {\n        StringBuilder sb = new StringBuilder();\n        sb.append(\"[\");\n        for (int i = 0; i < list.size(); i++) {\n            sb.append(\"[\");\n            List<Integer> inner = list.get(i);\n            for (int j = 0; j < inner.size(); j++) {\n                sb.append(inner.get(j));\n                if (j < inner.size() - 1) sb.append(\",\");\n            }\n            sb.append(\"]\");\n            if (i < list.size() - 1) sb.append(\",\");\n        }\n        sb.append(\"]\");\n        return sb.toString();\n    }\n}",
      "PYTHON": "from typing import List\n\nclass Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        nums.sort()\n        result = []\n        for i in range(len(nums) - 2):\n            if i > 0 and nums[i] == nums[i - 1]:\n                continue\n            left = i + 1\n            right = len(nums) - 1\n            while left < right:\n                current_sum = nums[i] + nums[left] + nums[right]\n                if current_sum == 0:\n                    result.append([nums[i], nums[left], nums[right]])\n                    while left < right and nums[left] == nums[left + 1]:\n                        left += 1\n                    while left < right and nums[right] == nums[right - 1]:\n                        right -= 1\n                    left += 1\n                    right -= 1\n                elif current_sum < 0:\n                    left += 1\n                else:\n                    right -= 1\n        return result\n\nimport sys\nimport json\n\nnums = json.loads(sys.stdin.readline().strip())\nresult = Solution().threeSum(nums)\nprint(json.dumps(result, separators=(',', ':')))",
      "JAVASCRIPT": "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar threeSum = function(nums) {\n    nums.sort((a, b) => a - b);\n    const result = [];\n    for (let i = 0; i < nums.length - 2; i++) {\n        if (i > 0 && nums[i] === nums[i - 1]) continue;\n        let left = i + 1;\n        let right = nums.length - 1;\n        while (left < right) {\n            const sum = nums[i] + nums[left] + nums[right];\n            if (sum === 0) {\n                result.push([nums[i], nums[left], nums[right]]);\n                while (left < right && nums[left] === nums[left + 1]) left++;\n                while (left < right && nums[right] === nums[right - 1]) right--;\n                left++;\n                right--;\n            } else if (sum < 0) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n    }\n    return result;\n};\n\nconst readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\n\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    const nums = JSON.parse(input[0]);\n    const result = threeSum(nums);\n    console.log(JSON.stringify(result));\n});"
    },
    "codeSnippets": {
      "JAVA": "import java.util.List;\nimport java.util.*;\nimport java.io.*;\n\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        \n    }\n}\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        int[] nums = Arrays.stream(line.substring(1, line.length() - 1).split(\",\")).map(String::trim).mapToInt(Integer::parseInt).toArray();\n\n        Solution sol = new Solution();\n        List<List<Integer>> result = sol.threeSum(nums);\n        System.out.println(format(result));\n    }\n\n    private static String format(List<List<Integer>> list) {\n        StringBuilder sb = new StringBuilder();\n        sb.append(\"[\");\n        for (int i = 0; i < list.size(); i++) {\n            sb.append(\"[\");\n            List<Integer> inner = list.get(i);\n            for (int j = 0; j < inner.size(); j++) {\n                sb.append(inner.get(j));\n                if (j < inner.size() - 1) sb.append(\",\");\n            }\n            sb.append(\"]\");\n            if (i < list.size() - 1) sb.append(\",\");\n        }\n        sb.append(\"]\");\n        return sb.toString();\n    }\n}",
      "PYTHON": "from typing import List\n\nclass Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        \n\nimport sys\nimport json\n\nnums = json.loads(sys.stdin.readline().strip())\nresult = Solution().threeSum(nums)\nprint(json.dumps(result, separators=(',', ':')))",
      "JAVASCRIPT": "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar threeSum = function(nums) {\n    \n};\n\nconst readline = require('readline');\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet input = [];\n\nrl.on('line', (line) => {\n    input.push(line);\n});\n\nrl.on('close', () => {\n    const nums = JSON.parse(input[0]);\n    const result = threeSum(nums);\n    console.log(JSON.stringify(result));\n});"
    }
  },
  {
    "title": "Subarray Sum Equals K",
    "description": "Given an integer array nums and an integer k, return the total number of continuous subarrays whose sum equals to k.",
    "difficulty": "HARD",
    "tags": [
      "Prefix Sum",
      "Hash Map"
    ],
    "examples": {
      "JAVA": {
        "input": "nums = [1, 1, 1]\nk = 2",
        "output": "2",
        "explanation": "Subarrays [1,1] at indices (0,1) and (1,2) sum to 2."
      },
      "PYTHON": {
        "input": "nums: 1 2 3\nk: 3",
        "output": "2",
        "explanation": "Subarrays [1,2] and [3] both sum to 3."
      },
      "JAVASCRIPT": {
        "input": "nums = [3,4,7,2,-3,1,4,2]\nk = 7",
        "output": "4",
        "explanation": "Subarrays that sum to 7: [3,4], [7], [7,2,-3,1], and [1,4,2]."
      }
    },
    "constraints": "1 <= nums.length <= 20,000\n-1000 <= nums[i] <= 1000\n-10⁷ <= k <= 10⁷",
    "hints": "Use prefix sum and a hash map to track counts of seen sums.",
    "editorial": "",
    "testcases": [
      {
        "input": "1 1 1\n2",
        "output": "2"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.*;\r\n\r\nclass Solution {\r\n    // Returns the count of subarrays summing up to k\r\n    public int subarraySum(int[] nums, int k) {\r\n        Map<Integer, Integer> map = new HashMap<>();\r\n        map.put(0, 1);\r\n        int count = 0, sum = 0;\r\n\r\n        for (int num : nums) {\r\n            sum += num;\r\n            count += map.getOrDefault(sum - k, 0);\r\n            map.put(sum, map.getOrDefault(sum, 0) + 1);\r\n        }\r\n\r\n        return count;\r\n    }\r\n}\r\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int k = sc.nextInt();\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) {\n            list.add(sc.nextInt());\n        }\n        sc.close();\n\n        int[] nums = list.stream().mapToInt(i -> i).toArray();\n        Solution solution = new Solution();\n        System.out.println(solution.subarraySum(nums, k));\n    }\n}\n",
      "PYTHON": "# Add your reference solution here\r\ndef subarraySum(nums, k):\r\n    from collections import defaultdict\r\n    count = 0\r\n    prefix_sum = 0\r\n    prefix_map = defaultdict(int)\r\n    prefix_map[0] = 1\r\n\r\n    for num in nums:\r\n        prefix_sum += num\r\n        count += prefix_map.get(prefix_sum - k, 0)\r\n        prefix_map[prefix_sum] += 1\r\n    return count\r\n\r\n\n\n\nif __name__ == \"__main__\":\n    import sys\n    input = sys.stdin.read().strip().split()\n    k = int(input[0])\n    nums = list(map(int, input[1:]))\n    print(subarraySum(nums, k))",
      "JAVASCRIPT": "// Add your reference solution here\nfunction subarraySum(nums, k) {\n    let map = new Map();\n    map.set(0, 1);\n    let count = 0;\n    let sum = 0;\n\n    for (let num of nums) {\n        sum += num;\n        if (map.has(sum - k)) {\n            count += map.get(sum - k);\n        }\n        map.set(sum, (map.get(sum) || 0) + 1);\n    }\n\n    return count;\n}\n\n\n\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nlet input = [];\n\nrl.on('line', line => input.push(...line.trim().split(' ')));\nrl.on('close', () => {\n    const k = parseInt(input[0]);\n    const nums = input.slice(1).map(Number);\n    console.log(subarraySum(nums, k));\n});"
    },
    "codeSnippets": {
      "JAVA": "class Solution {\n    // TODO: Implement this method\n    public int subarraySum(int[] nums, int k) {\n        // Your code here\n        return 0;\n    }\n}\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int k = sc.nextInt();\n        List<Integer> list = new ArrayList<>();\n        while (sc.hasNextInt()) {\n            list.add(sc.nextInt());\n        }\n        sc.close();\n\n        int[] nums = list.stream().mapToInt(i -> i).toArray();\n        Solution solution = new Solution();\n        System.out.println(solution.subarraySum(nums, k));\n    }\n}\n",
      "PYTHON": "def subarraySum(nums, k):\n    # Write your code here\n    pass\n\n\n\nif __name__ == \"__main__\":\n    import sys\n    input = sys.stdin.read().strip().split()\n    k = int(input[0])\n    nums = list(map(int, input[1:]))\n    print(subarraySum(nums, k))",
      "JAVASCRIPT": "function subarraySum(nums, k) {\n    // Write your code here\n}\n\n\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nlet input = [];\n\nrl.on('line', line => input.push(...line.trim().split(' ')));\nrl.on('close', () => {\n    const k = parseInt(input[0]);\n    const nums = input.slice(1).map(Number);\n    console.log(subarraySum(nums, k));\n});"
    }
  },
  {
    "title": "Intersection of Two Arrays II",
    "description": "Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and the result can be returned in any order.",
    "difficulty": "HARD",
    "tags": [
      "Hash Map",
      "Sorting",
      "Two Pointers"
    ],
    "examples": {
      "JAVA": {
        "input": "num1 = 4 9 5,\nnum2 = 9 4 9 8 4\n",
        "output": "4 9",
        "explanation": "4 and 9 are common. Output order doesn't matter."
      },
      "PYTHON": {
        "input": "nums1 = [4,9,5], nums2 = [9,4,9,8,4]",
        "output": "[4,9] or [9,4]",
        "explanation": "4 and 9 appear in both arrays."
      },
      "JAVASCRIPT": {
        "input": "nums1 = [1,2,2,1], nums2 = [2,2]",
        "output": "[2,2]",
        "explanation": "Both arrays contain two 2s."
      }
    },
    "constraints": "1 <= nums1.length, nums2.length <= 1000\n0 <= nums1[i], nums2[i] <= 1000",
    "hints": "No hint for this question",
    "editorial": "",
    "testcases": [
      {
        "input": "4 9 5\n9 4 9 8 4\n",
        "output": "4 9\n"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.*;\r\n\r\nclass Solution {\r\n    // Returns the intersection of two arrays (including duplicates)\r\n    public List<Integer> intersect(int[] nums1, int[] nums2) {\r\n        Map<Integer, Integer> map = new HashMap<>();\r\n        for (int num : nums1) {\r\n            map.put(num, map.getOrDefault(num, 0) + 1);\r\n        }\r\n\r\n        List<Integer> result = new ArrayList<>();\r\n        for (int num : nums2) {\r\n            if (map.containsKey(num) && map.get(num) > 0) {\r\n                result.add(num);\r\n                map.put(num, map.get(num) - 1);\r\n            }\r\n        }\r\n\r\n        return result;\r\n    }\r\n}\r\n\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> input = new ArrayList<>();\n        while (sc.hasNextInt()) {\n            input.add(sc.nextInt());\n        }\n        sc.close();\n\n        int n = input.size() / 2;\n        int[] nums1 = new int[n];\n        int[] nums2 = new int[input.size() - n];\n\n        for (int i = 0; i < n; i++) nums1[i] = input.get(i);\n        for (int i = n; i < input.size(); i++) nums2[i - n] = input.get(i);\n\n        Solution solution = new Solution();\n        List<Integer> result = solution.intersect(nums1, nums2);\n\n        for (int num : result) {\n            System.out.print(num + \" \");\n        }\n    }\n}",
      "PYTHON": "# Add your reference solution here\r\nclass Solution:\r\n    def intersect(self, nums1, nums2):\r\n        from collections import Counter\r\n        counts = Counter(nums1)\r\n        result = []\r\n        for num in nums2:\r\n            if counts[num] > 0:\r\n                result.append(num)\r\n                counts[num] -= 1\r\n        return result\r\n\r\n\n\n\nif __name__ == \"__main__\":\n    import sys\n    nums = list(map(int, sys.stdin.read().split()))\n    mid = len(nums) // 2\n    nums1 = nums[:mid]\n    nums2 = nums[mid:]\n\n    sol = Solution()\n    result = sol.intersect(nums1, nums2)\n    print(' '.join(map(str, result)))",
      "JAVASCRIPT": "function intersect(nums1, nums2) {\n    const map = new Map();\n    for (let num of nums1) {\n        map.set(num, (map.get(num) || 0) + 1);\n    }\n\n    const result = [];\n    for (let num of nums2) {\n        if (map.has(num) && map.get(num) > 0) {\n            result.push(num);\n            map.set(num, map.get(num) - 1);\n        }\n    }\n\n    return result;\n}\n\n\n\n\n// Judge0 Input/Output Setup\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nlet input = [];\n\nrl.on('line', (line) => input.push(...line.trim().split(' ').map(Number)));\nrl.on('close', () => {\n    const nums1 = [];\n    const nums2 = [];\n    const mid = Math.floor(input.length / 2);\n\n    for (let i = 0; i < input.length; i++) {\n        if (i < mid) nums1.push(input[i]);\n        else nums2.push(input[i]);\n    }\n\n    const result = intersect(nums1, nums2);\n    console.log(result.join(' '));\n});"
    },
    "codeSnippets": {
      "JAVA": "import java.util.*;\n\nclass Solution {\n    // TODO: Implement this method to return the intersection of two arrays\n    public List<Integer> intersect(int[] nums1, int[] nums2) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}\n\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<Integer> input = new ArrayList<>();\n        while (sc.hasNextInt()) {\n            input.add(sc.nextInt());\n        }\n        sc.close();\n\n        int n = input.size() / 2;\n        int[] nums1 = new int[n];\n        int[] nums2 = new int[input.size() - n];\n\n        for (int i = 0; i < n; i++) nums1[i] = input.get(i);\n        for (int i = n; i < input.size(); i++) nums2[i - n] = input.get(i);\n\n        Solution solution = new Solution();\n        List<Integer> result = solution.intersect(nums1, nums2);\n\n        for (int num : result) {\n            System.out.print(num + \" \");\n        }\n    }\n}",
      "PYTHON": "class Solution:\n    def intersect(self, nums1, nums2):\n        # Your code here\n        return []\n\n\n\nif __name__ == \"__main__\":\n    import sys\n    nums = list(map(int, sys.stdin.read().split()))\n    mid = len(nums) // 2\n    nums1 = nums[:mid]\n    nums2 = nums[mid:]\n\n    sol = Solution()\n    result = sol.intersect(nums1, nums2)\n    print(' '.join(map(str, result)))",
      "JAVASCRIPT": "function intersect(nums1, nums2) {\n    // Your code here\n}\n\n\n// Judge0 Input/Output Setup\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nlet input = [];\n\nrl.on('line', (line) => input.push(...line.trim().split(' ').map(Number)));\nrl.on('close', () => {\n    const nums1 = [];\n    const nums2 = [];\n    const mid = Math.floor(input.length / 2);\n\n    for (let i = 0; i < input.length; i++) {\n        if (i < mid) nums1.push(input[i]);\n        else nums2.push(input[i]);\n    }\n\n    const result = intersect(nums1, nums2);\n    console.log(result.join(' '));\n});"
    }
  },
  {
    "title": "Coin Change",
    "description": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    "difficulty": "MEDIUM",
    "tags": [
      "dynamic-programming",
      "array",
      "greedy"
    ],
    "examples": {
      "JAVA": {
        "input": "1 3\n2",
        "output": "-1",
        "explanation": "Amount 3 cannot be made up with coin 2."
      },
      "PYTHON": {
        "input": "3 11\n1 2 5",
        "output": "3",
        "explanation": "11 = 5 + 5 + 1, so minimum 3 coins needed."
      },
      "JAVASCRIPT": {
        "input": "1 3\n2",
        "output": "-1",
        "explanation": "Amount 3 cannot be made up with coin 2."
      }
    },
    "constraints": "1 ≤ coins.length ≤ 12, 1 ≤ coins[i] ≤ 2^31 - 1, 0 ≤ amount ≤ 10^4",
    "hints": "This is a classic dynamic programming problem. Use dp[i] to represent the minimum coins needed for amount i. For each amount, try all possible coins and take the minimum",
    "editorial": "This is a classic dynamic programming problem. We create a dp array where dp[i] represents the minimum number of coins needed to make amount i. For each amount from 1 to target, we try all coins and take the minimum coins needed.",
    "testcases": [
      {
        "input": "3 11\n1 2 5",
        "output": "3"
      },
      {
        "input": "1 3\n2",
        "output": "-1"
      },
      {
        "input": "1 0\n1",
        "output": "0"
      },
      {
        "input": "4 6\n1 3 4 5",
        "output": "2"
      },
      {
        "input": "2 7\n2 3",
        "output": "3"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.Arrays;\nimport java.util.Scanner;\n\nclass Solution {\n    public static int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, amount + 1);\n        dp[0] = 0;\n\n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (coin <= i) {\n                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        int n = sc.nextInt();           // number of coins\n        int amount = sc.nextInt();      // target amount\n\n        int[] coins = new int[n];\n        for (int i = 0; i < n; i++) {\n            coins[i] = sc.nextInt();\n        }\n\n        System.out.println(Solution.coinChange(coins, amount));\n    }\n}\n",
      "PYTHON": "def coin_change(coins, amount):\n    dp = [amount + 1] * (amount + 1)\n    dp[0] = 0\n    \n    for i in range(1, amount + 1):\n        for coin in coins:\n            if coin <= i:\n                dp[i] = min(dp[i], dp[i - coin] + 1)\n    \n    return dp[amount] if dp[amount] <= amount else -1\n\n\n\nimport sys\ninput_lines = sys.stdin.read().strip().split('\\n')\nn, amount = map(int, input_lines[0].split())\ncoins = list(map(int, input_lines[1].split()))\nprint(coin_change(coins, amount))",
      "JAVASCRIPT": "function coinChange(coins, amount) {\n    const dp = new Array(amount + 1).fill(amount + 1);\n    dp[0] = 0;\n    \n    for (let i = 1; i <= amount; i++) {\n        for (const coin of coins) {\n            if (coin <= i) {\n                dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n            }\n        }\n    }\n    \n    return dp[amount] > amount ? -1 : dp[amount];\n}\n\n\n\nconst fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst [n, amount] = input[0].split(' ').map(Number);\nconst coins = input[1].split(' ').map(Number);\nconsole.log(coinChange(coins, amount));"
    },
    "codeSnippets": {
      "JAVA": "import java.util.*;\n\nclass Solution {\n    public static int coinChange(int[] coins, int amount) {\n        // TODO: Implement the logic to find the minimum number of coins\n        return -1;\n    }\n}\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        int n = sc.nextInt();           // number of coins\n        int amount = sc.nextInt();      // target amount\n\n        int[] coins = new int[n];\n        for (int i = 0; i < n; i++) {\n            coins[i] = sc.nextInt();\n        }\n\n        System.out.println(Solution.coinChange(coins, amount));\n    }\n}\n",
      "PYTHON": "def coin_change(coins, amount):\n    # Write your code here\n    # Return minimum number of coins needed, or -1 if impossible\n    return 0\n\n\nimport sys\ninput_lines = sys.stdin.read().strip().split('\\n')\nn, amount = map(int, input_lines[0].split())\ncoins = list(map(int, input_lines[1].split()))\nprint(coin_change(coins, amount))",
      "JAVASCRIPT": "function coinChange(coins, amount) {\n    // Write your code here\n    // Return minimum number of coins needed, or -1 if impossible\n    return 0;\n}\n\n\nconst fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst [n, amount] = input[0].split(' ').map(Number);\nconst coins = input[1].split(' ').map(Number);\nconsole.log(coinChange(coins, amount));"
    }
  },
  {
    "title": "Maximum Subarray",
    "description": "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    "difficulty": "EASY",
    "tags": [
      "array",
      "dynamic-programming"
    ],
    "examples": {
      "JAVA": {
        "input": "1\n5",
        "output": "5",
        "explanation": "The subarray [5] has the largest sum = 5."
      },
      "PYTHON": {
        "input": "9\n-2 1 -3 4 -1 2 1 -5 4",
        "output": "6",
        "explanation": "The subarray [4,-1,2,1] has the largest sum = 6."
      },
      "JAVASCRIPT": {
        "input": "1\n5",
        "output": "5",
        "explanation": "The subarray [5] has the largest sum = 5."
      }
    },
    "constraints": "1 ≤ nums.length ≤ 10^5, -10^4 ≤ nums[i] ≤ 10^4",
    "hints": "Use Kadane's algorithm and keep track of current sum and maximum sum so far",
    "editorial": "This is a classic dynamic programming problem that can be solved using Kadane's algorithm. The idea is to iterate through the array and at each position decide whether to extend the existing subarray or start a new one.",
    "testcases": [
      {
        "input": "9\n-2 1 -3 4 -1 2 1 -5 4",
        "output": "6"
      },
      {
        "input": "1\n5",
        "output": "5"
      },
      {
        "input": "5\n5 4 -1 7 8",
        "output": "23"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.*;\nimport java.util.Scanner;\n\nclass Solution {\n    public int maxSubArray(int[] nums) {\n        int maxSum = nums[0];\n        int currentSum = nums[0];\n        \n        for (int i = 1; i < nums.length; i++) {\n            currentSum = Math.max(nums[i], currentSum + nums[i]);\n            maxSum = Math.max(maxSum, currentSum);\n        }\n        \n        return maxSum;\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) {\n            nums[i] = sc.nextInt();\n        }\n\n        Solution solution = new Solution();  // Create an instance of Solution\n        System.out.println(solution.maxSubArray(nums));  // Call the method using the instance\n    }\n}\n",
      "PYTHON": "def max_sub_array(nums):\n    max_sum = nums[0]\n    current_sum = nums[0]\n    \n    for i in range(1, len(nums)):\n        current_sum = max(nums[i], current_sum + nums[i])\n        max_sum = max(max_sum, current_sum)\n    \n    return max_sum\n\n\n\nimport sys\ninput_lines = sys.stdin.read().strip().split('\\n')\nn = int(input_lines[0])\nnums = list(map(int, input_lines[1].split()))\n\nprint(max_sub_array(nums))",
      "JAVASCRIPT": "function maxSubArray(nums) {\n    let maxSum = nums[0];\n    let currentSum = nums[0];\n    \n    for (let i = 1; i < nums.length; i++) {\n        currentSum = Math.max(nums[i], currentSum + nums[i]);\n        maxSum = Math.max(maxSum, currentSum);\n    }\n    \n    return maxSum;\n}\n\n\n\nconst fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst n = parseInt(input[0]);\nconst nums = input[1].split(' ').map(Number);\n\nconsole.log(maxSubArray(nums));"
    },
    "codeSnippets": {
      "JAVA": "import java.util.*;\nimport java.util.Scanner;\n\nclass Solution {\n    public  int maxSubArray(int[] nums) {\n        // Write your code here\n        return 0;\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) {\n            nums[i] = sc.nextInt();\n        }\n\n        Solution solution = new Solution();  // Create an instance of Solution\n        System.out.println(solution.maxSubArray(nums));  // Call the method using the instance\n    }\n}\n",
      "PYTHON": "def max_sub_array(nums):\n    # write you code here\n\nimport sys\ninput_lines = sys.stdin.read().strip().split('\\n')\nn = int(input_lines[0])\nnums = list(map(int, input_lines[1].split()))\n\nprint(max_sub_array(nums))",
      "JAVASCRIPT": "function maxSubArray(nums) {\n // write your code here\n}\n\n\nconst fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst n = parseInt(input[0]);\nconst nums = input[1].split(' ').map(Number);\n\nconsole.log(maxSubArray(nums));"
    }
  },
  {
    "title": "Two Sum",
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
    "difficulty": "EASY",
    "tags": [
      "Array",
      "Hashmap",
      "Two-pointer"
    ],
    "examples": {
      "JAVA": {
        "input": "[2,7,11,15]\n9",
        "output": "[0,1]",
        "explanation": "nums[0] + nums[1] == 9, so we return [0, 1]."
      },
      "PYTHON": {
        "input": "[2,7,11,15]\n9",
        "output": "[0,1]",
        "explanation": "nums[0] + nums[1] == 9, so we return [0, 1]."
      },
      "JAVASCRIPT": {
        "input": "[2,7,11,15]\n9",
        "output": "[0,1]",
        "explanation": "nums[0] + nums[1] == 9, so we return [0, 1]."
      }
    },
    "constraints": "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.",
    "hints": "Use a hashmap to store the numbers and their indices.",
    "editorial": "The optimal solution is to use a hashmap to store the numbers and their indices. Iterate through the array and check if the complement of the current number exists in the hashmap. If it does, return the indices of the two numbers. Otherwise, add the current number and its index to the hashmap.",
    "testcases": [
      {
        "input": "[3,2,4]\n6",
        "output": "[1,2]\n"
      },
      {
        "input": "[3,3]\n6",
        "output": "[0,1]\n"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.HashMap;\nimport java.util.Map;\nimport java.util.Arrays;\nimport java.util.Scanner;\n\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> numMap = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (numMap.containsKey(complement)) {\n                return new int[] { numMap.get(complement), i };\n            }\n            numMap.put(nums[i], i);\n        }\n        return null;\n    }\n}\n\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String numsLine = scanner.nextLine();\n        int[] nums = Arrays.stream(numsLine.substring(1, numsLine.length() - 1).split(\",\")).map(String::trim).mapToInt(Integer::parseInt).toArray();\n        int target = scanner.nextInt();\n        Solution solution = new Solution();\n        int[] result = solution.twoSum(nums, target);\n        System.out.print(\"[\");\n        for (int i = 0; i < result.length; i++) {\n        System.out.print(result[i]);\n        if (i != result.length - 1) System.out.print(\",\");\n        }\n        System.out.println(\"]\");\n        scanner.close();\n    }\n}",
      "PYTHON": "def twoSum(nums, target):\n    numMap = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in numMap:\n            return [numMap[complement], i]\n        numMap[num] = i\n\nimport json\nimport sys\n\nnums = json.loads(sys.stdin.readline())\ntarget = int(sys.stdin.readline())\nprint(json.dumps(twoSum(nums, target), separators=(',', ':')))",
      "JAVASCRIPT": "function twoSum(nums, target) {\n  const numMap = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (numMap.has(complement)) {\n      return [numMap.get(complement), i];\n    }\n    numMap.set(nums[i], i);\n  }\n}\n\nconst readline = require('readline').createInterface({\n  input: process.stdin,\n  output: process.stdout,\n});\n\nlet nums;\nlet target;\nlet lineCount = 0;\n\nreadline.on('line', (line) => {\n  lineCount++;\n  if (lineCount === 1) {\n    nums = JSON.parse(line);\n  } else if (lineCount === 2) {\n    target = parseInt(line);\n    const result = twoSum(nums, target);\n    console.log(JSON.stringify(result));\n    readline.close();\n  }\n});"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Arrays;\nimport java.util.Scanner;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Code here\n    }\n}\n\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String numsLine = scanner.nextLine();\n        int[] nums = Arrays.stream(numsLine.substring(1, numsLine.length() - 1).split(\",\")).map(String::trim).mapToInt(Integer::parseInt).toArray();\n        int target = scanner.nextInt();\n        Solution solution = new Solution();\n        int[] result = solution.twoSum(nums, target);\n        System.out.print(\"[\");\n        for (int i = 0; i < result.length; i++) {\n        System.out.print(result[i]);\n        if (i != result.length - 1) System.out.print(\",\");\n        }\n        System.out.println(\"]\");\n        scanner.close();\n    }\n}",
      "PYTHON": "def twoSum(nums, target):\n    # Code here\n\nimport json\nimport sys\n\nnums = json.loads(sys.stdin.readline())\ntarget = int(sys.stdin.readline())\nprint(json.dumps(twoSum(nums, target), separators=(',', ':')))",
      "JAVASCRIPT": "function twoSum(nums, target) {\n  // Code here\n}\n\nconst readline = require('readline').createInterface({\n  input: process.stdin,\n  output: process.stdout,\n});\n\nlet nums;\nlet target;\nlet lineCount = 0;\n\nreadline.on('line', (line) => {\n  lineCount++;\n  if (lineCount === 1) {\n    nums = JSON.parse(line);\n  } else if (lineCount === 2) {\n    target = parseInt(line);\n    const result = twoSum(nums, target);\n    console.log(JSON.stringify(result));\n    readline.close();\n  }\n});"
    }
  },
  {
    "title": "First Unique Character in a String",
    "description": "Given a string s, find the first non-repeating character and return its index. If it doesn't exist, return -1.",
    "difficulty": "MEDIUM",
    "tags": [
      "String",
      "Hash Table"
    ],
    "examples": {
      "JAVA": {
        "input": "aabb\n",
        "output": "-1",
        "explanation": "There is no unique character."
      },
      "PYTHON": {
        "input": "loveleetcode\n",
        "output": "0",
        "explanation": "The first unique character is 'l' at index 0."
      },
      "JAVASCRIPT": {
        "input": "leetcode\n",
        "output": "0",
        "explanation": "The first unique character is 'l' at index 0."
      }
    },
    "constraints": "1 <= s.length <= 10⁵\ns consists of only lowercase English letters.",
    "hints": "Use a hash map to store character counts and a second pass to find the first unique.",
    "editorial": "",
    "testcases": [
      {
        "input": "leetcode",
        "output": "0"
      },
      {
        "input": "loveleetcode",
        "output": "2"
      },
      {
        "input": "aabbcc",
        "output": "-1"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.*;\r\n\r\nclass Solution {\r\n    // Returns the index of the first non-repeating character in a string\r\n    public int firstUniqChar(String s) {\r\n        int[] count = new int[26];\r\n        for (char c : s.toCharArray()) {\r\n            count[c - 'a']++;\r\n        }\r\n        for (int i = 0; i < s.length(); i++) {\r\n            if (count[s.charAt(i) - 'a'] == 1) return i;\r\n        }\r\n        return -1;\r\n    }\r\n}\r\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        sc.close();\n\n        Solution solution = new Solution();\n        int result = solution.firstUniqChar(s);\n\n        System.out.println(result);\n    }\n}\n",
      "PYTHON": "# Add your reference solution here\r\ndef firstUniqChar(s):\r\n    count = {}\r\n    for c in s:\r\n        count[c] = count.get(c, 0) + 1\r\n    for i, c in enumerate(s):\r\n        if count[c] == 1:\r\n            return i\r\n    return -1\r\n\n\n\nif __name__ == \"__main__\":\n    import sys\n    s = sys.stdin.read().strip()\n    print(firstUniqChar(s))\n",
      "JAVASCRIPT": "// Add your reference solution here\nfunction firstUniqChar(s) {\n    const count = {};\n    for (const char of s) {\n        count[char] = (count[char] || 0) + 1;\n    }\n    for (let i = 0; i < s.length; i++) {\n        if (count[s[i]] === 1) return i;\n    }\n    return -1;\n}\n\n\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nlet input = \"\";\n\nrl.on('line', line => input += line);\nrl.on('close', () => {\n    const result = firstUniqChar(input.trim());\n    console.log(result);\n});\n"
    },
    "codeSnippets": {
      "JAVA": "import java.util.*;\n\npublic class Solution {\n    // TODO: Implement this method to find the index of the first non-repeating character\n    public int firstUniqChar(String s) {\n        // Your code here\n        return -1;\n    }\n}\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        sc.close();\n\n        Solution solution = new Solution();\n        int result = solution.firstUniqChar(s);\n\n        System.out.println(result);\n    }\n}\n",
      "PYTHON": "def firstUniqChar(s):\n    # Write your code here\n    pass\n\n\nif __name__ == \"__main__\":\n    import sys\n    s = sys.stdin.read().strip()\n    print(firstUniqChar(s))\n",
      "JAVASCRIPT": "function firstUniqChar(s) {\n    // Write your code here\n}\n\n\n\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nlet input = \"\";\n\nrl.on('line', line => input += line);\nrl.on('close', () => {\n    const result = firstUniqChar(input.trim());\n    console.log(result);\n});\n"
    }
  },
  {
    "title": "Number of Islands",
    "description": "Given a 2D grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are surrounded by water.",
    "difficulty": "MEDIUM",
    "tags": [
      "Graph",
      "DFS ",
      "BFS "
    ],
    "examples": {
      "JAVA": {
        "input": "11110\n11010\n11000\n00000",
        "output": "1",
        "explanation": "There is only one island formed by the top-left connected land."
      },
      "PYTHON": {
        "input": "11000\n11000\n00100\n00011",
        "output": "3",
        "explanation": "There are 3 separate islands: top-left, middle, and bottom-right."
      },
      "JAVASCRIPT": {
        "input": "11000\n11000\n00100\n00011",
        "output": "3",
        "explanation": "Each island is counted once regardless of size."
      }
    },
    "constraints": "m == grid.length\nn == grid[i].length\n1 <= m, n <= 300\ngrid[i][j] is '0' or '1'.",
    "hints": "Use DFS or BFS to visit all cells in an island. Mark visited cells to avoid reprocessing.",
    "editorial": "To solve the Number of Islands problem, we use Depth-First Search (DFS). We iterate through each cell in the 2D grid, and whenever we encounter a '1' (land), it means we've found a new island. We then perform a DFS from that cell, marking all connected land cells as '0' to avoid revisiting them. This way, each DFS call \"sinks\" one island. By counting how many times we initiate a DFS, we determine the total number of islands. This approach ensures each land cell is visited only once, resulting in an efficient solution with O(M × N) time and space complexity, where M is the number of rows and N is the number of columns.",
    "testcases": [
      {
        "input": "11110\n11010\n11000\n00000",
        "output": "1"
      },
      {
        "input": "11000\n11000\n00100\n00011",
        "output": "3"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.*;\n\nclass Solution {\n    public static int numIslands(char[][] grid) {\n        if (grid == null || grid.length == 0) return 0;\n        int count = 0;\n        \n        for (int i = 0; i < grid.length; i++) {\n            for (int j = 0; j < grid[0].length; j++) {\n                if (grid[i][j] == '1') {\n                    dfs(grid, i, j);\n                    count++;\n                }\n            }\n        }\n        \n        return count;\n    }\n\n    private static void dfs(char[][] grid, int i, int j) {\n        if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] == '0') return;\n\n        grid[i][j] = '0'; // mark as visited\n        dfs(grid, i + 1, j); // down\n        dfs(grid, i - 1, j); // up\n        dfs(grid, i, j + 1); // right\n        dfs(grid, i, j - 1); // left\n    }\n}\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<String> rows = new ArrayList<>();\n\n        while (sc.hasNextLine()) {\n            String line = sc.nextLine().trim();\n            if (line.isEmpty()) break;  // Optional: skip on empty line\n            rows.add(line);\n        }\n\n        char[][] grid = new char[rows.size()][];\n        for (int i = 0; i < rows.size(); i++) {\n            grid[i] = rows.get(i).toCharArray();\n        }\n\n        System.out.println(Solution.numIslands(grid));\n    }\n}\n",
      "PYTHON": "def numIslands(grid):\n    if not grid: return 0\n    count = 0\n    rows, cols = len(grid), len(grid[0])\n\n    def dfs(i, j):\n        if i < 0 or j < 0 or i >= rows or j >= cols or grid[i][j] != '1':\n            return\n        grid[i][j] = '0'\n        dfs(i+1, j)\n        dfs(i-1, j)\n        dfs(i, j+1)\n        dfs(i, j-1)\n\n    for i in range(rows):\n        for j in range(cols):\n            if grid[i][j] == '1':\n                dfs(i, j)\n                count += 1\n    return count\n\n\n\nif __name__ == '__main__':\n    import sys\n    lines = sys.stdin.read().strip().split('\\n')\n    grid = [list(line) for line in lines]\n    print(numIslands(grid))",
      "JAVASCRIPT": "function numIslands(grid) {\n    if (!grid.length) return 0;\n    let count = 0;\n    const rows = grid.length, cols = grid[0].length;\n    function dfs(i, j) {\n        if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] !== '1') return;\n        grid[i][j] = '0';\n        dfs(i+1, j);\n        dfs(i-1, j);\n        dfs(i, j+1);\n        dfs(i, j-1);\n    }\n    for (let i = 0; i < rows; i++) {\n        for (let j = 0; j < cols; j++) {\n            if (grid[i][j] === '1') {\n                dfs(i, j);\n                count++;\n            }\n        }\n    }\n    return count;\n}\n\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nconst input = [];\nrl.on('line', line => input.push(line));\nrl.on('close', () => {\n    const grid = input.map(row => row.split(''));\n    console.log(numIslands(grid));\n});"
    },
    "codeSnippets": {
      "JAVA": "import java.util.*;\n\nclass Solution {\n    public static int numIslands(char[][] grid) {\n        // TODO: Implement DFS solution here\n        return 0;\n    }\n\n    private static void dfs(char[][] grid, int i, int j) {\n        // TODO: DFS logic to mark visited '1's\n    }\n}\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        List<String> rows = new ArrayList<>();\n\n        while (sc.hasNextLine()) {\n            String line = sc.nextLine().trim();\n            if (line.isEmpty()) break;  // Optional: skip on empty line\n            rows.add(line);\n        }\n\n        char[][] grid = new char[rows.size()][];\n        for (int i = 0; i < rows.size(); i++) {\n            grid[i] = rows.get(i).toCharArray();\n        }\n\n        System.out.println(Solution.numIslands(grid));\n    }\n}\n",
      "PYTHON": "def numIslands(grid):\n    # Implement here\n    return 0\n\n\nif __name__ == '__main__':\n    import sys\n    lines = sys.stdin.read().strip().split('\\n')\n    grid = [list(line) for line in lines]\n    print(numIslands(grid))",
      "JAVASCRIPT": "function numIslands(grid) {\n    // Implement here\n    return 0;\n}\n\n\n\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin });\nconst input = [];\nrl.on('line', line => input.push(line));\nrl.on('close', () => {\n    const grid = input.map(row => row.split(''));\n    console.log(numIslands(grid));\n});"
    }
  },
  {
    "title": "Longest Palindromic Substring",
    "description": "Given a string s, return the longest palindromic substring in s.\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
    "difficulty": "MEDIUM",
    "tags": [
      "String",
      "Dynamic Programming",
      "Algorithm"
    ],
    "examples": {
      "JAVA": {
        "input": "a",
        "output": "a"
      },
      "PYTHON": {
        "input": "cbbd",
        "output": "bb"
      },
      "JAVASCRIPT": {
        "input": "babad",
        "output": "bab",
        "explanation": "\"bab\" is a palindromic substring, but \"aba\" is also valid."
      }
    },
    "constraints": "1 <= s.length <= 1000\ns consists of only digits and English letters.",
    "hints": "How can you reuse a previously computed palindrome to compute a larger palindrome?",
    "editorial": "One approach is dynamic programming. Let dp[i][j] be true if the substring s[i...j] is a palindrome, and false otherwise. Then dp[i][j] = (s[i] == s[j]) && dp[i+1][j-1]. The base cases are dp[i][i] = true and dp[i][i+1] = (s[i] == s[i+1]).",
    "testcases": [
      {
        "input": "babad",
        "output": "bab"
      },
      {
        "input": "cbbd",
        "output": "bb"
      },
      {
        "input": "a",
        "output": "a"
      },
      {
        "input": "ac",
        "output": "a"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    public String longestPalindrome(String s) {\n        int n = s.length();\n        boolean[][] dp = new boolean[n][n];\n        int start = 0;\n        int maxLength = 1;\n\n        for (int i = 0; i < n; i++) {\n            dp[i][i] = true;\n        }\n\n        for (int i = 0; i < n - 1; i++) {\n            if (s.charAt(i) == s.charAt(i + 1)) {\n                dp[i][i + 1] = true;\n                start = i;\n                maxLength = 2;\n            }\n        }\n\n        for (int k = 3; k <= n; k++) {\n            for (int i = 0; i < n - k + 1; i++) {\n                int j = i + k - 1;\n                if (s.charAt(i) == s.charAt(j) && dp[i + 1][j - 1]) {\n                    dp[i][j] = true;\n                    if (k > maxLength) {\n                        start = i;\n                        maxLength = k;\n                    }\n                }\n            }\n        }\n\n        return s.substring(start, start + maxLength);\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String s = scanner.nextLine();\n        Solution sol = new Solution();\n        String result = sol.longestPalindrome(s);\n        System.out.println(result);\n    }\n}\n",
      "PYTHON": "# Python program to find the longest\n# palindromic substring.\n\n# Function to check if a substring \n# s[low..high] is a palindrome\ndef checkPal(str, low, high):\n    while low < high:\n        if str[low] != str[high]:\n            return False\n        low += 1\n        high -= 1\n    return True\n\n# Function to find the longest palindrome substring\ndef longestPalindrome(s):\n    \n    # Get length of input string\n    n = len(s)\n\n    # All substrings of length 1 are palindromes\n    maxLen = 1\n    start = 0\n\n    # Nested loop to mark start and end index\n    for i in range(n):\n        for j in range(i, n):\n\n            # Check if the current substring is \n            # a palindrome\n            if checkPal(s, i, j) and (j - i + 1) > maxLen:\n                start = i\n                maxLen = j - i + 1\n\n    return s[start:start + maxLen]\n\nimport sys\n\nif __name__ == \"__main__\":\n    s = sys.stdin.readline().strip()\n    result = longestPalindrome(s)\n    print(result)",
      "JAVASCRIPT": "// JavaScript program to find the longest\n// palindromic substring.\n\n// Function to check if a substring \n// s[low..high] is a palindrome\nfunction checkPal(s, low, high) {\n    while (low < high) {\n        if (s[low] !== s[high])\n            return false;\n        low++;\n        high--;\n    }\n    return true;\n}\n\n// Function to find the longest palindrome substring\nfunction longestPalindrome(s) {\n\n    // Get length of input string\n    const n = s.length;\n\n    // All substrings of length 1 are palindromes\n    let maxLen = 1, start = 0;\n\n    // Nested loop to mark start and end index\n    for (let i = 0; i < n; i++) {\n        for (let j = i; j < n; j++) {\n\n            // Check if the current substring is \n            // a palindrome\n            if (checkPal(s, i, j) && (j - i + 1) > maxLen) {\n                start = i;\n                maxLen = j - i + 1;\n            }\n        }\n    }\n\n    return s.substring(start, start + maxLen);\n}\n\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nrl.on('line', (line) => {\n  const s = line.trim();\n  const result = longestPalindrome(s);\n  console.log(result);\n  rl.close();\n});"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    public String longestPalindrome(String s) {\n        \n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String s = scanner.nextLine();\n        Solution sol = new Solution();\n        String result = sol.longestPalindrome(s);\n        System.out.println(result);\n    }\n}\n",
      "PYTHON": "def longestPalindrome(s):\n    # Your solution here\n    return s \n\nimport sys\n\nif __name__ == \"__main__\":\n    s = sys.stdin.readline().strip()\n    result = longestPalindrome(s)\n    print(result)",
      "JAVASCRIPT": "/**\n * @param {string} s\n * @return {string}\n */\nvar longestPalindrome = function(s) {\n    \n};\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nrl.on('line', (line) => {\n  const s = line.trim();\n  const result = longestPalindrome(s);\n  console.log(result);\n  rl.close();\n});"
    }
  },
  {
    "title": "Factorial",
    "description": "Calculate the factorial of a given non-negative integer n\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
    "difficulty": "MEDIUM",
    "tags": [
      "Math",
      "Algorithm",
      "Iteration"
    ],
    "examples": {
      "JAVA": {
        "input": "3",
        "output": "6"
      },
      "PYTHON": {
        "input": "4",
        "output": "24"
      },
      "JAVASCRIPT": {
        "input": "7",
        "output": "5040",
        "explanation": "7! = 7 * 6 * 5 * 4 * 3 * 2 * 1 = 5040"
      }
    },
    "constraints": "0 <= n <= 25",
    "hints": "Since 64-bit integers are not allowed, consider using an array to store the digits of the factorial.",
    "editorial": "Represent the factorial as an array of digits. Iterate from 1 to n, multiplying the current array by i in each step. Implement multiplication with carry-over to handle large numbers.",
    "testcases": [
      {
        "input": "5",
        "output": "120"
      },
      {
        "input": "10",
        "output": "3628800"
      },
      {
        "input": "0",
        "output": "1"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n  public int factorial(int n) {\n    if (n == 0) {\n      return 1;\n    }\n    int result = 1;\n    for (int i = 1; i <= n; i++) {\n      result *= i;\n    }\n    return result;\n  }\n}\n\nclass Main {\n  public static void main(String[] args) {\n    Scanner scanner = new Scanner(System.in);\n    int n = scanner.nextInt();\n    Solution solution = new Solution();\n    System.out.println(solution.factorial(n));\n  }\n}",
      "PYTHON": "def factorial(n):\n  if n == 0:\n    return 1\n  result = 1\n  for i in range(1, n + 1):\n    result *= i\n  return result\n\nn = int(input())\nprint(factorial(n))",
      "JAVASCRIPT": "function factorial(n) {\n  if (n === 0) {\n    return 1;\n  }\n  let result = 1;\n  for (let i = 1; i <= n; i++) {\n    result *= i;\n  }\n  return result;\n}\n\nlet input = '';\nprocess.stdin.on('data', chunk => {\n  input += chunk;\n});\n\nprocess.stdin.on('end', () => {\n  const n = parseInt(input.trim());\n  console.log(factorial(n));\n});"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n  public int factorial(int n) {\n    // Your code here\n    return 0;\n  }\n}\n\nclass Main {\n  public static void main(String[] args) {\n    Scanner scanner = new Scanner(System.in);\n    int n = scanner.nextInt();\n    Solution solution = new Solution();\n    System.out.println(solution.factorial(n));\n  }\n}",
      "PYTHON": "def factorial(n):\n  # Your code here\n  return 0\n\nn = int(input())\nprint(factorial(n))",
      "JAVASCRIPT": "function factorial(n) {\n  // Your code here\n}\n\nlet input = '';\nprocess.stdin.on('data', chunk => {\n  input += chunk;\n});\n\nprocess.stdin.on('end', () => {\n  const n = parseInt(input.trim());\n  console.log(factorial(n));\n});"
    }
  },
  {
    "title": "Reverse a String",
    "description": "Given a string, return the string reversed",
    "difficulty": "EASY",
    "tags": [
      "strings",
      "reverse",
      "manipulation"
    ],
    "examples": {
      "JAVA": {
        "input": "abdcfe",
        "output": "efcdba"
      },
      "PYTHON": {
        "input": "hello",
        "output": "olleh",
        "explanation": "Reversing 'hello' gives 'olleh'."
      },
      "JAVASCRIPT": {
        "input": "world",
        "output": "dlrow",
        "explanation": "Reversing 'world' gives 'dlrow'."
      }
    },
    "constraints": "1 ≤ length ≤ 10^4",
    "hints": "",
    "editorial": "",
    "testcases": [
      {
        "input": "programming",
        "output": "gnimmargorp"
      },
      {
        "input": "a",
        "output": "a"
      },
      {
        "input": "racecar",
        "output": "racecar"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    static String reverseString(String s) {\n        int left = 0, right = s.length() - 1;\n        StringBuilder res = new StringBuilder(s);\n        while (left < right) {\n            char temp = res.charAt(left);\n            res.setCharAt(left, res.charAt(right));\n            res.setCharAt(right, temp);\n            left++;\n            right--;\n        }\n        return res.toString();\n    }\n}\n\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String input = sc.nextLine();\n        System.out.println(Solution.reverseString(input));\n    }\n}",
      "PYTHON": "def reverseString(s):\n    left = 0\n    right = len(s) - 1\n    \n    # Convert string to a list for mutability\n    s = list(s)  \n    \n    # Swap characters from both ends till we reach\n    # the middle of the string\n    while left < right:\n        s[left], s[right] = s[right], s[left]\n        left += 1\n        right -= 1\n    \n    # Convert list back to string\n    return ''.join(s)  \n\ns = input()\nprint(reverseString(s))\n",
      "JAVASCRIPT": "function reverseString(s) {\n    let res = [];\n  \n    // Traverse on s in backward direction\n    // and add each character to the array\n    for (let i = s.length - 1; i >= 0; i--) {\n        res.push(s[i]);\n    }\n    return res.join('');\n}\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nrl.on('line', (input) => {\n  console.log(reverseString(input));\n  rl.close();\n});\n"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    static String reverseString(String str) {\n        // Write your code here\n        // Return the reversed string\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String input = sc.nextLine();\n        System.out.println(Solution.reverseString(input));\n    }\n}",
      "PYTHON": "def reverseString(s):\n    #  write your code here\n\ns = input()\nprint(reverseString(s))\n",
      "JAVASCRIPT": "function reverseString(s) {\n    // Write your code here\n}\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nrl.on('line', (input) => {\n  console.log(reverseString(input));\n  rl.close();\n});\n"
    }
  },
  {
    "title": "Longest Common Prefix",
    "description": "Write a function to find the longest common prefix string amongst an array of strings.\n\nIf there is no common prefix, return an empty string \"\".\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
    "difficulty": "EASY",
    "tags": [
      "String",
      "Algorithm"
    ],
    "examples": {
      "JAVA": {
        "input": "apple\napp\napplication",
        "output": "app",
        "explanation": "The longest common prefix for ['apple', 'app', 'application'] is 'app'."
      },
      "PYTHON": {
        "input": "dog\nracecar\ncar",
        "output": "",
        "explanation": "There is no common prefix among the input strings."
      },
      "JAVASCRIPT": {
        "input": "flower\nflow\nflight",
        "output": "fl",
        "explanation": "The longest common prefix for ['flower', 'flow', 'flight'] is 'fl'."
      }
    },
    "constraints": "1 <= strs.length <= 200\n0 <= strs[i].length <= 200\nstrs[i] consists of only lowercase English letters.",
    "hints": "Compare the first string with the rest. Start building the prefix from the shortest string.",
    "editorial": "Iterate through the characters of the first string. For each character, check if all other strings have the same character at the same index. If yes, append it to the result. If no, return the result.",
    "testcases": [
      {
        "input": "flower\nflow\nflight",
        "output": "fl"
      },
      {
        "input": "apple\napp\napplication",
        "output": "app"
      },
      {
        "input": "dog\nracecar\ncar",
        "output": ""
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    public String longestCommonPrefix(String[] strs) {\n        if (strs == null || strs.length == 0) {\n            return \"\";\n        }\n\n        String prefix = strs[0];\n        for (int i = 1; i < strs.length; i++) {\n            while (strs[i].indexOf(prefix) != 0) {\n                prefix = prefix.substring(0, prefix.length() - 1);\n                if (prefix.isEmpty()) {\n                    return \"\";\n                }\n            }\n        }\n\n        return prefix;\n    }\n}\n\npublic class Main {\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String[] strs = new String[3];\n        for (int i = 0; i < 3; i++) {\n            strs[i] = scanner.nextLine();\n        }\n\n        Solution solution = new Solution();\n        String result = solution.longestCommonPrefix(strs);\n        System.out.println(result);\n    }\n}\n\n",
      "PYTHON": "from typing import List\n\nclass Solution:\n    def longestCommonPrefix(self, strs: List[str]) -> str:\n        if not strs:\n            return \"\"\n        \n        prefix = strs[0]\n        for i in range(1, len(strs)):\n            while strs[i].find(prefix) != 0:\n                prefix = prefix[:-1]\n                if not prefix:\n                    return \"\"\n        \n        return prefix\n\nimport sys\n\ndef solve():\n    strs = []\n    for line in sys.stdin:\n        strs.append(line.strip())\n    \n    sol = Solution()\n    print(sol.longestCommonPrefix(strs))\n\n\nsolve()",
      "JAVASCRIPT": "/**\n * @param {string[]} strs\n * @return {string}\n */\nvar longestCommonPrefix = function(strs) {\n    if (!strs || strs.length === 0) {\n        return \"\";\n    }\n\n    let prefix = strs[0];\n    for (let i = 1; i < strs.length; i++) {\n        while (strs[i].indexOf(prefix) !== 0) {\n            prefix = prefix.substring(0, prefix.length - 1);\n            if (prefix === \"\") {\n                return \"\";\n            }\n        }\n    }\n\n    return prefix;\n};\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nlet inputLines = [];\n\nrl.on('line', (line) => {\n  inputLines.push(line);\n});\n\nrl.on('close', () => {\n  const strs = inputLines;\n  const result = longestCommonPrefix(strs);\n  console.log(result);\n});\n"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    public String longestCommonPrefix(String[] strs) {\n        \n    }\n}\n\npublic class Main {\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String[] strs = new String[3];\n        for (int i = 0; i < 3; i++) {\n            strs[i] = scanner.nextLine();\n        }\n\n        Solution solution = new Solution();\n        String result = solution.longestCommonPrefix(strs);\n        System.out.println(result);\n    }\n}\n\n",
      "PYTHON": "from typing import List\n\nclass Solution:\n    def longestCommonPrefix(self, strs: List[str]) -> str:\n        \n\nimport sys\n\ndef solve():\n    strs = []\n    for line in sys.stdin:\n        strs.append(line.strip())\n    \n    sol = Solution()\n    print(sol.longestCommonPrefix(strs))\n\n\nsolve()",
      "JAVASCRIPT": "/**\n * @param {string[]} strs\n * @return {string}\n */\nvar longestCommonPrefix = function(strs) {\n    \n};\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nlet inputLines = [];\n\nrl.on('line', (line) => {\n  inputLines.push(line);\n});\n\nrl.on('close', () => {\n  const strs = inputLines;\n  const result = longestCommonPrefix(strs);\n  console.log(result);\n});\n"
    }
  },
  {
    "title": "Roman to Integer",
    "description": "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nSymbol       Value\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
    "difficulty": "EASY",
    "tags": [
      "String",
      "Math",
      "Algorithm"
    ],
    "examples": {
      "JAVA": {
        "input": "IX",
        "output": "9",
        "explanation": "I = 1, X = 10"
      },
      "PYTHON": {
        "input": "LVIII",
        "output": "58",
        "explanation": "L = 50, V= 5, III = 3."
      },
      "JAVASCRIPT": {
        "input": "MCMXCIV",
        "output": "1994",
        "explanation": "M = 1000, CM = 900, XC = 90, IV = 4."
      }
    },
    "constraints": "1 <= s.length <= 15\ns contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').\nIt is guaranteed that s is a valid roman numeral in the range [1, 3999].",
    "hints": "Iterate through the Roman numeral string from right to left. If the current value is less than the next value, subtract it; otherwise, add it.",
    "editorial": "The optimal solution involves iterating through the Roman numeral string from right to left. A hashmap is used to store the values of each Roman numeral character. When a smaller value precedes a larger value (e.g., 'IV'), we subtract the smaller value; otherwise, we add the value. This approach ensures we correctly handle subtractive notation.",
    "testcases": [
      {
        "input": "III",
        "output": "3"
      },
      {
        "input": "IV",
        "output": "4"
      },
      {
        "input": "IX",
        "output": "9"
      },
      {
        "input": "LVIII",
        "output": "58"
      },
      {
        "input": "MCMXCIV",
        "output": "1994"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.HashMap;\nimport java.util.Scanner;\n\nclass Solution {\n    /**\n     * @param {string} s\n     * @return {number}\n     */\n    public int romanToInt(String s) {\n        HashMap<Character, Integer> romanMap = new HashMap<>();\n        romanMap.put('I', 1);\n        romanMap.put('V', 5);\n        romanMap.put('X', 10);\n        romanMap.put('L', 50);\n        romanMap.put('C', 100);\n        romanMap.put('D', 500);\n        romanMap.put('M', 1000);\n\n        int result = 0;\n        for (int i = 0; i < s.length(); i++) {\n            if (i + 1 < s.length() && romanMap.get(s.charAt(i)) < romanMap.get(s.charAt(i + 1))) {\n                result -= romanMap.get(s.charAt(i));\n            } else {\n                result += romanMap.get(s.charAt(i));\n            }\n        }\n        return result;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String s = scanner.nextLine();\n        Solution sol = new Solution();\n        System.out.println(sol.romanToInt(s));\n    }\n}",
      "PYTHON": "def romanToInt(s: str) -> int:\n    roman_map = {\n        'I': 1,\n        'V': 5,\n        'X': 10,\n        'L': 50,\n        'C': 100,\n        'D': 500,\n        'M': 1000\n    }\n    \n    result = 0\n    for i in range(len(s)):\n        if i + 1 < len(s) and roman_map[s[i]] < roman_map[s[i+1]]:\n            result -= roman_map[s[i]]\n        else:\n            result += roman_map[s[i]]\n    return result\n\nimport sys\n\nline = sys.stdin.readline().strip()\nprint(romanToInt(line))",
      "JAVASCRIPT": "/**\n * @param {string} s\n * @return {number}\n */\nvar romanToInt = function(s) {\n    const romanMap = {\n        'I': 1,\n        'V': 5,\n        'X': 10,\n        'L': 50,\n        'C': 100,\n        'D': 500,\n        'M': 1000\n    };\n\n    let result = 0;\n    for (let i = 0; i < s.length; i++) {\n        const currentValue = romanMap[s[i]];\n        const nextValue = romanMap[s[i + 1]];\n\n        if (nextValue && currentValue < nextValue) {\n            result -= currentValue;\n        } else {\n            result += currentValue;\n        }\n    }\n    return result;\n};\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on('line', (input) => {\n    console.log(romanToInt(input.trim()));\n    rl.close();\n});"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    /**\n     * @param {string} s\n     * @return {number}\n     */\n    public int romanToInt(String s) {\n        // Code here\n        return 0;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String s = scanner.nextLine();\n        Solution sol = new Solution();\n        System.out.println(sol.romanToInt(s));\n    }\n}",
      "PYTHON": "def romanToInt(s: str) -> int:\n    # Code here\n    return 0\n\nimport sys\n\nline = sys.stdin.readline().strip()\nprint(romanToInt(line))",
      "JAVASCRIPT": "/**\n * @param {string} s\n * @return {number}\n */\nvar romanToInt = function(s) {\n    // Code here\n};\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on('line', (input) => {\n    console.log(romanToInt(input.trim()));\n    rl.close();\n});"
    }
  },
  {
    "title": "Roman to Integer",
    "description": "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nSymbol       Value\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).",
    "difficulty": "EASY",
    "tags": [
      "String",
      "Math",
      "Algorithm"
    ],
    "examples": {
      "JAVA": {
        "input": "IX",
        "output": "9",
        "explanation": "I = 1, X = 10"
      },
      "PYTHON": {
        "input": "LVIII",
        "output": "58",
        "explanation": "L = 50, V= 5, III = 3."
      },
      "JAVASCRIPT": {
        "input": "MCMXCIV",
        "output": "1994",
        "explanation": "M = 1000, CM = 900, XC = 90, IV = 4."
      }
    },
    "constraints": "1 <= s.length <= 15\ns contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').\nIt is guaranteed that s is a valid roman numeral in the range [1, 3999].",
    "hints": "Iterate through the Roman numeral string from right to left. If the current value is less than the next value, subtract it; otherwise, add it.",
    "editorial": "The optimal solution involves iterating through the Roman numeral string from right to left. A hashmap is used to store the values of each Roman numeral character. When a smaller value precedes a larger value (e.g., 'IV'), we subtract the smaller value; otherwise, we add the value. This approach ensures we correctly handle subtractive notation.",
    "testcases": [
      {
        "input": "III",
        "output": "3"
      },
      {
        "input": "IV",
        "output": "4"
      },
      {
        "input": "IX",
        "output": "9"
      },
      {
        "input": "LVIII",
        "output": "58"
      },
      {
        "input": "MCMXCIV",
        "output": "1994"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.HashMap;\nimport java.util.Scanner;\n\nclass Solution {\n    /**\n     * @param {string} s\n     * @return {number}\n     */\n    public int romanToInt(String s) {\n        HashMap<Character, Integer> romanMap = new HashMap<>();\n        romanMap.put('I', 1);\n        romanMap.put('V', 5);\n        romanMap.put('X', 10);\n        romanMap.put('L', 50);\n        romanMap.put('C', 100);\n        romanMap.put('D', 500);\n        romanMap.put('M', 1000);\n\n        int result = 0;\n        for (int i = 0; i < s.length(); i++) {\n            if (i + 1 < s.length() && romanMap.get(s.charAt(i)) < romanMap.get(s.charAt(i + 1))) {\n                result -= romanMap.get(s.charAt(i));\n            } else {\n                result += romanMap.get(s.charAt(i));\n            }\n        }\n        return result;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String s = scanner.nextLine();\n        Solution sol = new Solution();\n        System.out.println(sol.romanToInt(s));\n    }\n}",
      "PYTHON": "def romanToInt(s: str) -> int:\n    roman_map = {\n        'I': 1,\n        'V': 5,\n        'X': 10,\n        'L': 50,\n        'C': 100,\n        'D': 500,\n        'M': 1000\n    }\n    \n    result = 0\n    for i in range(len(s)):\n        if i + 1 < len(s) and roman_map[s[i]] < roman_map[s[i+1]]:\n            result -= roman_map[s[i]]\n        else:\n            result += roman_map[s[i]]\n    return result\n\nimport sys\n\nline = sys.stdin.readline().strip()\nprint(romanToInt(line))",
      "JAVASCRIPT": "/**\n * @param {string} s\n * @return {number}\n */\nvar romanToInt = function(s) {\n    const romanMap = {\n        'I': 1,\n        'V': 5,\n        'X': 10,\n        'L': 50,\n        'C': 100,\n        'D': 500,\n        'M': 1000\n    };\n\n    let result = 0;\n    for (let i = 0; i < s.length; i++) {\n        const currentValue = romanMap[s[i]];\n        const nextValue = romanMap[s[i + 1]];\n\n        if (nextValue && currentValue < nextValue) {\n            result -= currentValue;\n        } else {\n            result += currentValue;\n        }\n    }\n    return result;\n};\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on('line', (input) => {\n    console.log(romanToInt(input.trim()));\n    rl.close();\n});"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Scanner;\n\nclass Solution {\n    /**\n     * @param {string} s\n     * @return {number}\n     */\n    public int romanToInt(String s) {\n        // Code here\n        return 0;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String s = scanner.nextLine();\n        Solution sol = new Solution();\n        System.out.println(sol.romanToInt(s));\n    }\n}",
      "PYTHON": "def romanToInt(s: str) -> int:\n    # Code here\n    return 0\n\nimport sys\n\nline = sys.stdin.readline().strip()\nprint(romanToInt(line))",
      "JAVASCRIPT": "/**\n * @param {string} s\n * @return {number}\n */\nvar romanToInt = function(s) {\n    // Code here\n};\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nrl.on('line', (input) => {\n    console.log(romanToInt(input.trim()));\n    rl.close();\n});"
    }
  },
  {
    "title": "Climbing Stairs",
    "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    "difficulty": "HARD",
    "tags": [
      "Dynamic Programming",
      "Math",
      "Memoization"
    ],
    "examples": {
      "JAVA": {
        "input": "n = 4",
        "output": "5",
        "explanation": "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps"
      },
      "PYTHON": {
        "input": "n = 3",
        "output": "3",
        "explanation": "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
      },
      "JAVASCRIPT": {
        "input": "n = 2",
        "output": "2",
        "explanation": "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps"
      }
    },
    "constraints": "1 <= n <= 45",
    "hints": "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
    "editorial": "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
    "testcases": [
      {
        "input": "2",
        "output": "2"
      },
      {
        "input": "3",
        "output": "3"
      },
      {
        "input": "4",
        "output": "5"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.Scanner;\n    \n    class Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) return n;\n  \n        int[] dp = new int[n + 1];\n        dp[1] = 1;\n        dp[2] = 2;\n  \n        for (int i = 3; i <= n; i++) {\n            dp[i] = dp[i - 1] + dp[i - 2];\n        }\n  \n        return dp[n];\n  \n        /* Alternative with O(1) space\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int temp = a + b;\n            a = b;\n            b = temp;\n        }\n        return n == 1 ? a : b;\n        */\n    }\n  }\n\n\n  public class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int n = Integer.parseInt(scanner.nextLine().trim());\n  \n        Solution sol = new Solution();\n        int result = sol.climbStairs(n);\n  \n        System.out.println(result);\n        scanner.close();\n    }\n  }",
      "PYTHON": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        if n <= 2:\n            return n\n        \n        dp = [0] * (n + 1)\n        dp[1] = 1\n        dp[2] = 2\n        \n        for i in range(3, n + 1):\n            dp[i] = dp[i - 1] + dp[i - 2]\n        \n        return dp[n]\n  \n        # Alternative with O(1) space:\n        # a, b = 1, 2\n        # for i in range(3, n + 1):\n        #     a, b = b, a + b\n        # return a if n == 1 else b\n\nif __name__ == \"__main__\":\n    import sys\n    n = int(sys.stdin.readline().strip())\n    sol = Solution()\n    result = sol.climbStairs(n)\n    print(result)",
      "JAVASCRIPT": "/**\n  * @param {number} n\n  * @return {number}\n  */\n  function climbStairs(n) {\n    // Base cases\n    if (n <= 2) return n;\n  \n    // Dynamic programming approach\n    let dp = new Array(n + 1);\n    dp[1] = 1;\n    dp[2] = 2;\n  \n    for (let i = 3; i <= n; i++) {\n      dp[i] = dp[i - 1] + dp[i - 2];\n    }\n  \n    return dp[n];\n    \n    /* Alternative approach with O(1) space\n    let a = 1, b = 2;\n    for (let i = 3; i <= n; i++) {\n      let temp = a + b;\n      a = b;\n      b = temp;\n    }\n    return n === 1 ? a : b;\n    */\n  }\n\nconst readline = require('readline');\n  const rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout,\n    terminal: false\n  });\n  \n  rl.on('line', (line) => {\n    const n = parseInt(line.trim());\n    const result = climbStairs(n);\n    console.log(result);\n    rl.close();\n  });"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Scanner;\n  \n    public class Solution {\n    public int climbStairs(int n) {\n        // Write your code here\n        return 0;\n    }\n  }\n\n\n  public class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int n = Integer.parseInt(scanner.nextLine().trim());\n  \n        Solution sol = new Solution();\n        int result = sol.climbStairs(n);\n  \n        System.out.println(result);\n        scanner.close();\n    }\n  }",
      "PYTHON": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        # Write your code here\n        pass\n\nif __name__ == \"__main__\":\n    import sys\n    n = int(sys.stdin.readline().strip())\n    sol = Solution()\n    result = sol.climbStairs(n)\n    print(result)",
      "JAVASCRIPT": "/**\n  * @param {number} n\n  * @return {number}\n  */\n  function climbStairs(n) {\n    // Write your code here\n  }\n\nconst readline = require('readline');\n  const rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout,\n    terminal: false\n  });\n  \n  rl.on('line', (line) => {\n    const n = parseInt(line.trim());\n    const result = climbStairs(n);\n    console.log(result);\n    rl.close();\n  });"
    }
  },
  {
    "title": "Climbing Stairs",
    "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    "difficulty": "HARD",
    "tags": [
      "Dynamic Programming",
      "Math",
      "Memoization"
    ],
    "examples": {
      "JAVA": {
        "input": "n = 4",
        "output": "5",
        "explanation": "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps"
      },
      "PYTHON": {
        "input": "n = 3",
        "output": "3",
        "explanation": "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
      },
      "JAVASCRIPT": {
        "input": "n = 2",
        "output": "2",
        "explanation": "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps"
      }
    },
    "constraints": "1 <= n <= 45",
    "hints": "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
    "editorial": "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
    "testcases": [
      {
        "input": "2",
        "output": "2"
      },
      {
        "input": "3",
        "output": "3"
      },
      {
        "input": "4",
        "output": "5"
      }
    ],
    "referenceSolutions": {
      "JAVA": "import java.util.Scanner;\n    \n    class Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) return n;\n  \n        int[] dp = new int[n + 1];\n        dp[1] = 1;\n        dp[2] = 2;\n  \n        for (int i = 3; i <= n; i++) {\n            dp[i] = dp[i - 1] + dp[i - 2];\n        }\n  \n        return dp[n];\n  \n        /* Alternative with O(1) space\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int temp = a + b;\n            a = b;\n            b = temp;\n        }\n        return n == 1 ? a : b;\n        */\n    }\n  }\n\n\n  public class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int n = Integer.parseInt(scanner.nextLine().trim());\n  \n        Solution sol = new Solution();\n        int result = sol.climbStairs(n);\n  \n        System.out.println(result);\n        scanner.close();\n    }\n  }",
      "PYTHON": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        if n <= 2:\n            return n\n        \n        dp = [0] * (n + 1)\n        dp[1] = 1\n        dp[2] = 2\n        \n        for i in range(3, n + 1):\n            dp[i] = dp[i - 1] + dp[i - 2]\n        \n        return dp[n]\n  \n        # Alternative with O(1) space:\n        # a, b = 1, 2\n        # for i in range(3, n + 1):\n        #     a, b = b, a + b\n        # return a if n == 1 else b\n\nif __name__ == \"__main__\":\n    import sys\n    n = int(sys.stdin.readline().strip())\n    sol = Solution()\n    result = sol.climbStairs(n)\n    print(result)",
      "JAVASCRIPT": "/**\n  * @param {number} n\n  * @return {number}\n  */\n  function climbStairs(n) {\n    // Base cases\n    if (n <= 2) return n;\n  \n    // Dynamic programming approach\n    let dp = new Array(n + 1);\n    dp[1] = 1;\n    dp[2] = 2;\n  \n    for (let i = 3; i <= n; i++) {\n      dp[i] = dp[i - 1] + dp[i - 2];\n    }\n  \n    return dp[n];\n    \n    /* Alternative approach with O(1) space\n    let a = 1, b = 2;\n    for (let i = 3; i <= n; i++) {\n      let temp = a + b;\n      a = b;\n      b = temp;\n    }\n    return n === 1 ? a : b;\n    */\n  }\n\nconst readline = require('readline');\n  const rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout,\n    terminal: false\n  });\n  \n  rl.on('line', (line) => {\n    const n = parseInt(line.trim());\n    const result = climbStairs(n);\n    console.log(result);\n    rl.close();\n  });"
    },
    "codeSnippets": {
      "JAVA": "import java.util.Scanner;\n  \n    public class Solution {\n    public int climbStairs(int n) {\n        // Write your code here\n        return 0;\n    }\n  }\n\n\n  public class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int n = Integer.parseInt(scanner.nextLine().trim());\n  \n        Solution sol = new Solution();\n        int result = sol.climbStairs(n);\n  \n        System.out.println(result);\n        scanner.close();\n    }\n  }",
      "PYTHON": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        # Write your code here\n        pass\n\nif __name__ == \"__main__\":\n    import sys\n    n = int(sys.stdin.readline().strip())\n    sol = Solution()\n    result = sol.climbStairs(n)\n    print(result)",
      "JAVASCRIPT": "/**\n  * @param {number} n\n  * @return {number}\n  */\n  function climbStairs(n) {\n    // Write your code here\n  }\n\nconst readline = require('readline');\n  const rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout,\n    terminal: false\n  });\n  \n  rl.on('line', (line) => {\n    const n = parseInt(line.trim());\n    const result = climbStairs(n);\n    console.log(result);\n    rl.close();\n  });"
    }
  }
]
console.log(problems[1])

async function seed(data:any) {

      try {
        
        console.log("Creating problem:", data);
        const res = await fetch("http://localhost:8000/api/v1/problems/create-problem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cookie": "ext_name=ojplmecpdpgccookcobabopnaifgidhf; better-auth.session_token=1L9xwJbJrZLqBqoCYZ71jWu0fqHj6O69.P5ikSjZp%2FZVl%2Byfa3ymAf7Oig2iT33dKI120qT5bOQk%3D"
            
          },
          body: JSON.stringify(data),
           credentials: "include",
        });
        const resJson = await res.json();
return resJson
        // router.push('/dashboard')
      } catch (error) {
        console.error("Error creating problem:", error);
        console.error("Error creating problem");
      } finally {
        console.log('done ')
      }
  
  
}

seed(problems[1]).then(r => console.log(r)).catch(e => console.log(e))