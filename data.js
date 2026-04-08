// ============================================================
// FULL 8-WEEK ROADMAP DATA
// Tailored for someone with SQL background + vibe coding experience
// ============================================================

const ROADMAP = [
  // ─────────── WEEK 1: Foundations ───────────
  {
    week: 1,
    title: "Programming Foundations",
    description: "Solidify core programming concepts. You've been vibe-coding — now understand WHY things work.",
    color: "#6366f1",
    topics: [
      {
        id: "w1t1",
        title: "How Computers Actually Run Code",
        category: "Fundamentals",
        detail: `Understand compilation vs interpretation, how memory works (stack vs heap), and what happens when you run a program.`,
        keyPoints: [
          "CPU, RAM, and storage — what lives where",
          "Compiled (C, Go) vs interpreted (Python, JS) languages",
          "Stack memory vs heap memory",
          "What a runtime environment is (Node.js, Python interpreter)"
        ],
        practice: "Write a program that deliberately causes a stack overflow. Explain why it happened."
      },
      {
        id: "w1t2",
        title: "Variables, Types & Memory",
        category: "Fundamentals",
        detail: "Go beyond 'let x = 5'. Understand primitive vs reference types, type coercion, and mutability.",
        keyPoints: [
          "Primitive types: int, float, string, boolean, null/undefined",
          "Reference types: arrays, objects, functions",
          "Pass by value vs pass by reference",
          "Type coercion pitfalls (== vs === in JS)",
          "Immutability and why it matters"
        ],
        practice: "Predict the output of 10 tricky type coercion examples without running them."
      },
      {
        id: "w1t3",
        title: "Control Flow & Logic",
        category: "Fundamentals",
        detail: "Master conditionals, loops, and logical operators — the building blocks of every algorithm.",
        keyPoints: [
          "if/else, switch, ternary operators",
          "for, while, do-while, for...of, for...in",
          "Short-circuit evaluation (&&, ||)",
          "Truthy and falsy values",
          "Break, continue, and early returns"
        ],
        practice: "Implement FizzBuzz 3 different ways. Then implement it without any if statements."
      },
      {
        id: "w1t4",
        title: "Functions Deep Dive",
        category: "Fundamentals",
        detail: "Functions are the most important abstraction in programming. Master them thoroughly.",
        keyPoints: [
          "Function declarations vs expressions vs arrow functions",
          "Parameters, arguments, default values, rest params",
          "Return values and pure functions",
          "Scope and closures",
          "Callback functions and higher-order functions"
        ],
        practice: "Build your own implementations of map, filter, and reduce from scratch."
      },
      {
        id: "w1t5",
        title: "Strings & Array Manipulation",
        category: "Fundamentals",
        detail: "You'll use strings and arrays in virtually every coding interview. Know them cold.",
        keyPoints: [
          "String methods: slice, split, join, replace, includes, indexOf",
          "Array methods: push, pop, shift, unshift, splice, slice",
          "Functional methods: map, filter, reduce, find, some, every",
          "String immutability",
          "Two-pointer technique basics"
        ],
        practice: "Reverse a string, check palindromes, remove duplicates from an array — all without built-in shortcuts."
      }
    ]
  },

  // ─────────── WEEK 2: Data Structures I ───────────
  {
    week: 2,
    title: "Data Structures I — Linear Structures",
    description: "Learn the fundamental data structures that underpin all software. Since you know SQL tables, think of these as different ways to organize data in memory.",
    color: "#8b5cf6",
    topics: [
      {
        id: "w2t1",
        title: "Arrays & Dynamic Arrays",
        category: "Data Structures",
        detail: "Understand how arrays actually work in memory, time complexity of operations, and when to use them.",
        keyPoints: [
          "Contiguous memory allocation",
          "O(1) access, O(n) insertion/deletion",
          "Dynamic resizing (amortized O(1) append)",
          "2D arrays and matrix operations",
          "When arrays beat other structures"
        ],
        practice: "Implement a dynamic array class with push, pop, get, set, and resize."
      },
      {
        id: "w2t2",
        title: "Linked Lists",
        category: "Data Structures",
        detail: "Your first non-trivial data structure. Linked lists teach pointer manipulation — crucial for interviews.",
        keyPoints: [
          "Singly vs doubly linked lists",
          "Node structure: value + next pointer",
          "Insertion, deletion, traversal",
          "O(1) insert/delete at head vs O(n) for arrays",
          "Runner (fast/slow pointer) technique"
        ],
        practice: "Implement a linked list. Then: reverse it, detect a cycle, find the middle node."
      },
      {
        id: "w2t3",
        title: "Stacks",
        category: "Data Structures",
        detail: "LIFO structure — used everywhere from function calls to undo buttons to parsing expressions.",
        keyPoints: [
          "Last In, First Out (LIFO) principle",
          "push, pop, peek operations — all O(1)",
          "The call stack and recursion",
          "Applications: parentheses matching, expression evaluation",
          "Implementing with arrays vs linked lists"
        ],
        practice: "Implement a stack. Use it to check balanced parentheses: ({[]}) vs ({[)}"
      },
      {
        id: "w2t4",
        title: "Queues & Deques",
        category: "Data Structures",
        detail: "FIFO structure — used in BFS, task scheduling, and message processing.",
        keyPoints: [
          "First In, First Out (FIFO) principle",
          "enqueue, dequeue operations",
          "Circular queue implementation",
          "Deque (double-ended queue)",
          "Priority queues (preview for Week 4)"
        ],
        practice: "Implement a queue using two stacks. Implement a circular buffer."
      },
      {
        id: "w2t5",
        title: "Hash Tables (Maps & Sets)",
        category: "Data Structures",
        detail: "The most important data structure for coding interviews. You use WHERE clauses in SQL — hash tables are the in-memory equivalent.",
        keyPoints: [
          "Hash functions and how they work",
          "Collision resolution: chaining vs open addressing",
          "O(1) average lookup, insert, delete",
          "JavaScript objects/Maps, Python dicts",
          "Sets for uniqueness checking"
        ],
        practice: "Implement a hash map from scratch. Use it to solve Two Sum."
      }
    ]
  },

  // ─────────── WEEK 3: Algorithms I ───────────
  {
    week: 3,
    title: "Algorithms I — Sorting, Searching & Complexity",
    description: "Learn Big O notation and classic algorithms. This is the language of technical interviews.",
    color: "#a855f7",
    topics: [
      {
        id: "w3t1",
        title: "Big O Notation & Complexity Analysis",
        category: "Algorithms",
        detail: "The framework for evaluating code efficiency. You MUST be fluent in this for interviews.",
        keyPoints: [
          "Time complexity: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)",
          "Space complexity: auxiliary vs total space",
          "Best case, average case, worst case",
          "How to analyze nested loops",
          "Amortized analysis basics"
        ],
        practice: "Analyze the time and space complexity of 10 code snippets. Then optimize an O(n²) solution to O(n)."
      },
      {
        id: "w3t2",
        title: "Binary Search",
        category: "Algorithms",
        detail: "The most fundamental search algorithm. If data is sorted, binary search is usually the answer.",
        keyPoints: [
          "O(log n) search on sorted data",
          "Iterative vs recursive implementation",
          "Finding boundaries (first/last occurrence)",
          "Search space reduction pattern",
          "Binary search on answer (advanced)"
        ],
        practice: "Implement binary search. Then solve: search rotated sorted array, find peak element."
      },
      {
        id: "w3t3",
        title: "Sorting Algorithms",
        category: "Algorithms",
        detail: "Know how sorting works under the hood. Interviewers love asking about sorting trade-offs.",
        keyPoints: [
          "Bubble sort, selection sort, insertion sort (O(n²) — know them, don't use them)",
          "Merge sort: divide & conquer, O(n log n), stable",
          "Quick sort: partitioning, O(n log n) average, in-place",
          "When to use which sorting algorithm",
          "Built-in sort functions and custom comparators"
        ],
        practice: "Implement merge sort and quick sort from scratch. Sort an array of objects by multiple keys."
      },
      {
        id: "w3t4",
        title: "Recursion & Backtracking",
        category: "Algorithms",
        detail: "Recursion is hard at first but essential. Think of it as SQL subqueries — a query that calls itself.",
        keyPoints: [
          "Base case and recursive case",
          "The call stack and stack frames",
          "Recursion vs iteration trade-offs",
          "Backtracking pattern: choose, explore, unchoose",
          "Memoization preview"
        ],
        practice: "Solve: generate all permutations, N-Queens (simplified), and generate all valid parentheses combinations."
      },
      {
        id: "w3t5",
        title: "Two Pointers & Sliding Window",
        category: "Algorithms",
        detail: "Two of the most common interview patterns. Master these and you'll crack 30% of medium problems.",
        keyPoints: [
          "Two pointers: start/end, converging, fast/slow",
          "Sliding window: fixed size and variable size",
          "When to use each pattern",
          "Common problems: container with most water, longest substring without repeating chars",
          "Optimizing brute force O(n²) to O(n)"
        ],
        practice: "Solve 5 two-pointer and 5 sliding-window problems."
      }
    ]
  },

  // ─────────── WEEK 4: Data Structures II ───────────
  {
    week: 4,
    title: "Data Structures II — Trees & Graphs",
    description: "Non-linear data structures. Trees are everywhere in software (DOM, file systems, databases). Graphs model relationships.",
    color: "#c026d3",
    topics: [
      {
        id: "w4t1",
        title: "Binary Trees",
        category: "Data Structures",
        detail: "The foundation for more advanced tree structures. Practice traversals until they're automatic.",
        keyPoints: [
          "Tree terminology: root, leaf, height, depth, level",
          "Inorder, preorder, postorder traversals (recursive & iterative)",
          "Level-order traversal (BFS with queue)",
          "Tree height, depth, and diameter",
          "Common patterns: DFS on trees"
        ],
        practice: "Implement all 4 traversals. Solve: max depth, invert tree, check if symmetric."
      },
      {
        id: "w4t2",
        title: "Binary Search Trees (BST)",
        category: "Data Structures",
        detail: "BSTs combine the search efficiency of binary search with dynamic insert/delete. Think of them as a sorted data index.",
        keyPoints: [
          "BST property: left < node < right",
          "Search, insert, delete operations",
          "Inorder traversal gives sorted order",
          "Balanced vs unbalanced (why balance matters)",
          "Self-balancing trees: AVL, Red-Black (concepts only)"
        ],
        practice: "Implement a BST with insert, search, delete. Validate if a tree is a valid BST."
      },
      {
        id: "w4t3",
        title: "Heaps & Priority Queues",
        category: "Data Structures",
        detail: "When you need the min or max efficiently. Used in scheduling, graph algorithms, and 'top K' problems.",
        keyPoints: [
          "Min-heap and max-heap properties",
          "Array representation of heaps",
          "Insert (bubble up) and extract (bubble down)",
          "Heapify: building a heap in O(n)",
          "Top K pattern using heaps"
        ],
        practice: "Implement a min-heap. Solve: Kth largest element, merge K sorted lists."
      },
      {
        id: "w4t4",
        title: "Graphs — Representation",
        category: "Data Structures",
        detail: "Graphs model networks, relationships, dependencies. Your SQL JOINs already represent graph-like queries.",
        keyPoints: [
          "Vertices and edges, directed vs undirected",
          "Adjacency matrix vs adjacency list",
          "Weighted vs unweighted graphs",
          "Graph terminology: degree, path, cycle, connected component",
          "When to use which representation"
        ],
        practice: "Build a graph class with addVertex, addEdge, removeEdge. Represent a social network."
      },
      {
        id: "w4t5",
        title: "Graph Traversal — BFS & DFS",
        category: "Data Structures",
        detail: "The two fundamental ways to explore a graph. BFS finds shortest paths; DFS explores deeply.",
        keyPoints: [
          "BFS: level-by-level exploration using a queue",
          "DFS: deep exploration using stack/recursion",
          "Visited set to avoid cycles",
          "Applications: shortest path, connected components, topological sort",
          "Time complexity: O(V + E)"
        ],
        practice: "Implement BFS and DFS. Solve: number of islands, clone graph, course schedule."
      }
    ]
  },

  // ─────────── WEEK 5: Web Development ───────────
  {
    week: 5,
    title: "Web Development Fundamentals",
    description: "Turn your coding skills into real products. Learn how the web works end-to-end.",
    color: "#0891b2",
    topics: [
      {
        id: "w5t1",
        title: "HTML & CSS — Beyond Basics",
        category: "Web Dev",
        detail: "You've probably used these in vibe coding. Now understand semantic HTML, the box model, Flexbox, and Grid.",
        keyPoints: [
          "Semantic HTML: header, nav, main, article, section",
          "The box model: margin, border, padding, content",
          "Flexbox: alignment, distribution, wrapping",
          "CSS Grid: 2D layouts",
          "Responsive design with media queries"
        ],
        practice: "Rebuild a popular website's layout (e.g., Twitter/X feed) using only Flexbox and Grid."
      },
      {
        id: "w5t2",
        title: "JavaScript & the DOM",
        category: "Web Dev",
        detail: "How JavaScript interacts with web pages. Event handling, DOM manipulation, and async patterns.",
        keyPoints: [
          "The DOM tree and how browsers render pages",
          "querySelector, createElement, appendChild",
          "Event listeners and event delegation",
          "Async/await, Promises, fetch API",
          "Local Storage and Session Storage"
        ],
        practice: "Build a todo app with add, delete, edit, filter, and local storage persistence — no framework."
      },
      {
        id: "w5t3",
        title: "HTTP, APIs & REST",
        category: "Web Dev",
        detail: "How frontend and backend communicate. REST APIs are the backbone of modern web apps.",
        keyPoints: [
          "HTTP methods: GET, POST, PUT, DELETE, PATCH",
          "Status codes: 200, 201, 301, 400, 401, 403, 404, 500",
          "Headers, request body, query parameters",
          "RESTful API design principles",
          "JSON data format (you know this from SQL result sets)"
        ],
        practice: "Build a frontend that consumes a public API (e.g., weather, GitHub users). Handle loading, errors, and display."
      },
      {
        id: "w5t4",
        title: "Git & Version Control",
        category: "Web Dev",
        detail: "Every professional team uses Git. Learn it properly — it will save you countless times.",
        keyPoints: [
          "git init, add, commit, push, pull",
          "Branching: create, switch, merge",
          "Resolving merge conflicts",
          "git log, diff, stash, rebase basics",
          "GitHub: PRs, code review, issues"
        ],
        practice: "Create a repo, make branches for features, create merge conflicts and resolve them. Open a PR on GitHub."
      },
      {
        id: "w5t5",
        title: "Command Line & Dev Tools",
        category: "Web Dev",
        detail: "The terminal is your power tool. Browser DevTools help you debug like a pro.",
        keyPoints: [
          "Navigation: cd, ls, pwd, mkdir, rm, cp, mv",
          "File operations: cat, grep, find, pipes (|)",
          "Package managers: npm, pip",
          "Chrome DevTools: Elements, Console, Network, Sources",
          "Environment variables and .env files"
        ],
        practice: "Do a full day of coding using ONLY the terminal for file operations. Use DevTools to debug a broken webpage."
      }
    ]
  },

  // ─────────── WEEK 6: Backend & Databases ───────────
  {
    week: 6,
    title: "Backend & Databases",
    description: "You already know SQL — now build the server that uses it. Learn backend architecture end-to-end.",
    color: "#059669",
    topics: [
      {
        id: "w6t1",
        title: "Node.js / Python Backend Basics",
        category: "Backend",
        detail: "Pick one: Express.js (Node) or Flask/FastAPI (Python). Build your first API server.",
        keyPoints: [
          "Setting up a project and installing dependencies",
          "Routing: defining endpoints",
          "Middleware: logging, auth, error handling",
          "Request parsing: body, params, query strings",
          "Environment config and project structure"
        ],
        practice: "Build a REST API for a bookstore: CRUD operations for books, authors, and reviews."
      },
      {
        id: "w6t2",
        title: "SQL Mastery (Level Up)",
        category: "Backend",
        detail: "You know basic SQL. Now master JOINs, subqueries, window functions, and indexing.",
        keyPoints: [
          "Complex JOINs: LEFT, RIGHT, FULL OUTER, CROSS, self-joins",
          "Subqueries vs CTEs (WITH clause)",
          "Window functions: ROW_NUMBER, RANK, LAG, LEAD, SUM OVER",
          "Indexing: B-trees, when to index, composite indexes",
          "Query optimization and EXPLAIN"
        ],
        practice: "Solve 10 advanced SQL problems involving window functions, CTEs, and self-joins."
      },
      {
        id: "w6t3",
        title: "Database Design & ORMs",
        category: "Backend",
        detail: "Design schemas properly. Learn how ORMs bridge your code and database.",
        keyPoints: [
          "Normalization: 1NF, 2NF, 3NF",
          "Entity-Relationship diagrams",
          "One-to-one, one-to-many, many-to-many relationships",
          "ORMs: Prisma, SQLAlchemy, Sequelize",
          "Migrations and schema evolution"
        ],
        practice: "Design a database for a social media app. Create the schema, write migrations, and seed data."
      },
      {
        id: "w6t4",
        title: "Authentication & Security",
        category: "Backend",
        detail: "How to handle users securely. Auth is a critical part of every real application.",
        keyPoints: [
          "Password hashing (bcrypt, argon2) — NEVER store plaintext",
          "Session-based vs token-based auth",
          "JWTs: structure, signing, verification",
          "OAuth 2.0 basics (Google/GitHub login)",
          "OWASP Top 10: SQL injection, XSS, CSRF"
        ],
        practice: "Add JWT authentication to your bookstore API. Implement login, signup, and protected routes."
      },
      {
        id: "w6t5",
        title: "Testing & Debugging",
        category: "Backend",
        detail: "Professional code is tested code. Learn unit testing, integration testing, and debugging strategies.",
        keyPoints: [
          "Unit tests vs integration tests vs e2e tests",
          "Testing frameworks: Jest, pytest, Mocha",
          "Test-driven development (TDD) basics",
          "Mocking and stubbing",
          "Debugging: breakpoints, logging, stack traces"
        ],
        practice: "Write tests for your bookstore API: unit tests for helpers, integration tests for endpoints."
      }
    ]
  },

  // ─────────── WEEK 7: Frontend Frameworks & System Design ───────────
  {
    week: 7,
    title: "Frontend Frameworks & System Design",
    description: "Learn React (the industry standard) and start thinking about how large systems work.",
    color: "#d97706",
    topics: [
      {
        id: "w7t1",
        title: "React Fundamentals",
        category: "Frontend",
        detail: "React is the most in-demand frontend skill. Learn components, state, and the React mental model.",
        keyPoints: [
          "Components: functional components, JSX syntax",
          "Props: passing data down, children",
          "State: useState, re-rendering",
          "Event handling in React",
          "Conditional rendering and lists"
        ],
        practice: "Build a task manager app with React: add, delete, toggle complete, filter by status."
      },
      {
        id: "w7t2",
        title: "React — Hooks & Effects",
        category: "Frontend",
        detail: "Hooks are how modern React manages state, side effects, and component lifecycle.",
        keyPoints: [
          "useEffect: data fetching, subscriptions, cleanup",
          "useContext: sharing state without prop drilling",
          "useRef: DOM access and persistent values",
          "useMemo and useCallback: performance optimization",
          "Custom hooks: extracting reusable logic"
        ],
        practice: "Build a weather dashboard that fetches data from an API, uses context for theme, and custom hooks for fetch logic."
      },
      {
        id: "w7t3",
        title: "System Design — Fundamentals",
        category: "System Design",
        detail: "How large-scale systems work. Even junior interviews touch on this.",
        keyPoints: [
          "Client-server architecture",
          "Load balancers and horizontal scaling",
          "Caching: CDN, Redis, browser cache",
          "Databases: SQL vs NoSQL, read replicas",
          "Message queues and async processing"
        ],
        practice: "Design a URL shortener (like bit.ly). Draw the architecture, define the API, and discuss scaling."
      },
      {
        id: "w7t4",
        title: "System Design — Common Patterns",
        category: "System Design",
        detail: "Learn the building blocks that appear in every system design discussion.",
        keyPoints: [
          "Rate limiting and throttling",
          "Pub/sub pattern",
          "Database sharding and partitioning",
          "CAP theorem: consistency vs availability",
          "Microservices vs monoliths"
        ],
        practice: "Design a chat application (like Slack). Consider real-time messaging, storage, and scaling."
      },
      {
        id: "w7t5",
        title: "TypeScript Basics",
        category: "Frontend",
        detail: "TypeScript adds types to JavaScript. Most companies require it. Your SQL type awareness helps here.",
        keyPoints: [
          "Basic types: string, number, boolean, arrays",
          "Interfaces and type aliases",
          "Union types, literal types, enums",
          "Generics basics",
          "TypeScript with React (typed props and state)"
        ],
        practice: "Convert your React task manager to TypeScript. Define interfaces for all your data types."
      }
    ]
  },

  // ─────────── WEEK 8: Interview Prep & Projects ───────────
  {
    week: 8,
    title: "Interview Prep & Portfolio Projects",
    description: "Tie it all together. Practice real interview problems and build a portfolio project that showcases your skills.",
    color: "#dc2626",
    topics: [
      {
        id: "w8t1",
        title: "Dynamic Programming",
        category: "Algorithms",
        detail: "The most feared interview topic. Break it down: it's just recursion + memoization.",
        keyPoints: [
          "Overlapping subproblems and optimal substructure",
          "Top-down (memoization) vs bottom-up (tabulation)",
          "1D DP: climbing stairs, house robber, coin change",
          "2D DP: unique paths, longest common subsequence",
          "How to identify DP problems"
        ],
        practice: "Solve 10 DP problems, starting with 1D and progressing to 2D."
      },
      {
        id: "w8t2",
        title: "Common Interview Patterns",
        category: "Interview",
        detail: "Most interview problems fall into recognizable patterns. Learn to identify them quickly.",
        keyPoints: [
          "Pattern recognition: which technique fits which problem?",
          "Top patterns: two pointers, sliding window, BFS/DFS, binary search, DP, greedy",
          "How to communicate your approach (think out loud)",
          "Time management: 5 min understand, 10 min plan, 20 min code, 5 min test",
          "Edge cases: empty input, single element, duplicates, negative numbers"
        ],
        practice: "Do 5 mock interviews (use Pramp, Interviewing.io, or a friend). Time yourself: 35 min per problem."
      },
      {
        id: "w8t3",
        title: "Build a Full-Stack Project",
        category: "Portfolio",
        detail: "Build something real that you can demo. This is your proof that you can ship software.",
        keyPoints: [
          "Choose a project that solves a real problem",
          "Full stack: React frontend + Node/Python backend + SQL database",
          "Include auth, CRUD, and at least one interesting feature",
          "Deploy it (Vercel/Railway/Render)",
          "Write a good README"
        ],
        practice: "Build and deploy a full-stack project. Ideas: expense tracker, job application tracker, recipe manager."
      },
      {
        id: "w8t4",
        title: "Resume & GitHub Profile",
        category: "Career",
        detail: "Your resume and GitHub are your first impression. Make them count.",
        keyPoints: [
          "One-page resume, quantify achievements",
          "Project descriptions: what it does, what tech you used, what you learned",
          "GitHub: pin best repos, write READMEs, show consistent commit history",
          "LinkedIn: headline, summary, featured projects",
          "Tailor resume for each application"
        ],
        practice: "Write your resume. Get 3 people to review it. Update your GitHub profile README."
      },
      {
        id: "w8t5",
        title: "Behavioral Interviews & Soft Skills",
        category: "Career",
        detail: "Technical skills get you the interview. Soft skills get you the offer.",
        keyPoints: [
          "STAR method: Situation, Task, Action, Result",
          "Common questions: tell me about yourself, why this company, conflict resolution",
          "Asking good questions to the interviewer",
          "How to handle 'I don't know' gracefully",
          "Negotiation basics: salary, equity, benefits"
        ],
        practice: "Prepare 5 STAR stories. Practice them out loud until they're natural, not scripted."
      }
    ]
  }
];

