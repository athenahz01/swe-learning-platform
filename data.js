// ============================================================
// FULL 10-WEEK ROADMAP DATA — 2026 Edition
// Restructured: DSA-heavy, Python-first, Java+JS support
// For someone with SQL background + vibe coding experience
// ============================================================

const ROADMAP = [
  // ─────────── WEEK 1: Python Foundations ───────────
  {
    week: 1,
    title: "Python Foundations & Core CS",
    description: "Python is the #1 interview language in 2026. Master it properly — understand WHY things work, not just THAT they work.",
    color: "#3572A5",
    topics: [
      {
        id: "w1t1",
        title: "How Computers Actually Run Code",
        category: "Fundamentals",
        detail: "Understand compilation vs interpretation, how memory works (stack vs heap), and what happens when you run a program.",
        keyPoints: [
          "CPU, RAM, and storage — what lives where",
          "Compiled (C, Go, Rust) vs interpreted (Python, JS) vs JIT-compiled (Java) languages",
          "Stack memory vs heap memory",
          "What a runtime environment is (CPython, JVM, Node.js)",
          "Why Python is the #1 interview language: concise, readable, powerful stdlib"
        ],
        practice: "Write a program in Python that deliberately causes a RecursionError (stack overflow). Explain why it happened."
      },
      {
        id: "w1t2",
        title: "Python: Variables, Types & Data Model",
        category: "Fundamentals",
        detail: "Go beyond x = 5. Understand Python's object model, mutability, and type system — the foundation for writing correct code.",
        keyPoints: [
          "Everything is an object in Python (even int, str, functions)",
          "Mutable (list, dict, set) vs immutable (int, str, tuple, frozenset)",
          "id(), type(), isinstance() — introspecting objects",
          "Name binding vs variable assignment (Python has no 'variables' in the C sense)",
          "Type hints (PEP 484) — modern Python uses them everywhere"
        ],
        practice: "Predict the output of 10 tricky Python identity/equality examples (is vs ==) without running them."
      },
      {
        id: "w1t3",
        title: "Control Flow & Pythonic Patterns",
        category: "Fundamentals",
        detail: "Master conditionals, loops, and the Pythonic way of writing clean, readable code.",
        keyPoints: [
          "if/elif/else, match-case (Python 3.10+)",
          "for loops, while loops, for...else (unique to Python!)",
          "List comprehensions, dict comprehensions, generator expressions",
          "Truthiness: None, 0, '', [], {}, set() are all falsy",
          "Walrus operator (:=), ternary expressions, unpacking"
        ],
        practice: "Implement FizzBuzz 3 different ways: basic loop, list comprehension, and using match-case."
      },
      {
        id: "w1t4",
        title: "Functions, Closures & Decorators",
        category: "Fundamentals",
        detail: "Functions are the most important abstraction in programming. Python's functional features are powerful interview tools.",
        keyPoints: [
          "def, lambda, *args, **kwargs, default parameters",
          "First-class functions: passing functions as arguments",
          "Closures: functions that capture their enclosing scope",
          "Decorators: @functools.wraps, @staticmethod, @classmethod",
          "Built-in higher-order functions: map(), filter(), sorted(key=), functools.reduce()"
        ],
        practice: "Build your own implementations of map, filter, and reduce from scratch in Python."
      },
      {
        id: "w1t5",
        title: "Python Collections & String Mastery",
        category: "Fundamentals",
        detail: "You'll use strings, lists, dicts, and sets in virtually every coding interview. Know them cold.",
        keyPoints: [
          "Strings: slicing, f-strings, split/join, .isalnum(), .lower(), immutability",
          "Lists: append, pop, insert, slicing, sorted() vs .sort()",
          "Dicts: .get(), .setdefault(), defaultdict, Counter, OrderedDict",
          "Sets: union, intersection, difference — O(1) membership testing",
          "collections module: deque, Counter, defaultdict, namedtuple"
        ],
        practice: "Reverse a string, check palindromes, remove duplicates from a list — all without built-in shortcuts."
      }
    ]
  },

  // ─────────── WEEK 2: Data Structures I ───────────
  {
    week: 2,
    title: "Data Structures I — Linear Structures",
    description: "The fundamental data structures that underpin all software. Since you know SQL tables, think of these as different ways to organize data in memory.",
    color: "#8b5cf6",
    topics: [
      {
        id: "w2t1",
        title: "Arrays & Dynamic Arrays",
        category: "Data Structures",
        detail: "Understand how arrays actually work in memory, time complexity of operations, and when to use them. Python lists ARE dynamic arrays.",
        keyPoints: [
          "Contiguous memory allocation — why O(1) random access works",
          "Python list = dynamic array (amortized O(1) append, O(n) insert)",
          "Java ArrayList vs arrays — know both",
          "2D arrays (matrices) — row-major vs column-major",
          "When arrays beat other structures: cache locality, random access"
        ],
        practice: "Implement a dynamic array class (in Python and Java) with push, pop, get, set, and resize."
      },
      {
        id: "w2t2",
        title: "Linked Lists",
        category: "Data Structures",
        detail: "Your first non-trivial data structure. Linked lists teach pointer manipulation — crucial for interviews.",
        keyPoints: [
          "Singly vs doubly linked lists — node = (val, next)",
          "Insertion, deletion, traversal — all O(1) at head",
          "Python implementation: class ListNode with self.val, self.next",
          "Java implementation: class ListNode with val, next fields",
          "Runner (fast/slow pointer) technique — cycle detection, middle node"
        ],
        practice: "Implement a linked list in Python. Then: reverse it, detect a cycle, find the middle node."
      },
      {
        id: "w2t3",
        title: "Stacks",
        category: "Data Structures",
        detail: "LIFO structure — used everywhere from function calls to undo buttons to parsing expressions.",
        keyPoints: [
          "Last In, First Out (LIFO) principle — push, pop, peek all O(1)",
          "Python: use a list as a stack (append/pop) or collections.deque",
          "Java: use ArrayDeque (NOT Stack class — it's legacy)",
          "The call stack and recursion — why stack overflow happens",
          "Applications: parentheses matching, expression evaluation, monotonic stack"
        ],
        practice: "Implement a stack. Use it to check balanced parentheses: ({[]}) vs ({[)}"
      },
      {
        id: "w2t4",
        title: "Queues & Deques",
        category: "Data Structures",
        detail: "FIFO structure — used in BFS, task scheduling, and message processing.",
        keyPoints: [
          "First In, First Out (FIFO) — enqueue, dequeue operations",
          "Python: collections.deque (pronounced 'deck') — O(1) on both ends",
          "Java: LinkedList or ArrayDeque implementing Queue interface",
          "Circular queue implementation and when you'd need one",
          "Priority queues (preview for Week 4): heapq in Python, PriorityQueue in Java"
        ],
        practice: "Implement a queue using two stacks (classic interview question). Implement a circular buffer."
      },
      {
        id: "w2t5",
        title: "Hash Tables (Maps & Sets)",
        category: "Data Structures",
        detail: "The most important data structure for coding interviews. You use WHERE clauses in SQL — hash tables are the in-memory equivalent.",
        keyPoints: [
          "Hash functions and how they work — hash(key) → index",
          "Collision resolution: chaining vs open addressing",
          "O(1) average lookup, insert, delete — O(n) worst case",
          "Python: dict, set, defaultdict, Counter — all hash-based",
          "Java: HashMap, HashSet, LinkedHashMap — know the APIs"
        ],
        practice: "Implement a hash map from scratch in Python. Use it to solve Two Sum."
      }
    ]
  },

  // ─────────── WEEK 3: Algorithms I ───────────
  {
    week: 3,
    title: "Algorithms I — Complexity, Sorting & Searching",
    description: "Learn Big O notation and classic algorithms. This is the language of technical interviews — you MUST be fluent.",
    color: "#a855f7",
    topics: [
      {
        id: "w3t1",
        title: "Big O Notation & Complexity Analysis",
        category: "Algorithms",
        detail: "The framework for evaluating code efficiency. Interviewers will ask you to analyze every solution you write.",
        keyPoints: [
          "Time complexity: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ), O(n!)",
          "Space complexity: auxiliary vs total space",
          "Best case, average case, worst case — focus on worst case",
          "How to analyze nested loops, recursive calls, and hash map usage",
          "Amortized analysis: why Python list.append() is O(1) amortized"
        ],
        practice: "Analyze the time and space complexity of 10 code snippets. Then optimize an O(n²) solution to O(n)."
      },
      {
        id: "w3t2",
        title: "Binary Search",
        category: "Algorithms",
        detail: "The most fundamental search algorithm. If data is sorted, binary search is usually the answer.",
        keyPoints: [
          "O(log n) search on sorted data — halving the search space each time",
          "Iterative vs recursive implementation (prefer iterative in interviews)",
          "Python: bisect module (bisect_left, bisect_right, insort)",
          "Finding boundaries: first occurrence, last occurrence, insertion point",
          "Binary search on answer: search over a range of possible answers"
        ],
        practice: "Implement binary search in Python and Java. Solve: search rotated sorted array, find peak element."
      },
      {
        id: "w3t3",
        title: "Sorting Algorithms",
        category: "Algorithms",
        detail: "Know how sorting works under the hood. Interviewers love asking about sorting trade-offs.",
        keyPoints: [
          "Bubble sort, selection sort, insertion sort — O(n²), know them conceptually",
          "Merge sort: divide & conquer, O(n log n), stable, O(n) space",
          "Quick sort: partitioning, O(n log n) average, in-place, O(n²) worst case",
          "Python: sorted() uses Timsort (hybrid merge+insertion), Java: Arrays.sort() uses dual-pivot quicksort",
          "Custom comparators: Python key=lambda, Java Comparator.comparing()"
        ],
        practice: "Implement merge sort and quick sort from scratch in Python. Sort an array of objects by multiple keys."
      },
      {
        id: "w3t4",
        title: "Recursion & Backtracking",
        category: "Algorithms",
        detail: "Recursion is hard at first but essential. Think of it as SQL subqueries — a query that calls itself.",
        keyPoints: [
          "Base case and recursive case — always define the base case first",
          "The call stack and stack frames — why recursion uses memory",
          "Recursion vs iteration trade-offs — Python has a recursion limit (~1000)",
          "Backtracking pattern: choose → explore → unchoose",
          "Memoization preview: caching recursive results"
        ],
        practice: "Solve: generate all permutations, N-Queens (simplified), and generate all valid parentheses combinations."
      },
      {
        id: "w3t5",
        title: "Two Pointers & Sliding Window",
        category: "Algorithms",
        detail: "Two of the most common interview patterns. Master these and you'll crack 30% of medium problems.",
        keyPoints: [
          "Two pointers: start/end converging, fast/slow, same-direction",
          "Sliding window: fixed size and variable size windows",
          "When to use each pattern — recognizing the signals",
          "Classic problems: container with most water, longest substring without repeating chars",
          "Optimizing brute force O(n²) to O(n) with these patterns"
        ],
        practice: "Solve 5 two-pointer and 5 sliding-window problems on LeetCode."
      }
    ]
  },

  // ─────────── WEEK 4: Data Structures II ───────────
  {
    week: 4,
    title: "Data Structures II — Trees, Heaps & Graphs",
    description: "Non-linear data structures. Trees are everywhere (DOM, file systems, databases). Graphs model relationships and networks.",
    color: "#c026d3",
    topics: [
      {
        id: "w4t1",
        title: "Binary Trees & BSTs",
        category: "Data Structures",
        detail: "Trees are the most common interview topic after arrays. Practice traversals until they're automatic.",
        keyPoints: [
          "Tree terminology: root, leaf, height, depth, level",
          "Traversals: inorder (L-N-R), preorder (N-L-R), postorder (L-R-N) — recursive & iterative",
          "Level-order traversal (BFS with queue) — Python: collections.deque",
          "BST property: left < node < right — O(log n) search in balanced trees",
          "Python: class TreeNode with self.val, self.left, self.right"
        ],
        practice: "Implement all 4 traversals. Solve: max depth, invert tree, validate BST, lowest common ancestor."
      },
      {
        id: "w4t2",
        title: "Heaps & Priority Queues",
        category: "Data Structures",
        detail: "When you need the min or max efficiently. Used in scheduling, graph algorithms, and 'top K' problems.",
        keyPoints: [
          "Min-heap and max-heap properties — complete binary tree stored as array",
          "Python: heapq module (min-heap only — negate values for max-heap)",
          "Java: PriorityQueue class (min-heap by default, pass Comparator for max)",
          "Insert (bubble up) and extract (bubble down) — both O(log n)",
          "Top K pattern: maintain a heap of size K for O(n log K) solutions"
        ],
        practice: "Implement a min-heap from scratch. Solve: Kth largest element, merge K sorted lists, top K frequent elements."
      },
      {
        id: "w4t3",
        title: "Graphs — Representation & Traversal",
        category: "Data Structures",
        detail: "Graphs model networks, relationships, dependencies. Your SQL JOINs already represent graph-like queries.",
        keyPoints: [
          "Vertices and edges, directed vs undirected, weighted vs unweighted",
          "Adjacency list (most common) vs adjacency matrix — Python: defaultdict(list)",
          "BFS: level-by-level using collections.deque — finds shortest unweighted paths",
          "DFS: deep exploration using recursion or explicit stack",
          "Visited set to avoid cycles — O(V + E) time complexity"
        ],
        practice: "Implement BFS and DFS. Solve: number of islands, clone graph, course schedule (topological sort)."
      },
      {
        id: "w4t4",
        title: "Tries (Prefix Trees)",
        category: "Data Structures",
        detail: "Specialized tree for string operations. Common in autocomplete, spell-check, and word search problems.",
        keyPoints: [
          "Each node represents a character, paths form words",
          "Insert, search, startsWith operations — all O(m) where m = word length",
          "Python implementation: dict of dicts or dedicated TrieNode class",
          "Space optimization: compressed tries (radix trees)",
          "Applications: autocomplete, IP routing, word break problems"
        ],
        practice: "Implement a Trie with insert, search, and startsWith. Solve: word search II."
      },
      {
        id: "w4t5",
        title: "Union Find (Disjoint Set)",
        category: "Data Structures",
        detail: "Tracks connected components efficiently. Essential for graph connectivity and Kruskal's algorithm.",
        keyPoints: [
          "find(x): which set does x belong to? (with path compression)",
          "union(x, y): merge two sets (with union by rank)",
          "Near O(1) amortized time for both operations",
          "Applications: connected components, cycle detection, Kruskal's MST",
          "Python implementation: parent[] array with path compression"
        ],
        practice: "Implement Union Find. Solve: number of provinces, redundant connection, accounts merge."
      }
    ]
  },

  // ─────────── WEEK 5: Algorithms II ───────────
  {
    week: 5,
    title: "Algorithms II — DP, Greedy & Graph Algorithms",
    description: "The advanced algorithm patterns that separate good candidates from great ones. DP alone accounts for ~20% of interview questions.",
    color: "#dc2626",
    topics: [
      {
        id: "w5t1",
        title: "Dynamic Programming — 1D",
        category: "Algorithms",
        detail: "The most feared interview topic. Break it down: it's just recursion + memoization + optimization.",
        keyPoints: [
          "Overlapping subproblems and optimal substructure — the two DP signals",
          "Top-down (memoization with @lru_cache) vs bottom-up (tabulation with array)",
          "1D DP patterns: climbing stairs, house robber, coin change, longest increasing subsequence",
          "State definition: what does dp[i] represent? This is the key insight.",
          "Python: @functools.lru_cache(None) makes memoization trivial"
        ],
        practice: "Solve 8 1D DP problems: climbing stairs, house robber, coin change, word break, decode ways, LIS, max product subarray, partition equal subset."
      },
      {
        id: "w5t2",
        title: "Dynamic Programming — 2D & Patterns",
        category: "Algorithms",
        detail: "2D DP problems are harder but follow recognizable patterns. Learn to identify them.",
        keyPoints: [
          "2D DP: dp[i][j] — two dimensions of state",
          "Classic patterns: unique paths, longest common subsequence, edit distance",
          "Knapsack problems: 0/1 knapsack, unbounded knapsack, partition",
          "String DP: palindrome subsequences, interleaving strings",
          "Space optimization: rolling array technique (reduce O(mn) to O(n) space)"
        ],
        practice: "Solve 6 2D DP problems: unique paths, LCS, edit distance, 0/1 knapsack, longest palindromic subsequence, min path sum."
      },
      {
        id: "w5t3",
        title: "Greedy Algorithms",
        category: "Algorithms",
        detail: "When making the locally optimal choice leads to the globally optimal solution. Faster than DP when applicable.",
        keyPoints: [
          "Greedy choice property — why greedy works (when it does)",
          "Common patterns: interval scheduling, activity selection, jump game",
          "Sorting + greedy: often the key insight is to sort first",
          "How to prove a greedy approach is correct (exchange argument)",
          "When greedy fails: coin change with arbitrary denominations → use DP instead"
        ],
        practice: "Solve: jump game I & II, meeting rooms II, task scheduler, gas station, partition labels."
      },
      {
        id: "w5t4",
        title: "Shortest Path Algorithms",
        category: "Algorithms",
        detail: "Graph algorithms that appear in interviews and real-world systems (GPS, network routing).",
        keyPoints: [
          "Dijkstra's algorithm: weighted graphs, non-negative edges, O((V+E) log V) with heap",
          "Python: heapq with (distance, node) tuples",
          "Bellman-Ford: handles negative edges, O(VE)",
          "Topological sort: DAG ordering using DFS or Kahn's algorithm (BFS)",
          "When to use which: BFS (unweighted) vs Dijkstra (weighted) vs Bellman-Ford (negative)"
        ],
        practice: "Implement Dijkstra's in Python. Solve: network delay time, cheapest flights within K stops, course schedule II."
      },
      {
        id: "w5t5",
        title: "Advanced Patterns: Intervals, Bit Manipulation & Math",
        category: "Algorithms",
        detail: "Miscellaneous patterns that round out your interview toolkit.",
        keyPoints: [
          "Interval problems: merge intervals, insert interval, non-overlapping intervals",
          "Bit manipulation: AND, OR, XOR, shifts — single number, counting bits, power of 2",
          "Math problems: GCD, prime checking, modular arithmetic",
          "Prefix sums: range sum queries in O(1) after O(n) preprocessing",
          "Monotonic stack/queue: next greater element, daily temperatures"
        ],
        practice: "Solve: merge intervals, single number, daily temperatures, subarray sum equals K (prefix sum)."
      }
    ]
  },

  // ─────────── WEEK 6: Java & OOP ───────────
  {
    week: 6,
    title: "Java & Object-Oriented Programming",
    description: "Java is the #2 interview language and dominates enterprise, finance, and Android. Learn Java through the lens of what you already know in Python.",
    color: "#f89820",
    topics: [
      {
        id: "w6t1",
        title: "Java Fundamentals — Python → Java",
        category: "Java",
        detail: "You already know programming. This is a translation layer — learn Java syntax through Python comparisons.",
        keyPoints: [
          "Static typing: int x = 5; vs Python's x = 5 — types are explicit",
          "public static void main(String[] args) — the entry point",
          "Primitives (int, double, boolean, char) vs Objects (Integer, String, List)",
          "Arrays: int[] arr = new int[10]; vs Python lists",
          "Control flow: same logic, different syntax (braces, semicolons, type declarations)"
        ],
        practice: "Rewrite 5 Python solutions in Java: Two Sum, reverse string, valid parentheses, binary search, merge sort."
      },
      {
        id: "w6t2",
        title: "Java Collections Framework",
        category: "Java",
        detail: "Java's stdlib for data structures. This is what you'll use in every Java interview.",
        keyPoints: [
          "List: ArrayList (dynamic array), LinkedList — List<Integer> list = new ArrayList<>()",
          "Map: HashMap, TreeMap, LinkedHashMap — Map<String, Integer> map = new HashMap<>()",
          "Set: HashSet, TreeSet — Set<Integer> seen = new HashSet<>()",
          "Queue: ArrayDeque, PriorityQueue — Queue<Integer> q = new ArrayDeque<>()",
          "Iterating: for-each, .stream(), .forEach() — modern Java idioms"
        ],
        practice: "Solve 5 LeetCode problems in Java using Collections: group anagrams (HashMap), top K frequent (PriorityQueue), BFS (ArrayDeque)."
      },
      {
        id: "w6t3",
        title: "OOP Principles — Classes, Inheritance, Polymorphism",
        category: "Java",
        detail: "OOP is central to Java and comes up in system design and behavioral interviews. Python has OOP too, but Java enforces it.",
        keyPoints: [
          "Classes, objects, constructors — class vs object distinction",
          "Encapsulation: private fields + public getters/setters",
          "Inheritance: extends, super(), method overriding — IS-A relationship",
          "Polymorphism: interfaces (implements), abstract classes, method overloading",
          "SOLID principles: single responsibility, open/closed, Liskov, interface segregation, dependency inversion"
        ],
        practice: "Design a simple library system: Book, User, Library classes with inheritance and interfaces."
      },
      {
        id: "w6t4",
        title: "Java-Specific Interview Patterns",
        category: "Java",
        detail: "Java-specific idioms and patterns that interviewers expect you to know.",
        keyPoints: [
          "String immutability and StringBuilder — crucial for string manipulation problems",
          "equals() vs == — reference vs value comparison (like Python's is vs ==)",
          "Autoboxing/unboxing: int ↔ Integer, the null pointer trap",
          "Comparators and sorting: Comparator.comparingInt(), lambda syntax",
          "Exception handling: try/catch/finally, checked vs unchecked exceptions"
        ],
        practice: "Implement LRU Cache in Java (LinkedHashMap approach and manual doubly-linked-list + HashMap approach)."
      },
      {
        id: "w6t5",
        title: "Design Patterns & Clean Code",
        category: "Java",
        detail: "Common design patterns that appear in OOD interview questions and real codebases.",
        keyPoints: [
          "Singleton: one global instance (database connections, loggers)",
          "Factory: create objects without specifying exact class",
          "Observer: publish-subscribe pattern (event systems)",
          "Strategy: swap algorithms at runtime (sorting strategies, payment methods)",
          "Builder: construct complex objects step-by-step (common in Java APIs)"
        ],
        practice: "Implement Observer pattern and Strategy pattern in Java. Discuss when you'd use each in a real system."
      }
    ]
  },

  // ─────────── WEEK 7: Web Development ───────────
  {
    week: 7,
    title: "Web Development & APIs",
    description: "Turn your coding skills into real products. Learn how the web works — this is what makes you a full-stack engineer, not just an algorithm solver.",
    color: "#0891b2",
    topics: [
      {
        id: "w7t1",
        title: "HTML, CSS & Responsive Design",
        category: "Web Dev",
        detail: "The visual layer of the web. You've probably used these in vibe coding — now understand the fundamentals.",
        keyPoints: [
          "Semantic HTML: header, nav, main, article, section, aside, footer",
          "The box model: margin → border → padding → content",
          "Flexbox for 1D layouts, CSS Grid for 2D layouts",
          "Responsive design: media queries, mobile-first, fluid typography",
          "CSS variables, transitions, and basic animations"
        ],
        practice: "Rebuild a popular website's layout (e.g., Twitter/X feed) using only Flexbox and Grid. Make it responsive."
      },
      {
        id: "w7t2",
        title: "JavaScript Essentials & DOM",
        category: "Web Dev",
        detail: "JavaScript is the language of the browser. Learn the unique parts — you already know programming fundamentals from Python.",
        keyPoints: [
          "JS-specific: let/const/var, arrow functions, destructuring, spread/rest",
          "The DOM tree: querySelector, createElement, event listeners",
          "Async JavaScript: callbacks → Promises → async/await",
          "Fetch API for HTTP requests — the bridge between frontend and backend",
          "ES Modules, closures, 'this' keyword, event loop"
        ],
        practice: "Build a todo app with add, delete, edit, filter, and local storage persistence — no framework."
      },
      {
        id: "w7t3",
        title: "HTTP, REST APIs & Networking",
        category: "Web Dev",
        detail: "How frontend and backend communicate. REST APIs are the backbone of modern web apps.",
        keyPoints: [
          "HTTP methods: GET, POST, PUT, DELETE, PATCH",
          "Status codes: 200, 201, 301, 400, 401, 403, 404, 500",
          "Headers, request body, query parameters, path parameters",
          "RESTful API design: resources, CRUD, versioning, pagination",
          "JSON data format — you know this from SQL result sets"
        ],
        practice: "Build a frontend that consumes a public API (GitHub, weather, etc.). Handle loading states, errors, and display."
      },
      {
        id: "w7t4",
        title: "Git & Version Control",
        category: "Web Dev",
        detail: "Every professional team uses Git. Learn it properly — it will save you countless times.",
        keyPoints: [
          "git init, add, commit, push, pull — the basic workflow",
          "Branching: create, switch, merge — feature branch workflow",
          "Resolving merge conflicts — this WILL happen",
          "git log, diff, stash, rebase basics, cherry-pick",
          "GitHub: PRs, code reviews, issues, GitHub Actions basics"
        ],
        practice: "Create a repo, make branches, create a merge conflict deliberately, and resolve it. Practice rebasing."
      },
      {
        id: "w7t5",
        title: "React Fundamentals",
        category: "Web Dev",
        detail: "React is the most in-demand frontend framework. Learn components, state, hooks — the React mental model.",
        keyPoints: [
          "Components: functional components, JSX = HTML-in-JS",
          "Props (data down) and State (useState, re-rendering)",
          "Hooks: useEffect (side effects), useContext (global state), useRef (DOM access)",
          "Event handling, conditional rendering, rendering lists with .map()",
          "Custom hooks: extracting reusable logic"
        ],
        practice: "Build a weather dashboard with React: fetch API data, search cities, toggle units, use custom hooks."
      }
    ]
  },

  // ─────────── WEEK 8: Backend & Databases ───────────
  {
    week: 8,
    title: "Backend Development & Databases",
    description: "Build server-side applications. You know SQL already — now connect it to a real backend and learn production patterns.",
    color: "#059669",
    topics: [
      {
        id: "w8t1",
        title: "Backend Frameworks: FastAPI or Express",
        category: "Backend",
        detail: "Pick one: FastAPI (Python, modern, fast) or Express.js (Node, ubiquitous). Build your first API server.",
        keyPoints: [
          "FastAPI: Python, type-checked, auto-generated docs, async support",
          "Express.js: Node.js, minimal, huge ecosystem, middleware pattern",
          "Spring Boot: Java's enterprise framework — know it exists, explore later",
          "Routing, request parsing, response formatting, error handling",
          "Environment config, project structure, dependency management"
        ],
        practice: "Build a REST API for a bookstore: CRUD operations for books, authors, and reviews."
      },
      {
        id: "w8t2",
        title: "SQL Mastery (Level Up)",
        category: "Backend",
        detail: "You know basic SQL. Now master the advanced features that come up in interviews and real data work.",
        keyPoints: [
          "Complex JOINs: LEFT, RIGHT, FULL OUTER, CROSS, self-joins",
          "Subqueries vs CTEs (WITH clause) — CTEs are cleaner",
          "Window functions: ROW_NUMBER(), RANK(), LAG(), LEAD(), SUM() OVER()",
          "Indexing: B-trees, when to index, composite indexes, covering indexes",
          "Query optimization: EXPLAIN, avoiding N+1 queries, denormalization trade-offs"
        ],
        practice: "Solve 10 advanced SQL problems involving window functions, CTEs, and self-joins on LeetCode SQL."
      },
      {
        id: "w8t3",
        title: "Database Design & ORMs",
        category: "Backend",
        detail: "Design schemas properly. Learn how ORMs bridge your code and database.",
        keyPoints: [
          "Normalization: 1NF, 2NF, 3NF — when to normalize vs denormalize",
          "Entity-Relationship diagrams — modeling the real world",
          "One-to-one, one-to-many, many-to-many (junction tables)",
          "ORMs: SQLAlchemy (Python), Prisma (Node), Hibernate (Java)",
          "Migrations and schema evolution — altering production databases safely"
        ],
        practice: "Design a database for a social media app. Create the schema, write migrations, and seed data."
      },
      {
        id: "w8t4",
        title: "Authentication & Security",
        category: "Backend",
        detail: "How to handle users securely. Auth is asked about in both coding and system design interviews.",
        keyPoints: [
          "Password hashing: bcrypt, argon2 — NEVER store plaintext",
          "Session-based vs token-based auth — trade-offs",
          "JWTs: structure (header.payload.signature), signing, verification, expiry",
          "OAuth 2.0 basics: Google/GitHub login flow, authorization code grant",
          "OWASP Top 10: SQL injection, XSS, CSRF — know how to prevent each"
        ],
        practice: "Add JWT authentication to your bookstore API. Implement login, signup, and protected routes."
      },
      {
        id: "w8t5",
        title: "Testing & Debugging",
        category: "Backend",
        detail: "Professional code is tested code. Testing skills make you a more reliable engineer.",
        keyPoints: [
          "Unit tests vs integration tests vs e2e tests — the testing pyramid",
          "Python: pytest (fixtures, parametrize, mocking), Java: JUnit 5",
          "JavaScript: Jest (mocking, snapshots, coverage)",
          "Test-driven development (TDD): red → green → refactor",
          "Debugging strategies: breakpoints, logging, stack traces, rubber duck debugging"
        ],
        practice: "Write tests for your bookstore API: unit tests for helpers, integration tests for endpoints."
      }
    ]
  },

  // ─────────── WEEK 9: System Design & Modern Tools ───────────
  {
    week: 9,
    title: "System Design, TypeScript & AI-Era Tools",
    description: "Think at scale. Learn TypeScript (the industry standard over plain JS). And learn to work WITH AI tools — because every 2026 engineer does.",
    color: "#d97706",
    topics: [
      {
        id: "w9t1",
        title: "System Design — Fundamentals",
        category: "System Design",
        detail: "How large-scale systems work. Even junior interviews touch on this — and it's growing in importance.",
        keyPoints: [
          "Client-server architecture, DNS, load balancers",
          "Horizontal vs vertical scaling — why horizontal wins",
          "Caching layers: CDN, Redis/Memcached, browser cache, application cache",
          "Databases at scale: read replicas, sharding, partitioning",
          "Message queues (Kafka, RabbitMQ) and async processing"
        ],
        practice: "Design a URL shortener (like bit.ly). Draw the architecture, define the API, and discuss scaling to 100M users."
      },
      {
        id: "w9t2",
        title: "System Design — Common Patterns",
        category: "System Design",
        detail: "The building blocks that appear in every system design interview.",
        keyPoints: [
          "Rate limiting and throttling (token bucket, sliding window)",
          "Pub/sub pattern and event-driven architecture",
          "CAP theorem: consistency vs availability vs partition tolerance",
          "Microservices vs monoliths — trade-offs, not religion",
          "Database choices: SQL vs NoSQL (DynamoDB, MongoDB, Cassandra) — when to use which"
        ],
        practice: "Design a chat application (like Slack). Consider real-time messaging (WebSockets), storage, and scaling."
      },
      {
        id: "w9t3",
        title: "TypeScript — JavaScript's Strict Upgrade",
        category: "Frontend",
        detail: "TypeScript is now the #1 language on GitHub. Companies expect it. Your SQL type awareness helps here.",
        keyPoints: [
          "Why TypeScript: catches bugs at compile time, better IDE support, self-documenting",
          "Basic types: string, number, boolean, arrays, tuples",
          "Interfaces and type aliases — defining shapes of data",
          "Union types, literal types, generics basics",
          "TypeScript with React: typed props, typed state, typed API responses"
        ],
        practice: "Convert a React component to TypeScript. Define interfaces for API responses and component props."
      },
      {
        id: "w9t4",
        title: "AI-Assisted Development (2026 Essential)",
        category: "Modern Tools",
        detail: "Every professional engineer in 2026 uses AI tools. Learn when and how to use them — and when NOT to.",
        keyPoints: [
          "GitHub Copilot, Cursor, Claude Code — the big three AI coding assistants",
          "Effective prompting: specific context → better suggestions",
          "When AI helps: boilerplate, tests, docs, unfamiliar APIs, debugging",
          "When AI hurts: algorithm problems (turn it OFF during interviews!), security-sensitive code",
          "The polyglot advantage: AI makes switching languages easier — focus on concepts, not syntax"
        ],
        practice: "Use an AI assistant to scaffold a project. Then solve 3 LeetCode problems WITHOUT any AI help. Notice the difference."
      },
      {
        id: "w9t5",
        title: "DevOps & Deployment Basics",
        category: "Modern Tools",
        detail: "Getting code from your laptop to production. Basic DevOps knowledge makes you a more complete engineer.",
        keyPoints: [
          "Docker: containers, Dockerfile, images — 'works on my machine' solved",
          "CI/CD: GitHub Actions, automated testing, deployment pipelines",
          "Cloud basics: AWS/GCP/Azure — EC2, S3, Lambda (know what they are)",
          "Deployment: Vercel (frontend), Railway/Render (backend), Supabase (BaaS)",
          "Monitoring: logs, metrics, alerts — why production visibility matters"
        ],
        practice: "Dockerize your bookstore API. Set up a GitHub Actions workflow that runs tests on every push."
      }
    ]
  },

  // ─────────── WEEK 10: Interview Prep & Portfolio ───────────
  {
    week: 10,
    title: "Interview Prep & Portfolio Projects",
    description: "Tie it all together. Practice real interviews, build a portfolio project, and prepare to land the job.",
    color: "#7c3aed",
    topics: [
      {
        id: "w10t1",
        title: "Common Interview Patterns — Pattern Recognition",
        category: "Interview",
        detail: "Most interview problems fall into recognizable patterns. Learn to identify them in under 2 minutes.",
        keyPoints: [
          "Pattern → technique mapping: sorted array → binary search, shortest path → BFS, optimization → DP",
          "Top patterns: two pointers, sliding window, BFS/DFS, binary search, DP, greedy, backtracking",
          "How to communicate your approach: think out loud, state brute force first, then optimize",
          "Time management: 5 min understand, 5 min plan, 20 min code, 5 min test",
          "Edge cases: empty input, single element, duplicates, negative numbers, overflow"
        ],
        practice: "Do 5 timed mock problems: 35 min each. Categorize each by pattern before coding."
      },
      {
        id: "w10t2",
        title: "Mock Interviews & Communication",
        category: "Interview",
        detail: "The #1 mistake candidates make: coding silently. Practice talking through your thought process.",
        keyPoints: [
          "UMPIRE method: Understand, Match (pattern), Plan, Implement, Review, Evaluate",
          "Clarifying questions: input size? sorted? duplicates? negative numbers? (ask BEFORE coding)",
          "Narrate as you code: 'I'm using a hash map here because we need O(1) lookup...'",
          "When you're stuck: simplify the problem, try examples, think about similar problems you've solved",
          "Mock interview platforms: Pramp (free), Interviewing.io, or practice with a friend"
        ],
        practice: "Do 3 full mock interviews (45 min each): 1 in Python, 1 in Java, 1 behavioral."
      },
      {
        id: "w10t3",
        title: "Build a Full-Stack Portfolio Project",
        category: "Portfolio",
        detail: "Build something real that you can demo. This is your proof that you can ship software.",
        keyPoints: [
          "Choose a project that solves a real problem (not another todo app)",
          "Full stack: React/Next.js frontend + Python/Node backend + SQL database",
          "Include: auth, CRUD, at least one interesting feature (real-time, AI, data viz)",
          "Deploy it: Vercel (frontend) + Railway/Render (backend) + Supabase/PlanetScale (DB)",
          "Write a killer README: what, why, how, screenshots, live demo link"
        ],
        practice: "Build and deploy a full-stack project. Ideas: expense tracker with charts, job application tracker, recipe manager with meal planning."
      },
      {
        id: "w10t4",
        title: "Resume, GitHub & LinkedIn",
        category: "Career",
        detail: "Your resume and online presence are your first impression. Make them count.",
        keyPoints: [
          "One-page resume: quantify achievements (reduced latency by 40%, not 'improved performance')",
          "Project descriptions: WHAT it does, WHAT tech you used, WHAT impact/scale",
          "GitHub: pin best repos, write READMEs, show consistent commit history (green squares matter)",
          "LinkedIn: clear headline ('M.Eng Systems Engineering @ Cornell | SWE'), featured projects",
          "Tailor resume keywords to each job posting — ATS systems filter by keywords"
        ],
        practice: "Write your resume. Get 3 people to review it. Update your GitHub profile README with a portfolio section."
      },
      {
        id: "w10t5",
        title: "Behavioral Interviews & Negotiation",
        category: "Career",
        detail: "Technical skills get you the interview. Soft skills and negotiation get you the offer (and the right salary).",
        keyPoints: [
          "STAR method: Situation, Task, Action, Result — be specific, not vague",
          "Common questions: tell me about yourself, why this company, conflict resolution, biggest failure",
          "Asking good questions to the interviewer (shows genuine interest and due diligence)",
          "How to handle 'I don't know' gracefully — show problem-solving approach",
          "Negotiation: always negotiate, research salary bands (levels.fyi), consider total comp"
        ],
        practice: "Prepare 5 STAR stories. Practice them out loud until they're natural. Record yourself and review."
      }
    ]
  }
];

