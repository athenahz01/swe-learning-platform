const PROBLEMS_3 = [

  // ─────────── WEEK 7: Frontend & System Design ───────────

  {
    id: "p57",
    title: "Implement useState Hook",
    difficulty: "easy",
    topic: "React",
    week: 7,
    description: `Implement a simplified version of React's <code>useState</code> hook using closures.

Your function <code>createState(initialValue)</code> should return an array of two elements: a <strong>getter function</strong> that returns the current state, and a <strong>setter function</strong> that updates it.

<strong>Example 1:</strong>
Input: initialValue = 0, then call setter(5)
const [getCount, setCount] = createState(0);
getCount()   // 0
setCount(5)
getCount()   // 5

<strong>Example 2:</strong>
Input: initialValue = "hello", then call setter("world")
const [getVal, setVal] = createState("hello");
getVal()     // "hello"
setVal("world")
getVal()     // "world"`,
    starterJS: `function createState(initialValue) {\n  // Your code here\n\n}`,
    starterPY: `def create_state(initial_value):\n    # Your code here\n    pass`,
    testCases: [
      { input: [0], expected: 0 },
      { input: ["hello"], expected: "hello" },
      { input: [true], expected: true },
    ],
    solution: `function createState(initialValue) {\n  let state = initialValue;\n  function getState() {\n    return state;\n  }\n  function setState(newValue) {\n    state = newValue;\n  }\n  return [getState, setState];\n}\n\n// Wrapper for test runner\nfunction createStateTest(initialValue) {\n  const [getState, setState] = createState(initialValue);\n  return getState();\n}`,
    walkthrough: `<strong>Step 1: Understand closures</strong>
A closure is a function that "remembers" variables from its enclosing scope even after that scope has finished executing. This is the foundation of React hooks.

<strong>Step 2: The state container</strong>
We declare a <code>let state</code> variable inside createState. This variable lives in the closure's scope. Both the getter and setter functions can access and modify it.

<strong>Step 3: Getter and setter</strong>
The getter simply returns the current value of state. The setter takes a new value and reassigns state. Both "close over" the same state variable.

<strong>Step 4: Return as array</strong>
We return [getState, setState] as an array, mimicking React's useState which returns [value, setter]. Destructuring lets callers name these however they want.

<strong>Complexity:</strong> O(1) for both get and set operations. O(1) space for the closure.

<strong>Pattern:</strong> The Closure Pattern is fundamental to JavaScript. React hooks, private variables, and module patterns all rely on closures to encapsulate state.`,
    hint: "Use a local variable inside the function. Return a getter and setter that both reference that same variable via closure."
  },

  {
    id: "p58",
    title: "Virtual DOM Diff",
    difficulty: "medium",
    topic: "React",
    week: 7,
    description: `Given two virtual DOM tree objects (old and new), return an array of patch operations describing the minimal changes needed to update the old tree to match the new tree.

Each node is an object: <code>{ tag: "div", props: {}, children: [] }</code> or a string for text nodes.

Patch operations:
- <code>{ type: "REPLACE", path, newNode }</code> - replace node at path
- <code>{ type: "TEXT", path, value }</code> - update text content
- <code>{ type: "PROPS", path, props }</code> - update props (changed/added props only)
- <code>{ type: "REMOVE", path }</code> - remove a child node

The <code>path</code> is an array of child indices from the root.

<strong>Example 1:</strong>
Old: { tag: "div", props: {}, children: ["hello"] }
New: { tag: "div", props: {}, children: ["world"] }
Output: [{ type: "TEXT", path: [0], value: "world" }]

<strong>Example 2:</strong>
Old: { tag: "div", props: { class: "a" }, children: [] }
New: { tag: "span", props: { class: "a" }, children: [] }
Output: [{ type: "REPLACE", path: [], newNode: { tag: "span", props: { class: "a" }, children: [] } }]`,
    starterJS: `function diffTrees(oldTree, newTree) {\n  // Your code here\n\n}`,
    starterPY: `def diff_trees(old_tree, new_tree):\n    # Your code here\n    pass`,
    testCases: [
      {
        input: [
          { tag: "div", props: {}, children: ["hello"] },
          { tag: "div", props: {}, children: ["world"] }
        ],
        expected: [{ type: "TEXT", path: [0], value: "world" }]
      },
      {
        input: [
          { tag: "div", props: { class: "a" }, children: [] },
          { tag: "span", props: { class: "a" }, children: [] }
        ],
        expected: [{ type: "REPLACE", path: [], newNode: { tag: "span", props: { class: "a" }, children: [] } }]
      },
      {
        input: [
          { tag: "div", props: { id: "x" }, children: [] },
          { tag: "div", props: { id: "y" }, children: [] }
        ],
        expected: [{ type: "PROPS", path: [], props: { id: "y" } }]
      },
      {
        input: [
          { tag: "ul", props: {}, children: ["a", "b", "c"] },
          { tag: "ul", props: {}, children: ["a", "b"] }
        ],
        expected: [{ type: "REMOVE", path: [2] }]
      },
    ],
    solution: `function diffTrees(oldTree, newTree, path = []) {\n  const patches = [];\n\n  // New node doesn't exist — remove\n  if (newTree === undefined) {\n    patches.push({ type: "REMOVE", path });\n    return patches;\n  }\n\n  // Both are strings (text nodes)\n  if (typeof oldTree === "string" && typeof newTree === "string") {\n    if (oldTree !== newTree) {\n      patches.push({ type: "TEXT", path, value: newTree });\n    }\n    return patches;\n  }\n\n  // One is string, other is object, or tags differ — replace\n  if (typeof oldTree === "string" || typeof newTree === "string" || oldTree.tag !== newTree.tag) {\n    patches.push({ type: "REPLACE", path, newNode: newTree });\n    return patches;\n  }\n\n  // Same tag — check props\n  const propChanges = {};\n  let hasChanges = false;\n  for (const key of Object.keys(newTree.props)) {\n    if (newTree.props[key] !== oldTree.props[key]) {\n      propChanges[key] = newTree.props[key];\n      hasChanges = true;\n    }\n  }\n  if (hasChanges) {\n    patches.push({ type: "PROPS", path, props: propChanges });\n  }\n\n  // Diff children\n  const maxLen = Math.max(\n    (oldTree.children || []).length,\n    (newTree.children || []).length\n  );\n  for (let i = 0; i < maxLen; i++) {\n    if (i >= (newTree.children || []).length) {\n      patches.push({ type: "REMOVE", path: [...path, i] });\n    } else if (i >= (oldTree.children || []).length) {\n      patches.push({ type: "REPLACE", path: [...path, i], newNode: newTree.children[i] });\n    } else {\n      patches.push(...diffTrees(oldTree.children[i], newTree.children[i], [...path, i]));\n    }\n  }\n\n  return patches;\n}`,
    walkthrough: `<strong>Step 1: Handle base cases</strong>
If the new node is undefined, the old node was removed. If both are text strings, compare them directly. If types differ (text vs element) or tags differ, it's a full replacement.

<strong>Step 2: Compare props</strong>
When tags match, iterate over the new props. Any prop that differs from the old is a change. Collect all changed props into a single PROPS patch.

<strong>Step 3: Recursively diff children</strong>
Walk through children by index. If the new tree has fewer children, those extras are REMOVEs. If the old tree has fewer, those are additions (REPLACE at that index). Otherwise, recurse.

<strong>Step 4: Track paths</strong>
Each recursive call appends the child index to the path array. This lets the consumer know exactly where in the tree each patch should be applied.

<strong>Complexity:</strong> O(n) time where n is total nodes in both trees. O(n) space for the patches array and recursion stack.

<strong>Pattern:</strong> This is the core of React's reconciliation algorithm. Real React uses heuristics (keys, same-level comparison) but the recursive diff structure is the same.`,
    hint: "Recursively compare nodes. Handle four cases: remove, text change, tag replacement, and props/children diff."
  },

  {
    id: "p59",
    title: "Implement useEffect Hook",
    difficulty: "easy",
    topic: "React",
    week: 7,
    description: `Implement a simplified <code>useEffect</code> that tracks dependencies and only calls the effect when dependencies change.

Write <code>createEffect()</code> that returns a function <code>runEffect(callback, deps)</code>. When <code>runEffect</code> is called:
- If it's the first call, always run the callback.
- On subsequent calls, only run the callback if any dependency value changed.
- Return <code>true</code> if the callback was executed, <code>false</code> otherwise.

<strong>Example 1:</strong>
const runEffect = createEffect();
runEffect(() => {}, [1, 2])  // true (first call, always runs)
runEffect(() => {}, [1, 2])  // false (deps unchanged)
runEffect(() => {}, [1, 3])  // true (dep changed)

<strong>Example 2:</strong>
const runEffect = createEffect();
runEffect(() => {}, [])  // true (first call)
runEffect(() => {}, [])  // false (empty deps never change)`,
    starterJS: `function createEffect() {\n  // Your code here\n\n}`,
    starterPY: `def create_effect():\n    # Your code here\n    pass`,
    testCases: [
      { input: [[[1, 2], [1, 2], [1, 3]]], expected: [true, false, true] },
      { input: [[[], []]], expected: [true, false] },
      { input: [[[1], [2], [2]]], expected: [true, true, false] },
      { input: [[["a", "b"], ["a", "c"]]], expected: [true, true] },
    ],
    solution: `function createEffect() {\n  let prevDeps = null;\n  return function runEffect(callback, deps) {\n    if (prevDeps === null) {\n      callback();\n      prevDeps = deps;\n      return true;\n    }\n    const changed = deps.some((dep, i) => dep !== prevDeps[i]);\n    if (changed) {\n      callback();\n      prevDeps = deps;\n      return true;\n    }\n    return false;\n  };\n}\n\n// Wrapper for test runner\nfunction createEffectTest(depSets) {\n  const runEffect = createEffect();\n  return depSets.map(deps => runEffect(() => {}, deps));\n}`,
    walkthrough: `<strong>Step 1: Store previous deps</strong>
Use a closure to keep track of the previous dependency array. Initialize it as null so we know when it's the first run.

<strong>Step 2: First run check</strong>
If prevDeps is null, this is the first call. Always execute the callback and store the current deps.

<strong>Step 3: Shallow comparison</strong>
On subsequent calls, compare each element of the new deps array with the corresponding element in prevDeps using strict equality (===). This is exactly what React does — shallow comparison.

<strong>Step 4: Conditional execution</strong>
If any dependency changed, run the callback and update prevDeps. Otherwise, skip it and return false.

<strong>Complexity:</strong> O(d) per call where d is the length of the dependency array. O(d) space for storing previous deps.

<strong>Pattern:</strong> This is the Memoization Pattern with shallow comparison. React's useEffect, useMemo, and useCallback all use this same dependency-tracking mechanism under the hood.`,
    hint: "Use a closure to store the previous dependency array. Compare each element with === on subsequent calls."
  },

  {
    id: "p60",
    title: "URL Shortener (Encode/Decode)",
    difficulty: "medium",
    topic: "System Design",
    week: 7,
    description: `Design a URL shortener system. Implement two functions:

<code>encode(longUrl)</code> - takes a long URL and returns a short key (6 characters using base62: a-z, A-Z, 0-9).
<code>decode(shortKey)</code> - takes a short key and returns the original long URL.

Your solution should use an incrementing counter and base62 encoding for the short key. Return an object with both functions that share state.

<strong>Example 1:</strong>
const shortener = createShortener();
shortener.encode("https://example.com/very/long/path")  // "000001"
shortener.decode("000001")  // "https://example.com/very/long/path"

<strong>Example 2:</strong>
const shortener = createShortener();
shortener.encode("https://a.com")  // "000001"
shortener.encode("https://b.com")  // "000002"
shortener.decode("000001")  // "https://a.com"`,
    starterJS: `function createShortener() {\n  // Your code here\n\n}`,
    starterPY: `def create_shortener():\n    # Your code here\n    pass`,
    testCases: [
      { input: [["https://example.com", "https://google.com"]], expected: ["000001", "000002", "https://example.com", "https://google.com"] },
      { input: [["https://a.com"]], expected: ["000001", "https://a.com"] },
      { input: [["https://x.com", "https://y.com", "https://z.com"]], expected: ["000001", "000002", "000003", "https://x.com", "https://y.com", "https://z.com"] },
    ],
    solution: `function createShortener() {\n  const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";\n  const urlToKey = {};\n  const keyToUrl = {};\n  let counter = 0;\n\n  function toBase62(num) {\n    if (num === 0) return "0";\n    let result = "";\n    while (num > 0) {\n      result = BASE62[num % 62] + result;\n      num = Math.floor(num / 62);\n    }\n    return result.padStart(6, "0");\n  }\n\n  return {\n    encode(longUrl) {\n      if (urlToKey[longUrl]) return urlToKey[longUrl];\n      counter++;\n      const key = toBase62(counter);\n      urlToKey[longUrl] = key;\n      keyToUrl[key] = longUrl;\n      return key;\n    },\n    decode(shortKey) {\n      return keyToUrl[shortKey] || "";\n    }\n  };\n}\n\n// Wrapper for test runner\nfunction createShortenerTest(urls) {\n  const shortener = createShortener();\n  const keys = urls.map(url => shortener.encode(url));\n  const decoded = keys.map(key => shortener.decode(key));\n  return [...keys, ...decoded];\n}`,
    walkthrough: `<strong>Step 1: Choose an encoding scheme</strong>
Base62 uses [0-9a-zA-Z] giving 62 characters. A 6-character key gives 62^6 = 56 billion unique URLs. This is the standard approach used by services like bit.ly and TinyURL.

<strong>Step 2: Counter-based ID generation</strong>
Each new URL gets an incrementing numeric ID. Convert this ID to base62 for the short key. This guarantees uniqueness without collisions.

<strong>Step 3: Bidirectional maps</strong>
Store two hash maps: urlToKey (for deduplication — same URL always gets same key) and keyToUrl (for decoding). This gives O(1) lookup in both directions.

<strong>Step 4: Encode and decode</strong>
Encode: check if URL already exists, otherwise increment counter, convert to base62, store in both maps. Decode: simple hash map lookup.

<strong>Complexity:</strong> O(1) average for both encode and decode (hash map lookups). O(n) space where n is the number of unique URLs stored.

<strong>System Design note:</strong> In a real system, you'd use a database instead of in-memory maps, add a cache (Redis), and potentially use a distributed ID generator (Twitter Snowflake) instead of a simple counter.`,
    hint: "Use an incrementing counter converted to base62. Store two maps: URL-to-key and key-to-URL."
  },

  {
    id: "p61",
    title: "Pub/Sub System",
    difficulty: "medium",
    topic: "System Design",
    week: 7,
    description: `Implement a publish/subscribe (Pub/Sub) event system. Create a function <code>createPubSub()</code> that returns an object with three methods:

- <code>subscribe(event, callback)</code> - Register a callback for an event. Returns an unsubscribe function.
- <code>publish(event, data)</code> - Trigger all callbacks registered for that event. Returns the number of callbacks called.
- <code>getSubscriberCount(event)</code> - Returns the number of active subscribers for an event.

<strong>Example 1:</strong>
const ps = createPubSub();
const unsub = ps.subscribe("click", (data) => data);
ps.publish("click", "hello")  // calls callback, returns 1
unsub()  // removes the subscription
ps.publish("click", "hello")  // returns 0

<strong>Example 2:</strong>
const ps = createPubSub();
ps.subscribe("a", () => {});
ps.subscribe("a", () => {});
ps.getSubscriberCount("a")  // 2`,
    starterJS: `function createPubSub() {\n  // Your code here\n\n}`,
    starterPY: `def create_pub_sub():\n    # Your code here\n    pass`,
    testCases: [
      { input: [["subscribe:click", "subscribe:click", "count:click", "publish:click:hi", "unsubscribe:0", "count:click", "publish:click:hi"]], expected: [2, 2, 1, 1] },
      { input: [["count:x", "subscribe:x", "count:x"]], expected: [0, 1] },
      { input: [["subscribe:a", "subscribe:b", "publish:a:data", "publish:b:data", "publish:c:data"]], expected: [1, 1, 0] },
    ],
    solution: `function createPubSub() {\n  const subscribers = {};\n\n  return {\n    subscribe(event, callback) {\n      if (!subscribers[event]) subscribers[event] = [];\n      const cb = callback;\n      subscribers[event].push(cb);\n      return function unsubscribe() {\n        subscribers[event] = subscribers[event].filter(fn => fn !== cb);\n      };\n    },\n    publish(event, data) {\n      if (!subscribers[event]) return 0;\n      subscribers[event].forEach(cb => cb(data));\n      return subscribers[event].length;\n    },\n    getSubscriberCount(event) {\n      return (subscribers[event] || []).length;\n    }\n  };\n}\n\n// Wrapper for test runner\nfunction createPubSubTest(commands) {\n  const ps = createPubSub();\n  const unsubs = [];\n  const results = [];\n  for (const cmd of commands) {\n    const parts = cmd.split(":");\n    if (parts[0] === "subscribe") {\n      unsubs.push(ps.subscribe(parts[1], (d) => d));\n    } else if (parts[0] === "unsubscribe") {\n      unsubs[parseInt(parts[1])]();\n    } else if (parts[0] === "publish") {\n      results.push(ps.publish(parts[1], parts[2]));\n    } else if (parts[0] === "count") {\n      results.push(ps.getSubscriberCount(parts[1]));\n    }\n  }\n  return results;\n}`,
    walkthrough: `<strong>Step 1: The event registry</strong>
Use a hash map where keys are event names and values are arrays of callback functions. This gives O(1) lookup for any event's subscriber list.

<strong>Step 2: Subscribe with closure</strong>
When subscribing, push the callback into the event's array. Return an unsubscribe function (closure) that filters out that specific callback reference.

<strong>Step 3: Publish broadcasts to all</strong>
When publishing, look up the event's subscriber array and call each callback with the provided data. Return the count of callbacks invoked.

<strong>Step 4: Unsubscribe via identity</strong>
The unsubscribe function uses reference equality to filter out the exact callback that was registered. This is why we keep a reference to the original callback in the closure.

<strong>Complexity:</strong> Subscribe: O(1). Publish: O(k) where k is subscriber count. Unsubscribe: O(k) for the filter.

<strong>Pattern:</strong> The Observer/Pub-Sub pattern is everywhere: DOM events, Redux, Node.js EventEmitter, WebSocket handlers, microservice message queues. Understanding it is essential for frontend and distributed system design.`,
    hint: "Store callbacks in a map keyed by event name. Return a closure from subscribe that removes the specific callback."
  },

  {
    id: "p62",
    title: "TypeScript-Style Type Checker",
    difficulty: "easy",
    topic: "TypeScript",
    week: 7,
    description: `Implement a function <code>validateType(obj, schema)</code> that checks if a JavaScript object matches a type schema.

The schema is an object where each key maps to a type string: <code>"string"</code>, <code>"number"</code>, <code>"boolean"</code>, <code>"object"</code>, or <code>"array"</code>.

Return an object: <code>{ valid: boolean, errors: string[] }</code> where errors lists the fields that failed validation.

<strong>Example 1:</strong>
schema = { name: "string", age: "number" }
obj = { name: "Alice", age: 30 }
Output: { valid: true, errors: [] }

<strong>Example 2:</strong>
schema = { name: "string", age: "number" }
obj = { name: "Alice", age: "thirty" }
Output: { valid: false, errors: ["age: expected number but got string"] }`,
    starterJS: `function validateType(obj, schema) {\n  // Your code here\n\n}`,
    starterPY: `def validate_type(obj, schema):\n    # Your code here\n    pass`,
    testCases: [
      {
        input: [{ name: "Alice", age: 30 }, { name: "string", age: "number" }],
        expected: { valid: true, errors: [] }
      },
      {
        input: [{ name: "Alice", age: "thirty" }, { name: "string", age: "number" }],
        expected: { valid: false, errors: ["age: expected number but got string"] }
      },
      {
        input: [{ items: [1, 2], count: 2 }, { items: "array", count: "number" }],
        expected: { valid: true, errors: [] }
      },
      {
        input: [{ x: 1, y: "two", z: false }, { x: "number", y: "number", z: "boolean" }],
        expected: { valid: false, errors: ["y: expected number but got string"] }
      },
    ],
    solution: `function validateType(obj, schema) {\n  const errors = [];\n  for (const key of Object.keys(schema)) {\n    const expected = schema[key];\n    const value = obj[key];\n    let actual;\n    if (Array.isArray(value)) {\n      actual = "array";\n    } else {\n      actual = typeof value;\n    }\n    if (actual !== expected) {\n      errors.push(key + ": expected " + expected + " but got " + actual);\n    }\n  }\n  return { valid: errors.length === 0, errors };\n}`,
    walkthrough: `<strong>Step 1: Iterate schema keys</strong>
The schema defines what types we expect. Loop over each key in the schema and check the corresponding value in the object.

<strong>Step 2: Determine actual type</strong>
Use <code>typeof</code> for most types. Special case: arrays, because <code>typeof []</code> returns "object" in JavaScript. Use <code>Array.isArray()</code> to detect arrays.

<strong>Step 3: Compare and collect errors</strong>
If the actual type doesn't match the expected type, build a descriptive error string. Collect all errors in an array.

<strong>Step 4: Return result</strong>
Return an object with <code>valid: true/false</code> based on whether errors is empty, plus the full errors array.

<strong>Complexity:</strong> O(k) where k is the number of keys in the schema. O(k) space for the errors array.

<strong>Pattern:</strong> Runtime type validation is used in API input validation (Zod, Joi), form validation, and TypeScript's runtime checks. This is a simplified version of what libraries like Zod do under the hood.`,
    hint: "Loop over schema keys, use typeof and Array.isArray() to check each field, collect error messages."
  },

  {
    id: "p63",
    title: "Simple Router with Params",
    difficulty: "medium",
    topic: "System Design",
    week: 7,
    description: `Implement a simple URL router that supports static paths and dynamic parameters (like Express.js or React Router).

Write <code>createRouter()</code> that returns an object with:
- <code>addRoute(pattern, handler)</code> - Register a route pattern (e.g., "/users/:id")
- <code>match(path)</code> - Match a URL path to a registered route, extracting params. Returns <code>{ handler, params }</code> or <code>null</code>.

Dynamic segments start with <code>:</code> and match any non-slash string.

<strong>Example 1:</strong>
router.addRoute("/users/:id", "getUser");
router.match("/users/42")  // { handler: "getUser", params: { id: "42" } }

<strong>Example 2:</strong>
router.addRoute("/posts/:postId/comments/:commentId", "getComment");
router.match("/posts/5/comments/10")
// { handler: "getComment", params: { postId: "5", commentId: "10" } }`,
    starterJS: `function createRouter() {\n  // Your code here\n\n}`,
    starterPY: `def create_router():\n    # Your code here\n    pass`,
    testCases: [
      {
        input: [["/users/:id", "getUser"], "/users/42"],
        expected: { handler: "getUser", params: { id: "42" } }
      },
      {
        input: [["/posts/:postId/comments/:commentId", "getComment"], "/posts/5/comments/10"],
        expected: { handler: "getComment", params: { postId: "5", commentId: "10" } }
      },
      {
        input: [["/about", "aboutPage"], "/about"],
        expected: { handler: "aboutPage", params: {} }
      },
      {
        input: [["/users/:id", "getUser"], "/posts/42"],
        expected: null
      },
    ],
    solution: `function createRouter() {\n  const routes = [];\n\n  return {\n    addRoute(pattern, handler) {\n      const parts = pattern.split("/").filter(Boolean);\n      routes.push({ parts, handler });\n    },\n    match(path) {\n      const pathParts = path.split("/").filter(Boolean);\n      for (const route of routes) {\n        if (route.parts.length !== pathParts.length) continue;\n        const params = {};\n        let matched = true;\n        for (let i = 0; i < route.parts.length; i++) {\n          if (route.parts[i].startsWith(":")) {\n            params[route.parts[i].slice(1)] = pathParts[i];\n          } else if (route.parts[i] !== pathParts[i]) {\n            matched = false;\n            break;\n          }\n        }\n        if (matched) return { handler: route.handler, params };\n      }\n      return null;\n    }\n  };\n}\n\n// Wrapper for test runner\nfunction createRouterTest(routeDef, path) {\n  const router = createRouter();\n  router.addRoute(routeDef[0], routeDef[1]);\n  return router.match(path);\n}`,
    walkthrough: `<strong>Step 1: Parse route patterns</strong>
Split both the pattern and the path by "/" to get arrays of segments. Filter out empty strings from leading slashes.

<strong>Step 2: Match segment by segment</strong>
For each registered route, first check if the segment count matches. Then compare each segment: if the pattern segment starts with ":", it's a dynamic param — extract the value. Otherwise, it must match exactly.

<strong>Step 3: Collect params</strong>
When a segment starts with ":", slice off the colon to get the param name, and use the corresponding path segment as the value. Store in a params object.

<strong>Step 4: First match wins</strong>
Return the first route that fully matches. If no route matches, return null. This mirrors how Express.js routes work — first match wins.

<strong>Complexity:</strong> O(R * S) where R is the number of routes and S is the number of segments. O(P) space for params where P is the number of dynamic segments.

<strong>Pattern:</strong> This is the core of every web framework's routing system (Express, React Router, Next.js). Understanding path matching and parameter extraction is essential for full-stack development.`,
    hint: "Split both pattern and path by '/'. Compare segment by segment. Segments starting with ':' are dynamic params."
  },

  // ─────────── WEEK 8: DP & Interview Prep ───────────

  {
    id: "p64",
    title: "House Robber",
    difficulty: "easy",
    topic: "Dynamic Programming",
    week: 8,
    description: `You are a robber planning to rob houses along a street. Each house has a certain amount of money. The constraint is that <strong>adjacent houses have connected security systems</strong> — if two adjacent houses are robbed, an alarm triggers.

Given an array <code>nums</code> representing money in each house, return the <strong>maximum amount</strong> you can rob without triggering any alarm.

<strong>Example 1:</strong>
Input: nums = [1, 2, 3, 1]
Output: 4
Explanation: Rob house 0 ($1) + house 2 ($3) = $4

<strong>Example 2:</strong>
Input: nums = [2, 7, 9, 3, 1]
Output: 12
Explanation: Rob house 0 ($2) + house 2 ($9) + house 4 ($1) = $12`,
    starterJS: `function rob(nums) {\n  // Your code here\n\n}`,
    starterPY: `def rob(nums):\n    # Your code here\n    pass`,
    testCases: [
      { input: [[1, 2, 3, 1]], expected: 4 },
      { input: [[2, 7, 9, 3, 1]], expected: 12 },
      { input: [[0]], expected: 0 },
      { input: [[5, 3, 4, 11, 2]], expected: 16 },
      { input: [[2, 1, 1, 2]], expected: 4 },
    ],
    solution: `function rob(nums) {\n  if (nums.length === 0) return 0;\n  if (nums.length === 1) return nums[0];\n  let prev2 = 0;\n  let prev1 = 0;\n  for (let i = 0; i < nums.length; i++) {\n    const current = Math.max(prev1, prev2 + nums[i]);\n    prev2 = prev1;\n    prev1 = current;\n  }\n  return prev1;\n}`,
    walkthrough: `<strong>Step 1: Define the subproblem</strong>
Let dp[i] = maximum money we can rob from houses 0 to i. At each house, we choose: rob it (add its value to dp[i-2]) or skip it (take dp[i-1]).

<strong>Step 2: The recurrence</strong>
dp[i] = max(dp[i-1], dp[i-2] + nums[i]). This captures the "skip or take" decision at every house.

<strong>Step 3: Optimize space</strong>
We only need the last two values (prev1 and prev2), not the entire dp array. This reduces space from O(n) to O(1).

<strong>Step 4: Trace through example</strong>
[2, 7, 9, 3, 1]:
i=0: max(0, 0+2) = 2, prev2=0, prev1=2
i=1: max(2, 0+7) = 7, prev2=2, prev1=7
i=2: max(7, 2+9) = 11, prev2=7, prev1=11
i=3: max(11, 7+3) = 11, prev2=11, prev1=11... wait, actually: max(11, 7+3)=11
i=4: max(11, 11+1) = 12. Answer: 12.

<strong>Complexity:</strong> O(n) time, O(1) space.

<strong>Pattern:</strong> This is the "Include/Exclude" DP pattern. At each step you decide whether to include the current element (which forces skipping the previous) or exclude it. Variations: House Robber II (circular), Delete and Earn, Maximum Alternating Subsequence.`,
    hint: "At each house, choose the max of: skipping it (take previous best) or robbing it (its value + best from 2 houses back)."
  },

  {
    id: "p65",
    title: "Longest Common Subsequence",
    difficulty: "medium",
    topic: "Dynamic Programming",
    week: 8,
    description: `Given two strings <code>text1</code> and <code>text2</code>, return the length of their <strong>longest common subsequence</strong> (LCS).

A subsequence is a sequence derived from another sequence by deleting some or no elements without changing the order of remaining elements.

<strong>Example 1:</strong>
Input: text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The LCS is "ace" (length 3).

<strong>Example 2:</strong>
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: No common subsequence exists.`,
    starterJS: `function longestCommonSubsequence(text1, text2) {\n  // Your code here\n\n}`,
    starterPY: `def longest_common_subsequence(text1, text2):\n    # Your code here\n    pass`,
    testCases: [
      { input: ["abcde", "ace"], expected: 3 },
      { input: ["abc", "def"], expected: 0 },
      { input: ["abc", "abc"], expected: 3 },
      { input: ["oxcpqrsvwf", "shmtulqrypy"], expected: 2 },
      { input: ["abcba", "abcbcba"], expected: 5 },
    ],
    solution: `function longestCommonSubsequence(text1, text2) {\n  const m = text1.length;\n  const n = text2.length;\n  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));\n\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (text1[i - 1] === text2[j - 1]) {\n        dp[i][j] = dp[i - 1][j - 1] + 1;\n      } else {\n        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n      }\n    }\n  }\n\n  return dp[m][n];\n}`,
    walkthrough: `<strong>Step 1: Define the 2D subproblem</strong>
Let dp[i][j] = length of LCS of text1[0..i-1] and text2[0..j-1]. Our answer is dp[m][n].

<strong>Step 2: The recurrence</strong>
If text1[i-1] === text2[j-1]: these characters match, so dp[i][j] = dp[i-1][j-1] + 1.
Otherwise: take the max of either skipping a char from text1 (dp[i-1][j]) or text2 (dp[i][j-1]).

<strong>Step 3: Base case</strong>
dp[0][j] = 0 and dp[i][0] = 0 because the LCS of an empty string with anything is 0. This is why we use (m+1) x (n+1) dimensions.

<strong>Step 4: Fill the table</strong>
For "abcde" and "ace":
- a matches a: dp[1][1] = 1
- c matches c: dp[3][2] = 2
- e matches e: dp[5][3] = 3
Final answer: 3.

<strong>Complexity:</strong> O(m * n) time and space where m and n are the string lengths.

<strong>Pattern:</strong> 2D DP with string comparison. This exact pattern appears in: Edit Distance, Shortest Common Supersequence, and DNA sequence alignment. The "match vs skip" decision structure is the template for all two-string DP problems.`,
    hint: "Build a 2D table. If characters match, take diagonal + 1. Otherwise, take max of left or top cell."
  },

  {
    id: "p66",
    title: "Word Break",
    difficulty: "medium",
    topic: "Dynamic Programming",
    week: 8,
    description: `Given a string <code>s</code> and a list of words <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.

The same word in the dictionary may be reused multiple times.

<strong>Example 1:</strong>
Input: s = "leetcode", wordDict = ["leet", "code"]
Output: true
Explanation: "leetcode" can be segmented as "leet code".

<strong>Example 2:</strong>
Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false`,
    starterJS: `function wordBreak(s, wordDict) {\n  // Your code here\n\n}`,
    starterPY: `def word_break(s, word_dict):\n    # Your code here\n    pass`,
    testCases: [
      { input: ["leetcode", ["leet", "code"]], expected: true },
      { input: ["applepenapple", ["apple", "pen"]], expected: true },
      { input: ["catsandog", ["cats", "dog", "sand", "and", "cat"]], expected: false },
      { input: ["a", ["a"]], expected: true },
      { input: ["cars", ["car", "ca", "rs"]], expected: true },
    ],
    solution: `function wordBreak(s, wordDict) {\n  const wordSet = new Set(wordDict);\n  const dp = new Array(s.length + 1).fill(false);\n  dp[0] = true;\n\n  for (let i = 1; i <= s.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (dp[j] && wordSet.has(s.slice(j, i))) {\n        dp[i] = true;\n        break;\n      }\n    }\n  }\n\n  return dp[s.length];\n}`,
    walkthrough: `<strong>Step 1: Define the subproblem</strong>
Let dp[i] = true if s[0..i-1] can be segmented into dictionary words. Our answer is dp[s.length].

<strong>Step 2: The recurrence</strong>
dp[i] is true if there exists some j < i where dp[j] is true AND s[j..i-1] is a word in the dictionary. In other words: "can we break the string up to j, and is the remaining piece a valid word?"

<strong>Step 3: Use a Set for O(1) lookups</strong>
Convert wordDict to a Set so that checking if a substring is a valid word is O(1) average instead of O(k) where k is the dict size.

<strong>Step 4: Trace through "leetcode"</strong>
dp[0] = true (empty prefix)
i=4: dp[0]=true and s[0..3]="leet" is in dict, so dp[4]=true
i=8: dp[4]=true and s[4..7]="code" is in dict, so dp[8]=true
Answer: true.

<strong>Complexity:</strong> O(n^2 * m) time where n is string length and m is average substring comparison cost. O(n) space for dp array.

<strong>Pattern:</strong> This is the "prefix DP" pattern. dp[i] depends on all previous dp[j] values. Similar problems: Palindrome Partitioning, Concatenated Words, and sentence segmentation in NLP.`,
    hint: "dp[i] = can we segment s[0..i-1]? Check all possible last words ending at position i."
  },

  {
    id: "p67",
    title: "Decode Ways",
    difficulty: "medium",
    topic: "Dynamic Programming",
    week: 8,
    description: `A message containing letters A-Z is encoded using the mapping: 'A' -> "1", 'B' -> "2", ..., 'Z' -> "26".

Given a string <code>s</code> containing only digits, return the <strong>number of ways</strong> to decode it.

Note: "06" is not valid because it has a leading zero, but "6" maps to 'F'.

<strong>Example 1:</strong>
Input: s = "12"
Output: 2
Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).

<strong>Example 2:</strong>
Input: s = "226"
Output: 3
Explanation: "226" can be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).`,
    starterJS: `function numDecodings(s) {\n  // Your code here\n\n}`,
    starterPY: `def num_decodings(s):\n    # Your code here\n    pass`,
    testCases: [
      { input: ["12"], expected: 2 },
      { input: ["226"], expected: 3 },
      { input: ["06"], expected: 0 },
      { input: ["11106"], expected: 2 },
      { input: ["10"], expected: 1 },
      { input: ["1"], expected: 1 },
    ],
    solution: `function numDecodings(s) {\n  if (s[0] === "0") return 0;\n  const n = s.length;\n  let prev2 = 1;\n  let prev1 = 1;\n\n  for (let i = 1; i < n; i++) {\n    let current = 0;\n    const oneDigit = parseInt(s[i]);\n    const twoDigit = parseInt(s.slice(i - 1, i + 1));\n    if (oneDigit >= 1) {\n      current += prev1;\n    }\n    if (twoDigit >= 10 && twoDigit <= 26) {\n      current += prev2;\n    }\n    prev2 = prev1;\n    prev1 = current;\n  }\n\n  return prev1;\n}`,
    walkthrough: `<strong>Step 1: Define the subproblem</strong>
Let dp[i] = number of ways to decode s[0..i]. At each position, we can decode either one digit or two digits (if valid).

<strong>Step 2: The recurrence</strong>
dp[i] = 0.
If s[i] is between 1-9 (valid single digit), add dp[i-1] (decode one char).
If s[i-1..i] is between 10-26 (valid two digits), add dp[i-2] (decode two chars).

<strong>Step 3: Handle edge cases</strong>
"0" alone is invalid (no letter maps to 0). "06" is invalid. Leading zeros make the entire string invalid. But "10" and "20" are valid as two-digit decodings.

<strong>Step 4: Space optimization</strong>
We only need dp[i-1] and dp[i-2], so use two variables instead of an array. This is the same optimization as Fibonacci and House Robber.

<strong>Complexity:</strong> O(n) time, O(1) space.

<strong>Pattern:</strong> This is a constrained Fibonacci-style DP. At each step, you choose between taking 1 or 2 elements, but with validity constraints. Similar to Climbing Stairs but with conditional transitions. Variations: Decode Ways II (with wildcards).`,
    hint: "Like Climbing Stairs, but you can only take a '2-step' if the two digits form 10-26, and '1-step' if the digit is not 0."
  },

  {
    id: "p68",
    title: "Merge K Sorted Arrays",
    difficulty: "hard",
    topic: "Interview Patterns",
    week: 8,
    description: `Given <code>k</code> sorted arrays, merge them into a single sorted array.

You should implement this efficiently using a divide-and-conquer approach (merge pairs of arrays repeatedly).

<strong>Example 1:</strong>
Input: arrays = [[1, 4, 5], [1, 3, 4], [2, 6]]
Output: [1, 1, 2, 3, 4, 4, 5, 6]

<strong>Example 2:</strong>
Input: arrays = [[1, 2], [3, 4], [0, 5]]
Output: [0, 1, 2, 3, 4, 5]`,
    starterJS: `function mergeKSorted(arrays) {\n  // Your code here\n\n}`,
    starterPY: `def merge_k_sorted(arrays):\n    # Your code here\n    pass`,
    testCases: [
      { input: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] },
      { input: [[[1, 2], [3, 4], [0, 5]]], expected: [0, 1, 2, 3, 4, 5] },
      { input: [[[1]]], expected: [1] },
      { input: [[[5, 10], [2, 3, 8], [1, 4, 6, 9, 7].sort((a,b) => a-b)]], expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { input: [[[]]], expected: [] },
    ],
    solution: `function mergeKSorted(arrays) {\n  if (arrays.length === 0) return [];\n  if (arrays.length === 1) return arrays[0];\n\n  function mergeTwoSorted(a, b) {\n    const result = [];\n    let i = 0, j = 0;\n    while (i < a.length && j < b.length) {\n      if (a[i] <= b[j]) {\n        result.push(a[i++]);\n      } else {\n        result.push(b[j++]);\n      }\n    }\n    while (i < a.length) result.push(a[i++]);\n    while (j < b.length) result.push(b[j++]);\n    return result;\n  }\n\n  let current = arrays;\n  while (current.length > 1) {\n    const next = [];\n    for (let i = 0; i < current.length; i += 2) {\n      if (i + 1 < current.length) {\n        next.push(mergeTwoSorted(current[i], current[i + 1]));\n      } else {\n        next.push(current[i]);\n      }\n    }\n    current = next;\n  }\n\n  return current[0];\n}`,
    walkthrough: `<strong>Step 1: Start with merge two sorted arrays</strong>
The building block is merging two sorted arrays using two pointers. Compare elements at each pointer, take the smaller one, advance that pointer. This is O(n + m).

<strong>Step 2: Divide and conquer</strong>
Instead of merging arrays one at a time (which would be O(N*k)), pair them up and merge in rounds. Round 1: merge pairs to get k/2 arrays. Round 2: merge pairs to get k/4. Continue until one array remains.

<strong>Step 3: Why divide-and-conquer is better</strong>
Merging one-by-one: each element could be part of up to k merge operations = O(N*k) total.
Divide-and-conquer: only log(k) rounds, each processing N total elements = O(N * log(k)) total.

<strong>Step 4: Handle odd counts</strong>
If the number of arrays is odd in a round, the last unpaired array simply advances to the next round unchanged.

<strong>Complexity:</strong> O(N * log(k)) time where N is total elements and k is number of arrays. O(N) space for the merged results.

<strong>Pattern:</strong> This is the Divide-and-Conquer Merge pattern, the same idea behind merge sort. It also appears in external sorting (sorting data too large for memory) and is a classic interview question (LeetCode #23 uses linked lists).`,
    hint: "Merge arrays in pairs repeatedly (like a tournament bracket), halving the count each round."
  },

  {
    id: "p69",
    title: "Task Scheduler",
    difficulty: "medium",
    topic: "Interview Patterns",
    week: 8,
    description: `Given an array of tasks (characters) and a cooldown interval <code>n</code>, find the <strong>minimum number of time units</strong> the CPU needs to finish all tasks.

Each task takes 1 unit of time. Between two <strong>same tasks</strong>, there must be at least <code>n</code> units of cooldown. During cooldown, the CPU can execute different tasks or stay idle.

<strong>Example 1:</strong>
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: A -> B -> idle -> A -> B -> idle -> A -> B

<strong>Example 2:</strong>
Input: tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
Explanation: No cooldown needed, just execute all 6 tasks.`,
    starterJS: `function leastInterval(tasks, n) {\n  // Your code here\n\n}`,
    starterPY: `def least_interval(tasks, n):\n    # Your code here\n    pass`,
    testCases: [
      { input: [["A","A","A","B","B","B"], 2], expected: 8 },
      { input: [["A","A","A","B","B","B"], 0], expected: 6 },
      { input: [["A","A","A","A","A","A","B","C","D","E","F","G"], 2], expected: 16 },
      { input: [["A","B","C","D"], 2], expected: 4 },
      { input: [["A","A","B","B","C","C"], 1], expected: 6 },
    ],
    solution: `function leastInterval(tasks, n) {\n  const freq = {};\n  for (const task of tasks) {\n    freq[task] = (freq[task] || 0) + 1;\n  }\n\n  const counts = Object.values(freq);\n  const maxFreq = Math.max(...counts);\n  const maxCount = counts.filter(c => c === maxFreq).length;\n\n  const formulaResult = (maxFreq - 1) * (n + 1) + maxCount;\n  return Math.max(tasks.length, formulaResult);\n}`,
    walkthrough: `<strong>Step 1: Count task frequencies</strong>
Count how many times each task appears. The most frequent task determines the minimum structure of our schedule.

<strong>Step 2: Build the frame</strong>
If the most frequent task appears maxFreq times, we need (maxFreq - 1) "frames" of size (n + 1). Each frame has one instance of the most frequent task plus n slots for other tasks or idle.

<strong>Step 3: Handle the last frame</strong>
The last frame only needs space for tasks that share the maximum frequency (maxCount). So the formula is: (maxFreq - 1) * (n + 1) + maxCount.

<strong>Step 4: Take the maximum</strong>
If there are many distinct tasks and n is small, we might not need any idle time. In that case, the answer is simply tasks.length. The final answer is max(tasks.length, formulaResult).

Example: ["A","A","A","B","B","B"], n=2
maxFreq=3, maxCount=2 (A and B both appear 3 times)
(3-1) * (2+1) + 2 = 6 + 2 = 8
Schedule: A B _ | A B _ | A B

<strong>Complexity:</strong> O(n) time to count frequencies. O(1) space (at most 26 unique tasks).

<strong>Pattern:</strong> This is the Greedy with Frequency Analysis pattern. The key insight is that the most frequent element constrains the schedule. This pattern appears in: Reorganize String, Rearrange String K Distance Apart, and CPU process scheduling.`,
    hint: "The most frequent task determines the structure. Formula: (maxFreq - 1) * (n + 1) + count of tasks with max frequency."
  },

  {
    id: "p70",
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "hard",
    topic: "Interview Patterns",
    week: 8,
    description: `Design functions to serialize a binary tree to a string and deserialize it back.

The tree is represented as an array in level-order (BFS) format where <code>null</code> represents empty nodes: <code>[1, 2, 3, null, null, 4, 5]</code>.

Implement:
- <code>serialize(root)</code> - convert tree array to a string
- <code>deserialize(str)</code> - convert string back to tree array

The deserialized result must match the original input. Trailing nulls should be removed.

<strong>Example 1:</strong>
Input: [1, 2, 3, null, null, 4, 5]
serialize -> "1,2,3,#,#,4,5"
deserialize -> [1, 2, 3, null, null, 4, 5]

<strong>Example 2:</strong>
Input: [1, null, 2]
serialize -> "1,#,2"
deserialize -> [1, null, 2]`,
    starterJS: `function serializeTree(root) {\n  // root is an array like [1, 2, 3, null, null, 4, 5]\n  // Return a string\n\n}\n\nfunction deserializeTree(str) {\n  // str is like "1,2,3,#,#,4,5"\n  // Return an array\n\n}`,
    starterPY: `def serialize_tree(root):\n    # root is a list like [1, 2, 3, None, None, 4, 5]\n    # Return a string\n    pass\n\ndef deserialize_tree(s):\n    # s is like "1,2,3,#,#,4,5"\n    # Return a list\n    pass`,
    testCases: [
      { input: [[1, 2, 3, null, null, 4, 5]], expected: [1, 2, 3, null, null, 4, 5] },
      { input: [[1, null, 2]], expected: [1, null, 2] },
      { input: [[1]], expected: [1] },
      { input: [[]], expected: [] },
      { input: [[5, 4, 7, 3, null, 2, null, -1]], expected: [5, 4, 7, 3, null, 2, null, -1] },
    ],
    solution: `function serializeTree(root) {\n  if (!root || root.length === 0) return "";\n  // Remove trailing nulls for clean serialization\n  let end = root.length - 1;\n  while (end >= 0 && root[end] === null) end--;\n  const trimmed = root.slice(0, end + 1);\n  return trimmed.map(v => v === null ? "#" : String(v)).join(",");\n}\n\nfunction deserializeTree(str) {\n  if (!str || str === "") return [];\n  const tokens = str.split(",");\n  const result = tokens.map(t => t === "#" ? null : Number(t));\n  // Remove trailing nulls\n  while (result.length > 0 && result[result.length - 1] === null) {\n    result.pop();\n  }\n  return result;\n}\n\n// Wrapper for test runner: serialize then deserialize round-trip\nfunction serializeTreeTest(root) {\n  const serialized = serializeTree(root);\n  return deserializeTree(serialized);\n}`,
    walkthrough: `<strong>Step 1: Choose a serialization format</strong>
Level-order (BFS) is the most natural format for array-based trees. Use commas as delimiters and "#" for null nodes. This gives a compact, unambiguous string representation.

<strong>Step 2: Serialize</strong>
Map each element: numbers become their string representation, nulls become "#". Trim trailing nulls first (they're redundant since missing children are implicitly null). Join with commas.

<strong>Step 3: Deserialize</strong>
Split by comma. Map "#" back to null and number strings back to integers using Number(). Clean up trailing nulls to match the canonical form.

<strong>Step 4: Verify round-trip</strong>
The key requirement is that deserialize(serialize(tree)) === tree. Trailing null removal on both ends ensures this works correctly. For example, [1, 2, null, null, null] should round-trip to [1, 2].

<strong>Complexity:</strong> O(n) time for both serialize and deserialize where n is the number of nodes. O(n) space for the string/array.

<strong>Pattern:</strong> Serialization is a fundamental concept in distributed systems (sending data over networks), caching (Redis), and persistence (saving state to disk). This specific problem (LeetCode #297) is a top interview question at FAANG companies. The level-order approach extends naturally to N-ary trees and graphs.`,
    hint: "Use '#' for null nodes, commas as delimiters. Serialize with map+join, deserialize with split+map."
  },

];