// ============================================================
// PRACTICE PROBLEMS — LeetCode-style with test cases
// ============================================================

const PROBLEMS = [
  // ─── Easy ───
  {
    id: "p1",
    title: "Two Sum",
    difficulty: "easy",
    topic: "Arrays",
    description: `Given an array of integers <code>nums</code> and an integer <code>target</code>, return the indices of the two numbers that add up to <code>target</code>.

You may assume each input has exactly one solution, and you may not use the same element twice.

<strong>Example:</strong>
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]  (because nums[0] + nums[1] = 2 + 7 = 9)

<strong>Example 2:</strong>
Input: nums = [3, 2, 4], target = 6
Output: [1, 2]`,
    starterJS: `function twoSum(nums, target) {
  // Your code here

}`,
    starterPY: `def two_sum(nums, target):
    # Your code here
    pass`,
    testCases: [
      { input: [[2,7,11,15], 9], expected: [0,1] },
      { input: [[3,2,4], 6], expected: [1,2] },
      { input: [[3,3], 6], expected: [0,1] },
    ],
    solution: `// O(n) using a hash map
function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map[complement] !== undefined) {
      return [map[complement], i];
    }
    map[nums[i]] = i;
  }
}`,
    walkthrough: `<strong>Step 1: Understand the brute force</strong>
The naive way is to check every pair — two nested loops, O(n²). Can we do better?

<strong>Step 2: The key insight</strong>
For each number, we need to find if (target - number) exists somewhere else in the array. This is a LOOKUP problem — and hash maps do lookups in O(1).

<strong>Step 3: Build the algorithm</strong>
Walk through the array once. For each number:
  1. Calculate complement = target - nums[i]
  2. Check if complement is already in our map
  3. If yes → we found our pair! Return both indices
  4. If no → store nums[i] and its index in the map

<strong>Step 4: Why this works</strong>
When we reach index 1 (value 7), we check: is (9-7)=2 in the map? Yes! We stored it at index 0. Done.

<strong>Complexity:</strong> O(n) time, O(n) space — one pass through the array.

<strong>SQL analogy:</strong> Think of the hash map like an INDEX on a table. Instead of scanning every row (O(n²)), you do an indexed lookup (O(1)) for each element.`,
    hint: "Use a hash map to store numbers you've seen. For each number, check if (target - number) exists in the map."
  },
  {
    id: "p2",
    title: "Reverse String",
    difficulty: "easy",
    topic: "Strings",
    description: `Write a function that reverses a string. The input is given as an array of characters.

You must do this <strong>in-place</strong> with O(1) extra memory.

<strong>Example:</strong>
Input: ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

<strong>Example 2:</strong>
Input: ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]`,
    starterJS: `function reverseString(s) {
  // Modify s in-place

}`,
    starterPY: `def reverse_string(s):
    # Modify s in-place
    pass`,
    testCases: [
      { input: [["h","e","l","l","o"]], expected: ["o","l","l","e","h"] },
      { input: [["H","a","n","n","a","h"]], expected: ["h","a","n","n","a","H"] },
    ],
    solution: `function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
}`,
    walkthrough: `<strong>Step 1: Why in-place?</strong>
The problem says O(1) extra memory — we can't create a new array. We must modify the original.

<strong>Step 2: Two-pointer approach</strong>
Place one pointer at the start (left=0) and one at the end (right=length-1).
Swap the characters at both pointers, then move them inward.

<strong>Step 3: Trace through "hello"</strong>
  ["h","e","l","l","o"]  → swap h,o → ["o","e","l","l","h"]
  left=1, right=3        → swap e,l → ["o","l","l","e","h"]
  left=2, right=2        → left >= right, STOP

<strong>Complexity:</strong> O(n) time, O(1) space — exactly n/2 swaps.

<strong>Pattern:</strong> Two-pointer converging from both ends. You'll use this pattern A LOT in interviews.`,
    hint: "Use two pointers — one at the start, one at the end. Swap and move inward."
  },
  {
    id: "p3",
    title: "Valid Parentheses",
    difficulty: "easy",
    topic: "Stacks",
    description: `Given a string <code>s</code> containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

A string is valid if:
1. Open brackets are closed by the same type of brackets.
2. Open brackets are closed in the correct order.
3. Every close bracket has a corresponding open bracket.

<strong>Example 1:</strong> Input: "()" → Output: true
<strong>Example 2:</strong> Input: "()[]{}" → Output: true
<strong>Example 3:</strong> Input: "(]" → Output: false
<strong>Example 4:</strong> Input: "([)]" → Output: false`,
    starterJS: `function isValid(s) {
  // Your code here

}`,
    starterPY: `def is_valid(s):
    # Your code here
    pass`,
    testCases: [
      { input: ["()"], expected: true },
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["([)]"], expected: false },
      { input: ["{[]}"], expected: true },
    ],
    solution: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };
  for (const char of s) {
    if ('({['.includes(char)) {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`,
    walkthrough: `<strong>Step 1: Why a stack?</strong>
Brackets must be closed in REVERSE order of opening — "last opened, first closed." That's exactly what a stack does (LIFO).

<strong>Step 2: The algorithm</strong>
  - See an opening bracket? Push it onto the stack.
  - See a closing bracket? Pop the stack and check if it matches.
  - If it doesn't match → invalid.
  - At the end, stack must be empty (all brackets were closed).

<strong>Step 3: Trace through "({[]})"</strong>
  '(' → push → stack: ['(']
  '{' → push → stack: ['(', '{']
  '[' → push → stack: ['(', '{', '[']
  ']' → pop '[' matches ']' ✓ → stack: ['(', '{']
  '}' → pop '{' matches '}' ✓ → stack: ['(']
  ')' → pop '(' matches ')' ✓ → stack: []
  Stack empty → VALID ✓

<strong>Why "([)]" fails:</strong>
  '(' → push, '[' → push → stack: ['(', '[']
  ')' → pop '[' ... but '[' doesn't match ')' → INVALID ✗

<strong>Complexity:</strong> O(n) time, O(n) space.`,
    hint: "Use a stack. Push opening brackets, pop when you see a closing bracket, and check if they match."
  },
  {
    id: "p4",
    title: "Palindrome Check",
    difficulty: "easy",
    topic: "Strings",
    description: `Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring case.

<strong>Example 1:</strong>
Input: "A man, a plan, a canal: Panama"
Output: true

<strong>Example 2:</strong>
Input: "race a car"
Output: false

<strong>Example 3:</strong>
Input: " "
Output: true (empty string is a palindrome)`,
    starterJS: `function isPalindrome(s) {
  // Your code here

}`,
    starterPY: `def is_palindrome(s):
    # Your code here
    pass`,
    testCases: [
      { input: ["A man, a plan, a canal: Panama"], expected: true },
      { input: ["race a car"], expected: false },
      { input: [" "], expected: true },
    ],
    solution: `function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
    walkthrough: `<strong>Step 1: Understand the problem</strong>
A palindrome reads the same forwards and backwards. But we must ignore non-alphanumeric characters and case — so "A man, a plan, a canal: Panama" becomes "amanaplanacanalpanama".

<strong>Step 2: Clean then compare</strong>
First, convert to lowercase and strip everything that isn't a letter or digit. Then use two pointers converging from both ends, comparing characters.

<strong>Step 3: Trace through "A man, a plan, a canal: Panama"</strong>
  Cleaned: "amanaplanacanalpanama"
  left=0 ('a') vs right=20 ('a') → match, move inward
  left=1 ('m') vs right=19 ('m') → match, move inward
  ... all pairs match → returns true

<strong>Step 4: Why two pointers work</strong>
We only need to check if the first half mirrors the second half. Once left >= right, every pair matched — it's a palindrome.

<strong>Complexity:</strong> O(n) time for cleaning + O(n) for comparison = O(n). O(n) space for cleaned string.

<strong>Pattern:</strong> Two-pointer converging. You could also skip non-alphanumeric characters in-place without creating a cleaned string to achieve O(1) space.`,
    hint: "Clean the string first (lowercase, remove non-alphanumeric). Then use two pointers from both ends."
  },
  {
    id: "p5",
    title: "Maximum Subarray",
    difficulty: "easy",
    topic: "Arrays",
    description: `Given an integer array <code>nums</code>, find the contiguous subarray with the largest sum and return the sum.

<strong>Example 1:</strong>
Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6 (subarray [4, -1, 2, 1])

<strong>Example 2:</strong>
Input: [1]
Output: 1

<strong>Example 3:</strong>
Input: [5, 4, -1, 7, 8]
Output: 23`,
    starterJS: `function maxSubArray(nums) {
  // Your code here

}`,
    starterPY: `def max_sub_array(nums):
    # Your code here
    pass`,
    testCases: [
      { input: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[5,4,-1,7,8]], expected: 23 },
    ],
    solution: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
    walkthrough: `<strong>Step 1: The brute force</strong>
Check every possible subarray and compute its sum — O(n³) or O(n²) with prefix sums. Way too slow.

<strong>Step 2: Kadane's key insight</strong>
At each position, you have exactly two choices: (1) extend the current subarray by adding nums[i], or (2) start a NEW subarray beginning at nums[i]. You pick whichever gives a larger sum.

<strong>Step 3: The algorithm</strong>
  currentSum = max(nums[i], currentSum + nums[i])
  maxSum = max(maxSum, currentSum)
If currentSum + nums[i] < nums[i], the previous subarray was dragging us down — start fresh.

<strong>Step 4: Trace through [-2, 1, -3, 4, -1, 2, 1, -5, 4]</strong>
  i=0: current=max(-2, -2)=-2,  max=-2
  i=1: current=max(1, -2+1)=1,  max=1
  i=2: current=max(-3, 1-3)=-2, max=1
  i=3: current=max(4, -2+4)=4,  max=4
  i=4: current=max(-1, 4-1)=3,  max=4
  i=5: current=max(2, 3+2)=5,   max=5
  i=6: current=max(1, 5+1)=6,   max=6  ← answer!

<strong>Complexity:</strong> O(n) time, O(1) space — single pass, no extra arrays.

<strong>Pattern:</strong> Kadane's algorithm. A foundational DP/greedy pattern — "should I extend or restart?" Shows up in many subarray problems.`,
    hint: "Kadane's Algorithm: at each position, either start a new subarray or extend the current one. Track the maximum."
  },

  // ─── Medium ───
  {
    id: "p6",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    topic: "Sliding Window",
    description: `Given a string <code>s</code>, find the length of the longest substring without repeating characters.

<strong>Example 1:</strong>
Input: "abcabcbb"
Output: 3 ("abc")

<strong>Example 2:</strong>
Input: "bbbbb"
Output: 1 ("b")

<strong>Example 3:</strong>
Input: "pwwkew"
Output: 3 ("wke")`,
    starterJS: `function lengthOfLongestSubstring(s) {
  // Your code here

}`,
    starterPY: `def length_of_longest_substring(s):
    # Your code here
    pass`,
    testCases: [
      { input: ["abcabcbb"], expected: 3 },
      { input: ["bbbbb"], expected: 1 },
      { input: ["pwwkew"], expected: 3 },
      { input: [""], expected: 0 },
    ],
    solution: `function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let maxLen = 0, start = 0;
  for (let end = 0; end < s.length; end++) {
    if (seen.has(s[end]) && seen.get(s[end]) >= start) {
      start = seen.get(s[end]) + 1;
    }
    seen.set(s[end], end);
    maxLen = Math.max(maxLen, end - start + 1);
  }
  return maxLen;
}`,
    walkthrough: `<strong>Step 1: Why sliding window?</strong>
We need a contiguous substring — that means a window of characters. We want to grow it as long as there are no repeats, and shrink it when a repeat appears.

<strong>Step 2: The algorithm</strong>
Maintain a window [start, end]. Use a Map to store each character's most recent index.
  - Expand: move end forward one character at a time.
  - Shrink: if s[end] was seen at index >= start, jump start to seen[s[end]] + 1.
  - Track: maxLen = max(maxLen, end - start + 1).

<strong>Step 3: Trace through "abcabcbb"</strong>
  end=0 'a': seen={a:0}, window="a", len=1
  end=1 'b': seen={a:0,b:1}, window="ab", len=2
  end=2 'c': seen={a:0,b:1,c:2}, window="abc", len=3
  end=3 'a': 'a' seen at 0 >= start(0), start=1. window="bca", len=3
  end=4 'b': 'b' seen at 1 >= start(1), start=2. window="cab", len=3
  ...max stays 3.

<strong>Step 4: Why jump start instead of moving one by one?</strong>
When we see a duplicate, everything between old start and the duplicate's position would still contain the repeat. Jumping past it is safe and efficient.

<strong>Complexity:</strong> O(n) time — each character visited once by end. O(min(n, alphabet)) space for the map.

<strong>Pattern:</strong> Variable-size sliding window. Classic template: expand right, shrink left when constraint is violated. Used in many substring/subarray problems.`,
    hint: "Sliding window with a hash map. Expand the window right, shrink from left when you see a duplicate."
  },
  {
    id: "p7",
    title: "Container With Most Water",
    difficulty: "medium",
    topic: "Two Pointers",
    description: `Given n non-negative integers <code>height</code> where each represents a vertical line, find two lines that together with the x-axis form a container that holds the most water.

<strong>Example:</strong>
Input: [1, 8, 6, 2, 5, 4, 8, 3, 7]
Output: 49

The two lines at index 1 (height 8) and index 8 (height 7) form a container with area = min(8,7) * (8-1) = 49.`,
    starterJS: `function maxArea(height) {
  // Your code here

}`,
    starterPY: `def max_area(height):
    # Your code here
    pass`,
    testCases: [
      { input: [[1,8,6,2,5,4,8,3,7]], expected: 49 },
      { input: [[1,1]], expected: 1 },
      { input: [[4,3,2,1,4]], expected: 16 },
    ],
    solution: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxWater = 0;
  while (left < right) {
    const water = Math.min(height[left], height[right]) * (right - left);
    maxWater = Math.max(maxWater, water);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return maxWater;
}`,
    walkthrough: `<strong>Step 1: Brute force</strong>
Check every pair of lines — O(n²). For each pair, area = min(height[i], height[j]) * (j - i). Can we be smarter?

<strong>Step 2: Two-pointer insight</strong>
Start with the widest container (left=0, right=end). The only way to find a bigger area is to find taller lines. Moving the TALLER pointer inward can only decrease width without guaranteeing more height. So always move the SHORTER pointer inward.

<strong>Step 3: Why this is correct</strong>
When height[left] < height[right], any container using left with a closer right boundary would be both narrower AND still limited by height[left]. So left can never do better — eliminate it.

<strong>Step 4: Trace through [1, 8, 6, 2, 5, 4, 8, 3, 7]</strong>
  left=0(1), right=8(7): area=min(1,7)*8=8, move left
  left=1(8), right=8(7): area=min(8,7)*7=49, move right
  left=1(8), right=7(3): area=min(8,3)*6=18, move right
  ...max stays 49

<strong>Complexity:</strong> O(n) time, O(1) space — single pass with two pointers.

<strong>Pattern:</strong> Two-pointer converging from both ends with a greedy elimination rule. Similar logic appears in trapping rain water and other optimization problems.`,
    hint: "Two pointers from both ends. Move the shorter line inward — moving the taller one can never increase the area."
  },
  {
    id: "p8",
    title: "Group Anagrams",
    difficulty: "medium",
    topic: "Hash Maps",
    description: `Given an array of strings, group the anagrams together. You can return the answer in any order.

An anagram is a word formed by rearranging the letters of another word.

<strong>Example:</strong>
Input: ["eat","tea","tan","ate","nat","bat"]
Output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]`,
    starterJS: `function groupAnagrams(strs) {
  // Your code here

}`,
    starterPY: `def group_anagrams(strs):
    # Your code here
    pass`,
    testCases: [
      {
        input: [["eat","tea","tan","ate","nat","bat"]],
        expected: "check_anagram_groups",
        customCheck: true
      },
    ],
    solution: `function groupAnagrams(strs) {
  const map = {};
  for (const str of strs) {
    const key = str.split('').sort().join('');
    if (!map[key]) map[key] = [];
    map[key].push(str);
  }
  return Object.values(map);
}`,
    walkthrough: `<strong>Step 1: What makes two words anagrams?</strong>