// ============================================================
// PRACTICE PROBLEMS — LeetCode-style with test cases
// Python-first, Java + JS support
// ============================================================

const PROBLEMS = [
  // ─── Easy ───
  {
    id: "p1",
    title: "Two Sum",
    difficulty: "easy",
    week: 2,
    topic: "Arrays",
    description: `Given an array of integers <code>nums</code> and an integer <code>target</code>, return the indices of the two numbers that add up to <code>target</code>.

You may assume each input has exactly one solution, and you may not use the same element twice.

<strong>Example:</strong>
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]  (because nums[0] + nums[1] = 2 + 7 = 9)

<strong>Example 2:</strong>
Input: nums = [3, 2, 4], target = 6
Output: [1, 2]`,
    starterPY: `def two_sum(nums, target):
    # Your code here
    pass`,
    starterJava: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
}`,
    starterJS: `function twoSum(nums, target) {
  // Your code here

}`,
    testCases: [
      { input: [[2,7,11,15], 9], expected: [0,1] },
      { input: [[3,2,4], 6], expected: [1,2] },
      { input: [[3,3], 6], expected: [0,1] },
    ],
    solution: `# Python — O(n) using a hash map (dict)
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i`,
    solutionJava: `// Java — O(n) using HashMap
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (seen.containsKey(complement)) {
            return new int[]{seen.get(complement), i};
        }
        seen.put(nums[i], i);
    }
    return new int[]{};
}`,
    solutionJS: `// JavaScript — O(n) using a Map
