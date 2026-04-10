const PROBLEMS_2 = [
  // ═══════════════════════════════════════════════════════════
  // WEEK 4 — Advanced Data Structures (Trees, Heaps, Graphs)
  // ═══════════════════════════════════════════════════════════

  {
    id: "p37",
    title: "Max Depth of Binary Tree",
    difficulty: "easy",
    topic: "Trees",
    week: 4,
    description: `Given a binary tree represented as a level-order array, return its maximum depth (the number of nodes along the longest path from the root to the farthest leaf).

A <code>null</code> in the array means that position has no node.

<strong>Example 1:</strong>
Input: [3, 9, 20, null, null, 15, 7]
Output: 3 (root -> 20 -> 15 or root -> 20 -> 7)

<strong>Example 2:</strong>
Input: [1, null, 2]
Output: 2`,
    starterJS: `function maxDepth(tree) {
  // tree is a level-order array like [3, 9, 20, null, null, 15, 7]
  // Your code here

}`,
    starterPY: `def max_depth(tree):
    # tree is a level-order array like [3, 9, 20, None, None, 15, 7]
    # Your code here
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
      { input: [[1, null, 2]], expected: 2 },
      { input: [[1]], expected: 1 },
      { input: [[]], expected: 0 },
      { input: [[1, 2, 3, 4, 5, null, null, 8]], expected: 4 },
    ],
    solution: `function maxDepth(tree) {
  if (!tree.length || tree[0] == null) return 0;

  // Build tree nodes from array
  function helper(index) {
    if (index >= tree.length || tree[index] == null) return 0;
    const left = helper(2 * index + 1);
    const right = helper(2 * index + 2);
    return 1 + Math.max(left, right);
  }

  return helper(0);
}`,
    walkthrough: `<strong>Step 1: Understand the tree array format</strong>
A level-order array stores the tree breadth-first. For index <code>i</code>, the left child is at <code>2*i + 1</code> and the right child is at <code>2*i + 2</code>. A null means no node at that position.

<strong>Step 2: Use recursion (DFS)</strong>
The depth of a tree = 1 + max(depth of left subtree, depth of right subtree). Base case: if the index is out of bounds or the value is null, depth is 0.

<strong>Step 3: Trace through [3, 9, 20, null, null, 15, 7]</strong>
helper(0) = 1 + max(helper(1), helper(2))
helper(1) = 1 + max(helper(3)=0, helper(4)=0) = 1
helper(2) = 1 + max(helper(5)=1, helper(6)=1) = 2
So helper(0) = 1 + max(1, 2) = 3

<strong>Complexity:</strong> O(n) time where n is the number of nodes, O(h) space for recursion stack where h is tree height.`,
    hint: "Use recursion: depth = 1 + max(left depth, right depth). Navigate the array with index math: left child = 2*i+1, right child = 2*i+2."
  },

  {
    id: "p38",
    title: "Invert Binary Tree",
    difficulty: "easy",
    topic: "Trees",
    week: 4,
    description: `Given a binary tree as a level-order array, invert it (mirror it) and return the result as a level-order array.

Inverting a binary tree means swapping every left child with its right child at every level.

<strong>Example 1:</strong>
Input: [4, 2, 7, 1, 3, 6, 9]
Output: [4, 7, 2, 9, 6, 3, 1]

<strong>Example 2:</strong>
Input: [2, 1, 3]
Output: [2, 3, 1]`,
    starterJS: `function invertTree(tree) {
  // tree is a level-order array
  // Return the inverted tree as a level-order array

}`,
    starterPY: `def invert_tree(tree):
    # tree is a level-order array
    # Return the inverted tree as a level-order array
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[4, 2, 7, 1, 3, 6, 9]], expected: [4, 7, 2, 9, 6, 3, 1] },
      { input: [[2, 1, 3]], expected: [2, 3, 1] },
      { input: [[1]], expected: [1] },
      { input: [[]], expected: [] },
    ],
    solution: `function invertTree(tree) {
  if (tree.length === 0) return [];

  // Build actual tree nodes
  class TreeNode {
    constructor(val) { this.val = val; this.left = null; this.right = null; }
  }

  function buildTree(arr, i) {
    if (i >= arr.length || arr[i] == null) return null;
    const node = new TreeNode(arr[i]);
    node.left = buildTree(arr, 2 * i + 1);
    node.right = buildTree(arr, 2 * i + 2);
    return node;
  }

  function invert(node) {
    if (!node) return null;
    const temp = node.left;
    node.left = invert(node.right);
    node.right = invert(temp);
    return node;
  }

  function toArray(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    while (queue.length) {
      const node = queue.shift();
      if (node) {
        result.push(node.val);
        queue.push(node.left);
        queue.push(node.right);
      } else {
        result.push(null);
      }
    }
    while (result[result.length - 1] == null) result.pop();
    return result;
  }

  const root = buildTree(tree, 0);
  invert(root);
  return toArray(root);
}`,
    walkthrough: `<strong>Step 1: Understand what "invert" means</strong>
At every node, swap its left and right children. This is recursive: invert the left subtree, invert the right subtree, then swap them.

<strong>Step 2: Build the tree from the array</strong>
Convert the level-order array into a linked tree structure so we can easily swap children. Use index math: left child of index i is at 2*i+1.

<strong>Step 3: Recursive inversion</strong>
For each node: recursively invert both subtrees, then swap left and right pointers. Base case: null node returns null.

<strong>Step 4: Convert back to array</strong>
Use BFS (level-order traversal) to serialize the inverted tree back to an array. Trim trailing nulls.

<strong>Complexity:</strong> O(n) time and O(n) space. Every node is visited exactly once.`,
    hint: "At each node, recursively invert both subtrees, then swap left and right. Build the tree from the array first."
  },

  {
    id: "p39",
    title: "Level Order Traversal",
    difficulty: "medium",
    topic: "Trees",
    week: 4,
    description: `Given a binary tree as a level-order array, return its level order traversal as an array of arrays, where each inner array contains the values at that depth level.

<strong>Example 1:</strong>
Input: [3, 9, 20, null, null, 15, 7]
Output: [[3], [9, 20], [15, 7]]

<strong>Example 2:</strong>
Input: [1, 2, 3, 4, 5]
Output: [[1], [2, 3], [4, 5]]`,
    starterJS: `function levelOrder(tree) {
  // tree is a level-order array
  // Return array of arrays grouped by level

}`,
    starterPY: `def level_order(tree):
    # tree is a level-order array
    # Return list of lists grouped by level
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[3, 9, 20, null, null, 15, 7]], expected: [[3], [9, 20], [15, 7]] },
      { input: [[1, 2, 3, 4, 5]], expected: [[1], [2, 3], [4, 5]] },
      { input: [[1]], expected: [[1]] },
      { input: [[]], expected: [] },
    ],
    solution: `function levelOrder(tree) {
  if (!tree.length || tree[0] == null) return [];

  const result = [];
  const queue = [0]; // start with root index

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const idx = queue.shift();
      if (idx < tree.length && tree[idx] != null) {
        level.push(tree[idx]);
        const left = 2 * idx + 1;
        const right = 2 * idx + 2;
        if (left < tree.length && tree[left] != null) queue.push(left);
        if (right < tree.length && tree[right] != null) queue.push(right);
      }
    }

    if (level.length > 0) result.push(level);
  }

  return result;
}`,
    walkthrough: `<strong>Step 1: Why BFS?</strong>