They have the exact same characters, just in different order. "eat" and "tea" both have {a, e, t}. We need a way to create a CANONICAL FORM that's identical for all anagrams.

<strong>Step 2: The key insight — sorted strings</strong>
Sort each word's characters alphabetically: "eat" → "aet", "tea" → "aet", "ate" → "aet". Same key = same group! Use a hash map with sorted strings as keys.

<strong>Step 3: The algorithm</strong>
  For each string in the array:
    1. Sort its characters to create a key
    2. Add it to the hash map under that key
  Return all the map's values (the groups).

<strong>Step 4: Trace through ["eat","tea","tan","ate","nat","bat"]</strong>
  "eat" → key "aet" → map: {"aet": ["eat"]}
  "tea" → key "aet" → map: {"aet": ["eat","tea"]}
  "tan" → key "ant" → map: {"aet": ["eat","tea"], "ant": ["tan"]}
  "ate" → key "aet" → map: {"aet": ["eat","tea","ate"], "ant": ["tan"]}
  "nat" → key "ant" → map: {..., "ant": ["tan","nat"]}
  "bat" → key "abt" → map: {..., "abt": ["bat"]}

<strong>Complexity:</strong> O(n * k log k) time where n = number of strings, k = max string length (due to sorting each string). O(n * k) space.