function twoSum(nums, target) {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen[complement] !== undefined) {
      return [seen[complement], i];
    }
    seen[nums[i]] = i;
  }
}`,
    walkthrough: `<strong>Step 1: Understand the brute force</strong>
The naive way: check every pair — two nested loops, O(n²). Can we do better?

<strong>Step 2: The key insight</strong>
For each number, we need (target - number) to exist elsewhere. This is a LOOKUP problem — hash maps do lookups in O(1).

<strong>Step 3: The algorithm (all 3 languages use the same logic)</strong>
Walk through the array once. For each number:
  1. Calculate complement = target - nums[i]
  2. Check if complement is in our hash map
  3. If yes → return both indices
  4. If no → store nums[i] → i in the map

<strong>Language comparison:</strong>
  Python: <code>seen = {}</code> → <code>if complement in seen</code>
  Java:   <code>Map&lt;Integer, Integer&gt; seen = new HashMap&lt;&gt;()</code> → <code>seen.containsKey(complement)</code>
  JS:     <code>const seen = {}</code> → <code>if (seen[complement] !== undefined)</code>

<strong>Complexity:</strong> O(n) time, O(n) space — one pass through the array.

<strong>SQL analogy:</strong> Think of the hash map like an INDEX. Instead of scanning every row (O(n²)), you do an indexed lookup (O(1)).`,
    hint: "Use a hash map to store numbers you've seen. For each number, check if (target - number) exists in the map."
  },
  {
    id: "p2",
    title: "Reverse String",
    difficulty: "easy",
    week: 1,
    topic: "Strings",
    description: `Write a function that reverses a string. The input is given as an array of characters.