Level order traversal IS breadth-first search. We process all nodes at depth d before any node at depth d+1. A queue naturally gives us this ordering.

<strong>Step 2: The "level size" trick</strong>
Before processing each level, record the current queue size. That tells you exactly how many nodes belong to the current level. Process exactly that many, and any children added go to the NEXT level.

<strong>Step 3: Trace through [3, 9, 20, null, null, 15, 7]</strong>
Queue: [0]. Level size = 1. Process index 0 (val 3). Add children indices 1, 2. Result: [[3]]
Queue: [1, 2]. Level size = 2. Process index 1 (val 9), index 2 (val 20). Add children of 20 (indices 5, 6). Result: [[3], [9, 20]]
Queue: [5, 6]. Level size = 2. Process index 5 (val 15), index 6 (val 7). Result: [[3], [9, 20], [15, 7]]

<strong>Complexity:</strong> O(n) time, O(n) space for the queue. This BFS pattern appears in many tree and graph problems.`,
    hint: "Use BFS with a queue. At each level, record the queue size first, then process exactly that many nodes to group them by level."
  },

  {
    id: "p40",
    title: "Validate BST",
    difficulty: "medium",
    topic: "Trees",
    week: 4,
    description: `Given a binary tree as a level-order array, determine if it is a valid binary search tree (BST).

A valid BST means: for every node, ALL values in its left subtree are strictly less than the node, and ALL values in its right subtree are strictly greater.

<strong>Example 1:</strong>
Input: [2, 1, 3]
Output: true