<strong>Pattern:</strong> Hash map grouping with canonical keys. Whenever you need to group items by some equivalence, find a canonical form and use it as a hash key.`,
    hint: "Sort each string to create a key. All anagrams will have the same sorted key. Use a hash map to group them."
  },
  {
    id: "p9",
    title: "Binary Search",
    difficulty: "easy",
    topic: "Binary Search",
    description: `Given a sorted array of integers <code>nums</code> and a target value, return the index of the target if found. If not, return -1.

You must write an algorithm with O(log n) runtime complexity.

<strong>Example 1:</strong>
Input: nums = [-1, 0, 3, 5, 9, 12], target = 9
Output: 4

<strong>Example 2:</strong>
Input: nums = [-1, 0, 3, 5, 9, 12], target = 2
Output: -1`,
    starterJS: `function binarySearch(nums, target) {
  // Your code here

}`,
    starterPY: `def binary_search(nums, target):
    # Your code here
    pass`,
    testCases: [
      { input: [[-1,0,3,5,9,12], 9], expected: 4 },
      { input: [[-1,0,3,5,9,12], 2], expected: -1 },
      { input: [[5], 5], expected: 0 },
    ],
    solution: `function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    walkthrough: `<strong>Step 1: Why binary search works</strong>
The array is SORTED. That means if the middle element is too small, everything to its left is also too small — we can eliminate half the array in one step.

<strong>Step 2: The algorithm</strong>
  1. Set left=0, right=length-1
  2. While left <= right:
     - mid = floor((left+right) / 2)
     - If nums[mid] === target → found it, return mid
     - If nums[mid] < target → target is in right half, set left = mid + 1
     - If nums[mid] > target → target is in left half, set right = mid - 1
  3. If loop ends, target doesn't exist → return -1

<strong>Step 3: Trace through [-1, 0, 3, 5, 9, 12], target=9</strong>
  left=0, right=5, mid=2: nums[2]=3 < 9 → left=3
  left=3, right=5, mid=4: nums[4]=9 === 9 → return 4 ✓

<strong>Step 4: Common pitfalls</strong>
  - Use left <= right (not <) or you'll miss single-element cases
  - Use mid+1 and mid-1 (not mid) or you'll infinite loop
  - For large numbers, use left + floor((right-left)/2) to avoid overflow

<strong>Complexity:</strong> O(log n) time — halving the search space each step. O(1) space.

<strong>Pattern:</strong> Binary search — the foundation of "search space reduction." Whenever you have sorted data or a monotonic condition, think binary search.`,
    hint: "Compare the middle element with target. If smaller, search right half. If larger, search left half."
  },
  {
    id: "p10",
    title: "Merge Two Sorted Lists",
    difficulty: "easy",
    topic: "Linked Lists",
    description: `Merge two sorted arrays into one sorted array.

(Simplified from the linked list version — focus on the merge logic.)

<strong>Example:</strong>
Input: list1 = [1, 2, 4], list2 = [1, 3, 4]
Output: [1, 1, 2, 3, 4, 4]

<strong>Example 2:</strong>
Input: list1 = [], list2 = [0]
Output: [0]`,
    starterJS: `function mergeTwoLists(list1, list2) {
  // Your code here

}`,
    starterPY: `def merge_two_lists(list1, list2):
    # Your code here
    pass`,
    testCases: [
      { input: [[1,2,4], [1,3,4]], expected: [1,1,2,3,4,4] },
      { input: [[], [0]], expected: [0] },
      { input: [[], []], expected: [] },
    ],
    solution: `function mergeTwoLists(list1, list2) {
  const result = [];
  let i = 0, j = 0;
  while (i < list1.length && j < list2.length) {
    if (list1[i] <= list2[j]) result.push(list1[i++]);
    else result.push(list2[j++]);
  }
  while (i < list1.length) result.push(list1[i++]);
  while (j < list2.length) result.push(list2[j++]);
  return result;
}`,
    walkthrough: `<strong>Step 1: The merge idea</strong>
Both lists are already sorted. We just need to interleave them correctly — always pick the smaller of the two current elements.

<strong>Step 2: Two-pointer algorithm</strong>
  1. Pointer i starts at beginning of list1, pointer j at beginning of list2
  2. Compare list1[i] and list2[j] — push the smaller one to result
  3. Advance the pointer of whichever list we picked from
  4. When one list runs out, append the remainder of the other

<strong>Step 3: Trace through [1,2,4] and [1,3,4]</strong>
  i=0,j=0: 1 <= 1 → push 1, i=1.  result: [1]
  i=1,j=0: 2 > 1  → push 1, j=1.  result: [1,1]
  i=1,j=1: 2 < 3  → push 2, i=2.  result: [1,1,2]
  i=2,j=1: 4 > 3  → push 3, j=2.  result: [1,1,2,3]
  i=2,j=2: 4 <= 4 → push 4, i=3.  result: [1,1,2,3,4]
  i=3 is past end → append remaining [4]. result: [1,1,2,3,4,4]

<strong>Step 4: Why this matters</strong>
This merge operation is the core of merge sort. It also appears in merging database results — like UNION ALL with ORDER BY.

<strong>Complexity:</strong> O(n + m) time where n, m are list lengths. O(n + m) space for result.

<strong>Pattern:</strong> Two-pointer merge on sorted data. This exact technique is used in merge sort, merge K sorted lists, and merging intervals.`,
    hint: "Use two pointers, one for each list. Compare elements and push the smaller one."
  },

  // ─── More Medium ───
  {
    id: "p11",
    title: "3Sum",
    difficulty: "medium",
    topic: "Two Pointers",
    description: `Given an array <code>nums</code>, return all unique triplets [a, b, c] such that a + b + c = 0.

The solution set must not contain duplicate triplets.

<strong>Example:</strong>
Input: [-1, 0, 1, 2, -1, -4]
Output: [[-1, -1, 2], [-1, 0, 1]]`,
    starterJS: `function threeSum(nums) {
  // Your code here

}`,
    starterPY: `def three_sum(nums):
    # Your code here
    pass`,
    testCases: [
      { input: [[-1,0,1,2,-1,-4]], expected: [[-1,-1,2],[-1,0,1]] },
      { input: [[0,1,1]], expected: [] },
      { input: [[0,0,0]], expected: [[0,0,0]] },
    ],
    solution: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i-1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left+1]) left++;
        while (left < right && nums[right] === nums[right-1]) right--;
        left++; right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return result;
}`,
    walkthrough: `<strong>Step 1: Reduce to Two Sum</strong>