You must do this <strong>in-place</strong> with O(1) extra memory.

<strong>Example:</strong>
Input: ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

<strong>Example 2:</strong>
Input: ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]`,
    starterPY: `def reverse_string(s):
    # Modify s in-place
    pass`,
    starterJava: `class Solution {
    public void reverseString(char[] s) {
        // Modify s in-place
    }
}`,
    starterJS: `function reverseString(s) {
  // Modify s in-place

}`,
    testCases: [
      { input: [["h","e","l","l","o"]], expected: ["o","l","l","e","h"] },
      { input: [["H","a","n","n","a","h"]], expected: ["h","a","n","n","a","H"] },
    ],
    solution: `# Python — Two pointers
def reverse_string(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1`,
    solutionJava: `// Java — Two pointers
public void reverseString(char[] s) {
    int left = 0, right = s.length - 1;
    while (left < right) {
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
}`,
    solutionJS: `// JavaScript — Two pointers
function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
}`,
    walkthrough: `<strong>Pattern: Two-pointer converging</strong>
Place one pointer at start, one at end. Swap and move inward.

<strong>Language comparison — the swap:</strong>
  Python: <code>s[left], s[right] = s[right], s[left]</code> (tuple unpacking — clean!)
  Java:   <code>char temp = s[left]; s[left] = s[right]; s[right] = temp;</code> (need temp variable)
  JS:     <code>[s[left], s[right]] = [s[right], s[left]]</code> (destructuring — like Python)

This is why Python is popular for interviews — less boilerplate.

<strong>Complexity:</strong> O(n) time, O(1) space — exactly n/2 swaps.`,
    hint: "Use two pointers — one at the start, one at the end. Swap and move inward."
  },
  {
    id: "p3",
    title: "Valid Parentheses",
    difficulty: "easy",
    week: 2,
    topic: "Stacks",
    description: `Given a string <code>s</code> containing just '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

A string is valid if:
1. Open brackets are closed by the same type.
2. Open brackets are closed in the correct order.

<strong>Example 1:</strong> Input: "()" → true
<strong>Example 2:</strong> Input: "()[]{}" → true
<strong>Example 3:</strong> Input: "(]" → false
<strong>Example 4:</strong> Input: "([)]" → false`,
    starterPY: `def is_valid(s):
    # Your code here
    pass`,
    starterJava: `import java.util.*;

class Solution {
    public boolean isValid(String s) {
        // Your code here
        return false;
    }
}`,
    starterJS: `function isValid(s) {
  // Your code here

}`,
    testCases: [
      { input: ["()"], expected: true },
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["([)]"], expected: false },
      { input: ["{[]}"], expected: true },
    ],
    solution: `# Python — Stack approach
def is_valid(s):
    stack = []
    mapping = {')': '(', ']': '[', '}': '{'}
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    return len(stack) == 0`,
    solutionJava: `// Java — Stack approach
public boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    Map<Character, Character> map = Map.of(')', '(', ']', '[', '}', '{');
    for (char c : s.toCharArray()) {
        if (map.containsKey(c)) {
            if (stack.isEmpty() || stack.pop() != map.get(c)) return false;
        } else {
            stack.push(c);
        }
    }
    return stack.isEmpty();
}`,
    solutionJS: `// JavaScript — Stack approach