<strong>Example 2:</strong>
Input: [5, 1, 4, null, null, 3, 6]
Output: false (node 4 is in the right subtree of 5 but 3 < 5 violates BST)`,
    starterJS: `function isValidBST(tree) {
  // tree is a level-order array
  // Return true if it's a valid BST, false otherwise

}`,
    starterPY: `def is_valid_bst(tree):
    # tree is a level-order array
    # Return True if it's a valid BST, False otherwise
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[2, 1, 3]], expected: true },
      { input: [[5, 1, 4, null, null, 3, 6]], expected: false },
      { input: [[1]], expected: true },
      { input: [[5, 4, 6, null, null, 3, 7]], expected: false },
      { input: [[2, 2, 2]], expected: false },
    ],
    solution: `function isValidBST(tree) {
  if (!tree.length || tree[0] == null) return true;

  function validate(idx, min, max) {
    if (idx >= tree.length || tree[idx] == null) return true;
    const val = tree[idx];
    if (val <= min || val >= max) return false;
    return validate(2 * idx + 1, min, val) &&
           validate(2 * idx + 2, val, max);
  }

  return validate(0, -Infinity, Infinity);
}`,
    walkthrough: `<strong>Step 1: The common mistake</strong>
Many people only check if left < parent < right at each node. But a BST requires ALL nodes in the left subtree to be less. Node 3 in [5,1,4,null,null,3,6] is left of 4 (ok) but it is also in the RIGHT subtree of 5 where everything must be > 5.

<strong>Step 2: Pass down valid ranges</strong>
Each node must fall within a valid range (min, max). The root's range is (-Infinity, Infinity). When we go left, the max becomes the parent's value. When we go right, the min becomes the parent's value.

<strong>Step 3: Trace [5, 1, 4, null, null, 3, 6]</strong>
validate(0, -Inf, Inf): val=5, ok. Check left and right.
validate(1, -Inf, 5): val=1, ok (between -Inf and 5).
validate(2, 5, Inf): val=4, FAIL (4 is not > 5). Return false.

<strong>Complexity:</strong> O(n) time, O(h) space. The range-passing pattern is essential for BST problems.`,
    hint: "Pass min/max bounds down the recursion. Left children inherit (min, parent_val), right children inherit (parent_val, max)."
  },

  {
    id: "p41",
    title: "Kth Largest Element",
    difficulty: "medium",
    topic: "Heaps",
    week: 4,
    description: `Given an unsorted array of integers <code>nums</code> and an integer <code>k</code>, return the kth largest element in the array.

Note: it is the kth largest in sorted order, not the kth distinct element.

<strong>Example 1:</strong>
Input: nums = [3, 2, 1, 5, 6, 4], k = 2
Output: 5

<strong>Example 2:</strong>
Input: nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4
Output: 4`,
    starterJS: `function findKthLargest(nums, k) {
  // Your code here

}`,
    starterPY: `def find_kth_largest(nums, k):
    # Your code here
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
      { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4 },
      { input: [[1], 1], expected: 1 },
      { input: [[7, 6, 5, 4, 3, 2, 1], 5], expected: 3 },
    ],
    solution: `function findKthLargest(nums, k) {
  // Quickselect approach (average O(n))
  function quickSelect(arr, left, right, target) {
    const pivot = arr[right];
    let partitionIdx = left;

    for (let i = left; i < right; i++) {
      if (arr[i] <= pivot) {
        [arr[i], arr[partitionIdx]] = [arr[partitionIdx], arr[i]];
        partitionIdx++;
      }
    }
    [arr[partitionIdx], arr[right]] = [arr[right], arr[partitionIdx]];

    if (partitionIdx === target) return arr[partitionIdx];
    else if (partitionIdx < target) return quickSelect(arr, partitionIdx + 1, right, target);
    else return quickSelect(arr, left, partitionIdx - 1, target);
  }

  // kth largest = (n - k)th smallest in 0-indexed
  return quickSelect(nums, 0, nums.length - 1, nums.length - k);
}`,
    walkthrough: `<strong>Step 1: Sorting approach (simple)</strong>
Sort descending and return element at index k-1. This is O(n log n). Can we do better?

<strong>Step 2: Quickselect (optimal average case)</strong>
We do not need a full sort. We just need the element at position n-k in sorted order. Quickselect is like quicksort but only recurses into the half that contains our target index.

<strong>Step 3: How Quickselect works</strong>
Pick a pivot, partition the array so smaller elements are left and larger are right. If the pivot lands at position n-k, that is our answer. Otherwise, recurse into the correct half.

<strong>Step 4: Heap alternative</strong>
You could also maintain a min-heap of size k. After processing all elements, the top of the heap is the kth largest. This is O(n log k).

<strong>Complexity:</strong> Quickselect averages O(n), worst case O(n^2). Sorting is O(n log n). Heap approach is O(n log k).`,
    hint: "Sort and pick index k-1, or use Quickselect to find the (n-k)th smallest element without fully sorting."
  },

  {
    id: "p42",
    title: "Find if Path Exists in Graph",
    difficulty: "easy",
    topic: "Graphs",
    week: 4,
    description: `Given <code>n</code> nodes labeled 0 to n-1, an array of edges where each edge is <code>[u, v]</code> (bidirectional), a <code>source</code> node, and a <code>destination</code> node, determine if there is a valid path from source to destination.

<strong>Example 1:</strong>
Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true

<strong>Example 2:</strong>
Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false (nodes 0-2 and nodes 3-5 are in separate components)`,
    starterJS: `function validPath(n, edges, source, destination) {
  // Your code here

}`,
    starterPY: `def valid_path(n, edges, source, destination):
    # Your code here
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [3, [[0,1],[1,2],[2,0]], 0, 2], expected: true },
      { input: [6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5], expected: false },
      { input: [1, [], 0, 0], expected: true },
      { input: [4, [[0,1],[1,2],[2,3]], 0, 3], expected: true },
    ],
    solution: `function validPath(n, edges, source, destination) {
  if (source === destination) return true;

  // Build adjacency list
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  // BFS
  const visited = new Set();
  const queue = [source];
  visited.add(source);

  while (queue.length > 0) {
    const node = queue.shift();
    if (node === destination) return true;
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return false;
}`,
    walkthrough: `<strong>Step 1: Model the problem</strong>
This is a graph connectivity problem. We need to check if two nodes are in the same connected component. We can use either BFS or DFS.

<strong>Step 2: Build an adjacency list</strong>
Convert the edge list into an adjacency list: for each node, store a list of its neighbors. Since edges are bidirectional, add both directions.

<strong>Step 3: BFS from source</strong>
Start at the source node. Use a queue and a visited set. For each node we dequeue, check if it is the destination. If not, add all unvisited neighbors to the queue.

<strong>Step 4: Why a visited set is critical</strong>
Without it, we would revisit nodes forever (especially with cycles like [0,1],[1,2],[2,0]). The visited set ensures each node is processed at most once.

<strong>Complexity:</strong> O(V + E) time and space, where V is nodes and E is edges. This is the standard graph traversal complexity.`,
    hint: "Build an adjacency list from the edges, then use BFS or DFS from source. Track visited nodes to avoid cycles."
  },

  {
    id: "p43",
    title: "Course Schedule",
    difficulty: "medium",
    topic: "Graphs",
    week: 4,
    description: `There are <code>numCourses</code> courses labeled 0 to numCourses-1. You are given an array of prerequisites where <code>prerequisites[i] = [a, b]</code> means you must take course <code>b</code> before course <code>a</code>.

Return <code>true</code> if you can finish all courses (no circular dependencies), or <code>false</code> if there is a cycle.

<strong>Example 1:</strong>
Input: numCourses = 2, prerequisites = [[1, 0]]
Output: true (take course 0 first, then course 1)

<strong>Example 2:</strong>
Input: numCourses = 2, prerequisites = [[1, 0], [0, 1]]
Output: false (cycle: 0 requires 1, 1 requires 0)`,
    starterJS: `function canFinish(numCourses, prerequisites) {
  // Your code here

}`,
    starterPY: `def can_finish(num_courses, prerequisites):
    # Your code here
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [2, [[1, 0]]], expected: true },
      { input: [2, [[1, 0], [0, 1]]], expected: false },
      { input: [4, [[1,0],[2,1],[3,2]]], expected: true },
      { input: [3, [[0,1],[1,2],[2,0]]], expected: false },
      { input: [1, []], expected: true },
    ],
    solution: `function canFinish(numCourses, prerequisites) {
  // Build adjacency list and in-degree array
  const graph = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }

  // Start with all courses that have no prerequisites
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let completed = 0;
  while (queue.length > 0) {
    const course = queue.shift();
    completed++;
    for (const next of graph[course]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }

  return completed === numCourses;
}`,
    walkthrough: `<strong>Step 1: Model as a directed graph</strong>
Each prerequisite [a, b] means there is a directed edge from b to a (must take b before a). If there is a cycle in this graph, it is impossible to complete all courses.

<strong>Step 2: Topological sort via Kahn's algorithm</strong>
Track the in-degree (number of prerequisites) for each course. Start with courses that have 0 prerequisites. As you "complete" a course, decrement the in-degree of courses that depend on it.

<strong>Step 3: Detect cycles</strong>
If we can process all courses (completed === numCourses), there is no cycle. If some courses still have nonzero in-degree, they are part of a cycle and can never be taken.

<strong>Step 4: Trace [[1,0],[0,1]]</strong>
in-degree: [1, 1]. No course has in-degree 0, so the queue starts empty. completed = 0 which is not equal to 2. Return false.

<strong>Complexity:</strong> O(V + E) time and space. Topological sort is a fundamental graph algorithm used in dependency resolution, build systems, and task scheduling.`,
    hint: "Use topological sort (Kahn's algorithm): track in-degrees, start with nodes that have 0 in-degree, and count how many you process."
  },

  // ═══════════════════════════════════════════════════════════
  // WEEK 5 — Web Development (JS-focused)
  // ═══════════════════════════════════════════════════════════

  {
    id: "p44",
    title: "Parse URL Query String",
    difficulty: "easy",
    topic: "HTTP/API",
    week: 5,
    description: `Given a URL string, extract the query parameters and return them as an object.

If a parameter appears multiple times, store the values as an array. Decode percent-encoded characters using <code>decodeURIComponent</code>.

<strong>Example 1:</strong>
Input: "https://example.com/search?q=hello&lang=en"
Output: { q: "hello", lang: "en" }

<strong>Example 2:</strong>
Input: "https://example.com/search?tag=js&tag=python&page=1"
Output: { tag: ["js", "python"], page: "1" }`,
    starterJS: `function parseQueryString(url) {
  // Your code here

}`,
    starterPY: `def parse_query_string(url):
    # Your code here
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: ["https://example.com/search?q=hello&lang=en"], expected: { q: "hello", lang: "en" } },
      { input: ["https://example.com/search?tag=js&tag=python&page=1"], expected: { tag: ["js", "python"], page: "1" } },
      { input: ["https://example.com/"], expected: {} },
      { input: ["https://example.com/path?name=hello%20world"], expected: { name: "hello world" } },
    ],
    solution: `function parseQueryString(url) {
  const queryStart = url.indexOf('?');
  if (queryStart === -1) return {};

  const queryStr = url.slice(queryStart + 1);
  const result = {};

  for (const pair of queryStr.split('&')) {
    const [rawKey, rawVal] = pair.split('=');
    const key = decodeURIComponent(rawKey);
    const val = rawVal !== undefined ? decodeURIComponent(rawVal) : '';

    if (result.hasOwnProperty(key)) {
      if (Array.isArray(result[key])) {
        result[key].push(val);
      } else {
        result[key] = [result[key], val];
      }
    } else {
      result[key] = val;
    }
  }

  return result;
}`,
    walkthrough: `<strong>Step 1: Find the query string</strong>
Everything after the <code>?</code> in a URL is the query string. Split the URL at <code>?</code> and take the second part.

<strong>Step 2: Split into key-value pairs</strong>
Split the query string by <code>&</code> to get individual parameters. Split each parameter by <code>=</code> to get the key and value.

<strong>Step 3: Handle duplicates</strong>
If a key appears more than once (like <code>tag=js&tag=python</code>), convert the value to an array. Check if the key already exists in the result object.

<strong>Step 4: Decode URI components</strong>
URL encoding replaces special characters with percent-encoded values (e.g., space becomes %20). Use <code>decodeURIComponent</code> to restore the original characters.

<strong>Complexity:</strong> O(n) where n is the length of the query string. This is how URL parsing works under the hood in web frameworks.`,
    hint: "Split the URL at '?', then split the query string by '&', then each pair by '='. Use decodeURIComponent and handle duplicate keys."
  },

  {
    id: "p45",
    title: "Deep Clone Object",
    difficulty: "easy",
    topic: "DOM",
    week: 5,
    description: `Implement a function that creates a deep copy of a JavaScript value. The function should handle:
- Primitives (numbers, strings, booleans, null)
- Plain objects
- Arrays
- Nested combinations of the above

You may NOT use <code>JSON.parse(JSON.stringify(...))</code>.

<strong>Example 1:</strong>
Input: { a: 1, b: { c: 2 } }
Output: { a: 1, b: { c: 2 } } (a completely independent copy)

<strong>Example 2:</strong>
Input: [1, [2, 3], { x: 4 }]
Output: [1, [2, 3], { x: 4 }] (a completely independent copy)`,
    starterJS: `function deepClone(obj) {
  // Your code here — no JSON.parse/stringify!

}`,
    starterPY: `def deep_clone(obj):
    # Your code here — no json/copy module!
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [{ a: 1, b: { c: 2 } }], expected: { a: 1, b: { c: 2 } } },
      { input: [[1, [2, 3], { x: 4 }]], expected: [1, [2, 3], { x: 4 }] },
      { input: [{ nested: { deep: { value: true } } }], expected: { nested: { deep: { value: true } } } },
      { input: [42], expected: 42 },
      { input: [null], expected: null },
    ],
    solution: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  const clone = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}`,
    walkthrough: `<strong>Step 1: Handle base cases</strong>
Primitives (numbers, strings, booleans, null) are not objects. They are copied by value, so we just return them directly.

<strong>Step 2: Handle arrays</strong>
Arrays are objects in JavaScript. Use <code>Array.isArray</code> to detect them, then recursively clone each element with <code>map</code>.

<strong>Step 3: Handle plain objects</strong>
Create a new empty object and copy each key. The VALUE of each key must also be deep-cloned (recursion), because it could be another object or array.

<strong>Step 4: Why not JSON.parse(JSON.stringify(...))?</strong>
The JSON trick fails on: undefined values, functions, Dates (become strings), circular references (throws error), Map/Set, and RegExp. A proper deep clone handles these cases.

<strong>Complexity:</strong> O(n) time and space where n is the total number of values in the structure. This pattern (recursive structural copy) appears in React state management, Redux, and immutable data patterns.`,
    hint: "Use recursion: if it's a primitive, return it. If it's an array, map over it with deepClone. If it's an object, iterate keys and deepClone each value."
  },

  {
    id: "p46",
    title: "Implement Event Emitter",
    difficulty: "medium",
    topic: "DOM",
    week: 5,
    description: `Implement a function that creates an event emitter object with three methods:

- <code>on(event, callback)</code> — register a callback for an event
- <code>emit(event, ...args)</code> — trigger all callbacks for that event with given args, return array of return values
- <code>off(event, callback)</code> — remove a specific callback for an event

<strong>Example 1:</strong>
const emitter = createEmitter();
emitter.on("greet", name => "Hello " + name);
emitter.emit("greet", "Alice") // returns ["Hello Alice"]

<strong>Example 2:</strong>
const emitter = createEmitter();
const fn = x => x * 2;
emitter.on("double", fn);
emitter.emit("double", 5); // returns [10]
emitter.off("double", fn);
emitter.emit("double", 5); // returns []`,
    starterJS: `function createEmitter() {
  // Return an object with on, emit, off methods

}`,
    starterPY: `def create_emitter():
    # Return a dict with on, emit, off functions
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [["on", "greet", "name => 'Hello ' + name"], ["emit", "greet", "Alice"]], expected: ["Hello Alice"] },
      { input: [["on", "add", "(a, b) => a + b"], ["emit", "add", 3, 4]], expected: [7] },
      { input: [["on", "x", "() => 1"], ["on", "x", "() => 2"], ["emit", "x"]], expected: [1, 2] },
      { input: [["emit", "noEvent"]], expected: [] },
    ],
    solution: `function createEmitter() {
  const events = {};
  return {
    on(event, callback) {
      if (!events[event]) events[event] = [];
      events[event].push(callback);
    },
    emit(event, ...args) {
      if (!events[event]) return [];
      return events[event].map(cb => cb(...args));
    },
    off(event, callback) {
      if (!events[event]) return;
      events[event] = events[event].filter(cb => cb !== callback);
    }
  };
}`,
    walkthrough: `<strong>Step 1: Data structure choice</strong>
Use an object (hash map) where keys are event names and values are arrays of callback functions. This gives O(1) lookup by event name.

<strong>Step 2: on() — registration</strong>
Push the callback into the array for that event. Create the array if it does not exist yet. Multiple callbacks can be registered for the same event.

<strong>Step 3: emit() — trigger callbacks</strong>
Look up the event name, iterate over all registered callbacks, call each with the provided arguments, and collect return values. Return an empty array if no callbacks exist.

<strong>Step 4: off() — unregister</strong>
Filter out the specific callback using reference equality. This is why we store the original function reference, not a wrapper.

<strong>Complexity:</strong> on() is O(1), emit() is O(k) where k is the number of listeners, off() is O(k). This is the Observer Pattern, used in Node.js EventEmitter, DOM events, and pub/sub systems.`,
    hint: "Store events in a map of arrays. on() pushes to the array, emit() calls all functions in the array, off() filters out the callback."
  },

  {
    id: "p47",
    title: "Promise.all Implementation",
    difficulty: "medium",
    topic: "HTTP/API",
    week: 5,
    description: `Implement a simplified <code>promiseAll</code> function that takes an array of values or promises and returns an array of resolved values.

For testability, the function accepts an array of plain functions that return values (simulating synchronous "resolved" promises). It should:
- Execute all functions and collect results
- Maintain the order of results matching the input order
- If any function throws, return the string <code>"ERROR: &lt;message&gt;"</code>

<strong>Example 1:</strong>
Input: [() => 1, () => 2, () => 3]
Output: [1, 2, 3]

<strong>Example 2:</strong>
Input: [() => "a", () => { throw new Error("fail") }, () => "c"]
Output: "ERROR: fail"`,
    starterJS: `function promiseAll(fns) {
  // fns is an array of functions that return values or throw
  // Return array of results, or "ERROR: <message>" if any throws

}`,
    starterPY: `def promise_all(fns):
    # fns is a list of callables that return values or raise
    # Return list of results, or "ERROR: <message>" if any raises
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [["() => 1", "() => 2", "() => 3"]], expected: [1, 2, 3] },
      { input: [["() => 'a'", "() => { throw new Error('fail') }", "() => 'c'"]], expected: "ERROR: fail" },
      { input: [[]], expected: [] },
      { input: [["() => 'hello'", "() => 42", "() => true"]], expected: ["hello", 42, true] },
    ],
    solution: `function promiseAll(fns) {
  const results = [];
  const funcs = fns.map(f => typeof f === 'string' ? eval(f) : f);

  for (let i = 0; i < funcs.length; i++) {
    try {
      results.push(funcs[i]());
    } catch (err) {
      return "ERROR: " + err.message;
    }
  }

  return results;
}`,
    walkthrough: `<strong>Step 1: Understand Promise.all behavior</strong>
The real Promise.all takes an array of promises, waits for all to resolve, and returns an array of values in the same order. If any promise rejects, the whole thing rejects with that error.

<strong>Step 2: Simplified synchronous version</strong>
We simulate this with functions that return values or throw errors. Execute each function, collect results, and short-circuit on the first error.

<strong>Step 3: Maintaining order</strong>
Results must match the input order. In the real async version, this means you cannot just push results as they resolve; you must assign them to the correct index.

<strong>Step 4: Real Promise.all pattern</strong>
In production, you would: create a new Promise, iterate with forEach (not for-of, to capture index), resolve each promise, store result at correct index, and resolve the outer promise when a counter reaches the total.

<strong>Complexity:</strong> O(n) time and space. Understanding Promise.all is essential for concurrent API calls, batch processing, and parallel data fetching in web applications.`,
    hint: "Iterate through the functions, call each one, collect results. If any throws, return the error message immediately."
  },

  {
    id: "p48",
    title: "Debounce Function",
    difficulty: "easy",
    topic: "DOM",
    week: 5,
    description: `Implement a <code>debounce</code> function. Given a function and a delay, return a new function that:
- Only executes after <code>delay</code> ms of inactivity
- Resets the timer if called again before the delay expires

For testability, implement a synchronous version: the returned function tracks calls and returns the result of the most recent call only after being "flushed" (calling <code>.flush()</code>).

<strong>Example 1:</strong>
Input: fn = x => x * 2, calls = [1, 2, 3], flush
Output: 6 (only the last call with arg 3 is executed: 3*2=6)

<strong>Example 2:</strong>
Input: fn = x => x + 10, calls = [5], flush
Output: 15`,
    starterJS: `function debounce(fn) {
  // Return a debounced function with a .flush() method
  // Each call replaces the pending args
  // .flush() executes with the most recent args and returns the result

}`,
    starterPY: `def debounce(fn):
    # Return a debounced function with a .flush() method
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: ["x => x * 2", [1, 2, 3]], expected: 6 },
      { input: ["x => x + 10", [5]], expected: 15 },
      { input: ["(a, b) => a + b", [[1, 2], [3, 4], [5, 6]]], expected: 11 },
      { input: ["x => x", [42]], expected: 42 },
    ],
    solution: `function debounce(fn) {
  // For testability: accept string fn + array of calls
  // This is called differently by the test runner
  if (typeof fn === 'string') {
    const func = eval(fn);
    const calls = arguments[1];
    let lastArgs = null;
    for (const call of calls) {
      lastArgs = Array.isArray(call) ? call : [call];
    }
    return lastArgs ? func(...lastArgs) : undefined;
  }

  // Real debounce implementation
  let pendingArgs = null;
  function debounced(...args) {
    pendingArgs = args;
  }
  debounced.flush = function() {
    if (pendingArgs) return fn(...pendingArgs);
  };
  return debounced;
}`,
    walkthrough: `<strong>Step 1: What is debouncing?</strong>
Debounce delays function execution until there is a pause in calls. If you type "hello" into a search box with 300ms debounce, the search only fires once (300ms after the "o"), not five times.

<strong>Step 2: Core mechanism</strong>
Each call replaces the pending arguments. Only the last set of arguments matters. In a real debounce, each call clears the previous setTimeout and starts a new one.

<strong>Step 3: Real-world debounce pattern</strong>
function debounce(fn, delay) { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; }

<strong>Step 4: Common uses</strong>
Search-as-you-type, window resize handlers, scroll events, auto-save. Debounce prevents expensive operations from firing on every keystroke or pixel of movement.

<strong>Complexity:</strong> O(1) per call. Debounce is a fundamental web development pattern. Its sibling, throttle, ensures a function runs at most once every N ms.`,
    hint: "Store the latest arguments each time the function is called. Only the most recent call's arguments matter when it finally executes."
  },

  {
    id: "p49",
    title: "Flatten Deeply Nested Object",
    difficulty: "medium",
    topic: "DOM",
    week: 5,
    description: `Given a nested object, flatten it so that all keys become dot-separated paths. Only flatten plain objects; arrays and primitives should remain as leaf values.

<strong>Example 1:</strong>
Input: { a: { b: 1, c: { d: 2 } }, e: 3 }
Output: { "a.b": 1, "a.c.d": 2, "e": 3 }

<strong>Example 2:</strong>
Input: { user: { name: "Alice", address: { city: "NYC" } } }
Output: { "user.name": "Alice", "user.address.city": "NYC" }`,
    starterJS: `function flattenObject(obj) {
  // Your code here

}`,
    starterPY: `def flatten_object(obj):
    # Your code here
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [{ a: { b: 1, c: { d: 2 } }, e: 3 }], expected: { "a.b": 1, "a.c.d": 2, "e": 3 } },
      { input: [{ user: { name: "Alice", address: { city: "NYC" } } }], expected: { "user.name": "Alice", "user.address.city": "NYC" } },
      { input: [{ x: 1 }], expected: { x: 1 } },
      { input: [{ a: { b: { c: { d: { e: 5 } } } } }], expected: { "a.b.c.d.e": 5 } },
      { input: [{ a: [1, 2], b: { c: 3 } }], expected: { a: [1, 2], "b.c": 3 } },
    ],
    solution: `function flattenObject(obj) {
  const result = {};

  function helper(current, prefix) {
    for (const key in current) {
      if (!current.hasOwnProperty(key)) continue;
      const newKey = prefix ? prefix + '.' + key : key;
      const value = current[key];

      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        helper(value, newKey);
      } else {
        result[newKey] = value;
      }
    }
  }

  helper(obj, '');
  return result;
}`,
    walkthrough: `<strong>Step 1: Define "flat"</strong>
A flat object has no nesting. Every key is a string path like "a.b.c" and every value is a primitive or array (not a plain object).

<strong>Step 2: Recursive approach</strong>
Walk through each key in the object. If the value is a plain object, recurse with an updated prefix (current path + key). If the value is a leaf (primitive or array), add it to the result with the full path as the key.

<strong>Step 3: Building the path</strong>
Track the current path as a string prefix. At the top level, prefix is empty. At each level, append the key with a dot separator. Handle the edge case where prefix is empty (no leading dot).

<strong>Step 4: What counts as a "leaf"?</strong>
Arrays, primitives (numbers, strings, booleans), and null are all leaves. Only plain objects (typeof === 'object' and not Array and not null) should be recursed into.

<strong>Complexity:</strong> O(n) where n is the total number of key-value pairs across all nesting levels. This pattern is used in form serialization, config management, and database document flattening.`,
    hint: "Use recursion with a prefix string. If a value is a plain object, recurse with prefix + key. Otherwise, assign the value to the flattened key."
  },

  // ═══════════════════════════════════════════════════════════
  // WEEK 6 — Backend & Databases
  // ═══════════════════════════════════════════════════════════

  {
    id: "p50",
    title: "Implement Basic Rate Limiter",
    difficulty: "easy",
    topic: "Backend",
    week: 6,
    description: `Implement a rate limiter function. Given a maximum number of <code>allowed</code> calls within a time <code>window</code> (in seconds), simulate a sequence of call timestamps and return which ones were allowed.

The function receives an array of timestamps (integers, in seconds) and returns an array of booleans indicating whether each call was allowed.

<strong>Example 1:</strong>
Input: allowed = 3, window = 10, timestamps = [1, 2, 3, 4, 11]
Output: [true, true, true, false, true]
(calls at 1,2,3 use the 3 slots; call at 4 is blocked; at 11, the call at 1 has expired)

<strong>Example 2:</strong>
Input: allowed = 1, window = 5, timestamps = [1, 2, 6]
Output: [true, false, true]`,
    starterJS: `function rateLimiter(allowed, window, timestamps) {
  // Your code here

}`,
    starterPY: `def rate_limiter(allowed, window, timestamps):
    # Your code here
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [3, 10, [1, 2, 3, 4, 11]], expected: [true, true, true, false, true] },
      { input: [1, 5, [1, 2, 6]], expected: [true, false, true] },
      { input: [2, 3, [1, 2, 3, 4, 5]], expected: [true, true, false, true, true] },
      { input: [5, 100, [1, 2, 3, 4, 5]], expected: [true, true, true, true, true] },
    ],
    solution: `function rateLimiter(allowed, window, timestamps) {
  const callLog = [];
  const results = [];

  for (const ts of timestamps) {
    // Remove timestamps outside the window
    while (callLog.length > 0 && callLog[0] <= ts - window) {
      callLog.shift();
    }

    if (callLog.length < allowed) {
      callLog.push(ts);
      results.push(true);
    } else {
      results.push(false);
    }
  }

  return results;
}`,
    walkthrough: `<strong>Step 1: Sliding window concept</strong>
A rate limiter allows N calls within a time window W. For each new call, we check how many calls happened in the past W seconds. If fewer than N, allow it; otherwise, reject it.

<strong>Step 2: Use a queue (FIFO)</strong>
Store timestamps of allowed calls in a queue. Before each new call, remove timestamps that are outside the current window (older than current_time - window).

<strong>Step 3: Trace through example</strong>
allowed=3, window=10, timestamps=[1,2,3,4,11]
t=1: log=[], add 1 -> [1], ALLOW. t=2: log=[1], add 2 -> [1,2], ALLOW.
t=3: log=[1,2], add 3 -> [1,2,3], ALLOW. t=4: log=[1,2,3], 3 calls in window, DENY.
t=11: remove t<=1 -> log=[2,3], add 11 -> [2,3,11], ALLOW.

<strong>Step 4: Real-world considerations</strong>
Production rate limiters use Redis with sliding window counters, token bucket, or leaky bucket algorithms. They handle distributed systems, multiple users, and concurrent requests.

<strong>Complexity:</strong> O(n) total time where n is the number of timestamps. Each timestamp enters and leaves the queue at most once.`,
    hint: "Maintain a queue of allowed call timestamps. For each new call, remove expired entries, then check if the queue size is under the limit."
  },

  {
    id: "p51",
    title: "Key-Value Store with TTL",
    difficulty: "medium",
    topic: "Backend",
    week: 6,
    description: `Implement a key-value store that supports time-to-live (TTL) for entries. Simulate it with explicit timestamps.

Given a sequence of operations, return the results of all "get" operations:
- <code>["set", key, value, ttl, timestamp]</code> — store key with value, expires after ttl seconds from timestamp
- <code>["get", key, timestamp]</code> — retrieve value if not expired, otherwise return -1

<strong>Example 1:</strong>
Input: [["set","a","hello",10,1], ["get","a",5], ["get","a",12]]
Output: ["hello", -1]

<strong>Example 2:</strong>
Input: [["set","x","100",5,0], ["set","x","200",5,3], ["get","x",6]]
Output: ["200"]`,
    starterJS: `function kvStore(operations) {
  // Your code here

}`,
    starterPY: `def kv_store(operations):
    # Your code here
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: [[["set","a","hello",10,1], ["get","a",5], ["get","a",12]]], expected: ["hello", -1] },
      { input: [[["set","x","100",5,0], ["set","x","200",5,3], ["get","x",6]]], expected: ["200"] },
      { input: [[["get","missing",0]]], expected: [-1] },
      { input: [[["set","k","v",3,0], ["get","k",2], ["get","k",3]]], expected: ["v", -1] },
      { input: [[["set","a","1",10,0], ["set","b","2",5,0], ["get","a",7], ["get","b",7]]], expected: ["1", -1] },
    ],
    solution: `function kvStore(operations) {
  const store = {};
  const results = [];

  for (const op of operations) {
    if (op[0] === "set") {
      const [, key, value, ttl, timestamp] = op;
      store[key] = { value, expiresAt: timestamp + ttl };
    } else if (op[0] === "get") {
      const [, key, timestamp] = op;
      if (store[key] && timestamp < store[key].expiresAt) {
        results.push(store[key].value);
      } else {
        results.push(-1);
      }
    }
  }

  return results;
}`,
    walkthrough: `<strong>Step 1: Design the store</strong>
Use a hash map where each entry stores the value AND its expiration time. When setting a key, compute expiresAt = timestamp + ttl.

<strong>Step 2: Get with expiration check</strong>
On get, check if the key exists AND the current timestamp is less than the expiration time. If expired, treat it as if the key does not exist.

<strong>Step 3: Overwriting keys</strong>
When set is called for an existing key, simply overwrite the value and expiration. The new TTL starts from the new timestamp.

<strong>Step 4: Real-world applications</strong>
TTL-based stores are everywhere: Redis EXPIRE, DNS caching, session tokens, rate limiter windows, CDN cache headers. Understanding TTL is essential for backend development.

<strong>Complexity:</strong> O(1) per get/set operation. O(n) total for n operations. In production, you would also need background cleanup of expired keys (lazy vs eager expiration).`,
    hint: "Store each entry as {value, expiresAt: timestamp + ttl}. On get, check if the current timestamp is before expiresAt."
  },

  {
    id: "p52",
    title: "SQL to Code: GROUP BY",
    difficulty: "easy",
    topic: "SQL",
    week: 6,
    description: `Implement the equivalent of SQL's <code>GROUP BY</code> in JavaScript.

Given an array of objects and a key name, group the objects by that key. Return an object where each key is a distinct value of the grouping field, and each value is an array of objects that share that value.

This is equivalent to: <code>SELECT key, ... FROM table GROUP BY key</code>

<strong>Example 1:</strong>
Input: data = [{name:"Alice",dept:"eng"},{name:"Bob",dept:"eng"},{name:"Carol",dept:"sales"}], key = "dept"
Output: { eng: [{name:"Alice",dept:"eng"},{name:"Bob",dept:"eng"}], sales: [{name:"Carol",dept:"sales"}] }

<strong>Example 2:</strong>
Input: data = [{x:1,y:"a"},{x:2,y:"b"},{x:3,y:"a"}], key = "y"
Output: { a: [{x:1,y:"a"},{x:3,y:"a"}], b: [{x:2,y:"b"}] }`,
    starterJS: `function groupBy(data, key) {
  // Your code here

}`,
    starterPY: `def group_by(data, key):
    # Your code here
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      {
        input: [[{name:"Alice",dept:"eng"},{name:"Bob",dept:"eng"},{name:"Carol",dept:"sales"}], "dept"],
        expected: { eng: [{name:"Alice",dept:"eng"},{name:"Bob",dept:"eng"}], sales: [{name:"Carol",dept:"sales"}] }
      },
      {
        input: [[{x:1,y:"a"},{x:2,y:"b"},{x:3,y:"a"}], "y"],
        expected: { a: [{x:1,y:"a"},{x:3,y:"a"}], b: [{x:2,y:"b"}] }
      },
      {
        input: [[], "key"],
        expected: {}
      },
      {
        input: [[{id:1,status:"active"},{id:2,status:"inactive"},{id:3,status:"active"}], "status"],
        expected: { active: [{id:1,status:"active"},{id:3,status:"active"}], inactive: [{id:2,status:"inactive"}] }
      },
    ],
    solution: `function groupBy(data, key) {
  const result = {};

  for (const item of data) {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
  }

  return result;
}`,
    walkthrough: `<strong>Step 1: SQL analogy</strong>
In SQL, GROUP BY collects rows with the same value in a column. Here we do the same: collect objects with the same value for a given key into arrays.

<strong>Step 2: Use a hash map</strong>
Create an empty result object. For each item in the data array, look up the value of the grouping key. If this group does not exist yet, create an empty array. Then push the item into its group.

<strong>Step 3: This is reduce in disguise</strong>
You could also write this with reduce: data.reduce((acc, item) => { (acc[item[key]] ??= []).push(item); return acc; }, {}). The for-loop version is clearer.

<strong>Step 4: Extending to aggregation</strong>
Real GROUP BY often includes aggregation (COUNT, SUM, AVG). You could extend this by applying aggregate functions to each group array after grouping.

<strong>Complexity:</strong> O(n) time and space. This is equivalent to a hash aggregate in database query execution.`,
    hint: "Create a result object. For each item, use the grouping key's value as the object key, and push the item into the corresponding array."
  },

  {
    id: "p53",
    title: "SQL to Code: JOIN",
    difficulty: "medium",
    topic: "SQL",
    week: 6,
    description: `Implement the equivalent of SQL's <code>INNER JOIN</code> in JavaScript.

Given two arrays of objects, a key from the first array, and a key from the second array, return all matching pairs merged into single objects. Only include rows where both sides have a match.

Equivalent to: <code>SELECT * FROM left INNER JOIN right ON left.leftKey = right.rightKey</code>

<strong>Example 1:</strong>
Input: left = [{id:1,name:"Alice"},{id:2,name:"Bob"}], right = [{userId:1,score:90},{userId:2,score:85}], leftKey = "id", rightKey = "userId"
Output: [{id:1,name:"Alice",userId:1,score:90},{id:2,name:"Bob",userId:2,score:85}]

<strong>Example 2:</strong>
Input: left = [{id:1,name:"Alice"}], right = [{userId:2,score:85}], leftKey = "id", rightKey = "userId"
Output: [] (no matching keys)`,
    starterJS: `function innerJoin(left, right, leftKey, rightKey) {
  // Your code here

}`,
    starterPY: `def inner_join(left, right, left_key, right_key):
    # Your code here
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      {
        input: [
          [{id:1,name:"Alice"},{id:2,name:"Bob"}],
          [{userId:1,score:90},{userId:2,score:85}],
          "id", "userId"
        ],
        expected: [{id:1,name:"Alice",userId:1,score:90},{id:2,name:"Bob",userId:2,score:85}]
      },
      {
        input: [
          [{id:1,name:"Alice"}],
          [{userId:2,score:85}],
          "id", "userId"
        ],
        expected: []
      },
      {
        input: [
          [{id:1,val:"a"},{id:2,val:"b"}],
          [{ref:1,x:10},{ref:1,x:20}],
          "id", "ref"
        ],
        expected: [{id:1,val:"a",ref:1,x:10},{id:1,val:"a",ref:1,x:20}]
      },
      {
        input: [[], [{id:1}], "id", "id"],
        expected: []
      },
    ],
    solution: `function innerJoin(left, right, leftKey, rightKey) {
  // Build an index on the right table for O(1) lookups
  const rightIndex = {};
  for (const row of right) {
    const key = row[rightKey];
    if (!rightIndex[key]) rightIndex[key] = [];
    rightIndex[key].push(row);
  }

  const result = [];
  for (const leftRow of left) {
    const matches = rightIndex[leftRow[leftKey]];
    if (matches) {
      for (const rightRow of matches) {
        result.push({ ...leftRow, ...rightRow });
      }
    }
  }

  return result;
}`,
    walkthrough: `<strong>Step 1: The naive approach</strong>
Nested loops: for each left row, scan all right rows looking for matches. This is O(n * m) — a "nested loop join" in database terminology.

<strong>Step 2: Hash join (optimal)</strong>
Build a hash index on the right table, keyed by the join column. Then for each left row, do an O(1) lookup in the index. This is exactly how databases implement "hash join."

<strong>Step 3: Handle one-to-many</strong>
If multiple right rows match a single left row (like id:1 matching two rows with ref:1), we produce multiple output rows. This is why the index stores arrays of rows, not single rows.

<strong>Step 4: Merge the rows</strong>
Use the spread operator to combine left and right row properties into a single object. If there are key conflicts, the right table's values overwrite (same as SQL column disambiguation).

<strong>Complexity:</strong> O(n + m) to build the index and scan left, plus O(output_size) for producing results. This is the same hash join algorithm used by PostgreSQL and MySQL.`,
    hint: "Build a hash index on the right table by the join key, then iterate the left table and look up matches in O(1). This is a hash join."
  },

  {
    id: "p54",
    title: "Validate JWT Structure",
    difficulty: "easy",
    topic: "Backend",
    week: 6,
    description: `A JSON Web Token (JWT) has three parts separated by dots: <code>header.payload.signature</code>

Each of the first two parts is a Base64URL-encoded JSON string. Write a function that validates the structure of a JWT and returns the decoded payload as an object.

Return <code>null</code> if the token is malformed (not 3 parts, or invalid Base64/JSON in header or payload).

<strong>Example 1:</strong>
Input: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4ifQ.signature"
Output: { sub: "1234567890", name: "John" }

<strong>Example 2:</strong>
Input: "not.a.valid.token"
Output: null`,
    starterJS: `function validateJWT(token) {
  // Your code here

}`,
    starterPY: `def validate_jwt(token):
    # Your code here
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      { input: ["eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4ifQ.signature"], expected: { sub: "1234567890", name: "John" } },
      { input: ["not.a.valid.token"], expected: null },
      { input: ["abc"], expected: null },
      { input: ["eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4ifQ.sig"], expected: { role: "admin" } },
      { input: [""], expected: null },
    ],
    solution: `function validateJWT(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    // Decode header to verify it's valid JSON
    const header = JSON.parse(atob(parts[0]));
    if (typeof header !== 'object' || header === null) return null;

    // Decode and return payload
    const payload = JSON.parse(atob(parts[1]));
    if (typeof payload !== 'object' || payload === null) return null;

    return payload;
  } catch (e) {
    return null;
  }
}`,
    walkthrough: `<strong>Step 1: JWT structure</strong>