3Sum asks: find a + b + c = 0. Fix one element a = nums[i], then find b + c = -a in the rest. That's Two Sum! But we need ALL unique triplets, not just one pair.

<strong>Step 2: Sort + Two Pointers</strong>
Sort the array first. For each nums[i], use two pointers (left, right) on the remaining subarray to find pairs summing to -nums[i]. Sorting lets us skip duplicates easily.

<strong>Step 3: Handling duplicates</strong>
  - Skip duplicate values of nums[i]: if nums[i] === nums[i-1], continue
  - After finding a triplet, skip duplicate left and right values before moving pointers

<strong>Step 4: Trace through [-1, 0, 1, 2, -1, -4]</strong>
  Sorted: [-4, -1, -1, 0, 1, 2]
  i=0, nums[i]=-4: left=1,right=5. Sum=-4+(-1)+2=-3 < 0, move left... no triplet found
  i=1, nums[i]=-1: left=2,right=5. Sum=-1+(-1)+2=0 ✓ → [-1,-1,2]
    skip dups, left=3,right=4. Sum=-1+0+1=0 ✓ → [-1,0,1]
  i=2, nums[i]=-1: same as i=1, skip!

<strong>Complexity:</strong> O(n²) time — O(n log n) sort + O(n) for each of n elements. O(1) extra space (excluding output).