function isValid(s) {
  const stack = [];
  const map = { ')': '(', ']': '[', '}': '{' };
  for (const char of s) {
    if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
    walkthrough: `<strong>Why a stack?</strong>
Brackets close in REVERSE order — "last opened, first closed" = LIFO = stack.

<strong>Algorithm (identical across all 3 languages):</strong>
1. See opening bracket → push to stack
2. See closing bracket → pop from stack, check if it matches
3. Mismatch or empty stack when popping → invalid
4. At end, stack must be empty

<strong>Language notes:</strong>
  Python: Use <code>list</code> as stack — <code>append()</code> and <code>pop()</code>
  Java: Use <code>ArrayDeque</code> (not legacy <code>Stack</code> class!) — <code>push()</code> and <code>pop()</code>
  JS: Use <code>Array</code> — <code>push()</code> and <code>pop()</code>

<strong>Complexity:</strong> O(n) time, O(n) space.`,
    hint: "Use a stack. Push opening brackets, pop when you see a closing bracket, and check if they match."
  },
  {
    id: "p4",
    title: "Palindrome Check",
    difficulty: "easy",
    week: 1,
    topic: "Strings",
    description: `Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring case.

<strong>Example 1:</strong>
Input: "A man, a plan, a canal: Panama"
Output: true

<strong>Example 2:</strong>
Input: "race a car"
Output: false`,
    starterPY: `def is_palindrome(s):
    # Your code here
    pass`,
    starterJava: `class Solution {
    public boolean isPalindrome(String s) {
        // Your code here
        return false;
    }
}`,
    starterJS: `function isPalindrome(s) {
  // Your code here

}`,
    testCases: [
      { input: ["A man, a plan, a canal: Panama"], expected: true },
      { input: ["race a car"], expected: false },
      { input: [" "], expected: true },
    ],
    solution: `# Python — clean and concise
def is_palindrome(s):
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]

# Alternative: two-pointer (O(1) space)
def is_palindrome_v2(s):
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True`,
    solutionJava: `// Java — two-pointer approach
public boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        while (left < right && !Character.isLetterOrDigit(s.charAt(left)))
            left++;
        while (left < right && !Character.isLetterOrDigit(s.charAt(right)))
            right--;
        if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right)))
            return false;
        left++;
        right--;
    }
    return true;
}`,
    solutionJS: `// JavaScript
function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
    walkthrough: `<strong>Two approaches:</strong>
1. Clean string + reverse comparison (easiest in Python: <code>s[::-1]</code>)
2. Two-pointer with in-place character skipping (O(1) space)

<strong>Python's advantage:</strong> <code>cleaned == cleaned[::-1]</code> — one line palindrome check. This is why Python dominates interviews.

<strong>Java note:</strong> Strings are immutable. Use <code>Character.isLetterOrDigit()</code> and <code>Character.toLowerCase()</code>.

<strong>Complexity:</strong> O(n) time. O(n) space for method 1, O(1) for method 2.`,
    hint: "Clean the string first (lowercase, remove non-alphanumeric). Then use two pointers from both ends."
  },
  {
    id: "p5",
    title: "Maximum Subarray (Kadane's)",
    difficulty: "easy",
    week: 3,
    topic: "Arrays",
    description: `Given an integer array <code>nums</code>, find the contiguous subarray with the largest sum and return the sum.

<strong>Example:</strong>
Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6 (subarray [4, -1, 2, 1] has the largest sum = 6)

<strong>Example 2:</strong>
Input: [1]
Output: 1

<strong>Example 3:</strong>
Input: [-1]
Output: -1`,
    starterPY: `def max_subarray(nums):
    # Your code here
    pass`,
    starterJava: `class Solution {
    public int maxSubArray(int[] nums) {
        // Your code here
        return 0;
    }
}`,
    starterJS: `function maxSubArray(nums) {
  // Your code here

}`,
    testCases: [
      { input: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[-1]], expected: -1 },
      { input: [[5,4,-1,7,8]], expected: 23 },
    ],
    solution: `# Python — Kadane's Algorithm
def max_subarray(nums):
    current_sum = max_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum`,
    solutionJava: `// Java — Kadane's Algorithm
public int maxSubArray(int[] nums) {
    int currentSum = nums[0], maxSum = nums[0];
    for (int i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}`,
    solutionJS: `// JavaScript — Kadane's Algorithm
function maxSubArray(nums) {
  let currentSum = nums[0], maxSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
    walkthrough: `<strong>Kadane's Algorithm — the key DP insight:</strong>
At each position, decide: start a new subarray here, or extend the previous one?
If current_sum + nums[i] < nums[i], it's better to start fresh.

<strong>Same logic, three languages:</strong>
  current_sum = max(nums[i], current_sum + nums[i])
  max_sum = max(max_sum, current_sum)

<strong>Complexity:</strong> O(n) time, O(1) space — single pass.

This is technically a 1D DP problem where dp[i] = max subarray ending at index i.`,
    hint: "Kadane's algorithm: at each element, decide whether to extend the current subarray or start a new one."
  },
  {
    id: "p6",
    title: "Merge Two Sorted Lists",
    difficulty: "easy",
    week: 2,
    topic: "Linked Lists",
    description: `Merge two sorted linked lists and return it as a new sorted list.

<strong>Example:</strong>
Input: 1→2→4, 1→3→4
Output: 1→1→2→3→4→4`,
    starterPY: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(list1, list2):
    # Your code here
    pass`,
    starterJava: `class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Your code here
        return null;
    }
}`,
    starterJS: `function mergeTwoLists(list1, list2) {
  // Your code here

}`,
    testCases: [
      { input: "linked_list_merge", expected: "linked_list_pass", customCheck: true },
    ],
    solution: `# Python — Dummy head technique
def merge_two_lists(list1, list2):
    dummy = ListNode(0)
    current = dummy
    while list1 and list2:
        if list1.val <= list2.val:
            current.next = list1
            list1 = list1.next
        else:
            current.next = list2
            list2 = list2.next
        current = current.next
    current.next = list1 or list2
    return dummy.next`,
    solutionJava: `// Java — Dummy head technique
public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ListNode dummy = new ListNode(0);
    ListNode current = dummy;
    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    current.next = (list1 != null) ? list1 : list2;
    return dummy.next;
}`,
    solutionJS: `// JavaScript — Dummy head technique
function mergeTwoLists(list1, list2) {
  const dummy = { val: 0, next: null };
  let current = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  current.next = list1 || list2;
  return dummy.next;
}`,
    walkthrough: `<strong>The dummy head pattern:</strong>
Create a dummy node to simplify edge cases (empty lists, first insertion). Build the result by comparing heads of both lists and linking the smaller one.

<strong>Python elegance:</strong>
<code>current.next = list1 or list2</code> — handles the remaining tail in one line.

<strong>Complexity:</strong> O(n + m) time, O(1) space (we reuse existing nodes).

<strong>Pattern:</strong> Merge sorted sequences — also appears in merge sort, merge K lists, and merge intervals.`,
    hint: "Use a dummy head node. Compare the heads of both lists, link the smaller one, advance that pointer."
  },
  // ─── Medium ───
  {
    id: "p7",
    title: "Group Anagrams",
    difficulty: "medium",
    week: 2,
    topic: "Hash Maps",
    description: `Given an array of strings, group anagrams together.

<strong>Example:</strong>
Input: ["eat","tea","tan","ate","nat","bat"]
Output: [["eat","tea","ate"],["tan","nat"],["bat"]]

Note: Order of groups and order within groups doesn't matter.`,
    starterPY: `def group_anagrams(strs):
    # Your code here
    pass`,
    starterJava: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // Your code here
        return new ArrayList<>();
    }
}`,
    starterJS: `function groupAnagrams(strs) {
  // Your code here

}`,
    testCases: [
      { input: [["eat","tea","tan","ate","nat","bat"]], expected: "anagram_check", customCheck: true },
    ],
    solution: `# Python — sorted string as key