A JWT has exactly 3 parts separated by dots: header, payload, and signature. The header and payload are Base64-encoded JSON objects. The signature is a cryptographic hash (we just check structure here, not verify the signature).

<strong>Step 2: Split and validate</strong>
Split by '.'. If there are not exactly 3 parts, it is invalid. Then decode the first two parts.

<strong>Step 3: Base64 decoding</strong>
Use <code>atob()</code> to decode Base64 strings back to plain text, then <code>JSON.parse()</code> to convert to objects. Wrap in try/catch since either step can fail on malformed input.

<strong>Step 4: Real-world JWT security</strong>
In production, you must also: verify the signature using a secret key, check the "exp" claim for token expiration, validate the "iss" (issuer) and "aud" (audience) claims, and use a proper JWT library like jsonwebtoken.

<strong>Complexity:</strong> O(n) where n is the token length. Understanding JWTs is essential for authentication in modern web applications and APIs.`,
    hint: "Split by '.', check for exactly 3 parts, then atob() and JSON.parse() the first two parts. Wrap everything in try/catch."
  },

  {
    id: "p55",
    title: "Build a Middleware Pipeline",
    difficulty: "medium",
    topic: "Backend",
    week: 6,
    description: `Implement a middleware pipeline similar to Express.js. Given an array of middleware functions and a request object, execute them in sequence.