<strong>Pattern:</strong> "Fix one, solve the rest" — reduces an n-element problem to (n-1)-element subproblem. Combined with sort + two pointers, this handles many k-Sum variants.`,
    hint: "Sort first. Fix one element, then use two pointers on the remaining array. Skip duplicates."
  },
  {
    id: "p12",
    title: "Number of Islands",
    difficulty: "medium",
    topic: "Graphs",
    description: `Given a 2D grid of '1's (land) and '0's (water), count the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

<strong>Example:</strong>
Input: [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3`,
    starterJS: `function numIslands(grid) {
  // Your code here

}`,
    starterPY: `def num_islands(grid):
    # Your code here
    pass`,
    testCases: [
      {
        input: [[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]],
        expected: 1
      },
      {
        input: [[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]],
        expected: 3
      },
    ],
    solution: `function numIslands(grid) {
  let count = 0;
  function dfs(i, j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') return;
    grid[i][j] = '0';
    dfs(i+1, j); dfs(i-1, j); dfs(i, j+1); dfs(i, j-1);
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') { count++; dfs(i, j); }
    }
  }
  return count;
}`,
    walkthrough: `<strong>Step 1: Think of it as a graph</strong>
Each '1' cell is a node. Two adjacent '1' cells (up/down/left/right) are connected by an edge. An island = a connected component. We need to count connected components.