from collections import defaultdict

def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = ''.join(sorted(s))  # or tuple(sorted(s))
        groups[key].append(s)
    return list(groups.values())`,
    solutionJava: `// Java — sorted string as key
public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();
    for (String s : strs) {
        char[] chars = s.toCharArray();
        Arrays.sort(chars);
        String key = new String(chars);
        map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
    }
    return new ArrayList<>(map.values());
}`,
    solutionJS: `// JavaScript — sorted string as key
function groupAnagrams(strs) {
  const map = {};
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map[key]) map[key] = [];
    map[key].push(s);
  }
  return Object.values(map);
}`,
    walkthrough: `<strong>Key insight:</strong> Two strings are anagrams if they have the same characters in the same frequencies. Sorting both gives the same string → use sorted version as hash key.

<strong>Java note:</strong> <code>computeIfAbsent()</code> is cleaner than checking containsKey + creating new list.
<strong>Python note:</strong> <code>defaultdict(list)</code> avoids key-existence checks entirely.

<strong>Complexity:</strong> O(n * k log k) where k = max string length (sorting each string).

<strong>Alternative:</strong> Use character frequency tuple as key → O(n * k) — count each char, create a tuple like (1,0,0,...,1,0,...).`,
    hint: "Sort each string to create a canonical form. Use it as a hash map key. Anagrams will have the same key."
  },
  {
    id: "p8",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    week: 3,
    topic: "Sliding Window",
    description: `Given a string, find the length of the longest substring without repeating characters.