Each middleware receives <code>(req, next)</code>. It can modify <code>req</code> and must call <code>next()</code> to pass control to the next middleware. The pipeline function returns the final state of <code>req</code> after all middlewares have run.

If a middleware does NOT call <code>next()</code>, the pipeline stops early.

<strong>Example 1:</strong>
Input: middlewares that add properties to req, req = { path: "/api" }
Output: { path: "/api", logged: true, authed: true }

<strong>Example 2:</strong>
Input: first middleware adds logged, second does NOT call next, third adds final
Output: { logged: true } (pipeline stops at second middleware)`,
    starterJS: `function runPipeline(middlewares, req) {
  // middlewares is array of (req, next) => void functions
  // Execute them in order, return the final req object

}`,
    starterPY: `def run_pipeline(middlewares, req):
    # Execute middlewares in order, return the final req dict
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      {
        input: [
          ["(req, next) => { req.logged = true; next(); }", "(req, next) => { req.authed = true; next(); }"],
          { path: "/api" }
        ],
        expected: { path: "/api", logged: true, authed: true }
      },
      {
        input: [
          ["(req, next) => { req.logged = true; next(); }", "(req, next) => { req.stopped = true; }", "(req, next) => { req.final = true; next(); }"],
          {}
        ],
        expected: { logged: true, stopped: true }
      },
      {
        input: [[], { data: 1 }],
        expected: { data: 1 }
      },
      {
        input: [
          ["(req, next) => { req.count = (req.count || 0) + 1; next(); }", "(req, next) => { req.count += 1; next(); }", "(req, next) => { req.count += 1; next(); }"],
          {}
        ],
        expected: { count: 3 }
      },
    ],
    solution: `function runPipeline(middlewares, req) {
  const fns = middlewares.map(m => typeof m === 'string' ? eval(m) : m);
  let index = 0;

  function next() {
    if (index < fns.length) {
      const middleware = fns[index];
      index++;
      middleware(req, next);
    }
  }

  next();
  return req;
}`,
    walkthrough: `<strong>Step 1: The middleware pattern</strong>
Express.js middleware is a chain of functions. Each function can: read/modify the request, perform side effects (logging, auth checks), and decide whether to pass control to the next function by calling next().

<strong>Step 2: The next() function</strong>
The key insight is that next() is a function that calls the NEXT middleware in the chain. Each middleware receives next as a parameter and decides whether to call it. If it does not call next(), the pipeline stops.

<strong>Step 3: Implementation</strong>
Maintain a counter (index) that tracks which middleware is next. The next() function increments the counter and calls the next middleware, passing the same req and a new next function.

<strong>Step 4: Why this matters</strong>
This is how Express.js, Koa, and most web frameworks work. Middleware handles cross-cutting concerns: logging, authentication, rate limiting, CORS, error handling, request parsing, etc.

<strong>Complexity:</strong> O(n) where n is the number of middlewares. The middleware pattern is a variation of the Chain of Responsibility design pattern.`,
    hint: "Create a next() function that tracks the current index. Each call to next() increments the index and invokes the next middleware with (req, next)."
  },

  {
    id: "p56",
    title: "Connection Pool Simulator",
    difficulty: "medium",
    topic: "Backend",
    week: 6,
    description: `Simulate a connection pool with a limited number of connections.

Given <code>poolSize</code> (max concurrent connections) and an array of operations:
- <code>["acquire", id]</code> — request a connection for the given id. Returns true if granted, false if pool is full.
- <code>["release", id]</code> — release the connection held by the given id. Returns true if released, false if id had no connection.
- <code>["status"]</code> — returns the number of available connections.

Return an array with the result of each operation.

<strong>Example 1:</strong>
Input: poolSize = 2, ops = [["acquire","A"],["acquire","B"],["acquire","C"],["release","A"],["acquire","C"],["status"]]
Output: [true, true, false, true, true, 1]

<strong>Example 2:</strong>
Input: poolSize = 1, ops = [["acquire","X"],["status"],["release","X"],["status"]]
Output: [true, 0, true, 1]`,
    starterJS: `function connectionPool(poolSize, operations) {
  // Your code here

}`,
    starterPY: `def connection_pool(pool_size, operations):
    # Your code here
    pass`,
    starterJava: `// Java solution\nimport java.util.*;\n\nclass Solution {\n    // Your code here\n}`,

    testCases: [
      {
        input: [2, [["acquire","A"],["acquire","B"],["acquire","C"],["release","A"],["acquire","C"],["status"]]],
        expected: [true, true, false, true, true, 1]
      },
      {
        input: [1, [["acquire","X"],["status"],["release","X"],["status"]]],
        expected: [true, 0, true, 1]
      },
      {
        input: [3, [["status"],["acquire","a"],["acquire","b"],["status"]]],
        expected: [3, true, true, 1]
      },
      {
        input: [2, [["release","ghost"],["acquire","A"],["acquire","A"]]],
        expected: [false, true, false]
      },
    ],
    solution: `function connectionPool(poolSize, operations) {
  const active = new Set();
  const results = [];

  for (const op of operations) {
    if (op[0] === "acquire") {
      const id = op[1];
      if (active.has(id) || active.size >= poolSize) {
        results.push(false);
      } else {
        active.add(id);
        results.push(true);
      }
    } else if (op[0] === "release") {
      const id = op[1];
      if (active.has(id)) {
        active.delete(id);
        results.push(true);
      } else {
        results.push(false);
      }
    } else if (op[0] === "status") {
      results.push(poolSize - active.size);
    }
  }

  return results;
}`,
    walkthrough: `<strong>Step 1: What is a connection pool?</strong>
Databases have limited connections. A pool pre-allocates N connections and lends them to callers. When all N are in use, new requests must wait or be rejected. This prevents overwhelming the database.

<strong>Step 2: Data structure</strong>
Use a Set to track which IDs currently hold connections. The Set gives O(1) add, delete, and has operations. The pool's available count is poolSize minus the Set's size.

<strong>Step 3: Acquire logic</strong>
When acquiring: check if the ID already has a connection (prevent double-acquire) and if the pool has capacity. If both conditions pass, add the ID to the active set.

<strong>Step 4: Real-world connection pools</strong>
Libraries like pg-pool (PostgreSQL), HikariCP (Java), and SQLAlchemy (Python) implement this pattern with additional features: wait queues, timeouts, health checks, connection recycling, and idle connection cleanup.

<strong>Complexity:</strong> O(1) per operation. Connection pooling is critical for any backend that communicates with databases, caches, or external services.`,
    hint: "Use a Set to track active connection holders. Acquire checks size < poolSize and adds the ID. Release removes it. Status returns poolSize - active count."
  },
];