<strong>Step 2: DFS flood-fill algorithm</strong>
  1. Scan every cell in the grid
  2. When you find a '1': increment island count, then DFS/BFS to "sink" the entire island (mark all connected '1's as '0')
  3. This ensures we don't double-count any island

<strong>Step 3: Trace through the example</strong>
  Grid:  1 1 0 0 0     Find '1' at (0,0) → count=1
         1 1 0 0 0     DFS sinks all connected 1's in top-left block
         0 0 1 0 0     Continue scanning... find '1' at (2,2) → count=2
         0 0 0 1 1     Continue... find '1' at (3,3) → count=3. Done!

<strong>Step 4: The DFS helper</strong>
  Base case: out of bounds OR cell is '0' → return
  Mark cell as '0' (visited), then recurse in all 4 directions.
  No separate visited set needed — we modify the grid itself.

<strong>Complexity:</strong> O(rows * cols) time — visit each cell at most once. O(rows * cols) space worst case for DFS call stack.

<strong>Pattern:</strong> Graph traversal (DFS/BFS) on a grid. Grids ARE graphs — each cell is a node with up to 4 neighbors. This flood-fill pattern appears in many matrix problems.`,
    hint: "DFS/BFS: when you find a '1', increment count and flood-fill all connected '1's to '0'."
  },

  // ─── Hard ───
  {
    id: "p13",
    title: "Climbing Stairs (DP)",
    difficulty: "easy",
    topic: "Dynamic Programming",
    description: `You are climbing a staircase. It takes <code>n</code> steps to reach the top.

Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?

<strong>Example 1:</strong> Input: n = 2 → Output: 2 (1+1 or 2)
<strong>Example 2:</strong> Input: n = 3 → Output: 3 (1+1+1, 1+2, 2+1)
<strong>Example 3:</strong> Input: n = 5 → Output: 8`,
    starterJS: `function climbStairs(n) {
  // Your code here

}`,
    starterPY: `def climb_stairs(n):
    # Your code here
    pass`,
    testCases: [
      { input: [2], expected: 2 },
      { input: [3], expected: 3 },
      { input: [5], expected: 8 },
      { input: [10], expected: 89 },
    ],
    solution: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}`,
    walkthrough: `<strong>Step 1: Think recursively</strong>
To reach step n, you came from step n-1 (took 1 step) or step n-2 (took 2 steps). So ways(n) = ways(n-1) + ways(n-2). That's the Fibonacci recurrence!

<strong>Step 2: Base cases</strong>
  ways(1) = 1 (just take one step)
  ways(2) = 2 (1+1 or 2)

<strong>Step 3: Trace for n=5</strong>
  ways(1) = 1
  ways(2) = 2
  ways(3) = ways(2) + ways(1) = 2 + 1 = 3
  ways(4) = ways(3) + ways(2) = 3 + 2 = 5
  ways(5) = ways(4) + ways(3) = 5 + 3 = 8 ✓

<strong>Step 4: Optimize space</strong>
Naive recursion is O(2^n) — terrible! DP with an array is O(n) time, O(n) space. But we only need the last TWO values, so use two variables: O(n) time, O(1) space.

<strong>Step 5: The optimized code</strong>
  prev2=1, prev1=2 (base cases)
  Loop from 3 to n: curr = prev1 + prev2, shift variables forward.

<strong>Complexity:</strong> O(n) time, O(1) space with the two-variable approach.

<strong>Pattern:</strong> 1D Dynamic Programming with space optimization. This "only keep last K states" trick works whenever dp[i] depends on a fixed number of previous states. Foundation for all DP problems.`,
    hint: "This is the Fibonacci sequence! dp[n] = dp[n-1] + dp[n-2]. You can optimize to O(1) space."
  },
  {
    id: "p14",
    title: "Coin Change",
    difficulty: "medium",
    topic: "Dynamic Programming",
    description: `Given an array of coin denominations and a total <code>amount</code>, return the fewest number of coins needed to make up that amount. Return -1 if it's impossible.

<strong>Example 1:</strong>
Input: coins = [1, 5, 10, 25], amount = 30
Output: 2 (25 + 5)

<strong>Example 2:</strong>
Input: coins = [2], amount = 3
Output: -1

<strong>Example 3:</strong>
Input: coins = [1], amount = 0
Output: 0`,
    starterJS: `function coinChange(coins, amount) {
  // Your code here

}`,
    starterPY: `def coin_change(coins, amount):
    # Your code here
    pass`,
    testCases: [
      { input: [[1,5,10,25], 30], expected: 2 },
      { input: [[2], 3], expected: -1 },
      { input: [[1], 0], expected: 0 },
      { input: [[1,2,5], 11], expected: 3 },
    ],
    solution: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    walkthrough: `<strong>Step 1: Why greedy fails</strong>
You might think "always pick the largest coin" works. But with coins [1, 3, 4] and amount 6: greedy gives 4+1+1=3 coins, but optimal is 3+3=2 coins. We need DP.

<strong>Step 2: Define the subproblem</strong>
dp[i] = minimum coins needed to make amount i. We build up from dp[0]=0 to dp[amount].

<strong>Step 3: The recurrence</strong>
For each amount i, try every coin c where c <= i:
  dp[i] = min(dp[i], dp[i - c] + 1)
"If I use coin c, I need 1 + however many coins it takes to make (i - c)."

<strong>Step 4: Trace with coins=[1,5,10,25], amount=30</strong>
  dp[0]=0
  dp[1]=1 (1 coin of 1)
  dp[5]=1 (1 coin of 5)
  dp[10]=1 (1 coin of 10)
  dp[25]=1 (1 coin of 25)
  dp[30]: try coin 1→dp[29]+1=6, coin 5→dp[25]+1=2, coin 10→dp[20]+1=3, coin 25→dp[5]+1=2
  dp[30] = 2 ✓ (25 + 5)

<strong>Step 5: Handle impossible cases</strong>
Initialize dp array with Infinity. If dp[amount] is still Infinity at the end, return -1.

<strong>Complexity:</strong> O(amount * coins.length) time. O(amount) space for the dp array.

<strong>Pattern:</strong> Unbounded knapsack DP. Build solutions to small subproblems, combine them for larger ones. Classic bottom-up DP with an inner loop over choices.`,
    hint: "DP: dp[i] = min coins to make amount i. For each amount, try each coin: dp[i] = min(dp[i], dp[i-coin] + 1)."
  },
  {
    id: "p15",
    title: "Trapping Rain Water",
    difficulty: "hard",
    topic: "Two Pointers",
    description: `Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

<strong>Example:</strong>
Input: [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6

Visualize bars of different heights — water fills in between the taller bars.`,
    starterJS: `function trap(height) {
  // Your code here

}`,
    starterPY: `def trap(height):
    # Your code here
    pass`,
    testCases: [
      { input: [[0,1,0,2,1,0,1,3,2,1,2,1]], expected: 6 },
      { input: [[4,2,0,3,2,5]], expected: 9 },
      { input: [[1,0,1]], expected: 1 },
    ],
    solution: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}`,
    walkthrough: `<strong>Step 1: Water at each position</strong>
Water trapped above position i = min(maxHeight to its left, maxHeight to its right) - height[i]. The shorter boundary determines the water level.

<strong>Step 2: Brute force → optimization</strong>
Brute force: for each i, scan left and right to find max heights — O(n²). We can precompute leftMax[] and rightMax[] arrays for O(n), or use two pointers for O(1) space.