<strong>Example 1:</strong>
Input: "abcabcbb"
Output: 3 ("abc")

<strong>Example 2:</strong>
Input: "bbbbb"
Output: 1 ("b")

<strong>Example 3:</strong>
Input: "pwwkew"
Output: 3 ("wke")`,
    starterPY: `def length_of_longest_substring(s):
    # Your code here
    pass`,
    starterJava: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Your code here
        return 0;
    }
}`,
    starterJS: `function lengthOfLongestSubstring(s) {
  // Your code here

}`,
    testCases: [
      { input: ["abcabcbb"], expected: 3 },
      { input: ["bbbbb"], expected: 1 },
      { input: ["pwwkew"], expected: 3 },
      { input: [""], expected: 0 },
    ],
    solution: `# Python — Sliding Window with set
def length_of_longest_substring(s):
    char_set = set()
    left = max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len`,
    solutionJava: `// Java — Sliding Window with HashMap
public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> map = new HashMap<>();
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (map.containsKey(c)) {
            left = Math.max(left, map.get(c) + 1);
        }
        map.put(c, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
    solutionJS: `// JavaScript — Sliding Window with Map
function lengthOfLongestSubstring(s) {
  const map = new Map();
  let maxLen = 0, left = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(left, map.get(s[right]) + 1);
    }
    map.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    walkthrough: `<strong>Pattern: Variable-size sliding window</strong>
Expand the window (right++) until a repeat is found. Then shrink from left until the window is valid again.

<strong>Two approaches shown:</strong>
  Python: set-based — remove from left until no duplicate. Simple and clean.
  Java/JS: map-based — store last index of each char, jump left pointer directly. Slightly faster.

<strong>Complexity:</strong> O(n) time, O(min(n, alphabet_size)) space.`,
    hint: "Sliding window: expand right, shrink left when you see a repeat. Track characters in a set or map."
  },
  {
    id: "p9",
    title: "Binary Tree Level Order Traversal",
    difficulty: "medium",
    week: 4,
    topic: "Trees",
    description: `Given the root of a binary tree, return the level order traversal (values at each level from left to right).

<strong>Example:</strong>
Input: [3,9,20,null,null,15,7]
        3
       / \\
      9  20
        /  \\
       15   7
Output: [[3],[9,20],[15,7]]`,
    starterPY: `def level_order(root):
    # Your code here
    pass`,
    starterJava: `import java.util.*;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // Your code here
        return new ArrayList<>();
    }
}`,
    starterJS: `function levelOrder(root) {
  // Your code here

}`,
    testCases: [
      { input: "tree_test", expected: "tree_pass", customCheck: true },
    ],
    solution: `# Python — BFS with deque
from collections import deque

def level_order(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result`,
    solutionJava: `// Java — BFS with ArrayDeque
public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new ArrayDeque<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        result.add(level);
    }
    return result;
}`,
    solutionJS: `// JavaScript — BFS
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length) {
    const level = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,
    walkthrough: `<strong>Pattern: BFS (Breadth-First Search) on trees</strong>
Process all nodes at current level before moving to next level. Use a queue.

<strong>The trick:</strong> At each step, record <code>queue.size()</code> BEFORE processing. That tells you how many nodes are in the current level.

<strong>Performance note:</strong>
  Python: <code>collections.deque</code> — O(1) popleft
  Java: <code>ArrayDeque</code> — O(1) poll
  JS: <code>queue.shift()</code> — actually O(n)! For interviews it's fine, but in production use a proper queue.

<strong>Complexity:</strong> O(n) time, O(n) space.`,
    hint: "BFS with a queue. Process one level at a time by checking queue size before the inner loop."
  },
  {
    id: "p10",
    title: "Coin Change (DP)",
    difficulty: "medium",
    week: 5,
    topic: "Dynamic Programming",
    description: `Given an array of coin denominations and a target amount, return the fewest number of coins needed. Return -1 if impossible.

<strong>Example 1:</strong>
Input: coins = [1, 5, 10, 25], amount = 30
Output: 2 (25 + 5)

<strong>Example 2:</strong>
Input: coins = [2], amount = 3
Output: -1`,
    starterPY: `def coin_change(coins, amount):
    # Your code here
    pass`,
    starterJava: `import java.util.*;

class Solution {
    public int coinChange(int[] coins, int amount) {
        // Your code here
        return -1;
    }
}`,
    starterJS: `function coinChange(coins, amount) {
  // Your code here

}`,
    testCases: [
      { input: [[1,5,10,25], 30], expected: 2 },
      { input: [[2], 3], expected: -1 },
      { input: [[1], 0], expected: 0 },
      { input: [[1,2,5], 11], expected: 3 },
    ],
    solution: `# Python — Bottom-up DP
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
    solutionJava: `// Java — Bottom-up DP
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
    solutionJS: `// JavaScript — Bottom-up DP
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    walkthrough: `<strong>Classic unbounded knapsack DP</strong>
dp[i] = minimum coins to make amount i.
For each amount, try every coin: dp[i] = min(dp[i], dp[i - coin] + 1).

<strong>Why greedy FAILS here:</strong>
Coins = [1, 3, 4], amount = 6. Greedy picks 4+1+1 = 3 coins. Optimal: 3+3 = 2 coins.
This is why we need DP — it considers all possibilities.

<strong>Complexity:</strong> O(amount × coins) time, O(amount) space.`,
    hint: "DP where dp[i] = min coins for amount i. For each amount, try each coin denomination."
  },
  // ─── Hard ───
  {
    id: "p11",
    title: "Merge K Sorted Lists",
    difficulty: "hard",
    week: 4,
    topic: "Heaps",
    description: `Merge k sorted linked lists and return one sorted list.

<strong>Example:</strong>
Input: [[1,4,5], [1,3,4], [2,6]]
Output: [1,1,2,3,4,4,5,6]`,
    starterPY: `import heapq

def merge_k_lists(lists):
    # Your code here
    pass`,
    starterJava: `import java.util.*;

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        // Your code here
        return null;
    }
}`,
    starterJS: `function mergeKLists(lists) {
  // Your code here

}`,
    testCases: [
      { input: "merge_k_test", expected: "merge_k_pass", customCheck: true },
    ],
    solution: `# Python — Min-heap approach
import heapq

def merge_k_lists(lists):
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))
    
    dummy = ListNode(0)
    current = dummy
    while heap:
        val, i, node = heapq.heappop(heap)
        current.next = node
        current = current.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next`,
    solutionJava: `// Java — PriorityQueue approach
public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> pq = new PriorityQueue<>(
        Comparator.comparingInt(a -> a.val)
    );
    for (ListNode node : lists) {
        if (node != null) pq.add(node);
    }
    ListNode dummy = new ListNode(0);
    ListNode current = dummy;
    while (!pq.isEmpty()) {
        ListNode node = pq.poll();
        current.next = node;
        current = current.next;
        if (node.next != null) pq.add(node.next);
    }
    return dummy.next;
}`,
    solutionJS: `// JavaScript — Divide and conquer (merge pairs)
function mergeKLists(lists) {
  if (!lists.length) return null;
  while (lists.length > 1) {
    const merged = [];
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      merged.push(mergeTwoLists(l1, l2));
    }
    lists = merged;
  }
  return lists[0];
}`,
    walkthrough: `<strong>Three approaches (know all three):</strong>

1. <strong>Min-heap (Python/Java)</strong>: Push first node of each list into a heap. Pop min, push its .next. O(n log k).
2. <strong>Divide and conquer</strong>: Merge lists in pairs, like merge sort. O(n log k).
3. <strong>Brute force</strong>: Collect all values, sort, rebuild list. O(n log n).

<strong>Python note:</strong> heapq needs a tuple for comparison — (val, index, node) where index breaks ties.
<strong>Java note:</strong> PriorityQueue with Comparator.comparingInt() — clean lambda syntax.

<strong>Complexity:</strong> O(n log k) time where n = total nodes, k = number of lists.`,
    hint: "Use a min-heap to always get the smallest available node across all k lists."
  },
  {
    id: "p12",
    title: "LRU Cache",
    difficulty: "hard",
    week: 4,
    topic: "Hash Maps",
    description: `Design a data structure that follows Least Recently Used (LRU) cache constraints.

- <code>get(key)</code>: Return value if key exists, else -1.
- <code>put(key, value)</code>: Update or insert. If over capacity, evict LRU key.

Both operations must run in O(1) time.

<strong>Example:</strong>
cache = LRUCache(2)  // capacity 2
cache.put(1, 1)
cache.put(2, 2)
cache.get(1)    → 1
cache.put(3, 3) → evicts key 2
cache.get(2)    → -1 (evicted)`,
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
    starterJava: `import java.util.*;

class LRUCache {
    // Your code here

    public LRUCache(int capacity) {
        // Your code here
    }

    public int get(int key) {
        // Your code here
        return -1;
    }

    public void put(int key, int value) {
        // Your code here
    }
}`,
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
    testCases: [
      { input: "lru_test", expected: "lru_pass", customCheck: true },
    ],
    solution: `# Python — OrderedDict (clean) or manual DLL + dict
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)  # Mark as recently used
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove LRU (first item)`,
    solutionJava: `// Java — LinkedHashMap (clean approach)
class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;

    public LRUCache(int capacity) {
        super(capacity, 0.75f, true); // accessOrder = true
        this.capacity = capacity;
    }

    public int get(int key) {
        return super.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        super.put(key, value);
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}`,
    solutionJS: `// JavaScript — Map maintains insertion order
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val); // Move to end (most recent)
    return val;
  }
  put(key, value) {
    this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value); // Remove first (LRU)
    }
  }
}`,
    walkthrough: `<strong>The classic design problem.</strong> Requires O(1) for both get and put → need a hash map (O(1) lookup) + ordered structure (to track recency).

<strong>Language-specific approaches:</strong>
  Python: <code>OrderedDict</code> — has <code>move_to_end()</code> and <code>popitem(last=False)</code>. Perfect fit.
  Java: <code>LinkedHashMap</code> with <code>accessOrder=true</code> — override <code>removeEldestEntry()</code>.
  JS: <code>Map</code> maintains insertion order — delete + re-set moves to end.

<strong>In a real interview, they may ask for the manual approach:</strong>
Doubly linked list + HashMap. The DLL tracks order, the map provides O(1) node access.

<strong>Complexity:</strong> O(1) for both get and put. O(capacity) space.`,
    hint: "Combine a hash map (O(1) lookup) with an ordered structure (to track recency). Python: OrderedDict. Java: LinkedHashMap."
  },
];

