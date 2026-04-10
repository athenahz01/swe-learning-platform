// ============================================================
// LESSONS 2 — Weeks 4-8: Data Structures, Web Dev, Backend,
//   System Design, Interview Prep
// ============================================================

const LESSONS_2 = {

  // ============================================================
  // WEEK 4, TOPIC 2 — Binary Search Trees (BST)
  // ============================================================
  "w4t2": {
    takeaways: [
      "A BST keeps left children smaller and right children larger than the parent.",
      "Search, insert, and delete are O(log n) on average but O(n) if the tree is unbalanced.",
      "In-order traversal of a BST gives you sorted output, just like ORDER BY.",
      "Deleting a node with two children requires finding the in-order successor.",
      "Sorted input creates a lopsided BST; balanced trees (AVL, Red-Black) fix this."
    ],
    sections: [
      {
        title: "What Is a Binary Search Tree?",
        content: `<p>Imagine your SQL table has an index on the <code>id</code> column. Under the hood, the database builds a <strong>tree structure</strong> so it can find rows fast — that tree is often a variant of a Binary Search Tree.</p>
<p>A <strong>BST</strong> is a binary tree where every node follows one rule:</p>
<ul>
  <li>Everything in the <strong>left</strong> subtree is <strong>smaller</strong>.</li>
  <li>Everything in the <strong>right</strong> subtree is <strong>larger</strong>.</li>
</ul>
<p>This property means you can search by cutting the remaining data in half at every step — just like binary search on a sorted array, but with a flexible, pointer-based structure.</p>`,
        diagram: `
          8          <-- root
         / \\
        3   10       <-- 3 < 8, 10 > 8 ✓
       / \\    \\
      1   6    14    <-- 1 < 3, 6 > 3, 14 > 10 ✓
         / \\   /
        4   7 13     <-- every node obeys left < parent < right
        `,
        quiz: {
          question: "In a BST, where would you find the smallest element?",
          options: [
            "At the root",
            "Keep going left until you can't anymore",
            "Keep going right until you can't anymore",
            "It could be anywhere"
          ],
          answer: 1
        }
      },
      {
        title: "Searching a BST",
        content: `<p>Searching a BST is like playing a number-guessing game where someone always tells you "higher" or "lower".</p>
<p><strong>Time complexity:</strong> O(log n) on average — each comparison eliminates half the tree. But if the tree is lopsided (like a linked list), it degrades to O(n). That's why databases use <em>balanced</em> trees (AVL, Red-Black, B-Trees).</p>
<p>Compare this to SQL: <code>SELECT * FROM users WHERE id = 42</code> — the database doesn't scan every row. It walks the index tree, making the same left/right decisions.</p>`,
        code: `class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;   // smaller values go here
    this.right = null;  // larger values go here
  }
}

function search(node, target) {
  // Base case: we fell off the tree (not found)
  if (node === null) return null;

  // Found it!
  if (target === node.value) return node;

  // Target is smaller — go left (just like binary search)
  if (target < node.value) return search(node.left, target);

  // Target is larger — go right
  return search(node.right, target);
}`,
        language: "javascript"
      },
      {
        title: "Inserting into a BST",
        content: `<p>Insertion works the same way as search — walk down the tree until you find an empty spot, then attach the new node there.</p>
<p>Think of it like filing a document in a cabinet: you follow the labels (left = smaller, right = bigger) until you find the right empty slot.</p>`,
        code: `function insert(node, value) {
  // If tree is empty, this new node becomes the root
  if (node === null) return new BSTNode(value);

  if (value < node.value) {
    // Go left — the new node belongs somewhere in the left subtree
    node.left = insert(node.left, value);
  } else if (value > node.value) {
    // Go right
    node.right = insert(node.right, value);
  }
  // If value === node.value, it's a duplicate — we skip it

  return node; // return the (unchanged) current node
}

// Build a BST from scratch:
let root = null;
for (const val of [8, 3, 10, 1, 6, 14, 4, 7, 13]) {
  root = insert(root, val);
}`,
        language: "javascript",
        pitfall: "If you insert already-sorted data (1, 2, 3, 4, 5...), the BST becomes a linked list (everything goes right). This is why balanced BSTs exist — they automatically rearrange to stay roughly symmetric."
      },
      {
        title: "In-Order Traversal: Getting Sorted Output",
        content: `<p>One of the most powerful BST properties: an <strong>in-order traversal</strong> (left, root, right) visits nodes in <strong>sorted order</strong>. This is basically what happens when you run <code>SELECT * FROM table ORDER BY id</code> using an index.</p>`,
        code: `function inOrder(node, result = []) {
  if (node === null) return result;

  inOrder(node.left, result);    // 1. Visit everything smaller
  result.push(node.value);       // 2. Visit current node
  inOrder(node.right, result);   // 3. Visit everything larger

  return result;
}

// inOrder(root) => [1, 3, 4, 6, 7, 8, 10, 13, 14]
// Sorted! Just like ORDER BY.`,
        language: "javascript"
      },
      {
        title: "Deleting from a BST",
        content: `<p>Deletion is the trickiest BST operation. There are three cases:</p>
<ol>
  <li><strong>Leaf node</strong> (no children): Just remove it. Easy.</li>
  <li><strong>One child</strong>: Replace the node with its child. Like removing a middle manager — their direct report takes over.</li>
  <li><strong>Two children</strong>: Find the <em>in-order successor</em> (smallest node in the right subtree), copy its value up, then delete that successor node.</li>
</ol>`,
        code: `function deleteNode(node, value) {
  if (node === null) return null;

  if (value < node.value) {
    node.left = deleteNode(node.left, value);
  } else if (value > node.value) {
    node.right = deleteNode(node.right, value);
  } else {
    // Found the node to delete!

    // Case 1 & 2: zero or one child
    if (node.left === null) return node.right;
    if (node.right === null) return node.left;

    // Case 3: two children
    // Find the in-order successor (smallest in right subtree)
    let successor = node.right;
    while (successor.left !== null) {
      successor = successor.left;
    }
    // Copy successor's value here
    node.value = successor.value;
    // Delete the successor from the right subtree
    node.right = deleteNode(node.right, successor.value);
  }
  return node;
}`,
        language: "javascript",
        quiz: {
          question: "When deleting a BST node with two children, what replaces it?",
          options: [
            "The left child",
            "The right child",
            "The in-order successor (smallest in right subtree)",
            "The parent node"
          ],
          answer: 2
        }
      }
    ]
  },

  // ============================================================
  // WEEK 4, TOPIC 3 — Heaps & Priority Queues
  // ============================================================
  "w4t3": {
    takeaways: [
      "A heap always keeps the min (or max) element at the root, accessible in O(1).",
      "Heaps are stored as flat arrays; parent-child relationships use simple index math.",
      "Insert bubbles up, extract-min bubbles down, both O(log n).",
      "Use heaps for top-K problems, merge-K-sorted-lists, and Dijkstra's algorithm.",
      "A heap is NOT fully sorted; it only guarantees the root is the extreme value."
    ],
    sections: [
      {
        title: "What Is a Heap?",
        content: `<p>A <strong>heap</strong> is a tree-based structure where the parent is always "better" than its children — either always smaller (min-heap) or always larger (max-heap).</p>
<p><strong>Analogy:</strong> Think of a hospital emergency room. Patients aren't seen in arrival order — they're seen by <em>priority</em>. A heart attack patient jumps ahead of a sprained ankle. That's a priority queue, and a heap is the data structure that makes it fast.</p>
<p>In SQL terms: imagine <code>SELECT * FROM tasks ORDER BY priority LIMIT 1</code> — a heap gives you that top-priority item in O(1) and lets you insert/remove in O(log n).</p>`,
        diagram: `
  Min-Heap (parent <= children):

         1
        / \\
       3    2
      / \\  / \\
     7  6  5  4

  The MINIMUM is always at the root.
  Shape: a complete binary tree (filled level by level, left to right).
        `
      },
      {
        title: "Heaps Live in Arrays",
        content: `<p>Here's the clever trick: we don't need node objects with pointers. A heap is stored as a <strong>flat array</strong>. The parent-child relationships are computed with simple math:</p>
<ul>
  <li>Parent of index <code>i</code>: <code>Math.floor((i - 1) / 2)</code></li>
  <li>Left child of index <code>i</code>: <code>2 * i + 1</code></li>
  <li>Right child of index <code>i</code>: <code>2 * i + 2</code></li>
</ul>
<p>This is incredibly memory-efficient — no pointers, no wasted space, just a compact array.</p>`,
        diagram: `
  Array:  [1, 3, 2, 7, 6, 5, 4]
  Index:   0  1  2  3  4  5  6

  Index 0 (value 1) -> children at 1 (value 3) and 2 (value 2)
  Index 1 (value 3) -> children at 3 (value 7) and 4 (value 6)
  Index 2 (value 2) -> children at 5 (value 5) and 6 (value 4)
        `
      },
      {
        title: "Insert: Bubble Up",
        content: `<p>To insert a new element: add it at the end of the array (bottom of the tree), then <strong>bubble it up</strong> — swap with its parent as long as it's smaller (for a min-heap).</p>
<p>It's like a new employee who's really talented — they start at the bottom of the org chart but quickly get promoted up.</p>`,
        code: `class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);       // Add at the end
    this._bubbleUp(this.heap.length - 1);
  }

  _bubbleUp(index) {
    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);

      // If parent is already smaller, heap property is satisfied
      if (this.heap[parentIdx] <= this.heap[index]) break;

      // Swap with parent (child is smaller, so it should be higher)
      [this.heap[parentIdx], this.heap[index]] =
        [this.heap[index], this.heap[parentIdx]];

      index = parentIdx; // Move up and check again
    }
  }
}`,
        language: "javascript"
      },
      {
        title: "Extract Min: Bubble Down",
        content: `<p>To remove the minimum (the root): replace the root with the <em>last</em> element, then <strong>bubble it down</strong> — swap with the smaller child until the heap property is restored.</p>
<p>It's like the CEO retires. You temporarily put the newest intern in the CEO chair, then they get demoted down the org chart until they find their level.</p>`,
        code: `  // Inside MinHeap class:

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];                  // Save the minimum
    this.heap[0] = this.heap.pop();            // Move last to root
    this._bubbleDown(0);                       // Fix the heap
    return min;
  }

  _bubbleDown(index) {
    const length = this.heap.length;
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      // Check if left child is smaller
      if (left < length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }
      // Check if right child is even smaller
      if (right < length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      // If current is already the smallest, we're done
      if (smallest === index) break;

      // Swap with the smaller child
      [this.heap[smallest], this.heap[index]] =
        [this.heap[index], this.heap[smallest]];
      index = smallest;
    }
  }

  peek() {
    return this.heap[0] || null; // O(1) — just look at the root
  }`,
        language: "javascript"
      },
      {
        title: "When to Use Heaps",
        content: `<p>Use a heap/priority queue whenever you need to repeatedly find the "best" element:</p>
<ul>
  <li><strong>Top K problems</strong>: "Find the 10 most popular products" — use a min-heap of size 10.</li>
  <li><strong>Merging sorted lists</strong>: Heap tracks which list has the current smallest element.</li>
  <li><strong>Dijkstra's algorithm</strong>: Priority queue of nodes by distance (you'll see this in graphs).</li>
  <li><strong>Job scheduling</strong>: Process highest-priority tasks first.</li>
</ul>`,
        pitfall: "A heap is NOT fully sorted. It only guarantees the root is the min (or max). The second-smallest element could be on either side. If you need full sorting, you need a different structure.",
        quiz: {
          question: "What is the time complexity of getting the minimum from a min-heap?",
          options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
          answer: 2
        }
      }
    ]
  },

  // ============================================================
  // WEEK 4, TOPIC 4 — Graphs: Representation
  // ============================================================
  "w4t4": {
    takeaways: [
      "A graph is nodes plus edges; social networks, maps, and databases are all graphs.",
      "Adjacency lists are best for sparse graphs; adjacency matrices for dense graphs.",
      "Undirected edges go both ways; directed edges go one way only.",
      "Build graphs from edge lists by looping through pairs and populating neighbor arrays.",
      "A DAG (directed acyclic graph) models task dependencies, build systems, and pipelines."
    ],
    sections: [
      {
        title: "What Is a Graph?",
        content: `<p>If you've ever worked with SQL foreign keys, you've already worked with graphs. A graph is just a collection of <strong>nodes</strong> (things) and <strong>edges</strong> (connections between things).</p>
<p><strong>Real-world graphs:</strong></p>
<ul>
  <li>Social networks: people are nodes, friendships are edges</li>
  <li>Google Maps: intersections are nodes, roads are edges</li>
  <li>The internet: web pages are nodes, hyperlinks are edges</li>
  <li>Your SQL database: tables are nodes, foreign keys are edges</li>
</ul>
<p>Graphs are everywhere. Learning them unlocks a huge category of problems.</p>`,
        diagram: `
  Undirected graph:          Directed graph (digraph):

    A --- B                    A --> B
    |     |                    |     |
    C --- D                    v     v
                               C --> D

  Undirected: friendship       Directed: Twitter follow
  (mutual)                     (one-way)
        `
      },
      {
        title: "Adjacency List — The Go-To Representation",
        content: `<p>The most common way to store a graph in code is an <strong>adjacency list</strong>: for each node, keep a list of its neighbors.</p>
<p><strong>SQL analogy:</strong> It's like having a <code>connections</code> table: <code>FROM_NODE | TO_NODE</code>. The adjacency list groups that data by <code>FROM_NODE</code>.</p>
<p>Adjacency lists are memory-efficient for <em>sparse</em> graphs (few edges relative to nodes), which is most real-world graphs.</p>`,
        code: `// Adjacency list using a Map (most flexible)
const graph = new Map();

// Add nodes and their connections
graph.set('A', ['B', 'C']);
graph.set('B', ['A', 'D']);
graph.set('C', ['A', 'D']);
graph.set('D', ['B', 'C']);

// "Who are A's neighbors?"
console.log(graph.get('A')); // ['B', 'C']

// Using a plain object works too:
const graph2 = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D'],
  D: ['B', 'C']
};

// For weighted edges (like distances), store objects:
const weighted = {
  A: [{ node: 'B', weight: 4 }, { node: 'C', weight: 2 }],
  B: [{ node: 'A', weight: 4 }, { node: 'D', weight: 3 }],
  // ...
};`,
        language: "javascript"
      },
      {
        title: "Adjacency Matrix — When Density Matters",
        content: `<p>An <strong>adjacency matrix</strong> is a 2D grid where <code>matrix[i][j] = 1</code> means there's an edge from node i to node j.</p>
<p><strong>SQL analogy:</strong> Think of a cross-tab / pivot table where both rows and columns are the same set of nodes.</p>
<p>Matrices are great when the graph is <em>dense</em> (many edges) or when you need O(1) edge lookups. But they waste memory for sparse graphs.</p>`,
        code: `// Adjacency matrix for 4 nodes: A=0, B=1, C=2, D=3
//          A  B  C  D
const matrix = [
  /* A */  [0, 1, 1, 0],  // A connects to B and C
  /* B */  [1, 0, 0, 1],  // B connects to A and D
  /* C */  [1, 0, 0, 1],  // C connects to A and D
  /* D */  [0, 1, 1, 0],  // D connects to B and C
];

// "Is there an edge from A to B?"
console.log(matrix[0][1]); // 1 = yes (O(1) lookup!)

// "Is there an edge from A to D?"
console.log(matrix[0][3]); // 0 = no`,
        language: "javascript",
        diagram: `
  Comparison:
  +-------------------+------------------+------------------+
  |                   | Adjacency List   | Adjacency Matrix |
  +-------------------+------------------+------------------+
  | Space             | O(V + E)         | O(V^2)           |
  | Check edge exists | O(degree)        | O(1)             |
  | Find all neighbors| O(degree)        | O(V)             |
  | Best for          | Sparse graphs    | Dense graphs     |
  +-------------------+------------------+------------------+
  V = vertices (nodes), E = edges
        `
      },
      {
        title: "Directed vs. Undirected, Weighted vs. Unweighted",
        content: `<p>Graphs have flavors:</p>
<ul>
  <li><strong>Undirected</strong>: Edges go both ways (friendship). If A-B exists, B-A exists too.</li>
  <li><strong>Directed</strong>: Edges are one-way (Twitter follow). A->B doesn't imply B->A.</li>
  <li><strong>Weighted</strong>: Edges have values (road distances, costs).</li>
  <li><strong>Unweighted</strong>: All edges are equal.</li>
  <li><strong>Cyclic</strong>: You can follow edges in a loop back to where you started.</li>
  <li><strong>Acyclic</strong>: No loops. A directed acyclic graph (DAG) is hugely important — think task dependencies, build systems, data pipelines.</li>
</ul>`,
        quiz: {
          question: "Which representation gives O(1) time to check if an edge exists between two specific nodes?",
          options: [
            "Adjacency list",
            "Adjacency matrix",
            "Both are O(1)",
            "Neither — you always need O(n)"
          ],
          answer: 1
        }
      },
      {
        title: "Building Graphs from Edge Lists",
        content: `<p>Often you'll receive graph data as an edge list (like SQL rows). Here's how to convert it to an adjacency list:</p>`,
        code: `// Edge list — like rows from a SQL table:
// SELECT from_node, to_node FROM edges;
const edges = [
  ['A', 'B'],
  ['A', 'C'],
  ['B', 'D'],
  ['C', 'D'],
];

// Build adjacency list for an UNDIRECTED graph
function buildGraph(edges) {
  const graph = {};

  for (const [from, to] of edges) {
    // Initialize arrays if needed
    if (!graph[from]) graph[from] = [];
    if (!graph[to]) graph[to] = [];

    // Undirected: add both directions
    graph[from].push(to);
    graph[to].push(from);
  }
  return graph;
}

// For a DIRECTED graph, only add one direction:
// graph[from].push(to);  // no reverse edge

console.log(buildGraph(edges));
// { A: ['B','C'], B: ['A','D'], C: ['A','D'], D: ['B','C'] }`,
        language: "javascript"
      }
    ]
  },

  // ============================================================
  // WEEK 4, TOPIC 5 — Graph Traversal: BFS & DFS
  // ============================================================
  "w4t5": {
    takeaways: [
      "BFS uses a queue and explores level by level; DFS uses a stack and goes deep first.",
      "BFS finds the shortest path in unweighted graphs; DFS is great for cycle detection.",
      "Always mark nodes visited when you enqueue (BFS) to avoid duplicates.",
      "Both BFS and DFS run in O(V + E) time, visiting every vertex and edge once.",
      "Track parent pointers during BFS to reconstruct the shortest path."
    ],
    sections: [
      {
        title: "Why Traverse a Graph?",
        content: `<p>Graph traversal means visiting every reachable node. It's the foundation for almost every graph algorithm: finding paths, detecting cycles, connected components, and more.</p>
<p>There are two strategies, and they differ in one simple way:</p>
<ul>
  <li><strong>BFS (Breadth-First Search)</strong>: Explore neighbors first, then neighbors' neighbors. Uses a <strong>queue</strong>. Like ripples spreading outward from a stone dropped in water.</li>
  <li><strong>DFS (Depth-First Search)</strong>: Go as deep as possible first, then backtrack. Uses a <strong>stack</strong> (or recursion). Like exploring a maze by always taking the first unexplored turn.</li>
</ul>
<p><strong>SQL analogy:</strong> Think of a <code>users</code> table with a <code>referred_by</code> column. BFS finds all referrals within N degrees. DFS traces one referral chain all the way to its end.</p>`
      },
      {
        title: "BFS — Level by Level",
        content: `<p>BFS explores in <strong>layers</strong>. First all nodes 1 step away, then 2 steps, then 3 steps. This means BFS naturally finds the <strong>shortest path</strong> in an unweighted graph.</p>
<p><strong>Analogy:</strong> You're looking for your keys. BFS = search every room on floor 1 before going to floor 2. Methodical.</p>`,
        code: `function bfs(graph, start) {
  const visited = new Set();   // Track where we've been
  const queue = [start];       // FIFO queue — process oldest first
  const result = [];           // Order we visit nodes

  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();     // Dequeue the oldest
    result.push(node);

    // Add all unvisited neighbors to the queue
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);       // Mark visited IMMEDIATELY
        queue.push(neighbor);        // Enqueue for later processing
      }
    }
  }
  return result;
}

const graph = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'], E: ['B'], F: ['C']
};

console.log(bfs(graph, 'A'));
// ['A', 'B', 'C', 'D', 'E', 'F'] — level by level!`,
        language: "javascript",
        pitfall: "Always mark nodes as visited when you ENQUEUE them, not when you dequeue. Otherwise you'll add the same node to the queue multiple times."
      },
      {
        title: "BFS — Shortest Path",
        content: `<p>To find the shortest path, track where each node was reached from:</p>`,
        code: `function bfsShortestPath(graph, start, target) {
  const visited = new Set([start]);
  const queue = [start];
  const parent = { [start]: null };  // Track how we got to each node

  while (queue.length > 0) {
    const node = queue.shift();

    if (node === target) {
      // Reconstruct path by following parent pointers backward
      const path = [];
      let current = target;
      while (current !== null) {
        path.unshift(current);     // Add to front
        current = parent[current]; // Go to parent
      }
      return path;
    }

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent[neighbor] = node;   // Remember: we got here FROM node
        queue.push(neighbor);
      }
    }
  }
  return null; // No path found
}

// bfsShortestPath(graph, 'A', 'F') => ['A', 'C', 'F']`,
        language: "javascript"
      },
      {
        title: "DFS — Go Deep First",
        content: `<p>DFS dives as deep as possible before backtracking. It's naturally recursive.</p>
<p><strong>Analogy:</strong> You're looking for your keys. DFS = pick a room, open every drawer, check inside every box in each drawer. Finish one room completely before trying the next.</p>
<p>DFS is great for: detecting cycles, topological sorting, finding connected components, and solving maze-like problems.</p>`,
        code: `// Recursive DFS (most intuitive)
function dfs(graph, node, visited = new Set()) {
  visited.add(node);
  console.log(node);  // Process this node

  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);  // Recurse deeper
    }
  }
  return visited;
}

// Iterative DFS (uses an explicit stack instead of recursion)
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];      // LIFO — process newest first
  const result = [];

  while (stack.length > 0) {
    const node = stack.pop();       // Pop the most recent

    if (visited.has(node)) continue;
    visited.add(node);
    result.push(node);

    // Push neighbors onto stack (they'll be processed depth-first)
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
  return result;
}`,
        language: "javascript"
      },
      {
        title: "BFS vs DFS — When to Use Which",
        content: `<p>Here's a practical decision guide:</p>
<table>
  <tr><th>Use BFS when...</th><th>Use DFS when...</th></tr>
  <tr><td>Finding <strong>shortest path</strong> (unweighted)</td><td>Detecting <strong>cycles</strong></td></tr>
  <tr><td>Exploring nodes by <strong>distance</strong></td><td>Exploring all <strong>paths</strong></td></tr>
  <tr><td>Level-order traversal of a tree</td><td>Topological sort (task ordering)</td></tr>
  <tr><td>Checking if two nodes are close</td><td>Solving mazes / puzzles</td></tr>
</table>
<p>Both have the same time complexity: <strong>O(V + E)</strong> — you visit every vertex and check every edge once.</p>`,
        quiz: {
          question: "You need to find the minimum number of hops between two users in a social network. Which algorithm should you use?",
          options: [
            "DFS — it explores all paths",
            "BFS — it finds shortest paths in unweighted graphs",
            "Either one works equally well",
            "Neither — you need Dijkstra's"
          ],
          answer: 1
        }
      }
    ]
  },

  // ============================================================
  // WEEK 5, TOPIC 1 — HTML & CSS Beyond Basics
  // ============================================================
  "w5t1": {
    takeaways: [
      "Use semantic HTML tags (header, nav, main, article) instead of div for everything.",
      "Flexbox handles one-dimensional layout (row or column); Grid handles two dimensions.",
      "Write mobile-first CSS: base styles for small screens, then min-width media queries for larger ones.",
      "CSS custom properties (variables) let you change a value in one place and update everywhere.",
      "Use content-based breakpoints, not device-specific ones."
    ],
    sections: [
      {
        title: "Semantic HTML: Writing Meaningful Markup",
        content: `<p>Most beginners throw everything in <code>&lt;div&gt;</code> tags. But HTML has <strong>semantic</strong> elements that describe what the content <em>is</em>, not just how it looks.</p>
<p><strong>SQL analogy:</strong> Using <code>&lt;div&gt;</code> for everything is like having one table called <code>data</code> with columns <code>field1</code>, <code>field2</code>... Semantic HTML is like using properly named tables: <code>users</code>, <code>orders</code>, <code>products</code>.</p>
<p>Why it matters: accessibility (screen readers), SEO (Google understands your content), and maintainability (you can read your own code).</p>`,
        code: `<!-- BAD: div soup -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="main">
  <div class="article">
    <div class="title">My Post</div>
  </div>
  <div class="sidebar">...</div>
</div>
<div class="footer">...</div>

<!-- GOOD: semantic HTML -->
<header>
  <nav>...</nav>
</header>
<main>
  <article>
    <h1>My Post</h1>
    <p>Content here...</p>
  </article>
  <aside>...</aside>    <!-- sidebar content -->
</main>
<footer>...</footer>`,
        language: "html"
      },
      {
        title: "Flexbox — One-Dimensional Layout",
        content: `<p>Flexbox handles layout in <strong>one direction</strong> — either a row or a column. It's the workhorse for aligning items.</p>
<p><strong>Analogy:</strong> Flexbox is like a bookshelf. Items are books, the container is the shelf. You decide: stack horizontally or vertically? Spread evenly or pack to one side?</p>`,
        code: `/* The container controls the layout */
.navbar {
  display: flex;              /* Activate flexbox */
  justify-content: space-between; /* Spread items across main axis */
  align-items: center;        /* Center items on cross axis */
  gap: 1rem;                  /* Space between items */
}

/* Children can grow/shrink */
.nav-item {
  flex: 1;       /* Each item takes equal space */
}

.logo {
  flex: 0 0 auto; /* Don't grow, don't shrink, stay natural size */
}

/* Common pattern: push last item to the right */
.nav-item:last-child {
  margin-left: auto;  /* Pushes it to the far right */
}`,
        language: "css"
      },
      {
        title: "CSS Grid — Two-Dimensional Layout",
        content: `<p>Grid handles <strong>rows AND columns</strong> simultaneously. It's perfect for page layouts, dashboards, and anything that needs a 2D structure.</p>
<p><strong>Analogy:</strong> If flexbox is a bookshelf (1D), Grid is a spreadsheet (2D). You define rows and columns, then place items into cells.</p>`,
        code: `/* Define a classic page layout */
.page {
  display: grid;
  grid-template-columns: 250px 1fr;      /* sidebar + main */
  grid-template-rows: 60px 1fr 40px;     /* header + content + footer */
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

/* Responsive card grid — auto-fill as many as fit */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  /* Cards automatically wrap to new rows as the screen shrinks! */
}`,
        language: "css"
      },
      {
        title: "Responsive Design with Media Queries",
        content: `<p>Your site needs to work on phones, tablets, and desktops. <strong>Media queries</strong> let you apply different styles based on screen size.</p>
<p><strong>Mobile-first</strong> is the standard approach: write styles for mobile first, then add complexity for larger screens.</p>`,
        code: `/* Base styles (mobile-first) */
.container {
  padding: 1rem;
  font-size: 16px;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr;  /* Single column on mobile */
  gap: 1rem;
}

/* Tablet and up (768px+) */
@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);  /* Two columns */
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;   /* Center the container */
  }
  .card-grid {
    grid-template-columns: repeat(3, 1fr);  /* Three columns */
  }
}`,
        language: "css",
        pitfall: "Don't target specific devices (iPhone 14, Galaxy S23). Use content-based breakpoints instead — resize your browser and add a breakpoint where your layout starts to break."
      },
      {
        title: "CSS Custom Properties (Variables)",
        content: `<p>CSS variables let you define reusable values. Change one variable and it updates everywhere — like constants in your code.</p>`,
        code: `/* Define variables on :root (available everywhere) */
:root {
  --color-primary: #3b82f6;
  --color-text: #1f2937;
  --color-bg: #ffffff;
  --font-size-base: 16px;
  --spacing: 1rem;
  --radius: 8px;
}

/* Use variables anywhere */
.button {
  background: var(--color-primary);
  color: white;
  padding: var(--spacing);
  border-radius: var(--radius);
}

/* Dark mode? Just swap the variables! */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #f3f4f6;
    --color-bg: #111827;
  }
}`,
        language: "css",
        quiz: {
          question: "What does 'mobile-first' CSS mean?",
          options: [
            "Only support mobile devices",
            "Write base styles for mobile, then add styles for larger screens with min-width queries",
            "Use max-width media queries to override desktop styles for mobile",
            "Always use flexbox instead of grid"
          ],
          answer: 1
        }
      }
    ]
  },

  // ============================================================
  // WEEK 5, TOPIC 2 — JavaScript & the DOM
  // ============================================================
  "w5t2": {
    takeaways: [
      "The DOM is the browser's live tree of your HTML that JavaScript can read and modify.",
      "Use querySelector and querySelectorAll to find elements, like SQL WHERE clauses.",
      "Never use innerHTML with user input; it creates XSS vulnerabilities. Use textContent instead.",
      "Event delegation (one listener on a parent) handles dynamic elements and saves memory.",
      "Use classList.add/remove/toggle to change styles instead of modifying style properties directly."
    ],
    sections: [
      {
        title: "What Is the DOM?",
        content: `<p>The <strong>DOM (Document Object Model)</strong> is the browser's representation of your HTML page as a tree of JavaScript objects. Every HTML element becomes a node you can manipulate with code.</p>
<p><strong>SQL analogy:</strong> If your HTML is a database, the DOM is a live query result set that you can <em>modify in place</em>. Change a DOM node, and the page updates instantly.</p>
<p>When the browser loads HTML, it parses it into this tree structure. JavaScript gives you an API to read and change this tree.</p>`,
        diagram: `
  HTML:                  DOM Tree:
  <html>                 document
    <body>                 └─ html
      <h1>Hi</h1>             └─ body
      <p>Text</p>                 ├─ h1
    </body>                       │   └─ "Hi"
  </html>                         └─ p
                                      └─ "Text"
        `
      },
      {
        title: "Selecting Elements",
        content: `<p>Before you can change something on the page, you need to <strong>find</strong> it. Think of these as SQL queries against the DOM.</p>`,
        code: `// querySelector — like SELECT ... WHERE (returns first match)
const title = document.querySelector('h1');           // by tag
const btn = document.querySelector('.btn-primary');   // by class
const form = document.querySelector('#login-form');   // by ID
const link = document.querySelector('nav a.active');  // CSS selector

// querySelectorAll — like SELECT ... (returns ALL matches)
const allCards = document.querySelectorAll('.card');
// Returns a NodeList (array-like) — loop over it:
allCards.forEach(card => {
  console.log(card.textContent);
});

// Older methods (still common in existing code):
document.getElementById('login-form');       // by ID
document.getElementsByClassName('card');     // by class (live collection)
document.getElementsByTagName('p');          // by tag (live collection)`,
        language: "javascript"
      },
      {
        title: "Modifying Elements",
        content: `<p>Once you have an element, you can change its content, style, attributes — anything.</p>`,
        code: `const heading = document.querySelector('h1');

// Change text content (safe — won't parse HTML)
heading.textContent = 'Welcome, User!';

// Change HTML content (careful — can cause XSS if using user input!)
heading.innerHTML = 'Welcome, <em>User</em>!';

// Change styles directly
heading.style.color = '#3b82f6';
heading.style.fontSize = '2rem';

// Better: toggle CSS classes (keeps style in CSS where it belongs)
heading.classList.add('highlighted');
heading.classList.remove('hidden');
heading.classList.toggle('active');    // add if missing, remove if present

// Change attributes
const img = document.querySelector('img');
img.setAttribute('src', '/new-image.png');
img.setAttribute('alt', 'A cute cat');

// Data attributes — store custom data on elements
// <div data-user-id="42" data-role="admin">
const div = document.querySelector('[data-user-id]');
console.log(div.dataset.userId);  // "42" (camelCase!)
console.log(div.dataset.role);    // "admin"`,
        language: "javascript",
        pitfall: "Never use innerHTML with user-supplied data! It creates a Cross-Site Scripting (XSS) vulnerability. Use textContent for text, or create elements programmatically."
      },
      {
        title: "Creating and Removing Elements",
        content: `<p>You can build new HTML elements entirely from JavaScript and insert them into the page.</p>`,
        code: `// Create a new element
const card = document.createElement('div');
card.classList.add('card');
card.textContent = 'New card!';

// Add it to the page
document.querySelector('.card-container').appendChild(card);

// Insert at a specific position
const container = document.querySelector('.list');
const newItem = document.createElement('li');
newItem.textContent = 'Inserted item';
const thirdItem = container.children[2];
container.insertBefore(newItem, thirdItem); // Insert BEFORE the 3rd item

// Remove an element
const old = document.querySelector('.outdated');
old.remove(); // Modern way — just call .remove()

// Build a list from data (common pattern)
const users = ['Alice', 'Bob', 'Charlie'];
const ul = document.createElement('ul');
users.forEach(name => {
  const li = document.createElement('li');
  li.textContent = name;
  ul.appendChild(li);
});
document.body.appendChild(ul);`,
        language: "javascript"
      },
      {
        title: "Event Handling — Making Pages Interactive",
        content: `<p>Events are user actions: clicks, key presses, form submissions, scrolling. You attach <strong>event listeners</strong> to respond to them.</p>
<p><strong>Analogy:</strong> Events are like database triggers in SQL — "when this happens, run this function."</p>`,
        code: `// Basic click handler
const button = document.querySelector('#submit-btn');
button.addEventListener('click', function(event) {
  console.log('Button clicked!');
  console.log(event.target); // The element that was clicked
});

// Arrow function version
button.addEventListener('click', (e) => {
  e.preventDefault(); // Stop default behavior (e.g., form submission)
  console.log('Handled!');
});

// Form submission
const form = document.querySelector('#login-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();  // Don't reload the page!

  // Read form values
  const email = form.querySelector('#email').value;
  const password = form.querySelector('#password').value;
  console.log('Login attempt:', email);
});

// Event delegation — handle clicks on MANY items with ONE listener
// (Like putting a trigger on a parent table instead of each row)
document.querySelector('.todo-list').addEventListener('click', (e) => {
  // Check what was actually clicked
  if (e.target.classList.contains('delete-btn')) {
    e.target.closest('.todo-item').remove();
  }
});`,
        language: "javascript",
        quiz: {
          question: "Why use event delegation (one listener on a parent) instead of individual listeners?",
          options: [
            "It looks cleaner",
            "It handles dynamically added elements and uses less memory",
            "It's faster to type",
            "Individual listeners don't actually work"
          ],
          answer: 1
        }
      }
    ]
  },

  // ============================================================
  // WEEK 5, TOPIC 3 — HTTP, APIs & REST
  // ============================================================
  "w5t3": {
    takeaways: [
      "HTTP methods map to CRUD: GET=read, POST=create, PUT/PATCH=update, DELETE=delete.",
      "REST APIs use nouns in URLs (/api/users/42) and HTTP methods for the action.",
      "Always check response.ok after fetch; HTTP errors don't throw by default in JavaScript.",
      "Status codes: 2xx=success, 4xx=client error (your fault), 5xx=server error (their fault).",
      "Use async/await with fetch for readable HTTP request code."
    ],
    sections: [
      {
        title: "How the Web Talks: HTTP",
        content: `<p><strong>HTTP (HyperText Transfer Protocol)</strong> is the language browsers and servers use to communicate. Every time you visit a website, your browser sends an HTTP <strong>request</strong> and the server sends back a <strong>response</strong>.</p>
<p><strong>Analogy:</strong> HTTP is like ordering at a restaurant. You (client) give your order (request) to the waiter (HTTP). The kitchen (server) prepares it and the waiter brings it back (response). The order slip has a specific format — what you want, any modifications, your table number.</p>`,
        diagram: `
  Client (Browser)                     Server
  ─────────────────                    ──────────
  GET /api/users HTTP/1.1      ──>    Receives request
  Host: example.com                    Queries database
  Accept: application/json             Builds response
                                <──
                               HTTP/1.1 200 OK
                               Content-Type: application/json
                               [{"id":1,"name":"Alice"}, ...]
        `
      },
      {
        title: "HTTP Methods — The CRUD Connection",
        content: `<p>You already know CRUD from SQL. HTTP methods map directly:</p>
<table>
  <tr><th>SQL</th><th>HTTP Method</th><th>Meaning</th></tr>
  <tr><td>SELECT</td><td>GET</td><td>Read data</td></tr>
  <tr><td>INSERT</td><td>POST</td><td>Create new data</td></tr>
  <tr><td>UPDATE</td><td>PUT / PATCH</td><td>Update existing data</td></tr>
  <tr><td>DELETE</td><td>DELETE</td><td>Remove data</td></tr>
</table>
<p><strong>PUT</strong> replaces the entire resource (like <code>UPDATE ... SET all columns</code>). <strong>PATCH</strong> updates only the specified fields.</p>`
      },
      {
        title: "REST — Designing Clean APIs",
        content: `<p><strong>REST (Representational State Transfer)</strong> is a set of conventions for designing web APIs. Think of it as naming conventions for your API endpoints.</p>
<p><strong>SQL analogy:</strong> If your database has tables, REST URLs map to those tables:</p>`,
        code: `// REST URL patterns — notice how they mirror SQL tables:

// GET    /api/users          -> SELECT * FROM users
// GET    /api/users/42       -> SELECT * FROM users WHERE id = 42
// POST   /api/users          -> INSERT INTO users ...
// PUT    /api/users/42       -> UPDATE users SET ... WHERE id = 42
// DELETE /api/users/42       -> DELETE FROM users WHERE id = 42

// Nested resources (foreign key relationships):
// GET    /api/users/42/posts -> SELECT * FROM posts WHERE user_id = 42

// Query parameters = WHERE clauses:
// GET    /api/users?role=admin&sort=name
// -> SELECT * FROM users WHERE role = 'admin' ORDER BY name`,
        language: "javascript"
      },
      {
        title: "Fetch API — Making HTTP Requests from JavaScript",
        content: `<p>The <code>fetch</code> function lets you make HTTP requests from JavaScript. It returns a <strong>Promise</strong> (an object that represents a future value).</p>`,
        code: `// GET request — fetch data
async function getUsers() {
  const response = await fetch('/api/users');

  // Check if request was successful
  if (!response.ok) {
    throw new Error(\`HTTP error: \${response.status}\`);
  }

  const users = await response.json(); // Parse JSON body
  return users;
}

// POST request — send data
async function createUser(name, email) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',  // Tell server we're sending JSON
    },
    body: JSON.stringify({ name, email }),  // Convert JS object to JSON string
  });

  if (!response.ok) throw new Error('Failed to create user');
  return await response.json(); // Server usually returns the created object
}

// PUT request — update data
async function updateUser(id, data) {
  const response = await fetch(\`/api/users/\${id}\`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await response.json();
}

// DELETE request
async function deleteUser(id) {
  await fetch(\`/api/users/\${id}\`, { method: 'DELETE' });
}`,
        language: "javascript"
      },
      {
        title: "HTTP Status Codes",
        content: `<p>Status codes tell you what happened. Think of them as result messages:</p>
<ul>
  <li><strong>2xx — Success</strong>: 200 OK, 201 Created, 204 No Content</li>
  <li><strong>3xx — Redirect</strong>: 301 Moved Permanently, 304 Not Modified</li>
  <li><strong>4xx — Client Error</strong> (your fault): 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity</li>
  <li><strong>5xx — Server Error</strong> (server's fault): 500 Internal Server Error, 503 Service Unavailable</li>
</ul>
<p><strong>Mnemonic:</strong> 2xx = "You got it." 4xx = "You messed up." 5xx = "We messed up."</p>`,
        quiz: {
          question: "Which HTTP method corresponds to SQL's INSERT?",
          options: ["GET", "POST", "PUT", "PATCH"],
          answer: 1
        }
      }
    ]
  },

  // ============================================================
  // WEEK 5, TOPIC 4 — Git & Version Control
  // ============================================================
  "w5t4": {
    takeaways: [
      "Git has three zones: working directory, staging area, and repository.",
      "Branches let you work on features in isolation; merge when ready.",
      "Commit messages should describe what changed and why, not just 'fixed stuff'.",
      "Use 'git revert' on shared branches, not 'git reset --hard', to undo changes safely.",
      "The pull request workflow is: branch, commit, push, open PR, review, merge."
    ],
    sections: [
      {
        title: "Why Version Control?",
        content: `<p>Imagine writing a SQL migration that breaks your database. Without version control, you'd have to remember exactly what you changed and manually undo it. With <strong>Git</strong>, you can instantly revert to any previous version of your entire codebase.</p>
<p><strong>Analogy:</strong> Git is like "Track Changes" in Google Docs, but for your entire project. Every save point (commit) is a snapshot you can go back to. Multiple people can edit simultaneously and merge their changes.</p>
<p>Git is not just a backup tool — it's a <strong>collaboration protocol</strong> used by every software team in the world.</p>`
      },
      {
        title: "The Three Areas of Git",
        content: `<p>Git has three "zones" for your files:</p>
<ol>
  <li><strong>Working Directory</strong>: Your actual files on disk. Edit freely here.</li>
  <li><strong>Staging Area</strong> (Index): A prep zone. You choose which changes go into the next commit.</li>
  <li><strong>Repository</strong> (.git): The permanent history of all commits.</li>
</ol>`,
        diagram: `
  Working Directory    Staging Area    Repository (.git)
  ──────────────────   ──────────────  ─────────────────
  Edit files freely    "git add"       "git commit"
  ─────────────>       ─────────>      ─────────>

  You write code.      You select      You save a
                       what to commit.  permanent snapshot.
        `,
        code: `# See what's changed
git status

# Stage specific files (like choosing which rows to INSERT)
git add index.html style.css

# Stage everything that's changed
git add .

# Commit — create a permanent snapshot with a message
git commit -m "Add login page layout and styles"

# See the history of commits
git log --oneline
# a1b2c3d Add login page layout and styles
# d4e5f6a Initial project setup
# ...`,
        language: "bash"
      },
      {
        title: "Branching — Parallel Universes",
        content: `<p>Branches let you work on features in isolation without affecting the main code. Think of them as parallel timelines.</p>
<p><strong>SQL analogy:</strong> It's like having a development copy of your database where you can experiment freely, then merge your changes back into production when they're ready.</p>`,
        code: `# Create a new branch and switch to it
git checkout -b feature/add-search
# This is shorthand for:
# git branch feature/add-search    (create)
# git checkout feature/add-search  (switch)

# Now any commits you make only exist on this branch.
# The 'main' branch is untouched.

# When your feature is done, merge it back:
git checkout main                    # Switch back to main
git merge feature/add-search         # Bring in the changes

# Delete the branch (optional, cleanup)
git branch -d feature/add-search

# Common branch naming conventions:
# feature/add-search     — new feature
# bugfix/fix-login       — bug fix
# hotfix/security-patch  — urgent production fix`,
        language: "bash"
      },
      {
        title: "Working with Remotes (GitHub)",
        content: `<p>A <strong>remote</strong> is a copy of your repository on a server (like GitHub). It lets you collaborate and back up your code.</p>`,
        code: `# Clone someone's repository
git clone https://github.com/user/project.git

# Push your commits to GitHub
git push origin main

# Pull the latest changes from GitHub
git pull origin main

# The typical workflow:
# 1. Pull latest changes
git pull origin main

# 2. Create a feature branch
git checkout -b feature/new-thing

# 3. Make changes, commit
git add .
git commit -m "Add new thing"

# 4. Push your branch to GitHub
git push origin feature/new-thing

# 5. Create a Pull Request on GitHub (code review)
# 6. After approval, merge into main`,
        language: "bash"
      },
      {
        title: "Undoing Things — Your Safety Net",
        content: `<p>Mistakes happen. Git has several ways to undo things:</p>`,
        code: `# Undo changes to a file (before staging)
git checkout -- filename.js

# Unstage a file (keep the changes, just remove from staging)
git reset HEAD filename.js

# Undo the last commit (keep changes in working directory)
git reset --soft HEAD~1

# Undo the last commit completely (discard changes)
git reset --hard HEAD~1  # CAREFUL: destroys uncommitted work!

# Create a NEW commit that undoes a previous one (safe for shared branches)
git revert abc123

# See what changed in a specific commit
git show abc123

# See differences between your files and the last commit
git diff`,
        language: "bash",
        pitfall: "Never use 'git reset --hard' on branches that other people are working on. Use 'git revert' instead — it creates a new commit that undoes the change, keeping history clean.",
        quiz: {
          question: "What does 'git add' do?",
          options: [
            "Creates a new commit",
            "Pushes code to GitHub",
            "Moves changes to the staging area",
            "Creates a new branch"
          ],
          answer: 2
        }
      }
    ]
  },

  // ============================================================
  // WEEK 5, TOPIC 5 — Command Line & Dev Tools
  // ============================================================
  "w5t5": {
    takeaways: [
      "The pipe operator (|) chains commands; output of one becomes input to the next.",
      "Use npm (JavaScript) or pip (Python) to install and manage third-party packages.",
      "Browser DevTools Network tab shows every HTTP request; filter by XHR for API calls.",
      "The command line lets you automate tasks that GUIs can't; learn it early.",
      "grep searches file contents, find searches file names, and ls lists directory contents."
    ],
    sections: [
      {
        title: "Why the Command Line?",
        content: `<p>The command line (terminal) is how developers interact with computers at a fundamental level. GUIs are nice, but the terminal lets you <strong>automate</strong>, <strong>script</strong>, and work <strong>faster</strong>.</p>
<p><strong>Analogy:</strong> The GUI is like a restaurant menu — you pick from what's offered. The command line is like talking directly to the chef — you can ask for anything.</p>
<p>As someone who writes SQL, you already use a text-based interface. The command line is the same idea, but for your entire computer.</p>`
      },
      {
        title: "Essential Navigation Commands",
        content: `<p>Think of the file system as a tree (like a directory/folder structure). These commands let you move around:</p>`,
        code: `# Where am I right now?
pwd
# /home/user/projects/my-app

# What's in this directory? (like SELECT * FROM current_folder)
ls          # List files
ls -la      # List ALL files (including hidden) with details

# Change directory
cd projects          # Go into 'projects' folder
cd ..                # Go up one level (parent)
cd ~                 # Go to home directory
cd /                 # Go to root of file system

# Create / delete
mkdir new-folder          # Create a directory
touch newfile.js          # Create an empty file
rm file.txt               # Delete a file (permanent! No trash!)
rm -r folder/             # Delete a folder and everything inside
cp source.txt dest.txt    # Copy a file
mv old.txt new.txt        # Move or rename a file

# View file contents
cat file.txt              # Print entire file
head -20 file.txt         # First 20 lines
tail -20 file.txt         # Last 20 lines
less file.txt             # Scrollable viewer (q to quit)`,
        language: "bash"
      },
      {
        title: "Pipes and Redirects — Chaining Commands",
        content: `<p>The pipe (<code>|</code>) sends the output of one command as input to another. It's like chaining SQL subqueries.</p>`,
        code: `# Find all JavaScript files and count them
# (like SELECT COUNT(*) FROM files WHERE extension = '.js')
find . -name "*.js" | wc -l

# Search for "TODO" in all files (like WHERE content LIKE '%TODO%')
grep -r "TODO" .

# Search for a pattern and show context
grep -r "bug" --include="*.js" -n    # -n shows line numbers

# Chain commands: find large files, sort by size
ls -la | sort -k5 -n -r | head -10   # Top 10 biggest files

# Redirect output to a file (like INSERT INTO)
echo "Hello" > file.txt     # Write (overwrites)
echo "World" >> file.txt    # Append

# Process text
cat users.csv | sort | uniq       # Sort and remove duplicates
cat log.txt | grep "ERROR" | wc -l  # Count error lines`,
        language: "bash"
      },
      {
        title: "Package Managers: npm and pip",
        content: `<p>Package managers install libraries (other people's code) that you can use in your project. Like app stores for code.</p>`,
        code: `# --- npm (Node.js / JavaScript) ---

# Initialize a new project (creates package.json)
npm init -y

# Install a package (adds to node_modules/ and package.json)
npm install express          # Production dependency
npm install --save-dev jest  # Development-only dependency

# Install all dependencies from package.json
npm install

# Run scripts defined in package.json
npm run start
npm run test

# --- pip (Python) ---

# Install a package
pip install flask
pip install requests

# Save current packages to a file (like a snapshot)
pip freeze > requirements.txt

# Install from requirements file
pip install -r requirements.txt`,
        language: "bash"
      },
      {
        title: "Browser DevTools — Your X-Ray Vision",
        content: `<p>Every browser has built-in developer tools (F12 or Ctrl+Shift+I). These are your most powerful debugging friends:</p>
<ul>
  <li><strong>Elements tab</strong>: Inspect and edit HTML/CSS live. Click any element on the page to see its styles.</li>
  <li><strong>Console tab</strong>: Run JavaScript, see errors and logs. <code>console.log()</code> output shows here.</li>
  <li><strong>Network tab</strong>: See every HTTP request — URL, method, status, response body. Invaluable for debugging API calls.</li>
  <li><strong>Sources tab</strong>: Set breakpoints in JavaScript. Step through code line by line.</li>
  <li><strong>Application tab</strong>: View cookies, localStorage, sessionStorage.</li>
</ul>
<p><strong>Pro tip:</strong> The Network tab is like a SQL query log for HTTP. Filter by "XHR" to see only API calls.</p>`,
        quiz: {
          question: "What does the pipe operator (|) do in the command line?",
          options: [
            "Creates a new file",
            "Sends the output of one command as input to the next",
            "Runs two commands at the same time",
            "Compares two files"
          ],
          answer: 1
        }
      }
    ]
  },

  // ============================================================
  // WEEK 6, TOPIC 1 — Node.js / Python Backend Basics
  // ============================================================
  "w6t1": {
    takeaways: [
      "A backend handles business logic and database queries; the frontend is what users see.",
      "Express (Node.js) and Flask (Python) are lightweight frameworks for building REST APIs.",
      "Middleware runs between request and response; always call next() or send a response.",
      "Never hardcode secrets in source code; use environment variables and .env files.",
      "Add .env to .gitignore so secrets never end up in your Git history."
    ],
    sections: [
      {
        title: "What Is a Backend?",
        content: `<p>The <strong>backend</strong> is the server-side code that handles business logic, database queries, and serves data to clients. When your SQL queries run, they're running on a backend.</p>
<p><strong>Analogy:</strong> A restaurant. The <em>frontend</em> is the dining room (what customers see). The <em>backend</em> is the kitchen (where food is prepared). The <em>API</em> is the waiter (carries orders and food between them). The <em>database</em> is the pantry.</p>
<p>We'll learn both <strong>Node.js (JavaScript)</strong> and <strong>Python (Flask)</strong> — both are excellent choices for beginners.</p>`
      },
      {
        title: "Node.js + Express — Hello World Server",
        content: `<p><strong>Express</strong> is the most popular Node.js web framework. It lets you define API routes with minimal code.</p>`,
        code: `// server.js — a complete Express server

const express = require('express');  // Import Express
const app = express();               // Create an app
const PORT = 3000;

// Middleware: parse JSON request bodies
app.use(express.json());

// In-memory "database" (we'll use real SQL later)
let todos = [
  { id: 1, text: 'Learn Express', done: false },
  { id: 2, text: 'Build an API',  done: false },
];

// GET /api/todos — Read all todos
// Equivalent: SELECT * FROM todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// GET /api/todos/:id — Read one todo
// Equivalent: SELECT * FROM todos WHERE id = ?
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Not found' });
  res.json(todo);
});

// POST /api/todos — Create a todo
// Equivalent: INSERT INTO todos (text, done) VALUES (?, false)
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    text: req.body.text,      // Data from the request body
    done: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);  // 201 = Created
});

// Start the server
app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});`,
        language: "javascript"
      },
      {
        title: "Python + Flask — The Same Server",
        content: `<p><strong>Flask</strong> is Python's equivalent of Express — lightweight and beginner-friendly.</p>`,
        code: `# app.py — a complete Flask server

from flask import Flask, jsonify, request

app = Flask(__name__)

# In-memory "database"
todos = [
    {"id": 1, "text": "Learn Flask", "done": False},
    {"id": 2, "text": "Build an API", "done": False},
]

# GET /api/todos — Read all
@app.route('/api/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

# GET /api/todos/<id> — Read one
@app.route('/api/todos/<int:todo_id>', methods=['GET'])
def get_todo(todo_id):
    todo = next((t for t in todos if t["id"] == todo_id), None)
    if not todo:
        return jsonify({"error": "Not found"}), 404
    return jsonify(todo)

# POST /api/todos — Create
@app.route('/api/todos', methods=['POST'])
def create_todo():
    data = request.get_json()      # Parse JSON body
    new_todo = {
        "id": len(todos) + 1,
        "text": data["text"],
        "done": False,
    }
    todos.append(new_todo)
    return jsonify(new_todo), 201  # 201 = Created

if __name__ == '__main__':
    app.run(debug=True, port=3000)`,
        language: "python"
      },
      {
        title: "Middleware — The Assembly Line",
        content: `<p><strong>Middleware</strong> are functions that run <em>between</em> receiving a request and sending a response. They form a pipeline — each one processes the request and passes it along.</p>
<p><strong>Analogy:</strong> An airport security line. Your request (luggage) goes through multiple checkpoints: ID check, X-ray scan, metal detector. Each middleware does its job and passes you to the next.</p>`,
        code: `// Express middleware examples

// Logging middleware — runs on EVERY request
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url} at \${new Date().toISOString()}\`);
  next();  // MUST call next() to pass to the next handler!
});

// Authentication middleware — protect certain routes
function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Not authorized' });
  }
  // Verify token... (we'll cover this in Authentication)
  next();
}

// Apply middleware to specific routes
app.get('/api/profile', requireAuth, (req, res) => {
  res.json({ user: 'Alice' });  // Only reached if authenticated
});`,
        language: "javascript",
        pitfall: "Always call next() in middleware! If you forget, the request hangs forever — the client waits and eventually times out. The only exception is when you send a response (like the 401 error above)."
      },
      {
        title: "Environment Variables — Keeping Secrets Safe",
        content: `<p>Never hardcode passwords, API keys, or database URLs in your source code. Use <strong>environment variables</strong> instead.</p>`,
        code: `// .env file (NEVER commit this to Git!)
// DATABASE_URL=postgres://user:pass@localhost:5432/mydb
// API_KEY=sk-abc123
// PORT=3000

// In Node.js (using dotenv package)
require('dotenv').config();  // Load .env file

const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;
const port = process.env.PORT || 3000;  // Fallback to 3000

// In Python
// import os
// from dotenv import load_dotenv
//
// load_dotenv()  # Load .env file
//
// db_url = os.environ.get('DATABASE_URL')
// api_key = os.environ.get('API_KEY')
// port = int(os.environ.get('PORT', 3000))

// .gitignore — ALWAYS include:
// .env
// node_modules/
// __pycache__/`,
        language: "javascript",
        quiz: {
          question: "In Express, what happens if middleware doesn't call next() or send a response?",
          options: [
            "The request is automatically forwarded",
            "An error is thrown",
            "The request hangs forever (client times out)",
            "The server crashes"
          ],
          answer: 2
        }
      }
    ]
  },

  // ============================================================
  // WEEK 6, TOPIC 2 — SQL Mastery (Level Up)
  // ============================================================
  "w6t2": {
    takeaways: [
      "Window functions compute values across rows without collapsing them, unlike GROUP BY.",
      "CTEs (WITH clauses) make complex queries readable by naming each step.",
      "Composite indexes follow leftmost-prefix rule: (a, b) helps WHERE a=... but not WHERE b=... alone.",
      "Use EXPLAIN ANALYZE to check if your query uses indexes or does a slow sequential scan.",
      "Self joins compare rows within the same table; lateral joins run a subquery per row."
    ],
    sections: [
      {
        title: "Window Functions — SQL Superpowers",
        content: `<p>You know GROUP BY — it collapses rows into groups. <strong>Window functions</strong> perform calculations across rows <em>without</em> collapsing them. You get the computed value alongside the original row.</p>
<p><strong>Analogy:</strong> GROUP BY is like a summary report (total sales per region). Window functions are like adding a "running total" column to a detailed report — every row stays, but each one also shows the cumulative sum.</p>`,
        code: `-- GROUP BY: one row per department (collapses rows)
SELECT department, AVG(salary)
FROM employees
GROUP BY department;

-- Window function: every row, PLUS the department average
SELECT
  name,
  department,
  salary,
  AVG(salary) OVER (PARTITION BY department) AS dept_avg,
  salary - AVG(salary) OVER (PARTITION BY department) AS vs_avg
FROM employees;

-- ROW_NUMBER: assign sequential numbers (great for pagination)
SELECT
  ROW_NUMBER() OVER (ORDER BY created_at DESC) AS row_num,
  title, created_at
FROM posts;

-- RANK: ranking with gaps for ties
-- DENSE_RANK: ranking without gaps
SELECT
  name, score,
  RANK() OVER (ORDER BY score DESC) AS rank,
  DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rank
FROM leaderboard;
-- Score 100, 95, 95, 90
-- RANK:       1,  2,  2,  4  (skips 3)
-- DENSE_RANK: 1,  2,  2,  3  (no skip)`,
        language: "sql"
      },
      {
        title: "CTEs — Readable Subqueries",
        content: `<p><strong>Common Table Expressions (CTEs)</strong> let you name subqueries and reference them like temporary tables. They make complex queries readable.</p>
<p><strong>Analogy:</strong> CTEs are like assigning a variable in code. Instead of nesting subqueries three levels deep, you name each step.</p>`,
        code: `-- WITHOUT CTE: nested, hard to read
SELECT * FROM (
  SELECT department, AVG(salary) as avg_sal
  FROM employees GROUP BY department
) dept_avgs
WHERE avg_sal > 80000;

-- WITH CTE: named, readable, step by step
WITH dept_averages AS (
  -- Step 1: Calculate department averages
  SELECT department, AVG(salary) AS avg_salary
  FROM employees
  GROUP BY department
),
high_paying AS (
  -- Step 2: Filter to high-paying departments
  SELECT * FROM dept_averages
  WHERE avg_salary > 80000
)
-- Step 3: Final result
SELECT * FROM high_paying ORDER BY avg_salary DESC;

-- Recursive CTE: walk a tree structure (org chart)
WITH RECURSIVE org_tree AS (
  -- Base case: the CEO (no manager)
  SELECT id, name, manager_id, 0 AS depth
  FROM employees WHERE manager_id IS NULL

  UNION ALL

  -- Recursive step: each employee's direct reports
  SELECT e.id, e.name, e.manager_id, ot.depth + 1
  FROM employees e
  JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT * FROM org_tree ORDER BY depth, name;`,
        language: "sql"
      },
      {
        title: "Advanced JOINs",
        content: `<p>Beyond INNER and LEFT joins, there are patterns that solve specific problems:</p>`,
        code: `-- SELF JOIN: compare rows within the same table
-- "Find employees who earn more than their manager"
SELECT
  e.name AS employee,
  e.salary AS emp_salary,
  m.name AS manager,
  m.salary AS mgr_salary
FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;

-- CROSS JOIN: every combination (Cartesian product)
-- "Generate a report for every product in every region"
SELECT p.name, r.region
FROM products p
CROSS JOIN regions r;

-- LATERAL JOIN (PostgreSQL) / CROSS APPLY (SQL Server)
-- "For each user, get their 3 most recent orders"
SELECT u.name, recent.*
FROM users u
CROSS JOIN LATERAL (
  SELECT * FROM orders
  WHERE orders.user_id = u.id
  ORDER BY created_at DESC
  LIMIT 3
) recent;

-- EXISTS vs IN (EXISTS is often faster for large subqueries)
SELECT * FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.user_id = u.id AND o.total > 100
);`,
        language: "sql"
      },
      {
        title: "Indexing Strategy",
        content: `<p>Indexes speed up reads but slow down writes. Choosing the right indexes is critical for performance.</p>
<p><strong>Analogy:</strong> An index is like a book's index. Without it, you scan every page (full table scan). With it, you jump directly to the right page.</p>`,
        code: `-- Single-column index (most common)
CREATE INDEX idx_users_email ON users(email);

-- Composite index (order matters!)
-- Good for: WHERE last_name = 'Smith' AND first_name = 'John'
-- Also good for: WHERE last_name = 'Smith' (leftmost prefix)
-- NOT good for: WHERE first_name = 'John' (skipped first column)
CREATE INDEX idx_users_name ON users(last_name, first_name);

-- Unique index (enforces uniqueness + speeds up lookups)
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- Partial index (only index some rows — saves space)
CREATE INDEX idx_active_users ON users(email)
  WHERE status = 'active';

-- Check if your query uses the index
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'alice@example.com';
-- Look for "Index Scan" (good) vs "Seq Scan" (bad)`,
        language: "sql",
        pitfall: "Don't index everything. Each index slows down INSERT, UPDATE, DELETE. A good rule: index columns used in WHERE, JOIN, and ORDER BY clauses. Don't index columns with very low cardinality (like a boolean 'active' column with only 2 values).",
        quiz: {
          question: "What does a window function do that GROUP BY doesn't?",
          options: [
            "It runs faster",
            "It performs calculations while keeping all original rows",
            "It works on text columns",
            "It doesn't need a WHERE clause"
          ],
          answer: 1
        }
      }
    ]
  },

  // ============================================================
  // WEEK 6, TOPIC 3 — Database Design & ORMs
  // ============================================================
  "w6t3": {
    takeaways: [
      "Normalization eliminates duplicate data by splitting it into related tables.",
      "One-to-many uses a foreign key on the 'many' side; many-to-many needs a junction table.",
      "ORMs let you write database queries in your programming language instead of raw SQL.",
      "Watch out for the N+1 problem: use eager loading (include/join) to fetch related data in one query.",
      "Use an ORM for CRUD, but drop to raw SQL for complex analytics or performance-critical queries."
    ],
    sections: [
      {
        title: "Database Design: Normalization",
        content: `<p><strong>Normalization</strong> is the process of organizing data to reduce redundancy. Think of it as the database version of "Don't Repeat Yourself" (DRY).</p>
<p>The three normal forms you need to know:</p>
<ul>
  <li><strong>1NF</strong>: Each cell has one value (no arrays, no comma-separated lists)</li>
  <li><strong>2NF</strong>: Every non-key column depends on the <em>entire</em> primary key</li>
  <li><strong>3NF</strong>: No column depends on another non-key column (no transitive dependencies)</li>
</ul>`,
        code: `-- BAD: Not normalized (repeating data)
-- orders table:
-- | order_id | customer_name | customer_email     | product | price |
-- |    1     | Alice         | alice@mail.com     | Widget  | 9.99  |
-- |    2     | Alice         | alice@mail.com     | Gadget  | 19.99 |
-- Alice's info is duplicated! If her email changes, update both rows.

-- GOOD: Normalized into separate tables
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10, 2)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  ordered_at TIMESTAMP DEFAULT NOW()
);
-- Now Alice's info is in ONE place. Orders just reference her ID.`,
        language: "sql"
      },
      {
        title: "Relationships: One-to-Many, Many-to-Many",
        content: `<p>Database relationships mirror real-world connections:</p>`,
        code: `-- ONE-TO-MANY: A user has many posts
-- (Foreign key on the "many" side)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id), -- FK points to "one" side
  title VARCHAR(200),
  content TEXT
);

-- MANY-TO-MANY: Students take many courses, courses have many students
-- (Requires a junction/join table)
CREATE TABLE students (id SERIAL PRIMARY KEY, name VARCHAR(100));
CREATE TABLE courses  (id SERIAL PRIMARY KEY, title VARCHAR(200));

-- Junction table: each row = one enrollment
CREATE TABLE enrollments (
  student_id INTEGER REFERENCES students(id),
  course_id  INTEGER REFERENCES courses(id),
  enrolled_at TIMESTAMP DEFAULT NOW(),
  grade VARCHAR(2),
  PRIMARY KEY (student_id, course_id)  -- Composite primary key
);

-- Query: "What courses is Alice taking?"
SELECT c.title
FROM courses c
JOIN enrollments e ON c.id = e.course_id
JOIN students s ON s.id = e.student_id
WHERE s.name = 'Alice';`,
        language: "sql"
      },
      {
        title: "What Is an ORM?",
        content: `<p>An <strong>ORM (Object-Relational Mapper)</strong> lets you interact with your database using your programming language instead of raw SQL strings. Tables become classes, rows become objects.</p>
<p><strong>Analogy:</strong> Raw SQL is like giving driving directions in coordinates (turn at 40.7128N, 74.0060W). An ORM is like using street names (turn at Main St and 5th Ave). Same destination, more human-friendly.</p>
<p>Popular ORMs: <strong>Prisma</strong> / <strong>Sequelize</strong> (Node.js), <strong>SQLAlchemy</strong> (Python), <strong>ActiveRecord</strong> (Ruby).</p>`
      },
      {
        title: "Prisma — A Modern ORM (Node.js)",
        content: `<p>Prisma uses a schema file to define your data models, then generates a type-safe client.</p>`,
        code: `// prisma/schema.prisma — define your models
// model User {
//   id    Int     @id @default(autoincrement())
//   email String  @unique
//   name  String
//   posts Post[]  // One-to-many relationship
// }
//
// model Post {
//   id       Int    @id @default(autoincrement())
//   title    String
//   content  String?
//   author   User   @relation(fields: [authorId], references: [id])
//   authorId Int
// }

// Using Prisma in your code:
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE (INSERT INTO users ...)
const user = await prisma.user.create({
  data: { name: 'Alice', email: 'alice@example.com' }
});

// READ (SELECT * FROM users WHERE email = ...)
const found = await prisma.user.findUnique({
  where: { email: 'alice@example.com' }
});

// READ with relation (JOIN)
const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true }  // Automatically JOINs posts
});

// UPDATE
await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Alice Smith' }
});

// DELETE
await prisma.user.delete({ where: { id: 1 } });`,
        language: "javascript"
      },
      {
        title: "When to Use an ORM vs Raw SQL",
        content: `<p>ORMs aren't always the answer. Here's a decision guide:</p>
<table>
  <tr><th>Use an ORM when...</th><th>Use Raw SQL when...</th></tr>
  <tr><td>Basic CRUD operations</td><td>Complex analytical queries</td></tr>
  <tr><td>You want type safety</td><td>Performance-critical queries</td></tr>
  <tr><td>Rapid prototyping</td><td>Database-specific features</td></tr>
  <tr><td>Schema migrations</td><td>Bulk operations on millions of rows</td></tr>
</table>
<p>Most projects use <strong>both</strong>: ORM for everyday operations, raw SQL for complex reports and optimized queries.</p>`,
        pitfall: "The N+1 query problem: If you fetch 100 users and then loop over them to fetch each user's posts, that's 101 queries instead of 1. Always use 'include' or 'eager loading' to fetch related data in a single query.",
        quiz: {
          question: "What is a junction table used for?",
          options: [
            "One-to-one relationships",
            "One-to-many relationships",
            "Many-to-many relationships",
            "Indexing"
          ],
          answer: 2
        }
      }
    ]
  },

  // ============================================================
  // WEEK 6, TOPIC 4 — Authentication & Security
  // ============================================================
  "w6t4": {
    takeaways: [
      "Authentication verifies who you are; authorization controls what you can do.",
      "Never store plain passwords; use bcrypt to hash them (it's intentionally slow).",
      "JWTs are signed tokens that let users stay logged in without hitting the database each request.",
      "Always use parameterized queries to prevent SQL injection, the #1 database vulnerability.",
      "Use textContent instead of innerHTML to prevent XSS attacks from user input.",
      "HTTPS, CORS, rate limiting, and security headers form layers of defense."
    ],
    sections: [
      {
        title: "Authentication vs Authorization",
        content: `<p>These two words sound similar but mean very different things:</p>
<ul>
  <li><strong>Authentication (AuthN)</strong>: "Who are you?" — Proving your identity (login).</li>
  <li><strong>Authorization (AuthZ)</strong>: "What are you allowed to do?" — Checking permissions.</li>
</ul>
<p><strong>Analogy:</strong> A hotel. Authentication = checking in at the front desk with your ID (proving who you are). Authorization = your key card only opens YOUR room (controlling what you can access).</p>`
      },
      {
        title: "Password Hashing — Never Store Plain Passwords",
        content: `<p>When a user creates an account, NEVER store their password as-is. Use a <strong>one-way hash function</strong> that converts the password into gibberish that can't be reversed.</p>
<p><strong>Analogy:</strong> Hashing is like a meat grinder. You can turn beef into ground beef, but you can't turn ground beef back into a steak. To check if someone's password is correct, you grind their input and compare the result.</p>`,
        code: `// Node.js: Using bcrypt for password hashing
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10; // Higher = slower = more secure

// When user SIGNS UP:
async function createUser(email, password) {
  // Hash the password (this takes ~100ms — intentionally slow!)
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Store the HASH, never the original password
  await db.query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2)',
    [email, hashedPassword]
    // Stored: "$2b$10$N9qo8uLOickgx2ZMRZoMye..."  (gibberish)
  );
}

// When user LOGS IN:
async function login(email, password) {
  const user = await db.query(
    'SELECT * FROM users WHERE email = $1', [email]
  );
  if (!user) return null; // User not found

  // Compare: hash the attempt and check against stored hash
  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) return null; // Wrong password

  return user; // Success!
}`,
        language: "javascript",
        pitfall: "NEVER use MD5 or SHA-256 alone for passwords. They're too fast — attackers can try billions of guesses per second. bcrypt is intentionally slow, making brute-force attacks impractical."
      },
      {
        title: "JWT — Token-Based Authentication",
        content: `<p>After login, you need a way to keep the user authenticated across requests. <strong>JWTs (JSON Web Tokens)</strong> are signed tokens that carry user info.</p>
<p><strong>Analogy:</strong> A JWT is like a wristband at a music festival. After you show your ticket (login), you get a wristband (JWT). For the rest of the day, you just show the wristband — no need to re-show your ticket.</p>`,
        code: `const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET; // Keep this secret!

// After successful login, create a token:
function generateToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,     // For authorization later
  };

  // Sign the token — expires in 24 hours
  return jwt.sign(payload, SECRET, { expiresIn: '24h' });
}

// Login endpoint:
app.post('/api/login', async (req, res) => {
  const user = await login(req.body.email, req.body.password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const token = generateToken(user);
  res.json({ token });
  // Client stores this token and sends it with every request
});

// Middleware to protect routes:
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });

  const token = authHeader.split(' ')[1]; // "Bearer <token>"
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;  // Attach user info to the request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Protected route:
app.get('/api/profile', authenticate, (req, res) => {
  res.json({ userId: req.user.userId, email: req.user.email });
});`,
        language: "javascript"
      },
      {
        title: "Common Security Vulnerabilities",
        content: `<p>As a developer, you must defend against these attacks:</p>
<ul>
  <li><strong>SQL Injection</strong>: Attacker puts SQL code in input fields. Defense: always use parameterized queries.</li>
  <li><strong>XSS (Cross-Site Scripting)</strong>: Attacker injects JavaScript into your page. Defense: sanitize user input, use textContent instead of innerHTML.</li>
  <li><strong>CSRF (Cross-Site Request Forgery)</strong>: Attacker tricks a logged-in user into making unwanted requests. Defense: use CSRF tokens.</li>
</ul>`,
        code: `// SQL INJECTION — the #1 database vulnerability

// BAD: String concatenation (attacker can inject SQL!)
const query = "SELECT * FROM users WHERE email = '" + userInput + "'";
// If userInput = "'; DROP TABLE users; --"
// Query becomes: SELECT * FROM users WHERE email = ''; DROP TABLE users; --'
// YOUR TABLE IS GONE.

// GOOD: Parameterized query (input is treated as DATA, not SQL)
const result = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [userInput]  // This is always treated as a string value, never as SQL
);

// XSS — the #1 frontend vulnerability

// BAD: Inserting user content as HTML
element.innerHTML = userComment;
// If userComment = "<script>steal(document.cookie)</script>"
// The script RUNS and steals cookies!

// GOOD: Use textContent (treats input as text, not HTML)
element.textContent = userComment;
// Displays the literal text, doesn't execute it`,
        language: "javascript"
      },
      {
        title: "HTTPS and Security Headers",
        content: `<p>Security is defense in depth — multiple layers of protection.</p>
<ul>
  <li><strong>HTTPS</strong>: Encrypts data between client and server. Always use it. Free with Let's Encrypt.</li>
  <li><strong>CORS</strong>: Controls which websites can call your API. By default, browsers block cross-origin requests.</li>
  <li><strong>Rate limiting</strong>: Prevent brute-force attacks by limiting requests per IP.</li>
  <li><strong>Helmet.js</strong>: Adds security headers to Express responses automatically.</li>
</ul>`,
        code: `const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// Security headers (protects against many common attacks)
app.use(helmet());

// CORS — only allow YOUR frontend to call the API
app.use(cors({
  origin: 'https://myapp.com',  // Only this domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Rate limiting — max 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use('/api/', limiter);`,
        language: "javascript",
        quiz: {
          question: "What is the primary defense against SQL injection?",
          options: [
            "Using HTTPS",
            "Parameterized queries (never concatenate user input into SQL)",
            "Hashing passwords",
            "Rate limiting"
          ],
          answer: 1
        }
      }
    ]
  },

  // ============================================================
  // WEEK 6, TOPIC 5 — Testing & Debugging
  // ============================================================
  "w6t5": {
    takeaways: [
      "Unit tests verify one function in isolation; integration tests verify parts working together.",
      "TDD means write a failing test first, then code to pass it, then refactor.",
      "Read the error message first when debugging; it usually tells you what went wrong and where.",
      "Use console.log to check assumptions, debugger to pause execution, and try-catch for better error info.",
      "Write a new test for every bug you fix so it never sneaks back in."
    ],
    sections: [
      {
        title: "Why Write Tests?",
        content: `<p>Tests are code that verifies your other code works correctly. They're your safety net.</p>
<p><strong>Analogy:</strong> Tests are like SQL CHECK constraints. A CHECK constraint says "this column must always be positive." A test says "this function must always return the right answer." Both catch errors before they reach production.</p>
<p>Types of tests (from fastest to slowest):</p>
<ul>
  <li><strong>Unit tests</strong>: Test one function in isolation. Fast. Most of your tests.</li>
  <li><strong>Integration tests</strong>: Test multiple parts working together (e.g., API + database).</li>
  <li><strong>End-to-end (E2E) tests</strong>: Test the entire app as a user would. Slowest but most realistic.</li>
</ul>`
      },
      {
        title: "Unit Testing with Jest",
        content: `<p><strong>Jest</strong> is the most popular JavaScript testing framework. Here's how it works:</p>`,
        code: `// math.js — the code we want to test
function add(a, b) {
  return a + b;
}

function divide(a, b) {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}

module.exports = { add, divide };

// math.test.js — the test file (Jest finds files ending in .test.js)
const { add, divide } = require('./math');

// describe groups related tests together
describe('add', () => {
  // test (or "it") defines a single test case
  test('adds two positive numbers', () => {
    expect(add(2, 3)).toBe(5);     // toBe = strict equality
  });

  test('handles negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });

  test('handles zero', () => {
    expect(add(0, 5)).toBe(5);
  });
});

describe('divide', () => {
  test('divides correctly', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('returns decimals', () => {
    expect(divide(1, 3)).toBeCloseTo(0.333, 2); // Floating point!
  });

  test('throws on divide by zero', () => {
    expect(() => divide(5, 0)).toThrow('Cannot divide by zero');
  });
});

// Run tests: npx jest  (or: npm test)`,
        language: "javascript"
      },
      {
        title: "Testing API Endpoints",
        content: `<p>Use <strong>supertest</strong> to test your Express routes without starting the server:</p>`,
        code: `// app.test.js
const request = require('supertest');
const app = require('./app'); // Your Express app (export it!)

describe('GET /api/todos', () => {
  test('returns a list of todos', async () => {
    const response = await request(app)
      .get('/api/todos')
      .expect(200)                              // Status code
      .expect('Content-Type', /json/);          // Content type

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe('POST /api/todos', () => {
  test('creates a new todo', async () => {
    const newTodo = { text: 'Write tests' };

    const response = await request(app)
      .post('/api/todos')
      .send(newTodo)             // Send JSON body
      .expect(201);              // 201 Created

    expect(response.body.text).toBe('Write tests');
    expect(response.body.id).toBeDefined();
    expect(response.body.done).toBe(false);
  });

  test('returns 400 for invalid input', async () => {
    await request(app)
      .post('/api/todos')
      .send({})                  // Missing required 'text'
      .expect(400);
  });
});`,
        language: "javascript"
      },
      {
        title: "Debugging Strategies",
        content: `<p>When something breaks, don't just stare at the code. Use a systematic approach:</p>
<ol>
  <li><strong>Read the error message.</strong> It usually tells you exactly what's wrong and where.</li>
  <li><strong>Reproduce the bug.</strong> If you can't reliably trigger it, you can't fix it.</li>
  <li><strong>Isolate the problem.</strong> Comment out code, add console.log statements, narrow it down.</li>
  <li><strong>Form a hypothesis.</strong> "I think the bug is because X." Then test that hypothesis.</li>
  <li><strong>Fix and verify.</strong> After fixing, run your tests. Write a NEW test that would have caught this bug.</li>
</ol>`,
        code: `// DEBUGGING TECHNIQUES:

// 1. console.log — quick and dirty (but effective)
function processOrder(order) {
  console.log('Processing order:', order);          // What's the input?
  console.log('Order total:', order.items.length);  // Check assumptions
  // ...
}

// 2. console.table — great for arrays and objects
console.table(users);  // Shows a formatted table in the console

// 3. Debugger statement — pauses execution in DevTools
function buggyFunction(data) {
  debugger;  // Execution stops here when DevTools is open
  // Step through code line by line, inspect variables
  return data.map(item => item.value);
}

// 4. Try-catch for better error info
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Failed to fetch data:', error.message);
    console.error('Stack trace:', error.stack);
    throw error; // Re-throw so callers know it failed
  }
}`,
        language: "javascript"
      },
      {
        title: "Test-Driven Development (TDD)",
        content: `<p><strong>TDD</strong> means writing tests <em>before</em> writing the implementation. It sounds backwards, but it's powerful:</p>
<ol>
  <li><strong>RED</strong>: Write a failing test that describes what you want.</li>
  <li><strong>GREEN</strong>: Write the minimum code to make the test pass.</li>
  <li><strong>REFACTOR</strong>: Clean up the code while keeping tests green.</li>
</ol>`,
        code: `// Example: TDD for an email validator

// Step 1 (RED): Write failing tests first
describe('isValidEmail', () => {
  test('accepts valid email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });
  test('rejects missing @', () => {
    expect(isValidEmail('userexample.com')).toBe(false);
  });
  test('rejects missing domain', () => {
    expect(isValidEmail('user@')).toBe(false);
  });
  test('rejects empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });
});

// Step 2 (GREEN): Write minimum code to pass
function isValidEmail(email) {
  const pattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return pattern.test(email);
}

// Step 3 (REFACTOR): Clean up if needed
// Tests stay green — confidence to refactor safely!`,
        language: "javascript",
        quiz: {
          question: "In TDD, what order do you follow?",
          options: [
            "Write code, then write tests, then refactor",
            "Write a failing test, write code to pass it, then refactor",
            "Refactor first, then write tests",
            "Write all tests at once, then all code at once"
          ],
          answer: 1
        }
      }
    ]
  },

  // ============================================================
  // WEEK 7, TOPIC 1 — React Fundamentals
  // ============================================================
  "w7t1": {
    takeaways: [
      "React components are functions that return JSX describing what the UI should look like.",
      "Props flow one way: parent to child, like function arguments.",
      "State is data that changes over time; when state updates, React re-renders the component.",
      "Always give list items a unique 'key' prop so React can efficiently track changes.",
      "Use early returns and conditional rendering for loading, error, and empty states."
    ],
    sections: [
      {
        title: "Why React?",
        content: `<p>You've been building UIs by directly manipulating the DOM with <code>document.querySelector</code> and <code>innerHTML</code>. This works for small apps but becomes a nightmare as your app grows. Which elements need updating? What if two parts of the page depend on the same data?</p>
<p><strong>React's big idea:</strong> Instead of telling the browser <em>how</em> to update the DOM step by step, you describe <em>what</em> the UI should look like for a given state. React figures out the minimal DOM changes needed.</p>
<p><strong>SQL analogy:</strong> Imperative DOM manipulation is like writing procedural scripts to modify data row by row. React is like writing a <code>SELECT</code> query — you declare what result you want, and the engine figures out how to get it.</p>`
      },
      {
        title: "Components — Building Blocks",
        content: `<p>React apps are built from <strong>components</strong> — reusable pieces of UI. A component is just a function that returns JSX (HTML-like syntax in JavaScript).</p>`,
        code: `// A simple component — just a function that returns JSX
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// JSX lets you write HTML-like syntax in JavaScript.
// The {name} part is a JavaScript expression — any valid JS goes in { }.

// Components compose together like LEGO blocks:
function UserCard({ user }) {
  return (
    <div className="card">          {/* className, not class */}
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
}

// Render a list of components (like looping over SQL results):
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <UserCard
          key={user.id}      // React needs a unique key for lists!
          user={user}
        />
      ))}
    </div>
  );
}`,
        language: "javascript",
        pitfall: "Always provide a unique 'key' prop when rendering lists. React uses keys to efficiently update the DOM. Using array index as key is a last resort — use a unique ID from your data."
      },
      {
        title: "Props — Passing Data Down",
        content: `<p><strong>Props</strong> are how you pass data from a parent component to a child. They flow <em>one direction</em>: parent to child, never the reverse.</p>
<p><strong>Analogy:</strong> Props are like function arguments. When you call <code>calculateTotal(items, taxRate)</code>, the items and taxRate are "props" for that function.</p>`,
        code: `// Parent passes data via props (like HTML attributes)
function App() {
  return (
    <div>
      <Button label="Click Me" color="blue" onClick={handleClick} />
      <Button label="Cancel" color="gray" onClick={handleCancel} />
    </div>
  );
}

// Child receives props as a single object argument
function Button({ label, color, onClick }) {
  return (
    <button
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// Props can be anything: strings, numbers, arrays, objects, functions
function Dashboard({ title, stats, onRefresh }) {
  return (
    <section>
      <h1>{title}</h1>
      <p>Total Users: {stats.userCount}</p>
      <button onClick={onRefresh}>Refresh</button>
    </section>
  );
}`,
        language: "javascript"
      },
      {
        title: "State — Making Components Interactive",
        content: `<p><strong>State</strong> is data that changes over time and affects what the component renders. When state changes, React re-renders the component automatically.</p>
<p><strong>Analogy:</strong> If a component is a SQL query, state is like the WHERE clause parameters. Change the parameters, and the result (render) changes.</p>`,
        code: `import { useState } from 'react';

function Counter() {
  // useState returns: [currentValue, setterFunction]
  const [count, setCount] = useState(0); // 0 is the initial value

  return (
    <div>
      <p>Count: {count}</p>
      {/* When state changes, React re-renders this component */}
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// A form with controlled inputs
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}                            // Controlled by state
        onChange={(e) => setEmail(e.target.value)} // Update state on change
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Log In</button>
    </form>
  );
}`,
        language: "javascript"
      },
      {
        title: "Conditional Rendering",
        content: `<p>Components often need to show different things based on state — like a SQL <code>CASE WHEN</code>.</p>`,
        code: `function StatusBadge({ status }) {
  // Ternary for simple either/or
  return (
    <span className={status === 'active' ? 'badge-green' : 'badge-gray'}>
      {status}
    </span>
  );
}

function Dashboard({ user, isLoading, error }) {
  // Early returns for different states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!user) return <p>Please log in.</p>;

  // Happy path
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      {/* Logical AND for conditional rendering */}
      {user.isAdmin && <AdminPanel />}
      {user.notifications.length > 0 && (
        <NotificationList items={user.notifications} />
      )}
    </div>
  );
}`,
        language: "javascript",
        quiz: {
          question: "When React state changes, what happens?",
          options: [
            "The entire page reloads",
            "Nothing — you have to manually update the DOM",
            "React re-renders the component (and its children) with the new state",
            "Only the state variable changes, the DOM stays the same"
          ],
          answer: 2
        }
      }
    ]
  },

  // ============================================================
  // WEEK 7, TOPIC 2 — React Hooks & Effects
  // ============================================================
  "w7t2": {
    takeaways: [
      "useEffect runs side effects after render; always include a dependency array to control when it fires.",
      "An empty dependency array [] means the effect runs once on mount only.",
      "useRef stores values between renders without causing re-renders, and can reference DOM elements.",
      "Custom hooks extract reusable stateful logic; name them useXxx for clarity.",
      "useContext shares global state without passing props through every intermediate component."
    ],
    sections: [
      {
        title: "What Are Hooks?",
        content: `<p><strong>Hooks</strong> are functions that let you "hook into" React features from function components. They always start with <code>use</code> — <code>useState</code>, <code>useEffect</code>, <code>useRef</code>, etc.</p>
<p>You've already used <code>useState</code>. Now let's explore the rest of the essential hooks.</p>
<p><strong>Rules of Hooks:</strong></p>
<ul>
  <li>Only call hooks at the <strong>top level</strong> of your component (not inside loops, conditions, or nested functions).</li>
  <li>Only call hooks from <strong>React function components</strong> or other hooks.</li>
</ul>`
      },
      {
        title: "useEffect — Side Effects",
        content: `<p><strong>useEffect</strong> lets you perform side effects: fetching data, setting up subscriptions, changing the document title, etc.</p>
<p><strong>Analogy:</strong> If your component is a SQL <code>SELECT</code>, useEffect is like a trigger that runs <em>after</em> the query returns. "After this component renders, also do this."</p>`,
        code: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(callback, dependencyArray)
  useEffect(() => {
    // This runs AFTER the component renders

    async function fetchUser() {
      setLoading(true);
      const response = await fetch(\`/api/users/\${userId}\`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    }

    fetchUser();

    // Cleanup function (optional) — runs before next effect or unmount
    return () => {
      console.log('Cleaning up previous effect');
    };
  }, [userId]); // Only re-run when userId changes!

  if (loading) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}

// Dependency array controls WHEN the effect runs:
// useEffect(fn, [a, b])  — Runs when a or b changes
// useEffect(fn, [])      — Runs ONCE on mount only
// useEffect(fn)          — Runs after EVERY render (rarely want this)`,
        language: "javascript",
        pitfall: "If you fetch data in useEffect without a dependency array, it runs on EVERY render, which triggers a state update, which causes another render... infinite loop! Always include the dependency array."
      },
      {
        title: "useRef — Persistent Values Without Re-render",
        content: `<p><strong>useRef</strong> gives you a mutable value that persists between renders but <em>doesn't trigger a re-render</em> when it changes. It's also used to reference DOM elements directly.</p>`,
        code: `import { useRef, useEffect } from 'react';

// Use case 1: Access a DOM element
function AutoFocusInput() {
  const inputRef = useRef(null);  // Create a ref

  useEffect(() => {
    inputRef.current.focus();  // Access the actual DOM element
  }, []);

  return <input ref={inputRef} placeholder="I auto-focus!" />;
}

// Use case 2: Store a value without causing re-renders
function StopWatch() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null); // Stores interval ID

  const start = () => {
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current); // Access the stored interval
  };

  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}`,
        language: "javascript"
      },
      {
        title: "Custom Hooks — Reusing Logic",
        content: `<p><strong>Custom hooks</strong> extract reusable stateful logic into a function. If you find yourself repeating the same useState + useEffect pattern, make a custom hook.</p>
<p><strong>Analogy:</strong> Custom hooks are like SQL views — a reusable query you can call from multiple places.</p>`,
        code: `// Custom hook for fetching data (reusable!)
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false; // Prevent state update on unmounted component

    async function doFetch() {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
        const json = await response.json();
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    doFetch();
    return () => { cancelled = true; }; // Cleanup
  }, [url]);

  return { data, loading, error };
}

// Now ANY component can fetch data in one line:
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

function ProductList() {
  const { data: products, loading } = useFetch('/api/products');
  // Same pattern, different URL — zero code duplication!
}`,
        language: "javascript"
      },
      {
        title: "useContext — Sharing State Globally",
        content: `<p>Sometimes multiple components deep in the tree need the same data (like current user, theme, language). Passing props through every intermediate component is tedious ("prop drilling"). <strong>Context</strong> lets you share data globally.</p>`,
        code: `import { createContext, useContext, useState } from 'react';

// 1. Create a Context
const AuthContext = createContext(null);

// 2. Create a Provider component (wraps your app)
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setUser(data.user);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Use Context in ANY child component (no prop drilling!)
function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      {user ? (
        <>
          <span>Hi, {user.name}</span>
          <button onClick={logout}>Log Out</button>
        </>
      ) : (
        <a href="/login">Log In</a>
      )}
    </nav>
  );
}

// 4. Wrap your app with the Provider
function App() {
  return (
    <AuthProvider>
      <Navbar />
      <MainContent />
    </AuthProvider>
  );
}`,
        language: "javascript",
        quiz: {
          question: "What happens if you forget the dependency array in useEffect?",
          options: [
            "The effect never runs",
            "The effect runs once on mount",
            "The effect runs after EVERY render (potentially causing infinite loops)",
            "React throws an error"
          ],
          answer: 2
        }
      }
    ]
  },

  // ============================================================
  // WEEK 7, TOPIC 3 — System Design Fundamentals
  // ============================================================
  "w7t3": {
    takeaways: [
      "Vertical scaling means a bigger server; horizontal scaling means more servers behind a load balancer.",
      "Caching (Redis) is ~100x faster than a database query; use it for frequently accessed data.",
      "Read replicas distribute read load; sharding splits data across multiple databases.",
      "Memory is ~100x faster than SSD, and SSD is ~1000x faster than a network round trip.",
      "Most real apps use horizontal scaling because vertical scaling has hard limits."
    ],
    sections: [
      {
        title: "What Is System Design?",
        content: `<p><strong>System design</strong> is about making architectural decisions for software systems: how to structure your application so it works reliably at scale.</p>
<p><strong>Analogy:</strong> If coding is like building a single room, system design is like being an architect for an entire building. You decide where to put load-bearing walls, plumbing, electricity — decisions that are hard to change later.</p>
<p>System design interviews test whether you can think beyond individual functions to design entire systems. Even as a newer engineer, understanding these concepts makes you much more effective.</p>`
      },
      {
        title: "Client-Server Architecture",
        content: `<p>Almost every modern application follows this basic structure:</p>`,
        diagram: `
  Users
    |
    v
  [Client]  ──HTTP──>  [Web Server]  ──SQL──>  [Database]
  (Browser)             (Node/Python)           (PostgreSQL)
    ^                       |
    |                       v
    +─────── JSON ─────  [Cache]
                         (Redis)

  This is a "3-tier architecture":
  1. Presentation tier (client/browser)
  2. Application tier (server/API)
  3. Data tier (database)
        `
      },
      {
        title: "Scalability: Vertical vs Horizontal",
        content: `<p>When your app gets more users, how do you handle the load?</p>
<ul>
  <li><strong>Vertical scaling (scale UP)</strong>: Get a bigger, more powerful server. Like upgrading from a sedan to a truck. Simple but has limits — there's only so big a server can get.</li>
  <li><strong>Horizontal scaling (scale OUT)</strong>: Add more servers. Like adding more sedans to a fleet. More complex but nearly unlimited.</li>
</ul>
<p>Most real-world systems use horizontal scaling. This creates challenges: if you have 5 servers, which one handles each request? That's where <strong>load balancers</strong> come in.</p>`,
        diagram: `
  Vertical:               Horizontal:

  [Small Server]          [Load Balancer]
       |                   /     |     \\
       v                  v      v      v
  [BIG SERVER]         [App1] [App2] [App3]
                          \\     |     /
                           v    v    v
                          [Database]
        `
      },
      {
        title: "Databases at Scale",
        content: `<p>A single database can't handle infinite load. Here are strategies for scaling data:</p>
<ul>
  <li><strong>Read replicas</strong>: Copy the database to multiple servers. Writes go to the primary, reads go to replicas. Works because most apps read far more than they write.</li>
  <li><strong>Caching</strong>: Store frequently accessed data in memory (Redis, Memcached). A cache hit is 100x faster than a database query.</li>
  <li><strong>Sharding</strong>: Split data across multiple databases by some key (e.g., users A-M on DB1, N-Z on DB2). Complex but necessary at massive scale.</li>
</ul>`,
        code: `// Caching pattern (pseudocode)
async function getUser(userId) {
  // 1. Check cache first (fast — in-memory)
  const cached = await redis.get(\`user:\${userId}\`);
  if (cached) {
    return JSON.parse(cached); // Cache hit!
  }

  // 2. Cache miss — query database (slow — disk I/O)
  const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);

  // 3. Store in cache for next time (expire after 1 hour)
  await redis.set(\`user:\${userId}\`, JSON.stringify(user), 'EX', 3600);

  return user;
}

// Cache invalidation: when data changes, update/clear the cache
async function updateUser(userId, data) {
  await db.query('UPDATE users SET name=$1 WHERE id=$2', [data.name, userId]);
  await redis.del(\`user:\${userId}\`);  // Remove stale cache
}`,
        language: "javascript"
      },
      {
        title: "Latency and Throughput",
        content: `<p>Two key metrics for system performance:</p>
<ul>
  <li><strong>Latency</strong>: How long a single request takes. Measured in milliseconds.</li>
  <li><strong>Throughput</strong>: How many requests the system handles per second.</li>
</ul>
<p><strong>Analogy:</strong> A highway. Latency is how long it takes one car to drive from A to B. Throughput is how many cars pass a point per hour. You can have low latency but low throughput (empty fast road) or high throughput with higher latency (busy highway).</p>`,
        diagram: `
  Latency numbers every programmer should know:

  L1 cache reference          ~1 ns
  L2 cache reference          ~4 ns
  Main memory (RAM)           ~100 ns
  SSD random read             ~16,000 ns   (16 us)
  Network round trip (same DC)~500,000 ns  (0.5 ms)
  HDD seek                    ~10,000,000 ns (10 ms)
  Network: SF to NYC          ~40,000,000 ns (40 ms)
  Network: SF to London       ~80,000,000 ns (80 ms)

  Key insight: Memory is ~100x faster than SSD,
               SSD is ~1000x faster than network.
        `,
        quiz: {
          question: "Why use read replicas?",
          options: [
            "To speed up write operations",
            "To distribute read load across multiple database servers",
            "To compress data",
            "To encrypt database connections"
          ],
          answer: 1
        }
      }
    ]
  },

  // ============================================================
  // WEEK 7, TOPIC 4 — System Design: Common Patterns
  // ============================================================
  "w7t4": {
    takeaways: [
      "Cursor-based pagination outperforms OFFSET for large datasets by jumping directly via index.",
      "Message queues decouple services so they can fail, scale, and process independently.",
      "Start with a monolith; split into microservices only when you actually need to scale parts independently.",
      "CDNs cache static files on servers worldwide so users download from the nearest one.",
      "System design interviews follow: clarify requirements, high-level design, detailed design, address bottlenecks."
    ],
    sections: [
      {
        title: "API Design Patterns",
        content: `<p>Good API design makes systems easier to use and maintain. Here are patterns beyond basic REST:</p>
<ul>
  <li><strong>Pagination</strong>: Don't return 1 million rows at once. Return pages of results.</li>
  <li><strong>Rate limiting</strong>: Protect your API from being overwhelmed.</li>
  <li><strong>Versioning</strong>: Allow breaking changes without breaking existing clients.</li>
  <li><strong>Idempotency</strong>: Making the same request twice should produce the same result (critical for payment systems).</li>
</ul>`,
        code: `// Pagination: Cursor-based (better than offset for large datasets)
// GET /api/posts?cursor=abc123&limit=20

app.get('/api/posts', async (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const cursor = req.query.cursor;

  let query = 'SELECT * FROM posts';
  const params = [];

  if (cursor) {
    // Cursor is typically the ID or timestamp of the last item seen
    query += ' WHERE id > $1';
    params.push(cursor);
  }
  query += ' ORDER BY id LIMIT $' + (params.length + 1);
  params.push(limit + 1); // Fetch one extra to check if there's more

  const posts = await db.query(query, params);
  const hasMore = posts.length > limit;
  if (hasMore) posts.pop(); // Remove the extra one

  res.json({
    data: posts,
    nextCursor: hasMore ? posts[posts.length - 1].id : null,
  });
});

// Why cursor > offset?
// OFFSET 100000 still reads and discards 100K rows.
// WHERE id > cursor jumps directly to the right spot using the index.`,
        language: "javascript"
      },
      {
        title: "Message Queues — Decoupling Services",
        content: `<p>A <strong>message queue</strong> lets services communicate asynchronously. Instead of calling another service directly (and waiting), you put a message on a queue. The other service processes it when ready.</p>
<p><strong>Analogy:</strong> Direct call = phoning someone and waiting for them to answer. Message queue = leaving a voicemail. They'll get to it, and you can do other things meanwhile.</p>`,
        diagram: `
  Without queue (tightly coupled):
  [Order Service] ──wait──> [Email Service] ──wait──> [Inventory]
  User waits for ALL of these to complete!

  With queue (decoupled):
  [Order Service] ──> [Message Queue] ──> [Email Service]
       |                    |
       v                    └──> [Inventory Service]
   "Order confirmed!"
   (responds immediately)

  Benefits:
  - User gets fast response
  - Services can fail independently
  - Can retry failed messages
  - Can process at different speeds
        `
      },
      {
        title: "Microservices vs Monolith",
        content: `<p>How you structure your application matters:</p>
<ul>
  <li><strong>Monolith</strong>: Everything in one codebase, one deployment. Simple to start. Like a single SQL database with all tables.</li>
  <li><strong>Microservices</strong>: Each feature is its own independent service. Complex but scalable. Like separate databases that communicate via APIs.</li>
</ul>
<p><strong>Start with a monolith.</strong> Split into microservices only when you need to. Most startups that start with microservices regret it — the complexity overhead is massive.</p>`,
        diagram: `
  Monolith:                    Microservices:
  ┌──────────────────┐         ┌──────────┐   ┌──────────┐
  │  User Auth       │         │ Auth     │   │ Payment  │
  │  Products        │         │ Service  │   │ Service  │
  │  Orders          │         └────┬─────┘   └────┬─────┘
  │  Payments        │              │               │
  │  Email           │         ┌────┴─────┐   ┌────┴─────┐
  │  [One Database]  │         │ Product  │   │ Email    │
  └──────────────────┘         │ Service  │   │ Service  │
                               └──────────┘   └──────────┘
  Pros: Simple, fast dev      Pros: Scale independently,
  Cons: Hard to scale parts    use different tech per service
                              Cons: Very complex to manage
        `
      },
      {
        title: "CDNs and Static Asset Delivery",
        content: `<p>A <strong>CDN (Content Delivery Network)</strong> caches your static files (images, CSS, JS) on servers around the world. Users download from the nearest server instead of your origin server.</p>
<p><strong>Analogy:</strong> Without a CDN, everyone orders from the same factory. With a CDN, the factory ships inventory to local warehouses, and customers pick up from the nearest one.</p>
<p>Key static asset strategies:</p>
<ul>
  <li>Put images, CSS, JS on a CDN (Cloudflare, CloudFront, Vercel)</li>
  <li>Use cache-busting filenames (<code>app.abc123.js</code>) so browsers fetch new versions</li>
  <li>Compress images (WebP format), minify CSS/JS</li>
  <li>Lazy-load images that are below the fold</li>
</ul>`
      },
      {
        title: "The System Design Interview Framework",
        content: `<p>When asked "Design Twitter" or "Design a URL Shortener" in an interview, follow this framework:</p>
<ol>
  <li><strong>Clarify requirements (2-3 min)</strong>: What features? How many users? Read-heavy or write-heavy?</li>
  <li><strong>High-level design (5-10 min)</strong>: Draw the main components (clients, servers, databases, caches).</li>
  <li><strong>Detailed design (10-15 min)</strong>: Dive into the most important/complex component. Schema design, API endpoints, algorithms.</li>
  <li><strong>Address bottlenecks (5 min)</strong>: What breaks at scale? How do you fix it?</li>
</ol>`,
        quiz: {
          question: "Why is cursor-based pagination preferred over OFFSET for large datasets?",
          options: [
            "It returns more data per page",
            "It skips directly to the right position using an index, while OFFSET scans and discards rows",
            "It's easier to implement",
            "It doesn't require a database"
          ],
          answer: 1
        }
      }
    ]
  },

  // ============================================================
  // WEEK 7, TOPIC 5 — TypeScript Basics
  // ============================================================
  "w7t5": {
    takeaways: [
      "TypeScript catches type mismatches at compile time, before your code ever runs.",
      "Interfaces define object shapes, like CREATE TABLE defines row shapes in SQL.",
      "Generics let you write one function that works with any type while staying type-safe.",
      "Union types (\"admin\" | \"user\") act like SQL ENUMs, restricting values to a set.",
      "TypeScript + React is the modern industry standard; type your props, state, and events."
    ],
    sections: [
      {
        title: "Why TypeScript?",
        content: `<p><strong>TypeScript</strong> is JavaScript with <strong>types</strong>. It catches bugs at compile time instead of at runtime.</p>
<p><strong>SQL analogy:</strong> In SQL, every column has a type: <code>VARCHAR</code>, <code>INTEGER</code>, <code>BOOLEAN</code>. If you try to insert a string into an integer column, the database rejects it. TypeScript does the same thing for JavaScript — it rejects mismatched types before your code even runs.</p>
<p>TypeScript is now the industry standard for any serious JavaScript project. React, Next.js, Express — all have first-class TypeScript support.</p>`
      },
      {
        title: "Basic Types",
        content: `<p>TypeScript adds type annotations to JavaScript. You declare what type each variable, parameter, and return value should be.</p>`,
        code: `// Basic type annotations
let name: string = "Alice";
let age: number = 25;
let isActive: boolean = true;

// Arrays
let scores: number[] = [90, 85, 92];
let names: string[] = ["Alice", "Bob"];

// The power: TypeScript CATCHES errors before runtime
name = 42;       // ERROR: Type 'number' is not assignable to type 'string'
scores.push("A"); // ERROR: Argument of type 'string' is not assignable

// Function types — annotate parameters and return type
function greet(name: string, age: number): string {
  return \`Hello, \${name}! You are \${age}.\`;
}

greet("Alice", 25);     // OK
greet("Alice", "old");  // ERROR: 'string' is not assignable to 'number'
greet("Alice");          // ERROR: Expected 2 arguments, but got 1

// Optional parameters (like nullable columns in SQL)
function greet2(name: string, title?: string): string {
  return title ? \`Hello, \${title} \${name}\` : \`Hello, \${name}\`;
}
greet2("Alice");           // OK — title is optional
greet2("Alice", "Dr.");   // OK`,
        language: "typescript"
      },
      {
        title: "Interfaces — Defining Object Shapes",
        content: `<p>An <strong>interface</strong> defines the shape of an object — like a <code>CREATE TABLE</code> defines the shape of a row.</p>`,
        code: `// Define the shape of a User object
// (Like: CREATE TABLE users (id INT, name VARCHAR, email VARCHAR, ...))
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";  // Union type = ENUM in SQL
  bio?: string;                       // Optional (nullable)
}

// TypeScript enforces the shape:
const alice: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  role: "admin",
};

// This would cause errors:
// const bob: User = {
//   id: 2,
//   name: "Bob",
//   // ERROR: Property 'email' is missing!
//   // ERROR: Property 'role' is missing!
// };

// Use interfaces for function parameters
function sendEmail(user: User, subject: string): void {
  console.log(\`Sending "\${subject}" to \${user.email}\`);
}

// Extending interfaces (like table inheritance)
interface AdminUser extends User {
  permissions: string[];
  lastLogin: Date;
}`,
        language: "typescript"
      },
      {
        title: "Generics — Reusable Typed Functions",
        content: `<p><strong>Generics</strong> let you write functions that work with any type while still being type-safe. They're like type parameters.</p>
<p><strong>Analogy:</strong> A generic function is like a SQL stored procedure with a parameter. <code>getFirst&lt;T&gt;</code> is like a function that works on any table.</p>`,
        code: `// Without generics: you'd need separate functions for each type
function getFirstNumber(arr: number[]): number { return arr[0]; }
function getFirstString(arr: string[]): string { return arr[0]; }

// With generics: ONE function that works for ANY type
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

getFirst<number>([1, 2, 3]);       // Returns number
getFirst<string>(["a", "b"]);     // Returns string
getFirst([1, 2, 3]);               // TypeScript infers <number>

// Practical example: API response wrapper
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// The same wrapper works for any data type:
// const userResponse: ApiResponse<User> = {
//   data: { id: 1, name: "Alice", email: "a@b.com", role: "admin" },
//   status: 200,
//   message: "Success",
// };
//
// const postsResponse: ApiResponse<Post[]> = {
//   data: [{ id: 1, title: "Hello", content: "World" }],
//   status: 200,
//   message: "Success",
// };`,
        language: "typescript"
      },
      {
        title: "TypeScript with React",
        content: `<p>TypeScript + React is the modern standard. You type your props, state, and event handlers.</p>`,
        code: `import { useState } from 'react';

// Type your props with an interface
interface TodoProps {
  id: number;
  text: string;
  done: boolean;
  onToggle: (id: number) => void;   // Function type
  onDelete: (id: number) => void;
}

// The component receives typed props
function TodoItem({ id, text, done, onToggle, onDelete }: TodoProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={done}
        onChange={() => onToggle(id)}
      />
      <span>{text}</span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
}

// Type your state
interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function TodoApp() {
  // useState with explicit type
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');

  const addTodo = () => {
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      done: false,
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          {...todo}
          onToggle={(id) => { /* toggle logic */ }}
          onDelete={(id) => setTodos(todos.filter(t => t.id !== id))}
        />
      ))}
    </div>
  );
}`,
        language: "typescript",
        quiz: {
          question: "What does TypeScript catch that JavaScript doesn't?",
          options: [
            "Runtime errors from user input",
            "Type mismatches and missing properties at compile time (before code runs)",
            "Network errors",
            "CSS styling issues"
          ],
          answer: 1
        }
      }
    ]
  },

  // ============================================================
  // WEEK 8, TOPIC 1 — Dynamic Programming
  // ============================================================
  "w8t1": {
    takeaways: [
      "Dynamic programming solves problems with overlapping subproblems by caching results.",
      "Top-down (memoization) adds caching to recursion; bottom-up (tabulation) fills a table iteratively.",
      "Define what dp[i] represents first; the recurrence relation follows from that definition.",
      "Many DP problems are disguised Fibonacci: climbing stairs, coin change, path counting.",
      "After solving with a full table, check if you can optimize space to only the last few values."
    ],
    sections: [
      {
        title: "What Is Dynamic Programming?",
        content: `<p><strong>Dynamic Programming (DP)</strong> is a technique for solving problems that have <strong>overlapping subproblems</strong> — the same smaller problems get solved over and over again.</p>
<p><strong>Analogy:</strong> Imagine calculating your company's quarterly revenue. You need January + February + March totals. But to calculate Q1-Q2, you don't redo Q1 — you use Q1's result and just add Q2. That's DP: save previous results and reuse them.</p>
<p>DP is the scariest interview topic for most people, but it follows a learnable pattern. The key insight: every DP problem is about <strong>making choices at each step</strong> and <strong>remembering the results</strong>.</p>`
      },
      {
        title: "Top-Down: Recursion + Memoization",
        content: `<p>The first DP approach: solve the problem recursively, but <strong>cache</strong> (memoize) results so you never compute the same thing twice.</p>`,
        code: `// Classic example: Fibonacci numbers
// fib(5) = fib(4) + fib(3)
// fib(4) = fib(3) + fib(2)    <-- fib(3) is computed TWICE!

// WITHOUT memoization: O(2^n) — exponentially slow
function fibSlow(n) {
  if (n <= 1) return n;
  return fibSlow(n - 1) + fibSlow(n - 2); // Redundant work!
}

// WITH memoization: O(n) — each subproblem computed ONCE
function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n]; // Already computed? Reuse!

  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

// fib(50) = 12586269025  (runs instantly with memo, takes forever without)`,
        language: "javascript",
        diagram: `
  WITHOUT memo:              WITH memo:
  fib(5)                     fib(5)
  ├─ fib(4)                  ├─ fib(4)
  │  ├─ fib(3)               │  ├─ fib(3)
  │  │  ├─ fib(2)            │  │  ├─ fib(2) <- computed
  │  │  │  ├─ fib(1)         │  │  └─ fib(1) <- computed
  │  │  │  └─ fib(0)         │  └─ fib(2) <- CACHED!
  │  │  └─ fib(1)            └─ fib(3) <- CACHED!
  │  └─ fib(2)  <- REPEATED
  │     ├─ fib(1)            Nodes computed: 6
  │     └─ fib(0)            (vs 15 without memo)
  └─ fib(3)     <- REPEATED
     ├─ fib(2)
     ...
        `
      },
      {
        title: "Bottom-Up: Tabulation",
        content: `<p>The second DP approach: build the solution from the smallest subproblems up. Instead of recursing from the top, you fill in a table from the bottom.</p>
<p><strong>SQL analogy:</strong> It's like building a summary table step by step. Each row depends on previous rows.</p>`,
        code: `// Bottom-up Fibonacci — no recursion needed
function fib(n) {
  if (n <= 1) return n;

  // Build a table from small to large
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]; // Use previously computed values
  }

  return dp[n];
}

// Space optimization: you only need the last 2 values!
function fibOptimal(n) {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}`,
        language: "javascript"
      },
      {
        title: "Classic DP: Climbing Stairs",
        content: `<p>You're climbing a staircase with <code>n</code> steps. Each time you can climb 1 or 2 steps. How many distinct ways can you reach the top?</p>
<p>This is a disguised Fibonacci problem! To reach step n, you came from step n-1 (1 step) or step n-2 (2 steps).</p>`,
        code: `// ways(n) = ways(n-1) + ways(n-2)
// Base cases: ways(1) = 1, ways(2) = 2

function climbStairs(n) {
  if (n <= 2) return n;

  const dp = new Array(n + 1);
  dp[1] = 1;  // 1 step: only 1 way
  dp[2] = 2;  // 2 steps: (1+1) or (2) = 2 ways

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    // To reach step i: come from (i-1) with 1 step
    //                  OR come from (i-2) with 2 steps
  }

  return dp[n];
}

// climbStairs(5) = 8
// The 8 ways: [1,1,1,1,1], [1,1,1,2], [1,1,2,1], [1,2,1,1],
//             [2,1,1,1], [1,2,2], [2,1,2], [2,2,1]`,
        language: "javascript"
      },
      {
        title: "The DP Problem-Solving Framework",
        content: `<p>Follow these steps for any DP problem:</p>
<ol>
  <li><strong>Define the subproblem</strong>: What does <code>dp[i]</code> represent? This is the hardest part.</li>
  <li><strong>Find the recurrence</strong>: How does <code>dp[i]</code> relate to smaller subproblems?</li>
  <li><strong>Identify base cases</strong>: What are the smallest subproblems you can solve directly?</li>
  <li><strong>Determine the order</strong>: Fill the table from small to large.</li>
  <li><strong>Optimize space</strong>: Do you really need the whole table, or just the last few values?</li>
</ol>`,
        code: `// Example: Coin Change Problem
// Given coins [1, 5, 10, 25], find minimum coins to make 'amount'
// Like: what's the fewest bills/coins to make change?

function coinChange(coins, amount) {
  // dp[i] = minimum coins needed to make amount i
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;  // Base case: 0 coins needed to make $0

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
        // "If I use this coin, I need 1 + (min coins for remainder)"
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

// coinChange([1, 5, 10, 25], 36)
// dp[36] = 3 (25 + 10 + 1)`,
        language: "javascript",
        quiz: {
          question: "What is the key idea behind dynamic programming?",
          options: [
            "Always use recursion",
            "Sort the input first",
            "Break problems into overlapping subproblems and cache results",
            "Use the greedy approach"
          ],
          answer: 2
        }
      }
    ]
  },

  // ============================================================
  // WEEK 8, TOPIC 2 — Common Interview Patterns
  // ============================================================
  "w8t2": {
    takeaways: [
      "Two pointers on a sorted array find pairs in O(n) instead of O(n^2).",
      "Sliding window maintains a range that expands and contracts for subarray/substring problems.",
      "Hash maps trade space for time, turning O(n^2) brute force into O(n) lookups.",
      "Binary search works on any search space that can be halved, not just sorted arrays.",
      "In interviews: understand the problem, state brute force, then optimize before coding."
    ],
    sections: [
      {
        title: "Two Pointers",
        content: `<p>The <strong>Two Pointers</strong> technique uses two indices moving through an array, often from opposite ends. It's perfect for problems involving sorted arrays or finding pairs.</p>
<p><strong>Analogy:</strong> Two people searching a bookshelf — one starts from the left, the other from the right. They move toward each other, skipping sections based on what they find.</p>`,
        code: `// Two Sum (sorted array) — find two numbers that add to target
function twoSum(sorted, target) {
  let left = 0;
  let right = sorted.length - 1;

  while (left < right) {
    const sum = sorted[left] + sorted[right];

    if (sum === target) {
      return [left, right];  // Found the pair!
    } else if (sum < target) {
      left++;   // Sum too small — need bigger numbers, move left pointer right
    } else {
      right--;  // Sum too big — need smaller numbers, move right pointer left
    }
  }
  return null; // No pair found
}

// twoSum([1, 3, 5, 7, 11], 12) => [0, 4] (1 + 11 = 12)

// Reverse a string in-place with two pointers
function reverseString(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]]; // Swap
    left++;
    right--;
  }
}`,
        language: "javascript"
      },
      {
        title: "Sliding Window",
        content: `<p>The <strong>Sliding Window</strong> technique maintains a "window" that slides across an array. Perfect for subarray/substring problems.</p>
<p><strong>Analogy:</strong> Imagine sliding a magnifying glass across a sentence, always viewing exactly K characters at a time.</p>`,
        code: `// Maximum sum of any subarray of size k
function maxSubarraySum(arr, k) {
  // Initial window: sum of first k elements
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  let maxSum = windowSum;

  // Slide the window: add the new element, remove the old one
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i];        // Add new element entering window
    windowSum -= arr[i - k];    // Remove element leaving window
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

// maxSubarraySum([2, 1, 5, 1, 3, 2], 3) => 9 (5 + 1 + 3)

// Longest substring without repeating characters
function longestUnique(s) {
  const seen = new Set();
  let left = 0, maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    // Shrink window from left while we have a duplicate
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

// longestUnique("abcabcbb") => 3 ("abc")`,
        language: "javascript"
      },
      {
        title: "Hash Map Patterns",
        content: `<p>Hash maps (objects/Maps in JS) provide O(1) lookup. They're used in a huge number of interview problems to trade space for time.</p>`,
        code: `// Two Sum (unsorted) — the classic LeetCode #1
function twoSum(nums, target) {
  const seen = new Map(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen.has(complement)) {
      return [seen.get(complement), i]; // Found the pair!
    }

    seen.set(nums[i], i); // Remember this number and its index
  }
  return null;
}
// O(n) time, O(n) space — much better than O(n^2) brute force

// Frequency counter — count occurrences
function mostFrequent(arr) {
  const freq = {};
  for (const item of arr) {
    freq[item] = (freq[item] || 0) + 1;
  }

  let maxCount = 0, maxItem = null;
  for (const [item, count] of Object.entries(freq)) {
    if (count > maxCount) {
      maxCount = count;
      maxItem = item;
    }
  }
  return maxItem;
}

// Group anagrams: sort each word as a key
function groupAnagrams(words) {
  const groups = new Map();
  for (const word of words) {
    const key = word.split('').sort().join(''); // "eat" -> "aet"
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return [...groups.values()];
}
// groupAnagrams(["eat","tea","tan","ate","nat","bat"])
// => [["eat","tea","ate"], ["tan","nat"], ["bat"]]`,
        language: "javascript"
      },
      {
        title: "Binary Search Variations",
        content: `<p>Binary search isn't just "find a number in a sorted array." It's a powerful template for any search space that can be divided in half.</p>`,
        code: `// Standard binary search
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;      // Found it
    if (arr[mid] < target) left = mid + 1;    // Search right half
    else right = mid - 1;                      // Search left half
  }
  return -1; // Not found
}

// Find the first occurrence (leftmost) — useful for duplicates
function firstOccurrence(arr, target) {
  let left = 0, right = arr.length - 1, result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      result = mid;         // Found one, but keep searching left
      right = mid - 1;      // for an earlier occurrence
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}

// Binary search on answer — "What's the minimum capacity?"
// (Used when you're searching for an optimal value, not in an array)
function minCapacity(weights, days) {
  let left = Math.max(...weights);       // Min possible
  let right = weights.reduce((a, b) => a + b); // Max possible

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canShipInDays(weights, days, mid)) {
      right = mid;       // Try a smaller capacity
    } else {
      left = mid + 1;    // Need more capacity
    }
  }
  return left;
}`,
        language: "javascript"
      },
      {
        title: "How to Approach Any Interview Problem",
        content: `<p>Follow this process for every coding interview problem:</p>
<ol>
  <li><strong>Understand</strong> (2 min): Repeat the problem back. Ask clarifying questions. What are the constraints?</li>
  <li><strong>Examples</strong> (2 min): Walk through 2-3 examples by hand. Include edge cases (empty input, one element, duplicates).</li>
  <li><strong>Brute force</strong> (1 min): State the obvious O(n^2) or O(n!) solution. Shows you understand the problem.</li>
  <li><strong>Optimize</strong> (3 min): Can you sort? Use a hash map? Two pointers? Recognize the pattern.</li>
  <li><strong>Code</strong> (10-15 min): Write clean code. Use descriptive variable names. Talk as you code.</li>
  <li><strong>Test</strong> (3 min): Trace through your code with an example. Check edge cases.</li>
</ol>`,
        pitfall: "Don't jump to coding immediately! Interviewers want to see your thinking process. Spending 5-10 minutes planning saves you from writing wrong code and starting over.",
        quiz: {
          question: "What interview pattern is best for 'find two numbers in a sorted array that sum to target'?",
          options: [
            "Sliding window",
            "Two pointers (from both ends)",
            "Dynamic programming",
            "Depth-first search"
          ],
          answer: 1
        }
      }
    ]
  },

  // ============================================================
  // WEEK 8, TOPIC 3 — Build a Full-Stack Project
  // ============================================================
  "w8t3": {
    takeaways: [
      "Start every full-stack project with the database schema; everything else builds on the data model.",
      "Separate frontend (React), backend (Express/Flask), and database into clear layers.",
      "Always validate input on the backend; frontend validation is just for user experience.",
      "A deployed project is worth ten times more than a local one on your resume.",
      "Test your deployed app: hardcoded localhost URLs and missing env vars break production."
    ],
    sections: [
      {
        title: "Why Build a Project?",
        content: `<p>A portfolio project is the single most effective thing on your resume. It demonstrates:</p>
<ul>
  <li>You can build something <strong>end-to-end</strong> (not just solve toy problems)</li>
  <li>You understand <strong>multiple technologies</strong> working together</li>
  <li>You can <strong>ship</strong> — deploy and make something real</li>
</ul>
<p>We'll walk through building a full-stack task manager app — small enough to finish, but complex enough to be impressive.</p>`
      },
      {
        title: "Project Architecture",
        content: `<p>Our task manager has a clear separation of concerns:</p>`,
        diagram: `
  ┌─────────────────────────────────────────────┐
  │  FRONTEND (React + TypeScript)              │
  │  ├── Components: TaskList, TaskForm, Login  │
  │  ├── State: React hooks + context           │
  │  └── API calls: fetch to backend            │
  └──────────────────┬──────────────────────────┘
                     │ HTTP / JSON
  ┌──────────────────┴──────────────────────────┐
  │  BACKEND (Node.js + Express)                │
  │  ├── Routes: /api/auth, /api/tasks          │
  │  ├── Middleware: auth, validation, logging   │
  │  └── ORM: Prisma                            │
  └──────────────────┬──────────────────────────┘
                     │ SQL
  ┌──────────────────┴──────────────────────────┐
  │  DATABASE (PostgreSQL)                      │
  │  ├── users (id, email, password_hash)       │
  │  ├── tasks (id, title, done, user_id)       │
  │  └── Indexes on user_id, email              │
  └─────────────────────────────────────────────┘
        `
      },
      {
        title: "Step 1: Database Schema",
        content: `<p>Start with the data model. This is your foundation — everything else builds on it.</p>`,
        code: `// prisma/schema.prisma
// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }
//
// model User {
//   id           Int      @id @default(autoincrement())
//   email        String   @unique
//   passwordHash String   @map("password_hash")
//   createdAt    DateTime @default(now()) @map("created_at")
//   tasks        Task[]
//
//   @@map("users")
// }
//
// model Task {
//   id        Int      @id @default(autoincrement())
//   title     String
//   done      Boolean  @default(false)
//   priority  Int      @default(0)
//   createdAt DateTime @default(now()) @map("created_at")
//   user      User     @relation(fields: [userId], references: [id])
//   userId    Int      @map("user_id")
//
//   @@map("tasks")
// }

// Run: npx prisma migrate dev --name init
// This creates the SQL tables automatically!`,
        language: "javascript"
      },
      {
        title: "Step 2: Backend API",
        content: `<p>Build RESTful endpoints. Each route handles one CRUD operation.</p>`,
        code: `// routes/tasks.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// All task routes require authentication
router.use(authenticate);

// GET /api/tasks — list user's tasks
router.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
  });
  res.json(tasks);
});

// POST /api/tasks — create a task
router.post('/', async (req, res) => {
  const { title, priority } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const task = await prisma.task.create({
    data: {
      title: title.trim(),
      priority: priority || 0,
      userId: req.user.id,  // From auth middleware
    },
  });
  res.status(201).json(task);
});

// PATCH /api/tasks/:id — toggle done / update
router.patch('/:id', async (req, res) => {
  // Verify the task belongs to this user
  const existing = await prisma.task.findFirst({
    where: { id: parseInt(req.params.id), userId: req.user.id },
  });
  if (!existing) return res.status(404).json({ error: 'Not found' });

  const updated = await prisma.task.update({
    where: { id: existing.id },
    data: req.body,  // { done: true } or { title: "..." }
  });
  res.json(updated);
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  const existing = await prisma.task.findFirst({
    where: { id: parseInt(req.params.id), userId: req.user.id },
  });
  if (!existing) return res.status(404).json({ error: 'Not found' });

  await prisma.task.delete({ where: { id: existing.id } });
  res.status(204).send();
});

module.exports = router;`,
        language: "javascript"
      },
      {
        title: "Step 3: React Frontend",
        content: `<p>Build the UI with React components that call your API.</p>`,
        code: `// components/TaskList.tsx
import { useState, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');

  // Fetch tasks on mount
  useEffect(() => {
    fetch('/api/tasks', {
      headers: { Authorization: \`Bearer \${localStorage.getItem('token')}\` }
    })
      .then(res => res.json())
      .then(setTasks);
  }, []);

  // Add a new task
  const addTask = async () => {
    if (!newTitle.trim()) return;
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: \`Bearer \${localStorage.getItem('token')}\`,
      },
      body: JSON.stringify({ title: newTitle }),
    });
    const task = await res.json();
    setTasks([task, ...tasks]);  // Add to top of list
    setNewTitle('');
  };

  // Toggle done status
  const toggleTask = async (id: number, done: boolean) => {
    await fetch(\`/api/tasks/\${id}\`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: \`Bearer \${localStorage.getItem('token')}\`,
      },
      body: JSON.stringify({ done: !done }),
    });
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div>
      <div className="add-task">
        <input
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          placeholder="Add a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.done ? 'done' : ''}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id, task.done)}
            />
            <span>{task.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
        language: "typescript"
      },
      {
        title: "Step 4: Deploy",
        content: `<p>A project isn't complete until it's live. Here are the simplest deployment options:</p>
<ul>
  <li><strong>Frontend</strong>: Vercel or Netlify (free, automatic deploys from GitHub)</li>
  <li><strong>Backend</strong>: Railway, Render, or Fly.io (free tier available)</li>
  <li><strong>Database</strong>: Supabase, Neon, or Railway PostgreSQL (free tier)</li>
</ul>
<p>The key steps: push to GitHub, connect your hosting service to the repo, set environment variables, and deploy. Most platforms handle the rest automatically.</p>`,
        pitfall: "Always test your deployed app. Things that work locally often break in production: hardcoded localhost URLs, missing environment variables, CORS issues. Set up your .env for production separately.",
        quiz: {
          question: "When building a full-stack project, what should you start with?",
          options: [
            "The frontend UI",
            "The database schema and data model",
            "The deployment pipeline",
            "The CSS styling"
          ],
          answer: 1
        }
      }
    ]
  },

  // ============================================================
  // WEEK 8, TOPIC 4 — Resume & GitHub Profile
  // ============================================================
  "w8t4": {
    takeaways: [
      "Keep your resume to one page; recruiters spend about 7 seconds scanning it.",
      "Resume bullet formula: Action Verb + What You Built + Technology + Impact.",
      "Pin your best 4-6 repos on GitHub; every pinned repo needs a clear README.",
      "A good README has: what it does, how to run it, a screenshot, and the tech stack.",
      "Only list skills you can discuss in an interview; never rate them with stars or percentages."
    ],
    sections: [
      {
        title: "The SWE Resume Format",
        content: `<p>A software engineering resume follows specific conventions. Recruiters spend about <strong>7 seconds</strong> scanning your resume — make those seconds count.</p>
<ul>
  <li><strong>One page</strong>, always. No exceptions for entry-level.</li>
  <li><strong>No objectives or summaries</strong>. They waste space.</li>
  <li><strong>Order</strong>: Education, Skills, Projects, Experience (for new grads).</li>
  <li><strong>Bullet points</strong>, not paragraphs. Start each with a strong action verb.</li>
</ul>`
      },
      {
        title: "Writing Project Bullets That Stand Out",
        content: `<p>The formula: <strong>Action Verb + What You Built + Technology + Impact/Scale</strong></p>`,
        code: `// BAD bullets:
// - "Made a task manager app"
// - "Used React and Node.js"
// - "Worked on database stuff"

// GOOD bullets:
// - "Built a full-stack task manager with React, Node.js, and
//    PostgreSQL supporting user authentication and real-time updates"
// - "Designed a normalized database schema with 4 tables and
//    optimized queries using indexes, reducing load time by 60%"
// - "Implemented JWT-based authentication with bcrypt password
//    hashing and role-based access control for 3 user types"
// - "Wrote 25+ unit and integration tests with Jest achieving
//    90% code coverage across API endpoints"

// Strong action verbs for SWE resumes:
// Built, Designed, Implemented, Developed, Architected,
// Optimized, Refactored, Deployed, Automated, Integrated,
// Migrated, Reduced, Improved, Created, Engineered`,
        language: "javascript"
      },
      {
        title: "Your GitHub Profile",
        content: `<p>Your GitHub is your portfolio. Recruiters and engineers <em>will</em> look at it. Here's how to make it shine:</p>
<ul>
  <li><strong>Pin your best 4-6 repos</strong> on your profile page.</li>
  <li><strong>Every pinned repo needs a README</strong> with: what it does, how to run it, a screenshot/demo, and the tech stack.</li>
  <li><strong>Consistent commit history</strong>: Green squares show you're actively coding. Aim for regular commits, even small ones.</li>
  <li><strong>Clean code</strong>: Add comments, use consistent formatting. Someone will read your code.</li>
</ul>`
      },
      {
        title: "Writing a Great README",
        content: `<p>A README is the front door to your project. Follow this structure:</p>`,
        code: `// README structure for a portfolio project:

// # Project Name
// One-sentence description of what it does.
//
// [Screenshot or GIF demo here]
//
// ## Features
// - User authentication (signup/login/logout)
// - Create, read, update, delete tasks
// - Filter by status and priority
// - Responsive design (mobile + desktop)
//
// ## Tech Stack
// - **Frontend**: React, TypeScript, Tailwind CSS
// - **Backend**: Node.js, Express, Prisma ORM
// - **Database**: PostgreSQL
// - **Auth**: JWT + bcrypt
// - **Testing**: Jest + Supertest
// - **Deployment**: Vercel (frontend), Railway (backend)
//
// ## Getting Started
// \`\`\`bash
// git clone https://github.com/you/project.git
// cd project
// npm install
// cp .env.example .env   # Fill in your values
// npx prisma migrate dev
// npm run dev
// \`\`\`
//
// ## API Endpoints
// | Method | Route           | Description      |
// |--------|-----------------|------------------|
// | POST   | /api/auth/login | User login       |
// | GET    | /api/tasks      | List user tasks  |
// | POST   | /api/tasks      | Create a task    |`,
        language: "markdown"
      },
      {
        title: "Technical Skills Section",
        content: `<p>List skills by category. Only include technologies you can discuss in an interview.</p>
<ul>
  <li><strong>Languages</strong>: JavaScript, TypeScript, Python, SQL</li>
  <li><strong>Frontend</strong>: React, HTML, CSS, Tailwind</li>
  <li><strong>Backend</strong>: Node.js, Express, Flask</li>
  <li><strong>Databases</strong>: PostgreSQL, Prisma, Redis</li>
  <li><strong>Tools</strong>: Git, GitHub, VS Code, Docker, Linux</li>
  <li><strong>Testing</strong>: Jest, Supertest</li>
</ul>
<p><strong>Do NOT list</strong>: Microsoft Word, Google Docs, or basic computer skills. Do NOT rate yourself with stars or percentages (e.g., "Python: 4/5 stars"). Just list the technology names.</p>`,
        quiz: {
          question: "What's the formula for a good resume bullet point?",
          options: [
            "Technology name + version number",
            "Action verb + what you built + technology + impact",
            "Date + task description",
            "Problem statement + solution paragraph"
          ],
          answer: 1
        }
      }
    ]
  },

  // ============================================================
  // WEEK 8, TOPIC 5 — Behavioral Interviews & Soft Skills
  // ============================================================
  "w8t5": {
    takeaways: [
      "Use the STAR method (Situation, Task, Action, Result) for every behavioral answer.",
      "The Action section should be 60-70% of your answer; focus on what YOU specifically did.",
      "Prepare 5-6 adaptable stories covering conflict, failure, leadership, challenge, and growth.",
      "Think out loud during technical interviews; interviewers want to see your reasoning process.",
      "Always have thoughtful questions ready for the interviewer; never say 'no questions'."
    ],
    sections: [
      {
        title: "Why Behavioral Interviews Matter",
        content: `<p>Behavioral interviews assess whether you can <strong>collaborate</strong>, <strong>communicate</strong>, and <strong>handle challenges</strong>. Companies reject technically strong candidates who can't work on a team.</p>
<p>The core insight: <strong>past behavior predicts future behavior</strong>. That's why every question starts with "Tell me about a time when..."</p>
<p>Good news for career changers: your experiences from <em>any</em> context count — school projects, group work, self-learning, hackathons, even non-tech jobs.</p>`
      },
      {
        title: "The STAR Method",
        content: `<p>Structure every answer with <strong>STAR</strong>:</p>
<ul>
  <li><strong>S</strong>ituation: Set the scene (1-2 sentences).</li>
  <li><strong>T</strong>ask: What was your responsibility?</li>
  <li><strong>A</strong>ction: What did YOU specifically do? (This is the longest part.)</li>
  <li><strong>R</strong>esult: What happened? Quantify if possible.</li>
</ul>`,
        code: `// Example: "Tell me about a time you had to learn something new quickly."

// SITUATION:
// "During a hackathon, our team decided to build a real-time
//  chat app, but none of us had used WebSockets before."

// TASK:
// "I took ownership of the backend real-time communication
//  component since I was most comfortable with the server side."

// ACTION:
// "I spent the first 2 hours reading the Socket.io docs and
//  building a minimal proof of concept. I created a simple
//  echo server first, then added rooms and message persistence.
//  I also documented the WebSocket events so my teammates
//  could integrate with the frontend without confusion."

// RESULT:
// "We had a working real-time chat within 8 hours, and our
//  project won 'Best Technical Implementation.' I continued
//  learning about WebSockets and later used them in a
//  personal project."

// Key: The ACTION section should be 60-70% of your answer.
// Be specific about what YOU did, not your team.`,
        language: "javascript"
      },
      {
        title: "Common Behavioral Questions & How to Prepare",
        content: `<p>Prepare 5-6 stories that can be adapted to answer most questions:</p>
<ul>
  <li><strong>Conflict</strong>: "Tell me about a disagreement with a teammate." Focus on how you resolved it professionally.</li>
  <li><strong>Failure</strong>: "Tell me about a time something went wrong." Show what you learned, not that you're perfect.</li>
  <li><strong>Leadership</strong>: "Tell me about leading a project." You don't need a title to lead — taking initiative counts.</li>
  <li><strong>Challenge</strong>: "Tell me about a difficult technical problem." Walk through your debugging/problem-solving process.</li>
  <li><strong>Growth</strong>: "Tell me about feedback you received." Show you're coachable and self-aware.</li>
</ul>
<p><strong>Pro tip</strong>: Write your stories down. Practice them out loud. Record yourself. The first time you tell a story should NOT be in the actual interview.</p>`
      },
      {
        title: "Asking Good Questions",
        content: `<p>At the end of every interview, you'll be asked "Do you have questions for us?" Always say yes. Good questions show curiosity and research.</p>
<ul>
  <li>"What does a typical day look like for someone in this role?"</li>
  <li>"What's the team's biggest technical challenge right now?"</li>
  <li>"How do you handle code reviews? What does the PR process look like?"</li>
  <li>"What does the onboarding process look like for new engineers?"</li>
  <li>"What's something you wish you'd known before joining?"</li>
</ul>
<p><strong>Never ask about</strong>: salary (save for recruiter/HR), things easily found on the company website, or "Did I get the job?"</p>`
      },
      {
        title: "Communication During Technical Interviews",
        content: `<p>How you communicate during a coding interview matters as much as whether you solve the problem.</p>
<ul>
  <li><strong>Think out loud.</strong> "I'm thinking we could use a hash map here because we need O(1) lookups..." The interviewer wants to see your thought process.</li>
  <li><strong>Ask clarifying questions.</strong> "Can the input be empty? Can there be duplicates? Is the array sorted?" This shows thoroughness.</li>
  <li><strong>State your approach before coding.</strong> "I'm going to use a two-pointer approach. Start both at the beginning, expand the window..." Get buy-in before writing code.</li>
  <li><strong>Admit when you're stuck.</strong> "I'm not sure about the optimal approach, but my intuition says this is a dynamic programming problem because..." Partial reasoning beats silent struggling.</li>
  <li><strong>Test your code.</strong> Trace through it with an example. "Let me walk through this with input [1, 2, 3]..." Catching your own bugs is impressive.</li>
</ul>`,
        quiz: {
          question: "In the STAR method, which part should be the longest?",
          options: [
            "Situation — set the scene in detail",
            "Task — explain the full context",
            "Action — describe what YOU specifically did",
            "Result — give lots of metrics"
          ],
          answer: 2
        }
      }
    ]
  }
};