<strong>Step 3: Two-pointer insight</strong>
Use left and right pointers with leftMax and rightMax. Key insight: if height[left] < height[right], the water at left is bounded by leftMax (because rightMax is at least height[right] which is >= height[left]). So we can safely compute water at left.

<strong>Step 4: Trace through [0,1,0,2,1,0,1,3,2,1,2,1]</strong>
  left=0(0), right=11(1): h[left]<h[right], leftMax=0, water+=0-0=0, left++
  left=1(1), right=11(1): h[left]>=h[right], rightMax=1, water+=1-1=0, right--
  left=1(1), right=10(2): h[left]<h[right], leftMax=1, water+=1-1=0, left++
  left=2(0), right=10(2): h[left]<h[right], leftMax=1, water+=1-0=1, left++
  ...continues, accumulating water=6 total

<strong>Step 5: The algorithm in words</strong>
  Move the pointer with the smaller height. Update its running max. Add (max - height) to water. Repeat until pointers meet.

<strong>Complexity:</strong> O(n) time, O(1) space — single pass with two pointers.

<strong>Pattern:</strong> Two-pointer with running state. This is a HARD problem that combines the two-pointer framework with the insight about water levels being determined by the minimum boundary.`,
    hint: "Two pointers from ends. Water at each position = min(leftMax, rightMax) - height[i]. Move the shorter side inward."
  },
  {
    id: "p16",
    title: "LRU Cache",
    difficulty: "hard",
    topic: "Hash Maps",
    description: `Design a data structure that follows the Least Recently Used (LRU) cache constraints.

Implement with these operations:
- <code>get(key)</code>: Return the value if the key exists, otherwise return -1.
- <code>put(key, value)</code>: Update or insert. If capacity is exceeded, evict the least recently used key.

Both operations must run in O(1) time.

<strong>Example:</strong>
cache = LRUCache(2)  // capacity 2
cache.put(1, 1)
cache.put(2, 2)
cache.get(1)    → 1
cache.put(3, 3) → evicts key 2
cache.get(2)    → -1 (evicted)`,
    starterJS: `class LRUCache {
  constructor(capacity) {
    // Your code here
  }

  get(key) {
    // Your code here
  }

  put(key, value) {
    // Your code here
  }
}`,
    starterPY: `class LRUCache:
    def __init__(self, capacity):
        # Your code here
        pass

    def get(self, key):
        # Your code here
        pass

    def put(self, key, value):
        # Your code here
        pass`,
    testCases: [
      { input: "lru_test", expected: "lru_pass", customCheck: true },
    ],
    solution: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }
  put(key, value) {
    this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}`,
    walkthrough: `<strong>Step 1: The two requirements</strong>
We need O(1) get and O(1) put. A hash map gives O(1) lookup. But we also need to track ORDERING (least recently used) and update it on every access.

<strong>Step 2: The classic approach</strong>
Combine a hash map (for O(1) key lookup) with an ordered structure (to track recency). In interviews, you'd use a doubly linked list. In JS, Map already maintains insertion order!

<strong>Step 3: JavaScript Map trick</strong>
  - get(key): delete the key and re-set it → moves it to the "end" (most recent)
  - put(key, value): delete (if exists), then set. If over capacity, delete the FIRST key (least recent)
  - map.keys().next().value gives the oldest (least recently used) key

<strong>Step 4: Trace through the example</strong>
  put(1,1) → Map: {1:1}
  put(2,2) → Map: {1:1, 2:2}
  get(1)   → delete 1, re-set → Map: {2:2, 1:1}. Return 1
  put(3,3) → Map: {2:2, 1:1, 3:3}. Size 3 > capacity 2 → evict first key (2)
             Map: {1:1, 3:3}
  get(2)   → not found → return -1

<strong>Step 5: In a real interview</strong>
They may ask you to implement WITHOUT Map's ordering — use a doubly linked list + hash map. The list maintains order; the map provides O(1) node access.

<strong>Complexity:</strong> O(1) for both get and put. O(capacity) space.

<strong>Pattern:</strong> Hash map + ordering structure. This data structure design pattern appears in many caching and "recent items" problems. A classic system design building block.`,
    hint: "Use a Map (which maintains insertion order in JS). On access, delete and re-insert to move to end. Evict the first key when over capacity."
  },
];

// ============================================================
// RESOURCES DATA
// ============================================================

const RESOURCES = [
  {
    phase: "Phase 1: Foundations (Weeks 1-2)",
    items: [
      { name: "JavaScript.info", url: "https://javascript.info", description: "The most comprehensive free JS tutorial — covers everything from basics to advanced.", type: "Tutorial" },
      { name: "Python for Everybody", url: "https://www.py4e.com", description: "Free Python course by Dr. Chuck. Great if you prefer Python.", type: "Course" },
      { name: "CS50 by Harvard", url: "https://cs50.harvard.edu/x", description: "The gold standard intro CS course. Covers C, Python, SQL, web dev.", type: "Course" },
      { name: "Visualgo", url: "https://visualgo.net", description: "Visualize data structures and algorithms. Amazing for learning.", type: "Tool" },
    ]
  },
  {
    phase: "Phase 2: Data Structures & Algorithms (Weeks 2-4)",
    items: [
      { name: "NeetCode 150", url: "https://neetcode.io", description: "Curated list of 150 LeetCode problems organized by pattern. THE interview prep list.", type: "Practice" },
      { name: "LeetCode", url: "https://leetcode.com", description: "The standard platform for coding interview practice.", type: "Practice" },
      { name: "Abdul Bari's Algorithms", url: "https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O", description: "Best YouTube playlist for algorithms. Clear visual explanations.", type: "Video" },
      { name: "Big O Cheat Sheet", url: "https://www.bigocheatsheet.com", description: "Quick reference for time/space complexity of common operations.", type: "Reference" },
    ]
  },
  {
    phase: "Phase 3: Web Development (Weeks 5-6)",
    items: [
      { name: "The Odin Project", url: "https://www.theodinproject.com", description: "Free full-stack curriculum. Hands-on projects, real-world skills.", type: "Course" },
      { name: "MDN Web Docs", url: "https://developer.mozilla.org", description: "The definitive reference for HTML, CSS, and JavaScript.", type: "Reference" },
      { name: "freeCodeCamp", url: "https://www.freecodecamp.org", description: "Free certifications in web dev, APIs, and more. Great projects.", type: "Course" },
      { name: "Git Branching Game", url: "https://learngitbranching.js.org", description: "Interactive game to learn Git branching. Visual and fun.", type: "Tool" },
    ]
  },
  {
    phase: "Phase 4: Advanced & Interview Prep (Weeks 7-8)",
    items: [
      { name: "React Official Tutorial", url: "https://react.dev/learn", description: "The official React tutorial. Updated for modern React with hooks.", type: "Tutorial" },
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", description: "Comprehensive system design study guide. Free on GitHub.", type: "Reference" },
      { name: "Pramp", url: "https://www.pramp.com", description: "Free mock interviews with real people. Practice coding + communication.", type: "Practice" },
      { name: "Tech Interview Handbook", url: "https://www.techinterviewhandbook.org", description: "Resume tips, behavioral prep, and salary negotiation guide.", type: "Reference" },
    ]
  }
];

// ============================================================
// SKILL CATEGORIES for progress tracking
// ============================================================

const SKILL_CATEGORIES = [
  { id: "fundamentals", name: "Programming Fundamentals", topicIds: ["w1t1","w1t2","w1t3","w1t4","w1t5"] },
  { id: "data-structures", name: "Data Structures", topicIds: ["w2t1","w2t2","w2t3","w2t4","w2t5","w4t1","w4t2","w4t3","w4t4","w4t5"] },
  { id: "algorithms", name: "Algorithms", topicIds: ["w3t1","w3t2","w3t3","w3t4","w3t5","w8t1"] },
  { id: "web-dev", name: "Web Development", topicIds: ["w5t1","w5t2","w5t3","w5t4","w5t5"] },
  { id: "backend", name: "Backend & Databases", topicIds: ["w6t1","w6t2","w6t3","w6t4","w6t5"] },
  { id: "frontend", name: "Frontend & System Design", topicIds: ["w7t1","w7t2","w7t3","w7t4","w7t5"] },
  { id: "career", name: "Interview & Career", topicIds: ["w8t2","w8t3","w8t4","w8t5"] },
];