// ============================================================
// RESOURCES DATA — Updated for 2026
// ============================================================

const RESOURCES = [
  {
    phase: "Phase 1: Python & Foundations (Weeks 1-2)",
    items: [
      { name: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/", description: "The official Python tutorial — well-written, comprehensive, and always up-to-date.", type: "Tutorial" },
      { name: "NeetCode.io", url: "https://neetcode.io", description: "THE interview prep site in 2026. Curated problems by pattern, video explanations, roadmap.", type: "Practice" },
      { name: "CS50 by Harvard", url: "https://cs50.harvard.edu/x", description: "The gold standard intro CS course. Covers C, Python, SQL, web dev.", type: "Course" },
      { name: "Visualgo", url: "https://visualgo.net", description: "Visualize data structures and algorithms in action. Amazing for learning.", type: "Tool" },
      { name: "Python Tutor", url: "https://pythontutor.com", description: "Visualize Python code execution step-by-step. See memory, stack frames, objects.", type: "Tool" },
    ]
  },
  {
    phase: "Phase 2: Data Structures & Algorithms (Weeks 2-5)",
    items: [
      { name: "Grind 75", url: "https://www.techinterviewhandbook.org/grind75", description: "Curated 75 LeetCode problems — the modern replacement for Blind 75. Customizable by time.", type: "Practice" },
      { name: "LeetCode", url: "https://leetcode.com", description: "The standard platform for coding interview practice. Do problems in Python first.", type: "Practice" },
      { name: "Abdul Bari's Algorithms", url: "https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O", description: "Best YouTube playlist for algorithms. Clear visual explanations of every major algorithm.", type: "Video" },
      { name: "Big O Cheat Sheet", url: "https://www.bigocheatsheet.com", description: "Quick reference for time/space complexity of common data structures and algorithms.", type: "Reference" },
      { name: "NeetCode YouTube", url: "https://www.youtube.com/@NeetCode", description: "Video explanations for 300+ LeetCode problems with clear diagrams.", type: "Video" },
    ]
  },
  {
    phase: "Phase 3: Java & OOP (Week 6)",
    items: [
      { name: "Java for Python Programmers", url: "https://runestone.academy/ns/books/published/java4python/index.html", description: "Learn Java through the lens of what you already know in Python.", type: "Tutorial" },
      { name: "Baeldung", url: "https://www.baeldung.com", description: "The best Java tutorial site. Clean examples for Collections, Spring Boot, patterns.", type: "Reference" },
      { name: "Java Collections Framework", url: "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/doc-files/coll-overview.html", description: "Official Java Collections documentation. Know ArrayList, HashMap, ArrayDeque.", type: "Reference" },
      { name: "Refactoring Guru — Design Patterns", url: "https://refactoring.guru/design-patterns", description: "Visual explanations of all major design patterns with code in Java, Python, and more.", type: "Reference" },
    ]
  },
  {
    phase: "Phase 4: Web Development (Weeks 7-8)",
    items: [
      { name: "The Odin Project", url: "https://www.theodinproject.com", description: "Free full-stack curriculum. Hands-on projects, real-world skills.", type: "Course" },
      { name: "MDN Web Docs", url: "https://developer.mozilla.org", description: "The definitive reference for HTML, CSS, and JavaScript.", type: "Reference" },
      { name: "React Official Docs", url: "https://react.dev/learn", description: "The official React tutorial. Updated for modern React with hooks.", type: "Tutorial" },
      { name: "FastAPI Tutorial", url: "https://fastapi.tiangolo.com/tutorial/", description: "Official FastAPI tutorial. Build a production-ready Python API.", type: "Tutorial" },
      { name: "Git Branching Game", url: "https://learngitbranching.js.org", description: "Interactive game to learn Git branching. Visual and fun.", type: "Tool" },
    ]
  },
  {
    phase: "Phase 5: System Design & Interview Prep (Weeks 9-10)",
    items: [
      { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", description: "Comprehensive system design study guide. Free on GitHub.", type: "Reference" },
      { name: "Pramp", url: "https://www.pramp.com", description: "Free mock interviews with real people. Practice coding + communication.", type: "Practice" },
      { name: "Tech Interview Handbook", url: "https://www.techinterviewhandbook.org", description: "Resume tips, behavioral prep, salary negotiation, and the Grind 75 list.", type: "Reference" },
      { name: "levels.fyi", url: "https://www.levels.fyi", description: "Research salary bands by company, level, and location. Essential for negotiation.", type: "Tool" },
      { name: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/", description: "Official TypeScript documentation. Start with 'TS for JS Programmers'.", type: "Tutorial" },
    ]
  }
];

// ============================================================
// SKILL CATEGORIES for progress tracking (updated for 10 weeks)
// ============================================================

const SKILL_CATEGORIES = [
  { id: "fundamentals", name: "Python Fundamentals", topicIds: ["w1t1","w1t2","w1t3","w1t4","w1t5"] },
  { id: "data-structures", name: "Data Structures", topicIds: ["w2t1","w2t2","w2t3","w2t4","w2t5","w4t1","w4t2","w4t3","w4t4","w4t5"] },
  { id: "algorithms", name: "Algorithms & DP", topicIds: ["w3t1","w3t2","w3t3","w3t4","w3t5","w5t1","w5t2","w5t3","w5t4","w5t5"] },
  { id: "java-oop", name: "Java & OOP", topicIds: ["w6t1","w6t2","w6t3","w6t4","w6t5"] },
  { id: "web-dev", name: "Web Development", topicIds: ["w7t1","w7t2","w7t3","w7t4","w7t5"] },
  { id: "backend", name: "Backend & Databases", topicIds: ["w8t1","w8t2","w8t3","w8t4","w8t5"] },
  { id: "system-design", name: "System Design & Tools", topicIds: ["w9t1","w9t2","w9t3","w9t4","w9t5"] },
  { id: "career", name: "Interview & Career", topicIds: ["w10t1","w10t2","w10t3","w10t4","w10t5"] },
];